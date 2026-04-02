import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { authorizeAdmin } from "@/lib/auth";
import {
  CMS_READ_ROLES,
  CMS_WRITE_ROLES,
  isCmsCollection,
  normalizeCmsDocumentInput,
  normalizeCmsKey,
  normalizeCmsSlug,
  normalizeCmsStatus,
} from "@/lib/cms";
import { getCmsCollectionModel } from "@/models";
import { logAuditEvent } from "@/lib/audit";
import { upsertRedirectRule } from "@/lib/redirects";

const cmsDocSchema = z.object({
  key: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  title: z.record(z.string(), z.any()).optional(),
  summary: z.record(z.string(), z.any()).optional(),
  data: z.record(z.string(), z.any()).optional(),
  order: z.number().int().optional(),
});

const bulkPatchSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(200),
  patch: cmsDocSchema,
});

function parseBulkIds(input: string[]): ObjectId[] {
  return input
    .map((value) => {
      if (!ObjectId.isValid(value)) return null;
      return new ObjectId(value);
    })
    .filter((value): value is ObjectId => Boolean(value));
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugToPath(slug: string): string {
  const normalized = normalizeCmsSlug(slug);
  return normalized.length > 0 ? `/${normalized}` : "/";
}

async function hasKeySlugConflict(input: {
  collection: Awaited<ReturnType<typeof getCmsCollectionModel>>;
  key: string;
  slug: string;
  excludeId?: ObjectId | null;
}): Promise<boolean> {
  const orQuery: Record<string, unknown>[] = [];
  if (input.key) orQuery.push({ key: input.key });
  if (input.slug) orQuery.push({ slug: input.slug });
  if (orQuery.length === 0) return false;

  const query: Record<string, unknown> = { $or: orQuery };
  if (input.excludeId) {
    query._id = { $ne: input.excludeId };
  }

  const existing = await input.collection.findOne(query);
  return Boolean(existing);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> },
) {
  const authResult = await authorizeAdmin(CMS_READ_ROLES);
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { collection } = await params;
  if (!isCmsCollection(collection)) {
    return NextResponse.json({ success: false, error: "Invalid CMS collection" }, { status: 404 });
  }

  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const status = url.searchParams.get("status");
  const key = url.searchParams.get("key");
  const slug = url.searchParams.get("slug");
  const limit = Number(url.searchParams.get("limit") || 200);

  const query: Record<string, unknown> = {};

  if (status && status !== "all") {
    query.status = normalizeCmsStatus(status);
  }

  if (key) {
    query.key = normalizeCmsKey(key);
  }

  if (slug) {
    query.slug = normalizeCmsSlug(slug);
  }

  if (search && search.trim().length > 0) {
    query.$or = [
      { key: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
      { "title.en": { $regex: search, $options: "i" } },
      { "title.hr": { $regex: search, $options: "i" } },
    ];
  }

  try {
    const Collection = await getCmsCollectionModel(collection);
    const items = await Collection.find(query)
      .sort({ order: 1, updatedAt: -1 })
      .limit(Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 500) : 200)
      .toArray();

    return NextResponse.json({ success: true, collection, items });
  } catch (error) {
    console.error("Failed to load CMS collection:", error);
    return NextResponse.json({ success: false, error: "Failed to load CMS collection" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> },
) {
  const authResult = await authorizeAdmin(CMS_WRITE_ROLES);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { collection } = await params;
  if (!isCmsCollection(collection)) {
    return NextResponse.json({ success: false, error: "Invalid CMS collection" }, { status: 404 });
  }

  try {
    const rawBody = await req.json();
    const parsed = cmsDocSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid CMS payload" }, { status: 400 });
    }

    const normalized = normalizeCmsDocumentInput(parsed.data);
    const now = new Date();
    const Collection = await getCmsCollectionModel(collection);

    const key = normalized.key || slugify(normalized.slug || normalized.title.en || "item");
    const slug = normalized.slug || slugify(key || normalized.title.en || "item");

    if (!key || !slug) {
      return NextResponse.json({ success: false, error: "key and slug are required" }, { status: 400 });
    }

    const conflict = await hasKeySlugConflict({
      collection: Collection,
      key,
      slug,
    });

    if (conflict) {
      return NextResponse.json({ success: false, error: "Duplicate key or slug" }, { status: 409 });
    }

    const document = {
      ...normalized,
      key,
      slug,
      createdAt: now,
      updatedAt: now,
      createdBy: authResult.auth.id || authResult.auth.email || "unknown",
      updatedBy: authResult.auth.id || authResult.auth.email || "unknown",
    };

    const result = await Collection.insertOne(document);

    await logAuditEvent({
      action: "cms.created",
      entityType: collection,
      entityId: result.insertedId.toString(),
      details: { key: document.key, slug: document.slug, status: document.status },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({ success: true, id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    console.error("Failed to create CMS document:", error);
    return NextResponse.json({ success: false, error: "Failed to create CMS document" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> },
) {
  const authResult = await authorizeAdmin(CMS_WRITE_ROLES);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { collection } = await params;
  if (!isCmsCollection(collection)) {
    return NextResponse.json({ success: false, error: "Invalid CMS collection" }, { status: 404 });
  }

  try {
    const rawBody = await req.json();
    const parsed = bulkPatchSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid patch payload" }, { status: 400 });
    }

    const ids = parseBulkIds(parsed.data.ids);
    if (ids.length === 0) {
      return NextResponse.json({ success: false, error: "At least one id is required" }, { status: 400 });
    }

    const patch = parsed.data.patch || {};
    const setPayload: Record<string, unknown> = {
      updatedAt: new Date(),
      updatedBy: authResult.auth.id || authResult.auth.email || "unknown",
    };

    if (typeof patch.key === "string") {
      setPayload.key = normalizeCmsKey(patch.key);
    }

    if (typeof patch.slug === "string") {
      setPayload.slug = normalizeCmsSlug(patch.slug);
    }

    if (patch.status !== undefined) {
      setPayload.status = normalizeCmsStatus(patch.status);
    }

    if (patch.title && typeof patch.title === "object") {
      setPayload.title = patch.title;
    }

    if (patch.summary && typeof patch.summary === "object") {
      setPayload.summary = patch.summary;
    }

    if (patch.data && typeof patch.data === "object") {
      setPayload.data = patch.data;
    }

    if (typeof patch.order === "number") {
      setPayload.order = patch.order;
    }

    if (Object.keys(setPayload).length <= 2) {
      return NextResponse.json({ success: false, error: "No valid patch payload provided" }, { status: 400 });
    }

    const Collection = await getCmsCollectionModel(collection);

    if ((setPayload.key || setPayload.slug) && ids.length > 1) {
      return NextResponse.json(
        { success: false, error: "Bulk key/slug updates are only allowed for a single document" },
        { status: 400 },
      );
    }

    if (ids.length === 1 && (setPayload.key || setPayload.slug)) {
      const existing = await Collection.findOne({ _id: ids[0] });
      if (!existing) {
        return NextResponse.json({ success: false, error: "CMS document not found" }, { status: 404 });
      }

      const key = typeof setPayload.key === "string" ? setPayload.key : existing.key || "";
      const slug = typeof setPayload.slug === "string" ? setPayload.slug : existing.slug || "";
      if (!key || !slug) {
        return NextResponse.json({ success: false, error: "key and slug are required" }, { status: 400 });
      }

      const conflict = await hasKeySlugConflict({
        collection: Collection,
        key,
        slug,
        excludeId: ids[0],
      });

      if (conflict) {
        return NextResponse.json({ success: false, error: "Duplicate key or slug" }, { status: 409 });
      }
    }

    let previousSlugPath: string | null = null;
    let nextSlugPath: string | null = null;

    if (collection === "pages" && ids.length === 1 && typeof setPayload.slug === "string") {
      const beforeDoc = await Collection.findOne({ _id: ids[0] });
      if (beforeDoc) {
        previousSlugPath = slugToPath(beforeDoc.slug || "");
        nextSlugPath = slugToPath(setPayload.slug);
      }
    }

    const result = await Collection.updateMany(
      { _id: { $in: ids } },
      { $set: setPayload },
    );

    if (collection === "pages" && previousSlugPath && nextSlugPath && previousSlugPath !== nextSlugPath) {
      await upsertRedirectRule({
        fromPath: previousSlugPath,
        toPath: nextSlugPath,
        actor: authResult.auth,
      });
    }

    await logAuditEvent({
      action: "cms.bulk_updated",
      entityType: collection,
      details: {
        modifiedCount: result.modifiedCount,
        patchKeys: Object.keys(setPayload),
      },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({ success: true, matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error("Failed to bulk patch CMS collection:", error);
    return NextResponse.json({ success: false, error: "Failed to patch CMS collection" }, { status: 500 });
  }
}

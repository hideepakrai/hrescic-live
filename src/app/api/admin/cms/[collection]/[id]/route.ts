import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { authorizeAdmin } from "@/lib/auth";
import {
  CMS_READ_ROLES,
  CMS_WRITE_ROLES,
  isCmsCollection,
  normalizeCmsKey,
  normalizeCmsSlug,
  normalizeCmsStatus,
} from "@/lib/cms";
import { getCmsCollectionModel } from "@/models";
import { logAuditEvent } from "@/lib/audit";
import { upsertRedirectRule } from "@/lib/redirects";

const cmsPatchSchema = z.object({
  key: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  title: z.record(z.string(), z.any()).optional(),
  summary: z.record(z.string(), z.any()).optional(),
  data: z.record(z.string(), z.any()).optional(),
  order: z.number().int().optional(),
});

function toObjectId(id: string): ObjectId | null {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
}

function slugToPath(slug: string): string {
  const normalized = normalizeCmsSlug(slug);
  return normalized.length > 0 ? `/${normalized}` : "/";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> },
) {
  const authResult = await authorizeAdmin(CMS_READ_ROLES);
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { collection, id } = await params;

  if (!isCmsCollection(collection)) {
    return NextResponse.json({ success: false, error: "Invalid CMS collection" }, { status: 404 });
  }

  const objectId = toObjectId(id);
  if (!objectId) {
    return NextResponse.json({ success: false, error: "Invalid document id" }, { status: 400 });
  }

  try {
    const Collection = await getCmsCollectionModel(collection);
    const item = await Collection.findOne({ _id: objectId });

    if (!item) {
      return NextResponse.json({ success: false, error: "CMS document not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Failed to fetch CMS document:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch CMS document" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> },
) {
  const authResult = await authorizeAdmin(CMS_WRITE_ROLES);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { collection, id } = await params;

  if (!isCmsCollection(collection)) {
    return NextResponse.json({ success: false, error: "Invalid CMS collection" }, { status: 404 });
  }

  const objectId = toObjectId(id);
  if (!objectId) {
    return NextResponse.json({ success: false, error: "Invalid document id" }, { status: 400 });
  }

  try {
    const rawBody = await req.json();
    const parsed = cmsPatchSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid update payload" }, { status: 400 });
    }

    const body = parsed.data;
    const setPayload: Record<string, unknown> = {
      updatedAt: new Date(),
      updatedBy: authResult.auth.id || authResult.auth.email || "unknown",
    };

    if (typeof body.key === "string") {
      setPayload.key = normalizeCmsKey(body.key);
    }

    if (typeof body.slug === "string") {
      setPayload.slug = normalizeCmsSlug(body.slug);
    }

    if (body.status !== undefined) {
      setPayload.status = normalizeCmsStatus(body.status);
    }

    if (body.title && typeof body.title === "object") {
      setPayload.title = body.title;
    }

    if (body.summary && typeof body.summary === "object") {
      setPayload.summary = body.summary;
    }

    if (body.data && typeof body.data === "object") {
      setPayload.data = body.data;
    }

    if (typeof body.order === "number") {
      setPayload.order = body.order;
    }

    if (Object.keys(setPayload).length <= 2) {
      return NextResponse.json({ success: false, error: "No update payload provided" }, { status: 400 });
    }

    const Collection = await getCmsCollectionModel(collection);
    const existing = await Collection.findOne({ _id: objectId });
    if (!existing) {
      return NextResponse.json({ success: false, error: "CMS document not found" }, { status: 404 });
    }

    if (setPayload.key || setPayload.slug) {
      const candidateKey = typeof setPayload.key === "string" ? setPayload.key : existing.key;
      const candidateSlug = typeof setPayload.slug === "string" ? setPayload.slug : existing.slug;

      if (!candidateKey || !candidateSlug) {
        return NextResponse.json({ success: false, error: "key and slug are required" }, { status: 400 });
      }

      const conflict = await Collection.findOne({
        _id: { $ne: objectId },
        $or: [{ key: candidateKey }, { slug: candidateSlug }],
      });

      if (conflict) {
        return NextResponse.json({ success: false, error: "Duplicate key or slug" }, { status: 409 });
      }
    }

    const oldPath = collection === "pages" ? slugToPath(existing.slug || "") : null;
    const newPath =
      collection === "pages" && typeof setPayload.slug === "string"
        ? slugToPath(setPayload.slug)
        : null;

    const result = await Collection.findOneAndUpdate(
      { _id: objectId },
      { $set: setPayload },
      { returnDocument: "after" },
    );

    if (!result) {
      return NextResponse.json({ success: false, error: "CMS document not found" }, { status: 404 });
    }

    if (collection === "pages" && oldPath && newPath && oldPath !== newPath) {
      await upsertRedirectRule({
        fromPath: oldPath,
        toPath: newPath,
        actor: authResult.auth,
      });
    }

    await logAuditEvent({
      action: "cms.updated",
      entityType: collection,
      entityId: id,
      details: {
        patchKeys: Object.keys(setPayload),
      },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({ success: true, item: result });
  } catch (error) {
    console.error("Failed to patch CMS document:", error);
    return NextResponse.json({ success: false, error: "Failed to patch CMS document" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> },
) {
  const authResult = await authorizeAdmin(["super_admin"]);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { collection, id } = await params;

  if (!isCmsCollection(collection)) {
    return NextResponse.json({ success: false, error: "Invalid CMS collection" }, { status: 404 });
  }

  const objectId = toObjectId(id);
  if (!objectId) {
    return NextResponse.json({ success: false, error: "Invalid document id" }, { status: 400 });
  }

  try {
    const Collection = await getCmsCollectionModel(collection);
    const result = await Collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "CMS document not found" }, { status: 404 });
    }

    await logAuditEvent({
      action: "cms.deleted",
      entityType: collection,
      entityId: id,
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete CMS document:", error);
    return NextResponse.json({ success: false, error: "Failed to delete CMS document" }, { status: 500 });
  }
}

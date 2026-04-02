import { NextRequest, NextResponse } from "next/server";
import { isCmsCollection, normalizeCmsKey, normalizeCmsSlug, normalizeCmsStatus } from "@/lib/cms";
import { getCmsCollectionModel } from "@/models";

function jsonNoStore(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;

  if (!isCmsCollection(collection)) {
    return jsonNoStore({ success: false, error: "Invalid CMS collection" }, 404);
  }

  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  const slug = url.searchParams.get("slug");
  const limit = Number(url.searchParams.get("limit") || 100);

  const query: Record<string, unknown> = {
    status: normalizeCmsStatus("published"),
  };

  if (key) {
    query.key = normalizeCmsKey(key);
  }

  if (slug) {
    query.slug = normalizeCmsSlug(slug);
  }

  try {
    const Collection = await getCmsCollectionModel(collection);
    const items = await Collection.find(query)
      .sort({ order: 1, updatedAt: -1 })
      .limit(Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 500) : 100)
      .toArray();

    return jsonNoStore({ success: true, collection, items });
  } catch (error) {
    console.error("Failed to fetch public CMS collection:", error);
    return jsonNoStore({ success: false, error: "Failed to fetch CMS data" }, 500);
  }
}

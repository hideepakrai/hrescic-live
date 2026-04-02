import { AuthenticatedAdmin } from "@/lib/auth";
import { getCmsCollectionModel } from "@/models";

export interface RedirectRule {
  fromPath: string;
  toPath: string;
  statusCode: number;
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname.trim().length === 0) return "/";
  const value = pathname.trim();
  const prefixed = value.startsWith("/") ? value : `/${value}`;
  return prefixed.replace(/\/+$/, "") || "/";
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function resolveRedirectPath(pathname: string): Promise<RedirectRule | null> {
  const Redirects = await getCmsCollectionModel("redirects");
  const fromPath = normalizePath(pathname);

  const doc = await Redirects.findOne({
    status: "published",
    "data.isActive": { $ne: false },
    "data.fromPath": fromPath,
  });

  if (!doc || !doc.data || typeof doc.data !== "object") {
    return null;
  }

  const data = doc.data as Record<string, unknown>;
  const toPath = typeof data.toPath === "string" ? normalizePath(data.toPath) : "";
  const statusCode = typeof data.statusCode === "number" ? data.statusCode : 301;

  if (!toPath || toPath === fromPath) {
    return null;
  }

  return {
    fromPath,
    toPath,
    statusCode: statusCode === 302 ? 302 : 301,
  };
}

export async function upsertRedirectRule(input: {
  fromPath: string;
  toPath: string;
  actor?: AuthenticatedAdmin | null;
}): Promise<void> {
  const fromPath = normalizePath(input.fromPath);
  const toPath = normalizePath(input.toPath);

  if (fromPath === toPath) return;

  const Redirects = await getCmsCollectionModel("redirects");
  const now = new Date();

  const key = `redirect:${fromPath}->${toPath}`;
  const slug = slugify(`${fromPath}-${toPath}`);

  await Redirects.updateOne(
    { key },
    {
      $set: {
        slug,
        status: "published",
        title: { en: `Redirect ${fromPath}`, hr: "" },
        summary: { en: `${fromPath} -> ${toPath}`, hr: "" },
        data: {
          fromPath,
          toPath,
          statusCode: 301,
          isActive: true,
        },
        updatedAt: now,
        updatedBy: input.actor?.id || input.actor?.email || "system",
      },
      $setOnInsert: {
        key,
        order: 0,
        createdAt: now,
        createdBy: input.actor?.id || input.actor?.email || "system",
      },
    },
    { upsert: true },
  );
}

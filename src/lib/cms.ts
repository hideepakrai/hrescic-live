import { AdminRole } from "@/lib/auth";
import { LocalizedText, ensureLocalizedText } from "@/types/localization";

export const CMS_COLLECTIONS = [
  "pages",
  "pricing-plans",
  "services",
  "industries",
  "case-studies",
  "insights",
  "navigation",
  "settings",
  "seo",
  "redirects",
  "media",
] as const;

export type CmsCollection = (typeof CMS_COLLECTIONS)[number];

export type CmsStatus = "draft" | "published" | "archived";

export interface CmsDocument {
  _id?: string;
  key: string;
  slug: string;
  status: CmsStatus;
  title: LocalizedText;
  summary?: LocalizedText;
  data?: Record<string, unknown>;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export const CMS_READ_ROLES: AdminRole[] = [
  "super_admin",
  "content_manager",
  "sales_crm",
];

export const CMS_WRITE_ROLES: AdminRole[] = ["super_admin", "content_manager", "sales_crm"];

const CMS_SET = new Set<string>(CMS_COLLECTIONS);

export function isCmsCollection(value: string): value is CmsCollection {
  return CMS_SET.has(value);
}

export function normalizeCmsKey(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeCmsSlug(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .toLowerCase()
    .trim()
    .replace(/^\/+/, "")
    .replace(/[^a-z0-9/_-]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/-+/g, "-")
    .replace(/^[-/]+|[-/]+$/g, "");
}

export function normalizeCmsStatus(value: unknown): CmsStatus {
  if (value === "published" || value === "archived") {
    return value;
  }

  return "draft";
}

export function normalizeCmsDocumentInput(input: Record<string, unknown>): Omit<CmsDocument, "_id"> {
  const key = normalizeCmsKey(input.key);
  const slug = normalizeCmsSlug(input.slug);

  return {
    key,
    slug,
    status: normalizeCmsStatus(input.status),
    title: ensureLocalizedText(input.title),
    summary: ensureLocalizedText(input.summary),
    order: typeof input.order === "number" ? input.order : 0,
    data:
      input.data && typeof input.data === "object"
        ? (input.data as Record<string, unknown>)
        : {},
  };
}

export function getDefaultCmsDocument(collection: CmsCollection): Omit<CmsDocument, "_id"> {
  if (collection === "pricing-plans") {
    return {
      key: "start",
      slug: "start",
      status: "draft",
      order: 1,
      title: { en: "START", hr: "" },
      summary: { en: "Plan summary", hr: "" },
      data: {
        headline: { en: "You're not getting the sales or inquiries you should.", hr: "" },
        subline: { en: "People aren't clearly understanding your offer or your value.", hr: "" },
        oneTimeTitle: { en: "One-time foundation", hr: "" },
        oneTimeItems: [],
        monthlyTitle: { en: "Monthly rhythm", hr: "" },
        monthlyItems: [],
        idealTitle: { en: "Ideal if you want", hr: "" },
        idealText: { en: "", hr: "" },
        cta: "/lets-talk#demo",
      },
    };
  }

  return {
    key: "",
    slug: "",
    status: "draft",
    order: 0,
    title: { en: "", hr: "" },
    summary: { en: "", hr: "" },
    data: {},
  };
}

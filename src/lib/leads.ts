export const LEAD_FORM_TYPES = ["demo", "ask"] as const;
export type LeadFormType = (typeof LEAD_FORM_TYPES)[number];

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed_won",
  "closed_lost",
  "spam",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface LeadTimelineEntry {
  type: "created" | "status_changed" | "assigned" | "note";
  note: string;
  createdAt: Date;
  by: {
    id?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export interface LeadUtmMeta {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface LeadCreatePayload {
  formType: LeadFormType;
  name: string;
  email: string;
  company?: string;
  website?: string;
  message: string;
  page?: string;
  locale?: string;
  utm?: LeadUtmMeta;
}

export function isLeadFormType(value: unknown): value is LeadFormType {
  return typeof value === "string" && (LEAD_FORM_TYPES as readonly string[]).includes(value);
}

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);
}

export function createTimelineEntry(
  type: LeadTimelineEntry["type"],
  note: string,
  by: LeadTimelineEntry["by"],
): LeadTimelineEntry {
  return {
    type,
    note,
    by,
    createdAt: new Date(),
  };
}

export function sanitizeOptionalString(input: unknown): string | undefined {
  if (typeof input !== "string") return undefined;
  const value = input.trim();
  return value.length > 0 ? value : undefined;
}

export function normalizeLeadCreatePayload(input: Record<string, unknown>): LeadCreatePayload | null {
  if (!isLeadFormType(input.formType)) {
    return null;
  }

  const name = sanitizeOptionalString(input.name);
  const email = sanitizeOptionalString(input.email);
  const message = sanitizeOptionalString(input.message);

  if (!name || !email || !message) {
    return null;
  }

  const payload: LeadCreatePayload = {
    formType: input.formType,
    name,
    email,
    message,
    company: sanitizeOptionalString(input.company),
    website: sanitizeOptionalString(input.website),
    page: sanitizeOptionalString(input.page),
    locale: sanitizeOptionalString(input.locale),
    utm:
      input.utm && typeof input.utm === "object"
        ? {
            source: sanitizeOptionalString((input.utm as Record<string, unknown>).source),
            medium: sanitizeOptionalString((input.utm as Record<string, unknown>).medium),
            campaign: sanitizeOptionalString((input.utm as Record<string, unknown>).campaign),
            term: sanitizeOptionalString((input.utm as Record<string, unknown>).term),
            content: sanitizeOptionalString((input.utm as Record<string, unknown>).content),
          }
        : undefined,
  };

  if (payload.formType === "ask") {
    payload.company = undefined;
    payload.website = undefined;
  }

  return payload;
}

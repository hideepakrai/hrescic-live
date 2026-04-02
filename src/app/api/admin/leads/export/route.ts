import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth";
import { isLeadFormType, isLeadStatus } from "@/lib/leads";
import { getLeadModel } from "@/models";

const ALLOWED_ROLES = ["super_admin", "sales_crm"] as const;

function parseDateValue(value: string | null): Date | null {
  if (!value || value.trim().length === 0) return null;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return date;
}

function toCsvValue(value: unknown): string {
  const str = value == null ? "" : String(value);
  const escaped = str.replace(/"/g, "\"\"");
  return `"${escaped}"`;
}

export async function GET(req: NextRequest) {
  const authResult = await authorizeAdmin([...ALLOWED_ROLES]);
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const formType = url.searchParams.get("formType");
  const assignee = url.searchParams.get("assignee");
  const dateFrom = parseDateValue(url.searchParams.get("dateFrom"));
  const dateTo = parseDateValue(url.searchParams.get("dateTo"));
  const format = (url.searchParams.get("format") || "csv").toLowerCase();

  if (format !== "csv") {
    return NextResponse.json({ success: false, error: "Only csv format is supported" }, { status: 400 });
  }

  const query: Record<string, unknown> = {};

  if (isLeadStatus(status)) query.status = status;
  if (isLeadFormType(formType)) query.formType = formType;
  if (assignee && assignee.trim().length > 0) query.assigneeId = assignee.trim();

  if (dateFrom || dateTo) {
    const range: Record<string, Date> = {};
    if (dateFrom) range.$gte = dateFrom;
    if (dateTo) range.$lte = dateTo;
    query.createdAt = range;
  }

  try {
    const Lead = await getLeadModel();
    const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(10_000).toArray();

    const headers = [
      "id",
      "createdAt",
      "updatedAt",
      "status",
      "formType",
      "name",
      "email",
      "company",
      "website",
      "message",
      "page",
      "locale",
      "assigneeId",
      "followUpAt",
    ];

    const lines = [headers.join(",")];

    for (const lead of leads) {
      const row = [
        lead._id?.toString() || "",
        lead.createdAt ? new Date(lead.createdAt).toISOString() : "",
        lead.updatedAt ? new Date(lead.updatedAt).toISOString() : "",
        lead.status || "",
        lead.formType || "",
        lead.name || "",
        lead.email || "",
        lead.company || "",
        lead.website || "",
        lead.message || "",
        lead.page || "",
        lead.locale || "",
        lead.assigneeId || "",
        lead.followUpAt ? new Date(lead.followUpAt).toISOString() : "",
      ];

      lines.push(row.map(toCsvValue).join(","));
    }

    const csv = lines.join("\n");
    const filename = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to export leads:", error);
    return NextResponse.json({ success: false, error: "Failed to export leads" }, { status: 500 });
  }
}

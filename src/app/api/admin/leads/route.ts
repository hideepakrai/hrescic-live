import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { authorizeAdmin } from "@/lib/auth";
import { createTimelineEntry, isLeadFormType, isLeadStatus, LEAD_STATUSES } from "@/lib/leads";
import { getLeadModel, getUserModel } from "@/models";
import { logAuditEvent } from "@/lib/audit";

const ALLOWED_ROLES = ["super_admin", "sales_crm"] as const;

const bulkUpdateSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(200),
  status: z.enum(LEAD_STATUSES).optional(),
  assigneeId: z.string().nullable().optional(),
  followUpAt: z.string().nullable().optional(),
  note: z.string().trim().max(2_000).optional(),
});

function toObjectIdList(ids: string[]): ObjectId[] {
  return ids
    .map((value) => (ObjectId.isValid(value) ? new ObjectId(value) : null))
    .filter((value): value is ObjectId => Boolean(value));
}

function parseDateValue(value: string | null): Date | null {
  if (!value || value.trim().length === 0) return null;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return date;
}

async function resolveAssigneeId(rawAssigneeId: string | null | undefined): Promise<{
  ok: boolean;
  value: string | null;
  error?: string;
}> {
  if (rawAssigneeId === undefined) {
    return { ok: true, value: null };
  }

  if (rawAssigneeId === null || rawAssigneeId.trim().length === 0) {
    return { ok: true, value: null };
  }

  if (!ObjectId.isValid(rawAssigneeId)) {
    return { ok: false, value: null, error: "Invalid assignee id" };
  }

  const User = await getUserModel();
  const assignee = await User.findOne({
    _id: new ObjectId(rawAssigneeId),
    isActive: { $ne: false },
  });

  if (!assignee) {
    return { ok: false, value: null, error: "Assignee not found or inactive" };
  }

  return { ok: true, value: rawAssigneeId };
}

export async function GET(req: NextRequest) {
  const authResult = await authorizeAdmin([...ALLOWED_ROLES]);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const formType = url.searchParams.get("formType");
  const assignee = url.searchParams.get("assignee");
  const search = url.searchParams.get("search");
  const dateFrom = parseDateValue(url.searchParams.get("dateFrom"));
  const dateTo = parseDateValue(url.searchParams.get("dateTo"));
  const followUpFrom = parseDateValue(url.searchParams.get("followUpFrom"));
  const followUpTo = parseDateValue(url.searchParams.get("followUpTo"));
  const overdue = url.searchParams.get("overdue") === "true";

  const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
  const pageSizeRaw = Number(url.searchParams.get("pageSize") || url.searchParams.get("limit") || "50");
  const pageSize = Number.isFinite(pageSizeRaw) ? Math.min(Math.max(pageSizeRaw, 1), 500) : 50;

  const query: Record<string, unknown> = {};

  if (isLeadStatus(status)) {
    query.status = status;
  }

  if (isLeadFormType(formType)) {
    query.formType = formType;
  }

  if (typeof assignee === "string" && assignee.trim().length > 0) {
    query.assigneeId = assignee;
  }

  if (typeof search === "string" && search.trim().length > 0) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }

  if (dateFrom || dateTo) {
    const createdAtRange: Record<string, Date> = {};
    if (dateFrom) createdAtRange.$gte = dateFrom;
    if (dateTo) createdAtRange.$lte = dateTo;
    query.createdAt = createdAtRange;
  }

  if (followUpFrom || followUpTo) {
    const followRange: Record<string, Date> = {};
    if (followUpFrom) followRange.$gte = followUpFrom;
    if (followUpTo) followRange.$lte = followUpTo;
    query.followUpAt = followRange;
  }

  if (overdue) {
    query.followUpAt = { ...(query.followUpAt as Record<string, Date> || {}), $lt: new Date() };
    if (!query.status) {
      query.status = { $nin: ["closed_won", "closed_lost", "spam"] };
    }
  }

  try {
    const Lead = await getLeadModel();
    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return NextResponse.json({
      success: true,
      leads,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const authResult = await authorizeAdmin([...ALLOWED_ROLES]);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const rawBody = await req.json();
    const parsed = bulkUpdateSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid update payload" }, { status: 400 });
    }

    const body = parsed.data;
    const ids = toObjectIdList(body.ids);

    if (ids.length === 0) {
      return NextResponse.json({ success: false, error: "At least one valid lead id is required" }, { status: 400 });
    }

    const setPayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    const timelineEntries = [];

    if (body.status && isLeadStatus(body.status)) {
      setPayload.status = body.status;
      timelineEntries.push(
        createTimelineEntry("status_changed", `Status changed to ${body.status}`, {
          id: authResult.auth.id,
          email: authResult.auth.email,
          role: authResult.auth.role,
        }),
      );
    }

    if (body.assigneeId !== undefined) {
      const assigneeResult = await resolveAssigneeId(body.assigneeId);
      if (!assigneeResult.ok) {
        return NextResponse.json({ success: false, error: assigneeResult.error }, { status: 400 });
      }

      setPayload.assigneeId = assigneeResult.value;
      timelineEntries.push(
        createTimelineEntry(
          "assigned",
          assigneeResult.value ? `Assigned to ${assigneeResult.value}` : "Lead unassigned",
          {
            id: authResult.auth.id,
            email: authResult.auth.email,
            role: authResult.auth.role,
          },
        ),
      );
    }

    if (body.followUpAt !== undefined) {
      const followUp = parseDateValue(body.followUpAt);
      setPayload.followUpAt = followUp;
    }

    if (typeof body.note === "string" && body.note.trim().length > 0) {
      timelineEntries.push(
        createTimelineEntry("note", body.note.trim(), {
          id: authResult.auth.id,
          email: authResult.auth.email,
          role: authResult.auth.role,
        }),
      );
    }

    if (Object.keys(setPayload).length === 1 && timelineEntries.length === 0) {
      return NextResponse.json({ success: false, error: "No update payload provided" }, { status: 400 });
    }

    const updateQuery: Record<string, unknown> = { $set: setPayload };
    if (timelineEntries.length > 0) {
      updateQuery.$push = { timeline: { $each: timelineEntries } };
    }

    const Lead = await getLeadModel();
    const result = await Lead.updateMany({ _id: { $in: ids } }, updateQuery);

    await logAuditEvent({
      action: "lead.bulk_updated",
      entityType: "lead",
      details: {
        count: result.modifiedCount,
        status: body.status || null,
        assigneeId: body.assigneeId ?? null,
      },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Failed to bulk update leads:", error);
    return NextResponse.json({ success: false, error: "Failed to update leads" }, { status: 500 });
  }
}

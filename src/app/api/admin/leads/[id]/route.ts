import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { authorizeAdmin } from "@/lib/auth";
import { createTimelineEntry, isLeadStatus, LEAD_STATUSES } from "@/lib/leads";
import { getLeadModel, getUserModel } from "@/models";
import { logAuditEvent } from "@/lib/audit";

const ALLOWED_ROLES = ["super_admin", "sales_crm"] as const;

const updateLeadSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  assigneeId: z.string().nullable().optional(),
  followUpAt: z.string().nullable().optional(),
  note: z.string().trim().max(2_000).optional(),
});

function parseObjectId(id: string): ObjectId | null {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
}

function parseDateValue(value: string | null | undefined): Date | null {
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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authorizeAdmin([...ALLOWED_ROLES]);
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await params;
  const leadId = parseObjectId(id);

  if (!leadId) {
    return NextResponse.json({ success: false, error: "Invalid lead id" }, { status: 400 });
  }

  try {
    const Lead = await getLeadModel();
    const lead = await Lead.findOne({ _id: leadId });

    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Failed to fetch lead detail:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch lead" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authorizeAdmin([...ALLOWED_ROLES]);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await params;
  const leadId = parseObjectId(id);

  if (!leadId) {
    return NextResponse.json({ success: false, error: "Invalid lead id" }, { status: 400 });
  }

  try {
    const rawBody = await req.json();
    const parsed = updateLeadSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid update payload" }, { status: 400 });
    }

    const body = parsed.data;
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
      setPayload.followUpAt = parseDateValue(body.followUpAt);
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

    const updatePayload: Record<string, unknown> = { $set: setPayload };
    if (timelineEntries.length > 0) {
      updatePayload.$push = { timeline: { $each: timelineEntries } };
    }

    const Lead = await getLeadModel();
    const result = await Lead.findOneAndUpdate(
      { _id: leadId },
      updatePayload,
      { returnDocument: "after" },
    );

    if (!result) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    await logAuditEvent({
      action: "lead.updated",
      entityType: "lead",
      entityId: id,
      details: {
        status: body.status || null,
        assigneeId: body.assigneeId ?? null,
        hasNote: typeof body.note === "string" && body.note.trim().length > 0,
      },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({ success: true, lead: result });
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}

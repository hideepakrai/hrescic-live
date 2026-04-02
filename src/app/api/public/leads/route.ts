import { NextRequest, NextResponse } from "next/server";
import { getLeadModel } from "@/models";
import { createTimelineEntry, normalizeLeadCreatePayload } from "@/lib/leads";
import { logAuditEvent } from "@/lib/audit";
import { getRequestContext } from "@/lib/request-context";
import { isRateLimited, verifyCaptchaToken } from "@/lib/public-security";
import { sendLeadNotificationEmail } from "@/lib/mailer";
import { z } from "zod";

const leadSchema = z.object({
  formType: z.enum(["demo", "ask"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).optional().nullable(),
  website: z.string().trim().max(500).optional().nullable(),
  message: z.string().trim().min(3).max(4000),
  page: z.string().trim().max(300).optional(),
  locale: z.string().trim().max(16).optional(),
  utm: z.object({
    source: z.string().trim().max(120).optional(),
    medium: z.string().trim().max(120).optional(),
    campaign: z.string().trim().max(120).optional(),
    term: z.string().trim().max(120).optional(),
    content: z.string().trim().max(120).optional(),
  }).partial().optional(),
  captchaToken: z.string().trim().min(1).max(2048),
});

const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(req)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Public lead validation failed:", parsed.error.format());
      return NextResponse.json(
        { success: false, error: "Invalid lead payload", details: parsed.error.format() },
        { status: 400 },
      );
    }

    const captchaOk = await verifyCaptchaToken(parsed.data.captchaToken);
    if (!captchaOk) {
      return NextResponse.json(
        { success: false, error: "Captcha verification failed" },
        { status: 400 },
      );
    }

    const payload = normalizeLeadCreatePayload(parsed.data as unknown as Record<string, unknown>);

    if (!payload) {
      console.error("Lead normalization failed:", parsed.data);
      return NextResponse.json(
        { success: false, error: "Invalid lead payload", code: "normalization_failed" },
        { status: 400 },
      );
    }

    const Lead = await getLeadModel();
    const now = new Date();
    const context = getRequestContext(req);

    const duplicate = await Lead.findOne({
      formType: payload.formType,
      email: payload.email.toLowerCase(),
      message: payload.message,
      createdAt: { $gte: new Date(Date.now() - DEDUPE_WINDOW_MS) },
    });

    if (duplicate?._id) {
      return NextResponse.json(
        {
          success: true,
          leadId: duplicate._id.toString(),
          deduped: true,
        },
        { status: 200 },
      );
    }

    const leadDoc = {
      formType: payload.formType,
      name: payload.name,
      email: payload.email.toLowerCase(),
      company: payload.company || null,
      website: payload.website || null,
      message: payload.message,
      page: payload.page || "/lets-talk",
      locale: payload.locale || "en",
      utm: payload.utm || {},
      source: "website",
      status: "new",
      assigneeId: null,
      followUpAt: null,
      antiSpam: {
        captchaVerified: true,
        requestId: context.requestId,
        ip: context.ip,
        userAgent: context.userAgent,
      },
      timeline: [
        createTimelineEntry("created", `Lead submitted via ${payload.formType} form`, {
          id: null,
          email: null,
          role: "system",
        }),
      ],
      createdAt: now,
      updatedAt: now,
    };

    const result = await Lead.insertOne(leadDoc);

    await logAuditEvent({
      action: "lead.created",
      entityType: "lead",
      entityId: result.insertedId.toString(),
      details: {
        formType: payload.formType,
        page: leadDoc.page,
      },
      actor: null,
      request: req,
    });

    void sendLeadNotificationEmail({
      leadId: result.insertedId.toString(),
      formType: payload.formType,
      name: payload.name,
      email: payload.email.toLowerCase(),
      company: payload.company || null,
      website: payload.website || null,
      message: payload.message,
      page: leadDoc.page,
      locale: leadDoc.locale,
      createdAt: now,
    });

    return NextResponse.json(
      {
        success: true,
        leadId: result.insertedId.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Public lead submission failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create lead" },
      { status: 500 },
    );
  }
}

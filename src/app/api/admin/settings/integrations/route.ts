import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth";
import { getCmsCollectionModel } from "@/models";
import { logAuditEvent } from "@/lib/audit";
import { z } from "zod";

const integrationsSettingsSchema = z.object({
  ga4Id: z.string().trim().max(100).or(z.literal("")).optional(),
  recaptchaPublicKey: z.string().trim().max(500).or(z.literal("")).optional(),
  recaptchaPrivateKey: z.string().trim().max(500).or(z.literal("")).optional(),
  smtpHost: z.string().trim().max(500).or(z.literal("")).optional(),
  smtpPort: z.string().trim().max(500).or(z.literal("")).optional(),
  smtpUser: z.string().trim().max(500).or(z.literal("")).optional(),
  smtpPass: z.string().trim().max(500).or(z.literal("")).optional(),
  smtpFrom: z.string().trim().max(500).or(z.literal("")).optional(),
  smtpFromName: z.string().trim().max(500).or(z.literal("")).optional(),
  notificationsEnabled: z.boolean().optional(),
  notifyRecipients: z.string().trim().max(1000).or(z.literal("")).optional(),
});

export async function GET() {
  const authResult = await authorizeAdmin(["super_admin"]);
  if (!authResult.ok) {
    return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
  }

  try {
    const Settings = await getCmsCollectionModel("settings");
    const config = await Settings.findOne({ key: "integrations" });

    return NextResponse.json({ 
      success: true, 
      integrations: config?.data || {
        ga4Id: "",
        recaptchaPublicKey: "",
        recaptchaPrivateKey: "",
        smtpHost: "",
        smtpPort: "587",
        smtpUser: "",
        smtpPass: "",
        smtpFrom: "",
        smtpFromName: "Hrescic",
        notificationsEnabled: true,
        notifyRecipients: "",
      } 
    });
  } catch (error) {
    console.error("Failed to fetch integration settings:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authResult = await authorizeAdmin(["super_admin"]);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
  }

  try {
    const rawBody = await req.json();
    const parsed = integrationsSettingsSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid integrations payload" }, { status: 400 });
    }

    const Settings = await getCmsCollectionModel("settings");
    const now = new Date();

    await Settings.updateOne(
      { key: "integrations" },
      {
        $set: {
          key: "integrations",
          slug: "integrations-config",
          title: { en: "Third-party Integrations", hr: "Integracije trećih strana" },
          status: "published",
          data: parsed.data,
          updatedAt: now,
          updatedBy: authResult.auth.id || authResult.auth.email || "unknown",
        },
      },
      { upsert: true }
    );

    await logAuditEvent({
      action: "settings.updated",
      entityType: "settings",
      entityId: "integrations",
      details: { module: "integrations", patchKeys: Object.keys(parsed.data) },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({ success: true, message: "Integrations updated successfully" });
  } catch (error) {
    console.error("Failed to update integration settings:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}

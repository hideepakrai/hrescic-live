import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth";
import { getCmsCollectionModel } from "@/models";
import { logAuditEvent } from "@/lib/audit";
import { z } from "zod";

const generalSettingsSchema = z.object({
  siteName: z.string().min(1).max(100).optional(),
  siteDescription: z.string().max(500).optional(),
  logoUrl: z.string().url().or(z.literal("")).optional(),
  faviconUrl: z.string().url().or(z.literal("")).optional(),
  socialLinks: z.object({
    instagram: z.string().url().or(z.literal("")).optional(),
    linkedin: z.string().url().or(z.literal("")).optional(),
    twitter: z.string().url().or(z.literal("")).optional(),
    facebook: z.string().url().or(z.literal("")).optional(),
  }).optional(),
  supportEmail: z.string().email().or(z.literal("")).optional(),
});

export async function GET() {
  const authResult = await authorizeAdmin(["super_admin", "content_manager"]);
  if (!authResult.ok) {
    return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
  }

  try {
    const Settings = await getCmsCollectionModel("settings");
    const config = await Settings.findOne({ key: "site_config" });

    return NextResponse.json({ 
      success: true, 
      settings: config?.data || {
        siteName: "Hrescic",
        siteDescription: "Creative and strategy agency",
        logoUrl: "/assets/Image/hrescic-logo.svg",
        faviconUrl: "/favicon.ico",
        socialLinks: { instagram: "", linkedin: "", twitter: "", facebook: "" },
        supportEmail: "hello@hrescic.com",
      } 
    });
  } catch (error) {
    console.error("Failed to fetch general settings:", error);
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
    const parsed = generalSettingsSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid settings payload" }, { status: 400 });
    }

    const Settings = await getCmsCollectionModel("settings");
    const now = new Date();

    await Settings.updateOne(
      { key: "site_config" },
      {
        $set: {
          key: "site_config",
          slug: "site-config",
          title: { en: "Site Configuration", hr: "Konfiguracija stranice" },
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
      entityId: "site_config",
      details: { module: "general", patchKeys: Object.keys(parsed.data) },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error("Failed to update general settings:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}

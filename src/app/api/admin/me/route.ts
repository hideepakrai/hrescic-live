import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth";

const CMS_WRITE_ROLES = new Set(["super_admin", "content_manager"]);
const LEADS_WRITE_ROLES = new Set(["super_admin", "sales_crm"]);

import { z } from "zod";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { getUserModel } from "@/models";
import { logAuditEvent } from "@/lib/audit";

const updateProfileSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  password: z.string().min(8).max(256).optional(),
});

export async function GET() {
  const authResult = await authorizeAdmin(["super_admin", "content_manager", "sales_crm"]);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
  }

  const role = authResult.auth.role;
  const rawRole = authResult.auth.rawRole || "";

  // Robust check: any super_admin, admin, or content_manager should have write access.
  const canWriteCms = 
    role === "super_admin" || 
    role === "content_manager" || 
    rawRole.toLowerCase().includes("admin");

  return NextResponse.json(
    {
      success: true,
      admin: {
        id: authResult.auth.id || null,
        email: authResult.auth.email || null,
        role,
        rawRole,
        name: authResult.auth.name || "", // Add name placeholder if available
      },
      permissions: {
        canWriteCms,
        canWriteFormsCms: canWriteCms,
        canManageUsers: role === "super_admin" || rawRole.toLowerCase().includes("owner"),
        canManageLeads: role === "super_admin" || role === "sales_crm" || rawRole.toLowerCase().includes("sales"),
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PATCH(req: NextRequest) {
  const authResult = await authorizeAdmin(["super_admin", "content_manager", "sales_crm"]);
  if (!authResult.ok || !authResult.auth || !authResult.auth.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawBody = await req.json();
    const parsed = updateProfileSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid profile payload" }, { status: 400 });
    }

    const { name, password } = parsed.data;
    const setPayload: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (name) setPayload.name = name;
    if (password) {
      setPayload.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(setPayload).length === 1) {
      return NextResponse.json({ success: false, error: "No update payload provided" }, { status: 400 });
    }

    const User = await getUserModel();
    const result = await User.findOneAndUpdate(
      { _id: new ObjectId(authResult.auth.id) },
      { $set: setPayload },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    await logAuditEvent({
      action: "user.profile_updated",
      entityType: "user",
      entityId: authResult.auth.id,
      details: { patchKeys: Object.keys(setPayload) },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}

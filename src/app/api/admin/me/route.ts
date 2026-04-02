import { NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth";

const CMS_WRITE_ROLES = new Set(["super_admin", "content_manager"]);
const LEADS_WRITE_ROLES = new Set(["super_admin", "sales_crm"]);

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

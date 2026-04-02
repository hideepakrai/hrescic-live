import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth";
import { getAuditLogModel } from "@/models";

export async function GET(req: NextRequest) {
  const authResult = await authorizeAdmin(["super_admin"]);
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    const entityType = url.searchParams.get("entityType");
    const limit = Number(url.searchParams.get("limit") || 200);

    const query: Record<string, unknown> = {};

    if (action) {
      query.action = action;
    }

    if (entityType) {
      query.entityType = entityType;
    }

    const AuditLog = await getAuditLogModel();
    const logs = await AuditLog.find(query)
      .sort({ createdAt: -1 })
      .limit(Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 1000) : 200)
      .toArray();

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error("Failed to fetch audit logs:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch audit logs" }, { status: 500 });
  }
}

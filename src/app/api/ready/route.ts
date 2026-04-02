import { NextResponse } from "next/server";
import { connectMasterDB, connectTenantDB } from "@/lib/db";

export async function GET() {
  try {
    const [master, tenant] = await Promise.all([connectMasterDB(), connectTenantDB()]);
    await Promise.all([master.command({ ping: 1 }), tenant.command({ ping: 1 })]);

    return NextResponse.json({
      success: true,
      status: "ready",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Readiness check failed:", error);
    return NextResponse.json(
      { success: false, status: "not_ready", error: "Database connection failed" },
      { status: 503 },
    );
  }
}

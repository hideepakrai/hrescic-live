import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { authenticateAdmin } from "@/lib/auth";
import { logAuditEvent } from "@/lib/audit";

export async function POST(req: Request) {
  const auth = await authenticateAdmin();

  const cookie = serialize("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  if (auth) {
    await logAuditEvent({
      action: "admin.logout",
      entityType: "session",
      actor: auth,
      request: req,
    });
  }

  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", cookie);
  return response;
}

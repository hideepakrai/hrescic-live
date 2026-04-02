import { NextRequest, NextResponse } from "next/server";
import { resolveRedirectPath } from "@/lib/redirects";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  if (!path || path.trim().length === 0) {
    return NextResponse.json({ success: false, error: "path is required" }, { status: 400 });
  }

  try {
    const redirect = await resolveRedirectPath(path);
    if (!redirect) {
      return NextResponse.json({ success: true, redirect: null });
    }

    return NextResponse.json({
      success: true,
      redirect: {
        fromPath: redirect.fromPath,
        toPath: redirect.toPath,
        statusCode: redirect.statusCode,
      },
    });
  } catch (error) {
    console.error("Failed to resolve redirect:", error);
    return NextResponse.json({ success: false, error: "Failed to resolve redirect" }, { status: 500 });
  }
}

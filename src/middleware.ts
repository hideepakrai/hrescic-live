import { NextRequest, NextResponse } from "next/server";

const IGNORED_PATHS = [
  "/api",
  "/_next",
  "/admin",
  "/favicon.ico",
  "/assets",
  "/static",
  "/uploads",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Skip ignored paths and static assets
  if (IGNORED_PATHS.some((path) => pathname.startsWith(path)) || pathname.includes(".")) {
    return NextResponse.next();
  }

  try {
    // 2. Call the resolution API
    // We use the full URL to ensure internal fetch works correctly
    const resolveUrl = new URL(`/api/cms/resolve-route?path=${encodeURIComponent(pathname)}`, req.url);
    const response = await fetch(resolveUrl, {
      method: "GET",
      // Add a header to identify it's from middleware if needed
      headers: { "x-middleware-request": "true" },
    });

    if (!response.ok) {
      return NextResponse.next();
    }

    const { type, target, status } = await response.json();

    // 3. Handle Rewrite
    if (type === "rewrite" && target) {
      return NextResponse.rewrite(new URL(target, req.url));
    }

    // 4. Handle Redirect
    if (type === "redirect" && target) {
      return NextResponse.redirect(new URL(target, req.url), status || 301);
    }
  } catch (error) {
    // Fail safe to standard Next.js routing on error
    console.error("Middleware routing error:", error);
  }

  return NextResponse.next();
}

// Optimization: use matcher to reduce middleware invocations
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (admin routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|admin).*)",
  ],
};

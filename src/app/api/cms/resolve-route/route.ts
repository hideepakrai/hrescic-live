import { NextRequest, NextResponse } from "next/server";
import { getCmsCollectionModel } from "@/models";
import { MANAGED_PAGE_ROUTES } from "@/data/pageRoutes";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  if (!path || path.startsWith("/api") || path.startsWith("/_next") || path.startsWith("/admin")) {
    return NextResponse.json({ type: "none" });
  }

  try {
    // 1. Check Redirects Collection
    const Redirects = await getCmsCollectionModel("redirects");
    const redirectDoc = await Redirects.findOne({
      status: "published",
      "data.isActive": { $ne: false },
      "data.fromPath": path,
    });

    if (redirectDoc && redirectDoc.data) {
      const data = redirectDoc.data as any;
      console.log(`[resolve-route] Found Redirect: ${path} -> ${data.toPath}`);
      return NextResponse.json({
        type: "redirect",
        target: data.toPath,
        status: data.statusCode || 301,
      });
    }

    // 2. Check Pages Collection for Custom Slug
    const Pages = await getCmsCollectionModel("pages");
    const slugWithoutSlash = path.replace(/^\/+/, "");
    
    // Find the page that has this custom slug
    const pageDoc = await Pages.findOne({
      slug: slugWithoutSlash,
      status: "published",
    });

    if (pageDoc) {
      // Find the "Physical" path for this page key
      const managedRoute = MANAGED_PAGE_ROUTES.find((r) => r.key === pageDoc.key);
      if (managedRoute && managedRoute.path !== path) {
        console.log(`[resolve-route] Rewriting custom slug ${path} -> physical path ${managedRoute.path}`);
        return NextResponse.json({
          type: "rewrite",
          target: managedRoute.path,
        });
      }
    }

    // 3. Reverse Check: If visiting a physical path that HAS a custom slug, redirect to the custom slug (SEO)
    const physicalRoute = MANAGED_PAGE_ROUTES.find(r => r.path === path);
    if (physicalRoute) {
      const customPage = await Pages.findOne({
        key: physicalRoute.key,
        status: "published"
      });
      
      if (customPage && customPage.slug && `/${customPage.slug}` !== path) {
        console.log(`[resolve-route] Rewriting physical path ${path} to custom slug /${customPage.slug}`);
        return NextResponse.json({
          type: "redirect",
          target: `/${customPage.slug}`,
          status: 301
        });
      }
    }

    console.log(`[resolve-route] No match found for ${path}, returning none`);
    return NextResponse.json({ type: "none" });
  } catch (error) {
    console.error("Route resolution error:", error);
    return NextResponse.json({ type: "none" }, { status: 500 });
  }
}

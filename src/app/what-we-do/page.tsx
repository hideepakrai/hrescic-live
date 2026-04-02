import type { Metadata } from "next";
import WhatWeDoPage from "@/components/sections/What-be-do-new/WhatWeDoPage";
import { resolvePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata({
    routeKey: "what-we-do",
    routePath: "/what-we-do",
    fallbackTitle: "What We Do | Hrescic",
    fallbackDescription: "Explore Hrescic services across branding, web, content, and performance-driven growth support.",
  });
}

export default function Page() {
  return <WhatWeDoPage />;
}

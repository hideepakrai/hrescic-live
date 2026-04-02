import type { Metadata } from "next";
import IdeasInsights from "@/components/sections/IdeaInsightPage/IdeasInsights";
import { resolvePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata({
    routeKey: "ideas-insights",
    routePath: "/ideas-insights",
    fallbackTitle: "Ideas & Insights | Hrescic",
    fallbackDescription: "Read Hrescic insights on brand, content, and digital growth strategy for modern teams.",
  });
}

export default function Page() {
  return <IdeasInsights />;
}

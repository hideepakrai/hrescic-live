import type { Metadata } from "next";
import HomePage from "@/pages/HomePage";
import { resolvePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata({
    routeKey: "home",
    routePath: "/",
    fallbackTitle: "Hrescic | Creative and Strategy Agency",
    fallbackDescription: "Hrescic is a creative and strategy agency helping brands grow with focused design and marketing execution.",
  });
}

export default function Page() {
  return <HomePage />;
}

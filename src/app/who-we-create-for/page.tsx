import type { Metadata } from "next";
import WorkPage from "@/components/sections/Who-We-Create/WorkPage";
import { resolvePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata({
    routeKey: "who-we-create-for",
    routePath: "/who-we-create-for",
    fallbackTitle: "Who We Create For | Hrescic",
    fallbackDescription: "See the industries and teams Hrescic supports with strategy, creative, and digital execution.",
  });
}

export default function Page() {
  return <WorkPage />;
}

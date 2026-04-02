import type { Metadata } from "next";
import LetsTalkPage from "@/pages/LetsTalkPage";
import { resolvePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata({
    routeKey: "lets-talk",
    routePath: "/lets-talk",
    fallbackTitle: "Let's Talk | Hrescic",
    fallbackDescription: "Book a free demo or ask a question. Talk to Hrescic about your growth goals.",
  });
}

export default function Page() {
  return <LetsTalkPage />;
}

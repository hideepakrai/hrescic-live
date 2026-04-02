import { Metadata } from "next";
import { getCmsCollectionModel } from "@/models";
import { getAppBaseUrl } from "@/lib/runtime";

type LocalizedText = {
  en?: string | null;
  hr?: string | null;
};

function pickLocalized(value: unknown, locale: "en" | "hr" = "en"): string {
  if (!value || typeof value !== "object") return "";
  const localized = value as LocalizedText;
  const en = typeof localized.en === "string" ? localized.en.trim() : "";
  const hr = typeof localized.hr === "string" ? localized.hr.trim() : "";
  if (locale === "hr" && hr.length > 0) {
    return hr;
  }
  return en;
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  const base = getAppBaseUrl().replace(/\/+$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export async function resolvePageMetadata(input: {
  routeKey: string;
  routePath: string;
  fallbackTitle: string;
  fallbackDescription: string;
  locale?: "en" | "hr";
}): Promise<Metadata> {
  const locale = input.locale || "en";
  const fallbackCanonical = absoluteUrl(input.routePath);

  const fallback: Metadata = {
    title: input.fallbackTitle,
    description: input.fallbackDescription,
    alternates: { canonical: fallbackCanonical },
    openGraph: {
      title: input.fallbackTitle,
      description: input.fallbackDescription,
      url: fallbackCanonical,
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  try {
    const Pages = await getCmsCollectionModel("pages");
    const doc = await Pages.findOne({
      key: input.routeKey,
      status: "published",
    });

    if (!doc || !doc.data || typeof doc.data !== "object") {
      return fallback;
    }

    const data = doc.data as Record<string, unknown>;
    const seo = data.seo && typeof data.seo === "object" ? (data.seo as Record<string, unknown>) : {};

    const title = pickLocalized(seo.metaTitle, locale) || pickLocalized(doc.title, locale) || input.fallbackTitle;
    const description =
      pickLocalized(seo.metaDescription, locale) ||
      pickLocalized(doc.summary, locale) ||
      input.fallbackDescription;
    const canonicalRaw =
      typeof seo.canonicalUrl === "string" && seo.canonicalUrl.trim().length > 0
        ? seo.canonicalUrl.trim()
        : fallbackCanonical;
    const canonical = absoluteUrl(canonicalRaw);
    const ogImageRaw = typeof seo.ogImage === "string" ? seo.ogImage.trim() : "";
    const ogImage = ogImageRaw.length > 0 ? absoluteUrl(ogImageRaw) : null;
    const indexable = typeof seo.indexable === "boolean" ? seo.indexable : true;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        images: ogImage ? [ogImage] : undefined,
      },
      robots: {
        index: indexable,
        follow: indexable,
      },
    };
  } catch {
    return fallback;
  }
}

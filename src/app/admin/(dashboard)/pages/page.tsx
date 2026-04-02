"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, FileText, Link2, Save, SearchCheck, ShieldAlert } from "lucide-react";
import { MANAGED_PAGE_ROUTES, ManagedPageRoute } from "@/data/pageRoutes";

type LocalizedText = { en: string; hr?: string | null };

type SeoPayload = {
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  canonicalUrl?: string;
  ogImage?: string;
  indexable: boolean;
};

type PageCmsDoc = {
  _id?: string | { $oid?: string };
  key: string;
  slug: string;
  status: "draft" | "published" | "archived";
  title: LocalizedText;
  summary?: LocalizedText;
  data?: {
    routePath?: string;
    sourceHint?: string;
    staticContentNote?: string;
    seo?: SeoPayload;
  };
};

const STATIC_CONTENT_NOTE =
  "Page body content is static and managed in code (JS/TSX/CSS). Use this CMS screen for SEO and slug only.";

function getId(value: PageCmsDoc["_id"]): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && typeof value.$oid === "string") return value.$oid;
  return "";
}

function getDefaultSeo(route: ManagedPageRoute): SeoPayload {
  return {
    metaTitle: { en: route.label, hr: "" },
    metaDescription: { en: "", hr: "" },
    canonicalUrl: "",
    ogImage: "",
    indexable: true,
  };
}

export default function PagesCmsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [docs, setDocs] = useState<PageCmsDoc[]>([]);
  const [selectedRouteKey, setSelectedRouteKey] = useState(MANAGED_PAGE_ROUTES[0].key);

  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">("published");
  const [metaTitleEn, setMetaTitleEn] = useState("");
  const [metaTitleHr, setMetaTitleHr] = useState("");
  const [metaDescriptionEn, setMetaDescriptionEn] = useState("");
  const [metaDescriptionHr, setMetaDescriptionHr] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [indexable, setIndexable] = useState(true);

  const selectedRoute = useMemo(
    () => MANAGED_PAGE_ROUTES.find((route) => route.key === selectedRouteKey) || MANAGED_PAGE_ROUTES[0],
    [selectedRouteKey],
  );

  const selectedDoc = useMemo(
    () => docs.find((doc) => doc.key === selectedRoute.key) || null,
    [docs, selectedRoute.key],
  );

  const configuredCount = useMemo(() => docs.length, [docs.length]);

  const fetchDocs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/cms/pages?limit=500");
      const payload = await res.json();

      if (!res.ok || !payload.success) {
        throw new Error(payload.error || "Failed to load page SEO documents");
      }

      setDocs(Array.isArray(payload.items) ? payload.items : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load page SEO documents";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchDocs();
  }, []);

  useEffect(() => {
    const doc = selectedDoc;

    if (!doc) {
      const defaultSeo = getDefaultSeo(selectedRoute);
      setSlug(selectedRoute.path === "/" ? "" : selectedRoute.path.replace(/^\//, ""));
      setStatus("published");
      setMetaTitleEn(defaultSeo.metaTitle.en);
      setMetaTitleHr(defaultSeo.metaTitle.hr || "");
      setMetaDescriptionEn(defaultSeo.metaDescription.en);
      setMetaDescriptionHr(defaultSeo.metaDescription.hr || "");
      setCanonicalUrl("");
      setOgImage("");
      setIndexable(true);
      return;
    }

    const seo = doc.data?.seo || getDefaultSeo(selectedRoute);

    setSlug(doc.slug || "");
    setStatus(doc.status || "published");
    setMetaTitleEn(seo.metaTitle?.en || "");
    setMetaTitleHr(seo.metaTitle?.hr || "");
    setMetaDescriptionEn(seo.metaDescription?.en || "");
    setMetaDescriptionHr(seo.metaDescription?.hr || "");
    setCanonicalUrl(seo.canonicalUrl || "");
    setOgImage(seo.ogImage || "");
    setIndexable(seo.indexable ?? true);
  }, [selectedDoc, selectedRoute]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    const seoPayload: SeoPayload = {
      metaTitle: { en: metaTitleEn.trim(), hr: metaTitleHr.trim() },
      metaDescription: {
        en: metaDescriptionEn.trim(),
        hr: metaDescriptionHr.trim(),
      },
      canonicalUrl: canonicalUrl.trim(),
      ogImage: ogImage.trim(),
      indexable,
    };

    const docPayload = {
      key: selectedRoute.key,
      slug: slug.trim(),
      status,
      title: {
        en: selectedRoute.label,
        hr: selectedRoute.label,
      },
      summary: {
        en: "SEO and slug settings only",
        hr: "SEO and slug settings only",
      },
      data: {
        routePath: selectedRoute.path,
        sourceHint: selectedRoute.sourceHint,
        staticContentNote: STATIC_CONTENT_NOTE,
        seo: seoPayload,
      },
    };

    try {
      const existingId = selectedDoc ? getId(selectedDoc._id) : "";
      const endpoint = existingId ? `/api/admin/cms/pages/${existingId}` : "/api/admin/cms/pages";
      const method = existingId ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docPayload),
      });

      const payload = await res.json();

      if (!res.ok || !payload.success) {
        throw new Error(payload.error || "Failed to save SEO settings");
      }

      setSuccess("SEO and slug settings saved successfully.");
      await fetchDocs();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save SEO settings";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#d7dfdb] bg-gradient-to-r from-[#f4fbf1] via-white to-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Pages CMS</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Professional SEO control panel for route slug and metadata. EN/HR supported.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-xl border border-[#d7dfdb] bg-white px-3 py-2 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Routes</p>
              <p className="text-xl font-black text-foreground">{MANAGED_PAGE_ROUTES.length}</p>
            </div>
            <div className="rounded-xl border border-[#d7dfdb] bg-white px-3 py-2 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">Configured</p>
              <p className="text-xl font-black text-foreground">{configuredCount}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <div className="flex items-start gap-2">
          <ShieldAlert className="mt-0.5 h-4 w-4" />
          <div>
            <p className="font-semibold">Static Content Notice</p>
            <p className="mt-0.5">{STATIC_CONTENT_NOTE}</p>
          </div>
        </div>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-lg border border-[#b9d9a7] bg-[#f4fbf1] px-4 py-2.5 text-sm text-[#1f7a39]">{success}</div>}

      <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
        <aside className="rounded-2xl border border-[#d7dfdb] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.14em] text-foreground">Page Routes</h2>
            <button
              onClick={() => void fetchDocs()}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold transition hover:bg-muted"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Loading routes...</p>
          ) : (
            <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
              {MANAGED_PAGE_ROUTES.map((route) => {
                const doc = docs.find((item) => item.key === route.key);
                const isActive = selectedRouteKey === route.key;
                return (
                  <button
                    key={route.key}
                    onClick={() => setSelectedRouteKey(route.key)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${
                      isActive ? "border-[#b9d9a7] bg-[#f4fbf1]" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-foreground">{route.label}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${
                          doc ? "bg-[#eaf8df] text-[#1f7a39]" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {doc ? "Configured" : "Pending"}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{route.path}</p>
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        <section className="rounded-2xl border border-[#d7dfdb] bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-[#e5e7eb] pb-4">
            <div>
              <h2 className="text-xl font-black tracking-tight text-foreground">{selectedRoute.label}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Route: {selectedRoute.path}</p>
              <p className="text-xs text-muted-foreground">Source: {selectedRoute.sourceHint}</p>
            </div>
            <div className="rounded-lg border border-[#e5e7eb] bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              Status: <span className="font-semibold text-foreground">{status}</span>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="space-y-1.5 text-sm md:col-span-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <Link2 className="h-3.5 w-3.5" /> Slug
                </span>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  placeholder="example-page"
                />
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "draft" | "published" | "archived")}
                  className="h-10 w-full rounded-xl border border-[#e5e7eb] px-2"
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option> 

                  <option value="archived">archived</option>
                </select>
              </label>
            </div>

            <div className="rounded-xl border border-[#e5e7eb] bg-muted/20 p-4">
              <h3 className="inline-flex items-center gap-1 text-sm font-black uppercase tracking-[0.12em] text-foreground">
                <SearchCheck className="h-4 w-4" /> SEO Meta
              </h3>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="space-y-1 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Meta Title (EN)</span>
                  <input
                    value={metaTitleEn}
                    onChange={(e) => setMetaTitleEn(e.target.value)}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  />
                </label>
                <label className="space-y-1 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Meta Title (HR)</span>
                  <input
                    value={metaTitleHr}
                    onChange={(e) => setMetaTitleHr(e.target.value)}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  />
                </label>
                <label className="space-y-1 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Meta Description (EN)</span>
                  <textarea
                    value={metaDescriptionEn}
                    onChange={(e) => setMetaDescriptionEn(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  />
                </label>
                <label className="space-y-1 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Meta Description (HR)</span>
                  <textarea
                    value={metaDescriptionHr}
                    onChange={(e) => setMetaDescriptionHr(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Canonical URL</span>
                <input
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  placeholder="https://www.hrescic.com/page"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">OG Image URL</span>
                <input
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  placeholder="https://.../image.jpg"
                />
              </label>
            </div>

            <label className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-muted/20 px-3 py-2.5 text-sm">
              <input type="checkbox" checked={indexable} onChange={(e) => setIndexable(e.target.checked)} />
              Indexable page (allow search engines)
            </label>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                onClick={() => void fetchDocs()}
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:bg-muted"
              >
                Reload
              </button>
              <button
                onClick={() => void handleSave()}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#37C100] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#2d9802] disabled:opacity-60"
              >
                {saving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4" /> Save SEO + Slug
                  </>
                )}
              </button>
            </div>

            {selectedDoc ? (
              <div className="rounded-xl border border-[#b9d9a7] bg-[#f4fbf1] px-3 py-2 text-xs text-[#1f7a39]">
                <p className="inline-flex items-center gap-1 font-semibold"><CheckCircle2 className="h-3.5 w-3.5" /> This route already has a saved SEO document.</p>
              </div>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                No saved document yet. Saving now will create the first SEO record for this route.
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-[#d7dfdb] bg-white p-4 text-sm text-muted-foreground">
        <h2 className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-foreground">
          <FileText className="h-3.5 w-3.5" /> Developer Editing Path
        </h2>
        <p className="mt-2 leading-relaxed">
          For visual/content section changes, edit component files directly. This CMS intentionally does not edit on-page
          JS/CSS blocks, so frontend changes remain clean and version-controlled.
        </p>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, RefreshCw, Save } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";
import {
  DEFAULT_PRICING_SECTION_SETTINGS,
  fromMultiline,
  getCmsDocumentId,
  getCmsStatus,
  mergePricingPlansForAdmin,
  parsePricingSectionSettings,
  toLocalizedPayload,
  toMultiline,
  type CmsStatus,
  type PricingPlanAdminRecord,
  type PricingSectionSettings,
} from "@/lib/cms-content";

type ApiPayload = {
  success?: boolean;
  error?: string;
  items?: unknown[];
  id?: string;
};

const SECTION_KEY = "plans-deliverables";
const SECTION_SLUG = "plans-deliverables";

async function readApiPayload(res: Response): Promise<ApiPayload> {
  try {
    return (await res.json()) as ApiPayload;
  } catch {
    return {};
  }
}

export default function PricingPlansAdminPage() {
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [sectionDocId, setSectionDocId] = useState("");
  const [sectionStatus, setSectionStatus] = useState<CmsStatus>("published");
  const [sectionSettings, setSectionSettings] = useState<PricingSectionSettings>({
    ...DEFAULT_PRICING_SECTION_SETTINGS,
  });

  const [plans, setPlans] = useState<PricingPlanAdminRecord[]>(() =>
    mergePricingPlansForAdmin([]),
  );

  const configuredPlans = useMemo(
    () => plans.filter((plan) => plan.id.length > 0).length,
    [plans],
  );

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [plansRes, sectionRes] = await Promise.all([
        fetch("/api/admin/cms/pricing-plans?limit=100"),
        fetch(`/api/admin/cms/settings?key=${SECTION_KEY}&limit=1`),
      ]);

      const plansPayload = await readApiPayload(plansRes);
      const sectionPayload = await readApiPayload(sectionRes);

      if (!plansRes.ok || !plansPayload.success) {
        throw new Error(plansPayload.error || "Failed to load pricing plan CMS data");
      }

      if (!sectionRes.ok || !sectionPayload.success) {
        throw new Error(sectionPayload.error || "Failed to load plan section settings");
      }

      setPlans(
        mergePricingPlansForAdmin(
          Array.isArray(plansPayload.items) ? plansPayload.items : [],
        ),
      );

      const sectionItem = Array.isArray(sectionPayload.items) ? sectionPayload.items[0] : undefined;
      if (!sectionItem) {
        setSectionSettings({ ...DEFAULT_PRICING_SECTION_SETTINGS });
        setSectionDocId("");
        setSectionStatus("published");
      } else {
        setSectionSettings(parsePricingSectionSettings(sectionItem));
        setSectionDocId(getCmsDocumentId((sectionItem as { _id?: unknown })._id));
        setSectionStatus(getCmsStatus((sectionItem as { status?: unknown }).status));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load pricing plans CMS";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const updatePlan = (
    key: string,
    updater: (plan: PricingPlanAdminRecord) => PricingPlanAdminRecord,
  ) => {
    setPlans((prev) => prev.map((plan) => (plan.key === key ? updater(plan) : plan)));
  };

  const saveSection = async () => {
    const payload = {
      key: SECTION_KEY,
      slug: SECTION_SLUG,
      status: sectionStatus,
      title: toLocalizedPayload("Plans & Deliverables Section"),
      summary: toLocalizedPayload("Editable heading and CTA for plans section"),
      data: {
        sectionTitle: toLocalizedPayload(sectionSettings.title),
        sectionSubtitle: toLocalizedPayload(sectionSettings.subtitle),
        bottomCtaLabel: toLocalizedPayload(sectionSettings.bottomCtaLabel),
        bottomCtaHref: sectionSettings.bottomCtaHref.trim(),
      },
      order: 1,
    };

    const endpoint = sectionDocId
      ? `/api/admin/cms/settings/${sectionDocId}`
      : "/api/admin/cms/settings";
    const method = sectionDocId ? "PATCH" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await readApiPayload(res);
    if (!res.ok || !response.success) {
      throw new Error(response.error || "Failed to save section settings");
    }
  };

  const savePlan = async (plan: PricingPlanAdminRecord) => {
    const payload = {
      key: plan.key,
      slug: plan.slug.trim() || plan.key,
      status: plan.status,
      order: plan.order,
      title: toLocalizedPayload(plan.title),
      summary: toLocalizedPayload(plan.subtitle),
      data: {
        label: toLocalizedPayload(plan.label),
        subtitle: toLocalizedPayload(plan.subtitle),
        intro: toLocalizedPayload(plan.intro),
        foundationTitle: toLocalizedPayload(plan.foundationTitle),
        foundationItems: plan.foundation,
        monthlyTitle: toLocalizedPayload(plan.monthlyTitle),
        monthlyItems: plan.monthly,
        idealTitle: toLocalizedPayload(plan.idealTitle),
        idealText: toLocalizedPayload(plan.ideal),
        cta: plan.cta.trim(),
        ctaLabel: toLocalizedPayload(plan.ctaLabel),
        bg: plan.bg,
      },
    };

    const endpoint = plan.id
      ? `/api/admin/cms/pricing-plans/${plan.id}`
      : "/api/admin/cms/pricing-plans";
    const method = plan.id ? "PATCH" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const response = await readApiPayload(res);

    if (!res.ok || !response.success) {
      throw new Error(response.error || `Failed to save plan "${plan.title}"`);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await saveSection();

      for (const plan of plans) {
        await savePlan(plan);
      }

      await loadData();
      setSuccess(t.pricing_cms.save_success);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save pricing content";
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
            <h1 className="text-2xl font-black tracking-tight">{t.pricing_cms.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.pricing_cms.desc}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-xl border border-[#d7dfdb] bg-white px-3 py-2 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                {t.pricing_cms.plans_count}
              </p>
              <p className="text-xl font-black text-foreground">{plans.length}</p>
            </div>
            <div className="rounded-xl border border-[#d7dfdb] bg-white px-3 py-2 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                {t.pricing_cms.configured_count}
              </p>
              <p className="text-xl font-black text-foreground">{configuredPlans}</p>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-[#b9d9a7] bg-[#f4fbf1] px-4 py-2.5 text-sm text-[#1f7a39]">
          {success}
        </div>
      )}

      <section className="rounded-2xl border border-[#d7dfdb] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-foreground">
            {t.pricing_cms.section_settings}
          </h2>
          <div className="rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
            {t.pricing_cms.status_label}: <span className="font-semibold text-foreground">{sectionStatus}</span>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {t.pricing_cms.section_title}
            </span>
            <input
              value={sectionSettings.title}
              onChange={(e) =>
                setSectionSettings((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-xl border border-[#e5e7eb] p-3"
            />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {t.pricing_cms.status_label}
            </span>
            <select
              value={sectionStatus}
              onChange={(e) => setSectionStatus(e.target.value as CmsStatus)}
              className="w-full rounded-xl border border-[#e5e7eb] p-3"
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </label>
          <label className="space-y-1.5 text-sm md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {t.pricing_cms.section_subtitle}
            </span>
            <textarea
              value={sectionSettings.subtitle}
              onChange={(e) =>
                setSectionSettings((prev) => ({ ...prev, subtitle: e.target.value }))
              }
              rows={3}
              className="w-full rounded-xl border border-[#e5e7eb] p-3"
            />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {t.pricing_cms.bottom_cta_label}
            </span>
            <input
              value={sectionSettings.bottomCtaLabel}
              onChange={(e) =>
                setSectionSettings((prev) => ({ ...prev, bottomCtaLabel: e.target.value }))
              }
              className="w-full rounded-xl border border-[#e5e7eb] p-3"
            />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {t.pricing_cms.bottom_cta_link}
            </span>
            <input
              value={sectionSettings.bottomCtaHref}
              onChange={(e) =>
                setSectionSettings((prev) => ({ ...prev, bottomCtaHref: e.target.value }))
              }
              className="w-full rounded-xl border border-[#e5e7eb] p-3"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        {plans.map((plan) => (
          <article key={plan.key} className="rounded-2xl border border-[#d7dfdb] bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-md font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {plan.key}
                </p>
                {/* <h3 className="text-xl font-black tracking-tight text-foreground">{plan.title}</h3> */}
              </div>
              <div className="rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
                Doc: <span className="font-semibold text-foreground">{plan.id ? t.common.configured : t.common.pending}</span>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.pricing_cms.plan_labels.label}</span>
                <input
                  value={plan.label}
                  onChange={(e) => updatePlan(plan.key, (prev) => ({ ...prev, label: e.target.value }))}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.pricing_cms.plan_labels.title}</span>
                <input
                  value={plan.title}
                  onChange={(e) => updatePlan(plan.key, (prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.pricing_cms.plan_labels.order}</span>
                <input
                  type="number"
                  value={plan.order}
                  onChange={(e) =>
                    updatePlan(plan.key, (prev) => ({
                      ...prev,
                      order: Number.isFinite(Number(e.target.value))
                        ? Number(e.target.value)
                        : prev.order,
                    }))
                  }
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.pricing_cms.plan_labels.status}</span>
                <select
                  value={plan.status}
                  onChange={(e) => updatePlan(plan.key, (prev) => ({ ...prev, status: e.target.value as CmsStatus }))}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.pricing_cms.plan_labels.subtitle}</span>
                <textarea
                  value={plan.subtitle}
                  onChange={(e) => updatePlan(plan.key, (prev) => ({ ...prev, subtitle: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.pricing_cms.plan_labels.intro}</span>
                <textarea
                  value={plan.intro}
                  onChange={(e) => updatePlan(plan.key, (prev) => ({ ...prev, intro: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t.pricing_cms.plan_labels.foundation_title}
                </span>
                <input
                  value={plan.foundationTitle}
                  onChange={(e) =>
                    updatePlan(plan.key, (prev) => ({ ...prev, foundationTitle: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t.pricing_cms.plan_labels.monthly_title}
                </span>
                <input
                  value={plan.monthlyTitle}
                  onChange={(e) =>
                    updatePlan(plan.key, (prev) => ({ ...prev, monthlyTitle: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t.pricing_cms.plan_labels.foundation_items}
                </span>
                <textarea
                  value={toMultiline(plan.foundation)}
                  onChange={(e) =>
                    updatePlan(plan.key, (prev) => ({ ...prev, foundation: fromMultiline(e.target.value) }))
                  }
                  rows={6}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t.pricing_cms.plan_labels.monthly_items}
                </span>
                <textarea
                  value={toMultiline(plan.monthly)}
                  onChange={(e) =>
                    updatePlan(plan.key, (prev) => ({ ...prev, monthly: fromMultiline(e.target.value) }))
                  }
                  rows={6}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t.pricing_cms.plan_labels.ideal_title}
                </span>
                <input
                  value={plan.idealTitle}
                  onChange={(e) =>
                    updatePlan(plan.key, (prev) => ({ ...prev, idealTitle: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t.pricing_cms.plan_labels.ideal_text}
                </span>
                <textarea
                  value={plan.ideal}
                  onChange={(e) => updatePlan(plan.key, (prev) => ({ ...prev, ideal: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.pricing_cms.plan_labels.cta_link}</span>
                <input
                  value={plan.cta}
                  onChange={(e) => updatePlan(plan.key, (prev) => ({ ...prev, cta: e.target.value }))}
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.pricing_cms.plan_labels.cta_label}</span>
                <input
                  value={plan.ctaLabel}
                  onChange={(e) =>
                    updatePlan(plan.key, (prev) => ({ ...prev, ctaLabel: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#e5e7eb] p-3"
                />
              </label>
            </div>
          </article>
        ))}
      </section>

      <div className="flex flex-wrap justify-end gap-2">
        <button
          onClick={() => void loadData()}
          disabled={loading || saving}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:bg-muted disabled:opacity-60"
        >
          <RefreshCw className="h-4 w-4" /> {t.common.reload}
        </button>
        <button
          onClick={() => void handleSaveAll()}
          disabled={saving || loading}
          className="inline-flex items-center gap-2 rounded-xl bg-[#37C100] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#2d9802] disabled:opacity-60"
        >
          {saving ? (
            t.pricing_cms.saving
          ) : (
            <>
              <Save className="h-4 w-4" /> {t.pricing_cms.save_all}
            </>
          )}
        </button>
      </div>

      {!loading && (
        <div className="rounded-xl border border-[#b9d9a7] bg-[#f4fbf1] px-3 py-2 text-xs text-[#1f7a39]">
          <p className="inline-flex items-center gap-1 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t.pricing_cms.footer_msg}
          </p>
        </div>
      )}
    </div>
  );
}

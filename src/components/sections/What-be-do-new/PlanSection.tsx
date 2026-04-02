"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PRICING_PLANS,
  DEFAULT_PRICING_SECTION_SETTINGS,
  mergePricingPlans,
  parsePricingSectionSettings,
  type PricingPlanContent,
  type PricingSectionSettings,
} from "@/lib/cms-content";

type CmsCollectionResponse = {
  success?: boolean;
  items?: unknown[];
};

async function readCmsResponse(res: Response): Promise<CmsCollectionResponse> {
  try {
    return (await res.json()) as CmsCollectionResponse;
  } catch {
    return {};
  }
}

const PlanSection = () => {
  const [plans, setPlans] = useState<PricingPlanContent[]>(() =>
    DEFAULT_PRICING_PLANS.map((plan) => ({
      ...plan,
      foundation: [...plan.foundation],
      monthly: [...plan.monthly],
    })),
  );
  const [sectionSettings, setSectionSettings] = useState<PricingSectionSettings>({
    ...DEFAULT_PRICING_SECTION_SETTINGS,
  });

  useEffect(() => {
    let active = true;

    const loadCmsContent = async () => {
      try {
        const [plansRes, sectionRes] = await Promise.all([
          fetch("/api/public/cms/pricing-plans?limit=20"),
          fetch("/api/public/cms/settings?key=plans-deliverables&limit=1"),
        ]);

        const plansPayload = await readCmsResponse(plansRes);
        const sectionPayload = await readCmsResponse(sectionRes);

        if (active && plansRes.ok && plansPayload.success && Array.isArray(plansPayload.items)) {
          const parsedPlans = mergePricingPlans(plansPayload.items);
          if (parsedPlans.length > 0) {
            setPlans(parsedPlans);
          }
        }

        if (active && sectionRes.ok && sectionPayload.success && Array.isArray(sectionPayload.items)) {
          setSectionSettings(parsePricingSectionSettings(sectionPayload.items[0]));
        }
      } catch {
        // Keep default static fallback if CMS fetch fails.
      }
    };

    void loadCmsContent();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="plans"
      className="container-xl mx-auto mt-14 px-4 py-16 sm:px-6 md:mt-0 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-light tracking-tight text-[#2f2f2f] md:text-4xl">
          {sectionSettings.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b7280] md:text-base">
          {sectionSettings.subtitle}
        </p>
      </div>

      <div className="grid gap-5 px-4 md:grid-cols-2 md:px-0 xl:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={`${plan.bg} flex min-h-[540px] flex-col rounded-[16px] px-5 py-5`}
          >
            <p className="text-[13px] font-medium text-[#6b7280]">{plan.label}</p>

            <div className="mt-6">
              <h4 className="text-[20px] font-bold tracking-tight text-[#1D2931]">
                {plan.title}
              </h4>

              <div className="mt-3 h-px w-full bg-[#d1d5db]" />

              <p className="mt-3 text-[14px] leading-7 text-[#4b5563]">
                {plan.subtitle}
              </p>
            </div>

            <div className="mt-6 flex-1">
              {plan.intro && (
                <>
                  <div className="h-px w-full bg-[#d1d5db]" />
                  <p className="mt-4 text-[12px] text-[#6b7280]">{plan.intro}</p>
                </>
              )}

              <div className="mt-4">
                <h4 className="text-[12px] font-semibold text-[#374151]">
                  {plan.foundationTitle}
                </h4>
                <ul className="mt-2 list-disc pl-5 text-[11px] text-[#4b5563]">
                  {plan.foundation.map((item, index) => (
                    <li key={`${plan.key}-foundation-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-[12px] font-semibold text-[#374151]">
                  {plan.monthlyTitle}
                </h4>
                <ul className="mt-2 list-disc pl-5 text-[11px] text-[#4b5563]">
                  {plan.monthly.map((item, index) => (
                    <li key={`${plan.key}-monthly-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-[#d1d5db] pt-4">
              <h4 className="text-[15px] font-semibold text-[#1D2931]">
                {plan.idealTitle}
              </h4>
              <p className="mt-2 text-[14px] text-[#4b5563]">
                {plan.ideal}
              </p>

              <a href={plan.cta}>
                <button className="mx-auto my-6 flex rounded-full bg-[#1D2931] px-5 py-2 text-[12px] font-medium text-white transition-all hover:bg-[#000]">
                  {plan.ctaLabel || "Book a Free Demo"}
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={sectionSettings.bottomCtaHref}
          className="rounded-full bg-[#37C100] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#2d9802]"
        >
          {sectionSettings.bottomCtaLabel}
        </a>
      </div>
    </section>
  );
};

export default PlanSection;

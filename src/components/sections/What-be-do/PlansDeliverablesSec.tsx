import React from "react";

type Plan = {
  id: string;
  label: string;
  headline: string;
  subline?: string;
  oneTimeTitle: string;
  oneTime: string[];
  monthlyTitle: string;
  monthly: string[];
  idealTitle: string;
  ideal: string;
};

const plans: Plan[] = [
  {
    id: "start",
    label: "PLAN: START",
    headline: "You're not getting the sales or inquiries you should.",
    subline: "People aren't clearly understanding your offer or your value.",
    oneTimeTitle: "One-time foundation",
    oneTime: [
      "Brand & website audit",
      "Clear messaging + value proposition",
      "One high-impact landing page or core update",
      "Initial AI video or visual assets",
    ],
    monthlyTitle: "Monthly rhythm (light)",
    monthly: [
      "Essential updates",
      "Light launch support",
      "Small conversion-focused improvements",
    ],
    idealTitle: "Ideal if you want",
    ideal:
      "A clear setup and steady inquiries — without heavy monthly production.",
  },
  {
    id: "grow",
    label: "PLAN: GROW",
    headline:
      "You're getting clients — but not consistently or not the right ones.",
    subline: "Your communication isn't attracting the audience you want.",
    oneTimeTitle: "One-time foundation",
    oneTime: [
      "Deep brand & website review",
      "Messaging & positioning refinement",
      "Setup of content formats, tone and templates",
    ],
    monthlyTitle: "Monthly rhythm",
    monthly: [
      "Regular social + email content",
      "Monthly design + copy support",
      "Ongoing AI video refresh",
      "Website + funnel optimisation",
      "Monthly insights",
    ],
    idealTitle: "Ideal if you want",
    ideal:
      "A reliable flow of high-quality clients and a consistent brand presence.",
  },
  {
    id: "scale",
    label: "PLAN: SCALE",
    headline: "You already have demand — but your creative workload is chaos.",
    subline: "Too many tasks, too many channels, no unified system.",
    oneTimeTitle: "One-time foundation",
    oneTime: [
      "Strategic workshop",
      "Brand system refinement",
      "Funnel & journey mapping",
      "Multi-channel content strategy",
    ],
    monthlyTitle: "Monthly rhythm",
    monthly: [
      "High-volume content + design",
      "Continuous UX/web improvements",
      "Multi-channel campaigns",
      "Strategy + analytics calls",
      "AI video integrated in every cycle",
    ],
    idealTitle: "Ideal if you want",
    ideal:
      "A full creative department — without hiring a full creative department.",
  },
  {
    id: "custom",
    label: "PLAN: CUSTOM",
    headline:
      "You have internal people — but no partner who sees the whole system.",
    oneTimeTitle: "One-time foundation",
    oneTime: [
      "Full ecosystem review",
      "Internal alignment",
      "Long-term roadmap",
    ],
    monthlyTitle: "Monthly rhythm",
    monthly: [
      "Hybrid execution (in-house + Hreščić)",
      "Unified content + web + design + video",
      "Ongoing leadership & optimisation",
    ],
    idealTitle: "Ideal if you want",
    ideal:
      "A strategic partner who connects the dots across your entire ecosystem.",
  },
];

const IconBubble: React.FC = () => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F5F7] shadow-sm text-[#6B4BFF]">
    <span className="text-base font-semibold">✓</span>
  </div>
);

const PlansDeliverablesSec: React.FC = () => {
  return (
    <section className="container-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Section heading */}
      <div>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
          Plans &amp; Deliverables
        </h2>
        <p className="mt-3 max-w-2xl text-base md:text-lg text-gray-600">
          Choose the plan that matches where your brand is right now and where
          you want to go next.
        </p>
      </div>

      {/* Plan cards in stack */}
      <div className="space-y-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className=" px-5 sm:px-8 lg:px-0 py-8 lg:pb-10 lg:pt-4 border-b-4 border-gray-300 "
          >
            {/* Top title area (like For admins/learners) */}
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#37c100]">
                {plan.label}
              </p>
              <h3 className="mt-2 text-xl md:text-2xl font-semibold text-gray-900">
                {plan.headline}
              </h3>
              {plan.subline && (
                <p className="mt-2 text-sm md:text-base text-[#5C5674]">
                  {plan.subline}
                </p>
              )}
            </div>

            {/* Purple illustration band (like screenshot) */}
            <div className="mb-7">
              <div className="relative rounded-2xl bg-[#D9CFFF] px-6 py-6 md:px-10 md:py-8 flex items-center justify-center overflow-hidden">
                <div className="flex gap-4 md:gap-8 items-end md:w-full md:max-w-3xl max-w-2xl">
                  <div className="flex-1 bg-white rounded-xl shadow-md p-4">
                    <div className="mb-2 h-4 md:w-32 w-24 rounded-full bg-[#E5E1FF]" />
                    <div className="space-y-2 mt-2">
                      <div className="h-8 rounded-md bg-[#F5F3FF]" />
                      <div className="h-8 rounded-md bg-[#F5F3FF]" />
                      <div className="h-8 rounded-md bg-[#F5F3FF]" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-md p-4">
                    <div className="mb-2 h-4 w-24 rounded-full bg-[#E5E1FF]" />
                    <div className="space-y-2 mt-2">
                      <div className="h-8 rounded-md bg-[#F5F3FF]" />
                      <div className="h-8 rounded-md bg-[#F5F3FF]" />
                      <div className="h-8 rounded-md bg-[#F5F3FF]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom feature grid (2 columns, icons + text) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* One-time foundation */}
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <IconBubble />
                  <div>
                    <p className="text-sm font-semibold text-[#433671]">
                      {plan.oneTimeTitle}
                    </p>
                  </div>
                </div>
                <ul className="pl-11 space-y-1.5 text-sm text-[#5C5674] list-disc ">
                  {plan.oneTime.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Monthly rhythm */}
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <IconBubble />
                  <div>
                    <p className="text-sm font-semibold text-[#433671]">
                      {plan.monthlyTitle}
                    </p>
                  </div>
                </div>
                <ul className="pl-11 space-y-1.5 text-sm text-[#5C5674] list-disc">
                  {plan.monthly.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Ideal if you want – full width on desktop */}
              <div className="md:col-span-2 mt-4">
                <div className="flex items-start gap-3">
                  <IconBubble />
                  <p className="text-sm md:text-base text-[#433671]">
                    <span className="font-semibold">{plan.idealTitle}: </span>
                    {plan.ideal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlansDeliverablesSec;

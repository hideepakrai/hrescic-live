import React from "react";

const plans = [
  {
    label: "Plan",
    title: "START",
    cta: "/lets-talk#demo",
    subtitle: "You’re not getting the sales or inquiries you should.",
    intro: "People aren’t clearly understanding your offer or your value.",
    foundationTitle: "One-time foundation:",
    foundation: [
      "Brand & website audit",
      "Clear messaging + value proposition",
      "One high-impact landing page or core update",
      "Initial AI video or visual assets",
    ],
    monthlyTitle: "Monthly rhythm (light):",
    monthly: [
      "Essential updates",
      "Light launch support",
      "Small conversion-focused improvements",
    ],
    ideal:
      "A clear setup and steady inquiries - without heavy monthly production.",
    bg: "bg-[#F5F7FA]",
  },
  {
    label: "Plan",
    title: "GROW",
    cta: "/lets-talk#demo",
    subtitle:
      "You’re getting clients — but not consistently or not the right ones.",
    intro: "Your communication isn’t attracting the audience you want.",
    foundationTitle: "One-time foundation:",
    foundation: [
      "Deep brand & website review",
      "Messaging & positioning refinement",
      "Setup of content formats, tone and templates",
    ],
    monthlyTitle: "Monthly rhythm (light):",
    monthly: [
      "Regular social + email content",
      "Monthly design + copy support",
      "Ongoing AI video refresh",
      "Website + funnel optimisation",
      "Monthly insights",
    ],
    ideal:
      "A reliable flow of high-quality clients and a consistent brand presence.",
    bg: "bg-[#EEF1F4]",
  },
  {
    label: "Plan",
    title: "SCALE",
    cta: "/lets-talk#demo",
    subtitle:
      "You already have demand — but your creative workload is chaos.",
    intro: "Too many tasks, too many channels, no unified system.",
    foundationTitle: "One-time foundation:",
    foundation: [
      "Strategic workshop",
      "Brand system refinement",
      "Funnel & journey mapping",
      "Multi-channel content strategy",
    ],
    monthlyTitle: "Monthly rhythm (light):",
    monthly: [
      "High-volume content + design",
      "Continuous UX/web improvements",
      "Multi-channel campaigns",
      "Strategy + analytics calls",
      "AI video integrated in every cycle",
    ],
    ideal:
      "A full creative department — without hiring a full creative department.",
    bg: "bg-[#E9EDF2]",
  },
  {
    label: "Plan",
    title: "CUSTOM",
    cta: "/lets-talk#ask",
    subtitle:
      "You have internal people — but no partner who sees the whole system.",
    intro: "",
    foundationTitle: "One-time foundation:",
    foundation: [
      "Full ecosystem review",
      "Internal alignment",
      "Long-term roadmap",
    ],
    monthlyTitle: "Monthly rhythm (light):",
    monthly: [
      "Hybrid execution (in-house + precise)",
      "Unified content + web + design + video",
      "Ongoing leadership & optimisation",
    ],
    ideal:
      "A strategic partner who connects the dots across your entire ecosystem.",
    bg: "bg-[#E3E8EF]",
  },
];

const PlanSection = () => {
  return (
    <section
      id="plans"
      className="container-xl mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-14 md:mt-0"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-light tracking-tight text-[#2f2f2f] md:text-4xl">
          Plans & Deliverables
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b7280] md:text-base">
          Choose the plan that matches where your brand is right now
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`${plan.bg} flex min-h-[540px] flex-col rounded-[16px] px-5 py-5`}
          >
            <p className="text-[13px] font-medium text-[#6b7280]">
              {plan.label}
            </p>

            <div className="mt-6">
              {/* ✅ Title color fixed (dark grey) */}
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
                  <p className="mt-4 text-[12px] text-[#6b7280]">
                    {plan.intro}
                  </p>
                </>
              )}

              <div className="mt-4">
                <h4 className="text-[12px] font-semibold text-[#374151]">
                  {plan.foundationTitle}
                </h4>
                <ul className="mt-2 list-disc pl-5 text-[11px] text-[#4b5563]">
                  {plan.foundation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-[12px] font-semibold text-[#374151]">
                  {plan.monthlyTitle}
                </h4>
                <ul className="mt-2 list-disc pl-5 text-[11px] text-[#4b5563]">
                  {plan.monthly.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-[#d1d5db] pt-4">
              <h4 className="text-[15px] font-semibold text-[#1D2931]">
                Ideal if you want:
              </h4>
              <p className="mt-2 text-[14px] text-[#4b5563]">
                {plan.ideal}
              </p>

              {/* ✅ CTA links added */}
              {/* <a
                href={plan.cta}
                className="bg-[#111827] hover:bg-black text-white px-5 py-2 rounded-full text-[12px] font-medium transition-all my-6 mx-auto flex justify-center"
              >
                Book a Free Demo
              </a> */}
               <a
                href={plan.cta}>
                <button className="bg-[#1D2931] hover:bg-[#000] text-white px-5 py-2 rounded-full text-[12px] font-medium transition-all my-6 mx-auto flex">
                Book a Free Demo
              </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Bottom CTA */}
      <div className="text-center mt-12">
        <a
          href="/lets-talk#ask"
          className="bg-[#37C100] hover:bg-[#2d9802] text-white px-6 py-3 rounded-full text-sm font-medium transition-all"
        >
          Ask Us Anything
        </a>
      </div>
    </section>
  );
};

export default PlanSection;
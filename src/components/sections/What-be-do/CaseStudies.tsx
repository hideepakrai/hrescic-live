import React from "react";

const caseStudies = [
  { plan: "Start", title: "Solo creator launching first offer" },
  { plan: "Start", title: "Local studio validating new idea" },
  { plan: "Grow", title: "Agency turning services into products" },
  { plan: "Grow", title: "Membership adding new revenue stream" },
  { plan: "Scale", title: "Franchise unifying brand presence" },
  { plan: "Scale", title: "Edu brand building evergreen funnel" },
  { plan: "Custom", title: "Niche B2B community experiment" },
  { plan: "Custom", title: "Internal team enablement hub" },
];

const CaseStudies = () => {
  return (
    <section className="w-full bg-[#f5f7fb] py-16  lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Top label + heading (from second image content) */}
        <p className="text-xs font-semibold tracking-[0.25em] text-red-500 uppercase mb-3">
          Section 5 — Case Studies
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          How Brands Use These Plans
        </h2>

        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xl">
          Short examples of how each plan works in practice.
        </p>

        <p className="mt-2 text-xs italic text-gray-500">
          (Placeholder — to be replaced with real case studies)
        </p>

        {/* Mosaic of case-study tiles (visual style inspired by first image) */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 aspect-[4/3] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-amber-500/10" />
              <div className="relative z-10 text-center px-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  {item.plan} Plan
                </p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-900">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

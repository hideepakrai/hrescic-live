import React from "react";

const plans = ["START", "GROW", "SCALE", "CUSTOM"];

type Row = {
  label: string;
  values: React.ReactNode[]; // [START, GROW, SCALE, CUSTOM]
};




const rows: Row[] = [
  {
    label: "Main issue solved",
    values: [
      "Low inquiries / unclear value",
      "Wrong clients / inconsistent demand",
      "Creative chaos / overload",
      "Complex ecosystem",
    ],
  },
  {
    label: "Brand messaging",
    values: [
      <>
        ✓ <span className="font-medium">Basic clarity</span>
      </>,
      <>
        ✓ <span className="font-medium">Full refinement</span>
      </>,
      <>
        ✓ <span className="font-medium">System-wide alignment</span>
      </>,
      <>
        ✓ <span className="font-medium">Custom messaging system</span>
      </>,
    ],
  },
  {
    label: "Visual alignment",
    values: [
      "Light refresh",
      "Cleanup + harmonisation",
      "System refinement",
      "Multi-brand alignment",
    ],
  },
  {
    label: "Website / landing setup",
    values: [
      "1 landing page or update",
      "Cleanup + optimisation",
      "Multiple updates + new sections",
      <>
        <span className="font-semibold">
          Full website build / rebuild
        </span>
      </>,
    ],
  },
  {
    label: "Content system setup",
    values: ["–", "Formats + templates", "Multi-channel system", "Custom-developed"],
  },
  {
    label: "Monthly content",
    values: ["Light", "Regular", "High-volume", "Custom"],
  },
  {
    label: "Monthly design",
    values: ["Light", "✓", "✓✓", "Custom"],
  },
  {
    label: "AI video",
    values: ["Starter set", "Monthly refresh", "Fully integrated", "Bespoke video cycles"],
  },
  {
    label: "Website optimisation",
    values: ["Light tweaks", "Ongoing", "Continuous CRO", "Deep, custom-level"],
  },
  {
    label: "Campaign support",
    values: ["–", "Light", "Full, multi-channel", "Custom"],
  },
  {
    label: "Performance & Speed",
    values: ["Standard", "Optimised", "High-performance", "Enterprise-grade"],
  },
  {
    label: "Strategy & analytics",
    values: ["–", "Monthly insights", "Full strategy + analytics", "Leadership-level"],
  },
  {
    label: "Best for",
    values: [
      "Fixing basics",
      "Building consistency",
      "Scaling fast",
      "Complex organisations",
    ],
  },
];

const ComparisonSection: React.FC = () => {
  return (
    <section className="container-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
      {/* Section label (red) */}
    

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-800">
         Compare All Plans
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
         See exactly what each plan includes — side by side.
        </p>
      </div>


      {/* Card wrapper – same vibe as Private Cohorts/Membership */}
      <div className="  overflow-hidden">
        {/* Top border line like reference */}
        {/* <div className="h-[2px] w-full bg-[#3E1FFF]" /> */}

        
     


        

        {/* Inner light panel with table */}
        <div className="px-5 sm:px-8 lg:px-0 py-0 ">
          <div className="rounded-2xl bg-white border border-gray-200  overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[720px]">
                {/* Header row */}
                <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] text-xs md:text-sm font-semibold text-[#37c100] bg-gray-50/50">
                  <div className="px-4 py-3 border-b border-gray-200 text-left">
                    Feature / Element
                  </div>
                  {plans.map((plan) => (
                    <div
                      key={plan}
                      className="px-4 py-3 border-b border-gray-200 text-left"
                    >
                      {plan}
                    </div>
                  ))}
                </div>

                {/* Data rows */}
                {rows.map((row, rowIndex) => {
                  const rowBg =
                    rowIndex % 2 === 0 ? "bg-white/80" : "bg-transparent";
                  return (
                    <div
                      key={row.label}
                      className={`grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] text-xs md:text-sm text-[#4A4267] ${rowBg}`}
                    >
                      {/* Feature label */}
                      <div className="px-4 py-3 border-b border-gray-100 font-semibold">
                        {row.label}
                      </div>

                      {/* Plan values */}
                      {row.values.map((val, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 border-b border-gray-100"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComparisonSection;

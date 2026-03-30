"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import MasonryShuffleBlocks from "@/components/sections/What-be-do-new/MasonryShuffleBlocks";
import FeatureGrid from "@/components/sections/What-be-do-new/FeatureGrid";
import PracticalFlow from "@/components/sections/What-be-do-new/PracticalFlow";
import PlanSection from "@/components/sections/What-be-do-new/PlanSection";
import ComparisonSection from "@/components/sections/What-be-do/ComparisonSection";
import CTASec from "@/components/sections/What-be-do-new/CTASec";
import SliderBrand from "@/components/sections/SliderBrand";

const BrandingStrategyPage = () => {
  // Ensure the page loads from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const systemExplanationColumns = [
    {
      title: "Positioning",
      description: "Defines who you are for and why you matter.",
    },
    {
      title: "Messaging",
      description: "Translates your offer into clear, compelling communication.",
    },
    {
      title: "Visual Identity",
      description: "Creates consistency across every touchpoint.",
    },
    {
      title: "Brand System",
      description: "Ensures everything works together long-term.",
    },
  ];

  const practicalFlowItems = [
    {
      highlight: "Strategic Direction",
      text: "Defines audience, positioning and differentiation.",
    },
    {
      highlight: "Messaging System",
      text: "Shapes how your offer is communicated.",
    },
    {
      highlight: "Visual Identity",
      text: "Aligns design with positioning.",
    },
    {
      highlight: "Implementation",
      text: "Applies the system across all channels.",
    },
  ];

  const strategyDepthColumns = [
    {
      title: "Audience Definition",
      description: "Clear understanding of who you are speaking to.",
    },
    {
      title: "Market Positioning",
      description: "Defined space where your brand stands out.",
    },
    {
      title: "Offer Structure",
      description: "Clarity in what you sell and why it matters.",
    },
    {
      title: "Consistency System",
      description: "Rules that keep your brand aligned long-term.",
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 pt-3 sm:px-4 lg:px-5 pb-0 md:pb-8">
        <div className="container-xl mx-auto">
          <div className="relative overflow-hidden rounded-[18px] bg-[#1D2931] lg:rounded-[20px]">
            <div className="grid md:grid-cols-[55%_45%] gap-10 items-center px-6 md:px-16 py-20">
              {/* LEFT CONTENT */}
              <div className="max-w-xl">
                <h1 className="text-white font-serif text-3xl sm:text-4xl lg:text-[50px] leading-tight mb-6">
                  Your brand is not how it looks. It's how it's understood.
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                  Most brands look polished — but lack clarity. We build positioning systems that make your offer obvious, relevant and hard to ignore.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href="/lets-talk#demo">
                    <button className="bg-[#37C100] hover:bg-[#2d9802] text-white md:px-8 md:py-3.5 px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all">
                      Book a Brand Strategy Call
                    </button>
                  </a>
                  <a href="/lets-talk#ask">
                    <button className="flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#37C100] hover:text-white text-white md:px-8 md:py-3.5 px-6 py-3 rounded-full text-xs md:text-sm transition-all">
                      Ask Us Anything
                    </button>
                  </a>
                </div>
                <p className="mt-4 text-[13px] text-white/60 italic">
                  We review your current setup before the call.
                </p>
              </div>

              {/* RIGHT ANIMATED COLOR BOXES */}
              <MasonryShuffleBlocks />
            </div>
          </div>
        </div>
      </section>

      {/* <SliderBrand /> */}

      {/* 2. SYSTEM EXPLANATION */}
      <FeatureGrid
        title="What a strong brand actually includes"
        columns={systemExplanationColumns}
      />

      {/* 3. PRACTICAL FLOW */}
      <PracticalFlow
        headline="How your brand works in practice"
        subtext="A strong brand is not built in fragments — it follows a clear structure where every decision builds clarity and consistency."
        items={practicalFlowItems}
      />

      {/* 4. STRATEGY DEPTH */}
      <FeatureGrid
        title="Built on strategic clarity — not assumptions"
        columns={strategyDepthColumns}
      />

      {/* 5. PLANS & DELIVERABLES */}
      <PlanSection />
      {/* <ComparisonSection /> */}

      {/* 6. FINAL CTA */}
      <CTASec 
        headline="Build a brand people understand instantly"
        subtext="Let's create clarity before scaling anything else."
      />
    </div>
  );
};

export default BrandingStrategyPage;

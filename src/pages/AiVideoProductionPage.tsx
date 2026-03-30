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

const AiVideoProductionPage = () => {
  // Ensure the page loads from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const systemExplanationColumns = [
    {
      title: "Concept & Direction",
      description: "Defines what to communicate and why it matters.",
    },
    {
      title: "AI Production",
      description: "Generates video variations quickly and efficiently.",
    },
    {
      title: "Content Adaptation",
      description: "Adjusts formats for different platforms and audiences.",
    },
    {
      title: "Scaling & Testing",
      description: "Improves performance through iteration.",
    },
  ];

  const practicalFlowItems = [
    {
      highlight: "Concept & Script",
      text: "Defines message, tone and structure.",
    },
    {
      highlight: "AI Generation",
      text: "Produces multiple video variations.",
    },
    {
      highlight: "Distribution Ready Formats",
      text: "Adapts content for platforms and channels.",
    },
    {
      highlight: "Testing & Optimization",
      text: "Improves results based on performance data.",
    },
  ];

  const productionAdvantageColumns = [
    {
      title: "Faster Production",
      description: "Content created in hours, not weeks.",
    },
    {
      title: "Lower Cost per Asset",
      description: "More content without increasing budget.",
    },
    {
      title: "Infinite Variations",
      description: "Multiple versions for testing and targeting.",
    },
    {
      title: "Scalable Output",
      description: "Consistent production without bottlenecks.",
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="w-full px-0 pt-3 sm:px-4 lg:px-5 pb-0 md:pb-8">
        <div className="container-xl mx-auto">
          <div className="relative overflow-hidden rounded-[18px] mx-4 md:mx-0 bg-[#1D2931] lg:rounded-[20px]">
            <div className="grid md:grid-cols-[55%_45%] gap-10 items-center px-6 md:px-16 py-20">
              {/* LEFT CONTENT */}
              <div className="max-w-xl">
                <h1 className="text-white font-serif text-3xl sm:text-4xl lg:text-[50px] leading-tight mb-6">
                  Video is no longer production.It's scale.
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                  Traditional video is slow and expensive. We build AI-powered video systems that let you produce, test and scale content continuously.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href="/lets-talk#demo">
                    <button className="bg-[#37C100] hover:bg-[#2d9802] text-white md:px-8 md:py-3.5 px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all">
                      Book a Video Strategy Call
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
        title="What an AI video system actually includes"
        columns={systemExplanationColumns}
      />

      {/* 3. PRACTICAL FLOW */}
      <PracticalFlow
        headline="How AI video works in practice"
        subtext="AI video is not about automation alone — it's about building a system where content can be produced, tested and improved continuously."
        items={practicalFlowItems}
      />

      {/* 4. PRODUCTION ADVANTAGE */}
      <FeatureGrid
        title="Built for speed, flexibility and scale"
        columns={productionAdvantageColumns}
      />

      {/* 5. PLANS & DELIVERABLES */}
      <PlanSection />
      {/* <ComparisonSection /> */}

      {/* 6. FINAL CTA */}
      <CTASec 
        headline="Scale content without scaling production chaos"
        subtext="Let's build a video system that actually performs."
      />
    </div>
  );
};

export default AiVideoProductionPage;

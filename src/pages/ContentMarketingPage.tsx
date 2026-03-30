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

const ContentMarketingPage = () => {
  // Ensure the page loads from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const systemExplanationColumns = [
    {
      title: "Messaging & Angles",
      description: "What you say and why people care.",
    },
    {
      title: "Content Structure",
      description: "How ideas are shaped into formats that work.",
    },
    {
      title: "Distribution",
      description: "Where and how content reaches the right audience.",
    },
    {
      title: "Conversion Layer",
      description: "Turning attention into inquiries, bookings or sales.",
    },
  ];

  const practicalFlowItems = [
    {
      highlight: "Direction & Topics",
      text: "Defines what to say and why it matters.",
    },
    {
      highlight: "Content Creation",
      text: "Turns ideas into structured, usable formats.",
    },
    {
      highlight: "Distribution",
      text: "Places content where it can actually be seen.",
    },
    {
      highlight: "Optimization",
      text: "Improves performance based on real data.",
    },
  ];

  const strategyDepthColumns = [
    {
      title: "Content System",
      description: "Structured approach instead of one-off ideas.",
    },
    {
      title: "Platform Logic",
      description: "Each channel used with a clear purpose.",
    },
    {
      title: "Audience Alignment",
      description: "Content tailored to specific decision-makers.",
    },
    {
      title: "Long-Term Growth",
      description: "Compounding results instead of short bursts.",
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
                  Content is not posting.<br />It's how you drive demand.
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                  Most content fills space — but doesn't move people. We build content systems that attract attention, create trust and turn it into action.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href="/lets-talk#demo">
                    <button className="bg-[#37C100] hover:bg-[#2d9802] text-white md:px-8 md:py-3.5 px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all">
                      Book a Content Strategy Call
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
        title="What a content system actually includes"
        columns={systemExplanationColumns}
      />

      {/* 3. PRACTICAL FLOW */}
      <PracticalFlow
        headline="How content actually drives results"
        subtext="Content is not random output — it's a structured system where each piece has a purpose in the bigger picture."
        items={practicalFlowItems}
      />

      {/* 4. STRATEGY DEPTH */}
      <FeatureGrid
        title="Built for consistency — not occasional posts"
        columns={strategyDepthColumns}
      />

      {/* 5. PLANS & DELIVERABLES */}
      <PlanSection />
      {/* <ComparisonSection /> */}

      {/* 6. FINAL CTA */}
      <CTASec 
        headline="Turn content into a growth system"
        subtext="Let's build something that actually drives results."
      />
    </div>
  );
};

export default ContentMarketingPage;

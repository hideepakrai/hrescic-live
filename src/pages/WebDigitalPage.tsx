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

const WebDigitalPage = () => {
  // Ensure the page loads from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const systemExplanationColumns = [
    {
      title: "Structure & Flow",
      description: "Clear user paths that guide visitors toward action.",
    },
    {
      title: "Interface & Messaging",
      description: "Design that communicates value instantly and removes friction.",
    },
    {
      title: "Technical Performance",
      description: "Fast, stable and scalable build.",
    },
    {
      title: "Growth Layer",
      description: "SEO, tracking and continuous improvement.",
    },
  ];

  const practicalFlowItems = [
    {
      highlight: "UX & Structure",
      text: "Defines how users move and where they convert.",
    },
    {
      highlight: "Platform & Build",
      text: "Ensures stability, speed and scalability.",
    },
    {
      highlight: "Visibility & SEO",
      text: "Makes the website discoverable and rankable.",
    },
    {
      highlight: "Optimization & Growth",
      text: "Improves performance after launch.",
    },
  ];

  const technologyColumns = [
    {
      title: "Next.js Framework",
      description: "Server-side rendering and speed optimization.",
    },
    {
      title: "Vercel Infrastructure",
      description: "Global deployment and instant scaling.",
    },
    {
      title: "Performance Optimization",
      description: "Minimal load time and efficient resource usage.",
    },
    {
      title: "Scalable Architecture",
      description: "Ready for growth, integrations and expansion.",
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
                  Web is not a page.<br />It's your conversion system.
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                  Most websites look good — but don't convert. We build fast, structured systems that turn traffic into bookings, leads or sales.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href="/lets-talk#demo">
                    <button className="bg-[#37C100] hover:bg-[#2d9802] text-white md:px-8 md:py-3.5 px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all">
                      Book a Website Strategy Call
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
        title="What a high-performing website actually includes"
        columns={systemExplanationColumns}
      />

      {/* 3. PRACTICAL FLOW */}
      <PracticalFlow
        headline="How your website actually performs in practice"
        subtext="A high-performing website is not built randomly — it follows a clear structure where every part has a role in conversion and growth."
        items={practicalFlowItems}
      />

      {/* 4. TECHNOLOGY */}
      <FeatureGrid
        title="Built on a modern, high-performance stack"
        columns={technologyColumns}
      />

      {/* 5. PLANS & DELIVERABLES */}
      {/* Grey theme is achieved through neutral card backgrounds in existing PlanSection */}
      <PlanSection />
      
      {/* Add specific grey styles for comparison section in the layout if needed, 
          but we'll start with the default and check for purple. 
          The audit said "Replace all purple tones with grey" which we'll handle in the global CSS or specific overrides. */}
      {/* <ComparisonSection /> */}

      {/* 6. FINAL CTA */}
      <CTASec 
        headline="Build a system — not just a website"
        subtext="Let's create something that actually converts."
      />
    </div>
  );
};

export default WebDigitalPage;

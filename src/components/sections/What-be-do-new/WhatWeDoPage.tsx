"use client";

import React from "react";
import SliderBrand from "../SliderBrand";
import CTASec from "./CTASec";
import ServicesSection from "./ServicesSection";
import PlanSection from "./PlanSection";
import ComparisonSection from "../What-be-do/ComparisonSection";
import MasonryShuffleBlocks from "./MasonryShuffleBlocks";

/* =========================
   MAIN PAGE
========================= */
const WhatWeDoPage = () => {
  return (
    <div className="px-4 md:px-0">

      {/* HERO SECTION */}
      <section className="w-full px-0 pt-3 sm:px-4 lg:px-5">
        <div className="container-xl mx-auto">
          <div className="relative overflow-hidden rounded-[18px] bg-[#1D2931] lg:rounded-[20px]">
            <div className="grid md:grid-cols-[55%_45%] gap-10 items-center px-6 md:px-16 py-20">

              {/* LEFT CONTENT */}
              <div className="max-w-xl">
                <h1 className="text-white font-serif text-3xl sm:text-4xl lg:text-[52px] leading-tight mb-6">
                  Creative systems that<br />keep your brand alive.
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                  We build brands, websites, content and video that work together – not in fragments. Clear, aligned and conversion-focused.
                </p>
                <div className="flex items-center gap-4">
                  <a href="/lets-talk#demo">
                    <button className="bg-[#37C100] hover:bg-[#2d9802] text-white md:px-6 md:py-3 px-4 py-3 text-xs rounded-full md:text-sm font-medium">
                      Book a Free Demo
                    </button>
                  </a>
                  <a href="/lets-talk#ask">
                    <button className="flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#37C100] hover:text-white text-white md:px-6 md:py-3 px-5 py-3 text-xs rounded-full md:text-sm">
                      Ask Us Anything
                    </button>
                  </a>
                </div>
              </div>

              {/* RIGHT ANIMATED COLOR BOXES */}
              <MasonryShuffleBlocks />

            </div>
          </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <SliderBrand />
      <ServicesSection />
      <PlanSection />
      <ComparisonSection />
      <CTASec />

    </div>
  );
};

export default WhatWeDoPage;
import React from "react";
import { FaPlay } from "react-icons/fa"; // you can remove if you don't need it anymore
import WhatWeDoSection from "./WhatWeDoSection";
import WorksSection from "./WorksSection";
import PlansDeliverablesSec from "./PlansDeliverablesSec";
import ComparisonSection from "./ComparisonSection";
import CTASection from "../CTASection";
import CaseStudies from "./CaseStudies";
import CTASections from "./CTASections";

const WebPage = () => {
  return (
    <>
      <section className="md:container-xl sm:container-xl max-w-[90%] mt-2 mx-auto relative w-full bg-[#1D2931] rounded-2xl overflow-hidden border border-[#5A1AFF]/30">
        <div className="mx-auto md:ps-16 px-4 py-20 grid md:grid-cols-[55%_45%] gap-10 items-center">
          {/* 🔹 Left Text Content */}
          <div className="max-w-xl px-2">
            <h1 className="text-white font-normal text-3xl sm:text-4xl lg:text-[50px] mb-6 font-serif">
              Creative systems that keep your brand alive. 
            </h1> 

            <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6">
              We build brands, websites, content and video that work together — not
              in fragments.
              <br className="hidden sm:block" />
              Clear, aligned and conversion-focused.
            </p>

            <div className="flex  items-center gap-4">
              {/* Primary CTA */}
              <a href="/lets-talk">
                <button className="bg-[#37C100] hover:bg-[#2d9802] text-white px-5 py-3 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all">
                  Book a Free Demo
                </button>
              </a>

              {/* Secondary CTA */}
              <button className="flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#37C100] text-white hover:text-[#fff] px-5 py-3 md:px-6 md:py-3  rounded-full text-xs md:text-sm transition-all">
                Ask Us Anything
              </button>
            </div>

            {/* Microtext */}
            <p className="mt-4 text-sm md:text-md font-semibold text-white/90">
              Subscription-based creative partnership.
            </p>
          </div>

          {/* 🔹 Right Side Purple Boxes */}
          <div className="relative hidden md:grid grid-cols-5 grid-rows-3 gap-4 h-[350px] items-end">
            {/* Large rectangle at the top-middle */}
            <div className="bg-[#FFFFFF1A] rounded-2xl col-span-3 row-span-2 col-start-2 h-[220px]" />

            {/* Small rectangle on the right, top */}
            <div className="bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-1 col-start-5 h-[100px]" />

            {/* Small rectangle on the right, bottom */}
            <div className="bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-1 col-start-5 row-start-2 h-[110px]" />

            {/* Small square at the bottom-left */}
            <div className="bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-2 col-start-1 h-[100px]" />

            {/* Long rectangle at the bottom-middle */}
            <div className="bg-[#FFFFFF1A] rounded-2xl col-span-3 row-span-1 col-start-2 h-[100px]" />
          </div>
        </div>
      </section>
      <WhatWeDoSection />
      <WorksSection />
      <PlansDeliverablesSec />
      <ComparisonSection />
      {/* <CaseStudies/> */}
      <CTASections />
    </>
  );
};

export default WebPage;

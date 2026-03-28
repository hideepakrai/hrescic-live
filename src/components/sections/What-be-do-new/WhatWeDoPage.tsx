"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SliderBrand from "../SliderBrand";
import CTASec from "./CTASec";
import ServicesSection from "./ServicesSection";
import PlanSection from "./PlanSection";
import ComparisonSection from "../What-be-do/ComparisonSection";

/* =========================
   TYPES
========================= */
type Tile = { id: number; bg: string };
type Slot = { slotId: string; className: string };
type AssignedTile = { tile: Tile; slot: Slot };

/* =========================
   COLOR BOX DATA
========================= */
const tileData: Tile[] = [
  { id: 1, bg: "bg-[#FFFFFF14]" },
  { id: 2, bg: "bg-[#FFFFFF1A]" },
  { id: 3, bg: "bg-[#FFFFFF12]" },
  { id: 4, bg: "bg-[#FFFFFF1F]" },
  { id: 5, bg: "bg-[#FFFFFF18]" },
];

/* =========================
   BOX LAYOUT
========================= */
const slots: Slot[] = [
  { slotId: "large", className: "col-span-3 row-span-2 col-start-4 row-start-1" },
  { slotId: "mid-small", className: "col-span-2 row-span-1 col-start-2 row-start-2" },
  { slotId: "bottom-right", className: "col-span-2 row-span-1 col-start-5 row-start-3" },
  { slotId: "bottom-long", className: "col-span-3 row-span-1 col-start-2 row-start-3" },
  { slotId: "extra", className: "hidden" },
];

/* =========================
   SHUFFLE LOGIC
========================= */
const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  let i = a.length;
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const createInitialAssignments = (): AssignedTile[] =>
  tileData.map((tile, i) => ({ tile, slot: slots[i] }));

const createNextAssignments = (prev: AssignedTile[]): AssignedTile[] => {
  let next: AssignedTile[] = [];
  let tries = 0;

  do {
    const shuffledSlots = shuffle(slots);
    next = tileData.map((tile, i) => ({ tile, slot: shuffledSlots[i] }));
    tries++;
  } while (tries < 6 && next.every((item, i) => item.slot.slotId === prev[i]?.slot.slotId));

  return next;
};

/* =========================
   ANIMATED COLOR BOXES
========================= */
const MasonryShuffleBlocks = () => {
  const [assigned, setAssigned] = useState<AssignedTile[]>(createInitialAssignments());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setAssigned(prev => createNextAssignments(prev));
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="hidden md:grid grid-cols-6 grid-rows-3 gap-5 h-[360px] w-full -ms-8">
      {assigned.map(({ tile, slot }) => (
        <motion.div
          key={tile.id}
          layout
          transition={{
            layout: { duration: 1.1, type: "spring", stiffness: 180, damping: 20 },
          }}
          className={`relative rounded-2xl ${tile.bg} ${slot.className} border border-white/10`}
        />
      ))}
    </div>
  );
};

/* =========================
   MAIN PAGE
========================= */
const WhatWeDoPage = () => {
  return (
    <div className="px-4 md:px-0">

      {/* HERO SECTION */}
      <section className="w-full px-3 pt-3 sm:px-4 lg:px-5">
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
                    <button className="bg-[#37C100] hover:bg-[#2d9802] text-white md:px-6 md:py-3 px-5 py-3 text-xs rounded-full md:text-sm font-medium">
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
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SliderBrand from "../SliderBrand";
import WorkCreateAboutSec from "./WorkCreateAboutSec";
import SectorCard from "./SectorCard";
import GuidesSection from "./GuidesSection";

/* =========================
   TYPES
========================= */
type Tile = { id: number; bg: string };
type Slot = { slotId: string; className: string };
type AssignedTile = { tile: Tile; slot: Slot };

/* =========================
   BACKGROUND COLOR DATA ONLY
========================= */
const tileData: Tile[] = [
  { id: 1, bg: "bg-[#FFFFFF14]" },
  { id: 2, bg: "bg-[#FFFFFF1A]" },
  { id: 3, bg: "bg-[#FFFFFF12]" },
  { id: 4, bg: "bg-[#FFFFFF1F]" },
  { id: 5, bg: "bg-[#FFFFFF18]" },
];

/* =========================
   SLOT LAYOUT
========================= */
const slots: Slot[] = [
  { slotId: "large", className: "col-span-3 row-span-2 col-start-2 row-start-1 rounded-2xl" },
  { slotId: "mid-small", className: "col-span-1 row-span-1 col-start-1 row-start-2 rounded-2xl" },
  { slotId: "bottom-left", className: "col-span-3 row-span-1 col-start-1 row-start-3 rounded-2xl" },
  { slotId: "bottom-right", className: "col-span-1 row-span-1 col-start-4 row-start-3 rounded-2xl" },
  { slotId: "extra", className: "hidden" },
];

/* =========================
   SHUFFLE UTILITY
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

/* =========================
   ASSIGNMENTS
========================= */
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
   HERO BACKGROUND GRID COMPONENT
========================= */
const MasonryShuffleBackgrounds = () => {
  const [assigned, setAssigned] = useState<AssignedTile[]>(createInitialAssignments());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setAssigned(prev => createNextAssignments(prev));
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-[350px] hidden md:block ">
      <div className="relative grid grid-cols-5 grid-rows-3 gap-4 h-full -me-20">
        {assigned.map(({ tile, slot }) => (
          <motion.div
            key={tile.id}
            layout
            transition={{ layout: { duration: 1, type: "spring", stiffness: 180, damping: 20 } }}
            className={`${slot.className} ${tile.bg} border border-white/10`}
          />
        ))}
      </div>
    </div>
  );
};

/* =========================
   WORK PAGE
========================= */
const WorkPage = () => {
  return (
    <>
      <section className="w-full px-3 pt-3 sm:px-4 lg:px-5">
        <div className="container-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[18px] bg-[#1D2931] lg:rounded-[20px]"
          >
            <div className="grid md:grid-cols-[55%_45%] gap-10 items-center px-6 md:px-16 py-20">
              {/* LEFT HERO CONTENT */}
              <div className="max-w-[500px] px-2">
                <h1 className="text-white font-normal text-3xl sm:text-4xl lg:text-[50px] mb-6 font-serif">
                  Brands from different worlds - connected by one truth:
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mb-8">
                  They need marketing that outlives the campaign. We help industry-driven brands stay visible, trusted, and chosen — even in crowded markets.
                </p>
                <div className="flex items-center gap-4">
                  <a href="/lets-talk#demo">
                    <button className="bg-[#37C100] hover:bg-[#2d9802] text-white px-5 py-3 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all hover:-translate-y-0.5">
                      Book a Free Demo
                    </button>
                  </a>
                  <a href="/lets-talk#ask">
                    <button className="flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#37C100] hover:text-white text-white px-5 py-3 md:px-6 md:py-3 rounded-full text-xs md:text-sm transition-all hover:-translate-y-0.5">
                      Ask Us Anything
                    </button>
                  </a>
                </div>
              </div>

              {/* RIGHT HERO BACKGROUND GRID */}
              <MasonryShuffleBackgrounds />
            </div>
          </motion.div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <SliderBrand />
      <WorkCreateAboutSec />
      <SectorCard />
      <GuidesSection />
    </>
  );
};

export default WorkPage;
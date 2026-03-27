"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

/** -------------------------------------------------------
 *  Helpers
 *  ----------------------------------------------------- */
type Tile = {
  id: number;
  bgClass: string;
  image: string;
};

type Slot = {
  slotId: string;
  className: string;
};

type AssignedTile = {
  tile: Tile;
  slot: Slot;
};

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  let i = a.length;
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** -------------------------------------------------------
 *  IMAGE DATA
 *  ----------------------------------------------------- */
const tileData: Tile[] = [
  { id: 1, bgClass: "bg-[#3E0577]", image: "/assets/Image/img1.png" },
  { id: 2, bgClass: "bg-[#440A80]", image: "/assets/Image/img2.png" },
  { id: 3, bgClass: "bg-[#4B0F8A]", image: "/assets/Image/img3.png" },
  { id: 4, bgClass: "bg-[#3B0571]", image: "/assets/Image/img4.png" },
  { id: 5, bgClass: "bg-[#4A0A8F]", image: "/assets/Image/img5.png" },
];

/** -------------------------------------------------------
 *  EXACT LAYOUT LIKE SCREENSHOT
 *  ----------------------------------------------------- */
const slots: Slot[] = [
  // left large card
  {
    slotId: "slot-large",
    className: "col-start-1 row-start-1 row-span-2",
  },
  // top-right long
  {
    slotId: "slot-top-right",
    className: "col-start-2 row-start-1 col-span-2",
  },
  // middle-right long
  {
    slotId: "slot-middle-right",
    className: "col-start-2 row-start-2 col-span-2",
  },
  // bottom small square
  {
    slotId: "slot-bottom-square",
    className: "col-start-2 row-start-3",
  },
  // bottom-right long
  {
    slotId: "slot-bottom-right",
    className: "col-start-3 row-start-3",
  },
];

const createInitialAssignments = (): AssignedTile[] => {
  return tileData.map((tile, index) => ({
    tile,
    slot: slots[index],
  }));
};

const createNextAssignments = (prev: AssignedTile[]): AssignedTile[] => {
  let next: AssignedTile[] = [];
  let tries = 0;

  do {
    const shuffledSlots = shuffle(slots);
    next = tileData.map((tile, index) => ({
      tile,
      slot: shuffledSlots[index],
    }));
    tries++;
  } while (
    tries < 8 &&
    next.every(
      (item, index) => item.slot.slotId === prev[index]?.slot.slotId
    )
  );

  return next;
};

/** -------------------------------------------------------
 *  RIGHT SIDE ANIMATED IMAGE BLOCKS
 *  ----------------------------------------------------- */
const MasonryShuffleBlocks: React.FC = () => {
  const intervalRef = useRef<number | null>(null);
  const [assigned, setAssigned] = useState<AssignedTile[]>(createInitialAssignments());

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setAssigned((prev) => createNextAssignments(prev));
    }, 3000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative hidden md:flex w-full justify-center lg:justify-end right-[30px]">
      <div
        className="grid gap-3 lg:gap-4"
    style={{
  gridTemplateColumns: "300px 92px 176px",
  gridTemplateRows: "108px 108px 108px",
}}
      >
        {assigned.map(({ tile, slot }) => {
          const showPlay =
            slot.slotId === "slot-top-right" ||
            slot.slotId === "slot-middle-right";

          return (
            <motion.div
              key={tile.id}
              layout
              transition={{
                layout: {
                  duration: 1.1,
                  type: "spring",
                  stiffness: 180,
                  damping: 20,
                },
              }}
              className={[
                "relative overflow-hidden rounded-[16px] shadow-inner/10",
                tile.bgClass,
                slot.className,
              ].join(" ")}
            >
              <img
                src={tile.image}
                alt=""
                className="h-full w-full object-cover"
              />

              {showPlay && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                    <FaPlay className="ml-[2px] text-white text-xs" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/** -------------------------------------------------------
 *  HERO
 *  ----------------------------------------------------- */
export default function Hero() {
  return (
    <section className="md:container-xl sm:container-xl max-w-[90%] mt-2 mx-auto relative w-full bg-[#1D2931] rounded-2xl overflow-hidden border border-[#5A1AFF]/30">
      <div className="mx-auto md:ps-16 px-4 py-20 grid md:grid-cols-[55%_45%] gap-10 items-center">
        {/* Left Text Content */}
        <div className="max-w-xl px-2">
          <h1 className="text-white font-normal text-3xl sm:text-4xl lg:text-[50px] mb-6 font-serif">
            Elite Marketing Expertise, Ready When You Need It
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-md mb-10">
            Access premium creative and strategic talent
            that integrates seamlessly with your business,
            precisely when, and how you need it.
          </p>

          <div className="flex items-center gap-4">
            <a href="/lets-talk#ask">
            <button className="bg-[#37C100] hover:bg-[#2d9802] text-white md:px-6 md:py-3 px-5 py-3 text-xs rounded-full md:text-sm font-medium transition-all">
              Let&apos;s Talk
            </button>
            </a>

            <button className="flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#37C100] hover:text-[#fff] text-white md:px-6 md:py-3 px-5 py-3 text-xs rounded-full md:text-sm transition-all">
              <FaPlay className="w-4 h-4" /> Play Showreel
            </button>
          </div>
        </div>

        {/* Right Side Animated Masonry Blocks */}
        <MasonryShuffleBlocks />
      </div>
    </section>
  );
}
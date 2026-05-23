"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type MediaCard = {
  id: number;
  image: string;
  alt: string;
  showPlay?: boolean;
};

type Tile = {
  id: number;
  image: string;
  action?: 'exo' | 'revitalift' | 'showreel';
};

type Slot = {
  slotId: string;
  className: string;
};

type AssignedTile = {
  tile: Tile;
  slot: Slot;
};

const mediaCards: MediaCard[] = [
  {
    id: 1,
    image: "/assets/Image/img1.png",
    alt: "Main showcase",
  },
  {
    id: 2,
    image: "/assets/Image/img2.png",
    alt: "Showreel card",
    showPlay: true,
  },
  {
    id: 3,
    image: "/assets/Image/img3.png",
    alt: "Creative card",
    showPlay: true,
  },
  {
    id: 4,
    image: "/assets/Image/img4.png",
    alt: "Branding card",
  },
  {
    id: 5,
    image: "/assets/Image/img5.png",
    alt: "Product card",
  },
];

const PlayBadge = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/20 shadow-lg backdrop-blur-md">
        <FaPlay className="ml-[2px] text-[12px] text-white" />
      </div>
    </div>
  );
};

export default function HomeHeroSection() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShowreelClick = () => {
    const target = document.getElementById("showreel-section");

    if (!target) {
      console.warn("showreel-section not found");
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-showreel"));
    }, 900);
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

  const slots: Slot[] = [
    { slotId: "large", className: "col-span-1 row-span-2" },
    { slotId: "top", className: "col-start-2 row-start-1" },
    { slotId: "middle", className: "col-start-2 row-start-2" },
    { slotId: "bottom-left", className: "col-start-1 row-start-3 justify-self-end w-[110px]" },
    { slotId: "bottom-right", className: "col-start-2 row-start-3" },
  ];

  const tileData: Tile[] = [
    { id: 1, image: "/assets/Image/exo-turtle.jpg", action: 'exo' },
    { id: 2, image: "/assets/Image/revitalift-jar.png", action: 'revitalift' },
    { id: 3, image: "/assets/Image/img1.png", action: 'showreel' },
    { id: 4, image: "/assets/Image/img4.png", action: 'showreel' },
    { id: 5, image: "/assets/Image/img5.png", action: 'showreel' },
  ];

  const createNextAssignments = (prev: AssignedTile[]): AssignedTile[] => {
    let next: AssignedTile[] = [];
    let tries = 0;

    do {
      const shuffledSlots = shuffle(slots);
      next = tileData.map((tile, i) => ({
        tile,
        slot: shuffledSlots[i],
      }));
      tries++;
    } while (
      tries < 6 &&
      next.every((item, i) => item.slot.slotId === prev[i]?.slot.slotId)
    );

    return next;
  };

  const createInitialAssignments = (): AssignedTile[] =>
    tileData.map((tile, i) => ({
      tile,
      slot: slots[i],
    }));

  const MasonryShuffleBlocks = () => {
    const [assigned, setAssigned] = useState<AssignedTile[]>(createInitialAssignments());
    const intervalRef = useRef<number | null>(null);
  
    useEffect(() => {
      intervalRef.current = window.setInterval(() => {
        setAssigned((prev) => createNextAssignments(prev));
      }, 3000);
  
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, []);
  
    return (
      <div className="hidden md:flex w-full justify-end">
        <div
          className="grid gap-3 lg:gap-4"
          style={{
            gridTemplateColumns: "1.08fr 1fr",
            gridTemplateRows: "120px 120px 120px",
          }}
        >
          {assigned.map(({ tile, slot }) => {
            const showPlay =
              slot.slotId === "top" || slot.slotId === "middle";
  
            return (
              <motion.div
                key={tile.id}
                layout
                onClick={() => {
                  if (tile.action === 'exo') {
                    window.location.href = '/who-we-create-for/expo-life-far-beyond#video-section';
                  } else if (tile.action === 'revitalift') {
                    window.location.href = '/who-we-create-for/loreal#video-section';
                  } else {
                    handleShowreelClick();
                  }
                }}
                transition={{
                  layout: {
                    duration: 1.1,
                    type: "spring",
                    stiffness: 180,
                    damping: 20,
                  },
                }}
                className={`relative overflow-hidden rounded-[18px] bg-white/5 cursor-pointer hover:opacity-90 transition-opacity ${slot.className}`}
              >
                <img
                  src={tile.image}
                  alt="Masonry tile"
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

  if (!mounted) {
    return (
      <section className="w-full pt-3">
        <div className="container-xl mx-auto">
          <div className="relative overflow-hidden rounded-[18px] bg-[#1D2931] lg:rounded-[20px] min-h-[430px]" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pt-3">
      <div className="container-xl mx-auto">
        <div className="relative overflow-hidden rounded-[18px] bg-[#1D2931] lg:rounded-[20px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#1E3442]/40 blur-3xl" />
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#0E1921]/50 blur-3xl" />
          </div>

          <div className="relative grid min-h-[430px] items-center gap-12 px-6 py-8 sm:px-8 sm:py-10 md:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-10 lg:px-14 lg:py-16">
            <div className="max-w-[525px] lg:ps-1">
              <h1 className="font-sans text-[34px] font-[500] leading-[1.2] tracking-[-0.02em] text-white sm:text-[42px] md:text-[48px] lg:text-[50px] xl:text-[50px]">
                {t("hero.title_elite")}
                <br />
                {t("hero.title_expertise")}
             
                {t("hero.title_need")}
              </h1>

              <p className="mt-6 max-w-[470px] text-[14px] leading-7 text-white/80 sm:text-[15px] lg:text-[18px]">
                {t("hero.description")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="/lets-talk#ask">
                  <button className="rounded-full bg-[#37C100] px-5 py-3 text-xs font-medium text-white transition-all hover:bg-[#2d9802] md:px-6 md:py-3 md:text-sm">
                    {t("hero.lets_talk")}
                  </button>
                </a>

                <button
                  type="button"
                  onClick={handleShowreelClick}
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-5 py-3 text-[13px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/16 sm:text-[14px]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full ">
                    <FaPlay className=" text-[12px]" />
                  </span>
                  {t("hero.play_showreel")}
                </button>
              </div>
            </div>

            <div className="w-full">
              <MasonryShuffleBlocks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

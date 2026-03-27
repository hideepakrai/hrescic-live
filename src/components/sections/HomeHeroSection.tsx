"use client";

import React from "react";
import { FaPlay } from "react-icons/fa";

type MediaCard = {
  id: number;
  image: string;
  alt: string;
  showPlay?: boolean;
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

const RightMediaGrid = () => {
  return (
    <div className="mx-auto w-full max-w-[560px] lg:ms-auto">
      <div className="grid grid-cols-[1.08fr_1fr] gap-3 sm:gap-4">
        <div className="relative min-h-[220px] overflow-hidden rounded-[18px] bg-white/5 sm:min-h-[250px] lg:min-h-[250px]">
          <img
            src={mediaCards[0].image}
            alt={mediaCards[0].alt}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="grid grid-rows-2 gap-3 sm:gap-4">
          <div className="relative min-h-[102px] overflow-hidden rounded-[18px] bg-white/5 sm:min-h-[118px] lg:min-h-[120px]">
            <img
              src={mediaCards[1].image}
              alt={mediaCards[1].alt}
              className="h-full w-full object-cover"
            />
            <PlayBadge />
          </div>

          <div className="relative min-h-[102px] overflow-hidden rounded-[18px] bg-white/5 sm:min-h-[118px] lg:min-h-[120px]">
            <img
              src={mediaCards[2].image}
              alt={mediaCards[2].alt}
              className="h-full w-full object-cover"
            />
            <PlayBadge />
          </div>
        </div>

        <div className="relative ms-auto h-[120px] max-w-[110px] overflow-hidden rounded-[18px] bg-white/5 sm:max-w-[120px] lg:max-w-[120px]">
          <img
            src={mediaCards[4].image}
            alt={mediaCards[4].alt}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative h-[120px] overflow-hidden rounded-[18px] bg-white/5 sm:min-h-[70px] lg:min-h-[70px]">
          <img
            src={mediaCards[3].image}
            alt={mediaCards[3].alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default function HomeHeroSection() {
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

  return (
    <section className="w-full px-3 pt-3 sm:px-4 lg:px-5">
      <div className="container-xl mx-auto">
        <div className="relative overflow-hidden rounded-[18px] bg-[#1D2931] lg:rounded-[20px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#1E3442]/40 blur-3xl" />
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#0E1921]/50 blur-3xl" />
          </div>

          <div className="relative grid min-h-[430px] items-center gap-12 px-6 py-8 sm:px-8 sm:py-10 md:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-10 lg:px-14 lg:py-16">
            <div className="max-w-[560px] lg:ps-1">
              <h1 className="font-serif text-[34px] font-normal leading-[1.08] tracking-[-0.03em] text-white sm:text-[42px] md:text-[48px] lg:text-[50px] xl:text-[50px]">
                Elite Marketing
                <br />
                Expertise, Ready When
                <br />
                You Need It
              </h1>

              <p className="mt-6 max-w-[470px] text-[14px] leading-7 text-white/80 sm:text-[15px] lg:text-[17px]">
                Access premium creative and strategic talent that integrates
                seamlessly with your business, precisely when, and how you need
                it.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="/lets-talk#ask">
                  <button className="rounded-full bg-[#37C100] px-5 py-3 text-xs font-medium text-white transition-all hover:bg-[#2d9802] md:px-6 md:py-3 md:text-sm">
                    Let&apos;s Talk
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
                  Play Showreel
                </button>
              </div>
            </div>

            <div className="w-full">
              <RightMediaGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
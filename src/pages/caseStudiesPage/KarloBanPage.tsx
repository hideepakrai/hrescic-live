"use client";
import React, { useState, useMemo, useEffect } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";

const bladeMark = (
  <img
    src="/assets/Image/karlo-ban-white-logo.png"
    alt="Karlo Ban"
    className="h-full w-full object-contain"
  />
);

const PlayIcon = ({ dark = false }: { dark?: boolean }) => (
  <span
    className={`inline-flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11 ${
      dark ? "bg-black/55 text-white" : "bg-white/20 text-white"
    } backdrop-blur-sm`}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.89l10.58-6.86a1.03 1.03 0 0 0 0-1.78L9.56 4.25A1.04 1.04 0 0 0 8 5.14Z" />
    </svg>
  </span>
);

const KarloBanPage = () => {
  const [loadVideo, setLoadVideo] = useState(false);
  const videoId = "cflmfqt1zBg";

  const ytOpts: YouTubeProps["opts"] = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
    }),
    []
  );

  const handlePlay = (_e: YouTubeEvent<number>) => {
    // Optionally handle play
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#video-section") {
      setLoadVideo(true);
    }
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#f4f4f2] text-[#2f2a28] py-8">
      {/* HERO */}
      <section
        className="relative container-xl min-h-[420px] md:min-h-[520px] overflow-hidden rounded-[18px] shadow-[0_20px_60px_rgba(32,12,7,0.16)] sm:rounded-[20px] lg:rounded-[24px]"
        style={{
          backgroundImage: "url('/assets/Image/karoban-hero.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative grid min-h-[420px] md:min-h-[520px] grid-cols-1 lg:grid-cols-[1fr_1fr]">
          {/* left content */}
          <div className="relative z-10 flex flex-col px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-12 lg:py-10">
            <div className="mb-10 flex items-center gap-2 text-[11px] text-white/80 sm:mb-12 sm:gap-3 sm:text-xs lg:mb-14">
              <span className="text-[18px] font-semibold text-white sm:text-[20px] lg:text-[22px]">
                Work
              </span>
              <span className="h-3 w-px bg-white/30" />
              <span className="max-w-full leading-relaxed text-white/80">
                Branding, Web UX &amp; UI, Photography, Video Direction, and AI
                Video and Photo Postproduction
              </span>
            </div>

            <div className="mt-auto max-w-[640px] pb-2 sm:pb-4">
              <h1
                className="text-[30px] leading-[1.06] tracking-[-0.03em] text-white sm:text-[36px] md:text-[42px] lg:text-[50px]"
                style={{ fontFamily: "Inter" }}
              >
                When Craft Meets Collaboration
              </h1>

              <p className="mt-4 text-[14px] leading-6 text-white/75 sm:mt-5 sm:text-[15px] sm:leading-7">
                A true partnership forged in trust, precision, and shared
                vision, resulting in a brand that honors the quality of every
                blade Karlo Ban creates.
              </p>

              <button 
                onClick={() => {
                  setLoadVideo(true);
                  setTimeout(() => {
                    document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15 sm:mt-7"
              >
                <PlayIcon />
                <span>Play Video</span>
              </button>
            </div>
          </div>

          {/* right visual logo */}
          <div className="relative z-10 hidden lg:block">
            <div className="absolute right-[18%] top-1/2 w-[220px] -translate-y-1/2 xl:right-[22%] xl:w-[250px] text-white/85 drop-shadow-[0_20px_40px_rgba(255,160,120,0.24)]">
              <img
                src="/assets/Image/karlon-ban-logo.png"
                alt="Karlo Ban logo"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STORY / INTRO */}
      <section className="mx-auto grid max-w-8xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.05fr_1.15fr] md:items-center lg:gap-12 lg:px-8 lg:py-20">
        <div className="max-w-[520px]">
          <p className="text-[17px] leading-[1.55] text-[#6b6866] sm:text-[18px] md:text-[20px]">
            From the very beginning, this project was built on alignment,
            between design, story, and structure. Working alongside Karlo Ban, a
            master bladesmith from the village of Jelenjak in Zagorje, we set
            out to create a brand that could stand shoulder to shoulder with the
            exceptional quality of his handmade knives.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[1.35fr_0.95fr] sm:md:gap-5">
          <div className="overflow-hidden rounded-[18px] shadow-[0_16px_36px_rgba(0,0,0,0.08)] sm:rounded-[22px]">
            <img
              src="/assets/Image/karo-ban-img.png"
              alt="Karlo Ban working"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-[18px] shadow-[0_16px_36px_rgba(0,0,0,0.08)] sm:rounded-[22px]">
            <img
              src="/assets/Image/karo-ban-img1.png"
              alt="Knife detail"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* THANKS CARD */}
      <section className="container-xl pb-12 sm:pb-14 lg:pb-16">
        <div className="rounded-[18px] bg-[#efefed] px-4 py-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] sm:rounded-[22px] sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-14">
          <p
            className="mx-auto max-w-[740px] text-[19px] leading-[1.45] text-[#5c5856] sm:text-[22px] md:text-[24px] lg:text-[26px]"
            style={{ fontFamily: "Inter" }}
          >
            Many thanks to Karlo for the trust, openness, and clarity of his
            craft, and to all creative partners that worked on the project:
            HrvojeFX, Doku Films, and Hrescic Agency for their professionalism
            and commitment throughout.
          </p>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section id="video-section" className="container-xl pb-12 sm:pb-14 lg:pb-16">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[18px] overflow-hidden group shadow-[0_16px_36px_rgba(0,0,0,0.08)] bg-black">
          {!loadVideo ? (
            <>
              <img
                src="/assets/Image/karoban-hero.png"
                alt="Video preview"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setLoadVideo(true)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:scale-105"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                    <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.89l10.58-6.86a1.03 1.03 0 0 0 0-1.78L9.56 4.25A1.04 1.04 0 0 0 8 5.14Z" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 w-full h-full z-20">
              <YouTube
                videoId={videoId}
                opts={ytOpts}
                className="h-full w-full"
                iframeClassName="h-full w-full"
                onPlay={handlePlay}
              />
            </div>
          )}
        </div>
      </section>

      {/* RESULTS TITLE */}

      {/* RESULTS GRID */}
      <section className="container-xl pb-12 sm:pb-14 lg:pb-16">
         <h2
          className="text-[32px] text-[#504a46] sm:text-[36px] md:text-[40px] lg:text-[44px] text-center pt-10 pb-6"
          style={{ fontFamily: "Inter" }}
        >
          Results
        </h2>
        <div className="grid gap-4 md:grid-cols-12 lg:grid-rows-[220px_220px_220px]">
          {/* Top left branding pattern */}
          <div className="relative overflow-hidden rounded-[18px] bg-[#4d3020] md:col-span-6 lg:row-span-1">
            <img
              src="/assets/Image/karo-ban-gallery-image.png"
              alt="Branding pattern"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Large video portrait */}
          <div className="relative overflow-hidden rounded-[18px] md:col-span-6 lg:row-span-2">
            <img
              src="/assets/Image/karo-ban-gallery-image5.png"
              alt="Karlo Ban portrait"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 w-8 sm:left-5 sm:top-5 sm:w-10 text-[#f27b17]">
              <img
                src="/assets/Image/karoban-logo.svg"
                alt="Karlo Ban mark"
                className="h-auto w-full object-contain"
              />
            </div>
            <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition hover:scale-105">
              <PlayIcon />
            </button>
          </div>

          {/* Branding text */}
          <div className="flex min-h-[120px] items-center justify-center rounded-[18px] bg-transparent px-4 py-6 text-center md:col-span-3 lg:row-span-1">
            <p
              className="text-[20px] leading-[1.35] text-[#625d59] sm:text-[24px] lg:text-[26px]"
              style={{ fontFamily: "Inter" }}
            >
              Branding / Web UX &amp; UI
            </p>
          </div>

          {/* Orange logo card */}
          <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-[18px] bg-[#f77712] md:col-span-3 lg:row-span-1">
            <div className="flex h-[88px] w-[118px] flex-col items-center justify-center text-white">
              <div className="h-[58px] w-[78px]">{bladeMark}</div>
              <span className="mt-2 text-[10px] tracking-[0.16em]">
                Carloban.com
              </span>
            </div>
          </div>

          {/* Bottom left mini stack */}
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-12 md:grid-cols-2 lg:col-span-2 lg:row-span-2 lg:grid-cols-1">
            <div className="overflow-hidden rounded-[18px]">
              <img
                src="/assets/Image/karoban-gallery-images1.png"
                alt="Karlo Ban sitting"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[18px]">
              <img
                src="/assets/Image/category-img.png"
                alt="Karlo Ban hoodie"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative overflow-hidden rounded-[18px] bg-[#e8e7e6] md:col-span-6 lg:col-span-4 lg:row-span-2">
            <img
              src="/assets/Image/karo-ban-gallery-image4.png"
              alt="Phone mockup"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bottom right text + image */}
          <div className="rounded-[18px] bg-transparent px-0 text-center md:col-span-6 lg:col-span-6 lg:row-span-2">
            <p
              className="mb-5 mt-1 px-2 text-[20px] leading-[1.35] text-[#625d59] sm:mt-2 sm:text-[24px] lg:mb-8 lg:mt-4 lg:text-[26px]"
              style={{ fontFamily: "Inter" }}
            >
              AI Supported Video Post-production.
            </p>

            <div className="overflow-hidden rounded-[18px]">
              <img
                src="/assets/Image/karo-ban-gallery-image1.png"
                alt="Knife on table"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KarloBanPage;

"use client";
import React, { useEffect, useState } from "react";

const IDS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen px-4 md:px-0  bg-white pt-10 sm:pt-20 md:pt-24 lg:pt-12 pb-14 sm:pb-20 md:pb-24">

        {/* Section 1: Hero */}
        <section className="container-xl">
            <div className="relative overflow-hidden rounded-[18px] bg-[#f3f3f3] sm:rounded-[22px] lg:rounded-[24px]">
          <div className="grid min-h-[420px] grid-cols-1 lg:min-h-[560px] lg:grid-cols-[0.92fr_1.08fr]">
            {/* Left Content */}
            <div className="relative z-20 flex flex-col justify-start ps-5 pb-8 pt-6 sm:ps-8 sm:pb-10 sm:pt-8 md:ps-10 md:pb-12 md:pt-10 lg:ps-[56px] lg:pb-16 lg:pt-8 xl:ps-[58px]">
              {/* Top Meta */}
              <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#5a5a5a] sm:mb-10 sm:text-[12px] md:mb-32 md:text-[12.5px]">
                <span className="font-semibold text-[#353535] text-[22px]">Work</span>
                <span className="h-3.5 w-px bg-[#cfcfcf]" />
                <span className="italic text-[#7b7b7b] text-[14px]">
                  Web UX &amp; UI, Illustration, Video Direction
                </span>
              </div>

              {/* Logo */}
              <div className="mb-5 h-8 w-fit sm:h-10 md:h-11 lg:mb-6">
                <img
                  src="/assets/Image/Mask group.png"
                  alt="ODO Logo"
                  className="h-full w-auto object-contain"
                />
              </div>

              {/* Heading */}
              <h1
                className="text-[28px] font-light leading-[1.1] text-[#6c6c6c] sm:text-[34px] md:text-[38px]  lg:text-[38px] xl:text-[38px]"
                style={{ fontFamily: "'Optima', 'Times New Roman', serif" }}
              >
                Coaching.com e-learning
                Platform, creative direction,
                video production, and
                delivery system
              </h1>
            </div>

            {/* Right Visual */}
            <div className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-full">
              <div className="absolute inset-0 lg:left-auto lg:w-full">
                <img
                  src="/assets/Image/ids-images.png"
                  alt="IDS visual collage"
                  className="h-full w-full object-cover object-center sm:object-right-top lg:object-contain lg:object-right-top"
                />
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="container-xl" >
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.02fr_0.98fr] md:gap-10 lg:gap-16 my-6">
          {/* Video Block */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#efefef] sm:rounded-[22px] lg:rounded-[24px]">
            {!isVideoPlaying ? (
              <>
                <img
                  src="/assets/Image/Rectangle 1817.png"
                  alt="IDS Showreel Content"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <button
                  onClick={() => setIsVideoPlaying(true)}
                  aria-label="Play video"
                  className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d83a6b] shadow-[0_14px_30px_rgba(216,58,107,0.28)] transition duration-300 hover:scale-105 sm:h-14 sm:w-14"
                >
                  <svg
                    className="ml-0.5 h-5 w-5 text-white sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>

                <div className="pointer-events-none absolute bottom-3 left-3 z-10 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5">
                  <p className="text-[8px] font-light tracking-wide text-white drop-shadow-md sm:text-[9px] md:text-[10px]">
                    IDS showreel storyboard, video direction, in cooperation with
                    hrescic.com
                  </p>
                </div>
              </>
            ) : (
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/L_LUpnjgPso?autoplay=1"
                title="Showreel Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Right Text */}
          <div className="flex items-center md:justify-center lg:justify-start">
            <p className=" text-[14px] leading-[1.7] text-[#373737] sm:text-[15px] md:text-[22px] lg:text-[20px]">
              Creative Director with 20+ years of experience across education,
              consulting, healthcare, and tourism, turning complex business goals
              into high-performing creative systems that grow long-term value and
              revenue.
            </p>
          </div>
</div>
        </section>

        {/* Section 3 */}
        <section className="flex container-xl justify-start md:justify-end" >
          <div className="relative w-full overflow-hidden rounded-[18px] bg-[#efefef] sm:rounded-[22px] md:w-[62%] lg:w-[52%] lg:rounded-[24px]">
            <img
              src="/assets/Image/Rectangle 1818.png"
              alt="Tablet UI Mockups"
              className="h-auto w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/25 to-transparent sm:h-20 md:h-24" />

            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-5 md:bottom-5 md:left-6">
              <p className="text-[11px] font-medium tracking-wide text-white sm:text-[12px] md:text-[13px]">
                Web UX &amp; UI
              </p>
            </div>
          </div>
        </section>
      </div>

  );
};

export default IDS;
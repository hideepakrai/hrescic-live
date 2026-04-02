"use client";
import React, { useState } from "react";

const LorealPage = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="min-h-screen bg-transparent p-3 sm:p-4 md:p-6 lg:p-8 font-inter">
      <div className="container-xl mx-auto flex flex-col gap-4">
        {/* Top Section */}
        <section className="w-full">
          <div className="bg-[#000000] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg">
            {/* Left Content */}
            <div className="flex-1 md:basis-[45%] p-6 sm:p-8 xl:ps-20 flex flex-col justify-start relative py-16">
              <div className="absolute top-6 sm:top-8 md:top-8 left-6 sm:left-8 md:left-12 lg:left-16 xl:left-20 flex flex-wrap items-center gap-2 text-white/70 text-[11px] sm:text-xs md:text-sm font-light">
                <span className="text-white font-[600] tracking-wide text-[22px]">
                  Work
                </span>
                <span className="w-[1px] h-3 bg-white/40"></span>
                <span className="max-w-[260px] sm:max-w-none text-[14px]">
                  Video production
                </span>
              </div>

              <h2
                className="text-[25px] md:text-[35px] leading-[120%] text-white md:pt-36 pt-10 md:pe-0 pe-0"
                style={{ fontFamily: "'Optima', sans-serif" }}
              >
                The packaging served as the initial reference point; the full
                visual direction and all supporting assets were developed and
                produced in my studio.
              </h2>
            </div>

            {/* Right Image */}
            <div className="flex-1 md:basis-[55%] min-h-[260px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[520px] relative">
              <img
                src="/assets/Image/loreal-hero.png"
                alt="L'Oreal Revitalift Laser Renew"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="w-full bg-[#000000] rounded-2xl shadow-lg flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 mb-6 md:mb-10">
          {/* Video Section */}
          <div
            onClick={() => setPlayVideo(true)}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden group cursor-pointer"
          >
            {!playVideo ? (
              <>
                <img
                  src="/assets/Image/video-placeholder-img.png"
                  alt="L'Oreal Revitalift Laser Renew video preview"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* L'Oreal text top-left */}
                <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                  <span className="text-white text-[20px] sm:text-[24px] md:text-[28px] font-light tracking-wide">
                    L'ORÉAL
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors duration-300">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-1 opacity-90"
                    >
                      <path d="M4 2.69C4 1.93 4.81 1.44 5.48 1.81L22.4 11.12C23.09 11.5 23.09 12.5 22.4 12.88L5.48 22.18C4.81 22.55 4 22.07 4 21.31V2.69Z" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <video
                controls
                autoPlay
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source
                  src="/assets/video/loreal-revitalift.mp4"
                  type="video/mp4"
                />
              </video>
            )}
          </div>

          {/* Bottom Text */}
          <div className="mt-4 sm:mt-6 flex flex-col gap-1 md:px-2">
            <span className="text-white text-[1.2rem] sm:text-[1.35rem] md:text-xl lg:text-[30px] font-semibold tracking-wide">
              L'Oreal Revitalift Laser Renew - Video Animation
            </span>

            <p className="text-white/70 text-[10px] sm:text-[13px] md:text-[13px] tracking-wide uppercase font-medium mt-2">
              Creative & video direction, storyboard, and illustration, in
              cooperation with HrvojeXF
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LorealPage;
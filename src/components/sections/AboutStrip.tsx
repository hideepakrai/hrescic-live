"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from 'next/link';
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";

import { useTranslation } from "react-i18next";

export default function AboutStrip() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

  const services = [
    {
      title: t("about.branding"),
      description: t("about.branding_desc"),
      linkText: t("about.branding_link"),
      href: "/what-we-do",
    },
    {
      title: t("about.web"),
      description: t("about.web_desc"),
      linkText: t("about.web_link"),
      href: "/what-we-do",
    },
    {
      title: t("about.content"),
      description: t("about.content_desc"),
      linkText: t("about.content_link"),
      href: "/what-we-do",
    },
    {
      title: t("about.ai"),
      description: t("about.ai_desc"),
      linkText: t("about.ai_link"),
      href: "/what-we-do",
    },
  ];

  const videoId = "VCo6_Q0-mL0";

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

  useEffect(() => {
    const handleOpenShowreel = () => {
      const target = document.getElementById("showreel-section");

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setTimeout(() => {
        setExpanded(true);
        setLoadVideo(true);
      }, 700);
    };

    window.addEventListener("open-showreel", handleOpenShowreel);

    return () => {
      window.removeEventListener("open-showreel", handleOpenShowreel);
    };
  }, []);

  const handleManualPlay = () => {
    setExpanded(true);
    setLoadVideo(true);
  };

  const handlePlay = (_e: YouTubeEvent<number>) => {
    setExpanded(true);
  };

  return (
    <section
      id="showreel-section"
      className="scroll-mt-24 bg-white px-4 py-16 md:px-10 md:py-10"
    >
      <div className="container-xl mx-auto">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-normal text-[#555555] md:text-4xl">
            {t("about.title")}
          </h2>
          <p className="text-lg text-[#555555] md:text-lg">
            {t("about.subtitle")}
          </p>
        </div>

        <motion.div
          layout
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={
            expanded
              ? "grid grid-cols-1 gap-8 items-start"
              : "grid grid-cols-1 gap-12 items-start lg:grid-cols-[55%_45%]"
          }
        >
          <motion.div
            layout
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={
              expanded
                ? "relative h-[400px] w-full overflow-hidden rounded-2xl bg-[#3E0577] md:h-[560px]"
                : "relative flex h-[400px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#3E0577] p-6 md:h-[450px]"
            }
            style={{
              backgroundImage: !loadVideo
                ? "url('/assets/Image/group-img.png')"
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!loadVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handleManualPlay}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/30"
                  aria-label="Play showreel"
                  type="button"
                >
                  <Play className="h-8 w-8 fill-white" />
                </button>
              </div>
            )}

            {loadVideo && (
              <div className="absolute inset-0">
                <YouTube
                  videoId={videoId}
                  opts={ytOpts}
                  className="h-full w-full"
                  iframeClassName="h-full w-full"
                  onPlay={handlePlay}
                />
              </div>
            )}
          </motion.div>

          <motion.div
            layout
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={
              expanded
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                : "grid grid-cols-1 gap-6 sm:grid-cols-2"
            }
          >
            {services.map((service) => (
              <motion.div
                layout
                key={service.title}
                className="flex h-full flex-col rounded-2xl border border-none bg-[#F3F3F3] p-6"
              >
                <h4 className="mb-2 text-lg font-bold text-[#1F1F1F]">
                  {service.title}
                </h4>
                <p className="mb-4 text-md text-[#4B4B4B]">
                  {service.description}
                </p>

                <hr className="mt-auto" />
                <Link
                  href={service.href}
                  className="group flex items-center gap-1 pt-2 text-sm font-medium text-[#41C717] transition-all hover:text-[#3aa914]"
                >
                  {service.linkText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
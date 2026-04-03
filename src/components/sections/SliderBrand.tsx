"use client";

import React from "react";

const topRowBrands = [
  {
    img: "/assets/logo/HBS-styleguide-primary-logo-3-1024x507 1.svg",
    alt: "Harvard Business School",
  },
  {
    img: "/assets/logo/hult-logo.svg",
    alt: "Hult International Business School",
  },
  {
    img: "/assets/logo/HBS-logo-greyscale 1.svg",
    alt: "Henley Business School",
  },
  {
    img: "/assets/logo/logo-2.svg",
    alt: "London Business School",
  },
  {
    img: "/assets/logo/logo-4.svg",
    alt: "Principles Ray Dalio",
  },
  {
    img: "/assets/logo/hogan-logo 1.svg",
    alt: "Hogan",
  },
  {
    img: "/assets/logo/Link → Početna.svg",
    alt: "Profil Klett",
  },
];

const bottomRowBrands = [
  { img: "/assets/logo/Logo-5.svg", alt: "Coaching.com" },
  { img: "/assets/logo/tis-main-logo 2.svg", alt: "TIS Grupa" },
  { img: "/assets/logo/Layer_1.svg", alt: "Pliva Teva" },
  { img: "/assets/logo/Isolation_Mode.svg", alt: "Novartis" },
  { img: "/assets/logo/kroati-logo.svg", alt: "Kroati" },
  { img: "/assets/logo/logo10.svg", alt: "Profil Klett" },
];

import { useTranslation } from "react-i18next";

const LogoCard = ({ img, alt }: { img: string; alt: string }) => {
  return (
    <div className="flex h-[80px] w-full items-center justify-center rounded-2xl  bg-white px-4 py-0 transition-all duration-300 hover:-translate-y-0.5 ">
      <img
        src={img}
        alt={alt}
        className="max-h-[34px] w-auto max-w-full object-contain grayscale transition duration-300 hover:grayscale-0"
      />
    </div>
  );
};

const SliderBrand = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-white py-8 sm:py-10 lg:pt-4 lg:pb-12">
      <div className="container-xl mx-auto px-4">
        <div className="mb-7 flex justify-center">
          <p className="text-center text-[13px] italic font-normal text-[#666666] sm:text-[15px]">
            {t("slider.trusted_by")}
          </p>
        </div>

        <div className="space-y-5">
          {/* Top Row - 7 logos */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {topRowBrands.map((brand, index) => (
              <LogoCard key={`top-${index}`} img={brand.img} alt={brand.alt} />
            ))}
          </div>

          {/* Bottom Row - 6 logos */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 px-4 md:px-0">
            {bottomRowBrands.map((brand, index) => (
              <LogoCard
                key={`bottom-${index}`}
                img={brand.img}
                alt={brand.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderBrand;
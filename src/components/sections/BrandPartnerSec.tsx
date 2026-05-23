"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const BrandPartnerSec = () => {
  const { t } = useTranslation();

  const partners = [
    {
      id: 1,
      title: "Coaching.com",
      category: t("partners.cat_illustration"),
      image: "/assets/Image/img1.png",
      gridCols: "md:col-span-2",
      link: "/who-we-create-for/cdc"
    },
    {
      id: 2,
      title: "MySkin & Poliderma",
      category: t("partners.cat_illustration"),
      image: "/assets/Image/Rectangle 1815.png",
      gridCols: "md:col-span-1",
      link: "/who-we-create-for/poliderma"
    },
    {
      id: 3,
      title: "Castania",
      category: t("partners.cat_illustration"),
      image: "/assets/Image/Rectangle 1831.png",
      gridCols: "md:col-span-1",
      link: "/who-we-create-for/castania"
    },
    {
      id: 4,
      title: "Navada",
      category: t("partners.cat_storyboard"),
      image: "/assets/Image/Rectangle 1813.png",
      gridCols: "md:col-span-2",
      link: "/who-we-create-for/navada"
    },
    {
      id: 5,
      title: "L'oreal Revitalift",
      category: t("partners.cat_direction"),
      image: "/assets/Image/Rectangle 1814.png",
      gridCols: "md:col-span-2",
      link: "/who-we-create-for/loreal"
    },
    {
      id: 6,
      title: "Minglanje V Klanjcu",
      category: t("partners.cat_minglanje"),
      image: "/assets/Image/Rectangle1828.png",
      gridCols: "md:col-span-1",
      link: "/who-we-create-for/minglanje-v-klanjcu"
    },
    {
      id: 7,
      title: "Karlo Ban",
      category: t("partners.cat_illustration"),
      image: "/assets/Image/Rectangle 1821.png",
      gridCols: "md:col-span-1",
      link: "/who-we-create-for/karlo-ban"
    },
    {
      id: 8,
      title: "Samoborski Tamburatorij",
      category: t("partners.cat_illustration"),
      image: "/assets/Image/Rectangle 1832.png",
      gridCols: "md:col-span-2",
      link: "/who-we-create-for/local-boutique-brands"
    },
    {
      id: 9,
      title: "MyRent - Case Study",
      category: t("partners.cat_concept"),
      image: "/assets/Image/Rectangle 1826.png",
      gridCols: "md:col-span-2",
      link: "/who-we-create-for/myrent"
    },
    {
      id: 10,
      title: "Vila Lovelos",
      category: t("partners.cat_minglanje"),
      image: "/assets/Image/Frame.png",
      gridCols: "md:col-span-1",
      link: "/who-we-create-for/tourism-travel"
    },
    {
      id: 11,
      title: "Marcia Reynolds",
      category: t("partners.cat_minglanje"),
      image: "/assets/Image/Rectangle 1827.png",
      gridCols: "md:col-span-1",
      link: "/who-we-create-for/education-e-learning"
    },
    {
      id: 12,
      title: "EXO - Life and Beyond Story",
      category: t("partners.cat_concept"),
      image: "/assets/Image/Rectangle 1876.png",
      gridCols: "md:col-span-2",
      link: "/who-we-create-for/expo-life-far-beyond"
    },
    {
      id: 13,
      title: "IDS Branding",
      category: t("partners.cat_minglanje"),
      image: "/assets/Image/Rectangle 1878.png",
      gridCols: "md:col-span-1",
      link: "/who-we-create-for/ids"
    },
    {
      id: 14,
      title: "Casa Horizontes",
      category: t("partners.cat_minglanje"),
      image: "/assets/Image/Rectangle 1879.png",
      gridCols: "md:col-span-1",
      link: "/who-we-create-for/tourism-travel"
    },
  ];

  return (
    <section className="bg-white py-16 md:py-10 ">
      <div className="container-xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-semibold leading-[1.2] text-[#223039] mb-4 md:text-[40px]">
            {t("partners.title")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {t("partners.subtitle")}
          </p>
        </div>

        {/* Brand / Portfolio Grid exactly matching the reference */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner) => (
            <Link
              href={`${partner.link}#video-section`}
              key={partner.id}
              className={`flex flex-col group ${partner.gridCols}`}
            >
              {/* Image Container */}
              <div className="w-full h-[220px] md:h-[260px] lg:h-[280px] rounded-2xl overflow-hidden mb-4 bg-gray-100 flex-shrink-0">
                <img
                  src={partner.image}
                  alt={partner.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Below Image */}
              <div className="flex flex-col pl-1">
                <h3 className="text-[#1F1F1F] text-[16px] md:text-[18px] font-semibold mb-1 group-hover:text-[#3EDA00] transition-colors">
                  {partner.title}
                </h3>
                <p className="text-[#666666] text-[13px] md:text-[14px]">
                  {partner.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPartnerSec;

"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

// Data for the 4 industry cards
const industries = [
  {
    title: "Tourism & Travel",
    description:
      "For brands that host the world. We help villas, boutique hotels, rental agencies, and yacht charters boost bookings and visibility.",
    linkText: "See tourism projects",
    image: "/assets/Image/travel.png",
    href: "/who-we-create-for/tourism-travel",
  },
  {
    title: "Learning & Development",
    description:
      "For brands that educate professionals to reach their goals. Complete marketing funnel services to capture, nurture and convert leads into course sales.",
    linkText: "Explore educational projects",
    image: "/assets/Image/learning.png",
    href: "/who-we-create-for/education-e-learning",
  },
  {
    title: "Health, Pharma & Beauty",
    description:
      "For brands that build trust through care. From clinics to pharma and beauty — clarity, empathy, credibility.",
    linkText: "See health & beauty work",
    image: "/assets/Image/Beauty.png",
    href: "/who-we-create-for/health-pharma-beauty",
  },
  {
    title: "Local & Boutique Brands",
    description:
      "For makers, doers and dreamers. Authentic identities and digital presence for independent brands.",
    linkText: "Discover boutique projects",
    image: "/assets/Image/local-Boutique.png",
    href: "/who-we-create-for/local-boutique-brands",
  },
];

// Data for the stats block
const stats = [
  {
    value: "$52M+",
    label: "in revenue - helped achieved for clients in driving their portfolios",
  },
  {
    value: "12.000+",
    label: "digital products and services delivered",
  },
  {
    value: "2.300+",
    label: "hours of video materials edited, animated and postproduced",
  },
];

export default function WhoWeCreateFor() {
  return (
    <section className="bg-white py-16 px-4 md:px-10 md:py-18">
      <div className="container-xl mx-auto">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-normal text-gray-color md:text-[40px]">
            Who We Create For
          </h2>
          <p className="text-base text-gray-color md:text-lg">
            We work with forward-thinking businesses across tourism, health,
            beauty, charter and boutique industries - keeping them visible,
            trustworthy and alive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {industries.map((item) => (
            <div
              key={item.title}
              className="flex flex-col overflow-hidden rounded-[16px] bg-white transition-all duration-300 hover:-translate-y-1.5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[220px] w-full object-cover"
              />

              <div className="flex flex-grow flex-col bg-[#F8F8F8] p-6 md:p-7">
                <h4 className="mb-3 border-b border-[#DDDDDD] pb-4 text-[18px] font-semibold text-[#1F1F1F] md:text-[18px]">
                  {item.title}
                </h4>

                <p className="mb-6 text-[14px] leading-relaxed text-[#666666] md:text-[15px]">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <hr className="mb-4 border-gray-200" />
                  <a
                    href={item.href}
                    className="group flex items-center gap-1 text-[15px] font-medium text-[#3aaa35] transition-all hover:underline"
                  >
                    {item.linkText}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-[#1D2931] p-10 text-center text-white md:p-14">
          <h3 className="mx-auto max-w-2xl px-0 py-5 text-[24px] font-normal md:mb-12 md:px-4 md:text-[40px]">
            Delivering on-demand excellence
            <br />
            for brands around the world
          </h3>

          <div className="mb-10 grid grid-cols-1 gap-8 md:mb-12 md:grid-cols-3 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.value}>
                <div className="mb-2 text-[#41C717]">
                  <h3 className="text-4xl font-normal lg:text-[50px]">
                    {stat.value}
                  </h3>
                </div>
                <p className="mx-auto max-w-[250px] text-[14px] font-light text-[#fff]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <a href="/lets-talk#ask">
            <button className="rounded-full bg-[#41C717] px-6 py-3 text-md font-medium text-white transition-all hover:bg-[#3aa914]">
              Let’s Talk
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import { LANGUAGES } from "@/constants";
import i18n from "@/i18n";
import { Link } from "react-router-dom";

type SubCategory = {
  title: string;
  description: string;
  href?: string;
};

type MegaSection = {
  title: string;
  href: string;
  subcategories: SubCategory[];
};

const navItems = [
  { name: "What We Do", href: "/what-we-do", megaKey: "whatWeDo" },
  {
    name: "Who We Create For",
    href: "/who-we-create-for",
    megaKey: "whoWeCreateFor",
  },
  {
    // name: "Brands We Partner With",
    // href: "/brands-we-partner-with",
    // megaKey: "brands",
  },
  { name: "Let's Talk", href: "/lets-talk", megaKey: "contact" },
];

const megaMenuData: Record<
  string,
  {
    title: string;
    subtitle?: string;
    items?: {
      title: string;
      description?: string;
      cards: { title: string; description: string; href?: string }[];
    }[];
    sections?: MegaSection[];
  }
> = {
  whatWeDo: {
    title: "What We Do",
    subtitle:
      "Pregled svih usluga i modela pretplate (branding, web, content, AI video). SEO: creative services, marketing subscription, branding agency Croatia.",
    sections: [
      {
        title: "Branding & Strategy",
        href: "/what-we-do",
        subcategories: [
          {
            title: "Brand Strategy & Positioning",
            description: "Clear foundations, positioning, messaging.",
          },
          {
            title: "Visual Identity",
            description: "A consistent, modern visual language.",
          },
          {
            title: "Packaging & Print Design",
            description: "Physical brand experience design.",
          },
          {
            title: "Brand Architecture",
            description: "Structuring brands, sub-brands, and offers.",
          },
        ],
      },
      {
        title: "Web & Digital",
        href: "/what-we-do",
        subcategories: [
          {
            title: "UX/UI & Web Design",
            description: "Clear flows that turn visitors into clients.",
          },
          {
            title: "SEO & Technical Structure",
            description: "Architecture that supports long-term growth.",
          },
          {
            title: "Webshop & Platforms",
            description: "Custom e-commerce and platform builds.",
          },
          {
            title: "Deployment & Optimization",
            description: "Fast launches and continuous improvement.",
          },
        ],
      },
      {
        title: "Content & Marketing",
        href: "/what-we-do",
        subcategories: [
          {
            title: "Content System",
            description: "Your monthly communication rhythm.",
          },
          {
            title: "Marketing Strategy",
            description: "Targeted plans to drive demand.",
          },
          {
            title: "Social, Ads & PPC",
            description: "Paid distribution with purpose.",
          },
          {
            title: "Analytics & Optimization",
            description: "Data-informed refinement and growth.",
          },
        ],
      },
      {
        title: "AI Video Production",
        href: "/what-we-do",
        subcategories: [
          {
            title: "Video for Social and Ads",
            description: "Scroll-stopping storytelling.",
          },
          {
            title: "Video for Web & Presentations",
            description: "Professional visual assets.",
          },
          {
            title: "AI-Powered Video Production",
            description: "Scalable video creation.",
          },
          {
            title: "Video System & Variations",
            description: "Formats, versions, ongoing refresh.",
          },
        ],
      },
    ],
  },

  whoWeCreateFor: {
    title: "Who We Create For",
    sections: [
      {
        title: "Tourism & Travel",
        href: "/who-we-create-for/tourism-travel",
        subcategories: [
          {
            title: "MyRent",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/myrent",
          },
        ],
      },
      {
        title: "Education & E-Learning",
        href: "/who-we-create-for/education-e-learning",
        subcategories: [
          {
            title: "CDC",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/cdc",
          },
          {
            title: "EXPO – Life far and beyond",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/expo-life-far-beyond",
          },
        ],
      },
      {
        title: "Health, Pharma & Beauty",
        href: "/who-we-create-for/health-pharma-beauty",
        subcategories: [
          {
            title: "L’Oréal",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/loreal",
          },
           {
            title: "Poliderma",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/poliderma",
          },
        ],
      },
      {
        title: "Local & Boutique Brands",
        href: "/who-we-create-for/local-boutique-brands",
        subcategories: [
          {
            title: "Castania",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/castania",
          },
           {
            title: "NAVADA",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/navada",
          },
           {
            title: "Minglanje v Klancu",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/minglanje-v-klanjcu",
          },
           {
            title: "IDS",
            description:
              "Web Design Case Study – 2025.",
            href: "/who-we-create-for/ids",
          },
        ],
      },
    ],
  },

  // brands: {
  //   title: "Brands We Partner With",
  //   subtitle:
  //     "Case study sekcija; SEO: marketing results, case studies, agency portfolio.",
  //   items: [
  //     {
  //       title: "CASE STUDIES",
  //       cards: [
  //         {
  //           title: "CDC",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/cdc",
  //         },
  //         {
  //           title: "MyRent",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/myrent",
  //         },
  //         {
  //           title: "Castania",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/castania",
  //         },
  //         {
  //           title: "Poliderma",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/poliderma",
  //         },
  //         {
  //           title: "L'Oreal",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/loreal",
  //         },
  //         {
  //           title: "Karlo Ban",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/karlo-ban",
  //         },
  //         {
  //           title: "NAVADA",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/navada",
  //         },
  //         {
  //           title: "IDS",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/ids",
  //         },
  //         {
  //           title: "Minglanje V Klanjcu",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/minglanje-v-klanjcu",
  //         },
  //         {
  //           title: "EXPO - Life far and beyond",
  //           description: "Web Design Case Study - 2025",
  //           href: "/case-studies/expo-life-far-beyond",
  //         },
  //       ],
  //     },
  //   ],
  // },

  contact: {
    title: "Let’s Talk",
    subtitle:
      "Kontakt / booking demo; SEO: marketing consultation, creative demo, contact agency.",
    items: [
      {
        title: "Contact & Demo",
        description:
          "Brzi kontakt, upit ili dogovor za prezentaciju rješenja i strategije.",
        cards: [
          {
            title: "Book a Free Demo",
            description:
              "Glavni poziv na akciju – kreativni demo, marketing konzultacije i free strategy call.",
            href: "/lets-talk/book-demo",
          },
        ],
      },
    ],
  },
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    setActiveSectionIndex(0);
  }, [activeMega]);

  const currentMega = activeMega ? megaMenuData[activeMega] : null;

  const currentSections = currentMega?.sections;
  const currentActiveSection =
    currentSections && currentSections[activeSectionIndex]
      ? currentSections[activeSectionIndex]
      : null;

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div
        className="relative border-b border-gray-100"
        onMouseLeave={() => {
          setActiveMega(null);
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center gap-2 text-3xl font-serif font-medium text-gray-900"
              >
                <img
                  src="../assets/Image/hrescic-logo.svg"
                  alt="Hrescic logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = activeMega === item.megaKey;
                const hasMega = item.megaKey && megaMenuData[item.megaKey as string];

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onMouseEnter={() =>
                      hasMega ? setActiveMega(item.megaKey as string) : null
                    }
                    className={`group text-[14px] font-medium transition-colors relative ${
                      isActive
                        ? "text-gray-900"
                        : "text-[#555] hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                    {hasMega && (
                      <span
                        className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-200 ${
                          isActive
                            ? "w-full bg-[#37c100]"
                            : "w-0 bg-[#37c100] group-hover:w-full"
                        }`}
                      />
                    )}
                  </Link>
                );
              })}

              <Link
                to="/lets-talk"
                className="bg-[#37C100] hover:bg-[#2d9802] text-white px-6 py-3 rounded-full text-sm font-medium transition-all"
              >
                Book a Free Demo
              </Link>

              <select
                defaultValue={i18n.language}
                onChange={onChangeLang}
                className="text-sm font-medium text-gray-700 border-none border-gray-200 rounded-md px-2 py-1 bg-white focus:outline-none"
              >
                {LANGUAGES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-gray-700"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {currentMega && (
          <div className="hidden md:block absolute inset-x-0 top-full bg-white border-t border-gray-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-10 py-8">
              <div className="mb-4">
                <h2 className="text-[26px] font-semibold text-gray-900">
                  {currentMega.title}
                </h2>
                {currentMega.subtitle && (
                  <p className="mt-1 text-sm text-gray-500 max-w-xl">
                    {currentMega.subtitle}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 mb-6" />

              {(activeMega === "whatWeDo" || activeMega === "whoWeCreateFor") &&
              currentSections ? (
                <div className="flex items-stretch gap-10">
                  {/* LEFT COLUMN */}
                  <div className="w-64 flex-shrink-0 pr-4">
                    <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">
                      {activeMega === "whoWeCreateFor"
                        ? "Core Industries"
                        : "Core Services"}
                    </h3>

                    <div className="flex flex-col space-y-1">
                      {currentSections.map((section, idx) => {
                        const isSelected = idx === activeSectionIndex;

                        return (
                          <Link
                            key={section.title}
                            to={section.href}
                            onMouseEnter={() => setActiveSectionIndex(idx)}
                            className={`block w-full text-left text-base font-bold py-3 px-4 rounded-md transition-all ${
                              isSelected
                                ? "bg-[#F4F5F7] text-[#37c100]"
                                : "text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {section.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-px bg-gray-200" />

                  {/* RIGHT COLUMN */}
                  <div className="flex-1 pl-6">
                    <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">
                      {activeMega === "whoWeCreateFor"
                        ? "Selected Case Studies"
                        : "Subcategories"}
                    </h3>

                    {currentActiveSection ? (
                      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                        {currentActiveSection.subcategories.map((sub) => {
                          const href = sub.href ?? currentActiveSection.href;

                          return (
                            <Link
                              key={sub.title}
                              to={href}
                              className="group flex flex-col p-3 rounded-md hover:bg-[#F4F5F7] transition-colors"
                            >
                              <h4 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#37c100]">
                                {sub.title}
                              </h4>
                              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                {sub.description}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Select a core service on the left to see subcategories.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                currentMega?.items && (
                  <div className="flex items-stretch">
                    <div className="w-full">
                      {currentMega.items.map((section) => (
                        <div key={section.title} className="mb-6">
                          <h3 className="text-sm font-semibold uppercase text-[#37c100] mb-3">
                            {section.title}
                          </h3>
                          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                            {section.cards.map((card) => {
                              const href = card.href ?? "#";
                              return (
                                <Link
                                  key={card.title}
                                  to={href}
                                  className="group flex flex-col p-3 rounded-md hover:bg-[#F4F5F7] transition-colors"
                                >
                                  <h4 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#37c100]">
                                    {card.title}
                                  </h4>
                                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                    {card.description}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white w-full absolute ${
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-4 pt-2 pb-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/lets-talk"
              onClick={() => setMobileOpen(false)}
              className="bg-[#37c100] hover:bg-[#8000FF] text-white w-full py-3 rounded-full text-sm font-medium text-center transition-all"
            >
              Book a Free Demo
            </Link>

            <select
              defaultValue={i18n.language}
              onChange={onChangeLang}
              className="text-sm font-medium text-gray-700 border-none border-gray-200 rounded-md px-2 py-1 bg-white focus:outline-none"
            >
              {LANGUAGES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
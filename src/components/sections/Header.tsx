"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import { LANGUAGES } from "@/constants";
import i18n from "@/i18n";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

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

const Header = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: t("nav.what_we_do"), href: "/what-we-do", megaKey: "whatWeDo" },
    {
      name: t("nav.who_we_create_for"),
      href: "/who-we-create-for",
      megaKey: "whoWeCreateFor",
    },
    { name: t("nav.lets_talk"), href: "/lets-talk", megaKey: "contact" },
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
      title: t("nav.what_we_do"),
      sections: [
        {
          title: t("about.branding"),
          href: "/what-we-do/branding-strategy",
          subcategories: [
            {
              title: "Brand Strategy & Positioning",
              description: "",
              href: "/what-we-do/branding-strategy",
            },
            {
              title: "Visual Identity",
              description: "",
              href: "/what-we-do/branding-strategy",
            },
            {
              title: "Packaging & Print Design",
              description: "",
              href: "/what-we-do/branding-strategy",
            },
            {
              title: "Brand Architecture",
              description: "",
              href: "/what-we-do/branding-strategy",
            },
          ],
        },
        {
          title: t("about.web"),
          href: "/what-we-do/web-digital",
          subcategories: [
            {
              title: "UX/UI & Web Design",
              description: "",
              href: "/what-we-do/web-digital",
            },
            {
              title: "SEO & Technical Structure",
              description: "",
              href: "/what-we-do/web-digital",
            },
            {
              title: "Webshop & Platforms",
              description: "",
              href: "/what-we-do/web-digital",
            },
            {
              title: "Deployment & Optimization",
              description: "",
              href: "/what-we-do/web-digital",
            },
          ],
        },
        {
          title: t("about.content"),
          href: "/what-we-do/content-marketing",
          subcategories: [
            {
              title: "Content System",
              description: "",
              href: "/what-we-do/content-marketing",
            },
            {
              title: "Marketing Strategy",
              description: "",
              href: "/what-we-do/content-marketing",
            },
            {
              title: "Social, Ads & PPC",
              description: "",
              href: "/what-we-do/content-marketing",
            },
            {
              title: "Analytics & Optimization",
              description: "",
              href: "/what-we-do/content-marketing",
            },
          ],
        },
        {
          title: t("about.ai"),
          href: "/what-we-do/ai-video-production",
          subcategories: [
            {
              title: "Video for Social and Ads",
              description: "",
              href: "/what-we-do/ai-video-production",
            },
            {
              title: "Video for Web & Presentations",
              description: "",
              href: "/what-we-do/ai-video-production",
            },
            {
              title: "AI-Powered Video Production",
              description: "",
              href: "/what-we-do/ai-video-production",
            },
            {
              title: "Video System & Variations",
              description: "",
              href: "/what-we-do/ai-video-production",
            },
          ],
        },
      ],
    },

    whoWeCreateFor: {
      title: t("nav.who_we_create_for"),
      sections: [
        {
          title: t("work.tourism"),
          href: "/who-we-create-for/tourism-travel",
          subcategories: [
            {
              title: "MyRent",
              description: "",
              href: "/who-we-create-for/myrent",
            },
          ],
        },
        {
          title: t("work.learning"),
          href: "/who-we-create-for/education-e-learning",
          subcategories: [
            {
              title: "CDC",
              description: "",
              href: "/who-we-create-for/cdc",
            },
            {
              title: "EXPO – Life far and beyond",
              description: "",
              href: "/who-we-create-for/expo-life-far-beyond",
            },
          ],
        },
        {
          title: t("work.health"),
          href: "/who-we-create-for/health-pharma-beauty",
          subcategories: [
            {
              title: "L'Oréal",
              description: "",
              href: "/who-we-create-for/loreal",
            },
            {
              title: "Poliderma",
              description: "",
              href: "/who-we-create-for/poliderma",
            },
          ],
        },
        {
          title: t("work.local"),
          href: "/who-we-create-for/local-boutique-brands",
          subcategories: [
            {
              title: "Castania",
              description: "",
              href: "/who-we-create-for/castania",
            },
            {
              title: "NAVADA",
              description: "",
              href: "/who-we-create-for/navada",
            },
            {
              title: "Minglanje v Klancu",
              description: "",
              href: "/who-we-create-for/minglanje-v-klanjcu",
            },
            {
              title: "IDS",
              description: "",
              href: "/who-we-create-for/ids",
            },
          ],
        },
      ],
    },

    contact: {
      title: t("nav.lets_talk"),
      items: [
        {
          title: t("mega.contact_demo"),
          description: t("mega.contact_desc"),
          cards: [
            {
              title: t("nav.book_demo"),
              description: "",
              href: "/lets-talk#demo",
            },
            {
              title: t("mega.ask_anything"),
              description: "",
              href: "/lets-talk#ask",
            },
          ],
        },
      ],
    },
  };

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

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white ">
        <div className="relative border-b border-gray-100">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-2 text-3xl font-sans font-medium text-gray-900">
                  <img src="/assets/Image/hrescic-logo.svg" alt="Hrescic logo" className="h-8 w-auto" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div
        className="relative border-b border-gray-100"
        onMouseLeave={() => {
          setActiveMega(null);
        }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8  md:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 text-3xl font-sans font-medium text-gray-900"
              >
                <img
                  src="/assets/Image/hrescic-logo.svg"
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
                    href={item.href}
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
                href="/lets-talk#demo"
                className="bg-[#37C100] hover:bg-[#2d9802] text-white px-6 py-3 rounded-full text-sm font-medium transition-all"
              >
                {t("nav.book_demo")}
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
            <div className="max-w-8xl mx-auto px-10 py-8">
              <div className="mb-4">
                <h2 className="text-[26px] font-semibold text-gray-900">
                  {currentMega.title}
                </h2>
              </div>

              <div className="border-t border-gray-200 mb-6" />

               {(activeMega === "whatWeDo" || activeMega === "whoWeCreateFor") &&
              currentSections ? (
                <div className="flex items-stretch gap-10">
                  {/* LEFT COLUMN */}
                  <div className="w-64 flex-shrink-0 pr-4">
                    <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">
                       {activeMega === "whoWeCreateFor"
                        ? t("mega.core_industries")
                        : t("mega.core_services")}
                    </h3>

                    <div className="flex flex-col space-y-1">
                      {currentSections.map((section, idx) => {
                        const isSelected = idx === activeSectionIndex;

                        return (
                          <Link
                            key={section.title}
                            href={section.href}
                            onMouseEnter={() => setActiveSectionIndex(idx)}
                            onClick={() => setActiveMega(null)}
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
                        ? t("mega.case_studies")
                        : t("mega.subcategories")}
                    </h3>

                    {currentActiveSection ? (
                      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                        {currentActiveSection.subcategories.map((sub) => {
                          const href = sub.href ?? currentActiveSection.href;

                          return (
                            <Link
                              key={sub.title}
                              href={href}
                              onClick={() => setActiveMega(null)}
                              className="group flex flex-col p-3 rounded-md hover:bg-[#F4F5F7] transition-colors"
                            >
                              <h4 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#37c100]">
                                {sub.title}
                              </h4>
                              {sub.description && (
                                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                  {sub.description}
                                </p>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                         {t("mega.select_service")}
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
                                  href={href}
                                  onClick={() => setActiveMega(null)}
                                  className="group flex flex-col p-3 rounded-md hover:bg-[#F4F5F7] transition-colors"
                                >
                                  <h4 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#37c100]">
                                    {card.title}
                                  </h4>
                                  {card.description && (
                                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                      {card.description}
                                    </p>
                                  )}
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
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/lets-talk#demo"
              onClick={() => setMobileOpen(false)}
              className="bg-[#37c100] hover:bg-[#8000FF] text-white w-full py-3 rounded-full text-sm font-medium text-center transition-all"
            >
               {t("nav.book_demo")}
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

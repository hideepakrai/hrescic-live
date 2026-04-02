import React from "react";
import BrandsSlider from "./BrandsSlider";

const scaleList = [
  "Defining a consistent design language across platforms and funnels.",
  "Aligning UX, brand, and content structures.",
  "Standardizing educational content and video production workflows.",
  "Creating scalable systems that support long-term growth.",
];

const navGroups = [
  {
    title: "Education",
    items: [
      { label: "Membership", icon: "membership" },
      { label: "Masterclass", icon: "masterclass" },
      { label: "Programs", icon: "programs" },
      { label: "Community", icon: "community" },
      { label: "Events", icon: "events" },
    ],
  },
  {
    title: "Software",
    items: [
      { label: "Core Features", icon: "star" },
      { label: "Data and Reporting", icon: "report" },
      { label: "Professional Services", icon: "check" },
      { label: "Pricing for Business", icon: "pricing" },
    ],
  },
  {
    title: "Marketplace",
    items: [
      { label: "List Your Coaching", icon: "coach" },
      { label: "List Your Company", icon: "company" },
      { label: "Find a Coach", icon: "search" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Webinars", icon: "webinars" },
      { label: "Podcast", icon: "podcast" },
      { label: "Blog", icon: "blog" },
      { label: "E-Books", icon: "ebooks" },
    ],
  },
];

const AlertDot = () => (
  <span className="mt-[3px] flex h-[21px] w-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#5E1DE1] text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-[15px] w-[15px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  </span>
);

const PillButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    className="w-fit rounded-full bg-[#5E1DE1] px-4 py-[11px] text-center text-[12px] font-medium leading-none text-white transition duration-300 hover:-translate-y-[1px] hover:bg-[#4e16bd] hover:shadow-[0_12px_24px_rgba(94,29,225,0.22)] sm:px-5 sm:py-[12px] sm:text-[13px] md:px-6 md:py-[13px] md:text-[14px] lg:text-[15px]"
  >
    {children}
  </button>
);

const NavIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "membership":
      return <img src="/assets/Image/navigations-icon (2).svg" alt="" className="h-4 w-4 object-contain" />;
    case "masterclass":
      return <img src="/assets/Image/navigations-icon (1).svg" alt="" className="h-4 w-4 object-contain" />;
    case "programs":
      return <img src="/assets/Image/navigations-icon (18).svg" alt="" className="h-4 w-4 object-contain" />;
    case "community":
      return <img src="/assets/Image/navigations-icon (14).svg" alt="" className="h-4 w-4 object-contain" />;
    case "events":
      return <img src="/assets/Image/navigations-icon (13).svg" alt="" className="h-4 w-4 object-contain" />;
    case "star":
      return <img src="/assets/Image/navigations-icon (12).svg" alt="" className="h-4 w-4 object-contain" />;
    case "report":
      return <img src="/assets/Image/navigations-icon (3).svg" alt="" className="h-4 w-4 object-contain" />;
    case "check":
      return <img src="/assets/Image/navigations-icon (11).svg" alt="" className="h-4 w-4 object-contain" />;
    case "pricing":
      return <img src="/assets/Image/navigations-icon (10).svg" alt="" className="h-4 w-4 object-contain" />;
    case "coach":
      return <img src="/assets/Image/navigations-icon (9).svg" alt="" className="h-4 w-4 object-contain" />;
    case "company":
      return <img src="/assets/Image/navigations-icon (8).svg" alt="" className="h-4 w-4 object-contain" />;
    case "search":
      return <img src="/assets/Image/navigations-icon (7).svg" alt="" className="h-4 w-4 object-contain" />;
    case "webinars":
      return <img src="/assets/Image/navigations-icon (1).svg" alt="" className="h-4 w-4 object-contain" />;
    case "podcast":
      return <img src="/assets/Image/navigations-icon (16).svg" alt="" className="h-4 w-4 object-contain" />;
    case "blog":
      return <img src="/assets/Image/navigations-icon (5).svg" alt="" className="h-4 w-4 object-contain" />;
    case "ebooks":
      return <img src="/assets/Image/navigations-icon (4).svg" alt="" className="h-4 w-4 object-contain" />;
    default:
      return <img src="/assets/Image/navigations-icon (2).svg" alt="" className="h-4 w-4 object-contain" />;
  }
};

const NavItem = ({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) => (
  <div className="flex items-start gap-3">
    <span className="flex h-[40px] w-[40px] min-w-[40px] items-center justify-center rounded-[7px] bg-[#EEE7E7] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
      <NavIcon type={icon} />
    </span>
    <span className="min-w-0 text-[13px] leading-[1.35] text-[#838181] sm:text-[14px]">
      {label}
    </span>
  </div>
);

const NavGroup = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; icon: string }[];
}) => (
  <div className="relative">
    <div className="mb-8 flex justify-center sm:mb-9 lg:mb-11">
      <span className="rounded-full bg-[#E8E0E4] px-[20px] py-[8px] text-[14px] font-semibold leading-none text-[#6B28F0] sm:px-[22px] sm:text-[15px] md:text-[16px]">
        {title}
      </span>
    </div>

    <div className="space-y-5 sm:space-y-6 lg:space-y-7">
      {items.map((item) => (
        <NavItem key={item.label} label={item.label} icon={item.icon} />
      ))}
    </div>
  </div>
);

const VisualCard = ({
  label,
  bg,
  image,
  alt,
  height = "min-h-[250px]",
}: {
  label: string;
  bg: string;
  image: string;
  alt: string;
  height?: string;
}) => (
  <div className={`rounded-[24px] ${bg} p-4 sm:p-5`}>
    <p className="mb-4 text-[11px] text-[#B7A8B1]">{label}</p>
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[20px] bg-white/25 ${height}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.05))]" />
      <img
        src={image}
        alt={alt}
        className="relative z-[1] max-h-full w-full object-contain"
      />
    </div>
  </div>
);

const CDCPage = () => {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* HERO SECTION */}
      <section className="w-full px-3 py-3 sm:px-5 sm:py-5">
        <div className="mx-auto container-xl">
          <div className="grid overflow-hidden rounded-[18px] bg-[#F8EDF2] lg:grid-cols-[1fr_1fr]">
            <div className="order-2 flex items-center lg:order-1">
              <div className="w-full px-4 pb-7 sm:px-6 sm:pb-9 md:px-8 md:pb-10 lg:px-[58px] lg:pb-[54px] pt-7">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4 sm:mb-10 lg:mb-14">
                  <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#1B1642]">
                    <span className="text-[13px] font-semibold text-[#16123F] sm:text-[14px] md:text-[22px]">
                      Case Study
                    </span>
                    <span className="text-[#8F8A96]">|</span>
                    <span className="text-[12px] italic text-[#16123F] sm:text-[14px]">
                      e-Learning
                    </span>
                  </div>

                  <a href="/who-we-create-for">
                    <button
                      type="button"
                      className="rounded-full border border-[#E4D6DE] bg-transparent px-4 py-2 text-[11px] font-medium text-[#8F7F87] transition-all duration-300 hover:bg-white/60 sm:text-[12px]"
                    >
                      Back to Portfolio
                    </button>
                  </a>
                </div>

                <div className="mb-5 flex items-center gap-2">
                  <img
                    src="/assets/Image/cdc-logo.svg"
                    alt="Coaching.com logo"
                    className="h-auto max-w-[34px] sm:max-w-[40px]"
                  />
                  <span className="text-[20px] font-medium tracking-[-0.03em] text-[#1C1645] sm:text-[22px]">
                    coaching.com
                  </span>
                </div>

                <h1
                  className=" hero-title max-w-[470px] text-[28px] font-normal leading-[1.08] tracking-[-0.02em] text-transparent sm:text-[34px] md:text-[38px] lg:text-[40px]"
                  style={{
                    fontFamily: "Georgia, Times New Roman, serif",
                    backgroundImage:
                      "linear-gradient(90deg, #5E1DE1 0%, #7E2BFF 40%, #B327FF 72%, #FF2D9B 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  What started as separate products evolved into one cohesive ecosystem.
                </h1>

                <p className="mt-5 max-w-[430px] text-[14px] leading-[1.75] text-[#3D3A55] sm:mt-6 sm:text-[15px] md:text-[16px]">
                  Enabling Coaching.com to scale education, software, and marketplace
                  services through a unified brand and operational system.
                </p>

                <div className="mt-8 flex max-w-[560px] flex-wrap gap-2 sm:mt-9 sm:gap-3">
                  <PillButton>The Challenge</PillButton>
                  <PillButton>The Goals of Collaboration</PillButton>
                  <PillButton>Our Strategic Role</PillButton>
                  <PillButton>The Results</PillButton>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative h-[240px] sm:h-[320px] md:h-[420px] lg:h-full lg:min-h-[560px]">
                <img
                  src="/assets/Image/CDC-hero-img.png"
                  alt="Coaching.com case study visual"
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_22%,rgba(255,255,255,0)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandsSlider />

      {/* INTRO TEXT */}
      <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:pb-10">
        <div className="mx-auto container-xl rounded-[2px]">
          <div className="px-1 sm:px-6 md:px-8 lg:px-[120px]">
            <div className="mt-10 grid gap-y-8 sm:mt-[50px] md:mt-[60px] lg:grid-cols-[1fr_1fr] lg:gap-x-[50px] xl:gap-x-[60px]">
              <div>
                <p
                  className="mt-4 text-[20px] font-normal leading-[1.3] tracking-[-0.015em] text-[#0F0F3D] sm:mt-5 sm:text-[24px] md:text-[25px] lg:text-[26px]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  With appreciation for the journey, providing creative direction
                  services for Coaching.com gave me the privilege of working closely
                  with some of the world's leading thought leaders, academic professors,
                  and business professionals.
                </p>
              </div>

              <div className="max-w-[520px]">
                <div className="mt-2 space-y-[14px] sm:mt-5">
                  <p className="text-[14px] leading-[1.7] text-[#0F0F3D] sm:text-[15px] md:text-[16px]">
                    Through interviews and direct collaboration, I was able to learn
                    directly from their experience and perspectives, but just as
                    importantly, I had the opportunity to work alongside exceptional
                    people at every level. Many of those professional relationships
                    grew into lasting friendships, and each collaboration left a
                    meaningful mark on both my work and my life.
                  </p>
                  <p className="text-[14px] leading-[1.7] text-[#0F0F3D] sm:text-[15px] md:text-[16px]">
                    All of these encounters contributed deeply to my professional and
                    personal growth, and for that, I am sincerely grateful.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="w-full px-3 pb-6 pt-16 sm:px-5 sm:pb-8 sm:pt-20 lg:pb-10 lg:pt-24">
        <div className="mx-auto container-xl">
          <div className="overflow-hidden rounded-[14px] bg-[#EBE1F7]">
            <div className="grid border-b border-[#e2dbd7] bg-[#F7F0FF] lg:grid-cols-[1.02fr_0.98fr]">
              <div className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:pb-[56px] lg:pe-[24px] lg:ps-[86px] lg:pt-[34px]">
                <h3 className="text-[20px] font-normal text-[#0F0F3D] sm:text-[22px] md:text-[24px] lg:text-[26px]">
                  The Challenge:
                </h3>

                <p
                  className="mt-6 text-[20px] font-normal leading-[1.35] tracking-[-0.015em] text-[#0F0F3D] sm:mt-8 sm:text-[22px] md:mt-10 md:text-[24px] lg:mt-[14px] lg:text-[26px]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  Coaching.com operated across three independently developed pillars:
                  education programs, software, and marketplace services. Each pillar
                  differed in structure, funnels, visual language, and delivery
                  methods, while software and marketplace functionalities partially
                  overlapped.
                </p>
              </div>

              <div className="flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-[46px]">
                <img
                  src="/assets/Image/CDC-cta-img.png"
                  alt="Coaching ecosystem visual"
                  className="w-full max-w-[410px] object-contain"
                />
              </div>
            </div>

            <div className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-[86px] lg:pb-[50px] lg:pt-[60px]">
              <h3
                className="max-w-[680px] text-[20px] font-normal leading-[1.3] tracking-[-0.015em] text-[#0F0F3D] sm:text-[22px] md:text-[24px] lg:text-[26px]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                Rather than enforcing rigid standardization, the approach focused on
                creating a shared foundation that allowed different products to evolve
                independently while remaining visually and structurally aligned.
              </h3>

              <h3
                className="mt-7 text-[20px] font-normal leading-[1.3] tracking-[-0.015em] text-[#0F0F3D] sm:mt-8 sm:text-[22px] md:text-[24px] lg:text-[26px]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                This included:
              </h3>

              <div className="mt-6 space-y-[14px] sm:mt-7">
                {scaleList.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertDot />
                    <p className="text-[14px] leading-[1.7] text-[#0F0F3D] sm:text-[15px] md:text-[16px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULT INTRO */}
      <section className="px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14">
        <div className="mx-auto container-xl">
          <div className="text-center">
            <h2
              className="text-[24px] font-normal leading-[1.18] tracking-[-0.02em] text-[#0F0F3D] sm:text-[30px] md:text-[34px] lg:text-[40px]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              The Result
            </h2>

            <p className="mt-2 px-2 text-[14px] font-normal leading-[1.7] text-[#0F0F3D] sm:text-[15px] md:text-[16px]">
              Below is the UX & UI presentation of the three key areas: Platform
              <br className="hidden sm:block" />
              Website, Summit & Program Funnel Pages, and Program Delivery System.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORM WEBSITE SECTION */}
      <section className="w-full px-3 pb-6 sm:px-5 lg:pb-10">
        <div className="mx-auto container-xl">
          <div className="rounded-[28px] border border-[#EEEEEE] bg-[#FFF] p-4 sm:p-6 md:p-8 lg:p-20">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#F9F3F3] text-[24px] font-bold text-[#6B28F0]">
                1
              </span>
              <h3 className="text-[20px] font-normal tracking-[-0.02em] text-[#1A173F] sm:text-[24px] md:text-[26px]">
                Platform website
              </h3>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-x-12">
              <p
                className="text-[22px] leading-[1.28] tracking-[-0.02em] text-[#0F0F3D] sm:text-[24px] md:text-[26px] lg:text-[28px]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                The objective of the Coaching.com website redesign was to establish a
                unified design system that supports the platform's long-term product
                strategy.
              </p>

              <p className="pt-1 text-[14px] leading-[1.8] text-[#0F0F3D] sm:text-[15px] md:text-[16px]">
                The goal was to create a web-design concept that aligns three core
                business offerings – Coaching Software, Education Hub, and Coaches
                Marketplace – into a single, coherent ecosystem.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <img
                  src="/assets/Image/platform-img.png"
                  alt=""
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="grid gap-4 sm:gap-5 lg:col-span-5">
                <div>
                  <img
                    src="/assets/Image/platform-img2.png"
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div>
                  <img
                    src="/assets/Image/platform-img1.png"
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* WEBSITE NAVIGATION */}
            <div className="mt-8 overflow-hidden rounded-[24px] bg-[#F4EFF1]">
              <div className="px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5 lg:px-8 lg:pb-12">
                <p className="text-[11px] italic text-[#C8B9BE]">
                  Website Navigation
                </p>

                <div className="relative mt-6">
                  <div className="flex justify-center">
                    <span className="relative z-[2] rounded-full bg-[#D9CCFF] px-5 py-[8px] text-[14px] font-semibold leading-none text-[#5F29E6] shadow-[0_1px_0_rgba(255,255,255,0.5)] sm:text-[15px] md:text-[16px]">
                      Navigation
                    </span>
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-[17px] hidden h-[84px] w-px -translate-x-1/2 bg-[#D8CED3] lg:block" />
                  <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[64px] hidden h-px bg-[#D8CED3] lg:block" />
                  <div className="pointer-events-none absolute left-[12.5%] top-[64px] hidden h-[24px] w-px bg-[#D8CED3] lg:block" />
                  <div className="pointer-events-none absolute left-[37.5%] top-[64px] hidden h-[24px] w-px bg-[#D8CED3] lg:block" />
                  <div className="pointer-events-none absolute left-[62.5%] top-[64px] hidden h-[24px] w-px bg-[#D8CED3] lg:block" />
                  <div className="pointer-events-none absolute left-[87.5%] top-[64px] hidden h-[24px] w-px bg-[#D8CED3] lg:block" />
                </div>

                <div className="mt-10 grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 md:gap-x-10 lg:mt-[72px] lg:grid-cols-4 lg:gap-x-8 xl:px-6">
                  {navGroups.map((group) => (
                    <NavGroup
                      key={group.title}
                      title={group.title}
                      items={group.items}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-[#EDE6E9] px-4 pb-4 pt-3 sm:px-6 lg:px-8">
                <p className="text-[11px] italic text-[#C8B9BE]">
                  CTA (Call To Action)
                </p>

                <div className="flex justify-center py-8 sm:py-10 md:py-12">
                  <a href="/lets-talk#demo">
                    <button
                      type="button"
                      className="rounded-full bg-[#5E1DE1] px-5 py-[13px] text-[12px] font-medium leading-none text-white transition duration-300 hover:bg-[#4e16bd] hover:shadow-[0_14px_28px_rgba(94,29,225,0.22)] sm:px-7 sm:text-[13px] md:px-8 md:py-[14px] md:text-[14px]"
                    >
                      Join Our Global Community
                    </button>
                  </a>
                </div>

                <p className="text-[11px] text-[#C8B9BE]">#F2ECEC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 COLUMN GRID SECTION */}
      <section className="w-full px-3 pb-6 sm:px-5 lg:pb-8">
        <div className="mx-auto container-xl">
          <div className="rounded-[28px] bg-[#FBF6F7] p-4 sm:p-6 lg:p-8">
            <p className="text-[12px] italic text-[#C4B6BC]">12 Column Website Grid</p>

            <div className="mt-5 overflow-hidden rounded-[26px] bg-[#F6EFF0] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
              <div className="mx-auto max-w-[1254px]">
                <div className="relative">
                  <div className="relative mx-auto max-w-[1254px] pt-7">
                    <div className="absolute left-0 right-0 top-3 h-px bg-[#DCCFD4]" />
                    <div className="absolute left-0 top-1 h-4 w-px bg-[#DCCFD4]" />
                    <div className="absolute right-0 top-1 h-4 w-px bg-[#DCCFD4]" />
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[12px] italic text-[#C4B6BC]">
                      1254 Pix
                    </span>
                  </div>

                  <div className="mt-6">
                    <span className="inline-block text-[12px] italic text-[#C4B6BC]">
                      30 Pix Gutter
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-12 gap-2 sm:gap-3 lg:gap-[14px]">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-[64px] rounded-[12px] bg-[#EDE4E6] sm:h-[84px] sm:rounded-[14px] md:h-[96px] lg:h-[110px]"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[11px] text-[#C4B6BC]">#F9F3F3</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOCUS STATEMENT */}
      <section className="w-full px-3 pb-14 pt-8 sm:px-5 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-16">
        <div className="mx-auto container-xl">
          <div className="mx-auto max-w-[560px] text-center">
            <p className="text-[15px] font-normal leading-[1.7] tracking-[-0.02em] text-[#1A173F] sm:text-[16px] lg:text-[16px]">
              The focus was on{" "}
              <span className="font-semibold text-[#5E1DE1]">
                establishing a clear structural logic through custom graphic creations,
                shared design language, and flexible components
              </span>{" "}
              that support different client needs while producing one coherent
              platform vision.
            </p>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div className="mx-auto container-xl space-y-4 sm:space-y-5">
          <img
            src="/assets/Image/website-img.png"
            alt="CDC Platform Hero"
            className="w-full h-auto object-cover"
          />
          <img
            src="/assets/Image/website-img1.png"
            alt="CDC Platform Hero"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="w-full px-3 pb-6 pt-12 sm:px-5 sm:pt-14 lg:pb-10 lg:pt-16">
        <div className="mx-auto container-xl">
          <div className="rounded-t-[15px] border border-[#EEEEEE] bg-[#FFF]">
            <div className="flex items-center gap-3 p-4 py-8 sm:p-6 sm:py-9 md:p-8 md:py-10 lg:p-20 lg:py-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#F9F3F3] text-[24px] font-bold text-[#6B28F0]">
                2
              </span>
              <h3 className="text-[20px] font-normal tracking-[-0.02em] text-[#1A173F] sm:text-[24px] md:text-[26px]">
                Summit & Program Funnel
              </h3>
            </div>
          </div>

          <div>
            <img
              src="/assets/Image/website-img2.png"
              alt="CDC Platform Hero"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="w-full px-3 pb-6 pt-12 sm:px-5 sm:pt-14 lg:pb-10 lg:pt-16">
        <div className="mx-auto container-xl">
          <div className="rounded-t-[15px] border border-[#EEEEEE] bg-[#FFF]">
            <div className="flex items-center gap-3 p-4 py-8 sm:p-6 sm:py-9 md:p-8 md:py-10 lg:p-20 lg:py-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#F9F3F3] text-[24px] font-bold text-[#6B28F0]">
                3
              </span>
              <h3 className="text-[20px] font-normal tracking-[-0.02em] text-[#1A173F] sm:text-[24px] md:text-[26px]">
                Program Delivery
              </h3>
            </div>
          </div>

          <div className="bg-[#F8F8F8] p-4 sm:p-8 md:p-10 lg:p-16">
            <img
              src="/assets/Image/website-img3.png"
              alt="CDC Platform Hero"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CDCPage;
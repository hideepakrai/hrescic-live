import React from "react";

const issueList = [
  "Disconnected products and offerings",
  "Inconsistent UX, brand and messaging",
  "Complex funnels that don't convert as expected",
  "Growth that becomes harder to manage over time",

];

const scaleList = [
  "A clear structure learners immediately understand",
  "A unified experience across programs, platforms and funnels",
  "Messaging that builds trust before commitment",
  "Systems that support scale without adding confusion",
];

const caseCards = [
  {
    title: "Case - ",
    highlight: "Intro",
    text: "One example of turning fragmented education products into a cohesive, scalable system.",
    image: "/assets/Image/educations-case-img.png",
    alt: "Case intro collage",
    bg: "bg-[#F7F0FF]",
  },
  {
    title: "Case - ",
    highlight: "Headline",
    text: "From separate products to one ecosystem: Scaling Coaching.com through clarity",
    image: "/assets/Image/educations-case-1.png",
    alt: "Case highlight visual",
    bg: "bg-[#FFF0FD]",
  },
  {
    title: "Case - ",
    highlight: "Summary",
    text: "Coaching.com operated across independently developed education programs, software and marketplace services. The challenge wasn't growth,  it was unifying structure, experience and delivery without limiting future evolution.",
    image: "/assets/Image/educations-case-2.png",
    alt: "Case summary visual",
    bg: "bg-[#F9F3F3]",
  },
];

const AlertDot = () => (
  <span className="mt-[3px] flex h-[14px] w-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#8923C0] text-[10px] font-bold leading-none text-white">
    !
  </span>
);

const QuoteMark = () => (
  <span className="flex h-[28px] w-[30px] min-w-[30px] items-center justify-center rounded-[6px] bg-[#E3D5F4] text-[20px] font-semibold leading-none text-[#8923C0]">
    !
  </span>
);

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
}

const GoldButton = ({ children, href }: GoldButtonProps) => {
  const baseClass = "inline-block w-full sm:w-fit rounded-full bg-[#5E1DE1] px-5 sm:px-7 py-[13px] sm:py-[14px] text-center text-[14px] sm:text-[15px] font-medium leading-[1.35] text-white transition duration-300 hover:bg-[#4A14B1] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]";

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={baseClass}>
      {children}
    </button>
  );
};



const EducationELearningPage = () => {
  return (
    <div className="w-full bg-white overflow-x-hidden">



      {/* HERO SECTION */}
      <section className="w-full px-3 py-3 sm:px-5 sm:py-5">
        <div className="mx-auto container-xl">
          <div className="grid overflow-hidden rounded-[18px] bg-[#FFF0F5] lg:grid-cols-[0.98fr_1.02fr]">
            <div className="flex items-center order-2 lg:order-1">
              <div className="w-full px-4 py-7 sm:px-8 sm:py-10 md:px-10 md:py-7 lg:pb-[74px] lg:ps-[75px] lg:pe-8">
                <div className="mb-7 flex flex-wrap items-center gap-2 sm:gap-3 text-[13px] text-[#666666] sm:mb-10 lg:mb-12">
                  <span className="text-[14px] sm:text-[20px] font-semibold text-[#0F0F3D]">
                    Who We Create For
                  </span>
                  <span className="text-[#9b9b9b]">|</span>
                  <span className="text-[13px] italic text-[#0F0F3D]">
                    Education & E-Learning
                  </span>
                </div>

                <div className="pt-8">
                  <h1
                    className="pe-4  text-[28px] sm:text-[34px] md:text-[40px] lg:text-[38px] font-[400] leading-[1.08] tracking-[-0.03em] text-transparent bg-clip-text"
                    style={{
                      fontFamily: "Optima, Georgia, Times New Roman, serif",
                      backgroundImage: "linear-gradient(90deg, #5E1DE1 0%, #FF1DA4 100%)",
                    }}>
                    Education & e-learning brands don't scale by adding more products. They scale by creating clarity.
                  </h1>

                  <p className="mt-5 sm:mt-6 lg:mt-4 max-w-[430px] text-[15px] sm:text-[17px] leading-[1.75] text-[#0F0F3D]">
               We help education and e-learning businesses align programs, platforms and content into one coherent system — built to scale without losing trust, structure or focus.
                  </p>

                  <div className="mt-4 sm:mt-8 lg:mt-6 flex flex-col gap-3">
                    <GoldButton href="/lets-talk#ask">
                      Talk about scaling your education business
                    </GoldButton>

                    <GoldButton href="/lets-talk#demo">
                     See how education platforms grow with us
                    </GoldButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 p-[2px]">
              <div className="relative h-[260px] overflow-hidden sm:h-[340px] md:h-[430px] lg:h-full lg:min-h-[552px]">
                <img
                  src="/assets/Image/education-imgs.png"
                  alt="Health pharma beauty product"
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* REALITY SECTION */}
      <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:pb-10">
        <div className="mx-auto container-xl rounded-[2px]">
          <div className="px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-[120px] lg:py-[68px]">
            <div className="mx-auto  text-center">
              <h2
                className="text-[26px] sm:text-[31px] md:text-[38px] lg:text-[40px] font-normal leading-[1.2] tracking-[-0.02em] text-[#0F0F3D]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                The reality of education & e-learning today
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-[14px] sm:text-[15px] leading-[1.55] text-[#0F0F3D]">
                Education businesses grow fast, and then stall.
              </p>
            </div>

            <div className="mt-10 sm:mt-[60px] grid gap-y-10 lg:grid-cols-[1fr_1.14fr] lg:gap-x-[70px] xl:gap-x-[110px]">
              <div className="max-w-[390px]">
                <h3 className="text-[16px] sm:text-[17px] font-semibold leading-[1.3] text-[#0F0F3D]">
                  The Challenge
                </h3>

                <p
                  className="mt-4 sm:mt-5 text-[22px] sm:text-[26px] md:text-[26px] font-normal leading-[1.28] tracking-[-0.015em] text-[#0F0F3D]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  Programs, platforms and funnels evolve separately, creating fragmented experiences for learners, teams and partners.
                </p>
              </div>

              <div className="max-w-[520px]">
                <h3 className="text-[16px] sm:text-[17px] font-semibold leading-[1.3] text-[#0F0F3D]">
                  What this leads to:
                </h3>

                <div className="mt-4 sm:mt-5 space-y-[14px]">
                  {issueList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertDot />
                      <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#0F0F3D]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT DRIVES GROWTH */}
      <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:pb-10">
        <div className="mx-auto container-xl">
          <div className="overflow-hidden rounded-[14px] bg-[#EBE1F7]">
            <div className="grid border-b border-[#e2dbd7] bg-[#F7F0FF] lg:grid-cols-[1.02fr_0.98fr]">
              <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:ps-[86px] lg:pe-[24px] lg:pb-[56px] lg:pt-[34px]">
                <h3 className="text-[14px] sm:text-[22px] font-semibold text-[#5E1DE1]">
                  What actually drives growth in education
                </h3>

                <p
                  className="mt-8 sm:mt-10 md:mt-14 lg:mt-[72px] text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.35] tracking-[-0.015em] text-[#0F0F3D]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  Education growth doesn't come from more courses, more tools or more features.  It comes from clarity across the entire learning ecosystem — from first touchpoint to program delivery.
                </p>
              </div>

              <div className="flex items-center justify-center px-5 py-7 sm:px-8 sm:py-8 md:px-10 lg:px-[46px]">
                <img
                  src="/assets/Image/educations-growth-img.png"
                  alt="Health beauty digital ecosystem examples"
                  className="w-full max-w-[410px] object-contain"
                />
              </div>
            </div>

            <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-[86px] lg:pb-[50px] lg:pt-[60px]">
              <h3
                className="text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.3] tracking-[-0.015em] text-[#0F0F3D]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                Education and e-learning brands grow when they have:
              </h3>

              <div className="mt-6 sm:mt-7 space-y-[14px]">
                {scaleList.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertDot />
                    <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#0F0F3D]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 sm:mt-12 lg:mt-[48px] flex items-start gap-3 sm:gap-4">
                <QuoteMark />
                <p
                  className="text-[20px] sm:text-[22px] font-normal leading-[1.35] tracking-[-0.015em] text-[#0F0F3D]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  That's what we build by aligning brand, UX, content and structure into one scalable education system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14 ">
        <div className="mx-auto container-xl">
          <div className="text-center">
            <h2
              className="text-[26px] sm:text-[31px] md:text-[36px] lg:text-[40px] font-normal leading-[1.18] tracking-[-0.02em] text-[#0F0F3D]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              How this works in real education ecosystems:
            </h2>


            <p className="mt-2 text-[15px] sm:text-[22px] font-semibold text-[#0F0F3D]">
              (Coaching.com - Case Study):
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {caseCards.map((card, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-[16px] ${card.bg}`}
              >
                <div className="h-[210px] sm:h-[220px] w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-4 sm:px-[18px] pb-5 sm:pb-[26px] pt-4 sm:pt-[16px]">
                  <h3 className="border-b border-[#dfd8d4] pb-3 text-[16px] sm:text-[17px] font-semibold text-[#0F0F3D]">
                    {card.title}
                    <span className="text-[#CE1DB7]">{card.highlight}</span>
                  </h3>

                  <p className="pt-4 text-[14px] sm:text-[15px] leading-[1.65] text-[#0F0F3D]">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <GoldButton href="/who-we-create-for/cdc">
              See how clarity enables scale in education
            </GoldButton>
          </div>
        </div>
      </section>

      {/* STRUCTURE BEATS CAMPAIGNS */}
      <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14">
        <div className="mx-auto container-xl">
          <div className="mx-auto max-w-[760px] text-left lg:ml-[108px]">
            <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#0F0F3D]">
              Why clarity beats complexity in education?
            </h3>

            <p
              className="mt-3 text-[22px] sm:text-[26px] md:text-[28px] font-normal leading-[1.33] tracking-[-0.015em] text-[#0F0F3D]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              Education businesses don't struggle because they lack expertise. They struggle because complexity hides value.
            </p>
          </div>

          <div className="mx-auto mt-8 md:container-xl sm:container lg:px-[108px] ">
            <div className="overflow-hidden rounded-[16px] bg-[#fff] border border-[#EEEEEE] p-4 lg:grid lg:grid-cols-[0.95fr_1.05fr]">

              {/* LEFT TEXT */}
              <div className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-[25px]">
                <p
                  className="text-center text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.38] tracking-[-0.015em] text-[#0F0F3D]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  Instead of enforcing rigid standardization,
                  <span className="text-[#CE1DB7] ps-1">
                    we design shared foundations that allow different programs and products
                    to evolve independently,
                  </span>{" "}
                  while remaining structurally and visually aligned.
                </p>
              </div>

              {/* RIGHT IMAGES */}
              <div className="grid grid-cols-2 gap-4 p-4">

                {/* BIG IMAGE */}
                <div className="col-span-1 row-span-2 rounded-[12px] overflow-hidden bg-[#F2EAF8]">
                  <img
                    src="/assets/Image/education-images-2.png"
                    alt="Coaching software graphic"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* SMALL IMAGE 1 */}
                <div className="rounded-[12px] overflow-hidden bg-[#F8EAF2]">
                  <img
                    src="/assets/Image/education-images-1.png"
                    alt="Education ad graphic"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* SMALL IMAGE 2 */}
                <div className="rounded-[12px] overflow-hidden bg-[#F3EAF8]">
                  <img
                    src="/assets/Image/education-images.png"
                    alt="Online learning graphic"
                    className="h-full w-full object-cover"
                  />
                </div>

              </div>
            </div>

            {/* BOTTOM STRIP */}
            <div className="bg-[#F3F3F3] text-center py-6 rounded-b-[16px] mt-[-6px]">
              <p
                className="text-[20px] sm:text-[22px] text-[#0F0F3D]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                That's how scale stays sustainable.
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full px-3 pb-[54px] pt-3 sm:px-5 sm:pb-[80px] lg:pb-[90px]">
        <div className="mx-auto container-xl">
          <div className="flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8 text-center">
            <h2
              className=" text-[26px] sm:text-[32px] md:text-[36px] lg:text-[41px] font-normal leading-[1.15] tracking-[-0.02em] text-[#0F0F3D]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              Ready to scale your education business without losing clarity?
            </h2>

            <p className="mt-4 max-w-[470px] text-[15px] sm:text-[16px] leading-[1.6] text-[#0F0F3D]">
              Let's talk about structuring your education ecosystem for growth — without fragmentation.
            </p>

            <div className="mt-7 flex w-full max-w-[420px] flex-col items-center gap-3">
              <GoldButton href="/lets-talk#demo">
                Book an education strategy call
              </GoldButton>
              <GoldButton href="/lets-talk#ask">
                Ask about scaling your learning platform
              </GoldButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationELearningPage;
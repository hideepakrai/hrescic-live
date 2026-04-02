import React from "react";

const issueList = [
  "Fragmented brand trust",
  "Overlapping or competing digital presences",
  "Complex, inefficient user journeys",
  "SEO dilution across brands and products",
  "Strong medical authority not fully translated into digital growth",
];

const scaleList = [
  "A clear hierarchy of brands, products and services",
  "Digital journeys built around trust, not persuasion",
  "SEO structures that protect long-term authority",
  "Systems that allow expansion without fragmentation or dilution",
];

const caseCards = [
  {
    title: "Case - ",
    highlight: "Intro",
    text: "One example of scaling a multi-brand health ecosystem without losing trust or authority.",
    image: "/assets/Image/case-study-1.png",
    alt: "Case intro collage",
  },
  {
    title: "Case - ",
    highlight: "Highlight Headline",
    text: "Building a scalable medical & cosmetic ecosystem across three brands",
    image: "/assets/Image/case-study-2.png",
    alt: "Case highlight visual",
  },
  {
    title: "Case - ",
    highlight: "Summary",
    text: "As the Poliderma ecosystem expanded across clinical services, cosmetic dermatology and skincare products, structural weaknesses became visible. The challenge wasn't visibility, it was scaling traffic, conversions and product expansion without fragmenting trust or SEO equity.",
    image: "/assets/Image/case-study-3.png",
    alt: "Case summary visual",
  },
];

const AlertDot = () => (
  <span className="mt-[3px] flex h-[14px] w-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#DD9842] text-[10px] font-bold leading-none text-white">
    !
  </span>
);

const QuoteMark = () => (
  <span className="flex h-[28px] w-[30px] min-w-[30px] items-center justify-center rounded-[6px] bg-[#e7dfdb] text-[20px] font-semibold leading-none text-[#E0AB9C]">
    !
  </span>
);

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
}

const GoldButton = ({ children, href }: GoldButtonProps) => {
  const baseClass = "inline-block w-full sm:w-fit rounded-full bg-[#DD9842] px-5 sm:px-7 py-[13px] sm:py-[14px] text-center text-[14px] sm:text-[15px] font-medium leading-[1.35] text-white transition duration-300 hover:bg-[#c9852d] hover:shadow-[0_12px_24px_rgba(213,148,59,0.24)]";

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

const HealthPharmaPages = () => {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* HERO SECTION */}
      {/* <section className="w-full px-3 py-3 sm:px-5 sm:py-5">
        <div className="mx-auto container-xl">
          <div className="grid overflow-hidden rounded-[18px] bg-[#ecebea] lg:grid-cols-[0.98fr_1.02fr]">
            <div className="flex items-center order-2 lg:order-1">
              <div className="w-full px-4 py-7 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:pb-[74px] lg:ps-[60px] lg:pe-8">
                <div className="mb-7 flex flex-wrap items-center gap-2 sm:gap-3 text-[13px] text-[#666666] sm:mb-10 lg:mb-14">
                  <span className="text-[14px] sm:text-[15px] font-semibold text-[#444444]">
                    Who We Create For
                  </span>
                  <span className="text-[#9b9b9b]">|</span>
                  <span className="text-[13px] italic text-[#666666]">
                    Health, Pharma &amp; Beauty
                  </span>
                </div>

                <div>
                  <h1
                    className="max-w-[500px] text-[28px] sm:text-[34px] md:text-[40px] lg:text-[38px] font-[400] leading-[1.08] tracking-[-0.03em] text-[#555555]"
                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                  >
                    Health, pharma &amp; beauty brands don't grow on attention.
                    They grow on trust.
                  </h1>

                  <p className="mt-5 sm:mt-6 lg:mt-7 max-w-[430px] text-[15px] sm:text-[16px] leading-[1.75] text-[#666666]">
                    We help health, pharma and beauty businesses scale complex
                    ecosystems — without losing credibility, clinical authority
                    or SEO equity.
                  </p>

                  <div className="mt-7 sm:mt-8 lg:mt-9 flex flex-col gap-3">
                    <GoldButton href="/lets-talk#ask">
                      Talk about scaling without losing trust
                    </GoldButton>

                    <GoldButton href="/lets-talk#demo">
                      See how medical brands grow with us
                    </GoldButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 p-[2px]">
              <div className="relative h-[260px] overflow-hidden sm:h-[340px] md:h-[430px] lg:h-full lg:min-h-[552px]">
                <img
                  src="/assets/hero/health-pharma-img.png"
                  alt="Health pharma beauty product"
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </section> */}



      {/* HERO SECTION */}
      <section className="w-full px-3 py-3 sm:px-5 sm:py-5">
        <div className="mx-auto container-xl">
          <div className="grid overflow-hidden rounded-[18px] bg-[#ecebea] lg:grid-cols-[0.98fr_1.02fr]">
            <div className="flex items-center order-2 lg:order-1">
              <div className="w-full px-4 py-7 sm:px-8 sm:py-10 md:px-10 md:py-7 lg:pb-[74px] lg:ps-[75px] lg:pe-8">
                <div className="mb-7 flex flex-wrap items-center gap-2 sm:gap-3 text-[13px] text-[#666666] sm:mb-10 lg:mb-12">
                  <span className="text-[14px] sm:text-[20px] font-semibold text-[#555555]">
                    Who We Create For
                  </span>
                  <span className="text-[#9b9b9b]">|</span>
                  <span className="text-[13px] italic text-[#555555]">
                    Health, Pharma & Beauty
                  </span>
                </div>

                <div className="pt-8">
                  <h1
                    className="pe-4  text-[28px] sm:text-[34px] md:text-[40px] lg:text-[38px] font-[400] leading-[1.08] tracking-[-0.03em] text-[#555555]">
                    Health, pharma & beauty brands don't grow on attention. They grow on trust.
                  </h1>
                  <p className="mt-5 sm:mt-6 lg:mt-4 max-w-[430px] text-[15px] sm:text-[17px] leading-[1.75] text-[#555555]">
                    We help health, pharma and beauty businesses scale complex ecosystems — without losing credibility, clinical authority or SEO equity.
                  </p>

                  <div className="mt-4 sm:mt-8 lg:mt-6 flex flex-col gap-3">
                    <GoldButton href="/lets-talk#ask">
                      Talk about scaling without losing trust
                    </GoldButton>

                    <GoldButton href="/lets-talk#demo">
                      See how medical brands grow with us
                    </GoldButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 p-[2px]">
              <div className="relative h-[260px] overflow-hidden sm:h-[340px] md:h-[430px] lg:h-full lg:min-h-[552px]">
                <img
                  src="/assets/hero/health-pharma-img.png"
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
            <div className="mx-auto max-w-[700px] text-center">
              <h2
                className="text-[26px] sm:text-[31px] md:text-[38px] lg:text-[40px] font-normal leading-[1.2] tracking-[-0.02em] text-[#6b5a53]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                The reality of health, pharma &amp; beauty brands
              </h2>

              <p className="mx-auto mt-3 max-w-[340px] text-[14px] sm:text-[15px] leading-[1.55] text-[#786d68]">
                As health and beauty ecosystems grow, complexity increases,
                fast.
              </p>
            </div>

            <div className="mt-10 sm:mt-[60px] grid gap-y-10 lg:grid-cols-[1fr_1.14fr] lg:gap-x-[70px] xl:gap-x-[110px]">
              <div className="max-w-[390px]">
                <h3 className="text-[16px] sm:text-[17px] font-semibold leading-[1.3] text-[#4d4541]">
                  Why it happens?
                </h3>

                <p
                  className="mt-4 sm:mt-5 text-[22px] sm:text-[26px] md:text-[26px] font-normal leading-[1.28] tracking-[-0.015em] text-[#6e5f58]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  What starts as a single clinic, product or service often
                  expands into multiple brands, platforms and offerings,
                  competing for attention instead of reinforcing one another.
                </p>
              </div>

              <div className="max-w-[520px]">
                <h3 className="text-[16px] sm:text-[17px] font-semibold leading-[1.3] text-[#4d4541]">
                  What this creates?
                </h3>

                <div className="mt-4 sm:mt-5 space-y-[14px]">
                  {issueList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertDot />
                      <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#756963]">
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
          <div className="overflow-hidden rounded-[14px] bg-[#EDE8E6]">
            <div className="grid border-b border-[#e2dbd7] bg-[#F5F1EF] lg:grid-cols-[1.02fr_0.98fr]">
              <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:ps-[86px] lg:pe-[24px] lg:pb-[56px] lg:pt-[34px]">
                <h3 className="text-[14px] sm:text-[22px] font-semibold text-[#d28d34]">
                  What actually drives growth in health &amp; beauty
                </h3>

                <p
                  className="mt-8 sm:mt-10 md:mt-14 lg:mt-[72px] text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.35] tracking-[-0.015em] text-[#6f5e57]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  Growth in regulated, trust-based industries doesn't come from
                  campaigns. It comes from structural clarity across the entire
                  ecosystem - clinical, commercial and digital.
                </p>
              </div>

              <div className="flex items-center justify-center px-5 py-7 sm:px-8 sm:py-8 md:px-10 lg:px-[46px]">
                <img
                  src="/assets/Image/ecosystem-img.png"
                  alt="Health beauty digital ecosystem examples"
                  className="w-full max-w-[410px] object-contain"
                />
              </div>
            </div>

            <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-[86px] lg:pb-[50px] lg:pt-[60px]">
              <h3
                className="text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.3] tracking-[-0.015em] text-[#75645d]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                Health, pharma and beauty brands scale when they have:
              </h3>

              <div className="mt-6 sm:mt-7 space-y-[14px]">
                {scaleList.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertDot />
                    <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#756963]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 sm:mt-12 lg:mt-[48px] flex items-start gap-3 sm:gap-4">
                <QuoteMark />
                <p
                  className="text-[20px] sm:text-[22px] font-normal leading-[1.35] tracking-[-0.015em] text-[#74625b]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  That's what we build, by treating growth as ecosystem
                  architecture, not marketing execution.
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
              className="text-[26px] sm:text-[31px] md:text-[36px] lg:text-[40px] font-normal leading-[1.18] tracking-[-0.02em] text-[#6d5b55]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              How this works in real medical &amp; cosmetic ecosystems
            </h2>
            <p className="mt-2 text-[15px] sm:text-[16px] font-semibold text-[#655852]">
              (Poliderma &amp; My Skin - Case Study):
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {caseCards.map((card, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[16px] bg-[#ece9e7]"
              >
                <div className="h-[210px] sm:h-[220px] w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-4 sm:px-[18px] pb-5 sm:pb-[26px] pt-4 sm:pt-[16px]">
                  <h3 className="border-b border-[#dfd8d4] pb-3 text-[16px] sm:text-[17px] font-semibold text-[#5e524d]">
                    {card.title}
                    <span className="text-[#d5943b]">{card.highlight}</span>
                  </h3>

                  <p className="pt-4 text-[14px] sm:text-[15px] leading-[1.65] text-[#655a55]">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <GoldButton href="/who-we-create-for/poliderma">
              See how trust-driven ecosystems scale
            </GoldButton>
          </div>
        </div>
      </section>

      {/* STRUCTURE BEATS CAMPAIGNS */}
      <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14">
        <div className="mx-auto container-xl">
          <div className="mx-auto max-w-[760px] text-left lg:ml-[108px]">
            <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#544b47]">
              Why structure beats campaigns in health &amp; beauty?
            </h3>

            <p
              className="mt-3 max-w-[620px] text-[22px] sm:text-[26px] md:text-[28px] font-normal leading-[1.33] tracking-[-0.015em] text-[#6f5e58]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              In health-related industries, trust compounds slowly, and breaks
              quickly.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-[1228px] lg:px-[108px]">
            <div className="overflow-hidden rounded-[16px] bg-[#ece9e7] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-[25px]">
                <p
                  className=" text-center text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.38] tracking-[-0.015em] text-[#73635b]"
                  style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                >
                  Instead of running isolated campaigns,{" "}
                  <span className="text-[#d5943b]">
                    we design ecosystems where medical authority, content, UX
                    and performance reinforce one another,
                  </span>{" "}
                  allowing growth without compromising credibility.
                </p>
              </div>

              <div className="h-full min-h-[220px] sm:min-h-[260px]">
                <img
                  src="/assets/Image/medical-beauty-img.png"
                  alt="Medical beauty ecosystem structure"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full px-3 pb-[54px] pt-3 sm:px-5 sm:pb-[80px] lg:pb-[90px]">
        <div className="mx-auto container-xl">
          <div className="flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-6 text-center">
            <h2
              className="max-w-2xl text-[26px] sm:text-[32px] md:text-[36px] lg:text-[41px] font-normal leading-[1.15] tracking-[-0.02em] text-[#6e5c56]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              Ready to scale your health or beauty ecosystem without losing
              authority?
            </h2>

            <p className="mt-4 max-w-[470px] text-[15px] sm:text-[16px] leading-[1.6] text-[#655852]">
              Let's talk about structuring growth in regulated, trust-based
              industries.
            </p>

            <div className="mt-7 flex w-full max-w-[420px] flex-col items-center gap-3">
              <GoldButton href="/lets-talk#demo">
                Book a health strategy call
              </GoldButton>
              <GoldButton href="/lets-talk#ask">
                Ask about ecosystem architecture
              </GoldButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthPharmaPages;
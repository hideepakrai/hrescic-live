import React from "react";

const challengeList = [
    "Strong product quality, but no brand",
    "No differentiation in a crowded market",
    "No story customers could connect to",
    "No pricing power",
    "No system for growth",
];

const goalCards = [
    {
        title: "Creating a Brand Identity",
        text: "Castania's brand identity is developed around authentic origin, a subtle premium visual language, and a system that supports long-term growth without compromising trust or recognizability.",
        image: "/assets/Image/castania-business-img.png",
        alt: "Creating a brand identity",
    },
    {
        title: "Building a Story",
        text: "Castania connects real origin, nature, and trust. Each type of honey is tied to a specific apiary location, creating an authentic link between the product and the customer.",
        image: "/assets/Image/castania-business-img1.png",
        alt: "Building a story",
    },
    {
        title: "Package Design & Photography",
        text: "Packaging and photography are designed as sales tools. A clean visual language, natural tones, and a strong focus on the product increase perceived value and position it as a recognizable display and gift item.",
        image: "/assets/Image/castania-business-img2.png",
        alt: "Package design and photography",
    },
    {
        title: "Developing a Growth System",
        text: "Brand growth is built on a system, not on campaigns. A consistent identity, modular product range, and clearly defined origin enable long-term expansion without loss of recognition.",
        image: "/assets/Image/castania-business-img3.png",
        alt: "Developing a growth system",
    },
];

const strategicBullets = [
    "Who the brand is for?",
    "What makes it meaningfully different?",
    "Why it deserves a premium position?",
];

const roleCards = [
    {
        title: "Brand Strategy & Naming",
        text: "We created the brand name, positioning, and narrative, transforming a raw product into a brand with meaning, personality, and purpose.",
        image: "/assets/Image/castania-brand-img3.svg",
        icon: "brand",
    },
    {
        title: "Visual Identity & Packaging System",
        text: "A complete visual identity and modular packaging system designed to support a growing product portfolio while maintaining consistency and recognition.",
        image: "/assets/Image/castania-brand-img.svg",
        icon: "visual",
    },
    {
        title: "Web & E-commerce",
        text: "A brand platform and webshop that communicate quality, origin, and trust, and convert interest into direct-to-consumer sales.",
        image: "/assets/Image/castania-brand-img1.svg",
        icon: "web",
    },
    {
        title: "Retail & POS Materials",
        text: "In-store and point-of-sale materials designed to stand out on the shelf and support premium pricing without discounts or explanation.",
        image: "/assets/Image/castania-brand-img2.svg",
        icon: "retail",
    },
];

const resultsGallery = {
    topLeft: "/assets/Image/partner-model-img1.png",
    centerTall: "/assets/Image/partner-model-img2.png",
    topRight: "/assets/Image/partner-model-img3.png",
    statJar: "/assets/Image/partner-model-img9.png",
    midRight: "/assets/Image/partner-model-img4.png",

    bottomCenterSmall: "/assets/Image/partner-model-img6.png",
    bottomCenterWide: "/assets/Image/partner-model-img7.png",
    bottomRight: "/assets/Image/partner-model-img8.png",
    bottomLeft: "/assets/Image/partner-model-img5.png",
};

const AlertDot = () => (
    <span className="mt-[3px] flex h-[21px] w-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#5FC5D0] text-[13px] font-bold leading-none text-white">
        !
    </span>
);

const QuoteMark = () => (
    <span className="flex h-[33px] w-[35px] min-w-[30px] items-center justify-center rounded-[6px] bg-[#ECECEC] text-[20px] font-semibold leading-none text-[#5FC5D0]">
        !
    </span>
);

const StrategicBulletIcon = () => (
    <span className="mt-[2px] flex h-[40px] w-[40px] min-w-[30px] items-center justify-center rounded-[4px] bg-[#EEEEEE]">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            className="h-[28px] w-[28px]"
        >
            <path
                d="M6 10H14"
                stroke="#5FC5D0"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M11 7L14 10L11 13"
                stroke="#5FC5D0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

const ServiceIcon = ({ type }: { type: string }) => {
    if (type === "brand") {
        return (
            <svg viewBox="0 0 64 64" fill="none" className="h-9 w-9">
                <path
                    d="M14 18H32V50H14V18Z"
                    stroke="#00353A"
                    strokeWidth="2.5"
                />
                <path
                    d="M38 14H50V50H38V14Z"
                    stroke="#00353A"
                    strokeWidth="2.5"
                />
                <path
                    d="M20 24H26"
                    stroke="#05C4D9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <path
                    d="M20 31H26"
                    stroke="#05C4D9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <path
                    d="M20 38H26"
                    stroke="#05C4D9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <path
                    d="M42 24H46"
                    stroke="#05C4D9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <path
                    d="M42 31H46"
                    stroke="#05C4D9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (type === "visual") {
        return (
            <svg viewBox="0 0 64 64" fill="none" className="h-9 w-9">
                <path
                    d="M16 42L32 18L48 42"
                    stroke="#00353A"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
                <path d="M12 46H52" stroke="#00353A" strokeWidth="2.5" />
                <path
                    d="M22 33L32 26L42 33"
                    stroke="#05C4D9"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (type === "web") {
        return (
            <svg viewBox="0 0 64 64" fill="none" className="h-9 w-9">
                <rect x="14" y="14" width="36" height="24" rx="3" stroke="#00353A" strokeWidth="2.5" />
                <path d="M14 22H50" stroke="#05C4D9" strokeWidth="2.5" />
                <path d="M22 48H42" stroke="#00353A" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M28 38V48" stroke="#00353A" strokeWidth="2.5" />
                <path d="M36 38V48" stroke="#00353A" strokeWidth="2.5" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 64 64" fill="none" className="h-9 w-9">
            <rect x="14" y="16" width="36" height="22" rx="3" stroke="#00353A" strokeWidth="2.5" />
            <path d="M20 24H40" stroke="#05C4D9" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 31H34" stroke="#00353A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 46H46" stroke="#00353A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
};

export default function Castania() {
    const PillButton = ({ children }: { children: React.ReactNode }) => (
        <button
            type="button"
            className="w-fit rounded-full bg-[#000000] px-5 sm:px-6 py-[12px] sm:py-[13px] text-[13px] sm:text-[15px] font-medium leading-none text-white transition duration-300 hover:translate-y-[-1px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
        >
            {children}
        </button>
    );

    return (
        <div className="w-full">

            <section className="w-full px-3 pt-3 sm:px-5 sm:pt-5">
                <div className="mx-auto container-xl">
                    <section className="overflow-hidden rounded-[18px] bg-[#EEEEEE] shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:rounded-[22px]">
                        <div className="grid lg:grid-cols-[1fr_1fr]">
                            <div className="flex min-h-[360px] flex-col px-5 py-5 sm:px-8 sm:py-7 lg:min-h-[500px] lg:px-16 lg:py-6">
                                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7d7772]">
                                    {/* <div className="w-[34px] sm:w-[38px]">
                    <ArchLogo className="h-auto w-full" lineClass="stroke-[#2b2622]" />
                    </div> */}
                                    <span className="text-[22px] font-semibold text-[#555555]">
                                        Case Study
                                    </span>
                                    <span className="h-3 w-px bg-[#bcb5af]" />
                                    <span className="text-[14px] text-[#555555] italic">
                                       Boutique Brands
                                    </span>
                                </div>

                                <div className="my-auto pt-10 sm:pt-20 lg:pl-0">


                                    <h1
                                        className="hero-title text-[30px] sm:text-[38px] md:text-[40px] lg:text-[38px] font-normal leading-[1.08] tracking-normal text-[#555555]"

                                    >
                                        <span className="text-[#8DA117]" style={{ fontSize: "36px" }}>
                                           From Commodity to Premium:
                                        </span>
                                        <br />
                                       Building Castania into a Scalable Boutique Brand

                                    </h1>

                                    <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[#555555] font-normal ">
                                    We created the brand name, positioning, and narrative, transforming a raw product into a brand with meaning, personality, and purpose.


                                    </p>

                                    <div className="mt-8 flex max-w-[470px] flex-wrap gap-3 mb-8">
                                        <PillButton>The Challenge</PillButton>
                                        <PillButton>The Goals of Collaboration</PillButton>
                                        <PillButton>Our Strategic Role</PillButton>
                                        <PillButton>The Results</PillButton>
                                    </div>
                                </div>
                            </div>

                            <div className="relative min-h-[280px] lg:min-h-[500px]">
                                <div className="relative h-[300px] sm:h-[420px] md:h-[520px] lg:h-full lg:min-h-[488px]">
                                    <img
                                           src="/assets/Image/castania-hero-img.png"
                                        alt="MyRent case study"
                                        className="h-full w-full object-cover object-center"
                                    />

                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,60,66,0.08)_0%,rgba(0,60,66,0)_24%,rgba(0,0,0,0.03)_100%)]" />

                                    <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                                        <a href="/who-we-create-for/castania">
                                            <button
                                                type="button"
                                                className="flex items-baseline gap-3 rounded-full bg-[#8DA117] px-5 sm:px-6 py-2 sm:py-3 text-[14px] sm:text-[15px] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:translate-y-[-1px]"
                                            >
                                                Read the Case Study
                                                <span className="text-[20px] leading-none">→</span>
                                            </button>
                                        </a>
                                    </div>
                                </div>              </div>
                        </div>
                    </section>
                </div>
            </section>




            {/* INTRO */}
            <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:pb-10">
                <div className="mx-auto container-xl rounded-[2px]">
                    <div className="px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-[120px] lg:py-[90px]">
                        <div className="mx-auto text-center md:max-w-[65%]">
                            <h2
                                className="text-[26px] sm:text-[31px] md:text-[38px] lg:text-[40px] font-normal leading-[1.2] tracking-[-0.02em] text-[#555555]"
                                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                            >
                                Castania was built from zero to a premium honey brand.
                            </h2>

                            <p className="mx-auto mt-6 text-[14px] sm:text-[18px] leading-[1.55] text-[#555555]">
                                What began as a small producer evolved into a scalable,
                                recognizable, and commercially strong business through strategic
                                positioning, storytelling, packaging, and a complete sales
                                ecosystem. This was not a packaging refresh or a visual exercise
                                — it was the deliberate creation of a brand, and the foundation
                                of a sustainable business.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHALLENGE */}
            <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:pb-10">
                <div className="mx-auto container-xl">
                    <div className="overflow-hidden rounded-[14px] bg-[#F8F8F8]">
                        <div className="grid border-b border-[#e2dbd7] bg-[#6B5D39] lg:grid-cols-[1.02fr_0.98fr]"
                            style={{ backgroundImage: "url('/assets/Image/castania-banner.png')" }}
                        >
                            <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:ps-[86px] lg:pe-[0px] lg:pb-[56px] lg:pt-[34px]">
                                <h3 className="text-[14px] sm:text-[22px] font-semibold text-[#fff]">
                                    The Challenge
                                </h3>

                                <p
                                    className="mt-8 sm:mt-10 md:mt-14 lg:mt-[72px] text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.35] tracking-[-0.015em] text-[#fff]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    Castania started with an excellent product: high-quality honey
                                    and natural derivatives. What it lacked was everything else
                                    required to compete beyond the local, low-margin market.
                                </p>
                            </div>

                            {/* <div className="flex items-center justify-center px-5 py-7 sm:px-8 sm:py-8 md:px-10 lg:px-[46px]">
                <img
                  src="/assets/Image/castania-banner.png"
                  alt="Castania challenge visual"
                  className="w-full max-w-[410px] object-contain"
                />
              </div> */}
                        </div>

                        <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-[86px] lg:pb-[50px] lg:pt-[60px]">
                            <h3
                                className="text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.3] tracking-[-0.015em] text-[#000000]"
                                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                            >
                                Like many small producers, Castania was trapped in a commodity
                                position:
                            </h3>

                            <div className="mt-6 sm:mt-7 space-y-[14px]">
                                {challengeList.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <AlertDot />
                                        <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#555555]">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-9 sm:mt-12 lg:mt-[48px] flex items-start gap-3 sm:gap-4">
                                <QuoteMark />
                                <p
                                    className="text-[20px] sm:text-[22px] font-normal leading-[1.35] tracking-[-0.015em] text-[#555555]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    Without a clear identity, positioning, packaging, or sales
                                    strategy, scaling beyond local sales or basic distribution was
                                    impossible.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GOALS */}
            <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14">
                <div className="mx-auto container-xl">
                    <div className="text-center">
                        <h2
                            className="text-[26px] sm:text-[31px] md:text-[36px] lg:text-[40px] font-normal leading-[1.18] tracking-[-0.02em] text-[#555555]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            The Goals of the Collaboration
                        </h2>

                        <p className="mt-2 text-[15px] sm:text-[16px] font-normal text-[#555555]">
                            The objective was not simply to sell honey. It was to build a
                            sustainable, scalable business.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
                        {goalCards.map((card, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-[16px] bg-[#000000] h-full"
                            >
                                <div className="h-[210px] sm:h-[220px] w-full overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.alt}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="px-4 sm:px-[24px] pb-5 sm:pb-[20px] pt-4 sm:pt-[16px]">
                                    <h3 className="border-b border-[#404040] pb-4 text-[16px] sm:text-[17px] font-semibold text-[#fff]">
                                        {card.title}
                                    </h3>

                                    <p className="pt-4 text-[14px] sm:text-[14px] leading-[1.7] text-[#fff]">
                                        {card.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR STRATEGIC ROLE */}
            <section className="w-full px-7 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14">
                <div className="mx-auto md:max-w-[70%]">
                    <div className="mx-auto">
                        <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#555555]">
                            Our Strategic Role
                        </h3>

                        <p
                            className="mt-3 text-[20px] sm:text-[24px] font-normal leading-[1.34] tracking-[-0.015em] text-[#555555]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            We designed Castania from the ground up as a complete brand
                            system. Before any visuals, packaging, or marketing execution, we
                            defined the fundamentals:
                        </p>

                        <div className="mt-6 space-y-3">
                            {strategicBullets.map((item, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <StrategicBulletIcon />
                                    <p className="text-[14px] sm:text-[15px] leading-[1.55] text-[#6A6A6A]">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p
                            className="mt-7 text-[16px] sm:text-[18px] leading-[1.65] text-[#6A6A6A]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            Every decision that followed, from naming to packaging to
                            e-commerce, was built to reinforce the same story, values, and
                            market position. What We Delivered:
                        </p>
                    </div>

                    <div className="mt-8 grid gap-3 md:grid-cols-4 xl:grid-cols-4">
                        {roleCards.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-[14px] bg-[#F3F3F3] p-4 sm:p-5"
                            >
                                <div className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-[10px] ">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ServiceIcon type={item.icon} />
                                    )}
                                </div>

                                <h4 className="mt-4 text-[16px] sm:text-[17px] font-semibold leading-[1.3] text-[#2C2C2C]">
                                    {item.title}
                                </h4>

                                <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.65] text-[#666666]">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 rounded-[14px] bg-[#F3F3F3] p-4 sm:p-5">
                        <div className="grid gap-4 md:grid-cols-[320px_1fr] md:items-center">
                            <div className="flex items-center gap-3">
                                <div className="h-[70px] w-[80px] overflow-hidden rounded-[10px] ">
                                    <img
                                        src="/assets/Image/castania-brand-img1.svg"
                                        alt="Marketing and communication framework"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div>
                                    <h4 className="text-[16px] font-semibold leading-[1.3] text-[#2C2C2C]">
                                        Marketing &amp; Communication Framework
                                    </h4>
                                </div>
                            </div>

                            <p className="text-[13px] sm:text-[14px] leading-[1.65] text-[#666666]">
                                A clear tone of voice, storytelling framework, and messaging
                                system used across all channels, ensuring the brand always
                                speaks with one voice.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-3 pb-10 pt-2 sm:px-5 sm:pb-14 lg:pt-16 lg:pb-28">
                <div className="mx-auto container-xl max-w-[1240px]">
                    <div className="text-center">
                        <h2
                            className="text-[28px] sm:text-[34px] md:text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-[#5A5A5A]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            Partnership Model &amp; Results
                        </h2>

                        <p className="mx-auto mt-3 max-w-[620px] text-[14px] sm:text-[15px] leading-[1.65] text-[#8A8A8A]">
                            Instead of competing on price, Castania competes on meaning, quality,
                            and trust.
                        </p>
                    </div>

                    {/* DESKTOP */}
                    <div
                        className="mt-8 hidden md:grid gap-3"
                        style={{
                            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                            gridTemplateRows: "repeat(4, 112px)",
                        }}
                    >
                        {/* 1 - top left */}
                        <div className="col-span-4 row-span-2 overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.topLeft}
                                alt="Castania result visual 1"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* 2 - center tall */}
                        <div className="col-span-4 row-span-3 overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.centerTall}
                                alt="Castania result visual 2"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* 3 - top right */}
                        <div className="col-span-4 row-span-1 overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.topRight}
                                alt="Castania result visual 3"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* 4 - mid right */}
                        <div className="col-span-4 row-span-1 overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.midRight}
                                alt="Castania result visual 4"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* 5 - bottom left */}
                        <div className="col-span-4 row-span-2 overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.statJar}
                                alt="Castania jar product"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* stat */}
                        <div className="col-span-2 row-span-1 rounded-[16px]  px-5 py-4 flex flex-col justify-center">
                            <h3
                                className="text-[48px] font-normal leading-[0.95] text-[#8DA117]"
                                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                            >
                                +60%
                            </h3>
                            <p className="mt-0 max-w-[150px] text-[11px] leading-[1.5] text-[#777777]">
                                After rebrand, company achieves steady annual growth of over 60%.
                            </p>
                        </div>

                        {/* jar */}
                        <div className="col-span-2 row-span-1 overflow-hidden rounded-[16px] bg-[#F2F2F2]">


                            <img
                                src={resultsGallery.bottomLeft}
                                alt="Castania result visual 5"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* bottom small bottle */}
                        <div className="col-span-2 row-span-1 overflow-hidden rounded-[16px] bg-[#F2F2F2]">


                            <img
                                src={resultsGallery.bottomRight}
                                alt="Castania result visual 8"
                                className="h-full w-full object-fill"
                            />
                        </div>

                        {/* laptop wide */}
                        <div className="col-span-4 row-span-1 overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.bottomCenterWide}
                                alt="Castania result visual 7"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* phones */}
                        <div className="col-span-2 row-span-1 overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.bottomCenterSmall}
                                alt="Castania result visual 6"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* MOBILE */}
                    <div className="mt-8 grid gap-3 md:hidden">
                        <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.topLeft}
                                alt="Castania mobile gallery 1"
                                className="h-[220px] w-full object-cover"
                            />
                        </div>

                        <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.centerTall}
                                alt="Castania mobile gallery 2"
                                className="h-[320px] w-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                                <img
                                    src={resultsGallery.topRight}
                                    alt="Castania mobile gallery 3"
                                    className="h-[140px] w-full object-cover"
                                />
                            </div>

                            <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                                <img
                                    src={resultsGallery.midRight}
                                    alt="Castania mobile gallery 4"
                                    className="h-[140px] w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-[1fr_110px] gap-3">
                            <div className="rounded-[16px] bg-[#F5F3EA] px-5 py-5 flex flex-col justify-center">
                                <h3
                                    className="text-[42px] font-normal leading-[0.95] text-[#8DA117]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    +60%
                                </h3>
                                <p className="mt-3 max-w-[180px] text-[12px] leading-[1.5] text-[#777777]">
                                    After rebrand, company achieves steady annual growth of over 60%.
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                                <img
                                    src={resultsGallery.statJar}
                                    alt="Castania mobile gallery 5"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.bottomLeft}
                                alt="Castania mobile gallery 6"
                                className="h-[220px] w-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-[110px_1fr] gap-3">
                            <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                                <img
                                    src={resultsGallery.bottomCenterSmall}
                                    alt="Castania mobile gallery 7"
                                    className="h-[120px] w-full object-cover"
                                />
                            </div>

                            <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                                <img
                                    src={resultsGallery.bottomCenterWide}
                                    alt="Castania mobile gallery 8"
                                    className="h-[120px] w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                            <img
                                src={resultsGallery.bottomRight}
                                alt="Castania mobile gallery 9"
                                className="h-[180px] w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* FINAL CTA */}
            <section className="w-full px-3 pb-[54px] pt-6 sm:px-5 sm:pb-[80px] lg:pb-[90px]">
                <div className="mx-auto container-xl">
                    <div className="flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8 text-center">
                        <h2
                            className=" text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-[#555555]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            Marketing Excellence That Works On Your Terms
                        </h2>

                        <p className="mt-4 max-w-2xl text-[15px] sm:text-[16px] leading-[1.6] text-[#555555]">
                            Because great marketing doesn't stop — it evolves. Whether you need a website that books guests, a video that tells your story, or a full creative system that scales with you — we're here to help your brand stay relevant, consistent and alive.
                        </p>

                        <div className="mt-7 flex w-full max-w-[420px] flex-col items-center gap-3">
                            <a href="/lets-talk#ask" className="w-full sm:w-fit">

                                <button className="btn-primary w-full">Let's Talk</button>
                            </a>
                            {/* <a href="/lets-talk#ask" className="w-full sm:w-fit">
                                <button className="btn-primary w-full bg-transparent !text-[#555555] border border-[#555555] hover:bg-[#555555] hover:text-white transition-all">Ask a question</button>
                            </a> */}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
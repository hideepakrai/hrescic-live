import React from "react";

const issueList = [
    "Heavy OTA dependency",
    "Price-based competition",
    "Low brand recall",
    "Missed direct revenue opportunities",

];

const scaleList = [
    "A highly complex and fragile SEO system, with over 2,000 URLs on Poliderma alone",
    "Multiple brands competing for attention instead of reinforcing one another",
    "Long, inefficient user journeys across platforms",
    "Strong medical authority that was not fully translated into scalable digital growth",

];

const resultsGallery = {
  topLeft: "/assets/Image/polyderma-brand-img6.png",
  centerTall: "/assets/Image/polyderma-brand-img5.png",
  topRight: "/assets/Image/polyderma-brand-img3.png",
   statJar: "/assets/Image/our-approach-img.png",
  midRight: "/assets/Image/polyderma-brand-img-4.png",

  bottomCenterSmall: "/assets/Image/our-approach-img2.png",
  bottomCenterWide: "/assets/Image/polyderma-brand-img.png",
  bottomRight: "/assets/Image/our-approach-img1.png",
   bottomLeft: "/assets/Image/our-approach-delivery.png",
};




const strategicRoles = [
    {
        icon: "ux",
        title: "UX Design",
        text: "Designing the complete user journey and UX logic",
    },
    {
        icon: "service",
        title: "Service Structure",
        text: "Structuring the offer and defining relationships between services",
    },
    {
        icon: "seo",
        title: "SEO Optimisation",
        text: "SEO architecture and optimization for a complex, multi-service platform",
    },
    {
        icon: "content",
        title: "Content Strategy",
        text: "Content strategy centered on understanding, trust, and conversion",
    },
];


const StrategicRoleIcon = ({ type }: { type: string }) => {
    if (type === "ux") {
        return (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_39_237)">
                    <rect x="27.1001" y="24.7998" width="11.7" height="4.6" fill="#05C4D9" />
                    <rect x="27.1001" y="1.19971" width="11.7" height="4.6" fill="#05C4D9" />
                    <rect x="1.19971" y="1.19971" width="21.2" height="4.6" fill="#05C4D9" />
                    <path d="M22.3527 1.17627H1.17627V38.8233H22.3527V1.17627Z" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M22 1H1V6H22V1Z" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M38.8233 1.17627H27.0586V19.9998H38.8233V1.17627Z" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M38.8233 24.7056H27.0586V38.8232H38.8233V24.7056Z" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M27.0586 29.4116H38.8233" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M27.0586 5.88232H38.8233" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M30.5884 10.5884H35.2943" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M30.5884 15.2944H35.2943" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M31.7651 34.1177H34.1181" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M4.70557 11.7651H18.8232" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M4.70557 16.4707H18.8232" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M17.6472 28.2349H10.5884V34.1172H17.6472V28.2349Z" fill="#05C4D9" stroke="#003C42" stroke-width="2.27273" stroke-miterlimit="10" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_39_237">
                        <rect width="40" height="40" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        );
    }

    if (type === "service") {
        return (
            <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8463 14.1406L9.92188 16.875L20.0781 21.5625L30.2344 16.875L24.3099 14.1406" fill="#05C4D9" />
                <path d="M15.8463 14.1406L9.92188 16.875L20.0781 21.5625L30.2344 16.875L24.3099 14.1406" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M27.8906 38.75H12.2656" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M34.2188 28.5938V26.25" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M29.5312 28.5938V26.25" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M15.8463 8.67188L9.92188 11.4062L20.0781 16.0938L30.2344 11.4062L24.3099 8.67188" fill="#05C4D9" />
                <path d="M15.8463 8.67188L9.92188 11.4062L20.0781 16.0938L30.2344 11.4062L24.3099 8.67188" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M16.1719 33.2813H23.9844L25.5469 38.75H14.6094L16.1719 33.2813Z" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M20.0781 1.25L30.2344 5.9375L20.0781 10.625L9.92188 5.9375L20.0781 1.25Z" fill="#05C4D9" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M9.92187 5.9375H3.59375C2.29937 5.9375 1.25 6.9868 1.25 8.28125V30.9375C1.25 32.2319 2.29937 33.2812 3.59375 33.2812H36.5625C37.8569 33.2812 38.9062 32.2319 38.9062 30.9375V8.28125C38.9062 6.9868 37.8569 5.9375 36.5625 5.9375H30.2344" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M38.9062 26.25H1.25" stroke="#003C42" stroke-width="2.5" stroke-miterlimit="10" stroke-linejoin="round" />
            </svg>

        );
    }

    if (type === "seo") {
        return (
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_39_255)">
                    <path d="M37.6196 32.6694V42.7349H3.90479L24.6401 16.8296L37.6196 32.6694ZM20.0454 34.9771H29.1108L24.5776 29.2241L20.0454 34.9771Z" fill="#05C4D9" />
                    <path d="M1.28906 6.53125H5.15625" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M1.28906 11.6875H5.15625" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M1.28906 16.8438H5.15625" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M1.28906 22H5.15625" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M1.28906 27.1562H5.15625" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M1.28906 32.3125H5.15625" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M37.5547 42.7109H1.28906V1.28907H11.6875V32.957" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M11.6875 38.8438V42.7109" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M16.8438 38.8438V42.7109" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M22 38.8438V42.7109" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M27.1562 38.8438V42.7109" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M32.3125 38.8438V42.7109" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M3.86719 42.7109L24.5781 16.8438L37.5547 32.957" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M20.0449 34.9766L24.578 29.2245L29.1112 34.9766H20.0449Z" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M40.1328 10.479L37.5547 16.8438V42.7109H42.7109V16.8438L40.1328 10.479Z" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M37.5547 16.8438H42.7109" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                    <path d="M37.5547 37.5547H42.7109" stroke="#003C42" stroke-width="1.1" stroke-miterlimit="10" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_39_255">
                        <rect width="44" height="44" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        );
    }

    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_39_279)">
                <path d="M10.625 31.7188V38.8281H4.6875C2.74586 38.8281 1.17188 37.176 1.17188 35.2344C1.17188 33.2927 2.74586 31.7188 4.6875 31.7188H36.4844C37.7787 31.7188 38.8281 30.6695 38.8281 29.375V3.51563C38.8281 2.22118 37.7787 1.17188 36.4844 1.17188H29.375V5.85938" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M1.17188 35.2344V9.45313C1.17188 7.51149 2.74586 5.85938 4.6875 5.85938H36.4866C37.7798 5.85938 38.8281 4.81118 38.8281 3.51805V3.51563" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M34.1406 17.6562H5.85938V10.625H34.1406V17.6562Z" fill="#05C4D9" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M26.0605 27.0312H10.625C9.33062 27.0312 8.28125 25.982 8.28125 24.6875C8.28125 23.393 9.33062 22.3438 10.625 22.3438H26.0605C28.1827 22.3438 30.2181 23.1868 31.7188 24.6875C30.2181 26.1882 28.1827 27.0312 26.0605 27.0312Z" fill="#05C4D9" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M20 27.0312V22.3438" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M10.625 15.3125V17.6562" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M15.3125 15.3125V17.6562" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M20 15.3125V17.6562" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M24.6875 15.3125V17.6562" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
                <path d="M29.375 15.3125V17.6562" stroke="#003C42" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_39_279">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>

    );
};

const AlertDot = () => (
    <span className="mt-[3px] flex h-[21px] w-[21px] min-w-[14px] items-center justify-center rounded-full bg-[#DD9842] text-[14px] font-bold leading-none text-white">
        !
    </span>
);

const QuoteMark = () => (
    <span className="flex h-[33px] w-[35px] min-w-[30px] items-center justify-center rounded-[6px] bg-[#E0D4CF] text-[20px] font-semibold leading-none text-[#DD9842]">
        !
    </span>
);


const Poliderma = () => {
    const PillButton = ({ children }: { children: React.ReactNode }) => (
        <button
            type="button"
            className="w-fit rounded-full bg-orange px-5 sm:px-6 py-[12px] sm:py-[13px] text-[13px] sm:text-[15px] font-medium leading-none text-white transition duration-300 hover:translate-y-[-1px] hover:shadow-[0_10px_24px_rgba(73,224,0,0.22)]"
        >
            {children}
        </button>
    );

    const stats = [
        {
            value: "+85%",
            text: "website traffic within two months of launch",
        },
        {
            value: "+130%",
            text: "growth in comparison with pre-launch period",
        },
        {
            value: "100/100",
            text: "SEO score: 100 / 100, with long-term organic growth",
        },
        {
            value: "+78%",
            text: "content reduction while improving the user journey",
        },
    ];

    const CaseStudyPointIcon = () => (
        <span className="mt-[2px] flex h-[14px] w-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#DD9842]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                className="h-[16px] w-[16px] text-[#fff]"
            >
                <path
                    d="M6 10H14"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M11 7L14 10L11 13"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );


    const caseCards = [
        {
            title: "Surgical Website & Content Restructuring (Poliderma)",
            highlight: "Intro",
            text: "Poliderma required precision rather than disruption:",
            image: "/assets/Image/polyderma-brand-img.png",
            alt: "Case intro collage",
            bg: "bg-[#003C42]",
            points: [
                "Cleaning and restructuring 2,000+ pages",
                "Preserving high-ranking URLs and accumulated SEO equity",
                "Modernizing UX without impacting Google visibility or patient trust",
               
            ],
        },
        {
            title: "Strategic Brand & Content Build (Regenerative)",
            highlight: "Headline",
            text: "For the regenerative medicine vertical, we delivered:",
            image: "/assets/Image/polyderma-brand-img9.png",
            alt: "Case highlight visual",
            bg: "bg-[#003C42]",
            points: [
                "Full branding and positioning",
                "Clear separation from cosmetic dermatology, without breaking authority signals",
                "Educational, trust-driven content aligned with clinical credibility",
            ],
        },
        {
            title: "UX, Journey & Product Redesign (MySkin)",
            highlight: "Summary",
            text: "The MySkin webshop was rebuilt around conversion logic and trust:",
            image: "/assets/Image/polyderma-brand-img8.png",
            alt: "Case summary visual",
            bg: "bg-[#003C42]",
            points: [
                "Complete UX and user-journey redesign",
                "Dramatically shortened path from first visit to purchase",
                "Introduction of educational and reference-based content",
                "Product naming, packaging guidance, and portfolio structuring",

            ],
        },

         {
            title: "Marketing & Advertising Aligned With Strategy",
            highlight: "Summary",
            text: "All marketing activities were aligned with real operational capacity:",
            image: "/assets/Image/polyderma-brand-img7.png",
            alt: "Case summary visual",
            bg: "bg-[#003C42]",
            points: [
                "Paid campaigns designed for actual treatment availability",
                "Unified messaging across clinic, treatments, and products",
                "Continuous optimization across all three brands",
               

            ],
        },
    ];


    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="w-full px-3 py-3 sm:px-5 sm:py-5">
                <div className="mx-auto container-xl">
                    <div className="grid overflow-hidden rounded-[18px] bg-[#F5F1EF] lg:grid-cols-[0.95fr_1.05fr]">
                        {/* LEFT CONTENT */}
                        <div className="order-2 flex items-center lg:order-1">
                            <div className="w-full px-4 py-8 sm:px-8 sm:py-10 lg:ps-[40px] lg:py-[42px]">
                                <div className="mb-10 flex flex-wrap items-center gap-3 text-[#555555]">
                                    <span className="text-[15px] font-semibold">Case Study</span>
                                    <span className="text-[#DCCECA]">|</span>
                                    <span className="text-[13px] italic text-[#555555]/90">
                                        Tourism &amp; Travel
                                    </span>
                                </div>

                                <div>
                                    <h1
                                        className="text-[30px] sm:text-[38px] md:text-[40px] lg:text-[38px] font-normal leading-[1.08] tracking-normal text-[#685956]"
                                        style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                    >
                                        <span className="text-[#DD9842]">
                                           Building a scalable medical & cosmetic ecosystem across three brands,
                                        </span>
                                        <br />
                                        without fragmenting trust, traffic, or revenue
                                    </h1>

                                  

                                    <div className="mt-10 flex max-w-[470px] flex-wrap gap-3">
                                        <PillButton>The Challenge</PillButton>
                                        <PillButton>Our Approach & Delivery</PillButton>
                                        <PillButton>Our Strategic Role</PillButton>
                                        <PillButton>The Results</PillButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="order-1 lg:order-2">
                            <div className="relative h-[300px] sm:h-[420px] md:h-[520px] lg:h-full lg:min-h-[488px]">
                                <img
                                    src="/assets/Image/polyderma-hero-img.png"
                                    alt="MyRent case study"
                                    className="h-full w-full object-cover object-center"
                                />

                                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,60,66,0.08)_0%,rgba(0,60,66,0)_24%,rgba(0,0,0,0.03)_100%)]" />

                                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                                    <a href="/who-we-create-for/poliderma">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-3 rounded-full bg-orange px-5 sm:px-7 py-[13px] sm:py-[12px] text-[13px] sm:text-[15px] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:translate-y-[-1px]"
                                        >
                                            Read the Case Study
                                            <span className="text-[20px] leading-none">→</span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

  


            {/* REALITY SECTION */}
            <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:pb-10">
                <div className="mx-auto container-xl rounded-[2px]">
                    <div className="px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-[120px] lg:py-[68px]">
                        <div className="mx-auto  text-center md:max-w-[84%]">
                            <h2
                                className="text-[26px] sm:text-[31px] md:text-[38px] lg:text-[40px] font-normal leading-[1.2] tracking-[-0.02em] text-[#00353A]"
                                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                            >
                             This project was not about marketing execution.
                            </h2>

                            <p className="mx-auto mt-6  text-[14px] sm:text-[18px] leading-[1.55] text-[#555555]">
                               It was about building a coherent, scalable medical and cosmetic ecosystem, without losing trust, SEO equity, or clinical authority.
                            </p>
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
                                <h3 className="text-[14px] sm:text-[22px] font-semibold text-[#DD9842]">
                                  The Challenge
                                </h3>

                                <p
                                    className="mt-8 sm:mt-10 md:mt-14 lg:mt-[72px] text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.35] tracking-[-0.015em] text-[#685956]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                  As the ecosystem grew, structural weaknesses became visible. What initially appeared as a need for marketing support revealed a deeper challenge: rapid expansion without a shared strategic backbone.
                                </p>
                            </div>

                            <div className="flex items-center justify-center px-5 py-7 sm:px-8 sm:py-8 md:px-10 lg:px-[46px]">
                                <img
                                    src="/assets/Image/polyderma-about.png"
                                    alt="Health beauty digital ecosystem examples"
                                    className="w-full max-w-[410px] object-contain"
                                />
                            </div>
                        </div>

                        <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-[86px] lg:pb-[50px] lg:pt-[60px]">
                            <h3
                                className="text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.3] tracking-[-0.015em] text-[#685956]"
                                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                            >
                               Key issues included:
                            </h3>

                            <div className="mt-6 sm:mt-7 space-y-[14px]">
                                {scaleList.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <AlertDot />
                                        <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#685956]">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-9 sm:mt-12 lg:mt-[48px] flex items-start gap-3 sm:gap-4">
                                <QuoteMark />
                                <p
                                    className="text-[20px] sm:text-[22px] font-normal leading-[1.35] tracking-[-0.015em] text-[#00353A]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                 This was not three separate projects. The real task was to build one coherent brand ecosystem around a single medical authority, while simultaneously scaling traffic, conversions, and product and service expansion.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14">
                <div className="mx-auto container-xl">
                    <div className="text-center">
                        <h2
                            className="text-[26px] sm:text-[31px] md:text-[36px] lg:text-[40px] font-normal leading-[1.18] tracking-[-0.02em] text-[#685956]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                          Our approach and delivery
                        </h2>

                        <p className="mt-2 text-[15px] sm:text-[16px] font-normal text-[#685956]">
                         We treated the collaboration as ecosystem architecture, not campaign-based marketing.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {caseCards.map((card, index) => (
                            <div
                                key={index}
                                className={`overflow-hidden rounded-[16px] bg-[#F5F1EF] h-full`}
                            >
                                <div className="h-[210px] sm:h-[220px] w-full overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.alt}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="px-4 sm:px-[24px] pb-5 sm:pb-[20px] pt-4 sm:pt-[16px]">
                                    <h3 className="border-b border-[#1E6A70] pb-4 text-[16px] sm:text-[17px] font-semibold text-[#685956]">
                                        {card.title}
                                    </h3>

                                    <p className="pt-4 text-[14px] sm:text-[14px] leading-[1.7] text-[#685956]">
                                        {card.text}
                                    </p>

                                    <div className="mt-4 space-y-3">
                                        {card.points?.map((point, pointIndex) => (
                                            <div key={pointIndex} className="flex items-start gap-2.5">
                                                <CaseStudyPointIcon />
                                                <p className="text-[13px] sm:text-[14px] leading-[1.55] text-[#685956]">
                                                    {point}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



<section className="w-full px-3 pb-10 pt-2 sm:px-5 sm:pb-24 lg:py-20">
  <div className="mx-auto container-xl max-w-[1240px]">
    <div className="text-center">
      <h2
        className="text-[28px] sm:text-[34px] md:text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-[#685956]"
        style={{ fontFamily: "Georgia, Times New Roman, serif" }}
      >
        The results & outcome
      </h2>

      <p className="mx-auto mt-3 max-w-[620px] text-[14px] sm:text-[15px] leading-[1.65] text-[#685956]">
        What emerged from this work is not a collection of brands, but a
        single, well-orchestrated system. Each brand now plays a precise role
        within a unified ecosystem led by one medical authority, allowing
        growth without fragmentation or dilution of trust.
      </p>
    </div>

    {/* DESKTOP */}
    <div className="mt-8 hidden md:grid md:grid-cols-[1fr_1fr_1fr] gap-4 lg:gap-5">
      {/* LEFT COLUMN */}
      <div className="grid gap-4 lg:gap-5">
        <div className="grid grid-cols-[0.92fr_1fr] gap-4 lg:gap-5">
          <div className="overflow-hidden rounded-[18px] bg-[#ece7e2]">
            <img
              src={resultsGallery.topLeft}
              alt="Product in hand"
              className="h-[92px] lg:h-[96px] w-full object-cover"
            />
          </div>

          <div className="flex h-[92px] lg:h-[96px] flex-col justify-center rounded-[18px] bg-transparent px-2">
            <h3
              className="text-[30px] lg:text-[34px] font-normal leading-none text-[#d88d3d]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              100%
            </h3>
            <p className="mt-2 max-w-[130px] text-[10px] lg:text-[11px] leading-[1.45] text-[#7a6d67]">
              Fully booked for months in advance through a single ad campaign
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] bg-[#ece7e2]">
          <img
            src={resultsGallery.bottomCenterWide}
            alt="Brand content collage"
            className="h-[92px] lg:h-[96px] w-full object-cover"
          />
        </div>

        <div className="overflow-hidden rounded-[18px] bg-[#ece7e2]">
          <img
            src={resultsGallery.bottomLeft}
            alt="Customer holding product"
            className="h-[200px] lg:h-[206px] w-full object-cover"
          />
        </div>
      </div>

      {/* CENTER COLUMN */}
      <div className="grid gap-4 lg:gap-5">
        <div className="overflow-hidden rounded-[18px] bg-[#ece7e2]">
          <img
            src={resultsGallery.centerTall}
            alt="Main skincare product"
            className="h-[306px] lg:h-[312px] w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-[0.9fr_1fr] gap-4 lg:gap-5">
          <div className="overflow-hidden rounded-[18px] bg-[#ece7e2]">
            <img
              src={resultsGallery.bottomCenterSmall}
              alt="Social post preview"
              className="h-[94px] lg:h-[98px] w-full object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-[18px] bg-[#ece7e2]">
            <img
              src={resultsGallery.bottomRight}
              alt="Hand holding product"
              className="h-[94px] lg:h-[98px] w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="grid gap-4 lg:gap-5">
        <div className="overflow-hidden rounded-[18px] bg-[#ece7e2]">
          <img
            src={resultsGallery.topRight}
            alt="Red product campaign visual"
            className="h-[200px] lg:h-[206px] w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-[0.88fr_1fr] gap-4 lg:gap-5">
          <div className="flex h-[200px] lg:h-[206px] flex-col justify-between rounded-[18px] bg-transparent py-3">
            <div className="border-l border-[#d9ccc3] pl-4">
              <h3
                className="text-[34px] lg:text-[38px] font-normal leading-none text-[#d88d3d]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                15+
              </h3>
              <p className="mt-2 max-w-[125px] text-[10px] lg:text-[11px] leading-[1.45] text-[#7a6d67]">
                cosmetic products successfully designed & launched
              </p>
            </div>

            <div className="border-l border-[#d9ccc3] pl-4">
              <h3
                className="text-[34px] lg:text-[38px] font-normal leading-none text-[#d88d3d]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                6X
              </h3>
              <p className="mt-2 max-w-[125px] text-[10px] lg:text-[11px] leading-[1.45] text-[#7a6d67]">
                increase in website traffic for Polderm year-over-year
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] bg-[#f0e5df]">
            <img
              src={resultsGallery.midRight}
              alt="Skincare lifestyle visual"
              className="h-[200px] lg:h-[206px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    {/* MOBILE */}
    <div className="mt-8 grid gap-3 md:hidden">
      <div className="grid grid-cols-[1fr_1fr] gap-3">
        <div className="overflow-hidden rounded-[16px] bg-[#ece7e2]">
          <img
            src={resultsGallery.topLeft}
            alt="Mobile gallery 1"
            className="h-[130px] w-full object-cover"
          />
        </div>

        <div className="rounded-[16px] bg-transparent px-2 py-3 flex flex-col justify-center">
          <h3
            className="text-[34px] font-normal leading-none text-[#d88d3d]"
            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
          >
            100%
          </h3>
          <p className="mt-2 text-[11px] leading-[1.45] text-[#7a6d67]">
            Fully booked for months in advance through a single ad campaign
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] bg-[#ece7e2]">
        <img
          src={resultsGallery.centerTall}
          alt="Mobile gallery 2"
          className="h-[320px] w-full object-cover"
        />
      </div>

      <div className="overflow-hidden rounded-[16px] bg-[#ece7e2]">
        <img
          src={resultsGallery.topRight}
          alt="Mobile gallery 3"
          className="h-[220px] w-full object-cover"
        />
      </div>

      <div className="overflow-hidden rounded-[16px] bg-[#ece7e2]">
        <img
          src={resultsGallery.bottomCenterWide}
          alt="Mobile gallery 4"
          className="h-[140px] w-full object-cover"
        />
      </div>

      <div className="overflow-hidden rounded-[16px] bg-[#ece7e2]">
        <img
          src={resultsGallery.bottomLeft}
          alt="Mobile gallery 5"
          className="h-[250px] w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-[0.95fr_1fr] gap-3">
        <div className="overflow-hidden rounded-[16px] bg-[#ece7e2]">
          <img
            src={resultsGallery.bottomCenterSmall}
            alt="Mobile gallery 6"
            className="h-[110px] w-full object-cover"
          />
        </div>

        <div className="overflow-hidden rounded-[16px] bg-[#ece7e2]">
          <img
            src={resultsGallery.bottomRight}
            alt="Mobile gallery 7"
            className="h-[110px] w-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-3">
        <div className="rounded-[16px] bg-transparent py-4">
          <div className="border-l border-[#d9ccc3] pl-4">
            <h3
              className="text-[32px] font-normal leading-none text-[#d88d3d]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              15+
            </h3>
            <p className="mt-2 text-[11px] leading-[1.45] text-[#7a6d67]">
              cosmetic products successfully designed & launched
            </p>
          </div>

          <div className="mt-5 border-l border-[#d9ccc3] pl-4">
            <h3
              className="text-[32px] font-normal leading-none text-[#d88d3d]"
              style={{ fontFamily: "Georgia, Times New Roman, serif" }}
            >
              6X
            </h3>
            <p className="mt-2 text-[11px] leading-[1.45] text-[#7a6d67]">
              increase in website traffic for Polderm year-over-year
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] bg-[#f0e5df]">
          <img
            src={resultsGallery.midRight}
            alt="Mobile gallery 8"
            className="h-full min-h-[220px] w-full object-cover"
          />
        </div>
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
};

export default Poliderma;
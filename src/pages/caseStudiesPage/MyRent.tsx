import React from "react";

const issueList = [
    "Heavy OTA dependency",
    "Price-based competition",
    "Low brand recall",
    "Missed direct revenue opportunities",

];

const scaleList = [
    "A fragmented and unclear user journey",
    "Content overload that obscured the value of the offer",
    "Weak logical connections between individual services",
    "The need for strong yet fast SEO optimization",
    "Lack of clear market positioning beyond functional descriptions",


];



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
    <span className="mt-[3px] flex h-[21px] w-[21px] min-w-[14px] items-center justify-center rounded-full bg-[#05C4D9] text-[14px] font-bold leading-none text-white">
        !
    </span>
);

const QuoteMark = () => (
    <span className="flex h-[33px] w-[35px] min-w-[30px] items-center justify-center rounded-[6px] bg-[#ECECEC] text-[20px] font-semibold leading-none text-[#05C4D9]">
        !
    </span>
);


const MyRent = () => {
    const PillButton = ({ children }: { children: React.ReactNode }) => (
        <button
            type="button"
            className="w-fit rounded-full bg-[#49E000] px-5 sm:px-6 py-[12px] sm:py-[13px] text-[13px] sm:text-[15px] font-medium leading-none text-[#003C42] transition duration-300 hover:translate-y-[-1px] hover:shadow-[0_10px_24px_rgba(73,224,0,0.22)]"
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
        <span className="mt-[2px] flex h-[14px] w-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#49E000]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                className="h-[16px] w-[16px]"
            >
                <path
                    d="M6 10H14"
                    stroke="#003C42"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M11 7L14 10L11 13"
                    stroke="#003C42"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );


    const caseCards = [
        {
            title: "A Clear and Logical User Journey",
            highlight: "Intro",
            text: "Users needed to immediately understand:",
            image: "/assets/Image/tourism-case-study.png",
            alt: "Case intro collage",
            bg: "bg-[#003C42]",
            points: [
                "Where they are",
                "Who the platform is for",
                "How services connect to one another",
                "What the next step is for their specific business type",
            ],
        },
        {
            title: "High-Performance Structural SEO",
            highlight: "Headline",
            text: "Despite the platform's complexity, the website had to:",
            image: "/assets/Image/tourism-brand-img1.png",
            alt: "Case highlight visual",
            bg: "bg-[#003C42]",
            points: [
                "Load fast",
                "Be technically sound",
                "Support long-term organic growth across markets",
            ],
        },
        {
            title: "Radical Content Reduction Without Value Loss",
            highlight: "Summary",
            text: "Total content volume was reduced to approximately one fifth of the original, while preserving:",
            image: "/assets/Image/tourism-brand-img2.png",
            alt: "Case summary visual",
            bg: "bg-[#003C42]",
            points: [
                "Informational clarity",
                "Market credibility",
                "SEO relevance",
            ],
        },
    ];


    return (
        <div className="w-full">
            {/* HERO SECTION */}



            <section className="w-full px-3 pt-3 sm:px-5 sm:pt-5">
                <div className="mx-auto container-xl">
                    <section className="overflow-hidden rounded-[18px] bg-[#003C42] shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:rounded-[22px]">
                        <div className="grid lg:grid-cols-[1fr_1fr]">
                            <div className="flex min-h-[360px] flex-col px-5 py-5 sm:px-8 sm:py-7 lg:min-h-[500px] lg:px-16 lg:py-6">
                                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7d7772]">
                                    {/* <div className="w-[34px] sm:w-[38px]">
                    <ArchLogo className="h-auto w-full" lineClass="stroke-[#2b2622]" />
                    </div> */}
                                    <span className="text-[22px] font-semibold text-[#fff]">
                                        Case Study
                                    </span>
                                    <span className="h-3 w-px bg-[#bcb5af]" />
                                    <span className="text-[14px] text-[#fff] italic">
                                        Tourism &amp; Travel
                                    </span>
                                </div>

                                <div className="my-auto pt-10 sm:pt-20 lg:pl-0">


                                    <h1
                                        className="hero-title text-[30px] sm:text-[38px] md:text-[40px] lg:text-[38px] font-normal leading-[1.08] tracking-normal text-white"

                                    >
                                        <span className="text-[#49E000]">
                                            Building Clarity at Scale:
                                        </span>
                                        <br />
                                        How MyRent Transformed a Complex Platform into a Growth
                                        System
                                    </h1>

                                    <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-white font-light ">
                                        The objective was not visibility alone, but positioning <br className="hidden md:block" />
                                        MyRent as a serious, credible player within the <br className="hidden md:block" /> broader
                                        hospitality ecosystem.
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
                                        src="/assets/Image/my-rent-case-study.png"
                                        alt="MyRent case study"
                                        className="h-full w-full object-cover object-center"
                                    />

                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,60,66,0.08)_0%,rgba(0,60,66,0)_24%,rgba(0,0,0,0.03)_100%)]" />

                                    <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                                        <a href="/who-we-create-for/myrent">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-3 rounded-full bg-white px-5 sm:px-7 py-3 sm:py-4 text-[14px] sm:text-[15px] font-medium text-[#003C42] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:translate-y-[-1px]"
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


            {/* STATS SECTION */}
            <section className="w-full px-3 py-8 sm:px-5 sm:py-10 lg:py-12">
                <div className="mx-auto container">
                    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                className="relative px-4 sm:px-6 lg:ps-8 lg:pe-0"
                            >
                                <div className="lg:min-h-[112px]">
                                    <h3
                                        className="text-[42px] sm:text-[48px] lg:text-[50px] font-normal leading-[0.95] text-[#32B100]"

                                    >
                                        {item.value}
                                    </h3>
                                    <p className="mt-3 max-w-[210px] text-[14px] sm:text-[14px] leading-[1.45] text-[#5B5B5B]">
                                        {item.text}
                                    </p>
                                </div>

                                {index !== stats.length - 1 && (
                                    <div className="hidden lg:block absolute right-0 top-1/2 h-[64px] w-px -translate-y-1/2 bg-[#D4D4D0]" />
                                )}

                                {index !== stats.length - 1 && (
                                    <div className="block sm:hidden mt-8 h-px w-full bg-[#D4D4D0]" />
                                )}
                            </div>
                        ))}
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
                                MyRent is a property management platform serving private renters and professional agencies across multiple markets.
                            </h2>

                            <p className="mx-auto mt-6  text-[14px] sm:text-[18px] leading-[1.55] text-[#555555]">
                                This collaboration was not a one-off project, it was a long-term, partnership-based development model designed to support continuous growth, evolving market needs, and operational scalability. The work spanned strategy, structure, UX, SEO, content, and marketing delivered through multiple collaboration models depending on context and growth phase.
                            </p>
                        </div>


                    </div>
                </div>
            </section>



            {/* WHAT DRIVES GROWTH */}
            <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:pb-10">
                <div className="mx-auto container-xl">
                    <div className="overflow-hidden rounded-[14px] bg-[#F8F8F8]">
                        <div className="grid border-b border-[#e2dbd7] bg-[#00646E] lg:grid-cols-[1.02fr_0.98fr]">
                            <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:ps-[86px] lg:pe-[24px] lg:pb-[56px] lg:pt-[34px]">
                                <h3 className="text-[14px] sm:text-[22px] font-semibold text-[#05C4D9]">
                                    The Challenge
                                </h3>

                                <p
                                    className="mt-8 sm:mt-10 md:mt-14 lg:mt-[72px] text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.35] tracking-[-0.015em] text-[#fff]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    MyRent operates within a highly complex ecosystem that includes multiple user types, a wide range of interconnected services, diverse market contexts, and a strong requirement for both scalability and operational speed.
                                </p>
                            </div>

                            <div className="flex items-center justify-center px-5 py-7 sm:px-8 sm:py-8 md:px-10 lg:px-[46px]">
                                <img
                                    src="/assets/Image/tourism-growth.png"
                                    alt="Health beauty digital ecosystem examples"
                                    className="w-full max-w-[410px] object-contain"
                                />
                            </div>
                        </div>

                        <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-[86px] lg:pb-[50px] lg:pt-[60px]">
                            <h3
                                className="text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.3] tracking-[-0.015em] text-[#00353A]"
                                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                            >
                                As the platform evolved, several structural issues emerged:
                            </h3>

                            <div className="mt-6 sm:mt-7 space-y-[14px]">
                                {scaleList.map((item, index) => (
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
                                    className="text-[20px] sm:text-[22px] font-normal leading-[1.35] tracking-[-0.015em] text-[#00353A]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    The challenge was not building more. It was creating clarity within complexity.
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
                            className="text-[26px] sm:text-[31px] md:text-[36px] lg:text-[40px] font-normal leading-[1.18] tracking-[-0.02em] text-[#00353A]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            How this works in real tourism businesses
                        </h2>

                        <p className="mt-2 text-[15px] sm:text-[22px] font-semibold text-[#00353A]">
                            (My Rent - Case Study):
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {caseCards.map((card, index) => (
                            <div
                                key={index}
                                className={`overflow-hidden rounded-[16px] ${card.bg} h-full`}
                            >
                                <div className="h-[210px] sm:h-[220px] w-full overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.alt}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="px-4 sm:px-[24px] pb-5 sm:pb-[20px] pt-4 sm:pt-[16px]">
                                    <h3 className="border-b border-[#1E6A70] pb-4 text-[16px] sm:text-[17px] font-semibold text-[#fff]">
                                        {card.title}
                                    </h3>

                                    <p className="pt-4 text-[14px] sm:text-[14  px] leading-[1.7] text-[#fff]">
                                        {card.text}
                                    </p>

                                    <div className="mt-4 space-y-3">
                                        {card.points?.map((point, pointIndex) => (
                                            <div key={pointIndex} className="flex items-start gap-2.5">
                                                <CaseStudyPointIcon />
                                                <p className="text-[13px] sm:text-[14px] leading-[1.55] text-white">
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



            {/* STRUCTURE BEATS CAMPAIGNS */}
            <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14">
                <div className="mx-auto md:max-w-[70%] lg:max-w-[70%] max-w-[90%]">
                    <div className="mx-auto text-left ">
                        <h3 className="text-[16px] sm:text-[22px] font-semibold text-[#003C42]">
                            Our Strategic Role
                        </h3>

                        <p
                            className="mt-3 text-[22px] sm:text-[26px] md:text-[26px] font-normal leading-[1.33] tracking-[-0.015em] text-[#555555]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            We operated as an external strategic and operational partner, focused on clarity, structure, and scalability. Our role included:
                        </p>
                    </div>


                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {strategicRoles.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-[16px] bg-[#F2F2F2] px-5 py-6 sm:px-6 sm:py-7"
                            >
                                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-[14px] bg-[#D9D9D9]">
                                    <StrategicRoleIcon type={item.icon} />
                                </div>

                                <h4 className="mt-5 text-[18px] sm:text-[19px] font-semibold text-[#003C42]">
                                    {item.title}
                                </h4>

                                <p className="mt-3 max-w-[210px] text-[14px] sm:text-[15px] leading-[1.6] text-[#666666]">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mx-auto mt-8 "

                    >
                        <div
                            className="overflow-hidden rounded-xl bg-[#fff]  px-4 py-14 lg:grid lg:grid-cols-[0.95fr_1.05fr] "
                            style={{ backgroundImage: "url('/assets/Image/tourism-brand-img.png')", backgroundSize: "cover", backgroundPosition: "center" }}
                        >

                            {/* LEFT TEXT */}
                            <div className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-[25px]">
                                <p
                                    className="text-center text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.38] tracking-[-0.015em] text-[#fff]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    Rather than optimizing isolated elements, we designed
                                    <span className="text-[#05C4D9] ps-2">
                                        a system where all components reinforce one another.
                                    </span>{" "}

                                </p>
                            </div>


                        </div>


                    </div>


                </div>
            </section>


            {/* PARTNERSHIP MODEL & RESULTS */}
            <section className="w-full px-3 py-10 sm:px-5 sm:py-12 lg:py-16">
                <div className="mx-auto container-xl">
                    <div className="mx-auto max-w-[760px] text-center">
                        <h2
                            className="text-[28px] sm:text-[34px] md:text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-[#003C42]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            Partnership Model &amp; Results
                        </h2>

                        <p className="mx-auto mt-4 max-w-[720px] text-[15px] sm:text-[16px] leading-[1.75] text-[#666666]">
                            Providing additional expertise MyRent did not require in-house,
                            without expanding their internal team. This flexible model allowed
                            MyRent to scale efficiently, maintain control, and ensure
                            consistent quality across initiatives. The results:
                        </p>
                    </div>

                    <div className="mx-auto mt-8 container-xl rounded-[20px] bg-[#004B53] px-5 py-7 sm:px-8 sm:py-9 lg:mt-10 lg:px-10 lg:py-10">
                        <div className="grid gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
                            {stats.map((item, index) => (
                                <div key={index} className="relative px-3 lg:px-10">
                                    <div className="min-h-[104px]">
                                        <h3
                                            className="text-[42px] sm:text-[48px] lg:text-[54px] font-normal leading-[0.95] text-[#49E000]"
                                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                        >
                                            {item.value}
                                        </h3>

                                        <p className="mt-3 md:max-w-[200px] lg:max-w-[200px] text-[13px] sm:text-[14px] leading-[1.45] text-white/90">
                                            {item.text}
                                        </p>
                                    </div>

                                    {index !== stats.length - 1 && (
                                        <div className="hidden lg:block absolute right-0 top-1/2 h-[62px] w-px -translate-y-1/2 bg-[#0F6972]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="w-full px-3 pb-[54px] pt-3 sm:px-5 sm:pb-[80px] lg:pb-[90px]">
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

export default MyRent;
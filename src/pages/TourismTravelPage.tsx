import React from "react";

const issueList = [
    "Heavy OTA dependency",
    "Price-based competition",
    "Low brand recall",
    "Missed direct revenue opportunities",

];

const scaleList = [
    "A clear position guests instantly understand",
    "A website that sells value, not just availability",
    "Messaging that reduces hesitation and comparison",
    "A system that supports direct bookings over time",
];

const caseCards = [
    {
        title: "Case - ",
        highlight: "Intro",
        text: "Example of how clarity transforms growth in a complex tourism ecosystem.",
        image: "/assets/Image/tourism-case-study.png",
        alt: "Case intro collage",
        bg: "bg-[#003C42]",
    },
    {
        title: "Case - ",
        highlight: "Headline",
        text: "Building clarity at scale: How MyRent turned complexity into a growth system",
        image: "/assets/Image/tourism-brand-img1.png",
        alt: "Case highlight visual",
        bg: "bg-[#003C42]",
    },
    {
        title: "Case - ",
        highlight: "Summary",
        text: "MyRent operates within a highly complex tourism ecosystem with multiple user types and services. The challenge wasn't building more, it was creating clarity within complexity.",
        image: "/assets/Image/tourism-brand-img2.png",
        alt: "Case summary visual",
        bg: "bg-[#003C42]",
    },
];

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

const GoldButton = ({ children }: { children: React.ReactNode }) => (
    <button
        type="button"
        className="w-full sm:w-fit rounded-full bg-[#3EDA00] px-3 sm:px-7 py-[13px] sm:py-[14px] text-center text-[12px] sm:text-[15px] font-semibold leading-[1.35] text-[#003C42]  transition duration-300 hover:bg-[#3EDA00]  text-[#003C42]"
    >
        {children}
    </button>
);

const TourismTravelPage = () => {
    return (
        <div className="w-full bg-white overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="w-full px-3 py-3 sm:px-5 sm:py-5">
                <div className="mx-auto container-xl">
                    <div className="grid overflow-hidden rounded-[18px] bg-[#00353A] lg:grid-cols-[0.98fr_1.02fr]">
                        <div className="flex items-center order-2 lg:order-1">
                            <div className="w-full px-4 py-7 sm:px-8 sm:py-10 md:px-10 md:py-7 lg:pb-[74px] lg:ps-[75px] lg:pe-8">
                                <div className="mb-7 flex flex-wrap items-center gap-2 sm:gap-3 text-[13px] text-[#666666] sm:mb-10 lg:mb-12">
                                    <span className="text-[14px] sm:text-[20px] font-semibold text-[#fff]">
                                        Who We Create For
                                    </span>
                                    <span className="text-[#9b9b9b]">|</span>
                                    <span className="text-[13px] italic text-[#fff]">
                                        Local & boutique brands
                                    </span>
                                </div>

                                <div className="pt-8">
                                    <h1
                                        className="pe-4 hero-title text-[28px] sm:text-[34px] md:text-[40px] lg:text-[38px] font-[400] leading-[1.08] tracking-[-0.03em] text-[#fff]"

                                    >
                                        <span className="text-[#3EDA00] pe-2">
                                            Tourism & Travel brands
                                        </span>
                                        <br className="hidden lg:block" />
                                        need more than campaigns. They need clarity that converts. Directly.

                                    </h1>
                                    <p className="mt-5 sm:mt-6 lg:mt-4 max-w-[430px] text-[15px] sm:text-[17px] leading-[1.75] text-[#fff]">
                                        We help tourism and travel businesses stay visible, trusted and chosen, even in crowded, OTA-dominated markets.  Not by adding noise, but by making the value obvious at the moment of decision.
                                    </p>

                                    <div className="mt-4 sm:mt-8 lg:mt-6 flex flex-col gap-3">
                                        {/* Link to /lets-talk#ask */}
                                        <a href="/lets-talk#demo">
                                            <GoldButton>
                                                Book a tourism strategy call
                                            </GoldButton>
                                        </a>

                                        {/* Link to /lets-talk#demo */}
                                        <a href="/lets-talk#ask">
                                            <GoldButton>
                                                Ask about direct booking growth
                                            </GoldButton>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 p-[2px]">
                            <div className="relative h-[260px] overflow-hidden sm:h-[340px] md:h-[430px] lg:h-full lg:min-h-[552px]">
                                <img
                                    src="/assets/Image/tourism-hero.png"
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
                                className="text-[26px] sm:text-[31px] md:text-[38px] lg:text-[40px] font-normal leading-[1.2] tracking-[-0.02em] text-[#00353A]"
                                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                            >
                                The reality of tourism & travel today
                            </h2>

                            <p className="mx-auto mt-3 max-w-[420px] text-[14px] sm:text-[15px] leading-[1.55] text-[#555555]">
                                People browse, compare your offer with dozens of similar listings, and leave without booking.
                            </p>
                        </div>

                        <div className="mt-10 sm:mt-[60px] grid gap-y-10 lg:grid-cols-[1fr_1.14fr] lg:gap-x-[70px] xl:gap-x-[110px]">
                            <div className="max-w-[390px]">
                                <h3 className="text-[16px] sm:text-[17px] font-semibold leading-[1.3] text-[#003C42]">
                                    Why it happens?
                                </h3>

                                <p
                                    className="mt-4 sm:mt-5 text-[22px] sm:text-[26px] md:text-[26px] font-normal leading-[1.28] tracking-[-0.015em] text-[#555555]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    Your brand and digital presence may look 'nice', but it doesn't clearly communicate why you're the better choice, fast enough.
                                </p>
                            </div>

                            <div className="max-w-[520px]">
                                <h3 className="text-[16px] sm:text-[17px] font-semibold leading-[1.3] text-[#003C42]">
                                    What this creates?
                                </h3>

                                <div className="mt-4 sm:mt-5 space-y-[14px]">
                                    {issueList.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <AlertDot />
                                            <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#555555]">
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
                    <div className="overflow-hidden rounded-[14px] bg-[#F8F8F8]">
                        <div className="grid border-b border-[#e2dbd7] bg-[#00646E] lg:grid-cols-[1.02fr_0.98fr]">
                            <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:ps-[86px] lg:pe-[24px] lg:pb-[56px] lg:pt-[34px]">
                                <h3 className="text-[14px] sm:text-[22px] font-semibold text-[#05C4D9]">
                                    What actually drives growth in tourism
                                </h3>

                                <p
                                    className="mt-8 sm:mt-10 md:mt-14 lg:mt-[72px] text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.35] tracking-[-0.015em] text-[#fff]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    Tourism growth doesn't come from more content or louder campaigns. It comes from clarity at the moment of decision, when guests are comparing, hesitating and choosing.
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
                                Tourism brands grow when they have:
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
                                    That's what we build, by aligning brand, digital and content into one coherent tourism system.
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
                                    <h3 className="border-b border-[#dfd8d4] pb-3 text-[16px] sm:text-[17px] font-semibold text-[#fff]">
                                        {card.title}
                                        <span className="text-[#3EDA00]">{card.highlight}</span>
                                    </h3>

                                    <p className="pt-4 text-[14px] sm:text-[15px] leading-[1.65] text-[#fff]">
                                        {card.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                        {/* Link to MyRent Case Study (example link: /case-studies/myrent) */}
                        <a href="/who-we-create-for/myrent">
                            <GoldButton>See how clarity drives growth in tourism</GoldButton>
                        </a>
                    </div>
                </div>
            </section>

            {/* STRUCTURE BEATS CAMPAIGNS */}
            <section className="w-full px-3 pb-6 pt-0 sm:px-5 sm:pb-8 lg:py-14">
                <div className="mx-auto container-xl">
                    <div className="mx-auto max-w-[760px] text-left lg:ml-[108px]">
                        <h3 className="text-[16px] sm:text-[22px] font-semibold text-[#003C42]">
                            Why clarity beats campaigns in tourism?
                        </h3>

                        <p
                            className="mt-3 text-[22px] sm:text-[26px] md:text-[26px] font-normal leading-[1.33] tracking-[-0.015em] text-[#555555]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            Tourism brands don't lose because they lack effort. They lose because complexity hides their value.
                        </p>
                    </div>

                    <div className="mx-auto mt-8 md:container-xl sm:container-lg lg:px-[108px]"

                    >
                        <div
                            className="overflow-hidden rounded-t-xl bg-[#fff]  p-4 lg:grid lg:grid-cols-[0.95fr_1.05fr] "
                            style={{ backgroundImage: "url('/assets/Image/tourism-brand-img.png')", backgroundSize: "cover", backgroundPosition: "center" }}
                        >

                            {/* LEFT TEXT */}
                            <div className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-[25px]">
                                <p
                                    className="text-center text-[22px] sm:text-[24px] md:text-[26px] font-normal leading-[1.38] tracking-[-0.015em] text-[#fff]"
                                    style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                                >
                                    Instead of optimizing isolated elements,
                                    <span className="text-[#05C4D9] ps-1">
                                        we design one clear system where brand, website and messaging work together,
                                    </span>{" "}
                                    across seasons, markets and growth phases.
                                </p>
                            </div>


                        </div>

                        {/* BOTTOM STRIP */}
                        <div className="bg-[#00646E] text-center py-6 rounded-b-[16px] mt-[-6px]">
                            <p
                                className="text-[18px] px-4 sm:text-[22px] text-[#fff]"
                                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                            >
                                That's how attention turns into trust, and trust into direct bookings.
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
                            className=" text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-[#555555]"
                            style={{ fontFamily: "Georgia, Times New Roman, serif" }}
                        >
                            Ready to build a tourism system that turns attention into bookings?
                        </h2>

                        <p className="mt-4 max-w-[470px] text-[15px] sm:text-[16px] leading-[1.6] text-[#555555]">
                            Ready to build a tourism system that turns attention into bookings?
                        </p>

                        <div className="mt-7 flex w-full max-w-[420px] flex-col items-center gap-3">
                            {/* Link to /lets-talk#demo */}
                            <a href="/lets-talk#demo" className="w-full sm:w-fit">
                                <GoldButton>Book a tourism strategy call</GoldButton>
                            </a>

                            {/* Link to /lets-talk#ask */}
                            <a href="/lets-talk#ask" className="w-full sm:w-fit">
                                <GoldButton>Ask about direct booking growth</GoldButton>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TourismTravelPage;
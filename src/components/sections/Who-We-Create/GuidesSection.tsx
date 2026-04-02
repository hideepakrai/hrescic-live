import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const GuidesSection: React.FC = () => {
  const services = [
    "Branding & Strategy",
    "Web & Digital",
    "Content & Marketing",
    "AI Video Production",
  ];

  const problems = [
    "People don't quickly understand your value.",
    "Your website looks good but doesn't perform.",
    "You're visible, but not consistently or to the right people.",
    "Hard to stand out in a crowded market.",
  ];

  const whatYouGet = [
    "Positioning, messaging, tone of voice, visual identity.",
    "UX/UI, landing pages, full websites, booking flows, SEO.",
    "Social content, emails, blogs, campaigns, analytics.",
    "Hero videos, social clips, variations, monthly refresh.",
  ];

  const supportsGrowth = [
    "Creates clarity — the foundation for conversion.",
    "Turns clarity into action (leads, bookings, sales).",
    "Builds trust, demand and long-term momentum.",
    "Adds emotional impact and boosts conversions.",
  ];

  const CheckItem = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 pt-1">
        <FaCircleCheck className="text-[#37C100] text-lg"/>

      </span>
      <p className="text-sm leading-6 text-black/75">{text}</p>
    </div>
  );

  return (
    <section className="w-full bg-white pt-14 pb-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* <p className="mb-3 text-center text-[16px] font-semibold text-[#555]">
         GUIDES & CHECKLISTS
        </p> */}

         <div className="text-center max-w-lg mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-color">
           GUIDES & CHECKLISTS
            </h2>
            {/* <p className="mt-4 text-base md:text-lg text-[#555555] leading-relaxed">
              Creative thinking meets real-world marketing. We share
              practical ideas and data-driven frameworks that help brands
              stay relevant long after the campaign ends.
            </p> */}
          </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* 1) Services */}
          <div className="rounded-2xl bg-[#F5F7FA] px-6 py-5 shadow-sm">
            <h4 className="text-[20px] font-bold text-[#1D2931]">Services</h4>
            <div className="my-3 h-px bg-black/10" />
            <ul className="space-y-4 font-medium text-[16px] text-[#4b5563]">
              {services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* 2) Problem It Solves */}
          <div className="rounded-2xl bg-[#EEF1F4] px-6 py-5 shadow-sm">
           <h4 className="text-[20px] font-bold text-[#1D2931]">Problem It Solves</h4>
            <div className="my-3 h-px bg-black/10" />
            <div className="space-y-4">
              {problems.map((p, i) => (
                <CheckItem key={i} text={p} />
              ))}
            </div>
          </div>

          {/* 3) What You Get */}
          <div className="rounded-2xl bg-[#E9EDF2] px-6 py-5 shadow-sm">
           <h4 className="text-[20px] font-bold text-[#1D2931]">What You Get</h4>

            <div className="my-3 h-px bg-black/10" />
            <div className="space-y-4">
              {whatYouGet.map((w, i) => (
                <CheckItem key={i} text={w} />
              ))}
            </div>
          </div>

          {/* 4) How It Supports Growth */}
          <div className="rounded-2xl bg-[#E3E8EF] px-6 py-5 shadow-sm">
           <h4 className="text-[20px] font-bold text-[#1D2931]">How It Supports Growth</h4>
            
            <div className="my-3 h-px bg-black/10" />
            <div className="space-y-4">
              {supportsGrowth.map((g, i) => (
                <CheckItem key={i} text={g} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;

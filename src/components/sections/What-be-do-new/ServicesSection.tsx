import React from "react";

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

const deliverables = [
  "Positioning, messaging, tone of voice, visual identity.",
  "UX/UI, landing pages, full websites, booking flows, SEO.",
  "Social content, emails, blogs, campaigns, analytics.",
  "Hero videos, social clips, variations, monthly refresh.",
];

const growth = [
  "Creates clarity — the foundation for conversion.",
  "Turns clarity into action (leads, bookings, sales).",
  "Builds trust, demand and long-term momentum.",
  "Adds emotional impact and boosts conversions.",
];

const steps = [
  {
    highlight: "WE CLARIFY",
    text: " what's working, what's not and what your priorities are.",
  },
  {
    highlight: "WE CREATE",
    text: " or fix the key assets your brand needs most.",
  },
  {
    highlight: "WE MAINTAIN",
    text: " in a consistent monthly creative cycle.",
  },
  {
    highlight: "WE SCALE",
    text: " what works with campaigns, testing and improvements.",
  },
];

const CheckItem = ({ text }: { text: string }) => {
  return (
    <li className="flex items-start gap-3 text-[13px] leading-6 text-[#5f5a68]">
      <span className="mt-1 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#37C100] text-[10px] font-bold text-white">
        ✓
      </span>
      <span>{text}</span>
    </li>
  );
};

const ServicesSection = () => {
  return (
    <section className="container-xl mx-auto px-4 py-16 sm:px-6 lg:px-8 md:mt-0 mt-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-light tracking-tight text-gray-800 md:text-4xl">
          What We Do
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Your brand, website, content and video all need to work as one system.
          <br />
          We align these four areas to attract the right clients and create
          consistent growth.
        </p>
      </div>

      <div className="mb-3 text-center text-[13px] text-[#666]">
        Service Overview:
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[16px] bg-[#F5F7FA] p-5">
          <h3 className="text-[16px] font-semibold text-[#1D2931]">Service</h3>
          <div className="my-4 h-px bg-[#00000012]" />
          <ul className="space-y-6 text-[15px] text-[#56545c]">
            {services.map((item, index) => (
              <li 
                key={item} 
                id={index === 0 ? "branding" : index === 1 ? "web" : index === 2 ? "content" : "video"}
                className="scroll-mt-24"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[16px] bg-[#EEF1F4] p-5">
          <h3 className="text-[16px] font-semibold text-[#1D2931]">
            Problem It Solves
          </h3>
          <div className="my-4 h-px bg-[#00000012]" />
          <ul className="space-y-4">
            {problems.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>
        </div>

        <div className="rounded-[16px] bg-[#E9EDF2] p-5">
          <h3 className="text-[16px] font-semibold text-[#1D2931]">
            What You Get
          </h3>
          <div className="my-4 h-px bg-[#00000012]" />
          <ul className="space-y-4">
            {deliverables.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>
        </div>

        <div className="rounded-[16px] bg-[#E3E8EF] p-5">
          <h3 className="text-[16px] font-semibold text-[#1D2931]">
            How It Supports Growth
          </h3>
          <div className="my-4 h-px bg-[#00000012]" />
          <ul className="space-y-4">
            {growth.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-[16px]  bg-[#1D2931]">
       

        <div className="mx-auto max-w-5xl px-6 py-12 text-center text-white sm:px-8 sm:py-16 lg:px-12 lg:py-16">
          <h3 className="text-3xl font-light leading-tight md:text-4xl">
            How Our Subscription Model Works 
          </h3> 

          <p className="mx-auto mt-5  text-sm font-normal leading-7 text-white/95 sm:text-base">
           Every plan includes a one-time setup that fixes your <br className="hidden md:block"/> 
           foundation and a monthly rhythm that keeps your <br className="hidden md:block"/>
           brand consistent and performing.
          </p>

          <div className="md:mt-40 mt-10 grid gap-8 text-left md:grid-cols-2 xl:grid-cols-4">
           {steps.map((step, index) => (
  <div key={step.highlight} className="relative px-0 xl:px-4">
    <p className="max-w-[210px] text-[13px] leading-6 text-[#F1E7FF]">
      <span className="font-semibold text-[#37C100]">{step.highlight}</span>
      {step.text}
    </p>

    {index !== steps.length - 1 && (
      <span className="absolute right-0 top-1 hidden h-10 w-[2px] bg-[#37C100]/50 xl:block" />
    )}
  </div>
))}
          </div>
          
          <a href="#plans">
          <button className="mt-10 rounded-full bg-[#37C100] hover:bg-[#2d9802] px-8 py-3 text-sm font-medium text-white  transition hover:-translate-y-0.5">
            See Our Plans
          </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
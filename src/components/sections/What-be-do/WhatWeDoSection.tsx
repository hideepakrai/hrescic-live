import React from "react";

// Service data taken from the screenshot
const services = [
  {
    service: "Branding & Strategy",
    problem: "People don't quickly understand your value.",
    get: "Positioning, messaging, tone of voice, visual identity.",
    growth: "Creates clarity — the foundation for conversion.",
  },
  {
    service: "Web & Digital",
    problem: "Your website looks good but doesn't perform.",
    get: "UX/UI, landing pages, full websites, booking flows, SEO.",
    growth: "Turns clarity into action (leads, bookings, sales).",
  },
  {
    service: "Content & Marketing",
    problem:
      "You're visible, but not consistently or to the right people.",
    get: "Social content, emails, blogs, campaigns, analytics.",
    growth: "Builds trust, demand and long-term momentum.",
  },
  {
    service: "AI Video Production",
    problem: "Hard to stand out in a crowded market.",
    get: "Hero videos, social clips, variations, monthly refresh.",
    growth: "Adds emotional impact and boosts conversions.",
  },
];

// Simple placeholder icon (design same as before)
const ServiceIcon = () => (
  <div className="p-3 rounded-full bg-[#37c10014] text-[#37c100]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  </div>
);

const WhatWeDoSection = () => {
  return (
    <section className="container-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-800">
          What We Do
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Your brand, website, content and video all need to work as one system.
          <br />
          We align these four areas to attract the right clients and create
          consistent growth.
        </p>
      </div>

      {/* Service Overview header */}
      <div className="mb-10 flex justify-between items-center border-b pb-4">
        <h3 className="text-2xl font-semibold text-gray-900">
          Service Overview
        </h3>
        <a
          href="#"
          className="text-[#41C717] hover:text-[#3aa914] flex items-center group"
        >
          Learn more
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.5 12h-11M13.5 16l4-4-4-4"
            />
          </svg>
        </a>
      </div>

      {/* Services grid – same design, new content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {services.map((item) => (
          <div key={item.service} className="flex items-start space-x-4">
            {/* Icon */}
            <ServiceIcon />

            {/* Text block */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {item.service}
              </h4>

              <p className="mt-2 text-sm text-gray-700">
                <span className="font-semibold">Problem It Solves: </span>
                {item.problem}
              </p>
              <p className="mt-1 text-sm text-gray-700">
                <span className="font-semibold">What You Get: </span>
                {item.get}
              </p>
              <p className="mt-1 text-sm text-gray-700">
                <span className="font-semibold">How It Supports Growth: </span>
                {item.growth}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoSection;

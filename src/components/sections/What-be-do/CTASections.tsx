import React from "react";

const CTASections: React.FC = () => {
  return (
    <section className="w-full py-10 mb-20 container-xl">
      <div className=" mx-auto flex flex-col md:flex-row rounded-2xl bg-[#F8F8F8] shadow-sm overflow-hidden">
        {/* Left content */}
        <div className="w-full md:w-1/2 px-6 sm:px-8 py-8 md:py-10 flex flex-col justify-center">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2F2A4A] mb-4">
            Ready to build your own creative system?
          </h4>
  
          <p className="text-sm md:text-base text-[#5A5672] mb-1 py-2">
            Let's make your brand clear, consistent and impossible to ignore.
          </p>

          <div className="flex  items-center gap-4 md:flex-nowrap md:gap-4 mt-6">
            {/* Primary CTA */}
             <a href="/lets-talk">
            <button className="bg-[#37C100] hover:bg-[#2d9802] text-white px-5 py-3 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all ">
              Book a Free Demo
            </button>
            </a>

            {/* Secondary CTA */}
            <button className="flex items-center gap-2 bg-white hover:bg-[#fff] shadow-sm text-[#2F2A4A] px-5 py-3 rounded-full text-xs md:text-sm font-medium transition-all">
              Ask Us Anything
            </button>
          </div>

          <p className="mt-5 text-sm md:text-[16px] leading-relaxed text-[#2F2A4A] font-semibold">
            No pressure. No obligations. Just clarity.
          </p>
        </div>

        {/* Right visual */}
        <div className="w-full md:w-1/2 relative bg-[#3e0577] flex items-stretch">
          {/* On mobile keep a fixed aspect ratio, on desktop let it fill height */}
          <div className="w-full h-56 sm:h-72 md:h-auto md:min-h-full">
            <img
              src="https://www.cta.tech/media/rtupchxr/group-working_1500x1000.jpg?width=1000&height=562&format=webp&quality=80"
              alt="Team working together"
              className="w-full h-full object-cover md:object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASections;

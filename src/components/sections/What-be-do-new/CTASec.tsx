import React from "react";

const CTASec: React.FC = () => {
  return (
    <section className="w-full pb-14 mb-20 md:mt-0 mt-5">
      <div className="md:max-w-[80%] max-w-[100%]  mx-auto bg-[#F3F1F8] rounded-2xl text-center px-6 py-16 md:py-20">
        
        <span className="text-2xl sm:text-3xl md:text-[36px] font-semibold text-[#2F2A4A] mb-5">
          Ready to build your own <br className="hidden sm:block" />
          creative system?
        </span>

        <p className="text-sm md:text-base text-[#6B6785] mb-8 mt-6">
          Let’s make your brand clear, consistent and impossible to ignore.
        </p>

        <div className="flex justify-center items-center gap-4 flex-wrap">
          <a href="/lets-talk#demo">
            <button className="bg-[#37c100] hover:bg-[#2d9802] text-white px-6 py-3 rounded-full text-sm font-medium transition-all">
              Book a Free Demo
            </button>
          </a>
          <a href=" /lets-talk#ask">
          <button className="border bg-[#37c1001f] border-[#37c100b5] text-[#2f2a4a] px-6 py-3 rounded-full text-sm font-medium hover:bg-white transition-all">
            Ask Us Anything
          </button>
          </a>
        </div>

        <p className="mt-6 text-sm md:text-base text-[#2F2A4A] font-semibold">
          No pressure. No obligations. Just clarity.
        </p>

      </div>
    </section>
  );
};

export default CTASec;
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const MarketingBlogCart = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      {/* Top Title */}
      <div className="mb-10">
        <h2 className="text-3xl font-medium md:text-[38px] font-serif text-[#555555] mb-2">
          Not another generic marketing blog.
        </h2>
        <p className="text-[#555] text-[16px] md:text-[20px] font-normal max-w-xl">
          Just clear explanations, sharp ideas and useful frameworks  —  written to
          actually help you move.
        </p>
      </div>

      {/* Card Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

        {/* CARD 1 */}
        <div className="bg-[#300060] text-white p-10 rounded-xl flex flex-col justify-between">
          <div>
            <p className="text-[18px] font-semibold">Brand Intelligence</p>

            <div className="py-12"></div>

            <h3 className="font-serif md:text-3xl text-xl mt-6 leading-snug">
              Sharp thinking about what
              <br /> makes brands work.
            </h3>

            <div className="mt-5 flex gap-3 text-sm items-start opacity-95">
              <img src="/assets/Image/circle.svg" className="w-6 mt-1" />
              <span className="md:text-lg text-md">
                Positioning, messaging, differentiation and decisions that build trust.
              </span>
            </div>
          </div>
          <div>
          <button className="mt-8 border md:text-[16px] text-[14px] md:px-6 px-6 py-2  rounded-full border-[#834CF680] hover:opacity-90 bg-[#3D0377] transition">
            Explore Brand Intelligence
          </button>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#300060] text-white p-10 rounded-xl flex flex-col justify-between">
          <div>
            <p className="text-[18px] font-semibold">Web & Conversion</p>

            <div className="py-12"></div>

            <h3 className="font-serif md:text-3xl text-xl mt-6 leading-snug">
              Your website is not a brochure —
              <br /> it's a system.
            </h3>

            <div className="mt-5 flex gap-3 text-sm items-start opacity-95">
              <img src="/assets/Image/circle.svg" className="w-6 mt-1" />
              <span className="md:text-lg text-md">
                UX, clarity, structure & conversion fundamentals that scale results.
              </span>
            </div>
          </div>

         <div>
            <button className="mt-8 border md:text-[16px] text-[14px] px-6 py-2  rounded-full border-[#834CF680] hover:opacity-90 bg-[#3D0377] transition">
                Read Web & Conversion Insights
            </button>
         </div>

        </div>

        {/* CARD 3 */}
        <div className="bg-[#300060] text-white p-10 rounded-xl flex flex-col justify-between">
          <div>
            <p className="text-[18px] font-semibold">Content Systems</p>

            <div className="py-16"></div>

            <h3 className="font-serif md:text-3xl text-xl mt-6 leading-snug">
              Consistency without
              <br /> burnout.
            </h3>

            <div className="mt-5 flex gap-3 text-sm items-start opacity-95">
              <img src="/assets/Image/circle.svg" className="w-6 mt-1" />
              <span className="md:text-lg text-md">
                Monthly structures, editorial thinking & AI workflow that keeps you visible.
              </span>
            </div>
          </div>
<div>
          <button className="mt-8 border md:text-[16px] text-[14px] px-6 py-2  rounded-full border-[#834CF680] hover:opacity-90 bg-[#3D0377] transition">
            Explore Content Systems
          </button>
</div>
           
        </div>

        {/* CARD 4 */}
        <div className="bg-[#300060] text-white p-10 rounded-xl flex flex-col justify-between">
          <div>
            <p className="text-[18px] font-semibold">Industry Insights</p>

            <div className="py-12"></div>

            <h3 className="font-serif md:text-3xl text-xl mt-6 leading-snug">
              Tourism, charter, beauty
              <br /> & boutique brands —
              <br /> simplified.
            </h3>

            <div className="mt-5 flex gap-3 text-sm items-start opacity-95">
              <img src="/assets/Image/circle.svg" className="w-6 mt-1" />
              <span className="md:text-lg text-md">
                Clear behaviour patterns & decision science behind what really moves numbers.
              </span>
            </div>
          </div>

       

            <div>
            <button className="mt-8 border md:text-[16px] text-[14px] px-6 py-2  rounded-full border-[#834CF680] hover:opacity-90 bg-[#3D0377] transition">
              See Industry Insights
            </button>
         </div>

        </div>

      </div>
    </section>
  );
};

export default MarketingBlogCart;

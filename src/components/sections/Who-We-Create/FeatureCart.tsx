import React from 'react';

// Card data ke liye ek array bana lete hain, taaki code saaf rahe
const insightsData = [
  {
    title: "Brand Clarity Beats Brand Size",
    description: "Why big brands win with alignment, not chaos — and what small brands can borrow from them."
  },
  {
    title: "Your Website Isn't Slow, It's Confused",
    description: "How to spot structural issues that kill conversions."
  },
  {
    title: "Content Without a System Dies in Week 3",
    description: "A simple framework for consistency you can maintain all year."
  },
  {
    title: "Tourism Brands: Why 90% Sound the Same",
    description: "How to avoid blending into '39 other listings nearby'."
  }
];

const FeatureCart = () => {
  return (
    // Section with a white background
    <section className="py-16 md:py-12 bg-white">
      <div className="container-xl mx-auto px-4">
        
        {/* === Main container card (as per image) === */}
        <div className="bg-[#F8F8F8] rounded-2xl py-16 md:py-20 px-6 md:px-10">

          {/* === Top Header Section === */}
          <div className="text-center max-w-lg mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-color">
             FEATURED ARTICLES
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#555555] leading-relaxed">
              Creative thinking meets real-world marketing. We share
              practical ideas and data-driven frameworks that help brands
              stay relevant long after the campaign ends.
            </p>
          </div>

          {/* === Insights Grid Section === */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Hum data array par map karke har card ko render karenge */}
            {insightsData.map((insight, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md flex flex-col h-full"
              >
                <h4 className="text-[20px] font-bold text-[#555] mb-4">
                  {insight.title}
                </h4>
                <p className="text-[#555] text-md mb-6">
                  {insight.description}
                </p>
                
                {/* Wrapper div to push line and link to bottom */}
                <div className="mt-auto pt-0">
                  {/* --- Horizontal Line Added --- */}
                  <hr className="border-gray-200 mb-4" />
                  
                  <a href="#" className="text-[#37C100] italic text-md font-medium hover:underline">
                   Read Article &gt;
                  </a>
                </div>
              </div>
            ))}
            
          </div>

          {/* === Bottom Button Section === */}
          <div className="text-center mt-16">
            <button 
              // --- Changed to rounded-full ---
              className="bg-[#37C100] hover:bg-[#2d9802] text-white font-medium py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300"
            >
              See all Article
            </button>
          </div>

        </div> {/* End of main container card */}
      </div>
    </section>
  );
};

export default FeatureCart;
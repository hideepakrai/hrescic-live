import React from 'react';

// Card data ke liye ek array bana lete hain, taaki code saaf rahe
const insightsData = [
  {
    title: "Why your marketing shouldn't stop when the campaign ends",
    description: "Even the best ads fade without a brand system behind them. Here's how to build one."
  },
  {
    title: "The psychology of trust in visual branding",
    description: "Why subtle design choices change what people believe."
  },
  {
    title: "From photos to storytelling: AI video for tourism",
    description: "Why video converts emotion into bookings — and how AI changes the game."
  },
  {
    title: "Creative subscriptions that actually scale.",
    description: "Turning outsourcing into long-term growth."
  }
];

const IdeaInSightPage = () => {
  return (
    // Section with a white background
    <section className="py-16 md:py-12 bg-white">
      <div className="container-xl mx-auto">

        {/* === Main container card (as per image) === */}
        <div className="bg-[#F8F8F8] rounded-2xl py-16 md:py-20 px-6 md:px-10">

          {/* === Top Header Section === */}
          <div className="text-center max-w-lg mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-color">
              Ideas & Insights
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

                  <a href="#" className="text-[#8000FF] italic text-md font-medium hover:underline">
                    Read More &gt;
                  </a>
                </div>
              </div>
            ))}

          </div>

          {/* === Bottom Button Section === */}
          <div className="text-center mt-16">
            <button
              // --- Changed to rounded-full ---
              className="bg-[#37c100] text-white font-medium py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300"
            >
              See all insights
            </button>
          </div>

        </div> {/* End of main container card */}
      </div>
    </section>
  );
};

export default IdeaInSightPage;

import React from "react";

const CTASection = () => {
  return (
    // Section ko vertical padding di hai
    <section className="py-16 bg-white">

      {/* Saare content ko center aur max-width di hai */}
      <div className="container mx-auto max-w-3xl text-center px-4">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-[#555555]">
          Marketing Excellence That Works On Your Terms
        </h2>

        {/* Paragraph */}
        <p className="mt-6 text-lg leading-relaxed text-[#555] max-w-3xl mx-auto">
          Because great marketing doesn't stop — it evolves.
          Whether you need a website that books guests,
          a video that tells your story, or a full creative
          system that scales with you — we're here to help your
          brand stay relevant, consistent and alive.
        </p>

        {/* Button */}
        <div className="mt-10">
          <a href="/lets-talk#ask">
            <button className="bg-[#41C717] hover:bg-[#3aa914] text-white font-medium py-3 px-8 rounded-full transition-all duration-300">
              Let's Talk
            </button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
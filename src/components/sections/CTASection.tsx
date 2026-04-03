"use client";

import { useTranslation } from "react-i18next";

const CTASection = () => {
  const { t } = useTranslation();
  return (
    // Section ko vertical padding di hai
    <section className="py-16 bg-white">

      {/* Saare content ko center aur max-width di hai */}
      <div className="container mx-auto max-w-3xl text-center px-4">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-[#555555]">
          {t("cta.title")}
        </h2>

        {/* Paragraph */}
        <p className="mt-6 text-lg leading-relaxed text-[#555] max-w-3xl mx-auto">
          {t("cta.description")}
        </p>

        {/* Button */}
        <div className="mt-10">
          <a href="/lets-talk#ask">
            <button className="bg-[#41C717] hover:bg-[#3aa914] text-white font-medium py-3 px-8 rounded-full transition-all duration-300">
              {t("hero.lets_talk")}
            </button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
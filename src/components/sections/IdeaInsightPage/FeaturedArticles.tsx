import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

type Article = {
  tag: string;
  title: string;
  subtitle?: string;
  bullet: string;
  href?: string;
};

const topArticles: Article[] = [
  {
    tag: "Brand Clarity",
    title: "BEATS\nBRAND SIZE",
    bullet: "Monthly rhythms, editorial structures, AI-assisted content, and how to keep showing up.",
    href: "#",
  },
  {
    tag: "Your Website Isn't Slow,",
    title: "IT'S\nCONFUSED",
    bullet: "How to spot structural issues that kill conversions.",
    href: "#",
  },
  {
    tag: "Content Without a System",
    title: "DIES\nIN WEEK 3",
    bullet: "A simple framework for consistency you can maintain alone.",
    href: "#",
  },
  {
    tag: "Tourism Brands:",
    title: "WHY 90%\nSOUNDS\nTHE SAME",
    bullet: "How to avoid blending into '30 other listings nearby'.",
    href: "#",
  },
];

const bottomArticles: Article[] = [
  {
    tag: "Brand Messaging Checklist",
    title: "",
    bullet: "Clear steps to define what you actually want to say.",
    href: "#",
  },
  {
    tag: "Website Clarity Checklist",
    title: "",
    bullet: "5-minute check of whether your site converts or confuses.",
    href: "#",
  },
  {
    tag: "Content Rhythm Mini-Guide",
    title: "",
    bullet: "Structure to stop disappearing every second month.",
    href: "#",
  },
];

const ArticleCard: React.FC<{ a: Article }> = ({ a }) => {
  return (
    <a
      href={a.href ?? "#"}
      className="
        group relative h-[260px] md:h-[300px] w-full
        rounded-2xl bg-[#300060] text-white
        px-5 py-5 md:px-6 md:py-6
        shadow-sm transition-all
        hover:-translate-y-0.5 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-white/60
      "
    >
      {/* Top tag */}
      <div className=" opacity-90 mb-1">
        <h5 className="text-[19px]">{a.tag}</h5></div>

      {/* Big title */}
      {a.title ? (
        <div className="leading-tight font-semibold tracking-tight text-2xl md:text-2xl whitespace-pre-line">
          <h3 className="md:text-[32px] text-[18px]">{a.title}</h3>
        </div>
      ) : (
        <div className="h-[56px]" />
      )}

      {/* Bottom area */}
      <div className="absolute left-5 right-5 bottom-5 md:left-6 md:right-6 md:bottom-6">
        <div className="flex items-start gap-2 text-sm opacity-95">
          <img src="/assets/Image/circle.svg" className="w-5 mt-1" />
          <p className="line-clamp-2 md:line-clamp-3 text-white font-normal text-[14px]">
            {a.bullet}
          </p>
        </div>

        <div className="mt-4 border-t border-[#591F94] pt-3 flex items-center gap-2 font-semibold text-md md:text-lg">
          <span>Read Article</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  );
};

const FeaturedArticles: React.FC = () => {
  return (
    <section className="container-xl py-14">
      {/* Row 1 */}
      <div className="mb-4 pb-2 text-[22px] font-bold border-b  text-[#555555]">
        Featured Articles
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topArticles.map((a, i) => (
          <ArticleCard key={`top-${i}`} a={a} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="mt-8 mb-4 text-sm font-medium text-black/80">
        Featured Articles
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bottomArticles.map((a, i) => (
          <ArticleCard key={`bottom-${i}`} a={a} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;

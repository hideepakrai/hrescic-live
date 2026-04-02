import React from "react";

type SnapshotItem = string;

type SectorCard = {
  title: string;
  subtitle: string;
  pain: string;
  why: string;
  need: string;
  cta: string;
  link: string; // Added link
  image: string; // Added image
  snapshot: SnapshotItem[];
  planLabel: string;
  plan: string;
};

const cards: SectorCard[] = [
  {
    title: "Tourism & Travel",
    subtitle: "For brands that\nhost the world.",
    pain:
      "People browse, compare your offer with 40 similar listings, and leave without booking.",
    why:
      "Your digital experience feels 'nice', but it doesn't clearly show why you're the better choice.",
    need:
      "A booking-focused brand and website that make the value obvious — instantly.",
    cta: "See Tourism Projects",
    link: "/who-we-create-for/tourism-travel",
    image: "/assets/Image/tourism-hero.png",
    snapshot: [
      "+68% bookings after full website rebuild",
      "3× more qualified inquiries after messaging refresh",
      "AI video campaigns: +40–70% engagement",
    ],
    planLabel: "Suggested Plan",
    plan: "GROW + SCALE",
  },

  {
    title: "Education & E-Learning",
    subtitle: "For brands that\nbuild the future.",
    pain:
      "Programs, platforms and funnels evolve separately, creating fragmented experiences for learners.",
    why:
      "Education businesses don't struggle because they lack expertise. They struggle because complexity hides value.",
    need:
      "A clear structure learners immediately understand and systems that support scale without adding confusion.",
    cta: "Explore Learning Projects",
    link: "/who-we-create-for/education-e-learning",
    image: "/assets/Image/education-imgs.png",
    snapshot: [
      "Registration friction reduced by 48%",
      "Closer messaging = 2.5× higher enrolment",
      "Scalable course ecosystem for rapid expansion",
    ],
    planLabel: "Suggested Plan",
    plan: "GROW + SCALE",
  },
  {
    title: "Health, Pharma & Beauty",
    subtitle: "For brands that build\ntrust through care.",
    pain:
      "Clients want to trust you — but your online presence feels outdated or inconsistent compared to others.",
    why:
      "Your expertise and warmth don't translate clearly into digital communication, creating hesitation.",
    need:
      "A credible, empathetic and structured digital identity that builds trust before they ever walk in.",
    cta: "See Health Projects",
    link: "/who-we-create-for/health-pharma-beauty",
    image: "/assets/hero/health-pharma-img.png",
    snapshot: [
      "Clearer messaging = more qualified inquiries",
      "+32% returning clients after content setup",
      "Service pages redesigned for clarity & trust",
    ],
    planLabel: "Suggested Plan",
    plan: "START + GROW",
  },
  {
    title: "Local & Boutique Brands",
    subtitle: "For makers, doers\nand dreamers.",
    pain:
      "Your product stands out in real life — but online you blend in with dozens of similar search results.",
    why:
      "Your personality, craft and story aren't expressed visually or verbally in a way people remember.",
    need:
      "Authentic identity + storytelling that match the quality of your work and support premium pricing.",
    cta: "See Boutique Projects",
    link: "/who-we-create-for/local-boutique-brands",
    image: "/assets/Image/brands-hero-img.png",
    snapshot: [
      "Stronger brand clarity → higher perceived value",
      "Launch content generating instant traction",
      "Website refresh improving conversions by 45%",
    ],
    planLabel: "Suggested Plan",
    plan: "START + GROW",
  },
];

const SectorCards: React.FC = () => {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <article
              key={i}
              className="rounded-2xl bg-[#F8F8F8] shadow-sm overflow-hidden flex flex-col h-full"
            >
              {/* Top image content */}
              <div className="h-44 overflow-hidden">
                <img 
                  src={c.image} 
                  alt={c.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Main content */}
              <div className="flex flex-col flex-1 px-5 py-6 text-[#222]">
                <h4 className="text-[20px] font-semibold text-[#111827]">{c.title}</h4>
                <div className="mt-2 mb-4 h-px bg-black/10" />

                <p className="text-[15px] leading-6 whitespace-pre-line text-[#4b5563] min-h-[48px]">
                  {c.subtitle}
                </p>

                <div className="my-4 h-px bg-black/10" />

                <div className="flex-1 space-y-4 text-[14px] leading-relaxed text-[#374151]">
                  <div>
                    <p className="font-bold text-[#111827]">The pain:</p>
                    <p className="mt-1">{c.pain}</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#111827]">Why it happens:</p>
                    <p className="mt-1">{c.why}</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#111827]">What you need:</p>
                    <p className="mt-1">{c.need}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <a href={c.link}>
                    <button className="w-fit rounded-full bg-[#37C100] hover:bg-[#2d9802] px-6 py-2.5 text-[14px] font-medium text-white shadow-sm transition-all hover:-translate-y-0.5">
                      {c.cta}
                    </button>
                  </a>
                </div>
              </div>

              {/* Snapshot Results block */}
              <div className="bg-[#F1F1F1] px-5 py-5 text-sm min-h-[140px]">
                <p className="font-bold text-[#374151] mb-2">
                  Snapshot Results:
                </p>
                <ul className="list-disc pl-4 font-medium space-y-1.5 text-[#4b5563]">
                  {c.snapshot.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Suggested Plan block */}
              <div className="bg-[#E5E7EB] px-5 py-5">
                <p className="text-[13px] font-semibold tracking-wider text-[#6b7280] uppercase">
                  {c.planLabel}
                </p>
                <p className="mt-1 text-[22px] font-extrabold text-[#111827]">
                  {c.plan}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorCards;

export interface ManagedPageRoute {
  key: string;
  path: string;
  label: string;
  sourceHint: string;
}

export const MANAGED_PAGE_ROUTES: ManagedPageRoute[] = [
  { key: "home", path: "/", label: "Home", sourceHint: "src/app/page.tsx" },
  { key: "what-we-do", path: "/what-we-do", label: "What We Do", sourceHint: "src/app/what-we-do/page.tsx" },
  { key: "what-we-do-branding", path: "/what-we-do/branding-strategy", label: "Branding Strategy", sourceHint: "src/app/what-we-do/branding-strategy/page.tsx" },
  { key: "what-we-do-web", path: "/what-we-do/web-digital", label: "Web & Digital", sourceHint: "src/app/what-we-do/web-digital/page.tsx" },
  { key: "what-we-do-content", path: "/what-we-do/content-marketing", label: "Content & Marketing", sourceHint: "src/app/what-we-do/content-marketing/page.tsx" },
  { key: "what-we-do-ai-video", path: "/what-we-do/ai-video-production", label: "AI Video Production", sourceHint: "src/app/what-we-do/ai-video-production/page.tsx" },
  { key: "what-we-do-legacy", path: "/what-we-do-new", label: "What We Do (Legacy)", sourceHint: "src/app/what-we-do-new/page.tsx" },
  { key: "who-we-create-for", path: "/who-we-create-for", label: "Who We Create For", sourceHint: "src/app/who-we-create-for/page.tsx" },
  { key: "tourism-travel", path: "/who-we-create-for/tourism-travel", label: "Tourism & Travel", sourceHint: "src/app/who-we-create-for/tourism-travel/page.tsx" },
  { key: "education-e-learning", path: "/who-we-create-for/education-e-learning", label: "Education & E-Learning", sourceHint: "src/app/who-we-create-for/education-e-learning/page.tsx" },
  { key: "health-pharma", path: "/who-we-create-for/health-pharma-beauty", label: "Health, Pharma & Beauty", sourceHint: "src/app/who-we-create-for/health-pharma-beauty/page.tsx" },
  { key: "local-boutique", path: "/who-we-create-for/local-boutique-brands", label: "Local & Boutique Brands", sourceHint: "src/app/who-we-create-for/local-boutique-brands/page.tsx" },
  { key: "karlo-ban", path: "/who-we-create-for/karlo-ban", label: "Karlo Ban", sourceHint: "src/app/who-we-create-for/karlo-ban/page.tsx" },
  { key: "case-cdc", path: "/who-we-create-for/cdc", label: "Case Study: CDC", sourceHint: "src/app/who-we-create-for/cdc/page.tsx" },
  { key: "case-expo", path: "/who-we-create-for/expo-life-far-beyond", label: "Case Study: Expo Life", sourceHint: "src/app/who-we-create-for/expo-life-far-beyond/page.tsx" },
  { key: "case-loreal", path: "/who-we-create-for/loreal", label: "Case Study: Loreal", sourceHint: "src/app/who-we-create-for/loreal/page.tsx" },
  { key: "case-poliderma", path: "/who-we-create-for/poliderma", label: "Case Study: Poliderma", sourceHint: "src/app/who-we-create-for/poliderma/page.tsx" },
  { key: "case-myrent", path: "/who-we-create-for/myrent", label: "Case Study: MyRent", sourceHint: "src/app/who-we-create-for/myrent/page.tsx" },
  { key: "case-castania", path: "/who-we-create-for/castania", label: "Case Study: Castania", sourceHint: "src/app/who-we-create-for/castania/page.tsx" },
  { key: "case-navada", path: "/who-we-create-for/navada", label: "Case Study: Navada", sourceHint: "src/app/who-we-create-for/navada/page.tsx" },
  { key: "case-minglanje", path: "/who-we-create-for/minglanje-v-klanjcu", label: "Case Study: Minglanje v Klanjcu", sourceHint: "src/app/who-we-create-for/minglanje-v-klanjcu/page.tsx" },
  { key: "case-ids", path: "/who-we-create-for/ids", label: "Case Study: IDS", sourceHint: "src/app/who-we-create-for/ids/page.tsx" },
  { key: "ideas-insights", path: "/ideas-insights", label: "Ideas & Insights", sourceHint: "src/app/ideas-insights/page.tsx" },
  { key: "lets-talk", path: "/lets-talk", label: "Let's Talk", sourceHint: "src/app/lets-talk/page.tsx" },
];

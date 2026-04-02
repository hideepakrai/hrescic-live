import * as fs from 'fs';
import * as path from 'path';

const routes = {
  'what-we-do': '@/components/sections/What-be-do-new/WhatWeDoPage',
  'what-we-do/branding-strategy': '@/pages/BrandingStrategyPage',
  'what-we-do/content-marketing': '@/pages/ContentMarketingPage',
  'what-we-do/ai-video-production': '@/pages/AiVideoProductionPage',
  'what-we-do/web-digital': '@/pages/WebDigitalPage',
  'what-we-do-new': '@/components/sections/What-be-do/WebPage',
  'who-we-create-for': '@/components/sections/Who-We-Create/WorkPage',
  'ideas-insights': '@/components/sections/IdeaInsightPage/IdeasInsights',
  'lets-talk': '@/pages/LetsTalkPage',
  'who-we-create-for/health-pharma-beauty': '@/pages/HealthPharmaPages',
  'who-we-create-for/local-boutique-brands': '@/pages/LocalBoutiqueBrands',
  'who-we-create-for/education-e-learning': '@/pages/EducationELearningPage',
  'who-we-create-for/tourism-travel': '@/pages/TourismTravelPage',
  'who-we-create-for/myrent': '@/pages/caseStudiesPage/MyRent',
  'who-we-create-for/expo-life-far-beyond': '@/pages/caseStudiesPage/ExpoLifefarandbeyond',
  'who-we-create-for/castania': '@/pages/caseStudiesPage/Castania',
  'who-we-create-for/poliderma': '@/pages/caseStudiesPage/Poliderma',
  'who-we-create-for/minglanje-v-klanjcu': '@/pages/caseStudiesPage/Minglanje-V-Klanjcu',
  'who-we-create-for/ids': '@/pages/caseStudiesPage/IDS',
  'who-we-create-for/navada': '@/pages/caseStudiesPage/NavadaPages',
  'who-we-create-for/loreal': '@/pages/caseStudiesPage/LorealPage',
  'who-we-create-for/karlo-ban': '@/pages/caseStudiesPage/KarloBanPage',
  'who-we-create-for/cdc': '@/pages/caseStudiesPage/CDCPage'
};

const appDir = path.join(process.cwd(), 'src', 'app');

for (const [routePath, componentPath] of Object.entries(routes)) {
  const dirPath = path.join(appDir, routePath);
  fs.mkdirSync(dirPath, { recursive: true });
  
  const compNameMatch = componentPath.match(/\/([^\/]+)$/);
  const compName = compNameMatch ? compNameMatch[1].replace(/[^a-zA-Z0-9]/g, '') : 'Component';
  
  const tsxContent = `import ${compName} from '${componentPath}';\n\nexport default function Page() {\n  return <${compName} />;\n}\n`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), tsxContent);
  console.log('Created: ' + routePath);
}

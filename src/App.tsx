import React from 'react'
import HomePage from '@/pages/HomePage'
import Header from '@/components/sections/Header'
import Footer from "@/components/sections/Footer";
import { Route, Routes } from 'react-router-dom';
import WebPage from './components/sections/What-be-do/WebPage';
import WorkPage from './components/sections/Who-We-Create/WorkPage';
import IdeasInsights from './components/sections/IdeaInsightPage/IdeasInsights';
import LetsTalkPage from './pages/LetsTalkPage';

import LocalBoutiqueBrands from './pages/LocalBoutiqueBrands';
import HealthPharmaPages from './pages/HealthPharmaPages';
import EducationELearningPage from './pages/EducationELearningPage';
import TourismTravelPage from './pages/TourismTravelPage';
import MyRent from './pages/caseStudiesPage/MyRent';
import ExpoLifefarandbeyond from './pages/caseStudiesPage/ExpoLifefarandbeyond';

import Castania from './pages/caseStudiesPage/Castania';
import Poliderma from './pages/caseStudiesPage/Poliderma';
import MinglanjeVKlanjcu from './pages/caseStudiesPage/Minglanje-V-Klanjcu';
import LorealPage from './pages/caseStudiesPage/LorealPage';
import KarloBanPage from './pages/caseStudiesPage/KarloBanPage';
import NavadaPage from './pages/caseStudiesPage/NavadaPages';
// import EducationELearningPage from './pages/EducationELearningPage';
import IDS from './pages/caseStudiesPage/IDS';
import NavadaPages from './pages/caseStudiesPage/NavadaPages';
import CDCPage from './pages/caseStudiesPage/CDCPage';
import WhatWeDoPage from './components/sections/What-be-do-new/WhatWeDoPage';
import WebDigitalPage from './pages/WebDigitalPage';
import BrandingStrategyPage from './pages/BrandingStrategyPage';
import ContentMarketingPage from './pages/ContentMarketingPage';
import AiVideoProductionPage from './pages/AiVideoProductionPage';
import ScrollToTop from '@/components/ScrollToTop'

export default function App() {
  const [view, setView] = React.useState<'home' | 'product'>('home')
  const leftNav = [
    {
      label: "Noževi",
      children: [
        { label: "Petty", href: "/petty" },
        { label: "Gyuto", href: "/gyuto" },
        { label: "Santoku", href: "/santoku" },
        { label: "Nakiri", href: "/nakiri" },
        { label: "O Noževima", href: "/o-nozevima" },
        { label: "O Karlo Banu", href: "/o-karlo-banu" },
        { label: "Što drugi kažu", href: "/recenzije" },
      ],
    },
  ];

  return (
    <div className="text-brand-text">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        
        <Route path='/what-we-do' element={<WhatWeDoPage />} />
        <Route path='/what-we-do/branding-strategy' element={<BrandingStrategyPage />} />
        <Route path='/what-we-do/content-marketing' element={<ContentMarketingPage />} />
        <Route path='/what-we-do/ai-video-production' element={<AiVideoProductionPage />} />
        <Route path='/what-we-do/web-digital' element={<WebDigitalPage />} />
        <Route path='/what-we-do-new' element={<WebPage />} />

        <Route path='/who-we-create-for' element={<WorkPage />} />
        <Route path='/ideas-insights' element={<IdeasInsights />} />
        <Route path='/lets-talk' element={<LetsTalkPage />} />

        <Route path='/who-we-create-for/health-pharma-beauty' element={<HealthPharmaPages />} />
        <Route path='/who-we-create-for/local-boutique-brands' element={<LocalBoutiqueBrands />} />
        <Route path='/who-we-create-for/education-e-learning' element={<EducationELearningPage />} />
        <Route path='/who-we-create-for/tourism-travel' element={<TourismTravelPage />} />


        <Route path="/who-we-create-for/myrent" element={<MyRent />} />
        <Route path="/who-we-create-for/expo-life-far-beyond" element={<ExpoLifefarandbeyond />} />
        <Route path="/who-we-create-for/castania" element={<Castania />} />
        <Route path="/who-we-create-for/poliderma" element={<Poliderma />} />



        <Route path="/who-we-create-for/minglanje-v-klanjcu" element={<MinglanjeVKlanjcu />} />
        <Route path="/who-we-create-for/ids" element={<IDS />} />
        <Route path="/who-we-create-for/navada" element={<NavadaPages />} />
        {/* <Route path="/case-studies/poliderma" element={<Poliderma />} /> */}
         <Route path="/who-we-create-for/loreal" element={<LorealPage />} />
         <Route path="/who-we-create-for/karlo-ban" element={<KarloBanPage />} />
         {/* <Route path="/case-studies/navada" element={<NavadaPage />} /> */}
         <Route path="/who-we-create-for/cdc" element={<CDCPage />} />










      </Routes>

      <Footer />
    </div>
  )
}

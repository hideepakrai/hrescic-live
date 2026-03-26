import React from 'react'
import WhatWeDoSection from '../What-be-do/WhatWeDoSection'
import WorksSection from '../What-be-do/WorksSection'
import PlansDeliverablesSec from '../What-be-do/PlansDeliverablesSec'
import ComparisonSection from '../What-be-do/ComparisonSection'
import CTASections from '../What-be-do/CTASections'
import SliderBrand from '../SliderBrand'
import CTASec from './CTASec'
import ServicesSection from './ServicesSection'
import PlanSection from './PlanSection'

const WhatWeDoPage = () => {
    return (
        <div className='px-4 md:px-0'>
            <section className="w-full px-3 pt-3 sm:px-4 lg:px-5">
                <div className='container-xl mx-auto'>
                    <div className='relative overflow-hidden rounded-[18px] bg-[#1D2931] lg:rounded-[20px]'>
                <div className="grid md:grid-cols-[55%_45%] gap-10 items-center px-6 md:px-16 py-20">

                    <div className="max-w-xl">
                        <h1 className="text-white font-serif text-3xl sm:text-4xl lg:text-[52px] leading-tight mb-6">
                            Creative systems that
                            <br />
                            keep your brand alive.
                        </h1>

                        <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                            We build brands, websites, content and video that
                            work together – not in fragments. Clear, aligned and
                            conversion-focused.
                        </p>

                        <div className="flex items-center gap-4">
                            <a href="/lets-talk#demo">
                                <button className="bg-[#37C100] hover:bg-[#2d9802] text-white md:px-6 md:py-3 px-5 py-3 text-xs rounded-full md:text-sm font-medium transition-all">
                                    Book a Free Demo
                                </button>
                            </a>

                            <a href="/lets-talk#ask">
                                <button className="flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#37C100] hover:text-[#fff] text-white md:px-6 md:py-3 px-5 py-3 text-xs rounded-full md:text-sm transition-all">
                                    Ask Us Anything
                                </button>
                            </a>
                        </div>

                        {/* <p className="mt-5 text-white/90 font-medium">
        Subscription-based creative partnership.
      </p> */}
                    </div>

                    <div className="hidden md:grid grid-cols-5 grid-rows-3 gap-5 h-[360px]">
                        <div className="bg-[#FFFFFF1A] rounded-2xl col-span-3 row-span-2 col-start-3 row-start-1" />
                        <div className="bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-1 col-start-2 row-start-2" />
                        <div className="bg-[#FFFFFF1A] rounded-2xl col-span-2 row-span-1 col-start-5 row-start-3" />
                        <div className="bg-[#FFFFFF1A] rounded-2xl col-span-3 row-span-1 col-start-2 row-start-3" />
                    </div>

                </div>
                </div>
                </div>
            </section>

            <SliderBrand />

            <ServicesSection />
            <PlanSection />


            {/* <WorksSection /> */}
            {/* <PlansDeliverablesSec /> */}
            <ComparisonSection />
            {/* <CaseStudies/> */}
            <CTASec />
        </div>
    )
}

export default WhatWeDoPage
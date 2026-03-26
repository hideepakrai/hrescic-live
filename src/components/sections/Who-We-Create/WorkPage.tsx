import React from 'react'
import { motion } from 'framer-motion'
import SliderBrand from '../SliderBrand'
import WorkCreateAboutSec from './WorkCreateAboutSec'
import SectorCard from './SectorCard'
import FeatureCart from './FeatureCart'
import GuidesSection from './GuidesSection'

const WorkPage = () => {
  return (
    <>
      <section className="w-full px-3 pt-3 sm:px-4 lg:px-5">
        <div className='container-xl mx-auto'>
          {/* 🔹 Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='relative overflow-hidden rounded-[18px] bg-[#1D2931] lg:rounded-[20px]'
          >
            <div className="grid md:grid-cols-[55%_45%] gap-10 items-center px-6 md:px-16 py-20">
              <div className="max-w-[500px] px-2"> {/* Fixed width for hero content */}
                <h1 className="text-white font-normal text-3xl sm:text-4xl lg:text-[50px] mb-6 font-serif">
                  Brands from different worlds - connected by one truth:
                </h1>

                <p className="text-gray-300 text-sm sm:text-base max-w-md mb-8">
                  they need marketing that outlives the campaign.
                  We help industry-driven brands stay visible, trusted and chosen — even in crowded markets.
                </p>

                <div className="flex items-center gap-4">
                  {/* Primary CTA */}
                  <a href="/lets-talk#demo">
                    <button className="bg-[#37C100] hover:bg-[#2d9802] text-white px-5 py-3 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all hover:-translate-y-0.5">
                      Book a Free Demo
                    </button>
                  </a>

                  {/* Secondary CTA */}
                  <a href="/lets-talk#ask">
                    <button className="flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#37C100] hover:text-[#fff] text-white px-5 py-3 md:px-6 md:py-3 rounded-full text-xs md:text-sm transition-all hover:-translate-y-0.5">
                      Ask Us Anything
                    </button>
                  </a>
                </div>
              </div>

              {/* 🔹 Right Side Purple Boxes (Animated) */}
              <div className="relative hidden md:grid grid-cols-5 grid-rows-3 gap-4 h-[350px] items-end">
                {[
                  { className: "bg-[#FFFFFF1A] rounded-2xl col-span-3 row-span-2 col-start-2 h-[220px]", delay: 0.1 },
                  { className: "bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-1 col-start-5 h-[100px]", delay: 0.2 },
                  { className: "bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-1 col-start-5 row-start-2 h-[110px]", delay: 0.3 },
                  { className: "bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-2 col-start-1 h-[100px]", delay: 0.4 },
                  { className: "bg-[#FFFFFF1A] rounded-2xl col-span-3 row-span-1 col-start-2 h-[100px]", delay: 0.5 },
                ].map((box, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: box.delay }}
                    className={box.className}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SliderBrand />
      <WorkCreateAboutSec />
      <SectorCard />
      
      {/* Hide Featured Articles for now as per instructions */}
      {/* <FeatureCart /> */}
      
      <GuidesSection />
    </>
  )
}

export default WorkPage

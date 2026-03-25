import React from 'react'
import SliderBrand from '../SliderBrand'
import WorkCreateAboutSec from './WorkCreateAboutSec'
import SectorCard from './SectorCard'
import FeatureCart from './FeatureCart'
import GuidesSection from './GuidesSection'

const WorkPage = () => {
  return (
   <>
     <section className="md:container-xl sm:container-xl max-w-[90%]  mt-2 mx-auto relative w-full bg-[#1D2931] rounded-2xl overflow-hidden border border-[#5A1AFF]/30">
      <div className="mx-auto md:ps-16  px-4 py-20 grid md:grid-cols-[55%_45%] gap-10 items-center">
        {/* 🔹 Left Text Content */}
        <div className="max-w-xl px-2">
          <h1 className="text-white font-normal text-3xl sm:text-4xl lg:text-[50px] mb-6 font-serif">
         Brands from different worlds - connected by one truth:
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6">
          they need marketing that outlives the campaign.
We help industry-driven brands stay visible, trusted and chosen — even in crowded markets.
           
          </p>

          <div className="flex  items-center gap-4">
            {/* Primary CTA */}
             <a href="/lets-talk#demo">
              <button className="bg-[#37C100] hover:bg-[#2d9802] text-white px-5 py-3 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all">
                Book a Free Demo
              </button>
            </a>

            {/* Secondary CTA */}
            <a href="/lets-talk#ask">
              <button className="flex items-center gap-2 bg-[#FFFFFF1A] hover:bg-[#37C100] hover:text-[#fff] text-white px-5 py-3 md:px-6 md:py-3 rounded-full text-xs md:text-sm transition-all">
                Ask Us Anything
              </button>
            </a>
          </div>

       
         
        </div>

        {/* 🔹 Right Side Purple Boxes */}
        <div className="relative hidden md:grid grid-cols-5 grid-rows-3 gap-4 h-[350px] items-end">
          {/* Large rectangle at the top-middle */}
          <div className="bg-[#FFFFFF1A] rounded-2xl col-span-3 row-span-2 col-start-2 h-[220px]" />

          {/* Small rectangle on the right, top */}
          <div className="bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-1 col-start-5 h-[100px]" />

          {/* Small rectangle on the right, bottom */}
          <div className="bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-1 col-start-5 row-start-2 h-[110px]" />

          {/* Small square at the bottom-left */}
          <div className="bg-[#FFFFFF1A] rounded-2xl col-span-1 row-span-2 col-start-1 h-[100px]" />

          {/* Long rectangle at the bottom-middle */}
          <div className="bg-[#FFFFFF1A] rounded-2xl col-span-3 row-span-1 col-start-2 h-[100px]" />
        </div>
      </div>
    </section> 

    <SliderBrand/>
    <WorkCreateAboutSec/>
    <SectorCard/>
    <FeatureCart/>
    <GuidesSection/>
   </>
  )
}

export default WorkPage

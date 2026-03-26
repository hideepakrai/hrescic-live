import React from "react";
import WhatToExpect from "./WhatToExpect";
import CallsAvailableNote from "./CallsAvailableNote";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// ── shared field styles ──────────────────────────────────────────────────────
const inputCls =
  "w-full border-b border-black/15 py-2 text-sm outline-none focus:border-black/40 bg-transparent";
const labelCls = "space-y-1.5 block";
const labelTextCls = "text-[15px] font-semibold text-[#0F0F3D]";
const optionalCls = "text-[11px] font-normal text-[#0F0F3D] ml-1";

// ── shared reCAPTCHA placeholder ─────────────────────────────────────────────
const ReCaptcha = () => (
  <div className="w-[304px] h-[78px] border border-gray-300 rounded-sm flex items-center justify-between px-3 bg-[#F9F9F9] shadow-md">
    <label
      htmlFor="not-a-robot"
      className="flex items-center gap-3 text-base text-gray-800 font-normal cursor-pointer"
    >
      <div className="w-6 h-6 border border-gray-500 rounded-sm flex-shrink-0">
        <input
          type="checkbox"
          id="not-a-robot"
          className="appearance-none w-full h-full cursor-pointer"
        />
      </div>
      I'm not a robot
    </label>
    <div className="flex flex-col items-end text-gray-500 leading-none flex-shrink-0">
      <img src="./assets/Image/re.svg" alt="reCAPTCHA logo" />
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
const LetsTalk: React.FC = () => {

  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // thoda delay for render
      }
    }
  }, []);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white pt-16 pb-8 md:pt-18 md:pb-2">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-[50px] font-semibold text-[#0F0F3D] leading-tight mb-4">
            Let's talk — on your terms.
          </h1>
          <p className="text-base md:text-[18px] text-[#555555] max-w-xl">
            Whether you're ready to move forward or just exploring your options,
            we'll meet you there.
          </p>
        </div>
      </section>

      {/* ── DEMO SECTION ───────────────────────────────────────────────────── */}
      <section id="demo" className="w-full bg-white py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">

            {/* Left panel */}
            <div className="bg-[#37C100] text-white p-8 md:p-10 flex flex-col min-h-[520px] rounded-[20px]">
              <div>
                <h4 className="text-xl font-semibold">Book your demo.</h4>
              </div>

              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/90">
                Tell us a bit about your business — we'll tailor the call to
                what actually matters.
              </p>

              {/* contact details at bottom */}
              <div className="mt-auto pt-10 space-y-4 text-[14px] text-white/95">
                <div className="flex items-center gap-3">
                  <img src="./assets/Image/mail.svg" alt="email" className="w-8" />
                  <span>tea@hrescic.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="./assets/Image/phone.svg" alt="phone" className="w-8" />
                  <span>+385 99 686 1721</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="./assets/Image/map.svg" alt="location" className="w-8" />
                  <span>Samobor, Croatia</span>
                </div>
              </div>
            </div>

            {/* Right form panel */}
            <div className="p-8 md:p-10 bg-white">
              <form className="space-y-5">

                {/* Name */}
                <label className={labelCls}>
                  <span className={labelTextCls}>Name*</span>
                  <input type="text" className={inputCls} />
                </label>

                {/* Email */}
                <label className={labelCls}>
                  <span className={labelTextCls}>Email*</span>
                  <input type="email" className={inputCls} />
                </label>

                {/* Company (optional) */}
                <label className={labelCls}>
                  <span className={labelTextCls}>
                    Company
                    <span className={optionalCls}>(optional)</span>
                  </span>
                  <input type="text" className={inputCls} />
                </label>

                {/* Website (optional) */}
                <label className={labelCls}>
                  <span className={labelTextCls}>
                    Website
                    <span className={optionalCls}>(optional)</span>
                  </span>
                  <input type="url" className={inputCls} />
                </label>

                {/* Textarea */}
                <div className="space-y-1.5">
                  <span className={labelTextCls}>
                    What would you like to improve?
                  </span>
                  <textarea
                    rows={4}
                    placeholder="e.g. increase bookings, improve conversion, get more qualified leads, reposition the brand..."
                    className="w-full rounded-md border border-black/10 p-3 text-sm outline-none focus:ring-2 focus:ring-black/5 focus:border-black/30 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#37C100] hover:bg-[#2d9802] text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm transition"
                >
                  <img src="./assets/Image/mail2-icon.svg" alt="" />
                  Book My Demo.
                </button>

                {/* reCAPTCHA */}
                <ReCaptcha />

                {/* Small text */}
                <p className="text-[13px] text-[#555555]">
                  We'll review your setup before the call so we don't waste your
                  time.
                </p>

                {/* Secondary link → #ask */}
                <p className="text-[13px] text-[#0F0F3D]">
                  Not ready yet?{" "}
                  <a
                    href="#ask"
                    className="text-[#37C100] font-medium hover:underline"
                  >
                    → Ask a quick question
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── ASK SECTION ────────────────────────────────────────────────────── */}
      <section id="ask" className="w-full bg-[#F8F8F8] py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">

            {/* Left panel */}
            <div className="bg-[#0F0F3D] text-white p-8 md:p-10 flex flex-col min-h-[480px] rounded-[20px]">
              <h4 className="text-xl font-semibold">Ask us anything.</h4>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/90">
                No pressure. No sales pitch. Just clarity on what actually makes
                sense.
              </p>

              {/* contact details at bottom */}
              <div className="mt-auto pt-10 space-y-4 text-[14px] text-white/95">
                <div className="flex items-center gap-3">
                  <img src="./assets/Image/mail.svg" alt="email" className="w-8" />
                  <span>tea@hrescic.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="./assets/Image/phone.svg" alt="phone" className="w-8" />
                  <span>+385 99 686 1721</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="./assets/Image/map.svg" alt="location" className="w-8" />
                  <span>Samobor, Croatia</span>
                </div>
              </div>
            </div>

            {/* Right form panel */}
            <div className="p-8 md:p-10 bg-white rounded-[20px]">
              <form className="space-y-5">

                {/* Name */}
                <label className={labelCls}>
                  <span className={labelTextCls}>Name*</span>
                  <input type="text" className={inputCls} />
                </label>

                {/* Email */}
                <label className={labelCls}>
                  <span className={labelTextCls}>Email*</span>
                  <input type="email" className={inputCls} />
                </label>

                {/* Textarea */}
                <div className="space-y-1.5">
                  <span className={labelTextCls}>
                    What do you need help with?
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Ask anything — from pricing and timelines to whether this even makes sense for you."
                    className="w-full rounded-md border border-black/10 p-3 text-sm outline-none focus:ring-2 focus:ring-black/5 focus:border-black/30 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#0F0F3D] hover:bg-[#1a1a5e] text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm transition"
                >
                  <img src="./assets/Image/mail2-icon.svg" alt="" />
                  Send My Question.
                </button>

                {/* reCAPTCHA */}
                <ReCaptcha />

                {/* Small text */}
                <p className="text-[13px] text-[#555555]">
                  You'll get a clear answer within 24 hours.
                </p>

                {/* Secondary link → #demo */}
                <p className="text-[13px] text-[#0F0F3D]">
                  Want to go deeper?{" "}
                  <a
                    href="#demo"
                    className="text-[#37C100] font-medium hover:underline"
                  >
                    → Book a demo instead
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ────────────────────────────────────────────── */}
      <WhatToExpect />
       {/* <CallsAvailableNote/> */}
    </>
  );
};

export default LetsTalk;

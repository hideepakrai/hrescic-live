"use client";

import React, { useEffect, useMemo, useState } from "react";
import WhatToExpect from "./WhatToExpect";
import {
  DEFAULT_LETS_TALK_CONTENT,
  parseLetsTalkHeroContent,
  parseLetsTalkFormSectionContent,
  LETS_TALK_HERO_KEY,
  LETS_TALK_DEMO_KEY,
  LETS_TALK_ASK_KEY,
  type LetsTalkContent,
} from "@/lib/cms-content";

const inputCls =
  "w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black/40";
const labelCls = "block space-y-1.5";
const labelTextCls = "text-[15px] font-semibold text-[#0F0F3D]";

type FeedbackState = {
  type: "success" | "error";
  text: string;
} | null;

type CmsCollectionResponse = {
  success?: boolean;
  items?: unknown[];
  error?: string;
};

interface ReCaptchaProps {
  id: string;
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
  label?: string;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({
  id,
  checked = false,
  onCheck,
  label = "I'm not a robot",
}) => {
  const handleToggle = () => {
    if (onCheck) onCheck(!checked);
  };

  return (
    <div className="flex h-[78px] w-[304px] select-none items-center justify-between rounded-sm border border-gray-300 bg-[#F9F9F9] px-3 shadow-sm">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-3 text-sm font-normal text-gray-800"
      >
        <button
          type="button"
          onClick={handleToggle}
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm border border-gray-400 bg-white transition-all hover:border-gray-600 ${
            checked ? "border-[#37C100] bg-[#37C100]/10" : ""
          }`}
        >
          {checked && (
            <svg
              className="h-5 w-5 text-[#37C100]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleToggle}
            className="sr-only"
          />
        </button>
        {label}
      </label>
      <div className="flex flex-shrink-0 flex-col items-center gap-1 leading-none text-gray-500 opacity-80">
        <img src="/assets/Image/re.svg" alt="reCAPTCHA logo" className="h-8 w-8" />
        <span className="text-[9px] text-gray-400">reCAPTCHA</span>
        <div className="flex gap-2 text-[9px] text-gray-400 hover:text-gray-600">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};

async function readCmsResponse(res: Response): Promise<CmsCollectionResponse> {
  try {
    return (await res.json()) as CmsCollectionResponse;
  } catch {
    return {};
  }
}

function cloneLetsTalkContent(): LetsTalkContent {
  return {
    ...DEFAULT_LETS_TALK_CONTENT,
    contact: { ...DEFAULT_LETS_TALK_CONTENT.contact },
    demo: { ...DEFAULT_LETS_TALK_CONTENT.demo },
    ask: { ...DEFAULT_LETS_TALK_CONTENT.ask },
  };
}

const LetsTalk: React.FC = () => {
  const [content, setContent] = useState<LetsTalkContent>(() => cloneLetsTalkContent());
  const [demoCaptcha, setDemoCaptcha] = useState(false);
  const [askCaptcha, setAskCaptcha] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [askSubmitting, setAskSubmitting] = useState(false);
  const [demoFeedback, setDemoFeedback] = useState<FeedbackState>(null);
  const [askFeedback, setAskFeedback] = useState<FeedbackState>(null);

  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
  });

  const [askForm, setAskForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const element = document.querySelector(hash);
    if (!element) return;
    setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    let active = true;

    const loadFormCms = async () => {
      try {
        const [heroRes, demoRes, askRes] = await Promise.all([
          fetch(`/api/public/cms/settings?key=${LETS_TALK_HERO_KEY}&limit=1`, { cache: "no-store" }),
          fetch(`/api/public/cms/settings?key=${LETS_TALK_DEMO_KEY}&limit=1`, { cache: "no-store" }),
          fetch(`/api/public/cms/settings?key=${LETS_TALK_ASK_KEY}&limit=1`, { cache: "no-store" }),
        ]);

        const [heroPayload, demoPayload, askPayload] = await Promise.all([
          readCmsResponse(heroRes),
          readCmsResponse(demoRes),
          readCmsResponse(askRes),
        ]);

        if (!active) return;

        setContent((prev) => {
          const next = { ...prev };

          if (heroPayload.success && Array.isArray(heroPayload.items) && heroPayload.items[0]) {
            const parsed = parseLetsTalkHeroContent(heroPayload.items[0]);
            next.heroTitle = parsed.heroTitle;
            next.heroDescription = parsed.heroDescription;
            next.captchaLabel = parsed.captchaLabel;
            next.contact = parsed.contact;
          }

          if (demoPayload.success && Array.isArray(demoPayload.items) && demoPayload.items[0]) {
            next.demo = parseLetsTalkFormSectionContent(demoPayload.items[0], "demo");
          }

          if (askPayload.success && Array.isArray(askPayload.items) && askPayload.items[0]) {
            next.ask = parseLetsTalkFormSectionContent(askPayload.items[0], "ask");
          }

          return next;
        });
      } catch {
        // Keep default static content if CMS request fails.
      }
    };

    void loadFormCms();

    return () => {
      active = false;
    };
  }, []);

  const utm = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    const searchParams = new URLSearchParams(window.location.search);
    return {
      source: searchParams.get("utm_source") || undefined,
      medium: searchParams.get("utm_medium") || undefined,
      campaign: searchParams.get("utm_campaign") || undefined,
      term: searchParams.get("utm_term") || undefined,
      content: searchParams.get("utm_content") || undefined,
    };
  }, []);

  const locale = useMemo<"en" | "hr">(() => {
    if (typeof document === "undefined") return "en";
    const lang = document.documentElement.lang?.toLowerCase() || "";
    return lang.startsWith("hr") ? "hr" : "en";
  }, []);

  const submitLead = async (
    formType: "demo" | "ask",
    payload: {
      name: string;
      email: string;
      company?: string;
      website?: string;
      message: string;
    },
    captchaChecked: boolean,
    setFeedback: (value: FeedbackState) => void,
    reset: () => void,
    successMessage: string,
    fallbackErrorMessage: string,
  ) => {
    if (!captchaChecked) {
      setFeedback({ type: "error", text: "Please verify that you are not a robot." });
      return false;
    }

    const res = await fetch("/api/public/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType,
        name: payload.name,
        email: payload.email,
        company: payload.company,
        website: payload.website,
        message: payload.message,
        page: "/lets-talk",
        locale,
        utm,
        captchaToken: "local-pass",
      }),
    });

    const data = (await res.json()) as { success?: boolean; error?: string; details?: unknown };
    if (!res.ok || !data.success) {
      console.error("Lead submission failed:", data.error, data.details);
      setFeedback({
        type: "error",
        text: data.error || fallbackErrorMessage,
      });
      return false;
    }

    setFeedback({ type: "success", text: successMessage });
    reset();
    return true;
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoFeedback(null);
    setDemoSubmitting(true);

    try {
      await submitLead(
        "demo",
        {
          name: demoForm.name,
          email: demoForm.email,
          company: demoForm.company,
          website: demoForm.website,
          message: demoForm.message,
        },
        demoCaptcha,
        setDemoFeedback,
        () => {
          setDemoForm({ name: "", email: "", company: "", website: "", message: "" });
          setDemoCaptcha(false);
        },
        content.demo.successMessage,
        content.demo.errorMessage,
      );
    } finally {
      setDemoSubmitting(false);
    }
  };

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAskFeedback(null);
    setAskSubmitting(true);

    try {
      await submitLead(
        "ask",
        {
          name: askForm.name,
          email: askForm.email,
          message: askForm.message,
        },
        askCaptcha,
        setAskFeedback,
        () => {
          setAskForm({ name: "", email: "", message: "" });
          setAskCaptcha(false);
        },
        content.ask.successMessage,
        content.ask.errorMessage,
      );
    } finally {
      setAskSubmitting(false);
    }
  };

  return (
    <>
      <section className="w-full bg-white pb-8 pt-16 md:pb-2 md:pt-18">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="mb-4 text-4xl font-semibold leading-tight text-[#0F0F3D] md:text-[50px]">
            {content.heroTitle}
          </h1>
          <p className="max-w-xl text-base text-[#555555] md:text-[18px]">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <section id="demo" className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-2">
            <div className="flex min-h-[520px] flex-col rounded-[20px] bg-[#37C100] p-8 text-white md:p-10">
              <h4 className="text-xl font-semibold">{content.demo.panelTitle}</h4>
              <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
                {content.demo.panelDescription}
              </p>

              <div className="mt-auto space-y-4 pt-10 text-[14px] text-white/95">
                <div className="flex items-center gap-3">
                  <img src="/assets/Image/mail.svg" alt="email" className="w-8" />
                  <span>{content.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/assets/Image/phone.svg" alt="phone" className="w-8" />
                  <span>{content.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/assets/Image/map.svg" alt="location" className="w-8" />
                  <span>{content.contact.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10">
              <form className="space-y-5" onSubmit={handleDemoSubmit}>
                <label className={labelCls}>
                  <span className={labelTextCls}>{content.demo.nameLabel}</span>
                  <input
                    type="text"
                    className={inputCls}
                    required
                    value={demoForm.name}
                    onChange={(e) => setDemoForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </label>

                <label className={labelCls}>
                  <span className={labelTextCls}>{content.demo.emailLabel}</span>
                  <input
                    type="email"
                    className={inputCls}
                    required
                    value={demoForm.email}
                    onChange={(e) => setDemoForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </label>

                <label className={labelCls}>
                  <span className={labelTextCls}>{content.demo.companyLabel}</span>
                  <input
                    type="text"
                    className={inputCls}
                    value={demoForm.company}
                    onChange={(e) => setDemoForm((prev) => ({ ...prev, company: e.target.value }))}
                  />
                </label>

                <label className={labelCls}>
                  <span className={labelTextCls}>{content.demo.websiteLabel}</span>
                  <input
                    type="url"
                    className={inputCls}
                    value={demoForm.website}
                    onChange={(e) => setDemoForm((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </label>

                <div className="space-y-1.5">
                  <span className={labelTextCls}>{content.demo.messageLabel}</span>
                  <textarea
                    rows={4}
                    required
                    minLength={3}
                    value={demoForm.message}
                    onChange={(e) => setDemoForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder={content.demo.messagePlaceholder}
                    className="w-full resize-none rounded-md border border-black/10 p-3 text-sm outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={demoSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[#37C100] px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#2d9802] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <img src="/assets/Image/mail2-icon.svg" alt="" />
                  {demoSubmitting ? "Sending..." : content.demo.submitLabel}
                </button>

                <ReCaptcha
                  id="demo-captcha"
                  checked={demoCaptcha}
                  onCheck={setDemoCaptcha}
                  label={content.captchaLabel}
                />

                {demoFeedback && (
                  <p
                    className={`text-[13px] ${
                      demoFeedback.type === "success" ? "text-[#1f7a39]" : "text-red-600"
                    }`}
                  >
                    {demoFeedback.text}
                  </p>
                )}

                <p className="text-[13px] text-[#555555]">{content.demo.noteText}</p>

                <p className="text-[13px] text-[#0F0F3D]">
                  {content.demo.switchPrompt}{" "}
                  <a href="#ask" className="font-medium text-[#37C100] hover:underline">
                    {content.demo.switchLinkLabel}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="ask" className="w-full bg-[#F8F8F8] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-2">
            <div className="flex min-h-[480px] flex-col rounded-[20px] bg-[#0F0F3D] p-8 text-white md:p-10">
              <h4 className="text-xl font-semibold">{content.ask.panelTitle}</h4>
              <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
                {content.ask.panelDescription}
              </p>

              <div className="mt-auto space-y-4 pt-10 text-[14px] text-white/95">
                <div className="flex items-center gap-3">
                  <img src="/assets/Image/mail.svg" alt="email" className="w-8" />
                  <span>{content.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/assets/Image/phone.svg" alt="phone" className="w-8" />
                  <span>{content.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/assets/Image/map.svg" alt="location" className="w-8" />
                  <span>{content.contact.location}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] bg-white p-8 md:p-10">
              <form className="space-y-5" onSubmit={handleAskSubmit}>
                <label className={labelCls}>
                  <span className={labelTextCls}>{content.ask.nameLabel}</span>
                  <input
                    type="text"
                    className={inputCls}
                    required
                    value={askForm.name}
                    onChange={(e) => setAskForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </label>

                <label className={labelCls}>
                  <span className={labelTextCls}>{content.ask.emailLabel}</span>
                  <input
                    type="email"
                    className={inputCls}
                    required
                    value={askForm.email}
                    onChange={(e) => setAskForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </label>

                <div className="space-y-1.5">
                  <span className={labelTextCls}>{content.ask.messageLabel}</span>
                  <textarea
                    rows={4}
                    required
                    minLength={3}
                    value={askForm.message}
                    onChange={(e) => setAskForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder={content.ask.messagePlaceholder}
                    className="w-full resize-none rounded-md border border-black/10 p-3 text-sm outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={askSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F0F3D] px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1a1a5e] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <img src="/assets/Image/mail2-icon.svg" alt="" />
                  {askSubmitting ? "Sending..." : content.ask.submitLabel}
                </button>

                <ReCaptcha
                  id="ask-captcha"
                  checked={askCaptcha}
                  onCheck={setAskCaptcha}
                  label={content.captchaLabel}
                />

                {askFeedback && (
                  <p
                    className={`text-[13px] ${
                      askFeedback.type === "success" ? "text-[#1f7a39]" : "text-red-600"
                    }`}
                  >
                    {askFeedback.text}
                  </p>
                )}

                <p className="text-[13px] text-[#555555]">{content.ask.noteText}</p>

                <p className="text-[13px] text-[#0F0F3D]">
                  {content.ask.switchPrompt}{" "}
                  <a href="#demo" className="font-medium text-[#37C100] hover:underline">
                    {content.ask.switchLinkLabel}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <WhatToExpect />
    </>
  );
};

export default LetsTalk;

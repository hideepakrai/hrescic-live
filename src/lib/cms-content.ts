import { getLocalizedValue, type LocaleCode, type LocalizedText } from "@/types/localization";

export type CmsStatus = "draft" | "published" | "archived";

export type CmsDocLike = {
  _id?: unknown;
  key?: unknown;
  slug?: unknown;
  status?: unknown;
  order?: unknown;
  title?: unknown;
  summary?: unknown;
  data?: unknown;
};

export type PricingPlanContent = {
  key: string;
  slug: string;
  status: CmsStatus;
  order: number;
  label: string;
  title: string;
  subtitle: string;
  intro: string;
  foundationTitle: string;
  foundation: string[];
  monthlyTitle: string;
  monthly: string[];
  idealTitle: string;
  ideal: string;
  cta: string;
  ctaLabel: string;
  bg: string;
};

export const LETS_TALK_HERO_KEY = "lets-talk-hero";
export const LETS_TALK_DEMO_KEY = "lets-talk-demo";
export const LETS_TALK_ASK_KEY = "lets-talk-ask";

export type LetsTalkHeroContent = {
  heroTitle: string;
  heroDescription: string;
  captchaLabel: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
};

export type PricingPlanAdminRecord = PricingPlanContent & {
  id: string;
};

export type PricingSectionSettings = {
  title: string;
  subtitle: string;
  bottomCtaLabel: string;
  bottomCtaHref: string;
};

export type LetsTalkFormSectionContent = {
  panelTitle: string;
  panelDescription: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  websiteLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  noteText: string;
  switchPrompt: string;
  switchLinkLabel: string;
};

export type LetsTalkContent = {
  heroTitle: string;
  heroDescription: string;
  captchaLabel: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  demo: LetsTalkFormSectionContent;
  ask: LetsTalkFormSectionContent;
};

const DEFAULT_PLAN_COLORS = {
  start: "bg-[#F5F7FA]",
  grow: "bg-[#EEF1F4]",
  scale: "bg-[#E9EDF2]",
  custom: "bg-[#E3E8EF]",
} as const;

export const DEFAULT_PRICING_PLANS: PricingPlanContent[] = [
  {
    key: "start",
    slug: "start",
    status: "published",
    order: 1,
    label: "Plan",
    title: "START",
    subtitle: "You're not getting the sales or inquiries you should.",
    intro: "People aren't clearly understanding your offer or your value.",
    foundationTitle: "One-time foundation:",
    foundation: [
      "Brand & website audit",
      "Clear messaging + value proposition",
      "One high-impact landing page or core update",
      "Initial AI video or visual assets",
    ],
    monthlyTitle: "Monthly rhythm (light):",
    monthly: [
      "Essential updates",
      "Light launch support",
      "Small conversion-focused improvements",
    ],
    idealTitle: "Ideal if you want:",
    ideal: "A clear setup and steady inquiries - without heavy monthly production.",
    cta: "/lets-talk#demo",
    ctaLabel: "Book a Free Demo",
    bg: DEFAULT_PLAN_COLORS.start,
  },
  {
    key: "grow",
    slug: "grow",
    status: "published",
    order: 2,
    label: "Plan",
    title: "GROW",
    subtitle: "You're getting clients - but not consistently or not the right ones.",
    intro: "Your communication isn't attracting the audience you want.",
    foundationTitle: "One-time foundation:",
    foundation: [
      "Deep brand & website review",
      "Messaging & positioning refinement",
      "Setup of content formats, tone and templates",
    ],
    monthlyTitle: "Monthly rhythm (light):",
    monthly: [
      "Regular social + email content",
      "Monthly design + copy support",
      "Ongoing AI video refresh",
      "Website + funnel optimisation",
      "Monthly insights",
    ],
    idealTitle: "Ideal if you want:",
    ideal: "A reliable flow of high-quality clients and a consistent brand presence.",
    cta: "/lets-talk#demo",
    ctaLabel: "Book a Free Demo",
    bg: DEFAULT_PLAN_COLORS.grow,
  },
  {
    key: "scale",
    slug: "scale",
    status: "published",
    order: 3,
    label: "Plan",
    title: "SCALE",
    subtitle: "You already have demand - but your creative workload is chaos.",
    intro: "Too many tasks, too many channels, no unified system.",
    foundationTitle: "One-time foundation:",
    foundation: [
      "Strategic workshop",
      "Brand system refinement",
      "Funnel & journey mapping",
      "Multi-channel content strategy",
    ],
    monthlyTitle: "Monthly rhythm (light):",
    monthly: [
      "High-volume content + design",
      "Continuous UX/web improvements",
      "Multi-channel campaigns",
      "Strategy + analytics calls",
      "AI video integrated in every cycle",
    ],
    idealTitle: "Ideal if you want:",
    ideal: "A full creative department - without hiring a full creative department.",
    cta: "/lets-talk#demo",
    ctaLabel: "Book a Free Demo",
    bg: DEFAULT_PLAN_COLORS.scale,
  },
  {
    key: "custom",
    slug: "custom",
    status: "published",
    order: 4,
    label: "Plan",
    title: "CUSTOM",
    subtitle: "You have internal people - but no partner who sees the whole system.",
    intro: "",
    foundationTitle: "One-time foundation:",
    foundation: [
      "Full ecosystem review",
      "Internal alignment",
      "Long-term roadmap",
    ],
    monthlyTitle: "Monthly rhythm (light):",
    monthly: [
      "Hybrid execution (in-house + precise)",
      "Unified content + web + design + video",
      "Ongoing leadership & optimisation",
    ],
    idealTitle: "Ideal if you want:",
    ideal: "A strategic partner who connects the dots across your entire ecosystem.",
    cta: "/lets-talk#ask",
    ctaLabel: "Book a Free Demo",
    bg: DEFAULT_PLAN_COLORS.custom,
  },
];

export const DEFAULT_PRICING_SECTION_SETTINGS: PricingSectionSettings = {
  title: "Plans & Deliverables",
  subtitle: "Choose the plan that matches where your brand is right now",
  bottomCtaLabel: "Ask Us Anything",
  bottomCtaHref: "/lets-talk#ask",
};

export const DEFAULT_LETS_TALK_CONTENT: LetsTalkContent = {
  heroTitle: "Let's talk on your terms.",
  heroDescription:
    "Whether you're ready to move forward or just exploring your options, we'll meet you there.",
  captchaLabel: "I'm not a robot",
  contact: {
    email: "tea@hrescic.com",
    phone: "+385 99 686 1721",
    location: "Samobor, Croatia",
  },
  demo: {
    panelTitle: "Book your demo.",
    panelDescription:
      "Tell us a bit about your business and we'll tailor the call to what matters.",
    nameLabel: "Name*",
    emailLabel: "Email*",
    companyLabel: "Company (optional)",
    websiteLabel: "Website (optional)",
    messageLabel: "What would you like to improve?",
    messagePlaceholder:
      "e.g. increase bookings, improve conversion, get more qualified leads, reposition the brand...",
    submitLabel: "Book My Demo.",
    successMessage: "Your message has been sent successfully.",
    errorMessage: "Failed to send your request. Please try again.",
    noteText: "We'll review your setup before the call so we don't waste your time.",
    switchPrompt: "Not ready yet?",
    switchLinkLabel: "Ask a quick question",
  },
  ask: {
    panelTitle: "Ask us anything.",
    panelDescription:
      "No pressure and no sales pitch, just clarity on what makes sense.",
    nameLabel: "Name*",
    emailLabel: "Email*",
    companyLabel: "",
    websiteLabel: "",
    messageLabel: "What do you need help with?",
    messagePlaceholder:
      "Ask anything from pricing and timelines to whether this makes sense for your business.",
    submitLabel: "Send My Question.",
    successMessage: "Your message has been sent successfully.",
    errorMessage: "Failed to send your request. Please try again.",
    noteText: "You'll get a clear answer within 24 hours.",
    switchPrompt: "Want to go deeper?",
    switchLinkLabel: "Book a demo instead",
  },
};

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") {
    return value;
  }

  return fallback;
}

function normalizeKey(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function localizedValue(value: unknown, locale: LocaleCode, fallback = ""): string {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return getLocalizedValue(value, locale) || fallback;
  }

  return fallback;
}

function normalizeStringArray(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) {
    return [...fallback];
  }

  const cleaned = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);

  return cleaned.length > 0 ? cleaned : [...fallback];
}

function statusFromUnknown(value: unknown): CmsStatus {
  if (value === "published" || value === "archived") {
    return value;
  }

  return "draft";
}

function clonePricingPlan(plan: PricingPlanContent): PricingPlanContent {
  return {
    ...plan,
    foundation: [...plan.foundation],
    monthly: [...plan.monthly],
  };
}

export function getCmsDocumentId(value: unknown): string {
  if (typeof value === "string") return value;

  if (value && typeof value === "object") {
    const maybeObject = value as { $oid?: unknown; toString?: () => string };

    // Handle MongoDB Extended JSON format
    if (typeof maybeObject.$oid === "string") {
      return maybeObject.$oid;
    }

    // Handle native MongoDB ObjectId or any object with .toString()
    if (typeof maybeObject.toString === "function") {
      const str = maybeObject.toString();
      // Basic check to see if it's a valid hex string (at least 24 chars)
      if (str && str !== "[object Object]") {
        return str;
      }
    }
  }

  return "";
}

export function getCmsStatus(value: unknown): CmsStatus {
  return statusFromUnknown(value);
}

export function toMultiline(items: string[]): string {
  return items.join("\n");
}

export function fromMultiline(input: string): string[] {
  return input
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function toLocalizedPayload(en: string, hr = ""): LocalizedText {
  return {
    en: en.trim(),
    hr: hr.trim(),
  };
}

export function mergePricingPlansForAdmin(
  items: unknown[],
  locale: LocaleCode = "en",
): PricingPlanAdminRecord[] {
  const defaults = new Map<string, PricingPlanAdminRecord>(
    DEFAULT_PRICING_PLANS.map((plan) => [
      plan.key,
      {
        ...clonePricingPlan(plan),
        id: "",
      },
    ]),
  );
  const extraPlans: PricingPlanAdminRecord[] = [];

  for (const rawItem of items) {
    const item = rawItem as CmsDocLike;
    const key = normalizeKey(item.key);
    if (!key) continue;

    const existing = defaults.get(key);
    const data = asRecord(item.data);
    const id = getCmsDocumentId(item._id);

    const base: PricingPlanAdminRecord =
      existing ||
      ({
        id: "",
        key,
        slug: asString(item.slug, key) || key,
        status: statusFromUnknown(item.status),
        order: Number(item.order) || 999,
        label: "Plan",
        title: key.toUpperCase(),
        subtitle: "",
        intro: "",
        foundationTitle: "One-time foundation:",
        foundation: [],
        monthlyTitle: "Monthly rhythm (light):",
        monthly: [],
        idealTitle: "Ideal if you want:",
        ideal: "",
        cta: "/lets-talk#demo",
        ctaLabel: "Book a Free Demo",
        bg: "bg-[#EEF1F4]",
      } as PricingPlanAdminRecord);

    const merged: PricingPlanAdminRecord = {
      ...base,
      id,
      key,
      slug: asString(item.slug, base.slug || key) || key,
      status: statusFromUnknown(item.status),
      order: Number.isFinite(Number(item.order)) ? Number(item.order) : base.order,
      label: localizedValue(data.label, locale, base.label),
      title: localizedValue(item.title, locale, base.title),
      subtitle: localizedValue(
        data.subtitle,
        locale,
        localizedValue(data.headline, locale, base.subtitle),
      ),
      intro: localizedValue(
        data.intro,
        locale,
        localizedValue(data.subline, locale, base.intro),
      ),
      foundationTitle: localizedValue(
        data.foundationTitle,
        locale,
        localizedValue(data.oneTimeTitle, locale, base.foundationTitle),
      ),
      foundation: normalizeStringArray(
        data.foundationItems,
        normalizeStringArray(data.oneTimeItems, base.foundation),
      ),
      monthlyTitle: localizedValue(data.monthlyTitle, locale, base.monthlyTitle),
      monthly: normalizeStringArray(data.monthlyItems, base.monthly),
      idealTitle: localizedValue(data.idealTitle, locale, base.idealTitle),
      ideal: localizedValue(data.idealText, locale, localizedValue(data.ideal, locale, base.ideal)),
      cta: asString(data.cta, base.cta) || base.cta,
      ctaLabel: localizedValue(data.ctaLabel, locale, base.ctaLabel),
      bg: asString(data.bg, base.bg) || base.bg,
    };

    if (defaults.has(key)) {
      defaults.set(key, merged);
    } else {
      extraPlans.push(merged);
    }
  }

  const knownPlans = [...defaults.values()].sort((a, b) => a.order - b.order);
  const unknownPlans = extraPlans.sort((a, b) => a.order - b.order);

  return [...knownPlans, ...unknownPlans];
}

export function mergePricingPlans(
  items: unknown[],
  locale: LocaleCode = "en",
): PricingPlanContent[] {
  return mergePricingPlansForAdmin(items, locale).map(({ id: _id, ...plan }) => plan);
}

export function parsePricingSectionSettings(
  rawItem: unknown,
  locale: LocaleCode = "en",
): PricingSectionSettings {
  const item = rawItem as CmsDocLike | undefined;
  if (!item) return { ...DEFAULT_PRICING_SECTION_SETTINGS };

  const data = asRecord(item.data);
  return {
    title: localizedValue(
      data.sectionTitle,
      locale,
      localizedValue(data.title, locale, DEFAULT_PRICING_SECTION_SETTINGS.title),
    ),
    subtitle: localizedValue(
      data.sectionSubtitle,
      locale,
      localizedValue(data.subtitle, locale, DEFAULT_PRICING_SECTION_SETTINGS.subtitle),
    ),
    bottomCtaLabel: localizedValue(data.bottomCtaLabel, locale, DEFAULT_PRICING_SECTION_SETTINGS.bottomCtaLabel),
    bottomCtaHref: asString(data.bottomCtaHref, DEFAULT_PRICING_SECTION_SETTINGS.bottomCtaHref),
  };
}

export function parseLetsTalkHeroContent(rawItem: unknown, locale: LocaleCode = "en"): LetsTalkHeroContent {
  const item = rawItem as CmsDocLike | undefined;
  const base = DEFAULT_LETS_TALK_CONTENT;
  if (!item) {
    return {
      heroTitle: base.heroTitle,
      heroDescription: base.heroDescription,
      captchaLabel: base.captchaLabel,
      contact: { ...base.contact },
    };
  }

  const data = asRecord(item.data);
  const contact = asRecord(data.contact);

  return {
    heroTitle: localizedValue(data.heroTitle, locale, base.heroTitle),
    heroDescription: localizedValue(data.heroDescription, locale, base.heroDescription),
    captchaLabel: localizedValue(data.captchaLabel, locale, base.captchaLabel),
    contact: {
      email: asString(contact.email, base.contact.email),
      phone: asString(contact.phone, base.contact.phone),
      location: asString(contact.location, base.contact.location),
    },
  };
}

export function parseLetsTalkFormSectionContent(
  rawItem: unknown,
  type: "demo" | "ask",
  locale: LocaleCode = "en",
): LetsTalkFormSectionContent {
  const item = rawItem as CmsDocLike | undefined;
  const base = type === "demo" ? DEFAULT_LETS_TALK_CONTENT.demo : DEFAULT_LETS_TALK_CONTENT.ask;
  if (!item) return { ...base };

  const data = asRecord(item.data);
  const section = asRecord(data.section || data); // Support both nested and flat for flexibility

  return {
    panelTitle: localizedValue(section.panelTitle, locale, base.panelTitle),
    panelDescription: localizedValue(section.panelDescription, locale, base.panelDescription),
    nameLabel: localizedValue(section.nameLabel, locale, base.nameLabel),
    emailLabel: localizedValue(section.emailLabel, locale, base.emailLabel),
    companyLabel: localizedValue(section.companyLabel, locale, base.companyLabel),
    websiteLabel: localizedValue(section.websiteLabel, locale, base.websiteLabel),
    messageLabel: localizedValue(section.messageLabel, locale, base.messageLabel),
    messagePlaceholder: localizedValue(section.messagePlaceholder, locale, base.messagePlaceholder),
    submitLabel: localizedValue(section.submitLabel, locale, base.submitLabel),
    successMessage: localizedValue(section.successMessage, locale, base.successMessage),
    errorMessage: localizedValue(section.errorMessage, locale, base.errorMessage),
    noteText: localizedValue(section.noteText, locale, base.noteText),
    switchPrompt: localizedValue(section.switchPrompt, locale, base.switchPrompt),
    switchLinkLabel: localizedValue(section.switchLinkLabel, locale, base.switchLinkLabel),
  };
}

export function parseLetsTalkContent(rawItem: unknown, locale: LocaleCode = "en"): LetsTalkContent {
  const item = rawItem as CmsDocLike | undefined;
  if (!item) {
    return {
      ...DEFAULT_LETS_TALK_CONTENT,
      contact: { ...DEFAULT_LETS_TALK_CONTENT.contact },
      demo: { ...DEFAULT_LETS_TALK_CONTENT.demo },
      ask: { ...DEFAULT_LETS_TALK_CONTENT.ask },
    };
  }

  const data = asRecord(item.data);
  const demo = asRecord(data.demo);
  const ask = asRecord(data.ask);
  const contact = asRecord(data.contact);

  const base = DEFAULT_LETS_TALK_CONTENT;

  return {
    heroTitle: localizedValue(data.heroTitle, locale, base.heroTitle),
    heroDescription: localizedValue(data.heroDescription, locale, base.heroDescription),
    captchaLabel: localizedValue(data.captchaLabel, locale, base.captchaLabel),
    contact: {
      email: asString(contact.email, base.contact.email),
      phone: asString(contact.phone, base.contact.phone),
      location: asString(contact.location, base.contact.location),
    },
    demo: {
      panelTitle: localizedValue(demo.panelTitle, locale, base.demo.panelTitle),
      panelDescription: localizedValue(demo.panelDescription, locale, base.demo.panelDescription),
      nameLabel: localizedValue(demo.nameLabel, locale, base.demo.nameLabel),
      emailLabel: localizedValue(demo.emailLabel, locale, base.demo.emailLabel),
      companyLabel: localizedValue(demo.companyLabel, locale, base.demo.companyLabel),
      websiteLabel: localizedValue(demo.websiteLabel, locale, base.demo.websiteLabel),
      messageLabel: localizedValue(demo.messageLabel, locale, base.demo.messageLabel),
      messagePlaceholder: localizedValue(demo.messagePlaceholder, locale, base.demo.messagePlaceholder),
      submitLabel: localizedValue(demo.submitLabel, locale, base.demo.submitLabel),
      successMessage: localizedValue(demo.successMessage, locale, base.demo.successMessage),
      errorMessage: localizedValue(demo.errorMessage, locale, base.demo.errorMessage),
      noteText: localizedValue(demo.noteText, locale, base.demo.noteText),
      switchPrompt: localizedValue(demo.switchPrompt, locale, base.demo.switchPrompt),
      switchLinkLabel: localizedValue(demo.switchLinkLabel, locale, base.demo.switchLinkLabel),
    },
    ask: {
      panelTitle: localizedValue(ask.panelTitle, locale, base.ask.panelTitle),
      panelDescription: localizedValue(ask.panelDescription, locale, base.ask.panelDescription),
      nameLabel: localizedValue(ask.nameLabel, locale, base.ask.nameLabel),
      emailLabel: localizedValue(ask.emailLabel, locale, base.ask.emailLabel),
      companyLabel: localizedValue(ask.companyLabel, locale, base.ask.companyLabel),
      websiteLabel: localizedValue(ask.websiteLabel, locale, base.ask.websiteLabel),
      messageLabel: localizedValue(ask.messageLabel, locale, base.ask.messageLabel),
      messagePlaceholder: localizedValue(ask.messagePlaceholder, locale, base.ask.messagePlaceholder),
      submitLabel: localizedValue(ask.submitLabel, locale, base.ask.submitLabel),
      successMessage: localizedValue(ask.successMessage, locale, base.ask.successMessage),
      errorMessage: localizedValue(ask.errorMessage, locale, base.ask.errorMessage),
      noteText: localizedValue(ask.noteText, locale, base.ask.noteText),
      switchPrompt: localizedValue(ask.switchPrompt, locale, base.ask.switchPrompt),
      switchLinkLabel: localizedValue(ask.switchLinkLabel, locale, base.ask.switchLinkLabel),
    },
  };
}

export type LocaleCode = "en" | "hr";

export type LocalizedText = {
  en: string;
  hr?: string | null;
};

export function toLocalizedText(input: unknown): LocalizedText {
  if (typeof input === "string") {
    return { en: input, hr: null };
  }

  if (input && typeof input === "object") {
    const maybeObj = input as Record<string, unknown>;
    const en = typeof maybeObj.en === "string" ? maybeObj.en : "";
    const hr = typeof maybeObj.hr === "string" ? maybeObj.hr : null;
    return { en, hr };
  }

  return { en: "", hr: null };
}

export function getLocalizedValue(
  value: unknown,
  locale: LocaleCode = "en",
): string {
  const localized = toLocalizedText(value);

  if (locale === "hr" && localized.hr && localized.hr.trim().length > 0) {
    return localized.hr;
  }

  return localized.en;
}

export function ensureLocalizedText(value: unknown): LocalizedText {
  const localized = toLocalizedText(value);
  return {
    en: localized.en || "",
    hr: localized.hr ?? null,
  };
}

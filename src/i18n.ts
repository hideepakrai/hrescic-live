import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/i18n/en.json";
import hr from "../public/i18n/hr.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hr: { translation: hr },
    },
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./langs/en.json";
import fi from "./langs/fi.json";

const resources = {
  en: {
    translation: en,
  },
  fi: {
    translation: fi,
  },
};

i18next.use(initReactI18next).init({
  lng: "fi",
  fallbackLng: "fi",
  resources: resources,
  interpolation: {
    escapeValue: false, // to prevent redundant sanitization of content in {{}}
  },
});

export default i18next;

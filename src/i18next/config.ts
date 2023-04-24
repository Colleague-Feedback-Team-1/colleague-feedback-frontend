import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import languageDetector from 'i18next-browser-languagedetector'

import en from './langs/en.json'
import fi from './langs/fi.json'

const resources = {
  en: {
    translation: en,
  },
  fi: {
    translation: fi,
  },
}

i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
})

export default i18next

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

//#region language files

import errorEn from '../locales/en/error.json'
import authEn from '../locales/en/auth.json'
import generalEn from '../locales/en/general.json'

import errorEs from '../locales/es/error.json'
import authEs from '../locales/es/auth.json'
import generalEs from '../locales/es/general.json'

//#endregion

const resources = {
  en: {
    error: errorEn,
    auth: authEn,
    general: generalEn,
  },
  es: {
    error: errorEs,
    auth: authEs,
    general: generalEs,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

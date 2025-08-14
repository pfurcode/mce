// src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../public/_locales/en/messages.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          // Extract the 'message' from each key
          ...Object.entries(enTranslations).reduce((acc, [key, value]) => {
            acc[key] = value.message;
            return acc;
          }, {} as Record<string, string>),
        },
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
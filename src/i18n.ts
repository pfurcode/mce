// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ŁADUJEMY Z src/_locales (nie z public)
import enFile from './_locales/en/messages.json';
// przykładowo:
// import plFile from './_locales/pl/messages.json';
// import deFile from './_locales/de/messages.json';

type ChromeMessages = Record<string, { message: string }>;

const flatten = (msgs: ChromeMessages) =>
  Object.entries(msgs).reduce<Record<string, string>>((acc, [k, v]) => {
    acc[k] = v?.message ?? k;
    return acc;
  }, {});

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: flatten(enFile as ChromeMessages) },
      // pl: { translation: flatten(plFile as ChromeMessages) },
      // de: { translation: flatten(deFile as ChromeMessages) },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;

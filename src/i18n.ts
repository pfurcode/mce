import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Locale messages packaged with the extension under `public/_locales`.
import enFile from '../public/_locales/en/messages.json';
// Additional languages can be imported similarly.
// import plFile from '../public/_locales/pl/messages.json';
// import deFile from '../public/_locales/de/messages.json';

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

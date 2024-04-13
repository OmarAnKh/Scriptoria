import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { DateTime } from 'luxon';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    debug: true,
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'path', 'htmlTag'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    saveMissing: true,
    interpolation: {
      format: (value, format, lng) => {
        if (format === 'DATE_LONG') {
          return DateTime.fromJSDate(value)
            .setLocale(lng)
            .toLocaleString(DateTime.DATE_HUGE);
        }
        return value;
      },
    },
    react: {
      bindI18n: 'languageChanged',
      bindStore: 'added removed',
      nsMode: 'fallback',
    },
    saveState: true,
  });

export default i18n;
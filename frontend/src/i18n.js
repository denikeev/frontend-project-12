import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales/ru.js';

const defaultLanguage = 'ru';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;

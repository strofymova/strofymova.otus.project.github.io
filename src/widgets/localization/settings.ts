import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

// export const LANG_STORAGE_KEY = 'lang';

export enum Locale {
  ru = 'ru',
  en = 'en',
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Locale.ru,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

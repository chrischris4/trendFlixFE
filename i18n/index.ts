import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr';
import en from './locales/en';

try {
  if (!i18n.isInitialized) {
    let lng = 'fr';
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.language === 'string' && navigator.language.length > 0) {
        lng = navigator.language.split('-')[0] === 'fr' ? 'fr' : 'en';
      }
    } catch {}

    i18n.use(initReactI18next).init({
      resources: {
        fr: { translation: fr },
        en: { translation: en },
      },
      lng,
      fallbackLng: 'fr',
      interpolation: { escapeValue: false },
      initImmediate: false,
    }).catch(() => {});
  }
} catch {}

export default i18n;

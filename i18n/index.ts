import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr';
import en from './locales/en';

if (!i18n.isInitialized) {
  const deviceLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'fr';
  const lng = deviceLang === 'fr' ? 'fr' : 'en';

  i18n.use(initReactI18next).init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  });
}

export default i18n;

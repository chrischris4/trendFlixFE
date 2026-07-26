import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr';
import en from './locales/en';

try {
  if (!i18n.isInitialized) {
    // Toujours 'en' à l'init : le rendu serveur et la première passe d'hydratation
    // doivent produire le même HTML, et c'est la version indexée (`<html lang="en">`).
    // ClientRoot bascule sur 'fr' après le montage si le navigateur est francophone.
    i18n.use(initReactI18next).init({
      resources: {
        fr: { translation: fr },
        en: { translation: en },
      },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      initImmediate: false,
    }).catch(() => {});
  }
} catch {}

export function detectBrowserLanguage(): 'fr' | 'en' {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'en';
  try {
    return navigator.language?.split('-')[0] === 'fr' ? 'fr' : 'en';
  } catch {
    return 'en';
  }
}

export default i18n;

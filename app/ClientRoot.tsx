'use client';

import i18n, { detectBrowserLanguage } from '../i18n';
import { useEffect } from 'react';
import { useAppStore } from '../store';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const { setLang } = useAppStore();

  // Après hydratation seulement : bascule sur le français si le navigateur l'est.
  useEffect(() => {
    try {
      const detected = detectBrowserLanguage();
      setLang(detected);
      if (detected !== i18n.language) i18n.changeLanguage(detected);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = detected;
      }
    } catch {}
  }, []);

  return children;
}

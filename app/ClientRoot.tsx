'use client';

import i18n from '../i18n';
import { useEffect } from 'react';
import { useAppStore } from '../store';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const { setLang } = useAppStore();

  useEffect(() => {
    try {
      const lang = (i18n.language || 'fr').split('-')[0];
      const detected = lang === 'fr' ? 'fr' : 'en';
      setLang(detected);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = detected;
      }
    } catch {}
  }, []);

  return children;
}

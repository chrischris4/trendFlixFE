'use client';

import '../i18n';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const { setLang } = useAppStore();

  useEffect(() => {
    const detected = i18n.language as 'fr' | 'en';
    setLang(detected === 'fr' ? 'fr' : 'en');
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return <>{children}</>;
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 260 }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #C5001E, #E8006A)',
          flexShrink: 0,
        }} />
        <p style={{ color: '#AAAAAA', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
          {t('cookie.message')}{' '}
          <Link href="/privacy" style={{ color: '#FF5599', textDecoration: 'underline' }}>
            {t('cookie.learn_more')}
          </Link>
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '8px 18px',
            borderRadius: 20,
            border: '1px solid #3A3A3A',
            backgroundColor: 'transparent',
            color: '#AAAAAA',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {t('cookie.decline')}
        </button>
        <button
          onClick={accept}
          style={{
            padding: '8px 18px',
            borderRadius: 20,
            border: 'none',
            background: 'linear-gradient(90deg, #C5001E, #E8006A)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {t('cookie.accept')}
        </button>
      </div>
    </div>
  );
}

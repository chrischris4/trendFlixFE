'use client';

import Link from 'next/link';
import { useAppStore } from '../store';

export default function NotFound() {
  const lang = useAppStore(s => s.lang);
  const isFr = lang === 'fr';

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 }}>
      <span style={{ fontSize: 64, fontWeight: 800, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>404</span>
      <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>
        {isFr ? 'Page introuvable' : 'Page not found'}
      </h1>
      <p style={{ color: '#AAAAAA', fontSize: 15, margin: 0, textAlign: 'center' }}>
        {isFr
          ? "Cette page n'existe pas ou a été déplacée."
          : 'This page does not exist or has been moved.'}
      </p>
      <Link
        href="/"
        style={{ marginTop: 8, padding: '10px 28px', borderRadius: 20, background: 'linear-gradient(90deg,#C5001E,#E8006A)', color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
      >
        {isFr ? "Retour à l'accueil" : 'Back to home'}
      </Link>
    </div>
  );
}

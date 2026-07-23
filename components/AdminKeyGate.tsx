'use client';

import { FormEvent, ReactNode, useEffect, useState } from 'react';

export default function AdminKeyGate({ children }: { children: ReactNode }) {
  const [key, setKey] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(Boolean(sessionStorage.getItem('trend_admin_key')));
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!key.trim()) return;
    sessionStorage.setItem('trend_admin_key', key.trim());
    setKey('');
    setUnlocked(true);
  }

  if (unlocked) return children;

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0F0F0F', padding: 20 }}>
      <form onSubmit={submit} style={{ width: 'min(420px,100%)', padding: 24, border: '1px solid #2A2A2A', borderRadius: 12, background: '#171717' }}>
        <h1 style={{ color: '#fff', fontSize: 22 }}>Administration TrendingShows</h1>
        <p style={{ color: '#999', fontSize: 13, lineHeight: 1.6 }}>La clé reste uniquement dans cette session de navigateur.</p>
        <input type="password" autoComplete="off" value={key} onChange={event => setKey(event.target.value)} placeholder="Clé d’administration" style={{ width: '100%', boxSizing: 'border-box', padding: 11, borderRadius: 8, border: '1px solid #333', background: '#0F0F0F', color: '#fff' }} />
        <button type="submit" style={{ width: '100%', marginTop: 12, padding: 11, border: 0, borderRadius: 8, background: '#C5001E', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Continuer</button>
      </form>
    </main>
  );
}

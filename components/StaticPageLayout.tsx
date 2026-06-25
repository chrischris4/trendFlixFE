'use client';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function StaticPageLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, maxWidth: 720, width: '100%', margin: '0 auto', padding: '40px 24px 64px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

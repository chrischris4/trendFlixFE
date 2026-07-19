'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { key: 'home',   href: '/',        tKey: 'nav.home' },
  { key: 'weekly', href: '/weekly',  tKey: 'nav.weekly' },
  { key: 'stats',  href: '/stats',   tKey: 'nav.stats' },
  { key: 'blog',   href: '/blog',    tKey: 'nav.blog' },
] as const;

const CROSS_SITES = [
  { href: 'https://trend-tube.com',  icon: 'https://trend-tube.com/icon.png',  label: 'TrendTube' },
  { href: 'https://trend-songs.com', icon: 'https://trend-songs.com/icon.png', label: 'TrendSongs' },
] as const;

export default function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentKey = pathname.startsWith('/movies') ? 'movies'
    : pathname.startsWith('/series') ? 'series'
    : pathname.startsWith('/weekly') ? 'weekly'
    : pathname.startsWith('/stats') ? 'stats'
    : pathname.startsWith('/blog') ? 'blog'
    : 'home';

  const views = NAV.map(v => ({ ...v, label: t(v.tKey) }));
  const currentLabel = views.find(v => v.key === currentKey)?.label ?? t('nav.home');

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #2A2A2A' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <img src="/icon.png" alt="TrendingShows" style={{ width: 28, height: 28, borderRadius: 6 }} />
        <span style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>
          TRENDING<span style={{ fontWeight: 400 }}>Shows</span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Autres sites du réseau (tablette + desktop) */}
        <div className="cross-sites" style={{ alignItems: 'center', gap: 10, marginRight: 6 }}>
          {CROSS_SITES.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}>
              <img
                src={s.icon}
                alt={s.label}
                style={{ width: 32, height: 32, borderRadius: 8, display: 'block', opacity: 0.8, transition: 'opacity 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
              />
            </a>
          ))}
        </div>

        {/* Desktop nav pills */}
        <div className="nav-desktop" style={{ gap: 4, backgroundColor: '#1A1A1A', borderRadius: 24, padding: 3, border: '1px solid #2A2A2A' }}>
          {views.map(v => (
            <button
              key={v.key}
              onClick={() => router.push(v.href)}
              style={{
                padding: '5px 16px', borderRadius: 20, border: 'none',
                backgroundColor: currentKey === v.key ? '#fff' : 'transparent',
                color: currentKey === v.key ? '#0F0F0F' : '#AAAAAA',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'background-color 150ms, color 150ms',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Mobile dropdown */}
        <div className="nav-mobile" ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              backgroundColor: '#1A1A1A', color: '#fff',
              border: '1px solid #2A2A2A', borderRadius: 20,
              padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {currentLabel}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
              <path d="M1 1l4 4 4-4" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A',
              borderRadius: 16, overflow: 'hidden', minWidth: 140,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 200,
            }}>
              {views.map((v, i) => (
                <button
                  key={v.key}
                  onClick={() => { router.push(v.href); setOpen(false); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '12px 18px', border: 'none',
                    borderTop: i > 0 ? '1px solid #2A2A2A' : 'none',
                    backgroundColor: currentKey === v.key ? '#242424' : 'transparent',
                    color: currentKey === v.key ? '#fff' : '#AAAAAA',
                    fontSize: 14, fontWeight: currentKey === v.key ? 700 : 500, cursor: 'pointer',
                  }}
                >
                  {v.label}
                  {currentKey === v.key && (
                    <span style={{ float: 'right', width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg,#C5001E,#E8006A)', display: 'inline-block', marginTop: 6 }} />
                  )}
                </button>
              ))}
              {/* Autres sites du réseau (mobile uniquement) */}
              <div className="cross-sites-mobile">
                {CROSS_SITES.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderTop: '1px solid #2A2A2A', color: '#AAAAAA', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
                  >
                    <img src={s.icon} alt={s.label} style={{ width: 20, height: 20, borderRadius: 5 }} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { TMDB_IMAGE_BASE } from '../constants/config';
import { slugify } from '../utils/slug';

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

export default function ArticlePage({ id }: { id: number }) {
  const { t } = useTranslation();
  const { lang } = useAppStore();
  const isFr = lang === 'fr';
  const { articles, loading, error } = useBlog();

  const article = articles.find(a => a.id === id);
  const others = articles.filter(a => a.id !== id).slice(0, 3);

  if (loading) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px' }}>
        <div className="skeleton" style={{ width: '70%', height: 28, borderRadius: 6, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: 130, height: 195, borderRadius: 10, marginBottom: 20 }} />
        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 13, borderRadius: 4, marginBottom: 8, width: `${95 - i * 8}%` }} />)}
      </div>
    </div>
  );

  if (error || !article) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>
        <p style={{ marginBottom: 16 }}>{error ?? t('blog.no_articles')}</p>
        <Link href="/blog" style={{ color: '#FF5599', fontWeight: 600, fontSize: 14 }}>← {t('blog.title')}</Link>
      </div>
    </div>
  );

  const posterUrl = article.posterPath
    ? (article.posterPath.startsWith('http') ? article.posterPath : `${TMDB_IMAGE_BASE}${article.posterPath}`)
    : null;

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 64px' }}>
        <Link href="/blog" style={{ color: '#888', fontSize: 13, textDecoration: 'none' }}>← {t('blog.title')}</Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '20px 0 10px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('blog.high_impact')}
          </span>
          <span style={{ color: '#444', fontSize: 11 }}>·</span>
          <span style={{ fontSize: 11, color: '#555', textTransform: 'capitalize' }}>
            {new Date(article.createdAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3, marginBottom: 6 }}>{article.title}</h1>
        {article.channelTitle && <p style={{ color: '#FF5599', fontSize: 15, fontWeight: 600, marginBottom: 20 }}>{article.channelTitle}</p>}

        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap' }}>
          {posterUrl && (
            <img src={posterUrl} alt={article.title} style={{ width: 150, aspectRatio: '2/3', objectFit: 'cover', borderRadius: 12, border: '1px solid #2A2A2A', flexShrink: 0 }} />
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignContent: 'flex-start', flex: 1, minWidth: 200 }}>
            {article.viewCount != null && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                <span style={{ color: '#FF5599', fontWeight: 700 }}>{formatViews(Number(article.viewCount))}</span> {t('blog.views')}
              </div>
            )}
            {article.countryCount != null && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                {t('blog.trending_in')} <span style={{ color: '#FF5599', fontWeight: 700 }}>{article.countryCount}</span> {t('blog.countries')}
              </div>
            )}
            {article.type && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                {article.type === 'movie' ? t('card.movie') : t('card.tv')}
              </div>
            )}
          </div>
        </div>

        <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.9, marginBottom: 40 }}>
          {isFr ? article.editorialFr : article.editorialEn}
        </p>

        {others.length > 0 && (
          <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 24 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{isFr ? 'Autres analyses' : 'More analyses'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {others.map(a => (
                <Link key={a.id} href={`/blog/${slugify(a.title, a.id)}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '10px 14px', textDecoration: 'none', transition: 'border-color 150ms' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#C5001E')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}
                >
                  {a.posterPath && (
                    <img
                      src={a.posterPath.startsWith('http') ? a.posterPath : `${TMDB_IMAGE_BASE}${a.posterPath}`}
                      alt={a.title}
                      style={{ width: 36, height: 54, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                    />
                  )}
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', color: '#fff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</span>
                    <span style={{ display: 'block', color: '#888', fontSize: 12 }}>{a.channelTitle}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

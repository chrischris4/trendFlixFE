'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import MovieCard from './MovieCard';
import { useTrending } from '../hooks/useTrending';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { TMDB_IMAGE_BASE } from '../constants/config';

interface Props { type: 'movie' | 'tv' }

export default function TrendingPage({ type }: Props) {
  const { t } = useTranslation();
  const { items, loading, error } = useTrending(type, 40);
  const { articles } = useBlog();
  const lang = useAppStore(s => s.lang);

  const featuredArticle = useMemo(() => {
    const filtered = articles.filter(a => a.type === type);
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }, [articles, type]);

  const title      = type === 'movie' ? t('movies.title')       : t('series.title');
  const subtitle   = type === 'movie' ? t('movies.subtitle')    : t('series.subtitle');
  const countLabel = type === 'movie' ? t('movies.count_label') : t('series.count_label');

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{title}</h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>{subtitle}</p>

        {!loading && !error && (
          <div style={{ marginBottom: 20 }}>
            <span style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#AAAAAA' }}>
              {items.length} {countLabel}
            </span>
          </div>
        )}

        {featuredArticle && (
          <a href="/blog" style={{ display: 'block', textDecoration: 'none', marginBottom: 24 }}>
            <div
              style={{ display: 'flex', gap: 14, alignItems: 'center', backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '12px 14px', transition: 'border-color 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#C5001E')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}
            >
              {featuredArticle.posterPath && (
                <img
                  src={featuredArticle.posterPath.startsWith('http') ? featuredArticle.posterPath : `${TMDB_IMAGE_BASE}${featuredArticle.posterPath}`}
                  alt={featuredArticle.title}
                  style={{ width: 54, height: 80, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {lang === 'fr' ? 'Article du blog' : 'Blog post'}
                </span>
                <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: '3px 0 4px', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                  {featuredArticle.title}
                </p>
                <p style={{ color: '#888', fontSize: 12, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>
                  {lang === 'fr' ? featuredArticle.editorialFr : featuredArticle.editorialEn}
                </p>
              </div>
            </div>
          </a>
        )}

        {error && (
          <div style={{ color: '#C5001E', fontSize: 14, padding: '20px 0' }}>{error}</div>
        )}

        {loading ? (
          <div className="grid-cards">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>
                <div className="skeleton" style={{ aspectRatio: '2/3', borderRadius: 10, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 13, borderRadius: 4, marginBottom: 6, width: '80%' }} />
                <div className="skeleton" style={{ height: 11, borderRadius: 4, width: '40%' }} />
              </div>
            ))}
          </div>
        ) : items.length === 0 && !error ? (
          <div style={{ color: '#555', textAlign: 'center', paddingTop: 80 }}>{t('trending.empty')}</div>
        ) : (
          <div className="grid-cards">
            {items.map(item => <MovieCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

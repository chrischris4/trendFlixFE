'use client';

import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import TypeFilter from '../components/TypeFilter';
import GenreFilter from '../components/GenreFilter';
import InsightBar from '../components/InsightBar';
import EditorialSection from '../components/EditorialSection';
import LatestArticles from '../components/LatestArticles';
import { useTrending } from '../hooks/useTrending';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { MOVIE_GENRES, TV_GENRES, TMDB_IMAGE_BASE } from '../constants/config';
import { articleExcerpt, articleTitle, heroItem } from '../utils/blog';

type MediaType = 'movie' | 'tv';

function HomeContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const mediaType: MediaType = searchParams.get('type') === 'series' ? 'tv' : 'movie';
  const genreSlug = searchParams.get('genre');
  const genreList = mediaType === 'tv' ? TV_GENRES : MOVIE_GENRES;
  const genreDef = genreSlug ? (genreList.find(g => g.slug === genreSlug) ?? null) : null;
  const genreId = genreDef?.id ?? null;

  const { items, loading, error } = useTrending(mediaType, 100);
  const { articles } = useBlog();
  const lang = useAppStore(s => s.lang);
  const isFr = lang === 'fr';

  const featuredArticle = useMemo(() => {
    const filtered = articles.filter(a => a.type === mediaType);
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }, [articles, mediaType]);
  const featuredHero = featuredArticle ? heroItem(featuredArticle) : undefined;
  const featuredPoster = featuredHero?.posterPath ?? featuredArticle?.posterPath;
  const featuredTitle = featuredArticle ? articleTitle(featuredArticle, isFr) : '';

  const filtered = useMemo(() => {
    if (genreId === null) return items;
    return items.filter(item => item.genreIds.includes(genreId));
  }, [items, genreId]);

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header />
        <div className="filter-bar">
          <TypeFilter selected={mediaType} genreSlug={genreSlug} />
          <GenreFilter mediaType={mediaType} selected={genreSlug} />
        </div>
      </div>

      {!loading && !error && items.length > 0 && (
        <>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px 0' }}>
            <h1 style={{ color: '#fff', fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 800, lineHeight: 1.3 }}>
              {t('home.discover_title')}
            </h1>
          </div>
          <div className="insight-bar">
            <InsightBar items={items} type={mediaType} />
          </div>
        </>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 16px 64px' }}>
        {featuredArticle && (
          <a href="/blog" style={{ display: 'block', textDecoration: 'none', marginBottom: 24 }}>
            <div
              style={{ display: 'flex', gap: 14, alignItems: 'center', backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '12px 14px', transition: 'border-color 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#C5001E')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}
            >
              {featuredPoster && (
                <img
                  src={featuredPoster.startsWith('http') ? featuredPoster : `${TMDB_IMAGE_BASE}${featuredPoster}`}
                  alt={featuredTitle}
                  style={{ width: 54, height: 80, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {lang === 'fr' ? 'Article du blog' : 'Blog post'}
                </span>
                <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: '3px 0 4px', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                  {featuredTitle}
                </p>
                <p style={{ color: '#888', fontSize: 12, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>
                  {articleExcerpt(featuredArticle, isFr)}
                </p>
              </div>
            </div>
          </a>
        )}

        {error && <p style={{ color: '#C5001E', fontSize: 14, marginBottom: 20 }}>{error}</p>}

        {loading ? (
          <div className="grid-cards">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i}>
                <div className="skeleton" style={{ aspectRatio: '2/3', borderRadius: 10, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 13, borderRadius: 4, marginBottom: 6, width: '80%' }} />
                <div className="skeleton" style={{ height: 11, borderRadius: 4, width: '40%' }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 && !error ? (
          <div style={{ color: '#555', textAlign: 'center', paddingTop: 80, fontSize: 14 }}>{t('trending.empty')}</div>
        ) : (
          <div className="grid-cards">
            {filtered.map(item => <MovieCard key={item.id} item={item} />)}
          </div>
        )}
      </div>

      <LatestArticles />

      <EditorialSection page="home" />

      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }} />}>
      <HomeContent />
    </Suspense>
  );
}

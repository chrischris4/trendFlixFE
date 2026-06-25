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
import { useTrending } from '../hooks/useTrending';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';

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

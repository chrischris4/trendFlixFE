'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import MovieCard from './MovieCard';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';
import { useTrending } from '../hooks/useTrending';

interface Props { genre: string; type: 'movie' | 'tv' }

export default function GenrePage({ genre, type }: Props) {
  const { t } = useTranslation();
  const { items: all, loading, error } = useTrending(type, 40);

  const genreList = type === 'movie' ? MOVIE_GENRES : TV_GENRES;
  const genreDef = genreList.find(g => g.slug === genre);

  const items = useMemo(() => {
    if (!genreDef) return [];
    return all.filter(item => item.genreIds.includes(genreDef.id));
  }, [all, genreDef]);

  const genreLabel = genreDef ? `${genreDef.emoji} ${genreDef.label}` : genre;
  const title = type === 'movie'
    ? t('genre.movies_title', { genre: genreLabel })
    : t('genre.series_title', { genre: genreLabel });

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{title}</h1>
        {!loading && !error && <p style={{ color: '#888', fontSize: 13, marginBottom: 28 }}>{t('genre.results', { count: items.length })}</p>}

        {error && <p style={{ color: '#C5001E', fontSize: 14, marginBottom: 20 }}>{error}</p>}

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
          <div style={{ color: '#555', textAlign: 'center', paddingTop: 80 }}>{t('genre.empty')}</div>
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

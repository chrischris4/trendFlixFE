'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import MovieCard from './MovieCard';
import { MOVIE_GENRES, TV_GENRES, genreLabel as genreName } from '../constants/config';
import { useTrending } from '../hooks/useTrending';

interface Props { genre: string; type: 'movie' | 'tv' }

export default function GenrePage({ genre, type }: Props) {
  const { t, i18n } = useTranslation();
  const { items: all, loading, error } = useTrending(type, 40);

  const genreList = type === 'movie' ? MOVIE_GENRES : TV_GENRES;
  const genreDef = genreList.find(g => g.slug === genre);

  const items = useMemo(() => {
    if (!genreDef) return [];
    return all.filter(item => item.genreIds.includes(genreDef.id));
  }, [all, genreDef]);

  const label = genreDef ? `${genreDef.emoji} ${genreName(genreDef, i18n.language)}` : genre;
  const title = type === 'movie'
    ? t('genre.movies_title', { genre: label })
    : t('genre.series_title', { genre: label });
  const analysis = useMemo(() => {
    if (!items.length) return null;
    const rated = items.filter(item => item.voteAverage != null && item.voteAverage > 0);
    const average = rated.length
      ? rated.reduce((sum, item) => sum + Number(item.voteAverage), 0) / rated.length
      : null;
    const languages = new Set(items.map(item => item.originalLanguage).filter(Boolean)).size;
    const leader = items[0]?.title;
    const isFr = i18n.language === 'fr';

    return isFr
      ? `${leader} ouvre actuellement cette sélection de ${items.length} ${type === 'movie' ? 'films' : 'séries'}. ${average ? `La note moyenne des titres évalués atteint ${average.toFixed(1)} sur 10.` : ''} Le classement réunit ${languages} langue${languages > 1 ? 's' : ''} originale${languages > 1 ? 's' : ''}, un indicateur utile pour distinguer un phénomène mondial d’une tendance concentrée sur un seul marché.`
      : `${leader} currently leads this selection of ${items.length} ${type === 'movie' ? 'movies' : 'series'}. ${average ? `The average rating among scored titles is ${average.toFixed(1)} out of 10.` : ''} The ranking includes ${languages} original language${languages > 1 ? 's' : ''}, a useful signal for separating worldwide momentum from attention concentrated in one market.`;
  }, [items, type, i18n.language]);

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

        {analysis && (
          <section style={{ maxWidth: 800, marginTop: 48, paddingTop: 28, borderTop: '1px solid #2A2A2A' }}>
            <h2 style={{ color: '#fff', fontSize: 19, marginBottom: 10 }}>
              {i18n.language === 'fr' ? `Ce que révèle le classement ${label}` : `What the ${label} ranking reveals`}
            </h2>
            <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8 }}>{analysis}</p>
            <a href="/methodology" style={{ color: '#FF5599', fontSize: 13 }}>
              {i18n.language === 'fr' ? 'Comprendre notre méthodologie' : 'Read our methodology'}
            </a>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

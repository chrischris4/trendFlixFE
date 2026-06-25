'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { useStats } from '../hooks/useStats';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';
import { slugify } from '../utils/slug';
import type { GenreStat } from '../types';

function GenreBar({ genreId, count, pct, label }: GenreStat & { label: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: '#ddd', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#888' }}>{count} · {pct}%</span>
      </div>
      <div style={{ height: 5, backgroundColor: '#1A1A1A', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #C5001E, #E8006A)', borderRadius: 3 }} />
      </div>
    </div>
  );
}

export default function StatsPage() {
  const { t } = useTranslation();
  const { stats, loading, error } = useStats();

  const resolveGenre = (list: typeof MOVIE_GENRES | typeof TV_GENRES, id: number) =>
    (list as unknown as { id: number; label: string }[]).find(g => g.id === id)?.label ?? `Genre ${id}`;

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{t('stats.title')}</h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 32, lineHeight: 1.6 }}>{t('stats.subtitle')}</p>

        {error && <p style={{ color: '#C5001E', fontSize: 14 }}>{error}</p>}

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
            {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 10 }} />)}
          </div>
        ) : stats ? (
          <>
            {/* Counters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
              {[
                { label: t('stats.total_movies'), value: stats.movies },
                { label: t('stats.total_shows'),  value: stats.shows },
                { label: t('stats.stat_content_label'), value: t('stats.stat_content') },
                { label: t('stats.stat_update_label'),  value: t('stats.stat_update') },
              ].map(({ label, value }) => (
                <div key={label} style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '20px 18px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: 12, color: '#AAAAAA' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Top 5 movies & shows */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
              {[
                { title: `🎬 ${t('stats.top_movies')}`, items: stats.topMovies, base: 'movies' },
                { title: `📺 ${t('stats.top_shows')}`,  items: stats.topShows,  base: 'series' },
              ].map(({ title, items, base }) => (
                <div key={title}>
                  <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{title}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map((item, i) => {
                      const inner = (
                        <>
                          <span style={{ fontWeight: 800, color: '#C5001E', minWidth: 22, fontSize: 13 }}>#{i + 1}</span>
                          <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: '#fff' }}>{item.title}</span>
                          <span style={{ color: '#F5C518', fontWeight: 700, fontSize: 12 }}>★ {item.voteAverage.toFixed(1)}</span>
                        </>
                      );
                      const cardStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 8, padding: '10px 14px', textDecoration: 'none', transition: 'border-color 150ms' };
                      return item.tmdbId ? (
                        <Link key={item.title} href={`/${base}/${slugify(item.title, item.tmdbId)}`} style={cardStyle}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#444'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'}
                        >{inner}</Link>
                      ) : (
                        <div key={item.title} style={cardStyle}>{inner}</div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Top genres */}
            {(stats.topMovieGenres?.length > 0 || stats.topShowGenres?.length > 0) && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>
                  {t('stats.top_genres') || 'Top catégories'}
                </h2>
                <p style={{ color: '#555', fontSize: 12, marginBottom: 24 }}>
                  {t('stats.top_genres_sub') || 'Distribution des genres parmi les titres tendance actuels.'}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
                  {stats.topMovieGenres?.length > 0 && (
                    <div>
                      <h3 style={{ color: '#AAAAAA', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
                        {t('stats.movies_label')}
                      </h3>
                      {stats.topMovieGenres.map(g => (
                        <GenreBar key={g.genreId} {...g} label={resolveGenre(MOVIE_GENRES, g.genreId)} />
                      ))}
                    </div>
                  )}
                  {stats.topShowGenres?.length > 0 && (
                    <div>
                      <h3 style={{ color: '#AAAAAA', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
                        {t('stats.shows_label')}
                      </h3>
                      {stats.topShowGenres.map(g => (
                        <GenreBar key={g.genreId} {...g} label={resolveGenre(TV_GENRES, g.genreId)} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

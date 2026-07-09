'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { useStats } from '../hooks/useStats';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';
import { slugify } from '../utils/slug';
import type { GenreStat } from '../types';

const LANG_NAMES: Record<string, string> = {
  en: 'Anglais', fr: 'Français', ko: 'Coréen', ja: 'Japonais', es: 'Espagnol',
  hi: 'Hindi', zh: 'Chinois', de: 'Allemand', it: 'Italien', pt: 'Portugais',
  ru: 'Russe', ar: 'Arabe', tr: 'Turc', th: 'Thaï', pl: 'Polonais',
};

function Bar({ pct, color = 'linear-gradient(90deg,#C5001E,#E8006A)' }: { pct: number; color?: string }) {
  return (
    <div style={{ height: 5, backgroundColor: '#1A1A1A', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 600ms ease' }} />
    </div>
  );
}

function GenreBar({ genreId, count, pct, label }: GenreStat & { label: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: '#ddd', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#888' }}>{count} · {pct}%</span>
      </div>
      <Bar pct={pct} />
    </div>
  );
}

function StatCard({ value, label, sub }: { value: string | number; label: string; sub?: string }) {
  return (
    <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '20px 18px', textAlign: 'center' }}>
      <div style={{ fontSize: 28, fontWeight: 900, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: '#AAAAAA' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function StatsPage() {
  const { t } = useTranslation();
  const { stats, loading, error } = useStats();

  const resolveGenre = (list: typeof MOVIE_GENRES | typeof TV_GENRES, id: number) =>
    (list as unknown as { id: number; label: string }[]).find(g => g.id === id)?.label ?? `Genre ${id}`;

  const cardStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 12,
    backgroundColor: '#141414', border: '1px solid #2A2A2A',
    borderRadius: 8, padding: '10px 14px', textDecoration: 'none', transition: 'border-color 150ms',
  };

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{t('stats.title')}</h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 32, lineHeight: 1.6 }}>{t('stats.subtitle')}</p>

        {error && <p style={{ color: '#C5001E', fontSize: 14 }}>{error}</p>}

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 10 }} />)}
          </div>
        ) : stats ? (
          <>
            {/* Counters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 40 }}>
              <StatCard value={stats.movies} label={t('stats.total_movies')} />
              <StatCard value={stats.shows} label={t('stats.total_shows')} />
              <StatCard value={`★ ${stats.avgMovieRating}`} label="Note moy. films" />
              <StatCard value={`★ ${stats.avgShowRating}`} label="Note moy. séries" />
              <StatCard value={`+${stats.newThisWeek}`} label="Nouvelles entrées" sub="vs hier" />
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
                          <span style={{ color: '#F5C518', fontWeight: 700, fontSize: 12 }}>★ {item.voteAverage?.toFixed(1)}</span>
                        </>
                      );
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
                <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Top catégories</h2>
                <p style={{ color: '#555', fontSize: 12, marginBottom: 24 }}>Distribution des genres parmi les titres tendance actuels.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
                  {stats.topMovieGenres?.length > 0 && (
                    <div>
                      <h3 style={{ color: '#AAAAAA', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>{t('stats.movies_label')}</h3>
                      {stats.topMovieGenres.map(g => <GenreBar key={g.genreId} {...g} label={resolveGenre(MOVIE_GENRES, g.genreId)} />)}
                    </div>
                  )}
                  {stats.topShowGenres?.length > 0 && (
                    <div>
                      <h3 style={{ color: '#AAAAAA', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>{t('stats.shows_label')}</h3>
                      {stats.topShowGenres.map(g => <GenreBar key={g.genreId} {...g} label={resolveGenre(TV_GENRES, g.genreId)} />)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Languages */}
            {stats.topLanguages?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Langues d'origine</h2>
                <p style={{ color: '#555', fontSize: 12, marginBottom: 20 }}>Répartition linguistique des contenus tendance cette semaine.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {stats.topLanguages.map(({ lang, count, pct }) => (
                    <div key={lang}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                        <span style={{ color: '#ddd', fontWeight: 600 }}>{LANG_NAMES[lang] ?? lang.toUpperCase()}</span>
                        <span style={{ color: '#888' }}>{count} titre{count > 1 ? 's' : ''} · {pct}%</span>
                      </div>
                      <Bar pct={pct} color="linear-gradient(90deg,#1d6fa4,#3ab0e8)" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Year distribution */}
            {stats.yearDistribution?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Années de sortie</h2>
                <p style={{ color: '#555', fontSize: 12, marginBottom: 20 }}>Les contenus tendance sont-ils récents ou des classiques revisités ?</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120, paddingTop: 20 }}>
                  {stats.yearDistribution.map(({ year, count, pct }) => (
                    <div key={year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#888', fontSize: 10 }}>{count}</span>
                      <div style={{ width: '100%', background: 'linear-gradient(180deg,#C5001E,#E8006A)', borderRadius: '4px 4px 0 0', height: `${Math.max(8, pct * 1.8)}px`, transition: 'height 600ms ease' }} />
                      <span style={{ color: '#555', fontSize: 10, fontWeight: 600 }}>{year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Last updated */}
            <p style={{ color: '#333', fontSize: 11, textAlign: 'center' }}>
              Dernière mise à jour : {new Date(stats.lastUpdated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

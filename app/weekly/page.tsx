'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTrending } from '../../hooks/useTrending';
import { useStats } from '../../hooks/useStats';
import { MOVIE_GENRES, TV_GENRES, TMDB_IMAGE_BASE, genreLabel } from '../../constants/config';
import { slugify } from '../../utils/slug';

const LANG_NAMES_FR: Record<string, string> = {
  en: 'anglais', fr: 'français', ko: 'coréen', ja: 'japonais', es: 'espagnol',
  hi: 'hindi', zh: 'chinois', de: 'allemand', it: 'italien', pt: 'portugais',
};
const LANG_NAMES_EN: Record<string, string> = {
  en: 'English', fr: 'French', ko: 'Korean', ja: 'Japanese', es: 'Spanish',
  hi: 'Hindi', zh: 'Chinese', de: 'German', it: 'Italian', pt: 'Portuguese',
};

function getWeekLabel(isFr: boolean) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long' });
  return `${fmt(start)} – ${fmt(end)} ${now.getFullYear()}`;
}

export default function WeeklyPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const lang = isFr ? 'fr' : 'en';
  const LANG_NAMES = isFr ? LANG_NAMES_FR : LANG_NAMES_EN;
  const { items: movies } = useTrending('movie', 20);
  const { items: shows } = useTrending('tv', 20);
  const { stats } = useStats();

  const topMovie = movies[0];
  const topShow = shows[0];

  const topMovieGenre = useMemo(() => {
    if (!stats?.topMovieGenres?.length) return null;
    const g = stats.topMovieGenres[0];
    return MOVIE_GENRES.find(m => m.id === g.genreId);
  }, [stats]);

  const topShowGenre = useMemo(() => {
    if (!stats?.topShowGenres?.length) return null;
    const g = stats.topShowGenres[0];
    return TV_GENRES.find(m => m.id === g.genreId);
  }, [stats]);

  const topLang = stats?.topLanguages?.[0];
  const langName = topLang ? (LANG_NAMES[topLang.lang] ?? topLang.lang) : null;

  const sec: React.CSSProperties = { marginBottom: 40 };
  const h2: React.CSSProperties = { color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 12, lineHeight: 1.3 };
  const body: React.CSSProperties = { color: '#AAAAAA', fontSize: 14, lineHeight: 1.8, marginBottom: 16 };
  const hl: React.CSSProperties = { color: '#fff', fontWeight: 600 };
  const red: React.CSSProperties = { color: '#C5001E', fontWeight: 700 };

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 16px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: '#C5001E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
            {isFr ? 'Rapport hebdomadaire' : 'Weekly report'}
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 10 }}>
            {isFr ? 'Tendances mondiales :' : 'Global trends:'}<br />{isFr ? 'semaine du' : 'week of'} {getWeekLabel(isFr)}
          </h1>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7 }}>
            {isFr
              ? 'Chaque semaine, TrendingShows analyse les données de popularité mondiale pour identifier les films et séries qui dominent les plateformes de streaming. Voici le décryptage complet de cette semaine.'
              : 'Every week, TrendingShows analyzes global popularity data to identify the movies and shows dominating streaming platforms. Here is this week\'s full breakdown.'}
          </p>
          <div style={{ height: 2, background: 'linear-gradient(90deg,#C5001E,#E8006A)', borderRadius: 1, marginTop: 24 }} />
        </div>

        {/* Top film de la semaine */}
        {topMovie && (
          <div style={sec}>
            <h2 style={h2}>🎬 {isFr ? 'Film de la semaine' : 'Movie of the week'}</h2>
            <Link href={`/movies/${slugify(topMovie.title, topMovie.tmdbId)}`} style={{ display: 'flex', gap: 20, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', marginBottom: 16 }}>
              {topMovie.posterPath && (
                <img src={`${TMDB_IMAGE_BASE}${topMovie.posterPath}`} alt={topMovie.title} loading="lazy"
                  style={{ width: 100, objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ padding: '16px 16px 16px 0', flex: 1 }}>
                <div style={{ color: '#C5001E', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  {isFr ? '#1 mondial cette semaine' : '#1 worldwide this week'}
                </div>
                <div style={{ color: '#fff', fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{topMovie.title}</div>
                {topMovie.voteAverage != null && topMovie.voteAverage > 0 && (
                  <div style={{ color: '#F5C518', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>★ {topMovie.voteAverage.toFixed(1)}/10</div>
                )}
                {topMovie.overview && (
                  <p style={{ color: '#888', fontSize: 12, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {topMovie.overview}
                  </p>
                )}
              </div>
            </Link>
            <p style={body}>
              {isFr ? <>
                <span style={hl}>{topMovie.title}</span> s'impose comme le film incontournable de cette semaine avec une popularité mondiale record.{' '}
                {topMovie.voteAverage != null && topMovie.voteAverage > 0 && <>Noté <span style={red}>★ {topMovie.voteAverage.toFixed(1)}/10</span> par les spectateurs, </>}
                il confirme l'engouement du public pour ce type de production.{' '}
                {topMovie.releaseDate ? <>Sorti en <span style={hl}>{topMovie.releaseDate.substring(0, 4)}</span>, il</> : 'Il'}{' '}
                fait partie des {movies.length} films qui composent le classement mondial de cette semaine.
              </> : <>
                <span style={hl}>{topMovie.title}</span> stands out as this week's unmissable film with record worldwide popularity.{' '}
                {topMovie.voteAverage != null && topMovie.voteAverage > 0 && <>Rated <span style={red}>★ {topMovie.voteAverage.toFixed(1)}/10</span> by viewers, </>}
                it confirms the audience's appetite for this kind of production.{' '}
                {topMovie.releaseDate ? <>Released in <span style={hl}>{topMovie.releaseDate.substring(0, 4)}</span>, it</> : 'It'}{' '}
                is one of the {movies.length} films making up this week's global ranking.
              </>}
            </p>
          </div>
        )}

        {/* Top série de la semaine */}
        {topShow && (
          <div style={sec}>
            <h2 style={h2}>📺 {isFr ? 'Série de la semaine' : 'Show of the week'}</h2>
            <Link href={`/series/${slugify(topShow.title, topShow.tmdbId)}`} style={{ display: 'flex', gap: 20, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', marginBottom: 16 }}>
              {topShow.posterPath && (
                <img src={`${TMDB_IMAGE_BASE}${topShow.posterPath}`} alt={topShow.title} loading="lazy"
                  style={{ width: 100, objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ padding: '16px 16px 16px 0', flex: 1 }}>
                <div style={{ color: '#1db954', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                  {isFr ? '#1 série mondiale' : '#1 show worldwide'}
                </div>
                <div style={{ color: '#fff', fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{topShow.title}</div>
                {topShow.voteAverage != null && topShow.voteAverage > 0 && (
                  <div style={{ color: '#F5C518', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>★ {topShow.voteAverage.toFixed(1)}/10</div>
                )}
                {topShow.overview && (
                  <p style={{ color: '#888', fontSize: 12, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {topShow.overview}
                  </p>
                )}
              </div>
            </Link>
            <p style={body}>
              {isFr ? <>
                Du côté des séries, <span style={hl}>{topShow.title}</span> domine le classement mondial cette semaine.{' '}
                {topShow.voteAverage != null && topShow.voteAverage > 0 ? <>Avec <span style={red}>★ {topShow.voteAverage.toFixed(1)}/10</span>, elle </> : 'Elle '}
                attire des millions de spectateurs à travers le monde et confirme la force de ce format narratif dans le paysage audiovisuel actuel.
              </> : <>
                On the series side, <span style={hl}>{topShow.title}</span> dominates this week's global ranking.{' '}
                {topShow.voteAverage != null && topShow.voteAverage > 0 ? <>With <span style={red}>★ {topShow.voteAverage.toFixed(1)}/10</span>, it </> : 'It '}
                draws millions of viewers worldwide and confirms the strength of this narrative format in today's landscape.
              </>}
            </p>
          </div>
        )}

        {/* Analyse des genres */}
        {(topMovieGenre || topShowGenre) && (
          <div style={sec}>
            <h2 style={h2}>🎭 {isFr ? 'Quels genres dominent cette semaine ?' : 'Which genres dominate this week?'}</h2>
            <p style={body}>
              {isFr ? <>
                L'analyse des genres révèle des tendances claires sur les préférences du public mondial en ce moment.{' '}
                {topMovieGenre && <>Du côté des films, le genre <span style={hl}>{genreLabel(topMovieGenre, lang)}</span> domine avec <span style={red}>{stats?.topMovieGenres?.[0]?.pct}%</span> des titres tendance.{' '}</>}
                {topShowGenre && <>Pour les séries, c'est le genre <span style={hl}>{genreLabel(topShowGenre, lang)}</span> qui s'impose avec <span style={red}>{stats?.topShowGenres?.[0]?.pct}%</span> de représentation dans le top mondial.</>}
              </> : <>
                Genre analysis reveals clear patterns in the global audience's current preferences.{' '}
                {topMovieGenre && <>On the movie side, the <span style={hl}>{genreLabel(topMovieGenre, lang)}</span> genre dominates with <span style={red}>{stats?.topMovieGenres?.[0]?.pct}%</span> of trending titles.{' '}</>}
                {topShowGenre && <>For series, <span style={hl}>{genreLabel(topShowGenre, lang)}</span> leads with <span style={red}>{stats?.topShowGenres?.[0]?.pct}%</span> representation in the global top.</>}
              </>}
            </p>
            {stats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                {[
                  { title: isFr ? 'Films' : 'Movies', genres: stats.topMovieGenres?.slice(0, 4), list: MOVIE_GENRES, base: 'movies' },
                  { title: isFr ? 'Séries' : 'Shows', genres: stats.topShowGenres?.slice(0, 4), list: TV_GENRES, base: 'series' },
                ].map(({ title, genres, list, base }) => genres?.length ? (
                  <div key={title} style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '16px 18px' }}>
                    <div style={{ color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{title}</div>
                    {genres.map((g, i) => {
                      const def = (list as unknown as { id: number; label: string; labelEn: string; slug: string }[]).find(x => x.id === g.genreId);
                      return (
                        <div key={g.genreId} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{ color: '#C5001E', fontWeight: 800, fontSize: 12, minWidth: 18 }}>#{i + 1}</span>
                          <Link href={`/${base}/genre/${def?.slug ?? ''}`} style={{ color: '#ddd', fontSize: 13, fontWeight: 600, textDecoration: 'none', flex: 1 }}>
                            {def ? genreLabel(def, lang) : g.genreId}
                          </Link>
                          <span style={{ color: '#555', fontSize: 12 }}>{g.pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null)}
              </div>
            )}
          </div>
        )}

        {/* Diversité linguistique */}
        {langName && stats && (
          <div style={sec}>
            <h2 style={h2}>🌍 {isFr ? 'Diversité linguistique' : 'Language diversity'}</h2>
            <p style={body}>
              {isFr ? <>
                Le streaming mondial ne se limite plus aux productions anglophones. Cette semaine,{' '}
                <span style={hl}>{langName.charAt(0).toUpperCase() + langName.slice(1)}</span> est la langue dominante avec{' '}
                <span style={red}>{stats.topLanguages?.[0]?.pct}%</span> des contenus tendance.{' '}
                {stats.topLanguages?.length > 1 && <>
                  Les productions en <span style={hl}>{LANG_NAMES[stats.topLanguages[1]?.lang] ?? stats.topLanguages[1]?.lang}</span> arrivent en deuxième position ({stats.topLanguages[1]?.pct}%),{' '}
                  illustrant la montée en puissance des contenus non-anglophones sur les plateformes mondiales.
                </>}
              </> : <>
                Global streaming is no longer limited to English-language productions. This week,{' '}
                <span style={hl}>{langName.charAt(0).toUpperCase() + langName.slice(1)}</span> is the dominant language with{' '}
                <span style={red}>{stats.topLanguages?.[0]?.pct}%</span> of trending content.{' '}
                {stats.topLanguages?.length > 1 && <>
                  Productions in <span style={hl}>{LANG_NAMES[stats.topLanguages[1]?.lang] ?? stats.topLanguages[1]?.lang}</span> come second ({stats.topLanguages[1]?.pct}%),{' '}
                  illustrating the rise of non-English content on global platforms.
                </>}
              </>}
            </p>
          </div>
        )}

        {/* Top 5 rapide */}
        {movies.length > 0 && shows.length > 0 && (
          <div style={sec}>
            <h2 style={h2}>📊 {isFr ? 'Top 5 de la semaine' : 'Top 5 of the week'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {[
                { title: isFr ? 'Films' : 'Movies', items: movies.slice(0, 5), base: 'movies' },
                { title: isFr ? 'Séries' : 'Shows', items: shows.slice(0, 5), base: 'series' },
              ].map(({ title, items, base }) => (
                <div key={title}>
                  <div style={{ color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{title}</div>
                  {items.map((item, i) => (
                    <Link key={item.id} href={`/${base}/${slugify(item.title, item.tmdbId)}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #1A1A1A', textDecoration: 'none' }}>
                      <span style={{ color: '#C5001E', fontWeight: 800, fontSize: 13, minWidth: 22 }}>#{i + 1}</span>
                      <span style={{ color: '#ddd', fontSize: 13, fontWeight: 600, flex: 1 }}>{item.title}</span>
                      {item.voteAverage != null && item.voteAverage > 0 && (
                        <span style={{ color: '#F5C518', fontSize: 12, fontWeight: 700 }}>★ {item.voteAverage.toFixed(1)}</span>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '24px 28px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{isFr ? 'Explorez tous les contenus tendance' : 'Explore all trending content'}</p>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>
            {isFr ? 'Filtrez par genre, type et découvrez les détails de chaque titre.' : 'Filter by genre and type, and discover each title\'s details.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ backgroundColor: '#C5001E', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              {isFr ? 'Voir tous les films' : 'See all movies'}
            </Link>
            <Link href="/?type=series" style={{ backgroundColor: '#1A1A1A', color: '#fff', border: '1px solid #2A2A2A', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              {isFr ? 'Voir toutes les séries' : 'See all shows'}
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

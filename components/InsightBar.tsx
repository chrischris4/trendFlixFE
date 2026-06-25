'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';
import type { TrendingItem } from '../types';

interface Props {
  items: TrendingItem[];
  type: 'movie' | 'tv';
}

const INSIGHTS: Record<'movie' | 'tv', { fr: string; en: string }> = {
  movie: {
    fr: 'Le classement mondial des films est actualisé chaque jour à partir des données de popularité et de vote de TMDB. Il reflète les tendances réelles du moment sur les plateformes de streaming et en salle.',
    en: 'The global movie ranking is updated daily from TMDB popularity and vote data. It reflects real-time trends across streaming platforms and theaters worldwide.',
  },
  tv: {
    fr: 'Le classement mondial des séries est actualisé chaque jour. Il agrège les données de popularité mondiales pour vous donner une vue unique sur ce que le monde regarde en ce moment.',
    en: 'The global TV shows ranking is updated daily. It aggregates worldwide popularity data to give you a unique view of what the world is watching right now.',
  },
};

export default function InsightBar({ items, type }: Props) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  const stats = useMemo(() => {
    if (items.length === 0) return null;

    const top = items[0];
    const avgVote = items.reduce((s, i) => s + (i.voteAverage ?? 0), 0) / items.length;

    // Top genres
    const genreList = type === 'movie' ? MOVIE_GENRES : TV_GENRES;
    const genreCounts = new Map<number, number>();
    for (const item of items) {
      for (const gId of item.genreIds) {
        genreCounts.set(gId, (genreCounts.get(gId) ?? 0) + 1);
      }
    }
    const topGenres = [...genreCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, count]) => {
        const def = genreList.find(g => g.id === id);
        return { name: def?.label ?? id, pct: Math.round((count / items.length) * 100) };
      });

    // Most represented original language
    const langCounts = new Map<string, number>();
    for (const item of items) {
      if (item.originalLanguage) langCounts.set(item.originalLanguage, (langCounts.get(item.originalLanguage) ?? 0) + 1);
    }
    const topLang = [...langCounts.entries()].sort((a, b) => b[1] - a[1])[0];

    return { top, avgVote, topGenres, topLang };
  }, [items, type]);

  if (!stats) return null;

  const hi = (text: string) => <span style={{ color: '#ddd', fontWeight: 500 }}>{text}</span>;
  const num = (text: string) => <span style={{ color: '#C5001E', fontWeight: 600 }}>{text}</span>;
  const editorial = INSIGHTS[type][isFr ? 'fr' : 'en'];

  const topRating = stats.top.voteAverage != null ? stats.top.voteAverage.toFixed(1) : null;

  const insightText = isFr
    ? <>{hi(`« ${stats.top.title} »`)} est en tête du classement{topRating && <> avec {num(`★ ${topRating}`)}</>}.{' '}
        Note moyenne du top {num(`${items.length}`)} : {num(stats.avgVote.toFixed(1))}/10.{' '}
        {stats.topLang && <>Langue dominante : {num(stats.topLang[0].toUpperCase())} ({stats.topLang[1]} titres).</>}</>
    : <>{hi(`"${stats.top.title}"`)} leads the ranking{topRating && <> with {num(`★ ${topRating}`)}</>}.{' '}
        Average rating across top {num(`${items.length}`)}: {num(stats.avgVote.toFixed(1))}/10.{' '}
        {stats.topLang && <>Dominant language: {num(stats.topLang[0].toUpperCase())} ({stats.topLang[1]} titles).</>}</>;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 16px 12px' }}>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 8, lineHeight: 1.6, fontStyle: 'italic' }}>
        {editorial}
      </p>
      <p style={{ color: '#AAAAAA', fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
        {insightText}
      </p>
      {stats.topGenres.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {stats.topGenres.map((g, i) => (
            <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 12px' }}>
              <span style={{ color: '#C5001E', fontWeight: 700, fontSize: 12 }}>#{i + 1}</span>
              <span style={{ color: '#ddd', fontSize: 12, fontWeight: 600 }}>{g.name}</span>
              <span style={{ color: '#555', fontSize: 11 }}>{g.pct}%</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ height: 1, background: 'linear-gradient(90deg, #C5001E, #E8006A)' }} />
    </div>
  );
}

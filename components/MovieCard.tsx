'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { TrendingItem } from '../types';
import { TMDB_IMAGE_BASE } from '../constants/config';
import { slugify } from '../utils/slug';

interface Props { item: TrendingItem }

export default function MovieCard({ item }: Props) {
  const { t } = useTranslation();
  const posterUrl = item.posterPath ? `${TMDB_IMAGE_BASE}${item.posterPath}` : null;
  const rating = item.voteAverage ? item.voteAverage.toFixed(1) : null;

  const href = item.type === 'movie'
    ? `/movies/${slugify(item.title, item.tmdbId)}`
    : `/series/${slugify(item.title, item.tmdbId)}`;

  return (
    <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
    <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, overflow: 'hidden', transition: 'border-color 160ms' }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#444'}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#2A2A2A'}
    >
      <div style={{ position: 'relative', aspectRatio: '2/3', backgroundColor: '#1A1A1A' }}>
        {posterUrl ? (
          <img src={posterUrl} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 32 }}>
            {item.type === 'movie' ? '🎬' : '📺'}
          </div>
        )}
        {/* Rank badge */}
        <div style={{ position: 'absolute', top: 8, left: 8, background: 'linear-gradient(135deg,#C5001E,#E8006A)', borderRadius: 6, padding: '2px 7px', fontSize: 11, fontWeight: 800, color: '#fff' }}>
          #{item.rank}
        </div>
        {/* Rating badge */}
        {rating && (
          <div style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 6, padding: '2px 7px', fontSize: 11, fontWeight: 700, color: '#F5C518' }}>
            ★ {rating}
          </div>
        )}
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none' }} />
        {/* Type badge */}
        <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
            backgroundColor: item.type === 'movie' ? 'rgba(197,0,30,0.2)' : 'rgba(29,185,84,0.2)',
            color: item.type === 'movie' ? '#C5001E' : '#1db954',
            border: `1px solid ${item.type === 'movie' ? 'rgba(197,0,30,0.4)' : 'rgba(29,185,84,0.4)'}`,
          }}>
            {item.type === 'movie' ? t('card.movie') : t('card.tv')}
          </span>
        </div>
      </div>

      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3, color: '#fff', marginBottom: 3 }} title={item.title}>
          {item.title}
        </div>
        {item.releaseDate && (
          <div style={{ color: '#555', fontSize: 11 }}>{item.releaseDate.substring(0, 4)}</div>
        )}
        {item.overview && (
          <p style={{
            color: '#AAAAAA', fontSize: 11, marginTop: 6, lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {item.overview}
          </p>
        )}
      </div>
    </div>
    </Link>
  );
}

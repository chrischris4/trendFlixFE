'use client';
import Link from 'next/link';
import HScrollWithArrows from './HScrollWithArrows';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';

type MediaType = 'movie' | 'tv';

interface Props {
  mediaType: MediaType;
  selected: number | null;
}

export default function GenreFilter({ mediaType, selected }: Props) {
  const genres = mediaType === 'tv' ? TV_GENRES : MOVIE_GENRES;
  const typeParam = mediaType === 'tv' ? '&type=tv' : '';

  function genreHref(id: number | null) {
    if (!id) return mediaType === 'tv' ? '/?type=tv' : '/';
    return `/?genre=${id}${typeParam}`;
  }

  const chipActive: React.CSSProperties = { padding: '6px 14px', borderRadius: 20, backgroundColor: '#E8E8E8', color: '#1A1A1A', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block' };
  const chip: React.CSSProperties = { padding: '6px 14px', borderRadius: 20, backgroundColor: '#1A1A1A', color: '#AAAAAA', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block', transition: 'background-color 150ms' };
  const sep: React.CSSProperties = { width: 1, height: 24, backgroundColor: '#2A2A2A', marginLeft: 10, flexShrink: 0 };
  const contentStyle: React.CSSProperties = { display: 'flex', gap: 8, padding: '8px 10px', alignItems: 'center' };
  const root: React.CSSProperties = { display: 'flex', alignItems: 'center', backgroundColor: '#0F0F0F' };

  const selectedGenre = selected ? genres.find(g => g.id === selected) : null;
  const others = genres.filter(g => g.id !== selected);

  return (
    <div className="genre-filter" style={root}>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 12, flexShrink: 0 }}>
        {!selected ? (
          <span style={chipActive}>Tous</span>
        ) : (
          <Link href={genreHref(null)} style={chip} className="tab-hover">Tous</Link>
        )}
        <div style={sep} />
      </div>
      {selectedGenre && (
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ ...chipActive, marginLeft: 8 }}>{selectedGenre.label}</span>
          <div style={sep} />
        </div>
      )}
      <HScrollWithArrows contentContainerStyle={contentStyle}>
        {others.map(g => (
          <Link key={g.id} href={genreHref(g.id)} style={chip} className="tab-hover">{g.label}</Link>
        ))}
      </HScrollWithArrows>
    </div>
  );
}

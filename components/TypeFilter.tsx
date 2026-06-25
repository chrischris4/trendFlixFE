'use client';
import Link from 'next/link';

type MediaType = 'movie' | 'tv';

interface Props {
  selected: MediaType;
  genreSlug: string | null;
}

export default function TypeFilter({ selected, genreSlug }: Props) {
  const chipActive: React.CSSProperties = { padding: '6px 20px', borderRadius: 20, backgroundColor: '#E8E8E8', color: '#1A1A1A', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block' };
  const chip: React.CSSProperties = { padding: '6px 20px', borderRadius: 20, backgroundColor: '#1A1A1A', color: '#AAAAAA', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block', transition: 'background-color 150ms' };

  function buildHref(type: MediaType) {
    if (type === 'movie') return genreSlug ? `/?genre=${genreSlug}` : '/';
    return genreSlug ? `/?type=series&genre=${genreSlug}` : '/?type=series';
  }

  return (
    <div className="type-filter" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', backgroundColor: '#0F0F0F' }}>
      <Link href={buildHref('movie')} style={selected === 'movie' ? chipActive : chip} className={selected !== 'movie' ? 'tab-hover' : ''}>
        Films
      </Link>
      <Link href={buildHref('tv')} style={selected === 'tv' ? chipActive : chip} className={selected !== 'tv' ? 'tab-hover' : ''}>
        Séries
      </Link>
    </div>
  );
}

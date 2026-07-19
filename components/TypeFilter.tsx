'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type MediaType = 'movie' | 'tv';

interface Props {
  selected: MediaType;
  genreSlug: string | null;
}

export default function TypeFilter({ selected, genreSlug }: Props) {
  const { t } = useTranslation();
  const base: React.CSSProperties = { borderRadius: 20, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', display: 'block', textAlign: 'center', transition: 'background-color 150ms', padding: '8px 20px' };
  const chipActive: React.CSSProperties = { ...base, backgroundColor: '#E8E8E8', color: '#1A1A1A' };
  const chip: React.CSSProperties = { ...base, backgroundColor: '#1A1A1A', color: '#AAAAAA' };

  function buildHref(type: MediaType) {
    if (type === 'movie') return genreSlug ? `/?genre=${genreSlug}` : '/';
    return genreSlug ? `/?type=series&genre=${genreSlug}` : '/?type=series';
  }

  return (
    <div className="type-filter" style={{ display: 'flex', gap: 8, padding: '8px 16px', backgroundColor: '#0F0F0F' }}>
      <Link href={buildHref('movie')} style={selected === 'movie' ? chipActive : chip} className={`type-filter-item ${selected !== 'movie' ? 'tab-hover' : ''}`}>
        {t('nav.movies')}
      </Link>
      <Link href={buildHref('tv')} style={selected === 'tv' ? chipActive : chip} className={`type-filter-item ${selected !== 'tv' ? 'tab-hover' : ''}`}>
        {t('nav.series')}
      </Link>
    </div>
  );
}

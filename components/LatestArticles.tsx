'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { TMDB_IMAGE_BASE } from '../constants/config';
import { slugify } from '../utils/slug';
import { articleExcerpt, articleTitle, heroItem } from '../utils/blog';

export default function LatestArticles({ limit = 3 }: { limit?: number }) {
  const { i18n } = useTranslation();
  const { lang } = useAppStore();
  const isFr = lang === 'fr' || i18n.language === 'fr';
  const { articles } = useBlog();

  const latest = articles.slice(0, limit);
  if (latest.length === 0) return null;

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: 0 }}>
          {isFr ? 'Nos dernières analyses' : 'Our latest analyses'}
        </h2>
        <Link href="/blog" style={{ color: '#FF5599', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          {isFr ? 'Voir tout le blog' : 'See the whole blog'} →
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {latest.map(a => {
          const item = heroItem(a);
          const posterPath = item?.posterPath ?? a.posterPath;
          const poster = posterPath
            ? (posterPath.startsWith('http') ? posterPath : `${TMDB_IMAGE_BASE}${posterPath}`)
            : null;
          const title = articleTitle(a, isFr);
          const excerpt = articleExcerpt(a, isFr);
          return (
            <Link
              key={a.id}
              href={`/blog/${slugify(title, a.id)}`}
              style={{ display: 'flex', gap: 12, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: 12, textDecoration: 'none', transition: 'border-color 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#C5001E')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}
            >
              {poster && (
                <img src={poster} alt={title} loading="lazy" style={{ width: 54, height: 81, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
              )}
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1.35, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {title}
                </span>
                <span style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: '#888', fontSize: 12, lineHeight: 1.6 }}>
                  {excerpt}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { TMDB_IMAGE_BASE } from '../constants/config';
import { slugify } from '../utils/slug';
import type { BlogArticle } from '../types';
import { articleExcerpt, articleTitle, formatLabel, heroItem } from '../utils/blog';

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

function ArticleCard({ article, isFr, t }: { article: BlogArticle; isFr: boolean; t: (k: string) => string }) {
  const title = articleTitle(article, isFr);
  const primary = heroItem(article);
  const posterPath = primary?.posterPath ?? article.posterPath;
  const posterUrl = posterPath
    ? (posterPath.startsWith('http') ? posterPath : `${TMDB_IMAGE_BASE}${posterPath}`)
    : null;
  const channelTitle = primary?.channelTitle ?? article.channelTitle;
  const countryCount = primary?.countryCount ?? article.countryCount;
  const articleType = primary?.type ?? article.type;

  return (
    <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 24px 12px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {formatLabel(article.format ?? 'SIMPLE', isFr)}
        </span>
        <span style={{ color: '#444', fontSize: 11 }}>·</span>
        <span style={{ fontSize: 11, color: '#555', textTransform: 'capitalize' }}>
          {new Date(article.createdAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 18, padding: '4px 24px 0', alignItems: 'flex-start' }}>
        {posterUrl && (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            style={{ width: 130, aspectRatio: '2/3', objectFit: 'cover', borderRadius: 10, flexShrink: 0, border: '1px solid #2A2A2A' }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link href={`/blog/${slugify(title, article.id)}`} style={{ textDecoration: 'none' }}>
            <h2
              style={{ color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.4, transition: 'color 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF5599')}
              onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
            >
              {title}
            </h2>
          </Link>
          {channelTitle && (
            <p style={{ color: '#AAAAAA', fontSize: 13, margin: '0 0 16px' }}>{channelTitle}</p>
          )}

          <p style={{ color: '#555', fontSize: 11, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {t('blog.data_label')}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {article.viewCount != null && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd' }}>
                <span style={{ color: '#C5001E', fontWeight: 700 }}>{formatViews(Number(article.viewCount))}</span>
                {' '}{t('blog.views')}
              </div>
            )}
            {countryCount != null && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd' }}>
                {t('blog.trending_in')}{' '}
                <span style={{ color: '#C5001E', fontWeight: 700 }}>{countryCount}</span>
                {' '}{t('blog.countries')}
              </div>
            )}
            {articleType && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd' }}>
                {articleType === 'movie' ? t('card.movie') : t('card.tv')}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 24px 24px' }}>
        <p style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.7, margin: 0, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {articleExcerpt(article, isFr)}
        </p>
        <Link href={`/blog/${slugify(title, article.id)}`} style={{ display: 'inline-block', marginTop: 12, color: '#FF5599', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          {t('blog.read_more')} →
        </Link>
      </div>
    </div>
  );
}

type BlogFilter = 'all' | 'movie' | 'tv';

function FilterBar({
  active,
  onChange,
  counts,
  t,
}: {
  active: BlogFilter;
  onChange: (f: BlogFilter) => void;
  counts: { all: number; movie: number; tv: number };
  t: (k: string) => string;
}) {
  const options: { key: BlogFilter; label: string; count: number }[] = [
    { key: 'all', label: t('blog.filter_all'), count: counts.all },
    { key: 'movie', label: t('blog.filter_movies'), count: counts.movie },
    { key: 'tv', label: t('blog.filter_series'), count: counts.tv },
  ];

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
      {options.map(opt => {
        const isActive = active === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              padding: '7px 14px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.15s ease',
              color: isActive ? '#fff' : '#AAAAAA',
              background: isActive ? 'linear-gradient(90deg,#C5001E,#E8006A)' : '#1A1A1A',
              border: `1px solid ${isActive ? 'transparent' : '#2A2A2A'}`,
            }}
          >
            {opt.label}
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                lineHeight: 1,
                padding: '3px 7px',
                borderRadius: 10,
                color: isActive ? '#fff' : '#777',
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#0F0F0F',
              }}
            >
              {opt.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function BlogPage() {
  const { t } = useTranslation();
  const { lang } = useAppStore();
  const isFr = lang === 'fr';
  const { articles, loading, error } = useBlog();
  const [filter, setFilter] = useState<BlogFilter>('all');

  const counts = {
    all: articles.length,
    movie: articles.filter(a => a.type === 'movie').length,
    tv: articles.filter(a => a.type === 'tv').length,
  };
  const filteredArticles = filter === 'all' ? articles : articles.filter(a => a.type === filter);

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{t('blog.title')}</h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 32, lineHeight: 1.6 }}>{t('blog.subtitle')}</p>

        {error && <p style={{ color: '#C5001E', fontSize: 14 }}>{error}</p>}

        {!loading && !error && articles.length > 0 && (
          <FilterBar active={filter} onChange={setFilter} counts={counts} t={t} />
        )}

        {loading && (
          <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
            <div style={{ padding: '14px 24px 12px', display: 'flex', gap: 8 }}>
              <div className="skeleton" style={{ width: 120, height: 11, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: 80, height: 11, borderRadius: 4 }} />
            </div>
            <div style={{ display: 'flex', gap: 18, padding: '4px 24px 0' }}>
              <div className="skeleton" style={{ width: 130, aspectRatio: '2/3', borderRadius: 10, flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="skeleton" style={{ width: '70%', height: 20, borderRadius: 6 }} />
                <div className="skeleton" style={{ width: '30%', height: 13, borderRadius: 4 }} />
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <div className="skeleton" style={{ width: 90, height: 26, borderRadius: 20 }} />
                  <div className="skeleton" style={{ width: 110, height: 26, borderRadius: 20 }} />
                </div>
              </div>
            </div>
            <div style={{ padding: '18px 24px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="skeleton" style={{ width: '100%', height: 13, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '100%', height: 13, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: '60%', height: 13, borderRadius: 4 }} />
            </div>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div style={{ color: '#555', fontSize: 14, textAlign: 'center', paddingTop: 60 }}>{t('blog.no_articles')}</div>
        )}

        {!loading && !error && articles.length > 0 && filteredArticles.length === 0 && (
          <div style={{ color: '#555', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>{t('blog.no_articles_filter')}</div>
        )}

        {filteredArticles.map(article => (
          <ArticleCard key={article.id} article={article} isFr={isFr} t={t} />
        ))}

        {!loading && !error && filteredArticles.length > 0 && (
          <div style={{ textAlign: 'center', padding: '12px 24px 20px', backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12 }}>
            <span style={{ fontSize: 13, color: '#AAAAAA' }}>{t('blog.coming_soon')}</span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

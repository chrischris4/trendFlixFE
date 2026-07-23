'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { TMDB_IMAGE_BASE } from '../constants/config';
import { slugify } from '../utils/slug';
import {
  articleConclusion,
  articleIntro,
  articleTitle,
  formatLabel,
  heroItem,
  itemSectionText,
  itemSectionTitle,
} from '../utils/blog';

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

export default function ArticlePage({ id }: { id: number }) {
  const { t } = useTranslation();
  const { lang } = useAppStore();
  const isFr = lang === 'fr';
  const { articles, loading, error } = useBlog();

  const article = articles.find(a => a.id === id);
  const others = articles.filter(a => a.id !== id).slice(0, 3);

  if (loading) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px' }}>
        <div className="skeleton" style={{ width: '70%', height: 28, borderRadius: 6, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: 130, height: 195, borderRadius: 10, marginBottom: 20 }} />
        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 13, borderRadius: 4, marginBottom: 8, width: `${95 - i * 8}%` }} />)}
      </div>
    </div>
  );

  if (error || !article) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>
        <p style={{ marginBottom: 16 }}>{error ?? t('blog.no_articles')}</p>
        <Link href="/blog" style={{ color: '#FF5599', fontWeight: 600, fontSize: 14 }}>← {t('blog.title')}</Link>
      </div>
    </div>
  );

  const title = articleTitle(article, isFr);
  const primary = heroItem(article);
  const posterPath = primary?.posterPath ?? article.posterPath;
  const posterUrl = posterPath
    ? (posterPath.startsWith('http') ? posterPath : `${TMDB_IMAGE_BASE}${posterPath}`)
    : null;
  const channelTitle = primary?.channelTitle ?? article.channelTitle;
  const countryCount = primary?.countryCount ?? article.countryCount;
  const articleType = primary?.type ?? article.type;
  const intro = articleIntro(article, isFr);
  const conclusion = articleConclusion(article, isFr);
  const hasStructuredSections = article.items?.some(item =>
    Boolean(item.sectionTextFr || item.sectionTextEn || item.sectionTitleFr || item.sectionTitleEn),
  ) || article.items?.length > 1;

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 64px' }}>
        <Link href="/blog" style={{ color: '#888', fontSize: 13, textDecoration: 'none' }}>← {t('blog.title')}</Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '20px 0 10px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {formatLabel(article.format ?? 'SIMPLE', isFr)}
          </span>
          <span style={{ color: '#444', fontSize: 11 }}>·</span>
          <span style={{ fontSize: 11, color: '#555', textTransform: 'capitalize' }}>
            {new Date(article.createdAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 style={{ color: '#fff', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, lineHeight: 1.3, marginBottom: 6 }}>{title}</h1>
        {channelTitle && <p style={{ color: '#FF5599', fontSize: 15, fontWeight: 600, marginBottom: 20 }}>{channelTitle}</p>}

        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap' }}>
          {posterUrl && !hasStructuredSections && (
            <img src={posterUrl} alt={title} style={{ width: 150, aspectRatio: '2/3', objectFit: 'cover', borderRadius: 12, border: '1px solid #2A2A2A', flexShrink: 0 }} />
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignContent: 'flex-start', flex: 1, minWidth: 200 }}>
            {article.viewCount != null && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                <span style={{ color: '#FF5599', fontWeight: 700 }}>{formatViews(Number(article.viewCount))}</span> {t('blog.views')}
              </div>
            )}
            {countryCount != null && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                {t('blog.trending_in')} <span style={{ color: '#FF5599', fontWeight: 700 }}>{countryCount}</span> {t('blog.countries')}
              </div>
            )}
            {articleType && (
              <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd', height: 'fit-content' }}>
                {articleType === 'movie' ? t('card.movie') : t('card.tv')}
              </div>
            )}
          </div>
        </div>

        {hasStructuredSections ? (
          <div style={{ marginBottom: 40 }}>
            {intro && (
              <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.9, marginBottom: 28, whiteSpace: 'pre-line' }}>
                {intro}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {article.items.map(item => {
                const itemPosterUrl = item.posterPath
                  ? (item.posterPath.startsWith('http') ? item.posterPath : `${TMDB_IMAGE_BASE}${item.posterPath}`)
                  : null;
                const sectionTitle = itemSectionTitle(item, isFr);
                const sectionText = itemSectionText(item, isFr);
                return (
                  <section
                    key={item.id ?? `${article.id}-${item.position}`}
                    style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: 18, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, flexWrap: 'wrap' }}
                  >
                    {itemPosterUrl && (
                      <img
                        src={itemPosterUrl}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: 115, aspectRatio: '2/3', objectFit: 'cover', borderRadius: 9, flexShrink: 0 }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <span style={{ color: '#FF5599', fontSize: 11, fontWeight: 800 }}>
                        {String(item.position).padStart(2, '0')}
                      </span>
                      <h2 style={{ color: '#fff', fontSize: 19, lineHeight: 1.35, margin: '5px 0 4px' }}>
                        {sectionTitle}
                      </h2>
                      {sectionTitle !== item.title && (
                        <p style={{ color: '#AAAAAA', fontSize: 13, fontWeight: 600, margin: '0 0 4px' }}>{item.title}</p>
                      )}
                      {item.channelTitle && (
                        <p style={{ color: '#777', fontSize: 12, margin: '0 0 12px' }}>{item.channelTitle}</p>
                      )}
                      {sectionText && (
                        <p style={{ color: '#CCCCCC', fontSize: 14, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}>{sectionText}</p>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>

            {conclusion && (
              <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.9, margin: '28px 0 0', whiteSpace: 'pre-line' }}>
                {conclusion}
              </p>
            )}
          </div>
        ) : (
          <p style={{ color: '#CCCCCC', fontSize: 15, lineHeight: 1.9, marginBottom: 40, whiteSpace: 'pre-line' }}>
            {isFr ? article.editorialFr : article.editorialEn}
          </p>
        )}

        {others.length > 0 && (
          <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 24 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{isFr ? 'Autres analyses' : 'More analyses'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {others.map(a => (
                (() => {
                  const otherTitle = articleTitle(a, isFr);
                  const otherHero = heroItem(a);
                  const otherPoster = otherHero?.posterPath ?? a.posterPath;
                  return (
                    <Link key={a.id} href={`/blog/${slugify(otherTitle, a.id)}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '10px 14px', textDecoration: 'none', transition: 'border-color 150ms' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#C5001E')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}
                    >
                      {otherPoster && (
                        <img
                          src={otherPoster.startsWith('http') ? otherPoster : `${TMDB_IMAGE_BASE}${otherPoster}`}
                          alt={otherTitle}
                          style={{ width: 36, height: 54, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                        />
                      )}
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', color: '#fff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{otherTitle}</span>
                        <span style={{ display: 'block', color: '#888', fontSize: 12 }}>{otherHero?.channelTitle ?? a.channelTitle}</span>
                      </span>
                    </Link>
                  );
                })()
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

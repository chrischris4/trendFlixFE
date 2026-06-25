'use client';

import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { useBlog } from '../hooks/useBlog';
import { useAppStore } from '../store';
import { TMDB_IMAGE_BASE } from '../constants/config';
import type { BlogArticle } from '../types';

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

function ArticleCard({ article, isFr, t }: { article: BlogArticle; isFr: boolean; t: (k: string) => string }) {
  const posterUrl = article.posterPath
    ? (article.posterPath.startsWith('http') ? article.posterPath : `${TMDB_IMAGE_BASE}${article.posterPath}`)
    : null;

  return (
    <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 24px 12px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {t('blog.high_impact')}
        </span>
        <span style={{ color: '#444', fontSize: 11 }}>·</span>
        <span style={{ fontSize: 11, color: '#555', textTransform: 'capitalize' }}>
          {new Date(article.createdAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })}
        </span>
      </div>

      {posterUrl && (
        <div style={{ width: '100%', maxHeight: 220, overflow: 'hidden' }}>
          <img src={posterUrl} alt={article.title} loading="lazy" style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      <div style={{ padding: '20px 24px 24px' }}>
        <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.4 }}>{article.title}</h2>
        {article.channelTitle && (
          <p style={{ color: '#AAAAAA', fontSize: 13, margin: '0 0 16px' }}>{article.channelTitle}</p>
        )}

        <p style={{ color: '#555', fontSize: 11, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {t('blog.data_label')}
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          {article.viewCount != null && (
            <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd' }}>
              <span style={{ color: '#C5001E', fontWeight: 700 }}>{formatViews(Number(article.viewCount))}</span>
              {' '}{t('blog.views')}
            </div>
          )}
          {article.countryCount != null && (
            <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd' }}>
              {t('blog.trending_in')}{' '}
              <span style={{ color: '#C5001E', fontWeight: 700 }}>{article.countryCount}</span>
              {' '}{t('blog.countries')}
            </div>
          )}
          {article.type && (
            <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '4px 14px', fontSize: 12, color: '#ddd' }}>
              {article.type === 'movie' ? t('card.movie') : t('card.tv')}
            </div>
          )}
        </div>

        <p style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          {isFr ? article.editorialFr : article.editorialEn}
        </p>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const { t } = useTranslation();
  const { lang } = useAppStore();
  const isFr = lang === 'fr';
  const { articles, loading, error } = useBlog();

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{t('blog.title')}</h1>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 32, lineHeight: 1.6 }}>{t('blog.subtitle')}</p>

        {error && <p style={{ color: '#C5001E', fontSize: 14 }}>{error}</p>}

        {loading && (
          <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
            <div style={{ padding: '14px 24px 12px', display: 'flex', gap: 8 }}>
              <div className="skeleton" style={{ width: 120, height: 11, borderRadius: 4 }} />
              <div className="skeleton" style={{ width: 80, height: 11, borderRadius: 4 }} />
            </div>
            <div className="skeleton" style={{ width: '100%', height: 180 }} />
            <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="skeleton" style={{ width: '70%', height: 20, borderRadius: 6 }} />
              <div className="skeleton" style={{ width: '30%', height: 13, borderRadius: 4 }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <div className="skeleton" style={{ width: 90, height: 26, borderRadius: 20 }} />
                <div className="skeleton" style={{ width: 110, height: 26, borderRadius: 20 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                <div className="skeleton" style={{ width: '100%', height: 13, borderRadius: 4 }} />
                <div className="skeleton" style={{ width: '100%', height: 13, borderRadius: 4 }} />
                <div className="skeleton" style={{ width: '60%', height: 13, borderRadius: 4 }} />
              </div>
            </div>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div style={{ color: '#555', fontSize: 14, textAlign: 'center', paddingTop: 60 }}>{t('blog.no_articles')}</div>
        )}

        {articles.map(article => (
          <ArticleCard key={article.id} article={article} isFr={isFr} t={t} />
        ))}

        {!loading && !error && articles.length > 0 && (
          <div style={{ textAlign: 'center', padding: '12px 24px 20px', backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12 }}>
            <span style={{ fontSize: 13, color: '#AAAAAA' }}>{t('blog.coming_soon')}</span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

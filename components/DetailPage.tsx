'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import HScrollWithArrows from './HScrollWithArrows';
import { useMediaDetail } from '../hooks/useMediaDetail';
import { TMDB_IMAGE_BASE } from '../constants/config';
import type { SimilarItem } from '../types/detail';
import { slugify } from '../utils/slug';

const IMG = TMDB_IMAGE_BASE;
const IMG_SMALL = 'https://image.tmdb.org/t/p/w185';

interface Props { type: 'movie' | 'tv'; id: number }

function formatMoney(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

export default function DetailPage({ type, id }: Props) {
  const { t } = useTranslation();
  const { detail, loading, error } = useMediaDetail(type, id);

  if (loading) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>
        <div className="skeleton" style={{ width: '60%', height: 36, borderRadius: 6, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: '100%', height: 400, borderRadius: 12, marginBottom: 24 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 14, borderRadius: 4, width: `${80 - i * 10}%` }} />)}
        </div>
      </div>
    </div>
  );

  if (error || !detail) return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>{error ?? t('detail.not_found')}</div>
    </div>
  );

  const backdropUrl = detail.backdropPath ? `https://image.tmdb.org/t/p/w1280${detail.backdropPath}` : null;
  const posterUrl   = detail.posterPath   ? `${IMG}${detail.posterPath}` : null;
  const trailer     = detail.videos.find(v => v.type === 'Trailer') ?? detail.videos[0];
  const frProviders = detail.providers['FR'] ?? detail.providers['US'] ?? null;
  const allProviders = frProviders
    ? [...(frProviders.flatrate ?? []), ...(frProviders.rent ?? []), ...(frProviders.buy ?? [])]
        .filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i)
    : [];

  const pill = (text: string, accent = false) => (
    <span key={text} style={{ backgroundColor: accent ? 'rgba(197,0,30,0.15)' : '#1A1A1A', border: `1px solid ${accent ? 'rgba(197,0,30,0.3)' : '#2A2A2A'}`, borderRadius: 20, padding: '4px 14px', fontSize: 12, color: accent ? '#C5001E' : '#AAAAAA', fontWeight: accent ? 700 : 400 }}>
      {text}
    </span>
  );

  const seasons = detail.numberOfSeasons ?? 0;
  const seasonLabel = seasons > 1 ? t('detail.seasons') : t('detail.season');

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />

      {backdropUrl && (
        <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden' }}>
          <img src={backdropUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.4 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #0F0F0F 100%)' }} />
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: backdropUrl ? '0 16px 64px' : '32px 16px 64px', marginTop: backdropUrl ? -120 : 0, position: 'relative' }}>

        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', marginBottom: 36, flexWrap: 'wrap' }}>
          {posterUrl && (
            <img src={posterUrl} alt={detail.title} className="detail-poster" style={{ width: 160, borderRadius: 10, flexShrink: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }} />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              <span style={{ backgroundColor: '#C5001E', color: '#fff', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 700 }}>
                {type === 'movie' ? t('card.movie') : t('card.tv')}
              </span>
              {detail.status && <span style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 20, padding: '3px 12px', fontSize: 11, color: '#AAAAAA' }}>{detail.status}</span>}
            </div>

            <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 38px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 6 }}>{detail.title}</h1>

            {detail.tagline && (
              <p style={{ color: '#555', fontSize: 14, fontStyle: 'italic', marginBottom: 12 }}>"{detail.tagline}"</p>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
              {detail.voteAverage > 0 && (
                <span style={{ color: '#F5C518', fontWeight: 800, fontSize: 18 }}>★ {detail.voteAverage.toFixed(1)}</span>
              )}
              {detail.voteCount > 0 && (
                <span style={{ color: '#555', fontSize: 13 }}>{detail.voteCount.toLocaleString()} {t('detail.votes')}</span>
              )}
              {detail.releaseDate && <span style={{ color: '#555', fontSize: 13 }}>·</span>}
              {detail.releaseDate && <span style={{ color: '#AAAAAA', fontSize: 13 }}>{detail.releaseDate.substring(0, 4)}</span>}
              {detail.runtime && <><span style={{ color: '#555', fontSize: 13 }}>·</span><span style={{ color: '#AAAAAA', fontSize: 13 }}>{detail.runtime} min</span></>}
              {seasons > 0 && <><span style={{ color: '#555', fontSize: 13 }}>·</span><span style={{ color: '#AAAAAA', fontSize: 13 }}>{seasons} {seasonLabel}</span></>}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {detail.genres.map(g => pill(g.name))}
            </div>

            {detail.overview && (
              <p style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.8, maxWidth: 680 }}>{detail.overview}</p>
            )}
          </div>
        </div>

        {allProviders.length > 0 && (
          <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '20px 24px', marginBottom: 28 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('detail.where_to_watch')}</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              {allProviders.map(p => (
                <img key={p.id} src={`${IMG_SMALL}${p.logo}`} alt={p.name} title={p.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }} />
              ))}
              {frProviders?.link && (
                <a href={frProviders.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontSize: 12, color: '#C5001E', fontWeight: 600 }}>{t('detail.see_offers')}</a>
              )}
            </div>
          </div>
        )}

        {trailer && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{t('detail.trailer')}</h2>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: 12, overflow: 'hidden' }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        )}

        {detail.credits.cast.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
              {t('detail.cast')}
              {detail.credits.directors.length > 0 && (
                <span style={{ color: '#555', fontWeight: 400, fontSize: 13, marginLeft: 12 }}>
                  {t('detail.directed_by')} <span style={{ color: '#AAAAAA' }}>{detail.credits.directors.map(d => d.name).join(', ')}</span>
                </span>
              )}
            </h2>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }} className="no-scrollbar">
              {detail.credits.cast.slice(0, 10).map(p => (
                <div key={p.id} style={{ flexShrink: 0, width: 80, textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', backgroundColor: '#1A1A1A', marginBottom: 6 }}>
                    {p.profilePath
                      ? <img src={`${IMG_SMALL}${p.profilePath}`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 28 }}>👤</div>
                    }
                  </div>
                  <p style={{ color: '#fff', fontSize: 11, fontWeight: 600, lineHeight: 1.3, marginBottom: 2 }}>{p.name}</p>
                  <p style={{ color: '#555', fontSize: 10, lineHeight: 1.2 }}>{p.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
          {[
            detail.originalTitle !== detail.title && { label: t('detail.original_title'), value: detail.originalTitle },
            detail.originalLanguage && { label: t('detail.original_language'), value: detail.originalLanguage.toUpperCase() },
            detail.budget && detail.budget > 0 && { label: t('detail.budget'), value: formatMoney(detail.budget) },
            detail.revenue && detail.revenue > 0 && { label: t('detail.box_office'), value: formatMoney(detail.revenue) },
            detail.numberOfEpisodes && { label: t('detail.episodes'), value: `${detail.numberOfEpisodes}` },
            detail.episodeRuntime && { label: t('detail.episode_runtime'), value: `${detail.episodeRuntime} min` },
            detail.collection && { label: t('detail.collection'), value: detail.collection.name },
            detail.networks.length > 0 && { label: t('detail.network'), value: detail.networks.map(n => n.name).join(', ') },
          ].filter(Boolean).map((item: any) => (
            <div key={item.label} style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {detail.keywords.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t('detail.keywords')}</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {detail.keywords.map(k => pill(k))}
            </div>
          </div>
        )}

        {detail.similar.length > 0 && (
          <div>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
              {type === 'movie' ? t('detail.similar_movies') : t('detail.similar_shows')}
            </h2>
            <HScrollWithArrows contentContainerStyle={{ gap: 12, paddingBottom: 8 }}>
              {detail.similar.map((item: SimilarItem) => (
                <Link key={item.tmdbId} href={`/${item.type === 'movie' ? 'movies' : 'series'}/${slugify(item.title, item.tmdbId)}`} style={{ flexShrink: 0, width: 120, display: 'block' }}>
                  <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 8, overflow: 'hidden', transition: 'border-color 160ms' }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#444'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#2A2A2A'}
                  >
                    <div style={{ aspectRatio: '2/3', backgroundColor: '#1A1A1A', overflow: 'hidden' }}>
                      {item.posterPath
                        ? <img src={`${IMG}${item.posterPath}`} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 24 }}>🎬</div>
                      }
                    </div>
                    <div style={{ padding: '8px 10px' }}>
                      <p style={{ color: '#fff', fontSize: 11, fontWeight: 600, lineHeight: 1.3, marginBottom: 2 }}>{item.title}</p>
                      {item.voteAverage > 0 && <p style={{ color: '#F5C518', fontSize: 10 }}>★ {item.voteAverage.toFixed(1)}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </HScrollWithArrows>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

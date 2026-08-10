'use client';

import { useTranslation } from 'react-i18next';
import type { ChartEvolutionPoint } from '../types';

/**
 * Rendu cote serveur au premier passage, en anglais comme `<html lang="en">`.
 * Ces chiffres viennent de la comparaison de nos releves successifs : TMDB
 * publie une popularite du moment, jamais la part du classement renouvelee
 * depuis la veille ni la duree de presence d'un titre.
 */
interface Props {
  evolution?: ChartEvolutionPoint[];
  type: 'movie' | 'tv';
}

const paragraph = { color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 14 } as const;

function regimeKey(avg: number): string {
  if (avg >= 40) return 'turnover.regime_fast';
  if (avg >= 20) return 'turnover.regime_mobile';
  if (avg >= 8) return 'turnover.regime_inert';
  return 'turnover.regime_frozen';
}

export default function TurnoverSection({ evolution, type }: Props) {
  const { t } = useTranslation();

  const points = (evolution ?? []).filter(point => point.entriesTotal > 0);
  if (points.length < 1) return null;

  const churns = points.map(p => p.churnPct);
  const avg = Math.round(churns.reduce((a, b) => a + b, 0) / churns.length);
  const latest = points[0];
  const noun = t(type === 'movie' ? 'turnover.noun_movie' : 'turnover.noun_tv');

  const tenured = points.reduce<ChartEvolutionPoint | null>(
    (best, p) => ((p.topTenureDays ?? 0) > (best?.topTenureDays ?? 0) ? p : best),
    null,
  );
  const gainer = points.reduce<ChartEvolutionPoint | null>(
    (best, p) => ((p.topGainerDelta ?? 0) > (best?.topGainerDelta ?? 0) ? p : best),
    null,
  );

  return (
    <section style={{ maxWidth: 820, margin: '40px auto 0', padding: '28px 16px 0', borderTop: '1px solid #2A2A2A' }}>
      <h2 style={{ color: '#fff', fontSize: 19, fontWeight: 700, marginBottom: 12 }}>{t('turnover.title')}</h2>

      <p style={paragraph}>
        {points.length > 1
          ? t('turnover.intro_multi', { days: points.length, noun, avg, regime: t(regimeKey(avg)) })
          : t('turnover.intro_single', { noun, avg, regime: t(regimeKey(avg)) })}{' '}
        {t('turnover.source_note')}
      </p>

      <p style={paragraph}>
        {t('turnover.composition', {
          entries: latest.entriesTotal,
          newEntries: latest.newEntries,
          dropped: latest.droppedOut,
          languages: latest.uniqueLanguages,
        })}
        {latest.avgPopularity != null && t('turnover.popularity', { avg: Math.round(latest.avgPopularity) })}
      </p>

      {tenured?.topTenureTitle && (
        <p style={paragraph}>
          {t('turnover.tenure', { title: tenured.topTenureTitle, days: tenured.topTenureDays })}
        </p>
      )}

      {gainer?.topGainerTitle && (
        <p style={{ ...paragraph, marginBottom: 0 }}>
          {t('turnover.gainer', { title: gainer.topGainerTitle, delta: gainer.topGainerDelta })}
        </p>
      )}
    </section>
  );
}

'use client';

import { useTranslation } from 'react-i18next';
import type { ItemHistory } from '../types';

/**
 * Composant client, mais rendu cote serveur au premier passage : i18n s'initialise
 * en anglais, qui est la langue declaree par `<html lang="en">` et celle que Google
 * indexe. Les visiteurs francophones basculent apres le montage, comme partout
 * ailleurs. C'est la seule partie de la fiche que le crawler voit, le reste
 * restant sous ClientOnly.
 */
interface Props { history: ItemHistory }

// « la 1re place » en francais, « #1 » en anglais.
const ordinal = (rank: number, lang: string) =>
  lang === 'fr' ? (rank === 1 ? '1re' : `${rank}e`) : `#${rank}`;

function regimeKey(decay: number): string {
  if (decay >= 80) return 'trajectory.regime_total';
  if (decay >= 50) return 'trajectory.regime_strong';
  if (decay >= 20) return 'trajectory.regime_moderate';
  return 'trajectory.regime_flat';
}

export default function ItemTrajectory({ history }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const date = (day: string) =>
    new Date(day + 'T00:00:00Z').toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  const decay = history.decayPct;

  return (
    <section style={{ maxWidth: 820, margin: '32px auto 0', padding: '0 16px 8px' }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
        {t(history.type === 'movie' ? 'trajectory.title_movie' : 'trajectory.title_tv')}
      </h2>

      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 14 }}>
        {t('trajectory.intro', {
          firstSeen: date(history.firstSeen),
          days: history.daysOnChart,
          rank: ordinal(history.peakRank.rank, lang),
          peakDate: date(history.peakRank.day),
        })}{' '}
        {t('trajectory.source_note')}
      </p>

      {decay !== null && (
        <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
          {t('trajectory.decay', {
            peak: Math.round(history.peakPopularity.value),
            peakDate: date(history.peakPopularity.day),
            current: Math.round(history.currentPopularity),
            decay,
            regime: t(regimeKey(decay)),
          })}{' '}
          {t('trajectory.decay_note')}
        </p>
      )}

      <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{t('trajectory.table_title')}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ color: '#777', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px 8px 0', fontWeight: 600 }}>{t('trajectory.th_day')}</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>{t('trajectory.th_rank')}</th>
              <th style={{ padding: '8px 0 8px 10px', fontWeight: 600 }}>{t('trajectory.th_popularity')}</th>
            </tr>
          </thead>
          <tbody>
            {history.timeline.slice(-14).reverse().map(point => (
              <tr key={point.day} style={{ borderTop: '1px solid #2A2A2A', color: '#CCCCCC' }}>
                <td style={{ padding: '8px 10px 8px 0' }}>{date(point.day)}</td>
                <td style={{ padding: '8px 10px' }}>{ordinal(point.rank, lang)}</td>
                <td style={{ padding: '8px 0 8px 10px' }}>{point.popularity ? Math.round(point.popularity) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {history.timeline.length > 14 && (
        <p style={{ color: '#666', fontSize: 13, marginTop: 8 }}>
          {t('trajectory.footnote', { total: history.timeline.length, firstSeen: date(history.firstSeen) })}
        </p>
      )}
    </section>
  );
}

'use client';
import { useTranslation } from 'react-i18next';
import StaticPageLayout from '../../components/StaticPageLayout';
import '../../i18n/config';

const h2Style: React.CSSProperties = { color: '#fff', fontSize: 17, fontWeight: 700, marginTop: 28, marginBottom: 6 };
const pStyle: React.CSSProperties = { color: '#AAAAAA', fontSize: 15, lineHeight: 1.7, margin: 0 };

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <StaticPageLayout>
      <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{t('pages.about.title')}</h1>
      <p style={pStyle}>{t('pages.about.intro')}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, margin: '8px 0' }}>
        {[
          { value: '1000+', label: t('pages.about.stat_titles') },
          { value: '20+',   label: t('pages.about.stat_genres') },
          { value: 'Daily', label: t('pages.about.stat_update') },
          { value: '100+',  label: t('pages.about.stat_countries') },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: '#141414', borderRadius: 10, padding: '14px', border: '1px solid #2A2A2A', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(90deg,#C5001E,#E8006A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
            <div style={{ color: '#AAAAAA', fontSize: 12, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{t('pages.about.how_title')}</h2>
      <p style={pStyle}>{t('pages.about.how_body')}</p>

      <h2 style={h2Style}>{t('pages.about.data_title')}</h2>
      <p style={pStyle}>{t('pages.about.data_body')}</p>

      <h2 style={h2Style}>{t('pages.about.ranking_title')}</h2>
      <p style={pStyle}>{t('pages.about.ranking_body')}</p>

      <h2 style={h2Style}>{t('pages.about.genres_title')}</h2>
      <p style={pStyle}>{t('pages.about.genres_body')}</p>

      <h2 style={h2Style}>{t('pages.about.stats_title')}</h2>
      <p style={pStyle}>{t('pages.about.stats_body')}</p>

      <h2 style={h2Style}>{t('pages.about.faq_title')}</h2>
      {(['faq1', 'faq2', 'faq3', 'faq4', 'faq5'] as const).map(key => (
        <div key={key} style={{ marginTop: 16 }}>
          <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>{t(`pages.about.${key}_q`)}</p>
          <p style={{ ...pStyle, fontSize: 14 }}>{t(`pages.about.${key}_a`)}</p>
        </div>
      ))}
    </StaticPageLayout>
  );
}

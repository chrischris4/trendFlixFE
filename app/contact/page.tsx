'use client';
import { useTranslation } from 'react-i18next';
import StaticPageLayout from '../../components/StaticPageLayout';
import '../../i18n/config';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <StaticPageLayout>
      <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{t('pages.contact.title')}</h1>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.contact.intro')}</p>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 10, padding: '12px 20px' }}>
        <span style={{ color: '#888', fontSize: 13 }}>{t('pages.contact.email_label')} :</span>
        <a href="mailto:contact@trendingshows.io" style={{ color: '#C5001E', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>contact@trendingshows.io</a>
      </div>
      <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700, marginTop: 8 }}>{t('pages.contact.report_title')}</h2>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.contact.report_body')}</p>
      <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>{t('pages.contact.partner_title')}</h2>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.contact.partner_body')}</p>
    </StaticPageLayout>
  );
}

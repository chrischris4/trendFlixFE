'use client';
import { useTranslation } from 'react-i18next';
import StaticPageLayout from '../../components/StaticPageLayout';
import '../../i18n/config';

export default function TermsPage() {
  const { t } = useTranslation();
  return (
    <StaticPageLayout>
      <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{t('pages.terms.title')}</h1>
      <p style={{ color: '#555', fontSize: 13 }}>{t('pages.terms.updated')}</p>
      {[1,2,3,4,5,6,7,8,9].map(n => (
        <div key={n}>
          <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700, marginTop: 8 }}>{t(`pages.terms.s${n}_title`)}</h2>
          <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t(`pages.terms.s${n}_body`)}</p>
        </div>
      ))}
    </StaticPageLayout>
  );
}

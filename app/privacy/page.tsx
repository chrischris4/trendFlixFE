'use client';
import { useTranslation } from 'react-i18next';
import StaticPageLayout from '../../components/StaticPageLayout';
import PrivacyChoices from '../../components/PrivacyChoices';
import '../../i18n/config';

export default function PrivacyPage() {
  const { t, i18n } = useTranslation();
  return (
    <StaticPageLayout>
      <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{t('pages.privacy.title')}</h1>
      <p style={{ color: '#555', fontSize: 13 }}>{t('pages.privacy.updated')}</p>
      <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700, marginTop: 8 }}>{t('pages.privacy.collected_title')}</h2>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.privacy.collected_body')}</p>
      <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>{t('pages.privacy.content_title')}</h2>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.privacy.content_body')}</p>
      <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>{t('pages.privacy.ads_title')}</h2>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.privacy.ads_body')}</p>
      <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>{t('pages.privacy.cookies_title')}</h2>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.privacy.cookies_body')}</p>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>
        {i18n.language === 'fr'
          ? 'Les choix publicitaires sont recueillis par la CMP Google certifiée selon le cadre IAB TCF. Vous pouvez les modifier à tout moment : '
          : 'Advertising choices are collected through Google’s certified CMP under the IAB TCF. You can change them at any time: '}
        <PrivacyChoices label={i18n.language === 'fr' ? 'paramètres de confidentialité et cookies' : 'privacy and cookie settings'} />
      </p>
      <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>{t('pages.privacy.rights_title')}</h2>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.privacy.rights_body')}</p>
      <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>{t('pages.privacy.contact_title')}</h2>
      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.7 }}>{t('pages.privacy.contact_body')}</p>
    </StaticPageLayout>
  );
}

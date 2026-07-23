'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import PrivacyChoices from './PrivacyChoices';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const links = [
    { label: t('nav.about'),      href: '/about' },
    { label: i18n.language === 'fr' ? 'Méthodologie' : 'Methodology', href: '/methodology' },
    { label: t('pages.terms.title'), href: '/terms' },
    { label: t('footer.privacy'), href: '/privacy' },
    { label: t('footer.contact'), href: '/contact' },
  ];

  return (
    <div style={{ borderTop: '1px solid #2A2A2A', padding: '16px 24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, backgroundColor: '#0F0F0F' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
        {links.map(link => (
          <Link key={link.href} href={link.href} style={{ color: '#AAAAAA', fontSize: 13, textDecoration: 'none' }}>
            {link.label}
          </Link>
        ))}
        <PrivacyChoices label={i18n.language === 'fr' ? 'Confidentialité et cookies' : 'Privacy and cookie settings'} />
      </div>
      <span style={{ color: '#AAAAAA', fontSize: 12 }}>© {new Date().getFullYear()} TrendingShows · {t('footer.rights')}</span>
    </div>
  );
}

'use client';

import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';

const copy = {
  fr: {
    title: 'Méthodologie et ligne éditoriale',
    intro: 'TrendingShows suit la popularité mondiale des films et des séries à partir des données TMDB. Notre objectif n’est pas de confondre popularité et qualité, mais de montrer où elles se rejoignent et où elles divergent.',
    sections: [
      ['Collecte des données', 'Les tendances sont relevées chaque jour. Nous conservons le rang, la popularité, la note moyenne, le nombre de votes, les genres, la langue originale et la date de sortie lorsqu’ils sont disponibles.'],
      ['Lire les classements', 'La popularité TMDB mesure l’attention du moment. Elle ne constitue pas une critique. Nos analyses confrontent donc systématiquement la visibilité d’un titre à sa réception et à son rythme de diffusion.'],
      ['Contrôle éditorial', 'Les articles sont relus avant publication. Aucun chiffre absent n’est inventé. Le contexte sur une plateforme, un studio ou une franchise est vérifié auprès de sources publiques fiables.'],
      ['Corrections et attribution', 'TMDB fournit les données et les visuels, mais ne certifie pas nos analyses. Une erreur factuelle peut être signalée depuis la page Contact.'],
    ],
    source: 'Source principale : The Movie Database',
  },
  en: {
    title: 'Methodology and editorial standards',
    intro: 'TrendingShows tracks worldwide movie and television popularity using TMDB data. We do not treat popularity as a synonym for quality. Our purpose is to show where those signals align and where they clearly diverge.',
    sections: [
      ['Data collection', 'Trending data is collected daily. We retain rank, popularity, average rating, vote count, genres, original language and release date whenever those fields are available.'],
      ['Reading the rankings', 'TMDB popularity measures current attention, not critical merit. Our analysis therefore compares visibility with audience reception and with each title’s release pattern.'],
      ['Editorial review', 'Articles are reviewed before publication. Missing figures are never invented, and context about platforms, studios or franchises is checked against reliable public sources.'],
      ['Corrections and attribution', 'TMDB supplies data and imagery but does not endorse our analysis. Readers can report factual errors through the Contact page.'],
    ],
    source: 'Primary source: The Movie Database',
  },
};

export default function MethodologyPage() {
  const { i18n } = useTranslation();
  const text = copy[i18n.language === 'fr' ? 'fr' : 'en'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F0F0F' }}>
      <Header />
      <main style={{ maxWidth: 820, margin: '0 auto', padding: '40px 20px 72px' }}>
        <h1 style={{ color: '#fff', fontSize: 30, marginBottom: 14 }}>{text.title}</h1>
        <p style={{ color: '#CCCCCC', fontSize: 16, lineHeight: 1.8 }}>{text.intro}</p>
        {text.sections.map(([title, body]) => (
          <section key={title} style={{ marginTop: 30 }}>
            <h2 style={{ color: '#fff', fontSize: 19, marginBottom: 8 }}>{title}</h2>
            <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8 }}>{body}</p>
          </section>
        ))}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 28, color: '#E50914' }}>
          {text.source}
        </a>
      </main>
      <Footer />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { MOVIE_GENRES, TV_GENRES, genreLabel } from '../constants/config';
import { genreInsights } from '../constants/insights';

const h2: React.CSSProperties = { color: '#fff', fontSize: 20, fontWeight: 800, margin: '40px 0 10px' };
const p: React.CSSProperties = { color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, margin: '0 0 14px' };

export default function GenresGuidePage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const lang = isFr ? 'fr' : 'en';

  const build = (list: readonly { slug: string; label: string; labelEn: string; emoji: string }[], base: string) =>
    list
      .map(g => (genreInsights[g.slug] ? { ...g, base, text: genreInsights[g.slug][lang] } : null))
      .filter(Boolean) as { slug: string; label: string; labelEn: string; emoji: string; base: string; text: string }[];

  const sections = [
    { title: isFr ? 'Les genres au cinéma' : 'Genres in film', items: build(MOVIE_GENRES, 'movies') },
    { title: isFr ? 'Les genres en série' : 'Genres in television', items: build(TV_GENRES, 'series') },
  ];

  return (
    <div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <Header />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 16px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 14 }}>
          {isFr ? 'Guide des genres' : 'Guide to the genres'}
        </h1>

        <p style={p}>
          {isFr
            ? "Nous suivons chaque jour les films et séries les plus populaires au monde à partir des données TMDB, et une chose ressort de ces relevés : le genre est le meilleur prédicteur d'une note, bien avant le budget, le casting ou le studio. Un documentaire et un film d'action peuvent réunir le même nombre de spectateurs et se retrouver séparés de deux points sur dix."
            : "We track the world's most popular films and series every day using TMDB data, and one thing stands out from those records: genre is the best predictor of a rating, well ahead of budget, cast or studio. A documentary and an action film can draw the same number of viewers and end up two points apart out of ten."}
        </p>
        <p style={p}>
          {isFr
            ? "L'explication tient moins à la qualité qu'à la composition du public. Un genre à public restreint et volontaire est noté par des gens qui l'ont choisi ; un genre grand public est noté par tout le monde, y compris par ceux qui ne l'auraient jamais choisi. La note ne mesure donc pas une valeur absolue, mais l'écart entre ce que le spectateur attendait et ce qu'il a reçu."
            : "The explanation lies less in quality than in audience composition. A genre with a small, deliberate audience is rated by people who chose it; a mainstream genre is rated by everyone, including those who would never have chosen it. A rating therefore does not measure absolute value, but the gap between what the viewer expected and what they got."}
        </p>
        <p style={p}>
          {isFr
            ? "Le second facteur est le format. À genre égal, une série est presque toujours mieux notée qu'un film, parce qu'un spectateur qui a consacré dix heures à un récit note une expérience qu'il a choisi de poursuivre. Cette asymétrie structurelle explique pourquoi le haut de nos classements de notes est occupé par la télévision."
            : "The second factor is format. At equal genre, a series is almost always better rated than a film, because a viewer who spent ten hours with a story rates an experience they chose to continue. That structural asymmetry explains why the top of our rating charts is occupied by television."}
        </p>

        {sections.map(section => (
          <div key={section.title}>
            <h2 style={h2}>{section.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {section.items.map(g => (
                <div key={`${section.title}-${g.slug}`} style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: 12, padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 22, lineHeight: 1 }}>{g.emoji}</span>
                    <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: 0 }}>{genreLabel(g, i18n.language)}</h3>
                  </div>
                  <p style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.8, margin: '0 0 10px' }}>{g.text}</p>
                  <Link href={`/${g.base}/genre/${g.slug}/`} style={{ fontSize: 13, fontWeight: 600, color: '#E8006A', textDecoration: 'none' }}>
                    {isFr ? `Voir le top ${genreLabel(g, i18n.language)}` : `See the ${genreLabel(g, i18n.language)} top`} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}

        <h2 style={h2}>{isFr ? 'Comment lire une note' : 'How to read a rating'}</h2>
        <p style={p}>
          {isFr
            ? "Une note n'a de sens qu'accompagnée du nombre de votes qui la porte. Nous voyons régulièrement des titres tenir 7,6 sur cinquante votes et d'autres tenir 8,7 sur onze mille : le second est une mesure, le premier une première impression qu'un mois de plus peut déplacer d'un demi-point. C'est particulièrement vrai dans les jours qui suivent une grosse sortie, où une poignée de votes hostiles peut retenir une moyenne en otage avant que le public réel ne soit passé en salle."
            : "A rating only means something alongside the number of votes behind it. We regularly see titles holding 7.6 on fifty votes and others holding 8.7 on eleven thousand: the second is a measurement, the first an early impression that another month can move by half a point. This is especially true in the days following a major release, where a handful of hostile votes can hold an average hostage before the real audience has been to theatres."}
        </p>
        <p style={p}>
          {isFr
            ? "Le dernier facteur est l'origine du matériau. Les adaptations de romans occupent systématiquement le haut de nos classements de notes, tandis que les remakes et les suites tardives se regroupent en bas. La différence n'est pas de talent : adapter un livre apporte une histoire que la plupart des spectateurs n'ont jamais vue mise en images, alors que refaire un film invite à une comparaison que la nouvelle version ne peut que perdre."
            : "The last factor is the origin of the material. Novel adaptations consistently occupy the top of our rating charts, while remakes and late sequels cluster at the bottom. The difference is not talent: adapting a book brings a story most viewers have never seen rendered on screen, whereas remaking a film invites a comparison the new version can only lose."}
        </p>
        <p style={{ ...p, marginTop: 18 }}>
          <Link href="/methodology/" style={{ color: '#E8006A', fontWeight: 600, textDecoration: 'none' }}>
            {isFr ? 'Notre méthodologie en détail' : 'Our methodology in detail'} →
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

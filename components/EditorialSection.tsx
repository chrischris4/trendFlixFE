'use client';

import { useTranslation } from 'react-i18next';

type PageKey = 'home' | 'movies' | 'series';

interface Block {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

const CONTENT: Record<PageKey, { fr: Block; en: Block }> = {
  home: {
    fr: {
      title: 'Comment lire le classement mondial TrendingShows',
      intro: "Chaque jour, des milliers de films et de séries circulent sur les plateformes de streaming, et il devient difficile de distinguer ce qui marche vraiment de ce qui bénéficie simplement d'une grosse campagne marketing. TrendingShows existe pour répondre à cette question précise : qu'est-ce que le monde regarde réellement en ce moment, et pourquoi.",
      sections: [
        {
          heading: 'Notre méthode de classement',
          body: "Nos classements s'appuient sur les données de popularité mondiale agrégées par TMDB, une base communautaire alimentée par des millions d'utilisateurs à travers le monde. Ce score combine plusieurs signaux : la fréquentation des fiches, le volume de votes, les ajouts en listes et l'évolution de ces indicateurs sur les derniers jours. Nous récupérons ces données chaque nuit, nous les classons par type de contenu, puis nous les conservons sur sept jours glissants afin de pouvoir mesurer les mouvements plutôt que de simples positions figées. Un titre qui gagne dix places en trois jours raconte quelque chose qu'un top statique ne montre jamais.",
        },
        {
          heading: 'Ce que les chiffres disent, et ce qu\'ils ne disent pas',
          body: "Un point important pour lire nos pages correctement : la popularité n'est pas la qualité. Un blockbuster mal accueilli par la critique peut dominer le classement pendant deux semaines simplement parce que tout le monde en parle, y compris en mal. C'est pour cette raison que nous affichons systématiquement la note moyenne des spectateurs à côté de la position. L'écart entre les deux est souvent l'information la plus intéressante de la fiche. Nous ne mesurons pas non plus les heures de visionnage réelles des plateformes, que Netflix, Disney+ ou Prime Video ne publient qu'au compte-gouttes et selon leurs propres méthodologies. Ce que nous mesurons, c'est l'attention mondiale portée à un titre, ce qui est différent et souvent plus révélateur des tendances qui émergent.",
        },
        {
          heading: 'Naviguer sur le site',
          body: "Le classement principal se filtre par type et par genre, avec vingt catégories couvrant aussi bien l'action que le documentaire. La page Statistiques donne une vue d'ensemble : genres dominants, répartition linguistique, années de sortie, notes moyennes comparées entre cinéma et séries. Notre rapport hebdomadaire décrypte les mouvements de la semaine avec un vrai regard éditorial, et notre blog publie chaque jour une analyse consacrée à un titre en particulier, son contexte de production, les raisons de son succès et ce qu'il révèle du paysage actuel. C'est là que se trouve l'essentiel de notre travail de fond.",
        },
      ],
    },
    en: {
      title: 'How to read the TrendingShows global ranking',
      intro: "Every day, thousands of films and shows circulate across streaming platforms, and it has become difficult to tell what genuinely works from what simply benefits from a big marketing push. TrendingShows exists to answer that precise question: what is the world actually watching right now, and why.",
      sections: [
        {
          heading: 'Our ranking method',
          body: "Our rankings rely on worldwide popularity data aggregated by TMDB, a community database fed by millions of users around the world. That score combines several signals: page traffic, vote volume, list additions and how those indicators have moved over recent days. We pull this data every night, sort it by content type, then keep seven rolling days of history so we can measure movement rather than frozen positions. A title climbing ten places in three days tells you something a static top list never shows.",
        },
        {
          heading: 'What the numbers say, and what they do not',
          body: "One important note for reading our pages correctly: popularity is not quality. A blockbuster panned by critics can dominate the ranking for two weeks simply because everyone is talking about it, including negatively. That is why we systematically display the average viewer rating next to the position. The gap between the two is often the most interesting piece of information on the page. We also do not measure the platforms' actual watch hours, which Netflix, Disney+ and Prime Video release sparingly and according to their own methodologies. What we measure is the worldwide attention paid to a title, which is different and often more revealing of the trends taking shape.",
        },
        {
          heading: 'Getting around the site',
          body: "The main ranking filters by type and genre, with twenty categories covering everything from action to documentary. The Statistics page gives you the wider view: dominant genres, language distribution, release years, average ratings compared between film and television. Our weekly report breaks down the week's movements with genuine editorial perspective, and our blog publishes a daily analysis devoted to one specific title, its production context, the reasons behind its success and what it reveals about the current landscape. That is where the bulk of our real work lives.",
        },
      ],
    },
  },
  movies: {
    fr: {
      title: 'Les films en tendance, mode d\'emploi',
      intro: "Cette page rassemble les films qui concentrent le plus d'attention dans le monde en ce moment. Le classement est reconstruit chaque nuit à partir des données de popularité TMDB, ce qui signifie qu'il bouge en permanence, parfois de façon spectaculaire quand une sortie majeure arrive ou qu'un titre plus ancien retrouve une seconde vie.",
      sections: [
        {
          heading: 'Pourquoi un film monte dans le classement',
          body: "Trois scénarios reviennent régulièrement dans nos données. Le premier est évident : une sortie en salle ou sur plateforme, portée par une campagne marketing, qui propulse le titre en quelques heures. Le deuxième est plus intéressant, c'est la remontée progressive, celle d'un film qui gagne du terrain semaine après semaine par le bouche-à-oreille, souvent un film d'horreur à petit budget ou une production internationale sous-estimée. Le troisième est le réveil de catalogue : un titre vieux de dix ou vingt ans qui réapparaît soudainement parce qu'un acteur fait l'actualité, qu'une suite est annoncée ou qu'une scène est devenue virale sur les réseaux. Ces trois dynamiques donnent trois profils de films très différents dans une même liste.",
        },
        {
          heading: 'Filtrer par genre pour affiner',
          body: "Le classement général est dominé par les grosses productions, c'est mécanique. Si vous cherchez quelque chose de précis, les filtres de genre donnent une lecture beaucoup plus utile. Le filtre Horreur fait remonter des propositions à budget modeste qui n'apparaîtraient jamais dans le top global, le filtre Documentaire révèle un pan entier de la production que les classements généralistes écrasent, et le filtre Animation mélange films familiaux et productions japonaises dans des proportions qui varient énormément selon les semaines. Chaque genre a son propre rythme, ses propres cycles, et ses propres surprises.",
        },
      ],
    },
    en: {
      title: 'Trending movies, how to use this page',
      intro: "This page gathers the films concentrating the most attention worldwide right now. The ranking is rebuilt every night from TMDB popularity data, which means it moves constantly, sometimes dramatically when a major release lands or an older title finds a second life.",
      sections: [
        {
          heading: 'Why a film climbs the ranking',
          body: "Three scenarios come up regularly in our data. The first is obvious: a theatrical or platform release, carried by a marketing campaign, propelling the title within hours. The second is more interesting, the gradual climb, a film gaining ground week after week through word of mouth, often a low-budget horror picture or an underestimated international production. The third is the catalog awakening: a ten or twenty-year-old title suddenly resurfacing because an actor is in the news, a sequel has been announced or a scene has gone viral. These three dynamics produce three very different profiles of film inside the same list.",
        },
        {
          heading: 'Filter by genre to sharpen the view',
          body: "The general ranking is dominated by big productions, that is mechanical. If you are looking for something specific, the genre filters give a far more useful reading. The Horror filter surfaces modest-budget work that would never appear in the global top, the Documentary filter reveals an entire section of production that general rankings crush, and the Animation filter mixes family films with Japanese productions in proportions that swing wildly week to week. Each genre has its own rhythm, its own cycles, and its own surprises.",
        },
      ],
    },
  },
  series: {
    fr: {
      title: 'Les séries en tendance, mode d\'emploi',
      intro: "Les séries obéissent à une logique de classement très différente de celle du cinéma, et cette page en tient compte. Une série ne sort pas un jour donné pour disparaître trois semaines plus tard, elle vit au rythme de ses épisodes, de ses saisons et de ses périodes de latence, parfois pendant des années.",
      sections: [
        {
          heading: 'Le rythme particulier des séries',
          body: "Nos données montrent deux modèles de diffusion aux effets radicalement opposés. La diffusion hebdomadaire, celle de HBO ou d'Apple TV+, maintient un titre dans le classement pendant deux à trois mois avec un pic chaque semaine au moment de l'épisode. La sortie intégrale, modèle Netflix, produit un pic massif sur cinq à sept jours, puis une chute rapide, parfois brutale. Ni l'un ni l'autre n'est meilleur, ils racontent simplement des histoires différentes dans un classement. Une série en diffusion hebdomadaire qui reste stable pendant huit semaines a probablement un public plus engagé qu'un titre qui explose trois jours avant de disparaître.",
        },
        {
          heading: 'Le poids croissant des productions non anglophones',
          body: "C'est l'évolution la plus nette que nous observons depuis que nous suivons ces classements. Les séries coréennes, japonaises, espagnoles et scandinaves occupent une part de plus en plus large du top mondial, et surtout, elles y restent plus longtemps qu'avant. Le sous-titrage n'est plus l'obstacle qu'il représentait il y a dix ans, et le public jeune passe d'une langue à l'autre sans y prêter attention. Notre page Statistiques permet de suivre cette répartition linguistique semaine après semaine, et c'est probablement l'indicateur le plus révélateur de ce qui est en train de changer dans la fiction télévisée mondiale.",
        },
      ],
    },
    en: {
      title: 'Trending shows, how to use this page',
      intro: "Series follow a ranking logic very different from cinema, and this page accounts for it. A show does not open on one date and vanish three weeks later, it lives to the rhythm of its episodes, its seasons and its dormant periods, sometimes for years.",
      sections: [
        {
          heading: 'The particular rhythm of series',
          body: "Our data shows two release models with radically opposite effects. Weekly release, the HBO and Apple TV+ approach, keeps a title in the ranking for two to three months with a spike every week when the episode drops. Full-season release, the Netflix model, produces a massive peak over five to seven days, then a fast, sometimes brutal decline. Neither is better, they simply tell different stories inside a ranking. A weekly show holding steady for eight weeks probably has a more engaged audience than a title that explodes for three days then disappears.",
        },
        {
          heading: 'The growing weight of non-English productions',
          body: "This is the clearest shift we have observed since we started tracking these rankings. Korean, Japanese, Spanish and Scandinavian series occupy an ever larger share of the global top, and more importantly, they stay there longer than they used to. Subtitles are no longer the obstacle they were ten years ago, and younger audiences switch between languages without giving it a thought. Our Statistics page lets you follow that language distribution week after week, and it is probably the most revealing indicator of what is currently changing in global television fiction.",
        },
      ],
    },
  },
};

export default function EditorialSection({ page }: { page: PageKey }) {
  const { i18n } = useTranslation();
  const block = CONTENT[page][i18n.language === 'fr' ? 'fr' : 'en'];

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 16px 8px' }}>
      <div style={{ maxWidth: 780 }}>
        <div style={{ height: 2, width: 56, background: 'linear-gradient(90deg,#C5001E,#E8006A)', borderRadius: 1, marginBottom: 20 }} />
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, lineHeight: 1.3, marginBottom: 14 }}>{block.title}</h2>
        <p style={{ color: '#BBBBBB', fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>{block.intro}</p>

        {block.sections.map(s => (
          <div key={s.heading} style={{ marginBottom: 26 }}>
            <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.heading}</h3>
            <p style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.85, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

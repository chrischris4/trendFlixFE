// Texte éditorial propre à chaque genre. Il conditionne l'indexation : seules
// les pages disposant d'un insight sont soumises au crawl et marquées
// `index: true`, pour ne pas exposer de pages purement templatées.

export const genreInsights: Record<string, { fr: string; en: string }> = {
  action: {
    fr: "L'action est le genre qui domine le plus régulièrement nos classements en volume, et le plus mal noté en proportion. C'est logique : ce sont les productions qui touchent le public le plus large, donc le public le moins sélectionné, et une note moyenne récompense rarement un film vu par tout le monde. En série, le genre fonctionne différemment, il se mélange presque toujours au thriller ou à la science-fiction plutôt que d'exister seul.",
    en: "Action is the genre that most regularly dominates our rankings by volume, and the worst rated in proportion. That makes sense: these are the productions reaching the widest audience, therefore the least self-selected one, and an average rating rarely rewards a film everyone watched. In series form the genre behaves differently, almost always blending with thriller or science fiction rather than standing alone.",
  },
  comedie: {
    fr: "La comédie est le genre qui voyage le plus mal. L'humour dépend de références culturelles, de rythmes de dialogue et de non-dits qui passent rarement les frontières intactes, et nos données le confirment : une comédie domine son marché d'origine et disparaît ailleurs. C'est le genre où l'écart entre popularité locale et présence internationale est le plus marqué.",
    en: "Comedy is the genre that travels worst. Humour depends on cultural references, dialogue rhythms and unspoken assumptions that rarely cross borders intact, and our data confirms it: a comedy dominates its home market and vanishes elsewhere. It is the genre with the sharpest gap between local popularity and international presence.",
  },
  drame: {
    fr: "Le drame occupe le haut de l'échelle des notes dans nos relevés, surtout en série. Un spectateur qui a investi dix heures dans un récit dramatique note l'expérience qu'il a choisi de poursuivre, pas une séance qu'il a subie. Ce biais d'auto-sélection explique une bonne part de la différence de notation entre les séries dramatiques et les films grand public.",
    en: "Drama sits at the top of the rating scale in our records, especially in series form. A viewer who invested ten hours in a dramatic narrative rates an experience they chose to continue, not a screening they sat through. That self-selection bias explains much of the rating gap between dramatic series and mainstream films.",
  },
  horreur: {
    fr: "L'horreur est le genre où le rapport entre budget et résultat est le plus favorable. Nos classements y font régulièrement apparaître des productions à quelques centaines de milliers de dollars aux côtés de blockbusters, et elles y restent. La barre de notation y est aussi plus basse qu'ailleurs : dans l'horreur, tout ce qui dépasse 6,5 mérite déjà l'attention.",
    en: "Horror is the genre with the most favourable budget-to-result ratio. Our rankings regularly show productions made for a few hundred thousand dollars sitting beside blockbusters, and staying there. The rating bar is also lower than elsewhere: in horror, anything above 6.5 already deserves attention.",
  },
  'sci-fi': {
    fr: "La science-fiction est le genre le plus international de nos données. Ses univers ne reposent pas sur un contexte culturel préexistant, ce qui lui permet d'être compris partout de la même façon. C'est aussi le genre où les adaptations de romans réussissent le mieux : elles apportent une histoire que le public n'a jamais vue à l'écran, plutôt qu'une comparaison à perdre.",
    en: "Science fiction is the most international genre in our data. Its worlds do not rest on a preexisting cultural context, which lets them be understood the same way everywhere. It is also the genre where novel adaptations perform best: they bring a story audiences have never seen on screen, rather than a comparison they can only lose.",
  },
  thriller: {
    fr: "Le thriller est le genre le plus stable de nos classements. Peu de pics, peu d'effondrements, une présence continue sans jamais écraser le sommet. Il bénéficie aussi du format sériel mieux que la plupart : étaler la tension sur plusieurs épisodes permet une montée que deux heures ne rendent pas possible.",
    en: "Thriller is the most stable genre in our rankings. Few spikes, few collapses, a continuous presence without ever dominating the top. It also benefits from the serial format better than most: spreading tension across several episodes allows a build-up two hours cannot deliver.",
  },
  romance: {
    fr: "La romance est le genre où l'écart entre les chiffres d'audience et les notes est le plus large. Ses productions sont massivement regardées et sévèrement notées, souvent par des spectateurs qui ne sont pas son public. C'est aussi le genre le plus dépendant des communautés de fans, qui font entrer un titre dans nos classements dès le jour de sortie.",
    en: "Romance is the genre with the widest gap between viewing figures and ratings. Its productions are massively watched and severely rated, often by viewers who are not its audience. It is also the genre most dependent on fan communities, which push a title into our rankings on release day.",
  },
  animation: {
    fr: "L'animation présente l'écart de notation le plus large à l'intérieur d'un même genre dans nos relevés, parfois plus de deux points entre deux titres visant pourtant le même public familial. La raison tient rarement à la qualité brute : le public note une production animée face à celle qu'il aimait déjà, et les suites de franchises installées partent avec le plus lourd handicap.",
    en: "Animation shows the widest rating spread within a single genre in our records, sometimes more than two points between two titles aimed at the same family audience. The reason is rarely raw quality: audiences rate an animated production against the one they already loved, and sequels to established franchises start with the heaviest handicap.",
  },
  aventure: {
    fr: "L'aventure fonctionne rarement seule dans nos données : elle accompagne presque toujours l'action, la fantasy ou l'animation. C'est un genre de structure plus que de sujet, ce qui explique qu'il apparaisse dans un très grand nombre de classements sans jamais en dominer un seul en propre.",
    en: "Adventure rarely stands alone in our data: it almost always accompanies action, fantasy or animation. It is a genre of structure more than of subject, which explains why it appears across a great many rankings without ever dominating one in its own right.",
  },
  documentaire: {
    fr: "Le documentaire est le genre le mieux noté et le moins regardé de nos classements. Son public est petit et volontaire, ce qui produit mécaniquement des notes élevées sur peu de votes. Il apparaît surtout par vagues, porté par l'actualité ou par un sujet criminel qui déclenche un phénomène de conversation.",
    en: "Documentary is the best rated and least watched genre in our rankings. Its audience is small and deliberate, which mechanically produces high ratings on few votes. It surfaces mainly in waves, driven by current events or by a true-crime subject that triggers a conversation phenomenon.",
  },
  mystere: {
    fr: "Le mystère est le genre qui retient son public le plus longtemps, et celui qui risque le plus de le perdre d'un coup. Nos relevés montrent des séries tenant des notes très hautes pendant plusieurs saisons sans livrer leurs réponses, puis chutant brutalement si la conclusion déçoit. C'est un pari narratif que la notation sanctionne rarement à moitié.",
    en: "Mystery is the genre that holds its audience longest, and the one most likely to lose it all at once. Our records show series holding very high ratings across several seasons without delivering their answers, then dropping sharply if the conclusion disappoints. It is a narrative gamble that ratings rarely punish by halves.",
  },
  crime: {
    fr: "Le crime est le genre le plus régulier de la télévision mondiale. Il traverse tous les marchés, se décline dans toutes les langues et produit partout des séries au long cours. Dans nos classements, c'est le genre où les productions non anglophones percent le plus facilement à l'international.",
    en: "Crime is the most consistent genre in global television. It crosses every market, works in every language and produces long-running series everywhere. In our rankings it is the genre where non-English-language productions break through internationally most easily.",
  },
  reality: {
    fr: "La téléréalité occupe une place paradoxale dans nos données : une présence forte dans les classements d'audience, des notes systématiquement basses. Elle est aussi le genre le plus ancré localement, chaque pays produisant ses propres formats à partir de licences internationales, si bien qu'un même concept n'apparaît presque jamais deux fois dans nos relevés.",
    en: "Reality television holds a paradoxical place in our data: a strong presence in viewing rankings, systematically low ratings. It is also the most locally anchored genre, each country producing its own formats from international licences, so the same concept almost never appears twice in our records.",
  },
  famille: {
    fr: "Le genre familial est celui dont l'audience est la plus large et la notation la plus dure. Il est regardé par deux publics à la fois, les enfants qui le choisissent et les adultes qui le notent, et cette asymétrie explique une bonne partie de ses scores modestes dans nos classements malgré des chiffres de visionnage élevés.",
    en: "Family is the genre with the broadest audience and the harshest ratings. It is watched by two audiences at once, the children who choose it and the adults who rate it, and that asymmetry explains much of its modest scores in our rankings despite high viewing figures.",
  },
};

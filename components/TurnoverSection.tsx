import type { ChartEvolutionPoint } from '../types';

/**
 * Rendu serveur : ces chiffres viennent de la comparaison de nos releves
 * successifs. TMDB publie une popularite du moment, jamais la part du
 * classement renouvelee depuis la veille ni la duree de presence d'un titre.
 */
interface Props {
  evolution?: ChartEvolutionPoint[];
  type: 'movie' | 'tv';
}

const paragraph = { color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 14 } as const;
const highlight = { color: '#fff' } as const;

function describeRegime(avg: number, plural: string): string {
  if (avg >= 40) return `un classement qui se réécrit vite, où ${plural} disposent de quelques jours pour exister`;
  if (avg >= 20) return `un classement mobile, où une entrée sur cinq change chaque jour`;
  if (avg >= 8) return `un classement à forte inertie, où un titre installé reste visible plusieurs semaines`;
  return `un classement remarquablement figé, où les places se libèrent au compte-gouttes`;
}

export default function TurnoverSection({ evolution, type }: Props) {
  const points = (evolution ?? []).filter(point => point.entriesTotal > 0);
  // Un seul releve ne dit rien d'un renouvellement : il en faut deux a comparer.
  if (points.length < 1) return null;

  const noun = type === 'movie' ? 'films' : 'séries';
  const churns = points.map(p => p.churnPct);
  const avg = Math.round(churns.reduce((a, b) => a + b, 0) / churns.length);
  const latest = points[0];

  const tenured = points.reduce<ChartEvolutionPoint | null>(
    (best, p) => ((p.topTenureDays ?? 0) > (best?.topTenureDays ?? 0) ? p : best),
    null,
  );
  const gainer = points.reduce<ChartEvolutionPoint | null>(
    (best, p) => ((p.topGainerDelta ?? 0) > (best?.topGainerDelta ?? 0) ? p : best),
    null,
  );

  return (
    <section style={{ maxWidth: 820, margin: '40px auto 0', padding: '28px 16px 0', borderTop: '1px solid #2A2A2A' }}>
      <h2 style={{ color: '#fff', fontSize: 19, fontWeight: 700, marginBottom: 12 }}>
        À quelle vitesse ce classement se renouvelle
      </h2>

      <p style={paragraph}>
        {points.length > 1
          ? `Sur les ${points.length} derniers jours, le classement des ${noun} a renouvelé en moyenne `
          : `Au dernier relevé, le classement des ${noun} a renouvelé `}
        <strong style={highlight}>{avg} %</strong> de ses entrées d’un jour sur l’autre, soit{' '}
        {describeRegime(avg, noun)}. Ce chiffre vient de la comparaison de nos relevés successifs : TMDB publie une
        popularité du moment, jamais la part qui a survécu depuis la veille.
      </p>

      <p style={paragraph}>
        Le relevé du jour compte <strong style={highlight}>{latest.entriesTotal}</strong> titres, dont{' '}
        {latest.newEntries} entrés depuis la veille et {latest.droppedOut} sortis, répartis sur{' '}
        <strong style={highlight}>{latest.uniqueLanguages}</strong> langues originales.
        {latest.avgPopularity != null && ` Leur popularité moyenne s’établit à ${Math.round(latest.avgPopularity)} points, une valeur qui monte quand le classement est porté par des sorties récentes et retombe quand il vit de son catalogue.`}
      </p>

      {tenured?.topTenureTitle && (
        <p style={paragraph}>
          Le titre le plus tenace est <strong style={highlight}>{tenured.topTenureTitle}</strong>, présent{' '}
          {tenured.topTenureDays} jours consécutifs. La durée de présence mesure bien mieux la solidité d’un titre que sa
          position d’entrée, parce qu’elle est la seule chose qu’un budget de lancement ne peut pas acheter.
        </p>
      )}

      {gainer?.topGainerTitle && (
        <p style={{ ...paragraph, marginBottom: 0 }}>
          La plus forte progression revient à <strong style={highlight}>{gainer.topGainerTitle}</strong>, qui a gagné{' '}
          {gainer.topGainerDelta} places en une journée. Un bond de cette ampleur en vingt-quatre heures signale presque
          toujours un public venu d’ailleurs, bande-annonce ou sortie de plateforme, plutôt qu’une découverte
          progressive.
        </p>
      )}
    </section>
  );
}

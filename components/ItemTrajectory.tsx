import type { ItemHistory } from '../types';

/**
 * Rendu serveur volontaire : c'est la seule partie de la fiche que le crawler
 * doit voir, et la seule qui n'existe pas chez TMDB. Le reste de la fiche,
 * interactif, demeure cote client.
 */
interface Props { history: ItemHistory }

/** En dessous, la trajectoire est trop courte pour justifier une page indexee. */
export const MIN_DAYS_TO_INDEX = 14;

export function isIndexable(history: ItemHistory | null): boolean {
  return Boolean(history && history.daysOnChart >= MIN_DAYS_TO_INDEX);
}

const frenchDate = (day: string) =>
  new Date(day + 'T00:00:00Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// « la 1re place », mais « la 2e place » : le rang 1 s'accorde au feminin.
const ordinal = (rank: number) => (rank === 1 ? '1re' : `${rank}e`);

export default function ItemTrajectory({ history }: Props) {
  const unit = history.type === 'movie' ? 'film' : 'série';
  const gendered = history.type === 'movie' ? 'ce film' : 'cette série';
  const held = history.type === 'movie' ? 'entré' : 'entrée';

  // La popularite TMDB decroit : la pente compte davantage que la valeur du jour.
  const decay = history.decayPct;
  const regime = decay === null
    ? null
    : decay >= 80
      ? 'une retombée quasi totale, typique d’un titre porté par sa seule semaine de sortie'
      : decay >= 50
        ? 'une retombée marquée, la moitié de l’attention initiale a disparu'
        : decay >= 20
          ? 'une érosion modérée, le titre tient mieux que la moyenne des sorties'
          : 'une popularité encore proche de son maximum, ce qui est rare passé les premiers jours';

  return (
    <section style={{ maxWidth: 820, margin: '32px auto 0', padding: '0 16px 8px' }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
        Parcours de {gendered} dans le classement
      </h2>

      <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 14 }}>
        {held.charAt(0).toUpperCase() + held.slice(1)} dans nos relevés le {frenchDate(history.firstSeen)}, ce {unit} y a
        figuré <strong style={{ color: '#fff' }}>{history.daysOnChart} jour{history.daysOnChart > 1 ? 's' : ''}</strong>.
        Sa meilleure position est la <strong style={{ color: '#fff' }}>{ordinal(history.peakRank.rank)}</strong> place,
        atteinte le {frenchDate(history.peakRank.day)}. TMDB publie une popularité du moment : ni le pic atteint, ni la
        durée de présence, ni la pente qui suit. Ces trois mesures viennent de la comparaison de nos relevés successifs.
      </p>

      {decay !== null && (
        <p style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
          Sa popularité a culminé à <strong style={{ color: '#fff' }}>{Math.round(history.peakPopularity.value)}</strong>{' '}
          points le {frenchDate(history.peakPopularity.day)}, contre{' '}
          <strong style={{ color: '#fff' }}>{Math.round(history.currentPopularity)}</strong> au dernier relevé, soit{' '}
          <strong style={{ color: '#fff' }}>{decay} %</strong> de perdus. C’est {regime}. La popularité TMDB agrège des
          consultations et des ajouts en liste : elle mesure l’attention du moment, pas la qualité, et elle retombe pour
          tout le monde. Ce qui distingue un titre, c’est la vitesse à laquelle il retombe.
        </p>
      )}

      <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Relevés quotidiens</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ color: '#777', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px 8px 0', fontWeight: 600 }}>Jour</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>Place</th>
              <th style={{ padding: '8px 0 8px 10px', fontWeight: 600 }}>Popularité</th>
            </tr>
          </thead>
          <tbody>
            {history.timeline.slice(-14).reverse().map(point => (
              <tr key={point.day} style={{ borderTop: '1px solid #2A2A2A', color: '#CCCCCC' }}>
                <td style={{ padding: '8px 10px 8px 0' }}>{frenchDate(point.day)}</td>
                <td style={{ padding: '8px 10px' }}>{ordinal(point.rank)}</td>
                <td style={{ padding: '8px 0 8px 10px' }}>{point.popularity ? Math.round(point.popularity) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {history.timeline.length > 14 && (
        <p style={{ color: '#666', fontSize: 13, marginTop: 8 }}>
          Les 14 derniers relevés sur {history.timeline.length} enregistrés depuis le {frenchDate(history.firstSeen)}.
        </p>
      )}
    </section>
  );
}

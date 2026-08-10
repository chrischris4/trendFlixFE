export const runtime = 'edge';

import type { Metadata } from 'next';
import ClientOnly from '../../../components/ClientOnly';
import DetailPage from '../../../components/DetailPage';
import ItemTrajectory, { isIndexable } from '../../../components/ItemTrajectory';
import { getItemHistory } from '../../../services/serverApi';
import { parseIdFromSlug } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const history = await getItemHistory(parseIdFromSlug(slug));
  if (!history) {
    // Sans trajectoire, la fiche n'apporte que des donnees TMDB non enrichies.
    return { robots: { index: false, follow: true } };
  }

  return {
    title: `${history.title} : parcours dans le classement`,
    description: `${history.title} : ${history.daysOnChart} jours au classement, meilleure place ${history.peakRank.rank}e${history.decayPct !== null ? `, ${history.decayPct} % de popularité perdue depuis son pic` : ''}. Relevés quotidiens et courbe de retombée.`,
    // Une fiche n'entre dans l'index que si sa trajectoire est assez longue pour
    // apporter quelque chose : sinon elle n'est qu'un gabarit de plus.
    robots: { index: isIndexable(history), follow: true },
    alternates: { canonical: `https://trendingshows.com/series/${slug}` },
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const tmdbId = parseIdFromSlug(slug);
  const history = await getItemHistory(tmdbId);

  return (
    <>
      <ClientOnly><DetailPage type="tv" id={tmdbId} /></ClientOnly>
      {/* Hors ClientOnly : c'est la partie que le crawler doit voir. */}
      {history && <ItemTrajectory history={history} />}
    </>
  );
}

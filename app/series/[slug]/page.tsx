export const runtime = 'edge';

import ClientOnly from '../../../components/ClientOnly';
import DetailPage from '../../../components/DetailPage';
import { parseIdFromSlug } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

// Fiches détaillées : données TMDB non enrichies, exclues de l'index pour
// concentrer le crawl sur les pages éditoriales et les classements.
export const metadata = {
  robots: { index: false, follow: true },
};

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ClientOnly><DetailPage type="tv" id={parseIdFromSlug(slug)} /></ClientOnly>;
}

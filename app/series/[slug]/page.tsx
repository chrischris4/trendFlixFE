export const runtime = 'edge';

import ClientOnly from '../../../components/ClientOnly';
import DetailPage from '../../../components/DetailPage';
import { parseIdFromSlug } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ClientOnly><DetailPage type="tv" id={parseIdFromSlug(slug)} /></ClientOnly>;
}

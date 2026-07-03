export const runtime = 'edge';

import dynamic from 'next/dynamic';
import { parseIdFromSlug } from '../../../utils/slug';

const DetailPage = dynamic(() => import('../../../components/DetailPage'), { ssr: false });

interface Props { params: Promise<{ slug: string }> }

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  return <DetailPage type="tv" id={parseIdFromSlug(slug)} />;
}

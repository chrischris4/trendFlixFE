export const runtime = 'edge';

import DetailPage from '../../../components/DetailPage';
import { parseIdFromSlug } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

export default async function MovieDetailPage({ params }: Props) {
  const { slug } = await params;
  return <DetailPage type="movie" id={parseIdFromSlug(slug)} />;
}

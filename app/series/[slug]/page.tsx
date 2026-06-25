import DetailPage from '../../../components/DetailPage';
import { parseIdFromSlug } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  return <DetailPage type="tv" id={parseIdFromSlug(slug)} />;
}

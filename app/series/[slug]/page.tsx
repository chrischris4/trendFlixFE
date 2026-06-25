import DetailPage from '../../../components/DetailPage';
import { parseIdFromSlug, slugify } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/trending?type=tv&limit=100`);
    if (!res.ok) return [];
    const items: { title: string; tmdbId: number }[] = await res.json();
    return items.map(item => ({ slug: slugify(item.title, item.tmdbId) }));
  } catch {
    return [];
  }
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  return <DetailPage type="tv" id={parseIdFromSlug(slug)} />;
}

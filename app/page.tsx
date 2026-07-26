import { Suspense } from 'react';
import HomeContent from '../components/HomeContent';
import { getBlogArticles, getTrendingItems } from '../services/serverApi';

export const runtime = 'edge';
// Le classement change chaque jour et le cron publie un article par jour :
// la page doit être recalculée à chaque requête, pas figée au build.
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ type?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { type } = await searchParams;
  const mediaType = type === 'series' ? 'tv' : 'movie';

  const [initialItems, initialArticles] = await Promise.all([
    getTrendingItems(mediaType, 100),
    getBlogArticles(),
  ]);

  return (
    <Suspense fallback={<div style={{ backgroundColor: '#0F0F0F', minHeight: '100vh' }} />}>
      <HomeContent
        initialItems={initialItems}
        initialType={mediaType}
        initialArticles={initialArticles}
      />
    </Suspense>
  );
}

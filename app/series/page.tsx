import TrendingPage from '../../components/TrendingPage';
import { getBlogArticles, getTrendingItems } from '../../services/serverApi';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Séries en tendance',
  description: 'Découvrez les séries dont tout le monde parle en ce moment.',
};

export default async function SeriesPage() {
  const [initialItems, initialArticles] = await Promise.all([
    getTrendingItems('tv', 40),
    getBlogArticles(),
  ]);
  return <TrendingPage type="tv" initialItems={initialItems} initialArticles={initialArticles} />;
}

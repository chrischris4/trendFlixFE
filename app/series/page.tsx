import TrendingPage from '../../components/TrendingPage';
import { getBlogArticles, getChartEvolution, getTrendingItems } from '../../services/serverApi';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Trending TV series',
  description: 'Discover the shows everyone is talking about right now.',
};

export default async function SeriesPage() {
  const [initialItems, initialArticles, evolution] = await Promise.all([
    getTrendingItems('tv', 40),
    getBlogArticles(),
    getChartEvolution('tv'),
  ]);
  return <TrendingPage type="tv" initialItems={initialItems} initialArticles={initialArticles} evolution={evolution} />;
}

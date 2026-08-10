import TrendingPage from '../../components/TrendingPage';
import { getBlogArticles, getChartEvolution, getTrendingItems } from '../../services/serverApi';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Trending movies',
  description: 'Discover the films everyone is watching right now, worldwide.',
};

export default async function MoviesPage() {
  const [initialItems, initialArticles, evolution] = await Promise.all([
    getTrendingItems('movie', 40),
    getBlogArticles(),
    getChartEvolution('movie'),
  ]);
  return <TrendingPage type="movie" initialItems={initialItems} initialArticles={initialArticles} evolution={evolution} />;
}

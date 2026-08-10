import TrendingPage from '../../components/TrendingPage';
import { getBlogArticles, getChartEvolution, getTrendingItems } from '../../services/serverApi';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Films en tendance',
  description: 'Découvrez les films qui cartonnent en ce moment dans le monde entier.',
};

export default async function MoviesPage() {
  const [initialItems, initialArticles, evolution] = await Promise.all([
    getTrendingItems('movie', 40),
    getBlogArticles(),
    getChartEvolution('movie'),
  ]);
  return <TrendingPage type="movie" initialItems={initialItems} initialArticles={initialArticles} evolution={evolution} />;
}

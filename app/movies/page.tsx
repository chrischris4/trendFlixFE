import TrendingPage from '../../components/TrendingPage';
import { getBlogArticles, getTrendingItems } from '../../services/serverApi';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Films en tendance',
  description: 'Découvrez les films qui cartonnent en ce moment dans le monde entier.',
};

export default async function MoviesPage() {
  const [initialItems, initialArticles] = await Promise.all([
    getTrendingItems('movie', 40),
    getBlogArticles(),
  ]);
  return <TrendingPage type="movie" initialItems={initialItems} initialArticles={initialArticles} />;
}

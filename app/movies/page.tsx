import TrendingPage from '../../components/TrendingPage';

export const metadata = {
  title: 'Films en tendance',
  description: 'Découvrez les films qui cartonnent en ce moment dans le monde entier.',
};

export default function MoviesPage() {
  return <TrendingPage type="movie" />;
}

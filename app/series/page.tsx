import TrendingPage from '../../components/TrendingPage';

export const metadata = {
  title: 'Séries en tendance',
  description: 'Découvrez les séries dont tout le monde parle en ce moment.',
};

export default function SeriesPage() {
  return <TrendingPage type="tv" />;
}

import type { Metadata } from 'next';
import MethodologyPage from '../../components/MethodologyPage';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Methodology and editorial standards',
  description: 'How TrendingShows uses TMDB popularity data and reviews its film and television analysis.',
  alternates: { canonical: 'https://trendingshows.com/methodology' },
};

export default function Page() {
  return <MethodologyPage />;
}

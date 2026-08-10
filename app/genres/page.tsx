import type { Metadata } from 'next';
import GenresGuidePage from '../../components/GenresGuidePage';

export const metadata: Metadata = {
  title: 'Genre guide — TrendingShows',
  description: 'What the TMDB data reveals about each genre, from documentary to action: why ratings vary so much between genres, and how to read them.',
  alternates: { canonical: 'https://trendingshows.com/genres/' },
  openGraph: {
    type: 'article',
    url: 'https://trendingshows.com/genres/',
    title: 'Genre guide — TrendingShows',
    description: 'What the TMDB data reveals about each genre, and how to read a film or series rating.',
    siteName: 'TrendingShows',
  },
};

export default function Genres() {
  return <GenresGuidePage />;
}

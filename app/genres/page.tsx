import type { Metadata } from 'next';
import GenresGuidePage from '../../components/GenresGuidePage';

export const metadata: Metadata = {
  title: 'Guide des genres — TrendingShows',
  description: "Ce que les données TMDB révèlent sur chaque genre, du documentaire à l'action : pourquoi les notes varient autant d'un genre à l'autre, et comment les lire.",
  alternates: { canonical: 'https://trendingshows.com/genres/' },
  openGraph: {
    type: 'article',
    url: 'https://trendingshows.com/genres/',
    title: 'Guide des genres — TrendingShows',
    description: 'Ce que les données TMDB révèlent sur chaque genre, et comment lire une note de film ou de série.',
    siteName: 'TrendingShows',
  },
};

export default function Genres() {
  return <GenresGuidePage />;
}

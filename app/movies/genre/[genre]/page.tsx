export const runtime = 'edge';

import type { Metadata } from 'next';
import ClientOnly from '../../../../components/ClientOnly';
import GenrePage from '../../../../components/GenrePage';
import { MOVIE_GENRES, genreLabel } from '../../../../constants/config';

interface Props { params: Promise<{ genre: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  const definition = MOVIE_GENRES.find(item => item.slug === genre);
  const label = definition ? genreLabel(definition, 'en') : genre;
  return {
    title: `Trending ${label} movies right now`,
    description: `Daily ${label} movie ranking with TMDB popularity, audience ratings and original-language analysis.`,
    robots: { index: Boolean(definition), follow: true },
    alternates: { canonical: `https://trendingshows.com/movies/genre/${genre}` },
  };
}

export default async function MovieGenrePage({ params }: Props) {
  const { genre } = await params;
  return <ClientOnly><GenrePage genre={genre} type="movie" /></ClientOnly>;
}

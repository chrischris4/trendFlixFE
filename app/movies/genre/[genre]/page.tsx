export const runtime = 'edge';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GenrePage from '../../../../components/GenrePage';
import { MOVIE_GENRES, genreLabel } from '../../../../constants/config';
import { getTrendingItems } from '../../../../services/serverApi';

interface Props { params: Promise<{ genre: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  const definition = MOVIE_GENRES.find(item => item.slug === genre);
  if (!definition) return { title: 'Page not found', robots: { index: false, follow: false } };

  const label = genreLabel(definition, 'en');
  // Un genre valide mais absent du classement du jour ne rend qu'un message
  // « aucun résultat » : la page reste accessible, hors index.
  const items = await getTrendingItems('movie', 40);
  const hasResults = items.some(item => item.genreIds.includes(definition.id));

  return {
    title: `Trending ${label} movies right now`,
    description: `Daily ${label} movie ranking with TMDB popularity, audience ratings and original-language analysis.`,
    robots: { index: hasResults, follow: true },
    alternates: { canonical: `https://trendingshows.com/movies/genre/${genre}` },
  };
}

export default async function MovieGenrePage({ params }: Props) {
  const { genre } = await params;
  // Un slug inconnu renvoyait un 200 avec une coquille vide, donc un soft 404.
  if (!MOVIE_GENRES.some(item => item.slug === genre)) notFound();
  const initialItems = await getTrendingItems('movie', 40);
  return <GenrePage genre={genre} type="movie" initialItems={initialItems} />;
}

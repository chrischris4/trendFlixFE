export const runtime = 'edge';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GenrePage from '../../../../components/GenrePage';
import { TV_GENRES, genreLabel } from '../../../../constants/config';
import { getTrendingItems } from '../../../../services/serverApi';

interface Props { params: Promise<{ genre: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  const definition = TV_GENRES.find(item => item.slug === genre);
  if (!definition) return { title: 'Page not found', robots: { index: false, follow: false } };

  const label = genreLabel(definition, 'en');
  // Un genre valide mais absent du classement du jour ne rend qu'un message
  // « aucun résultat » : la page reste accessible, hors index.
  const items = await getTrendingItems('tv', 40);
  const hasResults = items.some(item => item.genreIds.includes(definition.id));

  return {
    title: `Trending ${label} TV series right now`,
    description: `Daily ${label} television ranking with TMDB popularity, audience ratings and original-language analysis.`,
    robots: { index: hasResults, follow: true },
    alternates: { canonical: `https://trendingshows.com/series/genre/${genre}` },
  };
}

export default async function TvGenrePage({ params }: Props) {
  const { genre } = await params;
  // Un slug inconnu renvoyait un 200 avec une coquille vide, donc un soft 404.
  if (!TV_GENRES.some(item => item.slug === genre)) notFound();
  const initialItems = await getTrendingItems('tv', 40);
  return <GenrePage genre={genre} type="tv" initialItems={initialItems} />;
}

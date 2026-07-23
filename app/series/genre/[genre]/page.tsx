export const runtime = 'edge';

import type { Metadata } from 'next';
import ClientOnly from '../../../../components/ClientOnly';
import GenrePage from '../../../../components/GenrePage';
import { TV_GENRES, genreLabel } from '../../../../constants/config';

interface Props { params: Promise<{ genre: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  const definition = TV_GENRES.find(item => item.slug === genre);
  const label = definition ? genreLabel(definition, 'en') : genre;
  return {
    title: `Trending ${label} TV series right now`,
    description: `Daily ${label} television ranking with TMDB popularity, audience ratings and original-language analysis.`,
    robots: { index: Boolean(definition), follow: true },
    alternates: { canonical: `https://trendingshows.com/series/genre/${genre}` },
  };
}

export default async function TvGenrePage({ params }: Props) {
  const { genre } = await params;
  return <ClientOnly><GenrePage genre={genre} type="tv" /></ClientOnly>;
}

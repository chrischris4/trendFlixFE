import GenrePage from '../../../../components/GenrePage';
import { TV_GENRES } from '../../../../constants/config';

export function generateStaticParams() {
  return TV_GENRES.map(g => ({ genre: g.slug }));
}

interface Props { params: Promise<{ genre: string }> }

export default async function TvGenrePage({ params }: Props) {
  const { genre } = await params;
  return <GenrePage genre={genre} type="tv" />;
}

import GenrePage from '../../../../components/GenrePage';
import { MOVIE_GENRES } from '../../../../constants/config';

export function generateStaticParams() {
  return MOVIE_GENRES.map(g => ({ genre: g.slug }));
}

interface Props { params: Promise<{ genre: string }> }

export default async function MovieGenrePage({ params }: Props) {
  const { genre } = await params;
  return <GenrePage genre={genre} type="movie" />;
}

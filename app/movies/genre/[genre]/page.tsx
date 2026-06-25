export const runtime = 'edge';

import GenrePage from '../../../../components/GenrePage';

interface Props { params: Promise<{ genre: string }> }

export default async function MovieGenrePage({ params }: Props) {
  const { genre } = await params;
  return <GenrePage genre={genre} type="movie" />;
}

export const runtime = 'edge';

import GenrePage from '../../../../components/GenrePage';

interface Props { params: Promise<{ genre: string }> }

export default async function TvGenrePage({ params }: Props) {
  const { genre } = await params;
  return <GenrePage genre={genre} type="tv" />;
}

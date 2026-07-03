export const runtime = 'edge';

import ClientOnly from '../../../../components/ClientOnly';
import GenrePage from '../../../../components/GenrePage';

interface Props { params: Promise<{ genre: string }> }

export default async function MovieGenrePage({ params }: Props) {
  const { genre } = await params;
  return <ClientOnly><GenrePage genre={genre} type="movie" /></ClientOnly>;
}

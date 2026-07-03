export const runtime = 'edge';

import dynamic from 'next/dynamic';

const GenrePage = dynamic(() => import('../../../../components/GenrePage'), { ssr: false });

interface Props { params: Promise<{ genre: string }> }

export default async function TvGenrePage({ params }: Props) {
  const { genre } = await params;
  return <GenrePage genre={genre} type="tv" />;
}

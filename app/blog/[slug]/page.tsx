export const runtime = 'edge';

import ClientOnly from '../../../components/ClientOnly';
import ArticlePage from '../../../components/ArticlePage';
import { parseIdFromSlug } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

function nameFromSlug(slug: string): string {
  return slug
    .replace(/-\d+$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const name = nameFromSlug(slug);
  return {
    title: `${name} — Analyse des tendances streaming`,
    description: `Pourquoi « ${name} » domine les tendances en ce moment : analyse complète avec les données mondiales de popularité.`,
  };
}

export default async function BlogArticleRoute({ params }: Props) {
  const { slug } = await params;
  return <ClientOnly><ArticlePage id={parseIdFromSlug(slug)} /></ClientOnly>;
}

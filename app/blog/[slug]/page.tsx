export const runtime = 'edge';

import type { Metadata } from 'next';
import ClientOnly from '../../../components/ClientOnly';
import ArticlePage from '../../../components/ArticlePage';
import { parseIdFromSlug } from '../../../utils/slug';

interface Props { params: Promise<{ slug: string }> }

interface Article {
  id: number;
  title: string;
  titleEn?: string | null;
  editorialEn: string;
  createdAt: string;
}

async function getArticle(id: number): Promise<Article | null> {
  try {
    const response = await fetch('https://trendflixbe-production.up.railway.app/blog', { cache: 'no-store' });
    if (!response.ok) return null;
    const articles: Article[] = await response.json();
    return articles.find(article => article.id === id) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(Number(parseIdFromSlug(slug)));
  const title = article?.titleEn || article?.title || 'Film and television trend analysis';
  const description = article?.editorialEn.slice(0, 155)
    || 'Original analysis based on worldwide TMDB popularity data.';
  const wordCount = article?.editorialEn.trim().split(/\s+/).filter(Boolean).length ?? 0;

  return {
    title,
    description,
    robots: { index: wordCount >= 350, follow: true },
    alternates: { canonical: `https://trendingshows.com/blog/${slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: article?.createdAt,
    },
  };
}

export default async function BlogArticleRoute({ params }: Props) {
  const { slug } = await params;
  return <ClientOnly><ArticlePage id={Number(parseIdFromSlug(slug))} /></ClientOnly>;
}

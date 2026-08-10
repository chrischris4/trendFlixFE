export const runtime = 'edge';

import type { Metadata } from 'next';
import ArticlePage from '../../../components/ArticlePage';
import { parseIdFromSlug, slugify } from '../../../utils/slug';
import { getBlogArticle, getBlogArticles } from '../../../services/serverApi';
import { articleTitle } from '../../../utils/blog';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = Number(parseIdFromSlug(slug));
  // Le texte integral vient de /blog/:id : la liste ne le transporte plus.
  const article = await getBlogArticle(id);
  const summary = (await getBlogArticles()).find(a => a.id === id);
  const title = article ? articleTitle(article) : 'Film and television trend analysis';
  const description = summary
    ? summary.excerpt.slice(0, 155)
    : 'Original analysis based on worldwide TMDB popularity data.';

  return {
    title,
    description,
    robots: { index: (summary?.wordCount ?? 0) >= 350, follow: true },
    alternates: {
      canonical: article
        ? `https://trendingshows.com/blog/${slugify(title, article.id)}`
        : `https://trendingshows.com/blog/${slug}`,
    },
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
  const id = Number(parseIdFromSlug(slug));
  const [article, list] = await Promise.all([getBlogArticle(id), getBlogArticles()]);
  return (
    <ArticlePage
      id={id}
      initialArticle={article}
      initialOthers={list.filter(a => a.id !== id).slice(0, 3)}
    />
  );
}

export const runtime = 'edge';

import type { Metadata } from 'next';
import ArticlePage from '../../../components/ArticlePage';
import { parseIdFromSlug, slugify } from '../../../utils/slug';
import { getBlogArticles } from '../../../services/serverApi';
import { articleExcerpt, articleTitle, articleWordCount } from '../../../utils/blog';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = Number(parseIdFromSlug(slug));
  const article = (await getBlogArticles()).find(a => a.id === id);
  const title = article ? articleTitle(article, false) : 'Film and television trend analysis';
  const description = article
    ? articleExcerpt(article, false).slice(0, 155)
    : 'Original analysis based on worldwide TMDB popularity data.';

  return {
    title,
    description,
    robots: { index: article ? articleWordCount(article) >= 350 : false, follow: true },
    // Le slug varie avec la langue du titre : on canonicalise toujours sur la version EN.
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
  const articles = await getBlogArticles();
  return <ArticlePage id={Number(parseIdFromSlug(slug))} initialArticles={articles} />;
}

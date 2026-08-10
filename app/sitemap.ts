import type { MetadataRoute } from 'next';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';
import { slugify } from '../utils/slug';
import { articleTitle, articleWordCount } from '../utils/blog';
import { getBlogArticles, getTrendingItems } from '../services/serverApi';

export const runtime = 'edge';
// Sinon le sitemap est figé au build et n'inclut jamais les articles publiés depuis.
export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trendingshows.com';

// next.config a trailingSlash: true, donc une URL sans slash final renvoie un 308.
// Sans ça, chaque entrée du sitemap serait une redirection pour le crawler.
const url = (path: string) => `${BASE_URL}${path}/`.replace(/\/+$/, '/');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/movies', '/series', '/weekly', '/stats', '/blog', '/genres', '/about', '/methodology', '/contact', '/privacy'].map(route => ({
    url: url(route),
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;

  // Un genre sans aucun titre dans le classement du jour rend une page vide,
  // marquée noindex par la route. On ne la soumet donc pas au crawl : même
  // filtre des deux côtés, sinon le sitemap contredit la balise robots.
  const [movies, series] = await Promise.all([
    getTrendingItems('movie', 40),
    getTrendingItems('tv', 40),
  ]);

  const movieGenreRoutes = MOVIE_GENRES
    .filter(g => movies.some(item => item.genreIds.includes(g.id)))
    .map(g => ({
      url: url(`/movies/genre/${g.slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

  const tvGenreRoutes = TV_GENRES
    .filter(g => series.some(item => item.genreIds.includes(g.id)))
    .map(g => ({
      url: url(`/series/genre/${g.slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

  // Articles publiés : une URL par article, ajoutée au fil des publications du cron.
  // Même seuil et même slug que la page article, pour ne pas soumettre au crawl
  // des URLs marquées noindex ou différentes des liens internes.
  const blogRoutes: MetadataRoute.Sitemap = (await getBlogArticles())
    .filter(article => articleWordCount(article) >= 350)
    .map(a => ({
      url: url(`/blog/${slugify(articleTitle(a), a.id)}`),
      lastModified: new Date(a.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...movieGenreRoutes, ...tvGenreRoutes, ...blogRoutes];
}

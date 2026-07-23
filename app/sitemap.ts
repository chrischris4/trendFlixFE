import type { MetadataRoute } from 'next';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';
import { slugify } from '../utils/slug';

export const runtime = 'edge';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trendingshows.com';
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://trendflixbe-production.up.railway.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/movies', '/series', '/weekly', '/stats', '/blog', '/about', '/methodology', '/contact', '/privacy'].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;

  const movieGenreRoutes = MOVIE_GENRES.map(g => ({
    url: `${BASE_URL}/movies/genre/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const tvGenreRoutes = TV_GENRES.map(g => ({
    url: `${BASE_URL}/series/genre/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Articles publiés : une URL par article, ajoutée au fil des publications du cron
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/blog`, { cache: 'no-store' });
    if (res.ok) {
      const articles: { id: number; title: string; editorialEn: string; createdAt: string }[] = await res.json();
      blogRoutes = articles
      .filter(article => article.editorialEn.trim().split(/\s+/).filter(Boolean).length >= 350)
      .map(a => ({
        url: `${BASE_URL}/blog/${slugify(a.title, a.id)}`,
        lastModified: new Date(a.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch {
    // API indisponible : le sitemap reste valide sans les articles
  }

  return [...staticRoutes, ...movieGenreRoutes, ...tvGenreRoutes, ...blogRoutes];
}

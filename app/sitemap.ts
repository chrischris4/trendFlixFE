import type { MetadataRoute } from 'next';
import { MOVIE_GENRES, TV_GENRES } from '../constants/config';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trendingshows.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/movies', '/series', '/stats', '/blog', '/about', '/contact', '/privacy'].map(route => ({
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

  return [...staticRoutes, ...movieGenreRoutes, ...tvGenreRoutes];
}

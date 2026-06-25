import type { TrendingItem, BlogArticle, StatsData } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchTrending(type: 'movie' | 'tv' | 'all' = 'all', limit = 20): Promise<TrendingItem[]> {
  return apiFetch(`/trending?type=${type}&limit=${limit}`);
}

export async function fetchStats(): Promise<StatsData> {
  return apiFetch('/trending/stats');
}

export async function fetchBlogArticles(): Promise<BlogArticle[]> {
  return apiFetch('/blog');
}

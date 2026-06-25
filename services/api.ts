import type { TrendingItem, BlogArticle, StatsData } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const TTL = 5 * 60 * 1000;
const memCache = new Map<string, { data: unknown; ts: number }>();

async function apiFetch<T>(path: string): Promise<T> {
  const hit = memCache.get(path);
  if (hit && Date.now() - hit.ts < TTL) return hit.data as T;
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json() as T;
  memCache.set(path, { data, ts: Date.now() });
  return data;
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

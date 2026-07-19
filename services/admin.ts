import type { BlogArticle } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? '';

async function adminFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY, ...options.headers },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`);
  return data;
}

export interface BlogArticlePayload {
  tmdbId?: number;
  type?: string;
  title: string;
  channelTitle: string;
  posterPath?: string;
  viewCount?: number;
  weekOf: string;
  editorialFr: string;
  editorialEn: string;
  published?: boolean;
}

export async function fetchAllBlogArticles(): Promise<BlogArticle[]> {
  return adminFetch('/blog/all');
}

export async function createBlogArticle(data: BlogArticlePayload): Promise<void> {
  return adminFetch('/blog', { method: 'POST', body: JSON.stringify(data) });
}

export async function updateBlogArticle(id: number, data: Partial<BlogArticlePayload>): Promise<void> {
  return adminFetch(`/blog/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export async function deleteBlogArticle(id: number): Promise<void> {
  return adminFetch(`/blog/${id}`, { method: 'DELETE' });
}

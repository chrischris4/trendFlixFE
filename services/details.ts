import type { MediaDetail } from '../types/detail';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function fetchDetail(type: 'movie' | 'tv', id: number): Promise<MediaDetail> {
  const res = await fetch(`${API_BASE}/details/${type}/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

import { useState, useEffect } from 'react';
import { fetchBlogArticles } from '../services/api';
import type { BlogArticle } from '../types';

// `initialArticles` vient du rendu serveur : les articles sont déjà dans le HTML,
// on ne refait donc pas l'appel côté client.
export function useBlog(initialArticles?: BlogArticle[]) {
  const seeded = Boolean(initialArticles?.length);
  const [articles, setArticles] = useState<BlogArticle[]>(initialArticles ?? []);
  const [loading, setLoading] = useState(!seeded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (seeded) return;
    fetchBlogArticles()
      .then(data => setArticles(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())))
      .catch(() => setError('Impossible de charger les articles.'))
      .finally(() => setLoading(false));
  }, [seeded]);

  return { articles, loading, error };
}

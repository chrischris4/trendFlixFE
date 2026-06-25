import { useState, useEffect } from 'react';
import { fetchBlogArticles } from '../services/api';
import type { BlogArticle } from '../types';

export function useBlog() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogArticles()
      .then(data => setArticles(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())))
      .catch(() => setError('Impossible de charger les articles.'))
      .finally(() => setLoading(false));
  }, []);

  return { articles, loading, error };
}

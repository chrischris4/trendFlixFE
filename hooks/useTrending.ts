import { useState, useEffect } from 'react';
import { fetchTrending } from '../services/api';
import type { TrendingItem } from '../types';

export function useTrending(type: 'movie' | 'tv' | 'all' = 'all', limit = 100) {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTrending(type, limit)
      .then(setItems)
      .catch(() => setError('Impossible de charger les données. Vérifie ta connexion.'))
      .finally(() => setLoading(false));
  }, [type, limit]);

  return { items, loading, error };
}

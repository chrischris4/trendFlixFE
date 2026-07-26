import { useState, useEffect } from 'react';
import { fetchTrending } from '../services/api';
import type { TrendingItem } from '../types';

// `initialItems` vient du rendu serveur et ne vaut que pour `initialType` :
// dès que l'utilisateur change de filtre, on repasse par le fetch client.
export function useTrending(
  type: 'movie' | 'tv' | 'all' = 'all',
  limit = 100,
  initialItems?: TrendingItem[],
  initialType?: 'movie' | 'tv' | 'all',
) {
  const useSeed = Boolean(initialItems?.length) && type === initialType;
  const [items, setItems] = useState<TrendingItem[]>(useSeed ? initialItems! : []);
  const [loading, setLoading] = useState(!useSeed);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (useSeed) {
      setItems(initialItems!);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    setItems([]);
    fetchTrending(type, limit)
      .then(setItems)
      .catch(() => setError('Impossible de charger les données. Vérifie ta connexion.'))
      .finally(() => setLoading(false));
  }, [type, limit, useSeed]);

  return { items, loading, error };
}

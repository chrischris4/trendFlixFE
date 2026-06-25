import { useState, useEffect } from 'react';
import { fetchDetail } from '../services/details';
import type { MediaDetail } from '../types/detail';

export function useMediaDetail(type: 'movie' | 'tv', id: number) {
  const [detail, setDetail] = useState<MediaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchDetail(type, id)
      .then(setDetail)
      .catch(() => setError('Impossible de charger les détails.'))
      .finally(() => setLoading(false));
  }, [type, id]);

  return { detail, loading, error };
}

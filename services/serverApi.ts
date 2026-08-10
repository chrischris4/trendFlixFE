import { cache } from 'react';
import { fetchBlogArticles, fetchTrending, fetchItemHistory } from './api';
import type { BlogArticle, ItemHistory, TrendingItem } from '../types';

// Rendu serveur : le contenu doit être dans le HTML envoyé au crawler, pas
// chargé après coup côté client. `cache()` déduplique l'appel entre
// generateMetadata et le rendu de la page.

export const getBlogArticles = cache(async (): Promise<BlogArticle[]> => {
  try {
    const articles = await fetchBlogArticles();
    return [...articles].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    // API indisponible : la page se rabat sur le chargement client.
    return [];
  }
});

export const getItemHistory = cache(async (tmdbId: number): Promise<ItemHistory | null> => {
  try {
    return await fetchItemHistory(tmdbId);
  } catch {
    // Titre inconnu ou API indisponible : la fiche reste servie sans trajectoire.
    return null;
  }
});

export const getTrendingItems = cache(
  async (type: 'movie' | 'tv' | 'all', limit: number): Promise<TrendingItem[]> => {
    try {
      return await fetchTrending(type, limit);
    } catch {
      return [];
    }
  },
);

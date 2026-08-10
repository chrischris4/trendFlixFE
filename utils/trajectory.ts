import type { ItemHistory } from '../types';

/**
 * Module volontairement neutre : `generateMetadata` s'execute cote serveur et
 * ne peut pas importer depuis un fichier marque 'use client'. Le seuil vit donc
 * ici, partage entre la page serveur et le composant client.
 *
 * En dessous, la trajectoire est trop courte pour justifier une page indexee.
 */
export const MIN_DAYS_TO_INDEX = 14;

export function isIndexable(history: ItemHistory | null): boolean {
  return Boolean(history && history.daysOnChart >= MIN_DAYS_TO_INDEX);
}

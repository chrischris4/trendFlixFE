export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const MOVIE_GENRES = [
  { id: 28,    slug: 'action',       label: 'Action',        labelEn: 'Action',      emoji: '💥' },
  { id: 35,    slug: 'comedie',      label: 'Comédie',       labelEn: 'Comedy',      emoji: '😂' },
  { id: 18,    slug: 'drame',        label: 'Drame',         labelEn: 'Drama',       emoji: '🎭' },
  { id: 27,    slug: 'horreur',      label: 'Horreur',       labelEn: 'Horror',      emoji: '👻' },
  { id: 878,   slug: 'sci-fi',       label: 'Science-Fiction', labelEn: 'Sci-Fi',    emoji: '🚀' },
  { id: 53,    slug: 'thriller',     label: 'Thriller',      labelEn: 'Thriller',    emoji: '🔪' },
  { id: 10749, slug: 'romance',      label: 'Romance',       labelEn: 'Romance',     emoji: '❤️' },
  { id: 16,    slug: 'animation',    label: 'Animation',     labelEn: 'Animation',   emoji: '🎨' },
  { id: 12,    slug: 'aventure',     label: 'Aventure',      labelEn: 'Adventure',   emoji: '🗺️' },
  { id: 99,    slug: 'documentaire', label: 'Documentaire',  labelEn: 'Documentary', emoji: '🎬' },
] as const;

export const TV_GENRES = [
  { id: 10759, slug: 'action',       label: 'Action',        labelEn: 'Action',      emoji: '💥' },
  { id: 35,    slug: 'comedie',      label: 'Comédie',       labelEn: 'Comedy',      emoji: '😂' },
  { id: 18,    slug: 'drame',        label: 'Drame',         labelEn: 'Drama',       emoji: '🎭' },
  { id: 9648,  slug: 'mystere',      label: 'Mystère',       labelEn: 'Mystery',     emoji: '🔍' },
  { id: 10765, slug: 'sci-fi',       label: 'Sci-Fi',        labelEn: 'Sci-Fi',      emoji: '🚀' },
  { id: 80,    slug: 'crime',        label: 'Crime',         labelEn: 'Crime',       emoji: '🔫' },
  { id: 16,    slug: 'animation',    label: 'Animation',     labelEn: 'Animation',   emoji: '🎨' },
  { id: 10764, slug: 'reality',      label: 'Reality',       labelEn: 'Reality',     emoji: '📺' },
  { id: 99,    slug: 'documentaire', label: 'Documentaire',  labelEn: 'Documentary', emoji: '🎬' },
  { id: 10751, slug: 'famille',      label: 'Famille',       labelEn: 'Family',      emoji: '👨‍👩‍👧' },
] as const;

export type MovieGenre = typeof MOVIE_GENRES[number];
export type TvGenre = typeof TV_GENRES[number];

export function genreLabel(g: { label: string; labelEn: string }, lang: string): string {
  return lang === 'fr' ? g.label : g.labelEn;
}

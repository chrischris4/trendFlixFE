export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const MOVIE_GENRES = [
  { id: 28,    slug: 'action',       label: 'Action',        emoji: '💥' },
  { id: 35,    slug: 'comedie',      label: 'Comédie',       emoji: '😂' },
  { id: 18,    slug: 'drame',        label: 'Drame',         emoji: '🎭' },
  { id: 27,    slug: 'horreur',      label: 'Horreur',       emoji: '👻' },
  { id: 878,   slug: 'sci-fi',       label: 'Science-Fiction', emoji: '🚀' },
  { id: 53,    slug: 'thriller',     label: 'Thriller',      emoji: '🔪' },
  { id: 10749, slug: 'romance',      label: 'Romance',       emoji: '❤️' },
  { id: 16,    slug: 'animation',    label: 'Animation',     emoji: '🎨' },
  { id: 12,    slug: 'aventure',     label: 'Aventure',      emoji: '🗺️' },
  { id: 99,    slug: 'documentaire', label: 'Documentaire',  emoji: '🎬' },
] as const;

export const TV_GENRES = [
  { id: 10759, slug: 'action',       label: 'Action',        emoji: '💥' },
  { id: 35,    slug: 'comedie',      label: 'Comédie',       emoji: '😂' },
  { id: 18,    slug: 'drame',        label: 'Drame',         emoji: '🎭' },
  { id: 9648,  slug: 'mystere',      label: 'Mystère',       emoji: '🔍' },
  { id: 10765, slug: 'sci-fi',       label: 'Sci-Fi',        emoji: '🚀' },
  { id: 80,    slug: 'crime',        label: 'Crime',         emoji: '🔫' },
  { id: 16,    slug: 'animation',    label: 'Animation',     emoji: '🎨' },
  { id: 10764, slug: 'reality',      label: 'Reality',       emoji: '📺' },
  { id: 99,    slug: 'documentaire', label: 'Documentaire',  emoji: '🎬' },
  { id: 10751, slug: 'famille',      label: 'Famille',       emoji: '👨‍👩‍👧' },
] as const;

export type MovieGenre = typeof MOVIE_GENRES[number];
export type TvGenre = typeof TV_GENRES[number];

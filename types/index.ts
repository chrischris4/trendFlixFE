export interface TrendingItem {
  id: string;
  tmdbId: number;
  type: 'movie' | 'tv';
  title: string;
  overview: string | null;
  posterPath: string | null;
  backdropPath: string | null;
  popularity: number | null;
  voteAverage: number | null;
  voteCount: number | null;
  releaseDate: string | null;
  genreIds: number[];
  originalLanguage: string | null;
  rank: number;
  fetchedAt: string;
}

export type BlogArticleFormat =
  | 'SIMPLE'
  | 'SUGGESTION'
  | 'TOP_10'
  | 'GUIDE'
  | 'DATA_ANALYSIS'
  | 'FACE_TO_FACE'
  | 'PORTRAIT'
  | 'RETROSPECTIVE';

export interface BlogArticleItem {
  id: number;
  articleId: number;
  position: number;
  tmdbId: number | null;
  type: 'movie' | 'tv' | null;
  title: string;
  channelTitle: string | null;
  posterPath: string | null;
  countryCount: number | null;
  sectionTitleFr: string | null;
  sectionTitleEn: string | null;
  sectionTextFr: string | null;
  sectionTextEn: string | null;
}

export interface BlogArticle {
  id: number;
  format: BlogArticleFormat;
  tmdbId: number | null;
  type: string | null;
  title: string;
  titleFr: string | null;
  titleEn: string | null;
  channelTitle: string;
  posterPath: string | null;
  viewCount: number | null;
  countryCount: number | null;
  weekOf: string;
  editorialFr: string;
  editorialEn: string;
  introFr: string | null;
  introEn: string | null;
  conclusionFr: string | null;
  conclusionEn: string | null;
  items: BlogArticleItem[];
  published: boolean;
  createdAt: string;
}

export interface GenreStat {
  genreId: number;
  count: number;
  pct: number;
}

export interface StatsData {
  movies: number;
  shows: number;
  topMovies: { title: string; rank: number; voteAverage: number; popularity: number; tmdbId?: number }[];
  topShows: { title: string; rank: number; voteAverage: number; popularity: number; tmdbId?: number }[];
  topMovieGenres: GenreStat[];
  topShowGenres: GenreStat[];
  topLanguages: { lang: string; count: number; pct: number }[];
  yearDistribution: { year: string; count: number; pct: number }[];
  newThisWeek: number;
  avgMovieRating: number;
  avgShowRating: number;
  lastUpdated: string;
}

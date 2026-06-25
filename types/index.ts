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

export interface BlogArticle {
  id: number;
  tmdbId: number | null;
  type: string | null;
  title: string;
  channelTitle: string;
  posterPath: string | null;
  viewCount: number | null;
  countryCount: number | null;
  weekOf: string;
  editorialFr: string;
  editorialEn: string;
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
  lastUpdated: string;
}

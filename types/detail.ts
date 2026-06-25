export interface Genre { id: number; name: string }
export interface CastMember { id: number; name: string; character: string; profilePath: string | null; order: number }
export interface CrewMember { id: number; name: string; profilePath: string | null; job?: string }
export interface Video { key: string; name: string; type: string; official: boolean }
export interface Provider { id: number; name: string; logo: string }
export interface WatchCountry { link: string; flatrate: Provider[]; rent: Provider[]; buy: Provider[] }
export interface SimilarItem { tmdbId: number; type: string; title: string; posterPath: string | null; voteAverage: number; releaseDate: string | null; genreIds: number[] }
export interface Collection { id: number; name: string; posterPath: string | null }
export interface Network { id: number; name: string; logoPath: string | null }

export interface MediaDetail {
  tmdbId: number;
  type: 'movie' | 'tv';
  title: string;
  originalTitle: string;
  overview: string;
  tagline: string | null;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  releaseDate: string | null;
  genres: Genre[];
  originalLanguage: string | null;
  homepage: string | null;
  status: string | null;
  // movie
  runtime: number | null;
  budget: number | null;
  revenue: number | null;
  collection: Collection | null;
  // tv
  numberOfSeasons: number | null;
  numberOfEpisodes: number | null;
  episodeRuntime: number | null;
  networks: Network[];
  inProduction: boolean | null;
  // enriched
  credits: { cast: CastMember[]; directors: CrewMember[]; creators: CrewMember[] };
  videos: Video[];
  providers: Record<string, WatchCountry>;
  similar: SimilarItem[];
  keywords: string[];
}

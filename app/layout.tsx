import type { Metadata } from 'next';
import './globals.css';
import ClientRoot from './ClientRoot';

export const metadata: Metadata = {
  title: { default: 'TrendingShows - #1 Trending Movies & TV Shows Worldwide', template: '%s | TrendingShows' },
  description: 'Discover what the world is watching right now. TrendingShows ranks the most popular movies and TV shows worldwide, updated daily from global streaming data.',
  keywords: ['trending shows', 'trending movies', 'most popular TV shows', 'top movies right now', 'what to watch', 'best movies 2025', 'best TV shows 2025', 'worldwide trending', 'TMDB trending', 'TrendingShows'],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'TrendingShows',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendingShows - #1 Trending Movies & TV Shows Worldwide',
    description: 'Discover what the world is watching right now. Updated daily.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}

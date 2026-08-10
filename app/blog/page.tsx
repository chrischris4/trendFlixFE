import BlogPage from '../../components/BlogPage';
import { getBlogArticles } from '../../services/serverApi';

export const runtime = 'edge';
// Le cron publie un brouillon par jour : la liste doit être recalculée à chaque requête.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog — Trend analysis',
  description: 'Analysis and breakdowns of global film and television trends.',
};

export default async function Blog() {
  const articles = await getBlogArticles();
  return <BlogPage initialArticles={articles} />;
}

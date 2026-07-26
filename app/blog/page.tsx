import BlogPage from '../../components/BlogPage';
import { getBlogArticles } from '../../services/serverApi';

export const runtime = 'edge';
// Le cron publie un brouillon par jour : la liste doit être recalculée à chaque requête.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog — Analyses tendances',
  description: 'Analyses et décryptages des tendances mondiales en films et séries.',
};

export default async function Blog() {
  const articles = await getBlogArticles();
  return <BlogPage initialArticles={articles} />;
}

import type { BlogArticle, BlogArticleFormat, BlogArticleItem, BlogArticleSummary } from '../types';

// Les articles n'existent plus qu'en anglais : c'est la version rendue cote
// serveur, donc la seule indexee. Les parametres `isFr` sont conserves pour ne
// pas casser les appelants, mais n'ont plus d'effet sur le texte de l'article.

export function articleTitle(article: BlogArticle | BlogArticleSummary): string {
  return article.titleEn || article.title;
}

export function articleIntro(article: BlogArticle): string {
  return article.introEn || article.editorialEn;
}

export function articleConclusion(article: BlogArticle): string {
  return article.conclusionEn || '';
}

// L'extrait et le nombre de mots sont desormais calcules par le backend : la
// liste ne transporte plus le texte integral, donc le front ne peut plus les
// deduire lui-meme.
export function articleExcerpt(article: BlogArticleSummary): string {
  return article.excerpt;
}

export function articleWordCount(article: BlogArticleSummary): number {
  return article.wordCount;
}

export function itemSectionTitle(item: BlogArticleItem): string {
  return item.sectionTitleEn || item.title;
}

export function itemSectionText(item: BlogArticleItem): string {
  return item.sectionTextEn || '';
}

export function heroItem(article: BlogArticle): BlogArticleItem | undefined {
  return article.items?.find(item => item.position === 1) ?? article.items?.[0];
}

export function formatLabel(format: BlogArticleFormat, isFr: boolean): string {
  const labels: Record<BlogArticleFormat, [string, string]> = {
    SIMPLE: ['Article', 'Article'],
    SUGGESTION: ['Suggestion de la semaine', 'Pick of the week'],
    TOP_10: ['Top 10 commenté', 'Top 10'],
    GUIDE: ['Guide', 'Guide'],
    DATA_ANALYSIS: ['Analyse de données', 'Data analysis'],
    FACE_TO_FACE: ['Face-à-face', 'Head-to-head'],
    PORTRAIT: ['Portrait', 'Profile'],
    RETROSPECTIVE: ['Rétrospective', 'Retrospective'],
  };
  return labels[format]?.[isFr ? 0 : 1] ?? labels.SIMPLE[isFr ? 0 : 1];
}

import type { BlogArticle, BlogArticleFormat, BlogArticleItem } from '../types';

export function articleTitle(article: BlogArticle, isFr: boolean): string {
  return (isFr ? article.titleFr : article.titleEn) || article.title;
}

export function articleIntro(article: BlogArticle, isFr: boolean): string {
  return (isFr ? article.introFr : article.introEn)
    || (isFr ? article.editorialFr : article.editorialEn);
}

export function articleConclusion(article: BlogArticle, isFr: boolean): string {
  return (isFr ? article.conclusionFr : article.conclusionEn) || '';
}

export function articleExcerpt(article: BlogArticle, isFr: boolean): string {
  return articleIntro(article, isFr);
}

// Compte le texte réellement rendu sur la page. Les formats structurés portent
// leur contenu dans intro + sections + conclusion, pas dans `editorial`.
export function articleWordCount(article: BlogArticle, isFr = false): number {
  const count = (text?: string | null) => (text ?? '').trim().split(/\s+/).filter(Boolean).length;
  const structured = [
    isFr ? article.introFr : article.introEn,
    isFr ? article.conclusionFr : article.conclusionEn,
    ...(article.items ?? []).flatMap(item => [
      isFr ? item.sectionTitleFr : item.sectionTitleEn,
      isFr ? item.sectionTextFr : item.sectionTextEn,
    ]),
  ].reduce((total, part) => total + count(part), 0);
  return Math.max(structured, count(isFr ? article.editorialFr : article.editorialEn));
}

export function itemSectionTitle(item: BlogArticleItem, isFr: boolean): string {
  return (isFr ? item.sectionTitleFr : item.sectionTitleEn) || item.title;
}

export function itemSectionText(item: BlogArticleItem, isFr: boolean): string {
  return (isFr ? item.sectionTextFr : item.sectionTextEn) || '';
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

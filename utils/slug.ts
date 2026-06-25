export function slugify(title: string, id: number): string {
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}-${id}`;
}

export function parseIdFromSlug(slug: string): number {
  const parts = slug.split('-');
  return parseInt(parts[parts.length - 1]);
}

import { Article } from '../types/index';

/**
 * Storage key prefix for strictly real article views.
 * No fictitious base numbers or multipliers are used.
 */
const STORAGE_PREFIX = 'archivo_real_views_';

/**
 * Retrieves the genuine, real view count for an article from persistent local storage.
 * Starts at 0 if no one has visited yet.
 */
export function getArticleViews(slug: string): number {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${slug}`);
    if (!raw) return 0;
    const count = parseInt(raw, 10);
    return isNaN(count) ? 0 : count;
  } catch {
    return 0;
  }
}

/**
 * Registers a real visit when an article is opened, increments the genuine counter,
 * and returns the new real total.
 */
export function incrementArticleViews(slug: string): number {
  try {
    const current = getArticleViews(slug);
    const updated = current + 1;
    localStorage.setItem(`${STORAGE_PREFIX}${slug}`, updated.toString());
    return updated;
  } catch {
    return 1;
  }
}

/**
 * Sorts articles strictly by their real view count.
 */
export function sortArticlesByViews(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    return getArticleViews(b.slug) - getArticleViews(a.slug);
  });
}

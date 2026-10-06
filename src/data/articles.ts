import { Article, CategoryInfo, CategorySlug } from '../types/index';

import { LONGFORM_BASE_ARTICLES } from './longformBaseArticles';
import { ARTICLES_BATCH_1 } from './articlesBatch1';
import { ARTICLES_BATCH_2 } from './articlesBatch2';
import { ARTICLES_BATCH_3 } from './articlesBatch3';
import { ARTICLES_BATCH_4 } from './articlesBatch4';
import { ARTICLES_BATCH_5 } from './articlesBatch5';
import { ARTICLES_BATCH_6 } from './articlesBatch6';
import { ARTICLES_2026 } from './articles2026';

export const CATEGORIES: Record<CategorySlug, CategoryInfo> = {
  historias: {
    slug: 'historias',
    name: 'Todas las Historias',
    navLabel: 'Historias',
    description: 'Índice general de expedientes, investigaciones y crónicas contrastadas del archivo digital.',
    accessionPrefix: 'ARC-ALL',
  },
  personas: {
    slug: 'personas',
    name: 'Personas',
    navLabel: 'Personas',
    description: 'Vidas en los márgenes de los registros oficiales, identidades singulares y figuras adelantadas a su tiempo.',
    accessionPrefix: 'ARC-PER',
  },
  acontecimientos: {
    slug: 'acontecimientos',
    name: 'Acontecimientos',
    navLabel: 'Acontecimientos',
    description: 'Sucesos colectivos, expediciones insólitas y fenómenos históricos atestiguados en actas públicas.',
    accessionPrefix: 'ARC-ACT',
  },
  descubrimientos: {
    slug: 'descubrimientos',
    name: 'Descubrimientos',
    navLabel: 'Descubrimientos',
    description: 'Hallazgos arqueológicos, anomalías científicas fortuitas e innovaciones fuera de catálogo.',
    accessionPrefix: 'ARC-DSC',
  },
  misterios: {
    slug: 'misterios',
    name: 'Misterios documentados',
    navLabel: 'Misterios documentados',
    description: 'Expedientes que cuentan con verificación documental oficial pero cuyas causas continúan sin resolverse.',
    accessionPrefix: 'ARC-MST',
  },
};

export const REAL_ARTICLES: Article[] = [
  ...ARTICLES_BATCH_6,
  ...ARTICLES_BATCH_5,
  ...ARTICLES_BATCH_4,
  ...ARTICLES_2026,
  ...LONGFORM_BASE_ARTICLES,
  ...ARTICLES_BATCH_1,
  ...ARTICLES_BATCH_2,
  ...ARTICLES_BATCH_3,
];

export const ALL_ARTICLES = REAL_ARTICLES;

// Helper to sort articles by publishedAt (recent first)
export function sortArticlesByDate(articles: Article[], order: 'recent' | 'oldest' = 'recent'): Article[] {
  return [...articles].sort((a, b) => {
    const timeA = new Date(a.publishedAt).getTime();
    const timeB = new Date(b.publishedAt).getTime();
    return order === 'recent' ? timeB - timeA : timeA - timeB;
  });
}

// 1. Get all articles (sorted recent first by default)
export function getAllArticles(options?: { sort?: 'recent' | 'oldest' }): Article[] {
  return sortArticlesByDate(REAL_ARTICLES, options?.sort ?? 'recent');
}

// 2. Get articles filtered by category (automatic categorization, sorted)
export function getArticlesByCategory(category: CategorySlug, options?: { sort?: 'recent' | 'oldest' }): Article[] {
  if (category === 'historias') {
    return getAllArticles(options);
  }
  const filtered = REAL_ARTICLES.filter((art) => art.category === category);
  return sortArticlesByDate(filtered, options?.sort ?? 'recent');
}

// 3. Get featured articles (for Hero and Featured Sections)
export function getFeaturedArticles(): Article[] {
  const featured = REAL_ARTICLES.filter((art) => art.featured);
  return sortArticlesByDate(featured, 'recent');
}

// 4. Get primary hero article (most recent featured)
export function getPrimaryHeroArticle(): Article {
  const featured = getFeaturedArticles();
  return featured[0] || getAllArticles()[0];
}

// 5. Get article by unique slug
export function getArticleBySlug(slug: string): Article | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return REAL_ARTICLES.find((art) => art.slug.toLowerCase() === normalized);
}

// 6. Intelligent Related Articles Selector based on Category AND Tags
export function getRelatedArticles(currentSlug: string, count: number = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return getAllArticles().slice(0, count);

  const candidates = REAL_ARTICLES.filter((candidate) => candidate.slug !== current.slug);

  // Score candidates: +3 points per shared tag, +2 points for same category
  const scored = candidates.map((candidate) => {
    let score = 0;
    if (candidate.category === current.category) {
      score += 2;
    }

    const currentTags = current.tags.map((t) => t.toLowerCase());
    const candidateTags = candidate.tags.map((t) => t.toLowerCase());

    for (const tag of currentTags) {
      if (candidateTags.includes(tag)) {
        score += 3;
      }
    }

    return { article: candidate, score };
  });

  // Sort by highest score first, then by published date
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.article.publishedAt).getTime() - new Date(a.article.publishedAt).getTime();
  });

  return scored.slice(0, count).map((item) => item.article);
}

// Text normalizer for accent-insensitive search (e.g. cartografia matches cartografía)
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// 7. Get all unique tags with count across the archive
export interface TagCount {
  tag: string;
  count: number;
}

export function getAllTags(): TagCount[] {
  const map = new Map<string, number>();
  for (const article of REAL_ARTICLES) {
    for (const tag of article.tags) {
      const normalized = tag.toLowerCase().trim();
      map.set(normalized, (map.get(normalized) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export interface SearchFilterParams {
  query?: string;
  category?: CategorySlug | 'todas';
  tag?: string;
  sort?: 'recent' | 'oldest' | 'featured';
}

// 8. Advanced search & multi-faceted filtering for Loop 4
export function searchAndFilterArticles(params: SearchFilterParams): Article[] {
  const { query = '', category = 'todas', tag = '', sort = 'recent' } = params;
  const normalizedQuery = normalizeText(query);
  const normalizedTag = normalizeText(tag);

  let results = REAL_ARTICLES.filter((article) => {
    // 1. Category Filter
    if (category !== 'todas' && category !== 'historias') {
      if (article.category !== category) return false;
    }

    // 2. Tag Filter
    if (normalizedTag) {
      const hasTag = article.tags.some((t) => normalizeText(t) === normalizedTag);
      if (!hasTag) return false;
    }

    // 3. Query Text Search
    if (normalizedQuery) {
      const matchTitle = normalizeText(article.title).includes(normalizedQuery);
      const matchSubtitle = normalizeText(article.subtitle).includes(normalizedQuery);
      const matchExcerpt = normalizeText(article.excerpt).includes(normalizedQuery);
      const matchCategory = normalizeText(article.categoryLabel).includes(normalizedQuery);
      const matchAccession = article.accessionNumber
        ? normalizeText(article.accessionNumber).includes(normalizedQuery)
        : false;
      const matchTags = article.tags.some((t) => normalizeText(t).includes(normalizedQuery));
      const matchContent = article.content.some((sec) => {
        const hMatch = sec.heading ? normalizeText(sec.heading).includes(normalizedQuery) : false;
        const pMatch = sec.paragraphs.some((p) => normalizeText(p).includes(normalizedQuery));
        return hMatch || pMatch;
      });

      if (
        !matchTitle &&
        !matchSubtitle &&
        !matchExcerpt &&
        !matchCategory &&
        !matchAccession &&
        !matchTags &&
        !matchContent
      ) {
        return false;
      }
    }

    return true;
  });

  // 4. Sorting
  if (sort === 'featured') {
    results = [...results].sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  } else {
    results = sortArticlesByDate(results, sort);
  }

  return results;
}

// 9. Legacy search helper
export function searchArticles(query: string): Article[] {
  return searchAndFilterArticles({ query, sort: 'recent' });
}

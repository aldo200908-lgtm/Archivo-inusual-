export type CategorySlug = 'historias' | 'personas' | 'acontecimientos' | 'descubrimientos' | 'misterios';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  navLabel: string;
  description: string;
  accessionPrefix: string;
}

export interface ArticleSource {
  title: string;
  url?: string;
  note?: string;
}

export interface ArticleSection {
  id?: string;
  heading?: string;
  paragraphs: string[];
  callout?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CategorySlug;
  categoryLabel: string;
  coverImage: string;
  imageCaption?: string;
  date: string;
  publishedAt: string; // ISO 'YYYY-MM-DD' for date sorting
  readingTime: string;
  excerpt: string;
  content: ArticleSection[];
  sources: ArticleSource[];
  featured: boolean;
  tags: string[];
  quote?: string;
  quoteAuthor?: string;
  accessionNumber?: string;
  socialCoverImage?: string;
  socialHookTitle?: string;
  socialLocation?: string;
  socialSummary?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
}

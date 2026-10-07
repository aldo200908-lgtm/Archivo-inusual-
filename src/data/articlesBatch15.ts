import { Article } from '../types/index';
import { ARTICLES_BATCH_15A } from './articlesBatch15a';
import { ARTICLES_BATCH_15B } from './articlesBatch15b';

export const ARTICLES_BATCH_15: Article[] = [
  ...ARTICLES_BATCH_15A,
  ...ARTICLES_BATCH_15B
];

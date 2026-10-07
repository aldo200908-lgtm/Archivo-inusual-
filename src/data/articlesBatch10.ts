import { Article } from '../types/index';
import { ARTICLES_BATCH_10A } from './articlesBatch10a';
import { ARTICLES_BATCH_10B } from './articlesBatch10b';

export const ARTICLES_BATCH_10: Article[] = [
  ...ARTICLES_BATCH_10A,
  ...ARTICLES_BATCH_10B
];

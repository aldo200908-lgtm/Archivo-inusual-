import fs from 'fs';
import path from 'path';

// Import all 5 batches
import { LONGFORM_BASE_ARTICLES } from '../src/data/longformBaseArticles';
import { ARTICLES_BATCH_1 } from '../src/data/articlesBatch1';
import { ARTICLES_BATCH_2 } from '../src/data/articlesBatch2';
import { ARTICLES_BATCH_3 } from '../src/data/articlesBatch3';
import { ARTICLES_2026 } from '../src/data/articles2026';

import { enrichArticleContent } from './expand-stories';

function saveTsFile(filePath: string, exportVarName: string, data: any[]) {
  const expanded = data.map(enrichArticleContent);
  const tsContent = `import { Article } from '../types/index';\n\nexport const ${exportVarName}: Article[] = ${JSON.stringify(expanded, null, 2)};\n`;
  fs.writeFileSync(filePath, tsContent, 'utf8');
  console.log(`Saved ${filePath} with ${expanded.length} articles (all with 15 chapters).`);
}

saveTsFile(path.resolve('src', 'data', 'longformBaseArticles.ts'), 'LONGFORM_BASE_ARTICLES', LONGFORM_BASE_ARTICLES);
saveTsFile(path.resolve('src', 'data', 'articlesBatch1.ts'), 'ARTICLES_BATCH_1', ARTICLES_BATCH_1);
saveTsFile(path.resolve('src', 'data', 'articlesBatch2.ts'), 'ARTICLES_BATCH_2', ARTICLES_BATCH_2);
saveTsFile(path.resolve('src', 'data', 'articlesBatch3.ts'), 'ARTICLES_BATCH_3', ARTICLES_BATCH_3);
saveTsFile(path.resolve('src', 'data', 'articles2026.ts'), 'ARTICLES_2026', ARTICLES_2026);

console.log('\nMass expansion to 15 chapters per story completed for ALL 61 stories!');

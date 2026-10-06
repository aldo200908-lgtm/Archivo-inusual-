import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync(path.resolve('scripts', 'wiki-manifest.json'), 'utf8'));

// Also add the Nice robbery real image
if (!manifest['el-gran-robo-de-niza-albert-spaggiari-societe-generale']) {
  manifest['el-gran-robo-de-niza-albert-spaggiari-societe-generale'] = {
    publicUrl: '/images/real/real_robo_niza_spaggiari.jpg',
    wikiTitle: 'Albert Spaggiari / Société Générale Nice',
    wikiLang: 'fr'
  };
}

const files = [
  'src/data/longformBaseArticles.ts',
  'src/data/articlesBatch1.ts',
  'src/data/articlesBatch2.ts',
  'src/data/articlesBatch3.ts',
  'src/data/articles2026.ts'
];

let updatedCount = 0;

for (const relPath of files) {
  const fullPath = path.resolve(relPath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // For longformBaseArticles, remove the unused image imports if we switch to publicUrl string
  if (relPath.includes('longformBaseArticles.ts')) {
    content = content.replace(/import img\w+ from '\.\.\/assets\/images\/[^']+';\n?/g, '');
  }

  // Replace coverImage for each slug
  for (const [slug, info] of Object.entries(manifest)) {
    // Regex matching article block with this slug
    const slugRegex = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?coverImage:\\s*)([^,\\n]+)(,)`, 'g');
    if (slugRegex.test(content)) {
      content = content.replace(slugRegex, `$1'${info.publicUrl}'$3`);
      updatedCount++;
    }
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${relPath}`);
}

console.log(`\nTotal coverImage updates applied: ${updatedCount}`);

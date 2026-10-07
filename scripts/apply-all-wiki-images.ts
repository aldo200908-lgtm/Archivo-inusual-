import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.resolve(__dirname, 'wiki-manifest.json');
const manifest: Record<string, { publicUrl: string; wikiTitle: string }> = JSON.parse(
  fs.readFileSync(manifestPath, 'utf-8')
);

const dataDir = path.resolve(__dirname, '../src/data');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('articles') || f.startsWith('longformBaseArticles'));

console.log(`Processing ${files.length} article source files with ${Object.keys(manifest).length} Wikipedia images...`);

let totalCoverReplacements = 0;
let totalSocialCoverReplacements = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let fileCoverCount = 0;

  for (const [slug, info] of Object.entries(manifest)) {
    // 1. Replace coverImage for this slug
    // Match the slug, then find the coverImage up to the next comma or closing brace
    const coverRegex = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?coverImage:\\s*['"])([^'"]+)(['"])`, 'g');
    if (coverRegex.test(content)) {
      content = content.replace(coverRegex, `$1${info.publicUrl}$3`);
      fileCoverCount++;
      totalCoverReplacements++;
    }

    // 2. Replace socialCoverImage if present for this slug
    const socialCoverRegex = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?socialCoverImage:\\s*['"])([^'"]+)(['"])`, 'g');
    if (socialCoverRegex.test(content)) {
      content = content.replace(socialCoverRegex, `$1${info.publicUrl}$3`);
      totalSocialCoverReplacements++;
    }
  }

  if (fileCoverCount > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Updated ${file} (${fileCoverCount} cover images set to Wikipedia)`);
  }
}

console.log('\n--- Replacement Complete ---');
console.log(`Total coverImage replacements: ${totalCoverReplacements}`);
console.log(`Total socialCoverImage replacements: ${totalSocialCoverReplacements}`);

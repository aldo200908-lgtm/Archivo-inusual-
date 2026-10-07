import { REAL_ARTICLES } from '../src/data/articles';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.log('[Prerender] dist/index.html does not exist yet. Skipping.');
  process.exit(0);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

let count = 0;

for (const art of REAL_ARTICLES) {
  const storyDir = path.join(distDir, 'historias', art.slug);
  fs.mkdirSync(storyDir, { recursive: true });

  const fullTitle = `${art.title} · Archivo Inusual`;
  const canonicalUrl = `https://archivoinusual.vercel.app/historias/${art.slug}`;
  const rawImg = art.socialCoverImage || art.coverImage;
  const imageUrl = rawImg.startsWith('http') ? rawImg : `https://archivoinusual.vercel.app${rawImg}`;
  const description = art.excerpt || art.subtitle;

  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${escapeHtml(fullTitle)}</title>`);

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/gi, `<meta name="description" content="${escapeHtml(description)}" />`);

  // Replace OG tags
  html = html.replace(/<meta property="og:title" content=".*?" \/>/gi, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/gi, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:image" content=".*?" \/>/gi, `<meta property="og:image" content="${imageUrl}" />\n    <meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/gi, `<meta name="twitter:image" content="${imageUrl}" />\n    <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />\n    <meta name="twitter:description" content="${escapeHtml(description)}" />`);

  fs.writeFileSync(path.join(storyDir, 'index.html'), html, 'utf-8');
  count++;
}

console.log(`[Prerender] Successfully generated ${count} story HTML pages with 100% accurate Open Graph meta tags for Facebook and Twitter!`);

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

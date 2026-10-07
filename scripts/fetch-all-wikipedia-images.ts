import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { REAL_ARTICLES } from '../src/data/articles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, '../public/images/real');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const USER_AGENT = 'ArchivoInusual/1.0 (https://archivoinusual.vercel.app/; historical-editorial; pazjuan20000@gmail.com)';

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

function fetchJson(url: string): Promise<any> {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJson(res.headers.location).then(resolve);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
  });
}

function downloadImage(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return downloadImage(res.headers.location, destPath).then(resolve);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(destPath);
          if (stats.size > 2500) {
            resolve(true);
          } else {
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            resolve(false);
          }
        });
      });
    });
    req.on('error', () => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      resolve(false);
    });
    req.setTimeout(12000, () => {
      req.destroy();
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      resolve(false);
    });
  });
}

async function findWikiImageForTerm(term: string, lang: 'es' | 'en'): Promise<{ url: string; title: string; lang: string } | null> {
  if (!term || term.trim().length < 3) return null;
  const cleanTerm = term.trim();

  // 1. Generator Search with pilicense=any
  const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(cleanTerm)}&gsrlimit=1&prop=pageimages&pithumbsize=1200&pilicense=any&format=json`;
  const searchRes = await fetchJson(searchUrl);
  if (searchRes?.query?.pages) {
    const page = Object.values(searchRes.query.pages)[0] as any;
    if (page?.thumbnail?.source) {
      return { url: page.thumbnail.source, title: page.title, lang };
    }
  }

  // 2. Direct title match with pilicense=any
  const directUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(cleanTerm)}&prop=pageimages&pithumbsize=1200&pilicense=any&format=json`;
  const directRes = await fetchJson(directUrl);
  if (directRes?.query?.pages) {
    const page = Object.values(directRes.query.pages)[0] as any;
    if (page?.thumbnail?.source) {
      return { url: page.thumbnail.source, title: page.title, lang };
    }
  }

  return null;
}

function generateSearchTerms(article: any): string[] {
  const terms: string[] = [];

  // Extract primary subject from title (before colon or year)
  // e.g. "El desastre del submarino Kursk (2000): La carta..." -> "Submarino Kursk", "Kursk"
  const title = article.title || '';
  const colonParts = title.split(':');
  const mainPart = colonParts[0].replace(/\(\d{4}\)/g, '').replace(/^(El|La|Los|Las|Un|Una)\s+/i, '').trim();
  if (mainPart.length > 3) terms.push(mainPart);

  // Tags are great
  if (article.tags && Array.isArray(article.tags)) {
    for (const tag of article.tags.slice(0, 3)) {
      if (tag && !terms.includes(tag) && tag.length > 3 && !['Historia', 'Arqueología', 'Misterios'].includes(tag)) {
        terms.push(tag);
      }
    }
  }

  // QuoteAuthor if prominent person
  if (article.quoteAuthor && article.category === 'personas') {
    const authorName = article.quoteAuthor.split(',')[0].trim();
    if (authorName.length > 3 && !terms.includes(authorName)) {
      terms.push(authorName);
    }
  }

  // Slug words as fallback
  const slugClean = (article.slug || '').replace(/-/g, ' ').replace(/\d{4}/g, '').trim();
  if (slugClean.length > 5 && !terms.includes(slugClean)) {
    terms.push(slugClean);
  }

  return terms;
}

export async function runWikipediaSync() {
  console.log(`Starting Wikipedia image harvesting for ${REAL_ARTICLES.length} articles...`);
  const manifest: Record<string, { publicUrl: string; wikiTitle: string; wikiLang: string }> = {};

  let alreadyHadReal = 0;
  let newlyFetched = 0;
  let keptFallback = 0;

  for (let i = 0; i < REAL_ARTICLES.length; i++) {
    const art = REAL_ARTICLES[i];
    const fileName = `wiki_${art.slug}.jpg`;
    const localPath = path.join(OUT_DIR, fileName);

    // If local file already exists and is healthy (> 3KB), register it
    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 3000) {
      manifest[art.slug] = {
        publicUrl: `/images/real/${fileName}`,
        wikiTitle: art.title,
        wikiLang: 'local'
      };
      alreadyHadReal++;
      continue;
    }

    const terms = generateSearchTerms(art);
    let found: { url: string; title: string; lang: string } | null = null;

    // Search sequentially across terms and languages (es first, then en)
    for (const term of terms) {
      found = await findWikiImageForTerm(term, 'es');
      if (found) break;
      await delay(120);
      found = await findWikiImageForTerm(term, 'en');
      if (found) break;
      await delay(120);
    }

    if (found) {
      const ok = await downloadImage(found.url, localPath);
      if (ok) {
        manifest[art.slug] = {
          publicUrl: `/images/real/${fileName}`,
          wikiTitle: found.title,
          wikiLang: found.lang
        };
        newlyFetched++;
        console.log(`[${i + 1}/${REAL_ARTICLES.length}] ✓ ${art.slug} <= [${found.lang}] "${found.title}"`);
      } else {
        keptFallback++;
        console.log(`[${i + 1}/${REAL_ARTICLES.length}] ✗ ${art.slug} download failed`);
      }
    } else {
      keptFallback++;
      console.log(`[${i + 1}/${REAL_ARTICLES.length}] ⚠ ${art.slug} not found on Wiki (terms: ${terms.slice(0, 2).join(', ')})`);
    }

    await delay(150);
  }

  console.log('\n--- Wikipedia Image Harvesting Summary ---');
  console.log(`Total Articles: ${REAL_ARTICLES.length}`);
  console.log(`Already existed locally: ${alreadyHadReal}`);
  console.log(`Newly fetched from Wikipedia: ${newlyFetched}`);
  console.log(`Retained fallback/unsplash: ${keptFallback}`);
  console.log(`Total Wikipedia images in manifest: ${Object.keys(manifest).length}`);

  // Write manifest
  const manifestPath = path.resolve(__dirname, 'wiki-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  return manifest;
}

runWikipediaSync().catch(console.error);

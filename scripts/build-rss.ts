import { REAL_ARTICLES, sortArticlesByDate } from '../src/data/articles';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeXml(unsafe?: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const sorted = sortArticlesByDate(REAL_ARTICLES, 'recent');
const now = new Date().toUTCString();

let itemsXml = '';

for (const art of sorted) {
  const pubDate = new Date(art.publishedAt || Date.now()).toUTCString();
  const link = `https://archivoinusual.vercel.app/historias/${art.slug}`;
  
  let socialImg = '';
  if (art.coverImage && art.coverImage.startsWith('http')) {
    socialImg = art.coverImage;
  } else if (art.coverImage) {
    socialImg = `https://archivoinusual.vercel.app${art.coverImage}`;
  } else if (art.socialCoverImage && !art.socialCoverImage.includes('/images/social/')) {
    socialImg = art.socialCoverImage;
  } else {
    socialImg = 'https://archivoinusual.vercel.app/og-cover.jpg';
  }

  const hook = (art.socialHookTitle || art.title).toUpperCase();
  const docSign = art.accessionNumber ? `\n\nEste caso histórico está registrado oficialmente bajo la signatura documental DOC. ${art.accessionNumber}.` : '';

  const descriptionText = `🔥 ${hook}

${art.excerpt}${docSign}

📖 Descubre la investigación completa, testimonios y fuentes en:
${link}

¿Qué opinas sobre este caso histórico? Te leemos en los comentarios. 👇`;

  itemsXml += `
    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${descriptionText}]]></description>
      <facebook_copy><![CDATA[${descriptionText}]]></facebook_copy>
      <enclosure url="${socialImg}" length="165000" type="image/jpeg" />
      <media:content url="${socialImg}" medium="image" type="image/jpeg" width="1080" height="1350">
        <media:title>${escapeXml(hook)}</media:title>
        <media:description>${escapeXml(art.excerpt)}</media:description>
      </media:content>
      <media:thumbnail url="${socialImg}" width="1080" height="1350" />
      <category>${escapeXml(art.categoryLabel.toUpperCase())}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
}

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Archivo Inusual | Crónicas y Expedientes Históricos</title>
    <link>https://archivoinusual.vercel.app/</link>
    <description>Compendio de crónicas contrastadas, enigmas documentados, hallazgos arqueológicos y fenómenos de los registros oficiales.</description>
    <language>es</language>
    <atom:link href="https://archivoinusual.vercel.app/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${now}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

const targetPath = path.resolve(__dirname, '../public/rss.xml');
fs.writeFileSync(targetPath, rssXml, 'utf-8');
console.log(`[RSS Build] Automatically updated public/rss.xml with ${sorted.length} stories.`);

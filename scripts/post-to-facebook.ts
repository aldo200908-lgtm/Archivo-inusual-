import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { REAL_ARTICLES, sortArticlesByDate } from '../src/data/articles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HISTORY_FILE = path.resolve(__dirname, '../.published-facebook.json');

interface PublishedHistory {
  publishedSlugs: string[];
  lastUpdated: string;
}

function getHistory(): PublishedHistory {
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return { publishedSlugs: [], lastUpdated: new Date().toISOString() };
    }
  }
  return { publishedSlugs: [], lastUpdated: new Date().toISOString() };
}

function saveHistory(history: PublishedHistory) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
}

async function postStoryToFacebook(
  pageId: string,
  accessToken: string,
  article: typeof REAL_ARTICLES[0]
): Promise<string | null> {
  const link = `https://archivoinusual.vercel.app/historias/${article.slug}`;
  const hook = (article.socialHookTitle || article.title).toUpperCase();
  const docSign = article.accessionNumber
    ? `\n\n📌 Signatura de Archivo: DOC. ${article.accessionNumber}`
    : '';

  const caption = `🔥 ${hook}

${article.excerpt}${docSign}

📖 Descubre la investigación documental completa con fotografías y testimonios en:
${link}

¿Qué opinas sobre este caso histórico? Te leemos en los comentarios. 👇`;

  // Use high resolution social image (or fallback)
  const imageUrl =
    article.socialCoverImage ||
    (article.coverImage.startsWith('http')
      ? article.coverImage
      : `https://archivoinusual.vercel.app${article.coverImage}`);

  console.log(`\n-----------------------------------------`);
  console.log(`📤 Publicando en Facebook: "${article.title}"`);
  console.log(`🖼️ Imagen: ${imageUrl}`);
  console.log(`🔗 Enlace: ${link}`);

  const endpoint = `https://graph.facebook.com/v20.0/${pageId}/photos`;

  const params = new URLSearchParams({
    url: imageUrl,
    caption: caption,
    access_token: accessToken,
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: params,
    });

    const data = await response.json() as { id?: string; post_id?: string; error?: { message: string; type: string; code: number } };

    if (data.error) {
      console.error(`❌ Error de Meta Graph API:`, data.error.message);
      return null;
    }

    const postId = data.post_id || data.id || 'OK';
    console.log(`✅ ¡Publicado con éxito en Facebook! ID de publicación: ${postId}`);
    return postId;
  } catch (err) {
    console.error(`❌ Error de conexión al publicar:`, err);
    return null;
  }
}

async function main() {
  const pageId = process.env.FB_PAGE_ID;
  const accessToken = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    console.warn(`⚠️ Faltan las variables de entorno FB_PAGE_ID o FB_PAGE_ACCESS_TOKEN.`);
    console.warn(`Añádelas en GitHub Repository Secrets (Configuración -> Secrets and Variables -> Actions).`);
    process.exit(0);
  }

  const history = getHistory();
  const sortedArticles = sortArticlesByDate(REAL_ARTICLES, 'recent');

  // Find articles not yet posted
  const pendingArticles = sortedArticles.filter(
    (a) => !history.publishedSlugs.includes(a.slug)
  );

  if (pendingArticles.length === 0) {
    console.log(`✨ Todas las historias ya han sido publicadas en Facebook. Nada pendiente.`);
    return;
  }

  console.log(`🚀 Se encontraron ${pendingArticles.length} historias pendientes de publicar.`);

  // Limit to at most 3 posts per push to prevent spamming the page
  const toPost = pendingArticles.slice(0, 3);

  for (const article of toPost) {
    const result = await postStoryToFacebook(pageId, accessToken, article);
    if (result) {
      history.publishedSlugs.push(article.slug);
    }
    // Small delay between posts
    await new Promise((r) => setTimeout(r, 2000));
  }

  history.lastUpdated = new Date().toISOString();
  saveHistory(history);
  console.log(`\n🎉 Proceso de autopublicación en Facebook finalizado.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

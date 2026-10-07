import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { REAL_ARTICLES } from '../src/data/articles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini Client
const ai = new GoogleGenAI();
const MODEL_NAME = 'gemini-3.1-flash-lite';

const USER_AGENT = 'ArchivoInusualEditorial/1.0 (https://archivoinusual.vercel.app/; historical-editorial; pazjuan20000@gmail.com)';

function downloadFile(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return downloadFile(res.headers.location, destPath).then(resolve);
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
          resolve(stats.size > 2000);
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

async function searchWikipediaImage(searchQuery: string, slug: string): Promise<string> {
  const imagesDir = path.resolve(__dirname, '../public/images/real');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const targetFilename = `wiki_${slug}.jpg`;
  const targetPath = path.join(imagesDir, targetFilename);

  // Intentar en Wikipedia en español y luego en inglés para máxima cobertura de archivos históricos
  const langs = ['es', 'en'];

  for (const lang of langs) {
    try {
      const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(searchQuery)}&gsrlimit=3&prop=pageimages&piprop=original|thumbnail&pithumbsize=1200`;
      
      const searchRes = await new Promise<any>((resolve) => {
        https.get(searchUrl, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
          let raw = '';
          res.on('data', c => raw += c);
          res.on('end', () => {
            try { resolve(JSON.parse(raw)); } catch { resolve(null); }
          });
        }).on('error', () => resolve(null));
      });

      if (searchRes?.query?.pages) {
        for (const pageId of Object.keys(searchRes.query.pages)) {
          const page = searchRes.query.pages[pageId];
          const rawImgUrl = page.original?.source || page.thumbnail?.source;
          if (rawImgUrl) {
            const cleanUrl = rawImgUrl.split('?')[0].toLowerCase();
            if (cleanUrl.endsWith('.jpg') || cleanUrl.endsWith('.jpeg') || cleanUrl.endsWith('.png') || cleanUrl.endsWith('.webp')) {
              const ok = await downloadFile(rawImgUrl, targetPath);
              if (ok) {
                console.log(`[Wiki Image] Foto histórica real descargada de Wikipedia (${lang}) para "${searchQuery}"`);
                return `/images/real/${targetFilename}`;
              }
            }
          }
        }
      }
    } catch (err) {
      console.error(`[Wiki Image] Error buscando en ${lang}:`, err);
    }
  }

  return '/images/real_archaic_human_dna.jpg';
}

export async function generateAutonomousStory(totalStories: number = 1) {
  console.log(`--- Iniciando Redacción Editorial Autónoma: ${totalStories} historias solicitadas ---`);

  for (let i = 1; i <= totalStories; i++) {
    console.log(`\n[Lote ${i}/${totalStories}] Investigando nueva historia...`);
    await generateSingleStory();
  }

  console.log('\n--- Actualizando build, RSS feed y páginas estáticas ---');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✓ Build completado. Nuevas historias listas en la web y en el feed RSS.');
}

async function generateSingleStory() {
  
  const existingTitles = REAL_ARTICLES.slice(0, 50).map(a => a.title).join('\n- ');
  
  const prompt = `Eres el Director de Investigación Histórica y Archivo de "Archivo Inusual" (una prestigiosa publicación editorial en español dedicada a crónicas históricas reales, documentadas y rigurosamente contrastadas).

Misión: Investiga y redacta un expediente histórico REAL, asombroso, extenso y rigurosamente documentado en actas oficiales, que NO esté repetido en las siguientes historias ya cubiertas:
${existingTitles}

REQUISITOS EDITORIALES CRÍTICOS:
1. VERACIDAD HISTÓRICA ABSOLUTA: Casos 100% documentados en archivos oficiales, procesos judiciales, bitácoras navales o registros arqueológicos. Sin leyendas urbanas ni hechos ficticios.
2. EXTENSIÓN Y PROFUNDIDAD MONUMENTAL (MÍNIMO 15 CAPÍTULOS): El array "content" DEBE contener OBLIGATORIAMENTE DE 15 A 18 CAPÍTULOS COMPLETOS (del "sec-1" al "sec-15" o superior). Cada capítulo debe tener su título descriptivo ("1. ...", "2. ...", ..., "15. ...") y relatar minuciosamente una etapa clave del expediente (antecedentes, contexto geopolítico, protagonistas clave, conspiración o planificación, el estallido de los hechos, cronología minuto a minuto, crisis, testimonios de primera mano, intervención de autoridades, giros imprevistos, el desenlace, las actas judiciales o peritajes, el archivo de pruebas, repercusiones históricas y el estado del misterio o patrimonio en la actualidad). Incluye recuadros "callout" en varios de los capítulos clave.
3. IMAGEN HISTÓRICA REAL Y COINCIDENTE: "wikiSearchQuery" DEBE ser el término exacto del artículo principal de Wikipedia para esa persona, barco, fortaleza, monumento o suceso (por ejemplo: "Fuerte de San Cristóbal", "Stanislav Petrov", "Mary Kingsley", "HMS Erebus", "Józef Piłsudski") para asegurar que la fotografía o grabado histórico descargado corresponda con total exactitud al protagonista o lugar del caso.

REQUISITO TÉCNICO: Responde ÚNICAMENTE en formato JSON plano válido (sin markdown \`\`\`json, solo las llaves {}) con exactamente esta estructura:
{
  "title": "Título editorial impactante con año y lugar (ej: La fuga del fuerte de San Cristóbal (1938): ...)",
  "subtitle": "Subtítulo periodístico de 2 líneas explicando la trascendencia del hecho",
  "category": "acontecimientos", // Una de: "acontecimientos", "personas", "descubrimientos", "misterios"
  "categoryLabel": "ACONTECIMIENTOS", // Mismo en mayúsculas
  "slug": "slug-en-minusculas-con-guiones",
  "readingTime": "25 min",
  "excerpt": "Primer párrafo de alto impacto narrativo resumiendo el caso en 60-80 palabras.",
  "quote": "Cita textual auténtica de un testigo, documento o protagonista",
  "quoteAuthor": "Autor de la cita y fuente o fecha",
  "accessionNumber": "ARC-ACT-CODIGO-AÑO",
  "socialHookTitle": "TITULAR GANCHO EN MAYÚSCULAS PARA REDES SOCIALES",
  "socialLocation": "CIUDAD · PAÍS (AÑO)",
  "date": "Día y mes de Año / Ubicación histórica completa",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
  "wikiSearchQuery": "Término exacto para buscar en Wikipedia la foto o grabado histórico",
  "content": [
    {
      "id": "sec-1",
      "heading": "1. Título del primer capítulo",
      "paragraphs": [
        "Párrafo detallado con datos históricos, nombres propios y contexto...",
        "Párrafo adicional..."
      ]
    },
    {
      "id": "sec-2",
      "heading": "2. Título del segundo capítulo",
      "paragraphs": [
        "Párrafo detallado...",
        "Párrafo adicional..."
      ],
      "callout": "Dato o cita destacada en recuadro especial"
    },
    // ... DEBE CONTINUAR SECUENCIALMENTE HASTA EL CAPÍTULO 15 O MÁS:
    {
      "id": "sec-15",
      "heading": "15. Título del capítulo quince (dictamen oficial y legado)",
      "paragraphs": [
        "Conclusión rigurosa del expediente, documentos de archivo y trascendencia histórica..."
      ]
    }
  ],
  "sources": [
    { "title": "Archivo General o Documento Histórico Primario (Año)" },
    { "title": "Investigación académica o libro de referencia" },
    { "title": "Registro de prensa o actas de la época" }
  ]
}`;

  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let rawText = '';

  for (const model of candidateModels) {
    try {
      console.log(`[Gemini] Consultando modelo ${model}...`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      if (response.text) {
        rawText = response.text.trim();
        console.log(`[Gemini] Respuesta obtenida con éxito usando ${model}`);
        break;
      }
    } catch (err: any) {
      console.warn(`[Gemini] Falló el modelo ${model} (${err?.message || err}). Probando siguiente alternativa...`);
    }
  }

  if (!rawText) {
    throw new Error('No se pudo generar la historia con ninguno de los modelos disponibles.');
  }
  rawText = rawText.trim();
  if (rawText.startsWith('```json')) {
    rawText = rawText.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (rawText.startsWith('```')) {
    rawText = rawText.replace(/^```/, '').replace(/```$/, '').trim();
  }

  const storyData = JSON.parse(rawText);
  console.log(`[Gemini] ¡Historia redactada!: "${storyData.title}"`);

  // Descargar imagen histórica de Wikipedia
  const imagePath = await searchWikipediaImage(storyData.wikiSearchQuery || storyData.title, storyData.slug);

  const newArticle = {
    id: `gen-${storyData.slug}-${Date.now()}`,
    slug: storyData.slug,
    title: storyData.title,
    subtitle: storyData.subtitle,
    category: storyData.category,
    categoryLabel: storyData.categoryLabel,
    coverImage: imagePath,
    imageCaption: `Documento y registro visual histórico correspondiente a ${storyData.title}.`,
    date: storyData.date,
    publishedAt: new Date().toISOString().split('T')[0],
    readingTime: storyData.readingTime,
    excerpt: storyData.excerpt,
    featured: false,
    tags: storyData.tags,
    quote: storyData.quote,
    quoteAuthor: storyData.quoteAuthor,
    accessionNumber: storyData.accessionNumber,
    socialLocation: storyData.socialLocation,
    socialHookTitle: storyData.socialHookTitle,
    content: storyData.content,
    sources: storyData.sources,
  };

  // Leer y actualizar src/data/generatedStories.ts
  const generatedStoriesPath = path.resolve(__dirname, '../src/data/generatedStories.ts');
  const currentContent = fs.readFileSync(generatedStoriesPath, 'utf-8');

  // Insertar al inicio de la lista
  const match = currentContent.match(/export const GENERATED_STORIES: Article\[\] = \[([\s\S]*?)\];/);
  const existingArticlesJson = match ? match[1].trim() : '';

  const newArticleStr = JSON.stringify(newArticle, null, 2);
  const updatedList = existingArticlesJson ? `${newArticleStr},\n${existingArticlesJson}` : newArticleStr;

  const newFileContent = `import { Article } from '../types/index';

/**
 * Historias generadas e investigadas autónomamente con Gemini.
 * Se actualiza de forma automática mediante el motor editorial de IA.
 */
export const GENERATED_STORIES: Article[] = [
${updatedList}
];
`;

  fs.writeFileSync(generatedStoriesPath, newFileContent, 'utf-8');
  console.log(`✓ Expediente guardado con éxito en src/data/generatedStories.ts`);
  console.log(`✓ Slug: /historias/${storyData.slug}`);
  console.log(`✓ Imagen: ${imagePath}`);
}

// Ejecutar si se llama directamente desde CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const count = Number(process.argv[2]) || 1;
  generateAutonomousStory(count)
    .then(() => {
      console.log('Operación finalizada con éxito.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error durante la generación de la historia:', err);
      process.exit(1);
    });
}

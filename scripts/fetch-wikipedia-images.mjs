import fs from 'fs';
import path from 'path';
import https from 'https';

const OUT_DIR = path.resolve('public', 'images', 'real');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const USER_AGENT = 'ArchivoInusual/1.0 (https://archivoinusual.vercel.app/; editorial-research; pazjuan20000@gmail.com)';

// Map all 61 articles to their search keywords / canonical Wikipedia subjects
const ARTICLES_MAP = [
  // longformBaseArticles (10)
  { slug: 'el-lugar-que-quedo-vacio-islas-flannan', terms: ['Flannan Isles Lighthouse', 'Islas Flannan'] },
  { slug: 'la-isla-que-desaparecio-de-los-mapas-isla-bermeja', terms: ['Isla Bermeja', 'Bermeja Island'] },
  { slug: 'el-computador-de-anticitera', terms: ['Mecanismo de Anticitera', 'Antikythera mechanism'] },
  { slug: 'el-palacio-ideal-del-cartero-cheval', terms: ['Palais idéal', 'Ferdinand Cheval'] },
  { slug: 'el-ano-sin-verano-tambora-1816', terms: ['Año sin verano', 'Mount Tambora', 'Volcán Tambora'] },
  { slug: 'la-senal-wow-1977', terms: ['Señal Wow!', 'Wow! signal'] },
  { slug: 'norton-i-emperador-de-los-estados-unidos', terms: ['Emperador Norton', 'Emperor Norton'] },
  { slug: 'la-expedicion-perdida-de-franklin', terms: ['Expedición perdida de Franklin', "Franklin's lost expedition", 'HMS Erebus'] },
  { slug: 'el-moho-que-cambio-el-siglo-penicilina', terms: ['Alexander Fleming', 'Penicilina'] },
  { slug: 'el-hombre-que-derribo-su-sotano-y-encontro-una-ciudad-subterranea-derinkuyu', terms: ['Derinkuyu', 'Derinkuyu underground city'] },

  // articlesBatch1 (10)
  { slug: 'el-incidente-del-paso-dyatlov-1959', terms: ['Incidente del paso Diátlov', 'Dyatlov Pass incident'] },
  { slug: 'el-enigma-del-bergantin-mary-celeste-1872', terms: ['Mary Celeste'] },
  { slug: 'el-manuscrito-voynich-el-libro-indescifrable', terms: ['Manuscrito Voynich', 'Voynich manuscript'] },
  { slug: 'la-epidemia-de-baile-de-estrasburgo-1518', terms: ['Epidemia de baile de 1518', 'Dancing plague of 1518'] },
  { slug: 'el-caso-del-hombre-de-somerton-tamam-shud-1948', terms: ['Caso Tamam Shud', 'Tamam Shud case'] },
  { slug: 'el-misterio-del-vuelo-19-la-patrulla-perdida-1945', terms: ['Vuelo 19', 'Flight 19'] },
  { slug: 'el-misterio-de-las-mascaras-de-plomo-morro-do-vintem-1966', terms: ['Caso de las máscaras de plomo', 'Lead Masks Case'] },
  { slug: 'la-desaparicion-del-coronel-fawcett-y-la-ciudad-perdida-de-z-1925', terms: ['Percy Fawcett', 'Ciudad perdida de Z'] },
  { slug: 'el-enigma-de-kaspar-hauser-el-huerfano-de-europa-1828', terms: ['Kaspar Hauser'] },
  { slug: 'gobekli-tepe-el-santuario-que-reescribio-la-historia-humana', terms: ['Göbekli Tepe'] },

  // articlesBatch2 (10)
  { slug: 'el-soldado-que-siguio-peleando-29-anos-hiroo-onoda', terms: ['Hirō Onoda', 'Hiroo Onoda'] },
  { slug: 'la-unica-fuga-de-los-plomos-de-venecia-giacomo-casanova-1756', terms: ['Giacomo Casanova', 'Palacio Ducal de Venecia'] },
  { slug: 'ching-shih-la-prostituta-que-domino-los-mares-de-china', terms: ['Zheng Shi', 'Ching Shih'] },
  { slug: 'el-falso-embajador-que-invento-un-pais-george-psalmanazar-1704', terms: ['George Psalmanazar'] },
  { slug: 'jeanne-baret-la-primera-mujer-en-dar-la-vuelta-al-mundo-disfrazada', terms: ['Jeanne Baret'] },
  { slug: 'la-resistencia-silenciosa-de-salem-giles-corey-1692', terms: ['Giles Corey'] },
  { slug: 'la-gran-inundacion-de-melaza-de-boston-1919', terms: ['Gran inundación de melaza de Boston', 'Great Molasses Flood'] },
  { slug: 'la-tragica-expedicion-en-globo-al-polo-norte-salomon-andree-1897', terms: ['Expedición ártica de S. A. Andrée', "S. A. Andrée's Arctic balloon expedition"] },
  { slug: 'la-fuga-imposible-del-submarino-polaco-orp-orzel-1939', terms: ['ORP Orzeł (1938)', 'Orzeł incident'] },
  { slug: 'la-batalla-por-el-castillo-de-itter-1945', terms: ['Batalla por el Castillo Itter', 'Battle of Castle Itter'] },

  // articlesBatch3 (10)
  { slug: 'la-gran-evasion-del-tunel-57-en-el-muro-de-berlin-1964', terms: ['Túnel 57', 'Tunnel 57'] },
  { slug: 'el-gran-smog-de-londres-la-niebla-que-asfixio-a-una-capital-1952', terms: ['Gran Niebla de 1952', 'Great Smog of London'] },
  { slug: 'la-guerra-del-asiento-y-la-oreja-de-jenkins-1739', terms: ['Guerra del Asiento', "War of Jenkins' Ear"] },
  { slug: 'el-perro-que-cayo-por-una-madriguera-la-cueva-de-lascaux-1940', terms: ['Cueva de Lascaux', 'Lascaux'] },
  { slug: 'el-crater-de-batagaika-la-puerta-del-inframundo-en-siberia', terms: ['Cráter de Batagaika', 'Batagaika crater'] },
  { slug: 'las-bibliotecas-perdidas-del-desierto-de-chinguetti-mauritania', terms: ['Chinguetti'] },
  { slug: 'el-hombre-de-hielo-de-los-alpes-el-misterio-de-otzi-1991', terms: ['Ötzi', 'Hombre de hielo'] },
  { slug: 'el-automata-ajedrecista-de-wolfgang-von-kempelen-el-turco-1770', terms: ['El Turco', 'The Turk'] },
  { slug: 'el-campanario-solitario-del-lago-de-reschen-la-aldea-sumergida-1950', terms: ['Reschensee', 'Lago de Resia'] },
  { slug: 'el-verdadero-cyrano-de-bergerac-y-el-primer-viaje-a-la-luna-1657', terms: ['Cyrano de Bergerac'] },

  // articles2026 (21)
  { slug: 'nuevo-linaje-pinguino-kerguelensis-2026', terms: ['Pygoscelis papua', 'Gentoo penguin'] },
  { slug: 'rollos-herculano-descifrados-ia-2026', terms: ['Papiros de Herculano', 'Herculaneum papyri', 'Vesuvius Challenge'] },
  { slug: 'corredor-oculto-gran-piramide-guiza-2026', terms: ['Gran Pirámide de Guiza', 'Great Pyramid of Giza'] },
  { slug: 'des-extincion-mamut-colossal-2026', terms: ['Mammuthus primigenius', 'Woolly mammoth', 'Mamut lanudo'] },
  { slug: 'starship-v3-transferencia-orbital-2026', terms: ['SpaceX Starship', 'Starship'] },
  { slug: 'cuasares-imposibles-universo-temprano-jwst', terms: ['Telescopio espacial James Webb', 'James Webb Space Telescope'] },
  { slug: 'vida-microorganismos-oceano-encelado-2026', terms: ['Encélado (satélite)', 'Enceladus'] },
  { slug: 'satelite-zombi-relay2-les1-misterio-radio', terms: ['Lincoln Experimental Satellite', 'LES-1', 'Relay 1'] },
  { slug: 'ciudades-perdidas-amazonas-lidar-upano', terms: ['Upano Valley sites', 'Valle del Upano'] },
  { slug: 'linaje-humano-fantasma-adn-trace-2026', terms: ['Homo heidelbergensis', 'Archaic human admixture'] },
  { slug: 'de-lavaplatos-a-arquitecto-de-la-ia-jensen-huang-nvidia', terms: ['Jensen Huang', 'Nvidia'] },
  { slug: 'la-caida-desde-3000-metros-juliane-koepcke-selva-amazonica', terms: ['Juliane Koepcke', 'Vuelo 508 de LANSA'] },
  { slug: 'los-33-mineros-de-atacama-69-dias-bajo-tierra-mina-san-jose', terms: ['Derrumbe de la mina San José', '2010 Copiapó mining accident'] },
  { slug: 'el-planeador-secreto-del-castillo-de-colditz-fuga-imposible', terms: ['Colditz Cock', 'Castillo de Colditz'] },
  { slug: 'stanislav-petrov-el-hombre-que-evito-la-guerra-nuclear-1983', terms: ['Stanislav Petrov'] },
  { slug: 'la-caida-de-10160-metros-sin-paracaidas-vesna-vulovic', terms: ['Vesna Vulović', 'Vuelo 367 de JAT'] },
  { slug: 'el-pozo-superprofundo-de-kola-12262-metros-hacia-el-manto', terms: ['Pozo superprofundo de Kola', 'Kola Superdeep Borehole'] },
  { slug: 'el-gran-robo-de-niza-albert-spaggiari-societe-generale', terms: ['Albert Spaggiari'] },
  { slug: 'la-biblioteca-subterranea-secreta-de-daraya-libros-bajo-las-bombas', terms: ['Daraya', 'Batalla de Daraya'] },
  { slug: 'las-esferas-de-klerksdorp-el-misterio-geologico-de-2800-millones-de-anos', terms: ['Esferas de Klerksdorp', 'Klerksdorp sphere'] },
  { slug: 'el-vuelo-5390-el-capitan-que-sobrevivio-fuera-de-la-cabina-en-vuelo', terms: ['Vuelo 5390 de British Airways', 'British Airways Flight 5390'] }
];

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
  });
}

async function findWikiImage(term) {
  const langs = ['es', 'en', 'fr', 'de'];
  for (const lang of langs) {
    // 1. Direct pageimages query
    const urlDirect = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(term)}&prop=pageimages&format=json&pithumbsize=1200`;
    const jsonDirect = await fetchJson(urlDirect);
    if (jsonDirect?.query?.pages) {
      const page = Object.values(jsonDirect.query.pages)[0];
      if (page?.thumbnail?.source) {
        return { url: page.thumbnail.source, title: page.title, lang };
      }
    }

    // 2. Generator search query
    const urlSearch = `https://${lang}.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrlimit=1&prop=pageimages&pithumbsize=1200&format=json`;
    const jsonSearch = await fetchJson(urlSearch);
    if (jsonSearch?.query?.pages) {
      const page = Object.values(jsonSearch.query.pages)[0];
      if (page?.thumbnail?.source) {
        return { url: page.thumbnail.source, title: page.title, lang };
      }
    }
  }
  return null;
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    });
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
    req.setTimeout(15000, () => {
      req.destroy();
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(new Error('Timeout'));
    });
  });
}

async function run() {
  console.log(`Starting thorough Wikipedia retrieval for all ${ARTICLES_MAP.length} stories...`);
  const manifest = {};

  for (let i = 0; i < ARTICLES_MAP.length; i++) {
    const item = ARTICLES_MAP[i];
    let found = null;

    for (const term of item.terms) {
      await delay(250);
      found = await findWikiImage(term);
      if (found) break;
    }

    if (found) {
      const fileName = `wiki_${item.slug}.jpg`;
      const localPath = path.join(OUT_DIR, fileName);
      try {
        await delay(250);
        await downloadImage(found.url, localPath);
        const stats = fs.statSync(localPath);
        if (stats.size > 2000) {
          const publicUrl = `/images/real/${fileName}`;
          manifest[item.slug] = {
            publicUrl,
            wikiTitle: found.title,
            wikiLang: found.lang,
            sizeKb: Math.round(stats.size / 1024)
          };
          console.log(`[${i+1}/${ARTICLES_MAP.length}] ✓ ${item.slug} <= [${found.lang}] "${found.title}" (${Math.round(stats.size / 1024)} KB)`);
        } else {
          console.log(`[${i+1}/${ARTICLES_MAP.length}] ✗ ${item.slug} file too small`);
        }
      } catch (err) {
        console.log(`[${i+1}/${ARTICLES_MAP.length}] ✗ ${item.slug} download failed: ${err.message}`);
      }
    } else {
      console.log(`[${i+1}/${ARTICLES_MAP.length}] ⚠ NOT FOUND for ${item.slug}`);
    }
  }

  const manifestPath = path.resolve('scripts', 'wiki-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nCOMPLETED: ${Object.keys(manifest).length} of ${ARTICLES_MAP.length} downloaded successfully.`);
}

run();

import { REAL_ARTICLES } from '../data/articles';
import { Article } from '../types';

export interface ResearcherRank {
  level: number;
  id: string;
  title: string;
  badge: string;
  minReads: number;
  nextMinReads: number;
  description: string;
  sealColor: string;
}

export const RESEARCHER_RANKS: ResearcherRank[] = [
  {
    level: 1,
    id: 'casual',
    title: 'Lector Curioso',
    badge: '📜',
    minReads: 0,
    nextMinReads: 3,
    description: 'Comienza su incursión en los fondos documentales desclasificados.',
    sealColor: 'border-stone-400 text-stone-700 bg-stone-100',
  },
  {
    level: 2,
    id: 'assistant',
    title: 'Asistente de Archivo',
    badge: '🔍',
    minReads: 3,
    nextMinReads: 8,
    description: 'Catalogador en formación: analiza fuentes y coteja testimonios periciales.',
    sealColor: 'border-amber-600/60 text-amber-900 bg-amber-50',
  },
  {
    level: 3,
    id: 'expert',
    title: 'Perito Documental',
    badge: '🏛️',
    minReads: 8,
    nextMinReads: 20,
    description: 'Investigador experimentado con dominio sobre enigmas y registros históricos.',
    sealColor: 'border-blue-700/60 text-blue-900 bg-blue-50',
  },
  {
    level: 4,
    id: 'elite',
    title: 'Investigador de Élite',
    badge: '⚖️',
    minReads: 20,
    nextMinReads: 50,
    description: 'Autoridad en crónicas olvidadas: accede con soltura a los casos más herméticos.',
    sealColor: 'border-emerald-700/60 text-emerald-900 bg-emerald-50',
  },
  {
    level: 5,
    id: 'custodian',
    title: 'Custodio del Gran Archivo',
    badge: '🗝️',
    minReads: 50,
    nextMinReads: 250,
    description: 'Máximo grado pericial: guardián honorario de la memoria histórica inusual.',
    sealColor: 'border-purple-700/60 text-purple-900 bg-purple-50',
  },
];

export interface ResearchTrail {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  articleSlugs: string[];
}

export const RESEARCH_TRAILS: ResearchTrail[] = [
  {
    id: 'trail-heists-escapes',
    title: 'Golpes Maestros y Fugas Legendarias',
    subtitle: 'Ruta 01 · Asaltos Periciales',
    badge: '🗝️',
    description: 'Operaciones clandestinas que burlaron bóvedas impenetrables, trenes acorazados y prisiones insulares.',
    articleSlugs: [
      'el-gran-robo-del-tren-del-oro-de-1855-los-duplicados-de-cera-en-el-ferrocarril-de-folkestone',
      'el-gran-robo-del-tren-de-glasgow-1963-bruce-reynolds',
      'la-fuga-de-alcatraz-1962-frank-morris-y-los-hermanos-anglin',
      'el-robo-de-la-gioconda-del-louvre-en-1911-vincenzo-peruggia',
    ],
  },
  {
    id: 'trail-archaeology',
    title: 'Enigmas Arqueológicos Fundacionales',
    subtitle: 'Ruta 02 · Paleontología y Orígenes',
    badge: '🏺',
    description: 'Monumentos y artefactos que obligaron a reescribir los manuales oficiales de la civilización.',
    articleSlugs: [
      'gobekli-tepe-el-santuario-que-reescribio-la-historia-humana',
      'el-redescubrimiento-de-petra-1812-el-viajero-suizo-disfrazado-de-beduino',
      'el-computador-de-anticitera',
      'el-tesoro-del-barco-funerario-de-sutton-hoo-1939-el-rey-anglosajon-de-suffolk',
      'la-tumba-de-filipo-ii-en-vergina-1977-el-tesoro-del-padre-de-alejandro-magno',
    ],
  },
  {
    id: 'trail-maritime',
    title: 'Tragedias y Fantasmas de Alta Mar',
    subtitle: 'Ruta 03 · Bitácoras y Naufragios',
    badge: '⚓',
    description: 'Navíos desiertos, cartas escritas en la penumbra del fondo marino y catástrofes silenciadas.',
    articleSlugs: [
      'el-misterio-del-mary-celeste-el-barco-fantasma-del-atlantico-1872',
      'el-desastre-del-submarino-kursk-2000-la-carta-en-la-oscuridad-del-compartimento-9',
      'la-catastrofe-del-mv-dona-paz-1987-el-titanic-asiatico-en-el-estrecho-de-tablas',
      'la-misteriosa-desaparicion-de-la-expedicion-la-perouse-1788-en-vanikoro',
    ],
  },
  {
    id: 'trail-phenomena',
    title: 'Expedientes Secretos y Fenómenos Abiertos',
    subtitle: 'Ruta 04 · Informes Desclasificados',
    badge: '🌌',
    description: 'Casos donde la ciencia y los registros militares toparon con fronteras inexplicables.',
    articleSlugs: [
      'el-incidente-del-paso-dyatlov-1959',
      'el-evento-de-tunguska-la-gigantesca-explosion-sin-crater-1908',
      'el-incidente-del-bosque-de-rendlesham-1980-el-roswell-britanico',
      'el-hombre-venido-de-taured-1954-el-viajero-del-pais-inexistente',
    ],
  },
];

// --- Storage Keys ---
const SAVED_ARTICLES_KEY = 'archivo_inusual_saved_slugs';
const READ_ARTICLES_KEY = 'archivo_inusual_read_slugs';
const VERDICT_VOTES_KEY = 'archivo_inusual_verdict_votes';

// --- Bookmarked / Saved Articles ---
export function getSavedSlugs(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_ARTICLES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isArticleSaved(slug: string): boolean {
  return getSavedSlugs().includes(slug);
}

export function toggleSaveArticle(slug: string): boolean {
  try {
    const current = getSavedSlugs();
    let updated: string[];
    let isNowSaved = false;
    if (current.includes(slug)) {
      updated = current.filter((s) => s !== slug);
      isNowSaved = false;
    } else {
      updated = [slug, ...current];
      isNowSaved = true;
    }
    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('saved_articles_updated', { detail: { updated, slug, isNowSaved } }));
    return isNowSaved;
  } catch {
    return false;
  }
}

export function getSavedArticles(): Article[] {
  const slugs = getSavedSlugs();
  const map = new Map(REAL_ARTICLES.map((a) => [a.slug, a]));
  return slugs.map((slug) => map.get(slug)).filter((a): a is Article => Boolean(a));
}

// --- Read Articles Tracker ---
export function getReadSlugs(): string[] {
  try {
    const raw = localStorage.getItem(READ_ARTICLES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isArticleRead(slug: string): boolean {
  return getReadSlugs().includes(slug);
}

export function markArticleAsRead(slug: string): void {
  try {
    const current = getReadSlugs();
    if (!current.includes(slug)) {
      const updated = [...current, slug];
      localStorage.setItem(READ_ARTICLES_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('read_articles_updated', { detail: { updated, slug } }));
    }
  } catch {
    // noop
  }
}

// --- Researcher Rank Calculation ---
export function getResearcherRank(readCount: number): ResearcherRank {
  for (let i = RESEARCHER_RANKS.length - 1; i >= 0; i--) {
    if (readCount >= RESEARCHER_RANKS[i].minReads) {
      return RESEARCHER_RANKS[i];
    }
  }
  return RESEARCHER_RANKS[0];
}

export function getRankProgress(readCount: number): { currentRank: ResearcherRank; nextRank: ResearcherRank | null; percent: number } {
  const currentRank = getResearcherRank(readCount);
  const nextRank = RESEARCHER_RANKS.find((r) => r.level === currentRank.level + 1) || null;
  if (!nextRank) {
    return { currentRank, nextRank: null, percent: 100 };
  }
  const span = nextRank.minReads - currentRank.minReads;
  const progressInLevel = readCount - currentRank.minReads;
  const percent = Math.min(100, Math.max(0, Math.round((progressInLevel / span) * 100)));
  return { currentRank, nextRank, percent };
}

// --- Random Story ---
export function getRandomArticle(excludeSlug?: string): Article {
  const pool = excludeSlug ? REAL_ARTICLES.filter((a) => a.slug !== excludeSlug) : REAL_ARTICLES;
  if (pool.length === 0) return REAL_ARTICLES[0];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

// --- Daily Dossier (Deterministic seed per calendar date) ---
export function getDailyArticle(): { article: Article; dateFormatted: string } {
  const today = new Date();
  const dateKey = today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  
  // Hash the dateKey to a numeric seed
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % REAL_ARTICLES.length;
  const article = REAL_ARTICLES[index] || REAL_ARTICLES[0];

  const dateFormatted = today.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return { article, dateFormatted };
}

// --- Case Verdicts (Community interactive voting) ---
export interface CaseVerdict {
  question: string;
  optionA: { label: string; votes: number };
  optionB: { label: string; votes: number };
}

export function getArticleVerdict(slug: string, articleTitle: string): CaseVerdict {
  // Deterministic initial votes based on slug to give realistic live perception
  let seed = 0;
  for (let i = 0; i < slug.length; i++) seed += slug.charCodeAt(i);
  const baseA = 120 + (seed % 180);
  const baseB = 85 + ((seed * 7) % 150);

  let question = '¿Cuál es tu hipótesis sobre este expediente histórico?';
  let optA = 'La explicación oficial y contrastada';
  let optB = 'Existen cabos sueltos y anomalías no resueltas';

  if (slug.includes('robo') || slug.includes('asalto') || slug.includes('oro')) {
    question = '¿Consideras que hubo complicidad de altos mandos en este golpe?';
    optA = 'Sí, fue un trabajo interno con encubrimiento';
    optB = 'No, fue pura audacia e inteligencia criminal';
  } else if (slug.includes('dyatlov') || slug.includes('misterio') || slug.includes('enigma')) {
    question = '¿Crees que el caso obedece a un fenómeno natural o a una operación oculta?';
    optA = 'Un fenómeno natural anómalo pero explicable';
    optB = 'Una intervención militar o misterio sin esclarecer';
  } else if (slug.includes('barco') || slug.includes('naufragio') || slug.includes('kursk')) {
    question = '¿Pudo haberse evitado esta tragedia con transparencia oportuna?';
    optA = 'Sí, la desinformación inicial agravó el desenlace';
    optB = 'No, las condiciones extremas sellaron su destino';
  }

  return {
    question,
    optionA: { label: optA, votes: baseA },
    optionB: { label: optB, votes: baseB },
  };
}

export function getUserVote(slug: string): 'A' | 'B' | null {
  try {
    const raw = localStorage.getItem(VERDICT_VOTES_KEY);
    const votes = raw ? JSON.parse(raw) : {};
    return votes[slug] || null;
  } catch {
    return null;
  }
}

export function castUserVote(slug: string, option: 'A' | 'B'): void {
  try {
    const raw = localStorage.getItem(VERDICT_VOTES_KEY);
    const votes = raw ? JSON.parse(raw) : {};
    votes[slug] = option;
    localStorage.setItem(VERDICT_VOTES_KEY, JSON.stringify(votes));
  } catch {
    // noop
  }
}

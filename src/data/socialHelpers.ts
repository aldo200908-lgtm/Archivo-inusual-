import { Article } from '../types/index';

export interface SocialCoverData {
  hookTitle: string;
  locationSubtitle: string;
  categoryLabel: string;
  accessionNumber: string;
  date: string;
  publicImageUrl: string;
}

export type SocialCoverTemplate = 'cinema' | 'classified' | 'magazine';

// Map of curated, electrifying high-impact titles and locations based strictly on real article data
const SOCIAL_CURATED_METADATA: Record<string, { hook: string; location: string; emoji: string }> = {
  'el-lugar-que-quedo-vacio-islas-flannan': {
    hook: '«EL RELOJ PARADO Y LA COMIDA EN LA MESA: 3 HOMBRES SE ESFUMARON DEL FARO»',
    location: 'ISLAS FLANNAN · ATLÁNTICO NORTE (1900)',
    emoji: '🌊',
  },
  'el-hombre-que-derribo-su-sotano-y-encontro-una-ciudad-subterranea-derinkuyu': {
    hook: 'DERRIBÓ LA PARED DE SU SÓTANO Y HALLÓ UNA CIUDAD OCULTA DE 18 PISOS BAJO TIERRA',
    location: 'DERINKUYU · CAPADOCIA (1963)',
    emoji: '🏛️',
  },
  'el-incidente-del-paso-dyatlov-1959': {
    hook: '9 HIKERS SIN ROPA EN LA NIEVE Y UNA TIENDA CORTADA DESDE EL INTERIOR',
    location: 'PASO DYATLOV · MONTES URALES (1959)',
    emoji: '❄️',
  },
  'el-enigma-del-bergantin-mary-celeste-1872': {
    hook: 'NAVEGABA A TODA VELA CON EL TÉ CALIENTE Y 10 PERSONAS EVAPORADAS EN ALTA MAR',
    location: 'BERGANTÍN MARY CELESTE · ATLÁNTICO (1872)',
    emoji: '⚓',
  },
  'el-manuscrito-voynich-el-libro-indescifrable': {
    hook: 'EL LIBRO MALDITO DEL SIGLO XV QUE LA CRIPTOGRAFÍA MUNDIAL NO PUEDE LEER',
    location: 'FONDO BEINECKE MS 408 · SIGLO XV',
    emoji: '📜',
  },
  'la-epidemia-de-baile-de-estrasburgo-1518': {
    hook: 'LA MISTERIOSA EPIDEMIA QUE OBLIGÓ A 400 PERSONAS A BAILAR HASTA EL COLAPSO',
    location: 'ESTRASBURGO · ALSACIA (1518)',
    emoji: '🕯️',
  },
  'el-caso-del-hombre-de-somerton-tamam-shud-1948': {
    hook: 'UN CADÁVER ELEGANTE EN LA PLAYA Y UN CÓDIGO SECRETO EN SU BOLSILLO: «TAMÁM SHUD»',
    location: 'PLAYA DE SOMERTON · AUSTRALIA (1948)',
    emoji: '🔎',
  },
  'el-misterio-del-vuelo-19-la-patrulla-perdida-1945': {
    hook: '«EL OCÉANO NO SE VE COMO DEBERÍA»: 5 AVIONES DE GUERRA DESVANECIDOS A LA VEZ',
    location: 'VUELO 19 · TRIÁNGULO DE LAS BERMUDAS (1945)',
    emoji: '✈️',
  },
  'el-misterio-de-las-mascaras-de-plomo-morro-do-vintem-1966': {
    hook: 'TRAJES DE GALA, MÁSCARAS DE PLOMO Y UNA NOTA: «TOMAR CÁPSULAS Y ESPERAR EL EFECTO»',
    location: 'MORRO DO VINTÉM · RÍO DE JANEIRO (1966)',
    emoji: '⚡',
  },
  'la-desaparicion-del-coronel-fawcett-y-la-ciudad-perdida-de-z-1925': {
    hook: 'SE ADENTRÓ EN EL INFIERNO VERDE BUSCANDO LA CIUDAD DE «Z» Y NUNCA REGRESÓ',
    location: 'SELVA DEL MATO GROSSO · BRASIL (1925)',
    emoji: '🧭',
  },
  'el-enigma-de-kaspar-hauser-el-huerfano-de-europa-1828': {
    hook: 'APARECIÓ EN 1828 SIN SABER HABLAR TRAS 16 AÑOS ENCADENADO EN UNA CELDA OSCURA',
    location: 'NÚREMBERG · BAVIERA (1828)',
    emoji: '🗝️',
  },
  'gobekli-tepe-el-santuario-que-reescribio-la-historia-humana': {
    hook: 'UN TEMPLO MEGALÍTICO CONSTRUIDO 7.000 AÑOS ANTES QUE LAS PIRÁMIDES',
    location: 'GÖBEKLI TEPE · ANATOLIA (9600 a.C.)',
    emoji: '🗿',
  },
  'el-soldado-que-siguio-peleando-29-anos-hiroo-onoda': {
    hook: 'VIVIÓ 29 AÑOS ESCONDIDO EN LA JUNGLA CREYENDO QUE LA GUERRA SEGUÍA ACTIVA',
    location: 'ISLA DE LUBANG · FILIPINAS (1944–1974)',
    emoji: '🎖️',
  },
  'la-isla-que-desaparecio-de-los-mapas-isla-bermeja': {
    hook: 'FIGURABA EN TODOS LOS MAPAS DURANTE 400 AÑOS, PERO HOY SOLO HAY AGUA PROFUNDA',
    location: 'ISLA BERMEJA · GOLFO DE MÉXICO',
    emoji: '🗺️',
  },
  'el-computador-de-anticitera': {
    hook: 'HALLARON EN UN NAUFRAGIO UN COMPUTADOR DE ENGRANAJES DEL AÑO 150 a.C.',
    location: 'ANTICITERA · GRECIA ANTIGUA',
    emoji: '⚙️',
  },
  'el-palacio-ideal-del-cartero-cheval': {
    hook: 'UN CARTERO TROPEZÓ CON UNA PIEDRA Y DEDICÓ 33 AÑOS A CONSTRUIR SU PALACIO SOÑADO',
    location: 'HAUTERIVES · FRANCIA (1879–1912)',
    emoji: '🏰',
  },
  'el-ano-sin-verano-tambora-1816': {
    hook: 'EL AÑO EN QUE LA TIERRA SE CONGELÓ Y EL SOL NO BRISTÓ EN PLENO JULIO',
    location: 'VOLCÁN TAMBORA · INVIERNO VOLCÁNICO (1816)',
    emoji: '🌋',
  },
  'la-senal-wow-1977': {
    hook: '72 SEGUNDOS DE UNA SEÑAL DE RADIO QUE NUNCA MÁS SE VOLVIÓ A REPETIR',
    location: 'RADIOTELESCOPIO BIG EAR · OHIO (1977)',
    emoji: '📡',
  },
  'norton-i-emperador-de-los-estados-unidos': {
    hook: 'SE AUTOPROCLAMÓ EMPERADOR DE EE.UU. Y TODA UNA CIUDAD LE RINDIÓ HONORES REALES',
    location: 'SAN FRANCISCO · CALIFORNIA (1859)',
    emoji: '👑',
  },
  'la-expedicion-perdida-de-franklin': {
    hook: '129 HOMBRES QUEDARON ATRAPADOS EN EL HIELO Y RECURRIERON AL HORROR PARA SOBREVIVIR',
    location: 'HMS EREBUS & HMS TERROR · ÁRTICO (1845)',
    emoji: '⚓',
  },
  'el-moho-que-cambio-el-siglo-penicilina': {
    hook: 'UN CULTIVO OLVIDADO EN SU LABORATORIO SALVÓ A MÁS DE 200 MILLONES DE PERSONAS',
    location: 'ST MARY’S HOSPITAL · LONDRES (1928)',
    emoji: '🔬',
  },
  'la-gran-inundacion-de-melaza-de-boston-1919': {
    hook: 'UNA OLA GIGANTE DE MELAZA HIRVIENDO A 56 KM/H ARRASÓ UN BARRIO ENTERO',
    location: 'NORTH END · BOSTON (1919)',
    emoji: '🌊',
  },
  'la-batalla-por-el-castillo-de-itter-1945': {
    hook: 'LA ÚNICA BATALLA DONDE SOLDADOS DE EE.UU. Y ALEMANES LUCHARON EN EL MISMO BANDO',
    location: 'CASTILLO DE ITTER · TIROL (1945)',
    emoji: '🛡️',
  },
  'el-gran-smog-de-londres-la-niebla-que-asfixio-a-una-capital-1952': {
    hook: 'CINCO DÍAS DE TINIEBLAS Y NIEBLA TÓXICA QUE COBRARON 12.000 VIDAS EN SILENCIO',
    location: 'LONDRES · REINO UNIDO (1952)',
    emoji: '🌫️',
  },
  'el-hombre-de-hielo-de-los-alpes-el-misterio-de-otzi-1991': {
    hook: 'LO HALLARON CONGELADO HACE 5.300 AÑOS CON UNA PUNTA DE FLECHA EN LA ESPALDA',
    location: 'GLACIAR DE SIMILAUN · ALPES DE ÖTZTAL',
    emoji: '🏹',
  },
  'el-automata-ajedrecista-de-wolfgang-von-kempelen-el-turco-1770': {
    hook: 'EL AUTÓMATA DE MADERA QUE VENCIÓ A BENJAMIN FRANKLIN Y NAPOLEÓN AL AJEDREZ',
    location: 'CORTE DE VIENA · AUSTRIA (1770)',
    emoji: '♟️',
  },
  'el-perro-que-cayo-por-una-madriguera-la-cueva-de-lascaux-1940': {
    hook: 'UN PERRO CAYÓ EN UN AGUJERO Y DESTAPÓ LA CAPILLA SIXTINA DE LA PREHISTORIA',
    location: 'CUEVA DE LASCAUX · FRANCIA (1940)',
    emoji: '🐾',
  },
  'la-caida-desde-3000-metros-juliane-koepcke-selva-amazonica': {
    hook: 'CAYÓ ATADA A SU ASIENTO DESDE 3.000 METROS Y CAMINÓ 11 DÍAS SOLA POR LA SELVA',
    location: 'PUERTO INCA · AMAZONÍA PERUANA (1971)',
    emoji: '✈️',
  },
  'los-33-mineros-de-atacama-69-dias-bajo-tierra-mina-san-jose': {
    hook: '«ESTAMOS BIEN EN EL REFUGIO LOS 33»: 69 DÍAS SEPULTADOS BAJO 700 METROS DE ROCA',
    location: 'MINA SAN JOSÉ · ATACAMA, CHILE (2010)',
    emoji: '⛏️',
  },
  'el-planeador-secreto-del-castillo-de-colditz-fuga-imposible': {
    hook: 'CONSTRUYERON UN AVIÓN SECRETO CON SÁBANAS Y MADERA EN EL TECHO DE UNA CÁRCEL NAZI',
    location: 'CASTILLO DE COLDITZ · SAJONIA (1944)',
    emoji: '🛩️',
  },
  'stanislav-petrov-el-hombre-que-evito-la-guerra-nuclear-1983': {
    hook: 'EL RADAR MARCABA UN ATAQUE NUCLEAR DE EE.UU., PERO ÉL DECIDIÓ NO APRETAR EL BOTÓN',
    location: 'BÚNKER SERPUKHOV-15 · URSS (1983)',
    emoji: '☢️',
  },
  'la-caida-de-10160-metros-sin-paracaidas-vesna-vulovic': {
    hook: 'SU AVIÓN EXPLOTÓ EN EL AIRE: CAYÓ 10.160 METROS SIN PARACAÍDAS Y SOBREVIVIÓ',
    location: 'SRBSKÁ KAMENICE · CHECOSLOVAQUIA (1972)',
    emoji: '🪂',
  },
  'el-pozo-superprofundo-de-kola-12262-metros-hacia-el-manto': {
    hook: 'EL AGUJERO DE 12.262 METROS DONDE LOS CIENTÍFICOS ESCUCHARON SONIDOS INEXPLICABLES',
    location: 'PENÍNSULA DE KOLA · ÁRTICO RUSO',
    emoji: '⛏️',
  },
  'el-gran-robo-de-niza-albert-spaggiari-societe-generale': {
    hook: 'CAVARON UN TÚNEL POR LAS CLOACAS Y DEJARON UNA NOTA: «SIN ARMAS, SIN ODIO, SIN VIOLENCIA»',
    location: 'SOCIÉTÉ GÉNÉRALE · NIZA, FRANCIA (1976)',
    emoji: '💰',
  },
  'la-biblioteca-subterranea-secreta-de-daraya-libros-bajo-las-bombas': {
    hook: 'RESCATARON 14.000 LIBROS DE LOS ESCOMBROS PARA CREAR UNA BIBLIOTECA BAJO LAS BOMBAS',
    location: 'DARAYA · DAMASCO, SIRIA',
    emoji: '📚',
  },
  'las-esferas-de-klerksdorp-el-misterio-geologico-de-2800-millones-de-anos': {
    hook: 'ESFERAS METÁLICAS PERFECTAMENTE RANURADAS EXTRAÍDAS DE ROCA DE 2.800 MILLONES DE AÑOS',
    location: 'MINAS DE OTTOSDAL · SUDÁFRICA',
    emoji: '🔮',
  },
  'el-vuelo-5390-el-capitan-que-sobrevivio-fuera-de-la-cabina-en-vuelo': {
    hook: 'EL PARABRISAS ESTALLÓ A 5.300 METROS Y EL PILOTO QUEDÓ COLGANDO FUERA DEL AVIÓN',
    location: 'VUELO BRITISH AIRWAYS 5390 (1990)',
    emoji: '🛩️',
  },
};

/**
 * Extracts a concise, high-impact hook title from an article without inventing facts.
 */
export function getSocialHookTitle(article: Article): string {
  if (article.socialHookTitle) return article.socialHookTitle;
  if (SOCIAL_CURATED_METADATA[article.slug]?.hook) {
    return SOCIAL_CURATED_METADATA[article.slug].hook;
  }

  // Automatic clean transformation based on title
  const parts = article.title.split(':');
  if (parts.length > 1 && parts[0].trim().length <= 55) {
    return parts[0].trim().toUpperCase();
  }

  // Fallback: take first 8-10 words
  const words = article.title.replace(/[«»"']/g, '').split(' ');
  if (words.length <= 8) return words.join(' ').toUpperCase();
  return words.slice(0, 8).join(' ').toUpperCase();
}

/**
 * Extracts a location or period subtitle for the social cover.
 */
export function getSocialLocation(article: Article): string {
  if (article.socialLocation) return article.socialLocation;
  if (SOCIAL_CURATED_METADATA[article.slug]?.location) {
    return SOCIAL_CURATED_METADATA[article.slug].location;
  }

  if (article.date && article.accessionNumber) {
    return `${article.categoryLabel.toUpperCase()} · ${article.date.toUpperCase()}`;
  }

  return article.categoryLabel.toUpperCase();
}

/**
 * Gets the stable, public URL for the 1080x1350 social cover image.
 */
export function getSocialCoverUrl(article: Article): string {
  if (article.socialCoverImage) return article.socialCoverImage;
  return `https://archivoinusual.vercel.app/images/social/${article.slug}.jpg`;
}

/**
 * Generates formatted copy specifically for dlvr.it social publishing.
 * Follows the exact format required:
 * EMOJI + TÍTULO GANCHO
 * Resumen real del artículo
 * Call to action hacia la crónica completa
 */
export function buildDlvrItPostText(article: Article): string {
  if (article.socialSummary) return article.socialSummary;

  const hook = getSocialHookTitle(article);
  const emoji = SOCIAL_CURATED_METADATA[article.slug]?.emoji || '📜';
  const url = `https://archivoinusual.vercel.app/historias/${article.slug}`;

  // Use the factual excerpt
  const summary = article.excerpt || article.subtitle;

  return `${emoji} ${hook}\n\n${summary}\n\n🔎 Descubre el expediente documentado completo en Archivo Inusual:\n${url}`;
}

/**
 * Generates long-form storytelling copy specifically for Instagram Feed (up to 2,200 chars).
 * Formatted as an engaging micro-documentary with narrative paragraphs, call-to-action, and hashtags.
 */
export function buildInstagramLongPostText(article: Article): string {
  const hook = getSocialHookTitle(article);
  const emoji = SOCIAL_CURATED_METADATA[article.slug]?.emoji || '📜';
  const location = getSocialLocation(article);

  // Extract real narrative paragraphs from the article content
  const narrativeParagraphs: string[] = [];
  if (article.content && Array.isArray(article.content)) {
    for (const section of article.content) {
      if (section.paragraphs && Array.isArray(section.paragraphs)) {
        for (const p of section.paragraphs) {
          if (p && p.length > 50 && !p.startsWith('Fuentes') && !p.startsWith('Lecturas')) {
            narrativeParagraphs.push(p);
            if (narrativeParagraphs.length >= 3) break;
          }
        }
      }
      if (narrativeParagraphs.length >= 3) break;
    }
  }

  let storyBody = '';
  if (narrativeParagraphs.length > 0) {
    storyBody = narrativeParagraphs.join('\n\n');
  } else {
    storyBody = `${article.subtitle}\n\n${article.excerpt}`;
  }

  // Safe length limit for Instagram (leave headroom for tags and CTA)
  if (storyBody.length > 1300) {
    storyBody = storyBody.slice(0, 1300).trim() + '...';
  }

  // Category tags
  const baseHashtags = [
    '#archivoinusual',
    '#historiasreales',
    '#misterioshistoricos',
    '#enigmas',
    '#documental',
    '#curiosidadeshistoricas',
    '#hechosreales',
    '#historiaoculta',
  ];

  const categoryHashtags: Record<string, string[]> = {
    misterios: ['#misterios', '#desapariciones', '#fenomenos', '#casosreales', '#investigacion'],
    acontecimientos: ['#historiauniversal', '#sucesoshistoricos', '#momentoshistoricos', '#cronicas', '#archivo'],
    descubrimientos: ['#arqueologia', '#ciencia', '#hallazgos', '#exploracion', '#antiguedad'],
    personas: ['#biografias', '#personajesincreibles', '#supervivencia', '#historiasdevida', '#testimonios'],
    historias: ['#cronica', '#expedientes', '#relatos', '#hechosinsolitos'],
  };

  const selectedCatTags = categoryHashtags[article.category] || categoryHashtags.historias;
  const allHashtags = [...baseHashtags, ...selectedCatTags].join(' ');

  return `${emoji} ${hook}\n📍 ${location}\n\n${storyBody}\n\n━━━━━━━━━━━━━━━━━━━━\n📌 Guarda este post para no perder este expediente.\n🏛️ Lee la investigación completa y documentos originales en el enlace de nuestra biografía: @archivoinusual\n\n${allHashtags}`;
}

/**
 * Renders a full-bleed cinematic 1080x1350 (4:5) social cover directly on an HTML5 Canvas.
 * Supports 3 high-impact aesthetic templates:
 * - 'cinema': Dramatic documentary poster style (A24/Netflix).
 * - 'classified': Gritty true-crime classified document style with red stamps and tactical crosshairs.
 * - 'magazine': Luxury prestigious archival magazine cover with gold borders.
 */
export async function renderSocialCoverToCanvas(
  canvas: HTMLCanvasElement,
  article: Article,
  imageElement?: HTMLImageElement,
  template: SocialCoverTemplate = 'cinema'
): Promise<void> {
  const WIDTH = 1080;
  const HEIGHT = 1350;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Draw photography covering 100% of the canvas (Smart crop centered, no distortion)
  if (imageElement && imageElement.complete && imageElement.naturalWidth > 0) {
    const iw = imageElement.naturalWidth;
    const ih = imageElement.naturalHeight;
    const scale = Math.max(WIDTH / iw, HEIGHT / ih);
    const sw = WIDTH / scale;
    const sh = HEIGHT / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    ctx.drawImage(imageElement, sx, sy, sw, sh, 0, 0, WIDTH, HEIGHT);
  } else {
    // Deep warm fallback tone
    const fallbackGrad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    fallbackGrad.addColorStop(0, '#1c1917');
    fallbackGrad.addColorStop(1, '#0c0a09');
    ctx.fillStyle = fallbackGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  // ==========================================
  // TEMPLATE 1: CINEMA (Documental A24 / Netflix)
  // ==========================================
  if (template === 'cinema') {
    // Top Gradient
    const topGrad = ctx.createLinearGradient(0, 0, 0, 340);
    topGrad.addColorStop(0, 'rgba(8, 7, 6, 0.88)');
    topGrad.addColorStop(0.5, 'rgba(8, 7, 6, 0.45)');
    topGrad.addColorStop(1, 'rgba(8, 7, 6, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, WIDTH, 340);

    // Bottom Deep Cinematic Gradient
    const bottomGrad = ctx.createLinearGradient(0, 480, 0, HEIGHT);
    bottomGrad.addColorStop(0, 'rgba(6, 5, 4, 0)');
    bottomGrad.addColorStop(0.3, 'rgba(6, 5, 4, 0.55)');
    bottomGrad.addColorStop(0.65, 'rgba(6, 5, 4, 0.88)');
    bottomGrad.addColorStop(1, 'rgba(4, 3, 2, 0.98)');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, 480, WIDTH, HEIGHT - 480);

    // Ultra subtle luxury outer hairline
    ctx.save();
    ctx.strokeStyle = 'rgba(214, 180, 110, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(28, 28, WIDTH - 56, HEIGHT - 56);
    ctx.restore();

    // Top Header Pill Badge
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const pillY = 56;
    const pillW = 420;
    const pillH = 38;
    const pillX = (WIDTH - pillW) / 2;

    ctx.fillStyle = 'rgba(10, 8, 6, 0.85)';
    ctx.strokeStyle = 'rgba(214, 180, 110, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 19);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FAF8F5';
    ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText('ARCHIVO INUSUAL · DOCUMENTO REAL', WIDTH / 2, pillY + pillH / 2);

    // Category Tag badge
    const catLabel = article.categoryLabel.toUpperCase();
    ctx.fillStyle = '#F59E0B'; // warm amber gold
    ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText(`— ${catLabel} —`, WIDTH / 2, 118);
    ctx.restore();

    // Hook Title Lower-Third
    const hook = getSocialHookTitle(article);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '800 52px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#FAF8F5';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.98)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 5;

    const titleMaxWidth = WIDTH - 120;
    const words = hook.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width <= titleMaxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 64;
    const totalTitleHeight = lines.length * lineHeight;
    let textY = Math.max(900, 1080 - totalTitleHeight - 110);

    for (const line of lines.slice(0, 3)) {
      ctx.fillText(line, WIDTH / 2, textY);
      textY += lineHeight;
    }
    ctx.restore();

    // Location subtitle
    const location = getSocialLocation(article);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#FBBF24';
    ctx.font = '700 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.fillText(`• ${location} •`, WIDTH / 2, textY + 16);

    // Archival footer bar
    const footerY = 1270;
    ctx.strokeStyle = 'rgba(214, 180, 110, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(56, footerY);
    ctx.lineTo(WIDTH - 56, footerY);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#A8A29E';
    ctx.font = '600 13px monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText(article.accessionNumber ? `DOC. ${article.accessionNumber}` : 'EXPEDIENTE VERIFICADO', 56, footerY + 36);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#D6B46E';
    ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('archivoinusual.vercel.app', WIDTH - 56, footerY + 36);
    ctx.restore();
  }

  // ==========================================
  // TEMPLATE 2: CLASSIFIED (Expediente Secreto / True Crime)
  // ==========================================
  else if (template === 'classified') {
    // Darker vignetted background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    bgGrad.addColorStop(0, 'rgba(8, 6, 5, 0.85)');
    bgGrad.addColorStop(0.3, 'rgba(8, 6, 5, 0.2)');
    bgGrad.addColorStop(0.55, 'rgba(8, 6, 5, 0.55)');
    bgGrad.addColorStop(1, 'rgba(5, 4, 3, 0.98)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Crosshairs in all 4 corners
    ctx.save();
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    const pad = 44;
    const len = 24;
    // Top-Left
    ctx.beginPath(); ctx.moveTo(pad - len, pad); ctx.lineTo(pad + len, pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad, pad - len); ctx.lineTo(pad, pad + len); ctx.stroke();
    // Top-Right
    ctx.beginPath(); ctx.moveTo(WIDTH - pad - len, pad); ctx.lineTo(WIDTH - pad + len, pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(WIDTH - pad, pad - len); ctx.lineTo(WIDTH - pad, pad + len); ctx.stroke();
    // Bottom-Left
    ctx.beginPath(); ctx.moveTo(pad - len, HEIGHT - pad); ctx.lineTo(pad + len, HEIGHT - pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad, HEIGHT - pad - len); ctx.lineTo(pad, HEIGHT - pad + len); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(WIDTH - pad - len, HEIGHT - pad); ctx.lineTo(WIDTH - pad + len, HEIGHT - pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(WIDTH - pad, HEIGHT - pad - len); ctx.lineTo(WIDTH - pad, HEIGHT - pad + len); ctx.stroke();
    ctx.restore();

    // Red Weathered Stamp: [DOCUMENTO DESCLASIFICADO]
    ctx.save();
    ctx.translate(WIDTH - 240, 95);
    ctx.rotate(-0.14); // subtle 8-degree angle
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 3.5;
    ctx.fillStyle = 'rgba(220, 38, 38, 0.15)';
    ctx.strokeRect(-180, -32, 360, 64);
    ctx.fillRect(-180, -32, 360, 64);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#EF4444';
    ctx.font = '900 20px monospace';
    ctx.letterSpacing = '4px';
    ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fillText('DESCLASIFICADO', 0, 0);
    ctx.restore();

    // Top-Left: Typewriter Dossier Tag
    ctx.save();
    ctx.textAlign = 'left';
    ctx.fillStyle = '#E5E7EB';
    ctx.font = '700 18px monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText('ARCHIVO INUSUAL // EXPEDIENTE', 50, 75);
    ctx.fillStyle = '#F59E0B';
    ctx.font = '600 14px monospace';
    ctx.fillText(`REF: ${article.accessionNumber || 'ARC-CONFIDENTIAL'} · ${article.categoryLabel.toUpperCase()}`, 50, 102);
    ctx.restore();

    // Lower-Third: Industrial High-Impact Headline
    const hook = getSocialHookTitle(article);
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.shadowBlur = 24;

    const titleMaxWidth = WIDTH - 120;
    const words = hook.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width <= titleMaxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 62;
    const totalTitleHeight = lines.length * lineHeight;
    let textY = Math.max(900, 1080 - totalTitleHeight - 110);

    for (const line of lines.slice(0, 3)) {
      ctx.fillText(line, 60, textY);
      textY += lineHeight;
    }

    // Yellow warning line
    const location = getSocialLocation(article);
    ctx.fillStyle = '#FBBF24';
    ctx.font = '700 20px monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText(`▶ LUGAR/ÉPOCA: ${location}`, 60, textY + 16);

    // Bottom warning bar
    const footerY = 1270;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fillRect(50, footerY, WIDTH - 100, 48);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(50, footerY, WIDTH - 100, 48);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FCA5A5';
    ctx.font = '700 13px monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('REGISTRO HISTÓRICO ORIGINAL · ARCHIVOINUSUAL.VERCEL.APP', WIDTH / 2, footerY + 24);
    ctx.restore();
  }

  // ==========================================
  // TEMPLATE 3: MAGAZINE (Revista de Colección / National Geographic)
  // ==========================================
  else if (template === 'magazine') {
    // Elegant Double Gold Border
    ctx.save();
    ctx.strokeStyle = '#D97706'; // rich amber gold
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, WIDTH - 14, HEIGHT - 14);

    ctx.strokeStyle = '#FDE68A'; // fine inner gold hairline
    ctx.lineWidth = 1.5;
    ctx.strokeRect(34, 34, WIDTH - 68, HEIGHT - 68);
    ctx.restore();

    // Top Dark Gradient
    const topGrad = ctx.createLinearGradient(0, 0, 0, 280);
    topGrad.addColorStop(0, 'rgba(10, 8, 6, 0.92)');
    topGrad.addColorStop(1, 'rgba(10, 8, 6, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, WIDTH, 280);

    // Bottom Dark Gradient
    const bottomGrad = ctx.createLinearGradient(0, 600, 0, HEIGHT);
    bottomGrad.addColorStop(0, 'rgba(10, 8, 6, 0)');
    bottomGrad.addColorStop(0.4, 'rgba(10, 8, 6, 0.75)');
    bottomGrad.addColorStop(1, 'rgba(8, 6, 4, 0.98)');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, 600, WIDTH, HEIGHT - 600);

    // Iconic Magazine Masthead
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 38px Georgia, serif';
    ctx.letterSpacing = '12px';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 15;
    ctx.fillText('ARCHIVO INUSUAL', WIDTH / 2, 60);

    ctx.fillStyle = '#F59E0B';
    ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('EDICIÓN DOCUMENTAL · HISTORIAS VERÍDICAS', WIDTH / 2, 114);
    ctx.restore();

    // Heroic Centered Headline
    const hook = getSocialHookTitle(article);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '800 50px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#FAF8F5';
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.shadowBlur = 24;

    const titleMaxWidth = WIDTH - 140;
    const words = hook.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width <= titleMaxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 62;
    const totalTitleHeight = lines.length * lineHeight;
    let textY = Math.max(900, 1080 - totalTitleHeight - 110);

    for (const line of lines.slice(0, 3)) {
      ctx.fillText(line, WIDTH / 2, textY);
      textY += lineHeight;
    }

    const location = getSocialLocation(article);
    ctx.fillStyle = '#FCD34D';
    ctx.font = '700 20px Georgia, serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(`— ${location} —`, WIDTH / 2, textY + 18);

    // Gold bottom ribbon
    const footerY = 1260;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E5E7EB';
    ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('INVESTIGACIÓN Y FUENTES DISPONIBLES EN ARCHIVOINUSUAL.VERCEL.APP', WIDTH / 2, footerY + 20);
    ctx.restore();
  }
}

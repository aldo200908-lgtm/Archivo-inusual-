export type LanguageCode = 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it' | 'ja';

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  speechLang: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'es', label: 'Español', nativeLabel: 'Español', flag: '🇪🇸', speechLang: 'es-ES' },
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸', speechLang: 'en-US' },
  { code: 'pt', label: 'Português', nativeLabel: 'Português', flag: '🇧🇷', speechLang: 'pt-BR' },
  { code: 'fr', label: 'Français', nativeLabel: 'Français', flag: '🇫🇷', speechLang: 'fr-FR' },
  { code: 'de', label: 'Deutsch', nativeLabel: 'Deutsch', flag: '🇩🇪', speechLang: 'de-DE' },
  { code: 'it', label: 'Italiano', nativeLabel: 'Italiano', flag: '🇮🇹', speechLang: 'it-IT' },
  { code: 'ja', label: 'Japonés', nativeLabel: '日本語', flag: '🇯🇵', speechLang: 'ja-JP' },
];

export interface Translations {
  // Nav
  nav_home: string;
  nav_stories: string;
  nav_timeline: string;
  nav_map: string;
  nav_people: string;
  nav_events: string;
  nav_discoveries: string;
  nav_mysteries: string;
  nav_search: string;
  nav_studio: string;
  
  // Header / Brand
  brand_tagline: string;
  search_placeholder: string;
  search_quick_prompt: string;
  
  // Hero / Home
  hero_title_prefix: string;
  hero_title_highlight: string;
  hero_title_suffix: string;
  hero_subtitle: string;
  hero_cta_read: string;
  hero_cta_explore: string;
  hero_archive_badge: string;
  
  // Sections
  section_featured: string;
  section_recent: string;
  section_timeline: string;
  section_all_stories: string;
  section_related: string;
  section_categories: string;
  
  // Categories
  cat_all: string;
  cat_stories: string;
  cat_people: string;
  cat_events: string;
  cat_discoveries: string;
  cat_mysteries: string;
  
  cat_desc_stories: string;
  cat_desc_people: string;
  cat_desc_events: string;
  cat_desc_discoveries: string;
  cat_desc_mysteries: string;

  // Article Reader
  read_time_suffix: string;
  doc_archive_prefix: string;
  sources_heading: string;
  verified_source: string;
  share_heading: string;
  copy_link: string;
  link_copied: string;
  next_story: string;
  prev_story: string;
  back_to_archive: string;
  
  // Audio Narrator
  narrator_title: string;
  narrator_play: string;
  narrator_pause: string;
  narrator_stop: string;
  narrator_speed: string;
  narrator_chapter: string;
  narrator_voice: string;
  narrator_not_supported: string;
  
  // Reading Controls
  controls_font_size: string;
  controls_font_family: string;
  controls_focus_mode: string;
  controls_listen: string;
  controls_language: string;
  
  // Language Banner / Picker
  lang_select_title: string;
  lang_select_desc: string;
  lang_current: string;
  lang_dismiss: string;
  
  // Footer
  footer_editorial_manifesto: string;
  footer_archive_stats: string;
  footer_verified_dossiers: string;
  footer_rights: string;
  footer_newsletter_title: string;
  footer_newsletter_desc: string;
  footer_newsletter_placeholder: string;
  footer_newsletter_button: string;
  footer_newsletter_success: string;
  
  // Search Page
  search_title: string;
  search_results_count: string;
  search_no_results: string;
  search_filter_all: string;
  search_sort_recent: string;
  search_sort_title: string;
  search_sort_reading: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  es: {
    nav_home: 'Inicio',
    nav_stories: 'Historias',
    nav_timeline: 'Cronología',
    nav_map: 'Mapa',
    nav_people: 'Personas',
    nav_events: 'Acontecimientos',
    nav_discoveries: 'Descubrimientos',
    nav_mysteries: 'Misterios',
    nav_search: 'Buscar expediente',
    nav_studio: 'Estudio Social',
    
    brand_tagline: 'Historias reales que parecen ficción',
    search_placeholder: 'Buscar por personaje, año, misterio o expediente...',
    search_quick_prompt: 'Escribe para explorar el archivo histórico...',
    
    hero_title_prefix: 'Un archivo digital de',
    hero_title_highlight: 'hechos insólitos',
    hero_title_suffix: 'y crónicas documentadas.',
    hero_subtitle: 'Expedientes verificados de vidas extraordinarias, enigmas sin resolver, descubrimientos inverosímiles y momentos cruciales que desafían la imaginación.',
    hero_cta_read: 'Comenzar a leer',
    hero_cta_explore: 'Explorar archivo',
    hero_archive_badge: 'Archivo Documental Abierto',
    
    section_featured: 'Expediente Destacado',
    section_recent: 'Últimas Investigaciones',
    section_timeline: 'Línea de Tiempo Histórica',
    section_all_stories: 'Catálogo de Expedientes',
    section_related: 'Expedientes Relacionados',
    section_categories: 'Categorías del Archivo',
    
    cat_all: 'Todos',
    cat_stories: 'Historias',
    cat_people: 'Personas',
    cat_events: 'Acontecimientos',
    cat_discoveries: 'Descubrimientos',
    cat_mysteries: 'Misterios',
    
    cat_desc_stories: 'Crónicas y relatos fascinantes de la historia universal verificados con fuentes primarias.',
    cat_desc_people: 'Biografías extraordinarias de individuos cuyas vidas superaron cualquier ficción.',
    cat_desc_events: 'Sucesos extraordinarios y giros históricos que alteraron el rumbo de la humanidad.',
    cat_desc_discoveries: 'Hallazgos científicos, tesoros arqueológicos y fenómenos que cambiaron nuestro entendimiento.',
    cat_desc_mysteries: 'Enigmas históricos sin resolver, desapariciones inexplicables y fenómenos singulares.',
    
    read_time_suffix: 'min de lectura',
    doc_archive_prefix: 'DOC. ARCHIVO',
    sources_heading: 'Fuentes documentales y bibliografía',
    verified_source: 'Fuente verificada',
    share_heading: 'Compartir:',
    copy_link: 'Copiar enlace',
    link_copied: '¡Copiado!',
    next_story: 'Siguiente historia',
    prev_story: 'Historia anterior',
    back_to_archive: 'Volver al archivo',
    
    narrator_title: 'Narración de audio documental',
    narrator_play: 'Escuchar',
    narrator_pause: 'Pausar',
    narrator_stop: 'Detener',
    narrator_speed: 'Velocidad',
    narrator_chapter: 'Capítulo',
    narrator_voice: 'Voz',
    narrator_not_supported: 'Tu navegador no soporta síntesis de voz.',
    
    controls_font_size: 'Tamaño de texto',
    controls_font_family: 'Tipografía',
    controls_focus_mode: 'Modo enfoque',
    controls_listen: 'Escuchar',
    controls_language: 'Idioma',
    
    lang_select_title: 'Selecciona tu idioma preferido',
    lang_select_desc: 'Puedes leer y escuchar todo el archivo en el idioma de tu preferencia.',
    lang_current: 'Idioma activo',
    lang_dismiss: 'Entendido',
    
    footer_editorial_manifesto: 'Archivo Inusual es un proyecto editorial independiente dedicado al rescate, verificación y divulgación de expedientes históricos singulares con rigor documental.',
    footer_archive_stats: 'Estadísticas del Archivo',
    footer_verified_dossiers: 'Expedientes verificados',
    footer_rights: 'Todos los derechos reservados. Divulgación cultural y educativa.',
    footer_newsletter_title: 'Recibe nuevos expedientes',
    footer_newsletter_desc: 'Una entrega semanal con las investigaciones y crónicas más fascinantes del archivo.',
    footer_newsletter_placeholder: 'tu.correo@ejemplo.com',
    footer_newsletter_button: 'Suscribirse',
    footer_newsletter_success: '¡Gracias por unirte al archivo!',
    
    search_title: 'Búsqueda en el Archivo',
    search_results_count: 'expedientes encontrados',
    search_no_results: 'No se encontraron expedientes con los términos especificados.',
    search_filter_all: 'Todos los expedientes',
    search_sort_recent: 'Más recientes',
    search_sort_title: 'Título A-Z',
    search_sort_reading: 'Tiempo de lectura',
  },

  en: {
    nav_home: 'Home',
    nav_stories: 'Stories',
    nav_timeline: 'Timeline',
    nav_map: 'Map',
    nav_people: 'People',
    nav_events: 'Events',
    nav_discoveries: 'Discoveries',
    nav_mysteries: 'Mysteries',
    nav_search: 'Search archive',
    nav_studio: 'Social Studio',
    
    brand_tagline: 'Real stories stranger than fiction',
    search_placeholder: 'Search by person, year, mystery or case file...',
    search_quick_prompt: 'Type to search the historical archive...',
    
    hero_title_prefix: 'A digital archive of',
    hero_title_highlight: 'unusual facts',
    hero_title_suffix: 'and documented chronicles.',
    hero_subtitle: 'Verified files of extraordinary lives, unsolved enigmas, improbable discoveries, and pivotal moments that defy imagination.',
    hero_cta_read: 'Start reading',
    hero_cta_explore: 'Explore archive',
    hero_archive_badge: 'Open Documentary Archive',
    
    section_featured: 'Featured Dossier',
    section_recent: 'Latest Investigations',
    section_timeline: 'Historical Timeline',
    section_all_stories: 'Archive Catalog',
    section_related: 'Related Dossiers',
    section_categories: 'Archive Categories',
    
    cat_all: 'All',
    cat_stories: 'Stories',
    cat_people: 'People',
    cat_events: 'Events',
    cat_discoveries: 'Discoveries',
    cat_mysteries: 'Mysteries',
    
    cat_desc_stories: 'Fascinating chronicles and accounts from world history verified with primary sources.',
    cat_desc_people: 'Extraordinary biographies of individuals whose real lives surpassed any fiction.',
    cat_desc_events: 'Singular historic turns and occurrences that altered human history.',
    cat_desc_discoveries: 'Scientific breakthroughs, archaeological treasures, and reality-altering findings.',
    cat_desc_mysteries: 'Unsolved historic enigmas, baffling disappearances, and singular phenomena.',
    
    read_time_suffix: 'min read',
    doc_archive_prefix: 'DOC. ARCHIVE',
    sources_heading: 'Documentary sources & bibliography',
    verified_source: 'Verified source',
    share_heading: 'Share:',
    copy_link: 'Copy link',
    link_copied: 'Copied!',
    next_story: 'Next story',
    prev_story: 'Previous story',
    back_to_archive: 'Back to archive',
    
    narrator_title: 'Documentary Audio Narration',
    narrator_play: 'Listen',
    narrator_pause: 'Pause',
    narrator_stop: 'Stop',
    narrator_speed: 'Speed',
    narrator_chapter: 'Chapter',
    narrator_voice: 'Voice',
    narrator_not_supported: 'Your browser does not support text-to-speech.',
    
    controls_font_size: 'Text size',
    controls_font_family: 'Typography',
    controls_focus_mode: 'Focus mode',
    controls_listen: 'Listen',
    controls_language: 'Language',
    
    lang_select_title: 'Select your preferred language',
    lang_select_desc: 'You can read and listen to the entire archive in your language of choice.',
    lang_current: 'Active language',
    lang_dismiss: 'Got it',
    
    footer_editorial_manifesto: 'Archivo Inusual is an independent editorial project dedicated to recovering, verifying, and publishing singular historical dossiers with archival rigor.',
    footer_archive_stats: 'Archive Statistics',
    footer_verified_dossiers: 'Verified dossiers',
    footer_rights: 'All rights reserved. Cultural & educational dissemination.',
    footer_newsletter_title: 'Receive new dossiers',
    footer_newsletter_desc: 'A weekly dispatch with the most fascinating historical investigations from the archive.',
    footer_newsletter_placeholder: 'your.email@example.com',
    footer_newsletter_button: 'Subscribe',
    footer_newsletter_success: 'Thank you for joining the archive!',
    
    search_title: 'Archive Search',
    search_results_count: 'dossiers found',
    search_no_results: 'No dossiers matched your search query.',
    search_filter_all: 'All dossiers',
    search_sort_recent: 'Most recent',
    search_sort_title: 'Title A-Z',
    search_sort_reading: 'Reading time',
  },

  pt: {
    nav_home: 'Início',
    nav_stories: 'Histórias',
    nav_timeline: 'Cronologia',
    nav_map: 'Mapa',
    nav_people: 'Pessoas',
    nav_events: 'Acontecimentos',
    nav_discoveries: 'Descobertas',
    nav_mysteries: 'Mistérios',
    nav_search: 'Buscar arquivo',
    nav_studio: 'Estúdio Social',
    
    brand_tagline: 'Histórias reais que parecem ficção',
    search_placeholder: 'Buscar por personagem, ano, mistério ou dossiê...',
    search_quick_prompt: 'Digite para explorar o arquivo histórico...',
    
    hero_title_prefix: 'Um arquivo digital de',
    hero_title_highlight: 'fatos insólitos',
    hero_title_suffix: 'e crônicas documentadas.',
    hero_subtitle: 'Dossiês verificados de vidas extraordinárias, enigmas não resolvidos, descobertas improváveis e momentos cruciais da história.',
    hero_cta_read: 'Começar a ler',
    hero_cta_explore: 'Explorar arquivo',
    hero_archive_badge: 'Arquivo Documental Aberto',
    
    section_featured: 'Dossiê em Destaque',
    section_recent: 'Últimas Investigações',
    section_timeline: 'Linha do Tempo Histórica',
    section_all_stories: 'Catálogo de Dossiês',
    section_related: 'Dossiês Relacionados',
    section_categories: 'Categorias do Arquivo',
    
    cat_all: 'Todos',
    cat_stories: 'Histórias',
    cat_people: 'Pessoas',
    cat_events: 'Acontecimentos',
    cat_discoveries: 'Descobertas',
    cat_mysteries: 'Mistérios',
    
    cat_desc_stories: 'Crônicas fascinantes da história universal verificadas com fontes primárias.',
    cat_desc_people: 'Biografias extraordinárias de indivíduos cujas vidas superaram qualquer ficção.',
    cat_desc_events: 'Acontecimentos extraordinários que mudaram o rumo da humanidade.',
    cat_desc_discoveries: 'Descobertas científicas e arqueológicas que transformaram o nosso entendimento.',
    cat_desc_mysteries: 'Enigmas históricos não resolvidos e desaparecimentos misteriosos.',
    
    read_time_suffix: 'min de leitura',
    doc_archive_prefix: 'DOC. ARQUIVO',
    sources_heading: 'Fontes documentais e bibliografia',
    verified_source: 'Fonte verificada',
    share_heading: 'Compartilhar:',
    copy_link: 'Copiar link',
    link_copied: 'Copiado!',
    next_story: 'Próxima história',
    prev_story: 'História anterior',
    back_to_archive: 'Voltar ao arquivo',
    
    narrator_title: 'Narração de Áudio Documental',
    narrator_play: 'Ouvir',
    narrator_pause: 'Pausar',
    narrator_stop: 'Parar',
    narrator_speed: 'Velocidade',
    narrator_chapter: 'Capítulo',
    narrator_voice: 'Voz',
    narrator_not_supported: 'Seu navegador não suporta síntese de voz.',
    
    controls_font_size: 'Tamanho do texto',
    controls_font_family: 'Tipografia',
    controls_focus_mode: 'Modo foco',
    controls_listen: 'Ouvir',
    controls_language: 'Idioma',
    
    lang_select_title: 'Escolha seu idioma de preferência',
    lang_select_desc: 'Você pode ler e ouvir todo o arquivo no idioma de sua escolha.',
    lang_current: 'Idioma ativo',
    lang_dismiss: 'Entendido',
    
    footer_editorial_manifesto: 'Archivo Inusual é um projeto editorial independente dedicado ao resgate e divulgação de dossiês históricos singulares.',
    footer_archive_stats: 'Estatísticas do Arquivo',
    footer_verified_dossiers: 'Dossiês verificados',
    footer_rights: 'Todos os direitos reservados. Divulgação cultural e educativa.',
    footer_newsletter_title: 'Receba novos dossiês',
    footer_newsletter_desc: 'Uma entrega semanal com as investigações mais fascinantes do arquivo.',
    footer_newsletter_placeholder: 'seu.email@exemplo.com',
    footer_newsletter_button: 'Inscrever-se',
    footer_newsletter_success: 'Obrigado por se juntar ao arquivo!',
    
    search_title: 'Busca no Arquivo',
    search_results_count: 'dossiês encontrados',
    search_no_results: 'Nenhum dossiê encontrado para a pesquisa.',
    search_filter_all: 'Todos os dossiês',
    search_sort_recent: 'Mais recentes',
    search_sort_title: 'Título A-Z',
    search_sort_reading: 'Tempo de leitura',
  },

  fr: {
    nav_home: 'Accueil',
    nav_stories: 'Histoires',
    nav_timeline: 'Chronologie',
    nav_map: 'Carte',
    nav_people: 'Personnages',
    nav_events: 'Événements',
    nav_discoveries: 'Découvertes',
    nav_mysteries: 'Mystères',
    nav_search: 'Rechercher',
    nav_studio: 'Studio Social',
    
    brand_tagline: 'Des histoires vraies qui défient la fiction',
    search_placeholder: 'Rechercher un personnage, une année, un mystère...',
    search_quick_prompt: 'Tapez pour explorer les archives historiques...',
    
    hero_title_prefix: 'Une archive numérique de',
    hero_title_highlight: 'faits insolites',
    hero_title_suffix: 'et de chroniques documentées.',
    hero_subtitle: 'Dossiers vérifiés de vies extraordinaires, énigmes non résolues, découvertes improbables et moments charnières de l’histoire.',
    hero_cta_read: 'Commencer la lecture',
    hero_cta_explore: 'Explorer les archives',
    hero_archive_badge: 'Archive Documentaire Ouverte',
    
    section_featured: 'Dossier à la Une',
    section_recent: 'Dernières Enquêtes',
    section_timeline: 'Chronologie Historique',
    section_all_stories: 'Catalogue des Dossiers',
    section_related: 'Dossiers Connexes',
    section_categories: 'Catégories d’Archives',
    
    cat_all: 'Tous',
    cat_stories: 'Histoires',
    cat_people: 'Personnages',
    cat_events: 'Événements',
    cat_discoveries: 'Découvertes',
    cat_mysteries: 'Mystères',
    
    cat_desc_stories: 'Chroniques fascinantes de l’histoire universelle vérifiées par des sources primaires.',
    cat_desc_people: 'Biographies extraordinaires d’individus dont la vie a dépassé toute fiction.',
    cat_desc_events: 'Événements extraordinaires qui ont changé le cours de l’humanité.',
    cat_desc_discoveries: 'Découvertes scientifiques et archéologiques majeures.',
    cat_desc_mysteries: 'Énigmes historiques non résolues et disparitions inexpliquées.',
    
    read_time_suffix: 'min de lecture',
    doc_archive_prefix: 'DOC. ARCHIVE',
    sources_heading: 'Sources documentaires et bibliographie',
    verified_source: 'Source vérifiée',
    share_heading: 'Partager :',
    copy_link: 'Copier le lien',
    link_copied: 'Copié !',
    next_story: 'Histoire suivante',
    prev_story: 'Histoire précédente',
    back_to_archive: 'Retour aux archives',
    
    narrator_title: 'Narration Audio Documentaire',
    narrator_play: 'Écouter',
    narrator_pause: 'Pause',
    narrator_stop: 'Arrêter',
    narrator_speed: 'Vitesse',
    narrator_chapter: 'Chapitre',
    narrator_voice: 'Voix',
    narrator_not_supported: 'Votre navigateur ne prend pas en charge la synthèse vocale.',
    
    controls_font_size: 'Taille du texte',
    controls_font_family: 'Typographie',
    controls_focus_mode: 'Mode concentration',
    controls_listen: 'Écouter',
    controls_language: 'Langue',
    
    lang_select_title: 'Choisissez votre langue préférée',
    lang_select_desc: 'Lisez et écoutez toutes les archives dans la langue de votre choix.',
    lang_current: 'Langue active',
    lang_dismiss: 'Compris',
    
    footer_editorial_manifesto: 'Archivo Inusual est un projet éditorial indépendant dédié à la préservation et diffusion de dossiers historiques singuliers.',
    footer_archive_stats: 'Statistiques des Archives',
    footer_verified_dossiers: 'Dossiers vérifiés',
    footer_rights: 'Tous droits réservés. Diffusion culturelle et éducative.',
    footer_newsletter_title: 'Recevez les nouveaux dossiers',
    footer_newsletter_desc: 'Une sélection hebdomadaire des enquêtes les plus fascinantes.',
    footer_newsletter_placeholder: 'votre.email@exemple.com',
    footer_newsletter_button: 'S’abonner',
    footer_newsletter_success: 'Merci de rejoindre les archives !',
    
    search_title: 'Recherche dans les Archives',
    search_results_count: 'dossiers trouvés',
    search_no_results: 'Aucun dossier ne correspond à votre recherche.',
    search_filter_all: 'Tous les dossiers',
    search_sort_recent: 'Plus récents',
    search_sort_title: 'Titre A-Z',
    search_sort_reading: 'Temps de lecture',
  },

  de: {
    nav_home: 'Startseite',
    nav_stories: 'Geschichten',
    nav_timeline: 'Zeitleiste',
    nav_map: 'Karte',
    nav_people: 'Persönlichkeiten',
    nav_events: 'Ereignisse',
    nav_discoveries: 'Entdeckungen',
    nav_mysteries: 'Mysterien',
    nav_search: 'Archiv durchsuchen',
    nav_studio: 'Social Studio',
    
    brand_tagline: 'Wahre Geschichten, die wie Fiktion klingen',
    search_placeholder: 'Suche nach Person, Jahr, Mysterium oder Akte...',
    search_quick_prompt: 'Tippen, um das historische Archiv zu durchsuchen...',
    
    hero_title_prefix: 'Ein digitales Archiv für',
    hero_title_highlight: 'ungewöhnliche Fakten',
    hero_title_suffix: 'und dokumentierte Chroniken.',
    hero_subtitle: 'Verifizierte Akten außergewöhnlicher Leben, ungelöster Rätsel, unglaublicher Entdeckungen und historischer Wendepunkte.',
    hero_cta_read: 'Jetzt lesen',
    hero_cta_explore: 'Archiv erkunden',
    hero_archive_badge: 'Offenes Dokumentararchiv',
    
    section_featured: 'Ausgewählte Akte',
    section_recent: 'Neueste Recherchen',
    section_timeline: 'Historische Zeitleiste',
    section_all_stories: 'Aktenkatalog',
    section_related: 'Verwandte Akten',
    section_categories: 'Archivkategorien',
    
    cat_all: 'Alle',
    cat_stories: 'Geschichten',
    cat_people: 'Persönlichkeiten',
    cat_events: 'Ereignisse',
    cat_discoveries: 'Entdeckungen',
    cat_mysteries: 'Mysterien',
    
    cat_desc_stories: 'Faszinierende Berichte der Weltgeschichte, belegt mit Primärquellen.',
    cat_desc_people: 'Außergewöhnliche Biografien von Menschen, deren Leben jeden Roman übertrifft.',
    cat_desc_events: 'Historische Ereignisse, die den Lauf der Menschheit veränderten.',
    cat_desc_discoveries: 'Wissenschaftliche und archäologische Entdeckungen.',
    cat_desc_mysteries: 'Ungelöste historische Rätsel und unerklärliche Phänomene.',
    
    read_time_suffix: 'Min. Lesezeit',
    doc_archive_prefix: 'DOK. ARCHIV',
    sources_heading: 'Quellen und Bibliographie',
    verified_source: 'Verifizierte Quelle',
    share_heading: 'Teilen:',
    copy_link: 'Link kopieren',
    link_copied: 'Kopiert!',
    next_story: 'Nächste Geschichte',
    prev_story: 'Vorherige Geschichte',
    back_to_archive: 'Zurück zum Archiv',
    
    narrator_title: 'Dokumentarisches Audio',
    narrator_play: 'Anhören',
    narrator_pause: 'Pause',
    narrator_stop: 'Stopp',
    narrator_speed: 'Geschwindigkeit',
    narrator_chapter: 'Kapitel',
    narrator_voice: 'Stimme',
    narrator_not_supported: 'Ihr Browser unterstützt keine Sprachausgabe.',
    
    controls_font_size: 'Schriftgröße',
    controls_font_family: 'Schriftart',
    controls_focus_mode: 'Fokus-Modus',
    controls_listen: 'Anhören',
    controls_language: 'Sprache',
    
    lang_select_title: 'Wählen Sie Ihre bevorzugte Sprache',
    lang_select_desc: 'Sie können das gesamte Archiv in Ihrer Wunschsprache lesen und hören.',
    lang_current: 'Aktive Sprache',
    lang_dismiss: 'Verstanden',
    
    footer_editorial_manifesto: 'Archivo Inusual ist ein unabhängiges Redaktionsprojekt zur Erforschung historischer Akten.',
    footer_archive_stats: 'Archivstatistiken',
    footer_verified_dossiers: 'Geprüfte Akten',
    footer_rights: 'Alle Rechte vorbehalten. Kulturelle & bildende Vermittlung.',
    footer_newsletter_title: 'Neue Akten abonnieren',
    footer_newsletter_desc: 'Wöchentliche Zusendung faszinierender Recherchen aus dem Archiv.',
    footer_newsletter_placeholder: 'ihre.email@beispiel.de',
    footer_newsletter_button: 'Abonnieren',
    footer_newsletter_success: 'Vielen Dank für Ihren Beitritt!',
    
    search_title: 'Archivsuche',
    search_results_count: 'Akten gefunden',
    search_no_results: 'Keine Akten zu Ihren Suchbegriffen gefunden.',
    search_filter_all: 'Alle Akten',
    search_sort_recent: 'Neueste zuerst',
    search_sort_title: 'Titel A-Z',
    search_sort_reading: 'Lesezeit',
  },

  it: {
    nav_home: 'Home',
    nav_stories: 'Storie',
    nav_timeline: 'Cronologia',
    nav_map: 'Mappa',
    nav_people: 'Persone',
    nav_events: 'Avvenimenti',
    nav_discoveries: 'Scoperte',
    nav_mysteries: 'Misteri',
    nav_search: 'Cerca archivio',
    nav_studio: 'Studio Social',
    
    brand_tagline: 'Storie vere che sembrano finzione',
    search_placeholder: 'Cerca personaggio, anno, mistero o fascicolo...',
    search_quick_prompt: 'Digita per esplorare l’archivio storico...',
    
    hero_title_prefix: 'Un archivio digitale di',
    hero_title_highlight: 'fatti insoliti',
    hero_title_suffix: 'e cronache documentate.',
    hero_subtitle: 'Fascicoli verificati di vite straordinarie, enigmi irrisolti, scoperte improbabili e momenti cruciali della storia.',
    hero_cta_read: 'Inizia a leggere',
    hero_cta_explore: 'Esplora l’archivio',
    hero_archive_badge: 'Archivio Documentale Aperto',
    
    section_featured: 'Fascicolo in Evidenza',
    section_recent: 'Ultime Indagini',
    section_timeline: 'Linea Temporale Storica',
    section_all_stories: 'Catalogo Fascicoli',
    section_related: 'Fascicoli Correlati',
    section_categories: 'Categorie dell’Archivio',
    
    cat_all: 'Tutti',
    cat_stories: 'Storie',
    cat_people: 'Persone',
    cat_events: 'Avvenimenti',
    cat_discoveries: 'Scoperte',
    cat_mysteries: 'Misteri',
    
    cat_desc_stories: 'Cronache affascinanti della storia universale verificate con fonti primarie.',
    cat_desc_people: 'Biografie straordinarie di individui le cui vite hanno superato ogni finzione.',
    cat_desc_events: 'Eventi straordinari che hanno alterato il corso dell’umanità.',
    cat_desc_discoveries: 'Scoperte scientifiche e archeologiche che hanno trasformato la nostra conoscenza.',
    cat_desc_mysteries: 'Enigmi storici irrisolti e sparizioni inspiegabili.',
    
    read_time_suffix: 'min di lettura',
    doc_archive_prefix: 'DOC. ARCHIVIO',
    sources_heading: 'Fonti documentali e bibliografia',
    verified_source: 'Fonte verificata',
    share_heading: 'Condividi:',
    copy_link: 'Copia link',
    link_copied: 'Copiato!',
    next_story: 'Prossima storia',
    prev_story: 'Storia precedente',
    back_to_archive: 'Torna all’archivio',
    
    narrator_title: 'Narrazione Audio Documentale',
    narrator_play: 'Ascolta',
    narrator_pause: 'Pausa',
    narrator_stop: 'Stop',
    narrator_speed: 'Velocità',
    narrator_chapter: 'Capitolo',
    narrator_voice: 'Voce',
    narrator_not_supported: 'Il tuo browser non supporta la sintesi vocale.',
    
    controls_font_size: 'Dimensione testo',
    controls_font_family: 'Tipografia',
    controls_focus_mode: 'Modalità focus',
    controls_listen: 'Ascolta',
    controls_language: 'Lingua',
    
    lang_select_title: 'Scegli la tua lingua preferita',
    lang_select_desc: 'Puoi leggere e ascoltare tutto l’archivio nella lingua che preferisci.',
    lang_current: 'Lingua attiva',
    lang_dismiss: 'Ho capito',
    
    footer_editorial_manifesto: 'Archivo Inusual è un progetto editoriale indipendente dedicato alla riscoperta e verifica di fascicoli storici singolari.',
    footer_archive_stats: 'Statistiche dell’Archivio',
    footer_verified_dossiers: 'Fascicoli verificati',
    footer_rights: 'Tutti i diritti riservati. Divulgazione culturale ed educativa.',
    footer_newsletter_title: 'Ricevi nuovi fascicoli',
    footer_newsletter_desc: 'Una rassegna settimanale con le indagini più affascinanti dell’archivio.',
    footer_newsletter_placeholder: 'tua.email@esempio.it',
    footer_newsletter_button: 'Iscriviti',
    footer_newsletter_success: 'Grazie per esserti unito all’archivio!',
    
    search_title: 'Ricerca nell’Archivio',
    search_results_count: 'fascicoli trovati',
    search_no_results: 'Nessun fascicolo trovato.',
    search_filter_all: 'Tutti i fascicoli',
    search_sort_recent: 'Più recenti',
    search_sort_title: 'Titolo A-Z',
    search_sort_reading: 'Tempo di lettura',
  },

  ja: {
    nav_home: 'ホーム',
    nav_stories: '物語',
    nav_timeline: '年表',
    nav_map: '地図',
    nav_people: '人物',
    nav_events: '出来事',
    nav_discoveries: '大発見',
    nav_mysteries: '未解決の謎',
    nav_search: 'アーカイブを検索',
    nav_studio: 'ソーシャルスタジオ',
    
    brand_tagline: '小説よりも奇なる歴史の実話',
    search_placeholder: '人物、年代、謎、事件ファイルを検索...',
    search_quick_prompt: 'キーワードを入力して歴史の記録を探索...',
    
    hero_title_prefix: 'フィクションを超える',
    hero_title_highlight: '奇跡と異例の実話',
    hero_title_suffix: 'のデジタル公文書館。',
    hero_subtitle: '波乱万丈の生涯、未解決の謎、科学の奇跡的発見など、確かな史料に基づいて検証された歴史記録。',
    hero_cta_read: '読み始める',
    hero_cta_explore: 'アーカイブを探索',
    hero_archive_badge: '公開ドキュメンタリー記録',
    
    section_featured: '注目の事件記録',
    section_recent: '最新の調査記録',
    section_timeline: '歴史タイムライン',
    section_all_stories: '記録目録',
    section_related: '関連する記録',
    section_categories: 'カテゴリー',
    
    cat_all: 'すべて',
    cat_stories: '物語',
    cat_people: '人物',
    cat_events: '出来事',
    cat_discoveries: '大発見',
    cat_mysteries: '未解決の謎',
    
    cat_desc_stories: '一次史料で検証された世界史の魅力的な実話と記録。',
    cat_desc_people: 'フィクションを超えた人生を歩んだ人物たちの波乱の伝記。',
    cat_desc_events: '歴史の歯車を狂わせた予期せぬ出来事と大事件。',
    cat_desc_discoveries: '世界の常識を塗り替えた科学的・考古学的発見。',
    cat_desc_mysteries: 'いまだ解明されていない歴史的失踪事件や未解決の謎。',
    
    read_time_suffix: '分で読了',
    doc_archive_prefix: '文書記録',
    sources_heading: '参考文献および公式史料',
    verified_source: '検証済み史料',
    share_heading: '共有:',
    copy_link: 'リンクをコピー',
    link_copied: 'コピーしました！',
    next_story: '次の記録へ',
    prev_story: '前の記録へ',
    back_to_archive: '目録に戻る',
    
    narrator_title: 'ドキュメンタリー音声朗読',
    narrator_play: '再生',
    narrator_pause: '一時停止',
    narrator_stop: '停止',
    narrator_speed: '再生速度',
    narrator_chapter: '章',
    narrator_voice: '音声',
    narrator_not_supported: 'お使いのブラウザは音声合成に対応していません。',
    
    controls_font_size: '文字サイズ',
    controls_font_family: 'フォント',
    controls_focus_mode: '集中モード',
    controls_listen: '朗読を聞く',
    controls_language: '言語',
    
    lang_select_title: 'お好みの言語を選択してください',
    lang_select_desc: 'すべての記録を希望の言語でお読みいただけます。',
    lang_current: '現在の言語',
    lang_dismiss: '了解',
    
    footer_editorial_manifesto: 'Archivo Inusual（奇妙なアーカイブ）は、歴史の闇に埋もれた驚くべき実話を厳密な検証とともに発掘・記録する独立したデジタル公文書プロジェクトです。',
    footer_archive_stats: 'アーカイブ統計',
    footer_verified_dossiers: '検証済み記録件数',
    footer_rights: '無断転載を禁じます。文化的・教育的普及を目的としています。',
    footer_newsletter_title: '最新の調査記録を受け取る',
    footer_newsletter_desc: '毎週、最も興味深い歴史の謎と実話をメールでお届けします。',
    footer_newsletter_placeholder: 'your.email@example.com',
    footer_newsletter_button: '購読する',
    footer_newsletter_success: 'ご登録ありがとうございます！',
    
    search_title: 'アーカイブ内検索',
    search_results_count: '件の記録が見つかりました',
    search_no_results: '該当する記録が見つかりませんでした。',
    search_filter_all: 'すべての記録',
    search_sort_recent: '最新順',
    search_sort_title: '五十音・アルファベット順',
    search_sort_reading: '読了時間順',
  },
};

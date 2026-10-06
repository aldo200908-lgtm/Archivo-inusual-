export interface StoryLocation {
  slug: string;
  lat: number;
  lng: number;
  placeName: string;
  country: string;
  year: number; // For timeline sorting
  eraLabel: string;
}

export const STORY_LOCATIONS: Record<string, StoryLocation> = {
  // Longform base
  'el-lugar-que-quedo-vacio-islas-flannan': {
    slug: 'el-lugar-que-quedo-vacio-islas-flannan',
    lat: 58.283,
    lng: -7.583,
    placeName: 'Faro de Eilean Mòr, Islas Flannan',
    country: 'Escocia, Reino Unido',
    year: 1900,
    eraLabel: 'Siglo XX'
  },
  'la-isla-que-desaparecio-de-los-mapas-isla-bermeja': {
    slug: 'la-isla-que-desaparecio-de-los-mapas-isla-bermeja',
    lat: 22.55,
    lng: -91.366,
    placeName: 'Isla Bermeja, Golfo de México',
    country: 'México',
    year: 1997,
    eraLabel: 'Siglo XX'
  },
  'el-computador-de-anticitera': {
    slug: 'el-computador-de-anticitera',
    lat: 35.866,
    lng: 23.3,
    placeName: 'Naufragio de Anticitera, Mar Egeo',
    country: 'Grecia',
    year: -150,
    eraLabel: 'Antigüedad'
  },
  'el-palacio-ideal-del-cartero-cheval': {
    slug: 'el-palacio-ideal-del-cartero-cheval',
    lat: 45.256,
    lng: 5.027,
    placeName: 'Hauterives, Drôme',
    country: 'Francia',
    year: 1879,
    eraLabel: 'Siglo XIX'
  },
  'el-ano-sin-verano-tambora-1816': {
    slug: 'el-ano-sin-verano-tambora-1816',
    lat: -8.25,
    lng: 118.0,
    placeName: 'Volcán Tambora, Isla de Sumbawa',
    country: 'Indonesia',
    year: 1816,
    eraLabel: 'Siglo XIX'
  },
  'la-senal-wow-1977': {
    slug: 'la-senal-wow-1977',
    lat: 40.25,
    lng: -83.05,
    placeName: 'Radiotelescopio Big Ear, Ohio',
    country: 'Estados Unidos',
    year: 1977,
    eraLabel: 'Guerra Fría'
  },
  'norton-i-emperador-de-los-estados-unidos': {
    slug: 'norton-i-emperador-de-los-estados-unidos',
    lat: 37.774,
    lng: -122.419,
    placeName: 'San Francisco, California',
    country: 'Estados Unidos',
    year: 1859,
    eraLabel: 'Siglo XIX'
  },
  'la-expedicion-perdida-de-franklin': {
    slug: 'la-expedicion-perdida-de-franklin',
    lat: 68.633,
    lng: -95.866,
    placeName: 'Isla del Rey Guillermo, Paso del Noroeste',
    country: 'Canadá',
    year: 1845,
    eraLabel: 'Siglo XIX'
  },
  'el-moho-que-cambio-el-siglo-penicilina': {
    slug: 'el-moho-que-cambio-el-siglo-penicilina',
    lat: 51.517,
    lng: -0.174,
    placeName: "St Mary's Hospital, Londres",
    country: 'Reino Unido',
    year: 1928,
    eraLabel: 'Siglo XX'
  },
  'el-hombre-que-derribo-su-sotano-y-encontro-una-ciudad-subterranea-derinkuyu': {
    slug: 'el-hombre-que-derribo-su-sotano-y-encontro-una-ciudad-subterranea-derinkuyu',
    lat: 38.373,
    lng: 34.735,
    placeName: 'Ciudad Subterránea de Derinkuyu, Capadocia',
    country: 'Turquía',
    year: 1963,
    eraLabel: 'Siglo XX'
  },

  // Batch 1
  'el-incidente-del-paso-dyatlov-1959': {
    slug: 'el-incidente-del-paso-dyatlov-1959',
    lat: 61.755,
    lng: 59.462,
    placeName: 'Jolát Siājl, Montes Urales',
    country: 'Rusia / URSS',
    year: 1959,
    eraLabel: 'Guerra Fría'
  },
  'el-enigma-del-bergantin-mary-celeste-1872': {
    slug: 'el-enigma-del-bergantin-mary-celeste-1872',
    lat: 38.33,
    lng: -25.66,
    placeName: 'Islas Azores, Océano Atlántico',
    country: 'Portugal / Aguas Internacionales',
    year: 1872,
    eraLabel: 'Siglo XIX'
  },
  'el-manuscrito-voynich-el-libro-indescifrable': {
    slug: 'el-manuscrito-voynich-el-libro-indescifrable',
    lat: 41.803,
    lng: 12.682,
    placeName: 'Villa Mondragone, Frascati',
    country: 'Italia',
    year: 1404,
    eraLabel: 'Edad Media'
  },
  'la-epidemia-de-baile-de-estrasburgo-1518': {
    slug: 'la-epidemia-de-baile-de-estrasburgo-1518',
    lat: 48.573,
    lng: 7.752,
    placeName: 'Estrasburgo, Alsacia',
    country: 'Francia / Sacro Imperio',
    year: 1518,
    eraLabel: 'Renacimiento'
  },
  'el-caso-del-hombre-de-somerton-tamam-shud-1948': {
    slug: 'el-caso-del-hombre-de-somerton-tamam-shud-1948',
    lat: -34.992,
    lng: 138.514,
    placeName: 'Playa de Somerton, Adelaida',
    country: 'Australia',
    year: 1948,
    eraLabel: 'Siglo XX'
  },
  'el-misterio-del-vuelo-19-la-patrulla-perdida-1945': {
    slug: 'el-misterio-del-vuelo-19-la-patrulla-perdida-1945',
    lat: 26.072,
    lng: -80.152,
    placeName: 'Fort Lauderdale, Triángulo de las Bermudas',
    country: 'Estados Unidos / Atlántico',
    year: 1945,
    eraLabel: 'Segunda Guerra Mundial'
  },
  'el-misterio-de-las-mascaras-de-plomo-morro-do-vintem-1966': {
    slug: 'el-misterio-de-las-mascaras-de-plomo-morro-do-vintem-1966',
    lat: -22.906,
    lng: -43.111,
    placeName: 'Morro do Vintém, Niterói, Río de Janeiro',
    country: 'Brasil',
    year: 1966,
    eraLabel: 'Guerra Fría'
  },
  'la-desaparicion-del-coronel-fawcett-y-la-ciudad-perdida-de-z-1925': {
    slug: 'la-desaparicion-del-coronel-fawcett-y-la-ciudad-perdida-de-z-1925',
    lat: -12.5,
    lng: -53.5,
    placeName: 'Cuenca del río Xingu, Mato Grosso',
    country: 'Brasil',
    year: 1925,
    eraLabel: 'Siglo XX'
  },
  'el-enigma-de-kaspar-hauser-el-huerfano-de-europa-1828': {
    slug: 'el-enigma-de-kaspar-hauser-el-huerfano-de-europa-1828',
    lat: 49.452,
    lng: 11.076,
    placeName: 'Núremberg, Reino de Baviera',
    country: 'Alemania',
    year: 1828,
    eraLabel: 'Siglo XIX'
  },
  'gobekli-tepe-el-santuario-que-reescribio-la-historia-humana': {
    slug: 'gobekli-tepe-el-santuario-que-reescribio-la-historia-humana',
    lat: 37.223,
    lng: 38.922,
    placeName: 'Göbekli Tepe, Şanlıurfa, Anatolia',
    country: 'Turquía',
    year: -9600,
    eraLabel: 'Prehistoria'
  },

  // Batch 2
  'el-soldado-que-siguio-peleando-29-anos-hiroo-onoda': {
    slug: 'el-soldado-que-siguio-peleando-29-anos-hiroo-onoda',
    lat: 13.78,
    lng: 120.15,
    placeName: 'Isla de Lubang, Mindoro Occidental',
    country: 'Filipinas',
    year: 1974,
    eraLabel: 'Guerra Fría'
  },
  'la-unica-fuga-de-los-plomos-de-venecia-giacomo-casanova-1756': {
    slug: 'la-unica-fuga-de-los-plomos-de-venecia-giacomo-casanova-1756',
    lat: 45.433,
    lng: 12.34,
    placeName: 'Palacio Ducal (I Piombi), Venecia',
    country: 'Italia',
    year: 1756,
    eraLabel: 'Siglo XVIII'
  },
  'ching-shih-la-prostituta-que-domino-los-mares-de-china': {
    slug: 'ching-shih-la-prostituta-que-domino-los-mares-de-china',
    lat: 22.25,
    lng: 114.15,
    placeName: 'Mar de China Meridional, Cantón',
    country: 'China',
    year: 1807,
    eraLabel: 'Siglo XIX'
  },
  'el-falso-embajador-que-invento-un-pais-george-psalmanazar-1704': {
    slug: 'el-falso-embajador-que-invento-un-pais-george-psalmanazar-1704',
    lat: 51.507,
    lng: -0.127,
    placeName: 'Londres, Royal Society',
    country: 'Reino Unido',
    year: 1704,
    eraLabel: 'Siglo XVIII'
  },
  'jeanne-baret-la-primera-mujer-en-dar-la-vuelta-al-mundo-disfrazada': {
    slug: 'jeanne-baret-la-primera-mujer-en-dar-la-vuelta-al-mundo-disfrazada',
    lat: -20.2,
    lng: 57.5,
    placeName: 'Isla de Francia (Mauricio)',
    country: 'Francia / Océano Índico',
    year: 1766,
    eraLabel: 'Siglo XVIII'
  },
  'la-resistencia-silenciosa-de-salem-giles-corey-1692': {
    slug: 'la-resistencia-silenciosa-de-salem-giles-corey-1692',
    lat: 42.519,
    lng: -70.896,
    placeName: 'Salem, Bahía de Massachusetts',
    country: 'Estados Unidos',
    year: 1692,
    eraLabel: 'Siglo XVII'
  },
  'la-gran-inundacion-de-melaza-de-boston-1919': {
    slug: 'la-gran-inundacion-de-melaza-de-boston-1919',
    lat: 42.366,
    lng: -71.054,
    placeName: 'North End, Boston, Massachusetts',
    country: 'Estados Unidos',
    year: 1919,
    eraLabel: 'Siglo XX'
  },
  'la-tragica-expedicion-en-globo-al-polo-norte-salomon-andree-1897': {
    slug: 'la-tragica-expedicion-en-globo-al-polo-norte-salomon-andree-1897',
    lat: 80.05,
    lng: 31.5,
    placeName: 'Kvitøya, Archipiélago de Svalbard',
    country: 'Noruega / Ártico',
    year: 1897,
    eraLabel: 'Siglo XIX'
  },
  'la-fuga-imposible-del-submarino-polaco-orp-orzel-1939': {
    slug: 'la-fuga-imposible-del-submarino-polaco-orp-orzel-1939',
    lat: 59.437,
    lng: 24.753,
    placeName: 'Puerto de Tallin, Golfo de Finlandia',
    country: 'Estonia / Mar Báltico',
    year: 1939,
    eraLabel: 'Segunda Guerra Mundial'
  },
  'la-batalla-por-el-castillo-de-itter-1945': {
    slug: 'la-batalla-por-el-castillo-de-itter-1945',
    lat: 47.47,
    lng: 12.14,
    placeName: 'Castillo de Itter, Tirol',
    country: 'Austria',
    year: 1945,
    eraLabel: 'Segunda Guerra Mundial'
  },

  // Batch 3
  'la-gran-evasion-del-tunel-57-en-el-muro-de-berlin-1964': {
    slug: 'la-gran-evasion-del-tunel-57-en-el-muro-de-berlin-1964',
    lat: 52.535,
    lng: 13.395,
    placeName: 'Bernauer Straße, Muro de Berlín',
    country: 'Alemania',
    year: 1964,
    eraLabel: 'Guerra Fría'
  },
  'el-gran-smog-de-londres-la-niebla-que-asfixio-a-una-capital-1952': {
    slug: 'el-gran-smog-de-londres-la-niebla-que-asfixio-a-una-capital-1952',
    lat: 51.507,
    lng: -0.127,
    placeName: 'Londres, Gran Bretaña',
    country: 'Reino Unido',
    year: 1952,
    eraLabel: 'Siglo XX'
  },
  'la-guerra-del-asiento-y-la-oreja-de-jenkins-1739': {
    slug: 'la-guerra-del-asiento-y-la-oreja-de-jenkins-1739',
    lat: 10.424,
    lng: -75.548,
    placeName: 'Cartagena de Indias, Virreinato de Nueva Granada',
    country: 'Colombia',
    year: 1739,
    eraLabel: 'Siglo XVIII'
  },
  'el-perro-que-cayo-por-una-madriguera-la-cueva-de-lascaux-1940': {
    slug: 'el-perro-que-cayo-por-una-madriguera-la-cueva-de-lascaux-1940',
    lat: 45.053,
    lng: 1.17,
    placeName: 'Montignac, Dordoña',
    country: 'Francia',
    year: 1940,
    eraLabel: 'Segunda Guerra Mundial'
  },
  'el-crater-de-batagaika-la-puerta-del-inframundo-en-siberia': {
    slug: 'el-crater-de-batagaika-la-puerta-del-inframundo-en-siberia',
    lat: 67.58,
    lng: 134.77,
    placeName: 'Cráter de Batagaika, República de Sajá',
    country: 'Rusia',
    year: 1960,
    eraLabel: 'Siglo XX'
  },
  'las-bibliotecas-perdidas-del-desierto-de-chinguetti-mauritania': {
    slug: 'las-bibliotecas-perdidas-del-desierto-de-chinguetti-mauritania',
    lat: 20.463,
    lng: -12.365,
    placeName: 'Chinguetti, Desierto del Sáhara',
    country: 'Mauritania',
    year: 1200,
    eraLabel: 'Edad Media'
  },
  'el-hombre-de-hielo-de-los-alpes-el-misterio-de-otzi-1991': {
    slug: 'el-hombre-de-hielo-de-los-alpes-el-misterio-de-otzi-1991',
    lat: 46.779,
    lng: 10.84,
    placeName: 'Glaciar de Similaun, Alpes de Ötztal',
    country: 'Italia / Austria',
    year: 1991,
    eraLabel: 'Siglo XX'
  },
  'el-automata-ajedrecista-de-wolfgang-von-kempelen-el-turco-1770': {
    slug: 'el-automata-ajedrecista-de-wolfgang-von-kempelen-el-turco-1770',
    lat: 48.185,
    lng: 16.312,
    placeName: 'Palacio de Schönbrunn, Viena',
    country: 'Austria',
    year: 1770,
    eraLabel: 'Siglo XVIII'
  },
  'el-campanario-solitario-del-lago-de-reschen-la-aldea-sumergida-1950': {
    slug: 'el-campanario-solitario-del-lago-de-reschen-la-aldea-sumergida-1950',
    lat: 46.81,
    lng: 10.51,
    placeName: 'Lago de Resia, Tirol del Sur',
    country: 'Italia',
    year: 1950,
    eraLabel: 'Siglo XX'
  },
  'el-verdadero-cyrano-de-bergerac-y-el-primer-viaje-a-la-luna-1657': {
    slug: 'el-verdadero-cyrano-de-bergerac-y-el-primer-viaje-a-la-luna-1657',
    lat: 48.856,
    lng: 2.352,
    placeName: 'París',
    country: 'Francia',
    year: 1657,
    eraLabel: 'Siglo XVII'
  },

  // Batch 2026
  'nuevo-linaje-pinguino-kerguelensis-2026': {
    slug: 'nuevo-linaje-pinguino-kerguelensis-2026',
    lat: -49.35,
    lng: 70.21,
    placeName: 'Islas Kerguelen, Océano Antártico',
    country: 'Tierras Australes Francesas',
    year: 2026,
    eraLabel: 'Siglo XXI (2026)'
  },
  'rollos-herculano-descifrados-ia-2026': {
    slug: 'rollos-herculano-descifrados-ia-2026',
    lat: 40.806,
    lng: 14.348,
    placeName: 'Villa de los Papiros, Herculano',
    country: 'Italia',
    year: 2026,
    eraLabel: 'Siglo XXI (2026)'
  },
  'corredor-oculto-gran-piramide-guiza-2026': {
    slug: 'corredor-oculto-gran-piramide-guiza-2026',
    lat: 29.979,
    lng: 31.134,
    placeName: 'Gran Pirámide de Keops, Guiza',
    country: 'Egipto',
    year: 2026,
    eraLabel: 'Siglo XXI (2026)'
  },
  'des-extincion-mamut-colossal-2026': {
    slug: 'des-extincion-mamut-colossal-2026',
    lat: 68.75,
    lng: 161.42,
    placeName: 'Parque Pleistoceno, Siberia',
    country: 'Rusia',
    year: 2026,
    eraLabel: 'Siglo XXI (2026)'
  },
  'starship-v3-transferencia-orbital-2026': {
    slug: 'starship-v3-transferencia-orbital-2026',
    lat: 25.997,
    lng: -97.156,
    placeName: 'Starbase, Boca Chica, Texas',
    country: 'Estados Unidos',
    year: 2026,
    eraLabel: 'Siglo XXI (2026)'
  },
  'cuasares-imposibles-universo-temprano-jwst': {
    slug: 'cuasares-imposibles-universo-temprano-jwst',
    lat: 5.236,
    lng: -52.768,
    placeName: 'Telescopio Espacial James Webb (Punto L2)',
    country: 'Espacio Profundo / NASA / ESA',
    year: 2026,
    eraLabel: 'Siglo XXI (2026)'
  },
  'vida-microorganismos-oceano-encelado-2026': {
    slug: 'vida-microorganismos-oceano-encelado-2026',
    lat: -5.0,
    lng: 0.0,
    placeName: 'Plumas Criovolcánicas de Encélado',
    country: 'Sistema de Saturno',
    year: 2026,
    eraLabel: 'Siglo XXI (2026)'
  },
  'satelite-zombi-relay2-les1-misterio-radio': {
    slug: 'satelite-zombi-relay2-les1-misterio-radio',
    lat: 28.572,
    lng: -80.648,
    placeName: 'Órbita Terrestre / Cabo Cañaveral',
    country: 'Estados Unidos / Órbita',
    year: 2013,
    eraLabel: 'Siglo XXI'
  },
  'ciudades-perdidas-amazonas-lidar-upano': {
    slug: 'ciudades-perdidas-amazonas-lidar-upano',
    lat: -2.3,
    lng: -78.1,
    placeName: 'Valle del Upano, Selva Amazónica',
    country: 'Ecuador',
    year: 2024,
    eraLabel: 'Siglo XXI'
  },
  'linaje-humano-fantasma-adn-trace-2026': {
    slug: 'linaje-humano-fantasma-adn-trace-2026',
    lat: -29.8,
    lng: 24.6,
    placeName: 'Cuna de la Humanidad, Sudáfrica',
    country: 'Sudáfrica',
    year: 2026,
    eraLabel: 'Siglo XXI (2026)'
  },
  'de-lavaplatos-a-arquitecto-de-la-ia-jensen-huang-nvidia': {
    slug: 'de-lavaplatos-a-arquitecto-de-la-ia-jensen-huang-nvidia',
    lat: 37.37,
    lng: -121.96,
    placeName: 'Santa Clara, Silicon Valley, California',
    country: 'Estados Unidos',
    year: 1993,
    eraLabel: 'Siglo XX / Siglo XXI'
  },
  'la-caida-desde-3000-metros-juliane-koepcke-selva-amazonica': {
    slug: 'la-caida-desde-3000-metros-juliane-koepcke-selva-amazonica',
    lat: -9.5,
    lng: -74.9,
    placeName: 'Puerto Inca, Selva Amazónica',
    country: 'Perú',
    year: 1971,
    eraLabel: 'Guerra Fría'
  },
  'los-33-mineros-de-atacama-69-dias-bajo-tierra-mina-san-jose': {
    slug: 'los-33-mineros-de-atacama-69-dias-bajo-tierra-mina-san-jose',
    lat: -27.16,
    lng: -70.496,
    placeName: 'Mina San José, Desierto de Atacama',
    country: 'Chile',
    year: 2010,
    eraLabel: 'Siglo XXI'
  },
  'el-planeador-secreto-del-castillo-de-colditz-fuga-imposible': {
    slug: 'el-planeador-secreto-del-castillo-de-colditz-fuga-imposible',
    lat: 51.131,
    lng: 12.807,
    placeName: 'Castillo de Colditz (Oflag IV-C), Sajonia',
    country: 'Alemania',
    year: 1944,
    eraLabel: 'Segunda Guerra Mundial'
  },
  'stanislav-petrov-el-hombre-que-evito-la-guerra-nuclear-1983': {
    slug: 'stanislav-petrov-el-hombre-que-evito-la-guerra-nuclear-1983',
    lat: 54.966,
    lng: 37.398,
    placeName: 'Búnker Serpukhov-15, Moscú',
    country: 'Rusia / URSS',
    year: 1983,
    eraLabel: 'Guerra Fría'
  },
  'la-caida-de-10160-metros-sin-paracaidas-vesna-vulovic': {
    slug: 'la-caida-de-10160-metros-sin-paracaidas-vesna-vulovic',
    lat: 50.816,
    lng: 14.35,
    placeName: 'Srbská Kamenice, Bohemia',
    country: 'República Checa / Checoslovaquia',
    year: 1972,
    eraLabel: 'Guerra Fría'
  },
  'el-pozo-superprofundo-de-kola-12262-metros-hacia-el-manto': {
    slug: 'el-pozo-superprofundo-de-kola-12262-metros-hacia-el-manto',
    lat: 69.396,
    lng: 30.609,
    placeName: 'Península de Kola, Zapolyarny',
    country: 'Rusia / URSS',
    year: 1970,
    eraLabel: 'Guerra Fría'
  },
  'el-gran-robo-de-niza-albert-spaggiari-societe-generale': {
    slug: 'el-gran-robo-de-niza-albert-spaggiari-societe-generale',
    lat: 43.699,
    lng: 7.266,
    placeName: 'Société Générale, Niza, Costa Azul',
    country: 'Francia',
    year: 1976,
    eraLabel: 'Siglo XX'
  },
  'la-biblioteca-subterranea-secreta-de-daraya-libros-bajo-las-bombas': {
    slug: 'la-biblioteca-subterranea-secreta-de-daraya-libros-bajo-las-bombas',
    lat: 33.458,
    lng: 36.236,
    placeName: 'Daraya, Damasco',
    country: 'Siria',
    year: 2013,
    eraLabel: 'Siglo XXI'
  },
  'las-esferas-de-klerksdorp-el-misterio-geologico-de-2800-millones-de-anos': {
    slug: 'las-esferas-de-klerksdorp-el-misterio-geologico-de-2800-millones-de-anos',
    lat: -26.81,
    lng: 26.01,
    placeName: 'Minas de pirofilita de Ottosdal, Klerksdorp',
    country: 'Sudáfrica',
    year: 1970,
    eraLabel: 'Prehistoria / Geología'
  },
  'el-vuelo-5390-el-capitan-que-sobrevivio-fuera-de-la-cabina-en-vuelo': {
    slug: 'el-vuelo-5390-el-capitan-que-sobrevivio-fuera-de-la-cabina-en-vuelo',
    lat: 51.752,
    lng: -1.257,
    placeName: 'Espacio Aéreo sobre Oxfordshire',
    country: 'Reino Unido',
    year: 1990,
    eraLabel: 'Siglo XX'
  },
  'henry-cavendish-experimento-pesar-tierra-1798': {
    slug: 'henry-cavendish-experimento-pesar-tierra-1798',
    lat: 51.46,
    lng: -0.14,
    placeName: 'Clapham Common, Londres',
    country: 'Reino Unido',
    year: 1798,
    eraLabel: 'Siglo XVIII'
  },
  'biblioteca-secreta-monasterio-sakya-tibet': {
    slug: 'biblioteca-secreta-monasterio-sakya-tibet',
    lat: 28.9,
    lng: 88.02,
    placeName: 'Monasterio de Sakya, Shigatse',
    country: 'Tíbet',
    year: 2003,
    eraLabel: 'Siglo XXI / Medieval'
  },
  'desaparicion-vapor-ss-waratah-1909': {
    slug: 'desaparicion-vapor-ss-waratah-1909',
    lat: -32.2,
    lng: 28.8,
    placeName: 'Costa Salvaje, Océano Índico',
    country: 'Sudáfrica',
    year: 1909,
    eraLabel: 'Siglo XX'
  },
  'rebelion-canuts-tejedores-seda-lyon-1831': {
    slug: 'rebelion-canuts-tejedores-seda-lyon-1831',
    lat: 45.77,
    lng: 4.83,
    placeName: 'La Croix-Rousse, Lyon',
    country: 'Francia',
    year: 1831,
    eraLabel: 'Siglo XIX'
  },
  'codice-rohonc-manuscrito-criptografia-hungria': {
    slug: 'codice-rohonc-manuscrito-criptografia-hungria',
    lat: 47.30,
    lng: 16.44,
    placeName: 'Castillo de Rohonc (Rechnitz)',
    country: 'Hungría / Austria',
    year: 1838,
    eraLabel: 'Siglo XIX / Criptografía'
  },
  'tsutomu-yamaguchi-sobreviviente-dos-bombas-atomicas-1945': {
    slug: 'tsutomu-yamaguchi-sobreviviente-dos-bombas-atomicas-1945',
    lat: 34.385,
    lng: 132.455,
    placeName: 'Hiroshima y Nagasaki',
    country: 'Japón',
    year: 1945,
    eraLabel: 'Siglo XX'
  },
  'juliane-koepcke-vuelo-508-selva-peruana-1971': {
    slug: 'juliane-koepcke-vuelo-508-selva-peruana-1971',
    lat: -9.38,
    lng: -74.96,
    placeName: 'Río Shebonya, Puerto Inca / Pucallpa',
    country: 'Perú',
    year: 1971,
    eraLabel: 'Siglo XX'
  },
  'robo-siglo-valledupar-banco-republica-1994': {
    slug: 'robo-siglo-valledupar-banco-republica-1994',
    lat: 10.463,
    lng: -73.253,
    placeName: 'Valledupar, Cesar',
    country: 'Colombia',
    year: 1994,
    eraLabel: 'Siglo XX'
  },
  'gran-fuga-alcatraz-frank-morris-anglin-1962': {
    slug: 'gran-fuga-alcatraz-frank-morris-anglin-1962',
    lat: 37.826,
    lng: -122.423,
    placeName: 'Isla de Alcatraz, Bahía de San Francisco',
    country: 'Estados Unidos',
    year: 1962,
    eraLabel: 'Siglo XX'
  },
  'caso-phineas-gage-barra-hierro-cerebro-1848': {
    slug: 'caso-phineas-gage-barra-hierro-cerebro-1848',
    lat: 43.568,
    lng: -72.607,
    placeName: 'Cavendish, Vermont',
    country: 'Estados Unidos',
    year: 1848,
    eraLabel: 'Siglo XIX'
  },
  'extrana-lluvia-carne-kentucky-1876': {
    slug: 'extrana-lluvia-carne-kentucky-1876',
    lat: 38.058,
    lng: -83.679,
    placeName: 'Olympian Springs, Condado de Bath, Kentucky',
    country: 'Estados Unidos',
    year: 1876,
    eraLabel: 'Siglo XIX'
  },
  'hallazgo-rollos-mar-muerto-qumran-1947': {
    slug: 'hallazgo-rollos-mar-muerto-qumran-1947',
    lat: 31.741,
    lng: 35.459,
    placeName: 'Cuevas de Qumrán, Mar Muerto',
    country: 'Cisjordania',
    year: 1947,
    eraLabel: 'Siglo XX / Antigüedad'
  },
  'expedicion-roy-chapman-andrews-gobi-1923': {
    slug: 'expedicion-roy-chapman-andrews-gobi-1923',
    lat: 44.148,
    lng: 103.728,
    placeName: 'Acantilados Llameantes, Bayanzag, Desierto de Gobi',
    country: 'Mongolia',
    year: 1923,
    eraLabel: 'Siglo XX'
  },
  'vuelo-19-desaparicion-patrulla-bermudas-1945': {
    slug: 'vuelo-19-desaparicion-patrulla-bermudas-1945',
    lat: 26.122,
    lng: -80.137,
    placeName: 'Fort Lauderdale / Triángulo de las Bermudas',
    country: 'Estados Unidos / Océano Atlántico',
    year: 1945,
    eraLabel: 'Siglo XX'
  },
  'la-larga-marcha-fuga-gulag-siberia-india-1941': {
    slug: 'la-larga-marcha-fuga-gulag-siberia-india-1941',
    lat: 62.03,
    lng: 129.74,
    placeName: 'Siberia · Gobi · Tíbet · Calcuta',
    country: 'Rusia / Mongolia / Tíbet / India',
    year: 1941,
    eraLabel: 'Siglo XX'
  }
};

export function getStoryLocation(slug: string): StoryLocation | undefined {
  return STORY_LOCATIONS[slug];
}

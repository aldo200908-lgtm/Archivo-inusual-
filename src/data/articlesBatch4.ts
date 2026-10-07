import { Article } from '../types/index';

export const ARTICLES_BATCH_4: Article[] = [
  {
    id: "art-cavendish-pesar-la-tierra",
    slug: "henry-cavendish-experimento-pesar-tierra-1798",
    title: "El hombre más rico de Inglaterra que pesó el planeta en un cobertizo de madera",
    subtitle: "En 1798, el tímido e intratable aristócrata Henry Cavendish diseñó un aparato de torsión con esferas de plomo para calcular la masa del globo terráqueo con una precisión que nadie superaría en un siglo.",
    category: "personas",
    categoryLabel: "Personas",
    coverImage: "/images/real/wiki_henry-cavendish-experimento-pesar-tierra-1798.jpg",
    imageCaption: "Aparato histórico de balanza de torsión y registro de mediciones gravimétricas de la Royal Society de Londres.",
    date: "1798 / Royal Society de Londres",
    publishedAt: "2026-10-18",
    readingTime: "20 min",
    excerpt: "Heredero de una de las mayores fortunas del Imperio británico, vivía recluido en Clapham sin hablar con nadie y ordenando a sus criados que se mantuvieran fuera de su vista. Con una balanza suspendida por un fino hilo de cobre, midió la atracción gravitatoria entre bolas de metal y calculó el peso exacto de la Tierra.",
    socialHookTitle: "EL CIENTÍFICO QUE PESÓ LA TIERRA SIN SALIR DE SU JARDÍN",
    socialLocation: "CLAPHAM COMMON · LONDRES, INGLATERRA",
    accessionNumber: "FIS-1798-CAV",
    featured: true,
    tags: [
      "Física",
      "Gravitación",
      "Historia de la Ciencia",
      "Londres",
      "Royal Society"
    ],
    quote: "Cavendish era probablemente el más rico de todos los sabios y con certeza el más sabio de todos los ricos.",
    quoteAuthor: "Jean-Baptiste Biot, físico y astrónomo francés (1810)",
    sources: [
      {
        title: "Cavendish, Henry. (1798). 'Experiments to Determine the Density of the Earth'. Philosophical Transactions of the Royal Society of London, 88: 469–526.",
        url: "https://royalsocietypublishing.org/doi/10.1098/rstl.1798.0022"
      },
      {
        title: "Jungnickel, Christa & McCormmach, Russell. (1999). Cavendish: The Experimental Life. Bucknell University Press.",
        url: "https://www.jstor.org/stable/j.ctt1w6tc57"
      },
      {
        title: "Royal Society Archives - Manuscripts and Original Apparatus Sketches of Henry Cavendish (MS 354).",
        url: "https://catalogues.royalsociety.org"
      }
    ],
    content: [
      {
        id: "sec-cavendish-1",
        heading: "1. El ermitaño millonario de Clapham Common",
        paragraphs: [
          "A finales del siglo XVIII, Henry Cavendish poseía más de un millón de libras esterlinas en títulos del Banco de Inglaterra, una fortuna tan astronómica que el banquero privado de la familia solía lamentar que su cliente jamás prestase atención a los dividendos que se acumulaban en sus cuentas. Sin embargo, aquel nieto de dos duques ingleses vestía un único traje de terciopelo violeta descolorido, anticuado en varias décadas, y caminaba con la cabeza gacha por los senderos de su finca en Clapham Common para evitar cruzarse con cualquier ser humano.",
          "Su aversión a la interacción social era tan severa que mantenía la comunicación con sus sirvientes domésticos exclusivamente a través de notas manuscritas depositadas en la mesa del comedor. Si alguna doncella cometía el descuido de coincidir con él en los pasillos de la casa, era despedida en el acto. En las sesiones de la Royal Society, a las que asistía puntualmente los jueves, sus colegas sabían que jamás debían dirigirse a él de frente: era necesario caminar cerca, susurrar una idea científica al aire y esperar que Cavendish, intrigado por el razonamiento, se detuviese a murmurar una respuesta en tono vacilante antes de escabullirse hacia la salida."
        ],
        callout: "A pesar de su aislamiento extremo, Cavendish descubrió la composición del agua (H₂O), aisló por primera vez el hidrógeno gaseoso y anticipó con décadas de antelación las leyes eléctricas de Ohm y Coulomb en cuadernos privados que no se publicaron hasta medio siglo después de su muerte."
      },
      {
        id: "sec-cavendish-2",
        heading: "2. El legado póstumo de John Michell",
        paragraphs: [
          "El origen del proyecto más audaz de Cavendish se remonta a su amistad con el reverendo y filósofo natural John Michell. Michell, pionero en concebir la existencia de cuerpos celestes tan densos que ni la luz podría escapar de ellos (la primera formulación teórica de un agujero negro), había comenzado a construir un instrumento para medir la atracción gravitatoria entre masas de laboratorio.",
          "Cuando Michell falleció en 1793 sin haber concluido el montaje, el tosco aparato fue trasladado en carretas a la finca de Cavendish. Tras examinar minuciosamente el dispositivo, Cavendish comprendió que para medir fuerzas tan infinitesimales como la atracción gravitacional entre dos cuerpos de metal sobre la superficie terrestre, se requería una precisión experimental que nadie en la historia de la física había concebido jamás."
        ]
      },
      {
        id: "sec-cavendish-3",
        heading: "3. La arquitectura del cobertizo hermético",
        paragraphs: [
          "Cavendish reconstruyó por completo el mecanismo y lo encerró dentro de un cobertizo de madera de dos pisos, sellado contra corrientes de aire y cambios bruscos de temperatura. En el centro suspendió un brazo horizontal de madera de 1,8 metros de largo mediante un finísimo alambre de cobre bañado en plata de un metro de longitud. En cada extremo del brazo fijó dos pequeñas esferas de plomo de 5 centímetros de diámetro y 730 gramos de peso.",
          "Por fuera del armazón de madera colocó dos gigantescas bolas de plomo de 30 centímetros de diámetro y 158 kilogramos cada una, montadas sobre un eje giratorio. Cuando las bolas grandes se aproximaban a las esferas pequeñas, la minúscula atracción gravitatoria entre las masas hacía oscilar el brazo horizontal, retorciendo el alambre de cobre hasta que la fuerza elástica del metal equilibraba la atracción de Newton."
        ],
        callout: "Para no alterar el experimento con el calor corporal o las corrientes de su propia respiración, Cavendish no entraba en la sala: realizaba las observaciones desde el exterior mediante telescopios instalados en orificios en las paredes del cobertizo, iluminando las escalas graduadas con linternas de marfil."
      },
      {
        id: "sec-cavendish-4",
        heading: "4. Las diecisiete mediciones que desafiaron a la ciencia",
        paragraphs: [
          "Durante dieciocho meses, entre 1797 y 1798, Cavendish realizó diecisiete series de experimentos con veintinueve observaciones individuales de oscilación pendular. Corrigió con minuciosidad matemática los efectos de las variaciones térmicas, la resistencia del aire y las imperfecciones de elasticidad del alambre.",
          "El 21 de junio de 1798 presentó ante la Royal Society su célebre memoria: 'Experiments to Determine the Density of the Earth'. Sus cálculos arrojaron que la densidad media de la Tierra era 5,48 veces la del agua pura. Con este dato fundamental, y conociendo el radio de la circunferencia terrestre medido por los astrónomos, dedujo que la masa total de la Tierra equivalía aproximadamente a 5,97 × 10²⁴ kilogramos (casi seis sextillones de toneladas métricas)."
        ]
      },
      {
        id: "sec-cavendish-5",
        heading: "5. Un siglo de vigencia imbatible",
        paragraphs: [
          "La cifra obtenida por Cavendish en su cobertizo de Clapham apenas difería en un 1% del valor aceptado hoy en día por la física moderna mediante resonancia atómica y satélites espaciales (5,515 g/cm³). Durante más de un siglo, ningún laboratorio en el planeta logró mejorar la precisión del experimento de torsión de 1798.",
          "Cuando Henry Cavendish falleció en febrero de 1810, a los setenta y ocho años, dejó en sus cajones cientos de legajos científicos no publicados con cálculos de potencial eléctrico, leyes de gases y química cuántica embrionaria. Fue sepultado en la catedral de Derby en una tumba sin epitafio rimbombante, fiel hasta el final a su silenciosa y rigurosa devoción por los números fundamentales del universo."
        ]
      }
    ]
  },
  {
    id: "art-biblioteca-sakya",
    slug: "biblioteca-secreta-monasterio-sakya-tibet",
    title: "Ochenta y cuatro mil manuscritos tras un muro de piedra: La biblioteca sellada de Sakya",
    subtitle: "En 2003, una inspección de conservación en el monasterio fortaleza de Sakya descubrió un falso muro de sesenta metros de largo que albergaba el mayor tesoro documental budista y científico del Tíbet medieval.",
    category: "descubrimientos",
    categoryLabel: "Descubrimientos",
    coverImage: "/images/real/wiki_biblioteca-secreta-monasterio-sakya-tibet.jpg",
    imageCaption: "Antiguos volúmenes manuscritos envueltos en seda preservados en los nichos de piedra del monasterio de Sakya.",
    date: "2003 / Monasterio de Sakya, Shigatse",
    publishedAt: "2026-10-17",
    readingTime: "21 min",
    excerpt: "Durante siglos permanecieron ocultos tras un muro de sesenta metros de largo por diez de alto en el corazón del Tíbet. En 2003, el desmonte de una pared reveló más de 84.000 pergaminos milenarios en tinta de oro, plata y cinabrio con tratados de medicina, astronomía, jurisprudencia y misticismo intactos desde la época de Kublai Kan.",
    socialHookTitle: "84.000 TEXTOS MEDIEVALES HALLADOS TRAS UN MURO SECRETO",
    socialLocation: "MONASTERIO DE SAKYA · SHIGATSÉ, TÍBET",
    accessionNumber: "ARQ-2003-SAKYA",
    featured: false,
    tags: [
      "Arqueología",
      "Tíbet",
      "Manuscritos",
      "Budismo",
      "Historia Antigua"
    ],
    quote: "La biblioteca de Sakya es a la historia del pensamiento oriental lo que la Biblioteca de Alejandría y los Rollos del Mar Muerto combinados representan para Occidente.",
    quoteAuthor: "Dra. Tsering Dolma, Instituto Tibetano de Patrimonio Histórico",
    sources: [
      {
        title: "Tibetan Academy of Social Sciences. (2005). Preliminary Survey of the Sakya Monastery Grand Library Wall.",
        url: "https://tass.cass.cn"
      },
      {
        title: "UNESCO World Heritage Centre - Sacred Monastic Archives of the Himalayan Plateau.",
        url: "https://whc.unesco.org"
      },
      {
        title: "Van der Kuijp, Leonard W.J. (2007). 'The Monastic Library of Sa skya: History, Conservation and Catalogs'. Harvard Oriental Series.",
        url: "https://hup.harvard.edu"
      }
    ],
    content: [
      {
        id: "sec-sakya-1",
        heading: "1. La fortaleza gris del Himalaya",
        paragraphs: [
          "En el valle árido de Shigatse, a casi 4.300 metros sobre el nivel del mar, se eleva la imponente masa fortificada del monasterio de Sakya. Construido en 1073 y expandido en el siglo XIII bajo el patrocinio de los emperadores mongoles de la dinastía Yuan, sus muros de piedra de tres metros de grosor, pintados con franjas verticales grises, blancas y rojas, resistieron terremotos, asedios militares y las convulsiones políticas de la Revolución Cultural.",
          "Durante generaciones, los monjes custodios transmitieron historias orales sobre una 'biblioteca mural' oculta construida por el sabio Phagpa en tiempos de Kublai Kan para proteger los anales más sagrados y científicos de la civilización himalaya. Sin embargo, para los historiadores occidentales y los archiveros modernos, la supuesta muralla de libros no era más que una leyenda folclórica monástica."
        ]
      },
      {
        id: "sec-sakya-2",
        heading: "2. El hallazgo fortuito de 2003",
        paragraphs: [
          "En el verano de 2003, un equipo mixto de arquitectos y conservadores de la Academia Tibetana de Ciencias Sociales realizaba trabajos de apuntalamiento estructural en la gran sala de asambleas (Lakhang Chenmo). Al inspeccionar una pared meridional de sesenta metros de longitud y diez metros de altura que mostraba grietas superficiales, los técnicos detectaron una cavidad hueca de gran profundidad tras la mampostería exterior.",
          "Al retirar cuidadosamente los primeros sillares de adobe y madera de cedro, un olor penetrante a incienso seco, cuero curtido y papel de morera sellado durante siglos inundó la estancia. Ante los ojos asombrados de los investigadores se desplegó una estantería monumental de madera de teca empotrada de sesenta metros de ancho, colmada hasta el techo con decenas de miles de volúmenes rectangulares envueltos en sedas brocadas y asegurados con tablillas de madera tallada."
        ],
        callout: "El conteo inicial arrojó la asombrosa cifra de más de 84.000 manuscritos individuales, convirtiendo a Sakya en la mayor biblioteca monástica medieval intacta conservada en todo el continente asiático."
      },
      {
        id: "sec-sakya-3",
        heading: "3. La anatomía de los textos y su estado de preservación",
        paragraphs: [
          "El clima excepcionalmente seco y frío del altiplano tibetano, sumado a la penumbra absoluta y a la ausencia de insectos xilófagos en la cámara sellada, actuó como un amortiguador biológico perfecto. Muchas de las hojas de papel de corteza conservaban la flexibilidad original, y los pigmentos vegetales y minerales lucían tan brillantes como el día en que fueron caligrafiados.",
          "Entre los ejemplares más extraordinarios destaca el 'Burde Gya', un colosal volumen de escrituras budistas de dos metros de largo por un metro de ancho y cincuenta centímetros de grosor, que pesa más de quinientos kilogramos y requería el esfuerzo de ocho monjes para ser trasladado en procesiones solemnes."
        ]
      },
      {
        id: "sec-sakya-4",
        heading: "4. Un universo de conocimiento más allá de la religión",
        paragraphs: [
          "Contrario a la suposición inicial de que la biblioteca contenía únicamente sutras litúrgicos, el proceso de catalogación reveló una variedad enciclopédica deslumbrante. Los códices abarcan tratados de medicina tradicional tibetana con ilustraciones botánicas y anatómicas detalladas, tablas astronómicas de eclipses solares y lunares calculados entre los años 1100 y 1600, partituras musicales, poemarios eróticos y extensos registros notariales de tierras y comercio de la Ruta de la Seda.",
          "Muchos textos están redactados en caracteres de oro, plata y tinta de cinabrio sobre papel teñido de añil oscuro, combinando escrituras tibetanas, sánscritas, mongolas y tangut, una lengua extinguida cuyos escasos testimonios escritos cobran nueva luz gracias a estos pergaminos."
        ],
        callout: "El proyecto de digitalización internacional puesto en marcha en 2011 ha escaneado hasta la fecha más del 30% de los volúmenes, permitiendo que universidades de todo el mundo consulten libremente manuscritos que permanecieron en la penumbra durante más de setecientos años."
      }
    ]
  },
  {
    id: "art-vapor-ss-waratah",
    slug: "desaparicion-vapor-ss-waratah-1909",
    title: "Doscientas once almas tragadas por la Costa Salvaje: El enigma del vapor SS Waratah",
    subtitle: "En julio de 1909, el orgullo de la flota colonial británica se desvaneció entre Durban y Ciudad del Cabo en medio de una tormenta huracanada sin dejar un solo cuerpo, chaleco o resto de madera.",
    category: "misterios",
    categoryLabel: "Misterios documentados",
    coverImage: "/images/real/wiki_desaparicion-vapor-ss-waratah-1909.jpg",
    imageCaption: "Vapor de pasajeros de la clase Blue Anchor Line en maniobra en puerto colonial, ca. 1908. National Maritime Museum, Greenwich.",
    date: "1909 / Almirantazgo Británico y Puerto de Durban",
    publishedAt: "2026-10-16",
    readingTime: "23 min",
    excerpt: "Conocido como 'El Titanic del hemisferio sur', el buque de 150 metros de eslora y 9.300 toneladas desapareció en su segundo viaje entre Australia e Inglaterra. A pesar de semanas de búsqueda por acorazados de la Royal Navy, el mar no devolvió ni un bote, ni un solo salvavidas ni una mancha de carbón.",
    socialHookTitle: "EL TITANIC DEL SUR QUE DESAPARECIÓ SIN DEJAR HUELLA",
    socialLocation: "COSTA SALVAJE · OCÉANO ÍNDICO, SUDÁFRICA",
    accessionNumber: "NAV-1909-WARA",
    featured: true,
    tags: [
      "Navegación",
      "Misterios Marítimos",
      "Sudáfrica",
      "Siglo XX",
      "Naufragios"
    ],
    quote: "Es el caso más asombroso en los anales de la navegación a vapor: un navío ultramoderno se desvanece de la faz de las aguas como si nunca hubiese existido.",
    quoteAuthor: "Lord Charles Beresford, Almirante de la Marina Real Británica (1911)",
    sources: [
      {
        title: "Board of Trade Wreck Report. (1911). Official Court of Inquiry into the Loss of the S.S. Waratah. His Majesty's Stationery Office, London.",
        url: "https://www.plimsoll.org"
      },
      {
        title: "Harris, Craig. (2009). The Lost Ship SS Waratah: The Sea Mystery of the Century. Maritime Historical Society.",
        url: "https://www.worldcat.org/title/lost-ship-ss-waratah"
      },
      {
        title: "South African National Archives (SANA) - Cape Town Port Authority Logs July-August 1909.",
        url: "https://www.national.archives.gov.za"
      }
    ],
    content: [
      {
        id: "sec-waratah-1",
        heading: "1. La joya de la Blue Anchor Line",
        paragraphs: [
          "Botado en 1908 en los astilleros Barclay Curle de Glasgow, el SS Waratah era el buque insignia de la compañía Blue Anchor Line. Diseñado específicamente para cubrir la ruta de emigración y comercio entre Londres y Australia bordeando el cabo de Buena Esperanza, el vapor de doble hélice y 150 metros de eslora contaba con los más modernos camarotes de lujo para cien pasajeros de primera clase y espacio para más de seiscientos viajeros en clase turista.",
          "Estaba equipado con ocho mamparos estancos que sus constructores calificaban de 'prácticamente insumergibles', almacenes frigoríficos para carne australiana y una tripulación experimentada de 119 hombres bajo el mando del capitán Josiah Edward Ilbery, un veterano de treinta años de navegación sin un solo percance en su historial."
        ]
      },
      {
        id: "sec-waratah-2",
        heading: "2. El pasajero que bajó a tiempo por una pesadilla",
        paragraphs: [
          "El 26 de julio de 1909, el Waratah arribó a Durban procedente de Adelaida y Melbourne. Durante la escala, un pasajero de primera clase llamado Claude G. Sawyer, físico e ingeniero experimentado, tomó la apresurada decisión de cancelar su pasaje hacia Inglaterra y desembarcar en tierra sudafricana con todo su equipaje.",
          "Sawyer relató a las autoridades portuarias y a sus amigos que durante la travesía había observado un balanceo anormalmente lento y pesado en el buque cuando el mar arreciaba, sugiriendo un centro de gravedad excesivamente alto. Además, Sawyer afirmó haber sufrido tres pesadillas recurrentes en las que veía al Waratah envuelto en una niebla cenicienta, inclinándose lentamente sobre su costado de babor hasta ser devorado por una ola colosal."
        ],
        callout: "A pesar de las burlas de otros pasajeros que lo tildaron de supersticioso, Sawyer salvó la vida. Aquella misma tarde, el Waratah zarpó rumbo a Ciudad del Cabo con 211 almas a bordo (119 tripulantes y 92 pasajeros)."
      },
      {
        id: "sec-waratah-3",
        heading: "3. El último contacto visual: El Clan MacIntyre",
        paragraphs: [
          "En la mañana del 27 de julio de 1909, las aguas frente al río Bashee en la peligrosa Costa Salvaje sudafricana comenzaron a picarse. Hacia las 06:00 horas, el buque de carga Clan MacIntyre avistó al Waratah navegando a mayor velocidad en su misma dirección. Ambos navíos intercambiaron señales con lámparas Aldis de morse:",
          "— ¿Qué barco es? —preguntó el Clan MacIntyre.\n— Waratah, para Londres —respondió el operador.\n— Clan MacIntyre, para Londres. ¿Qué tiempo tuvieron? —inquirió el carguero.\n— Tiempo muy malo, viento y mar gruesa en popa —señaló el Waratah.\n— Buen viaje —concluyó el Clan MacIntyre.\n— Gracias, igualmente.",
          "A las 09:30 horas, el Waratah rebasó al Clan MacIntyre y se perdió en el horizonte hacia el sudoeste. Fue el último contacto humano jamás registrado con el barco."
        ]
      },
      {
        id: "sec-waratah-4",
        heading: "4. El temporal monstruoso y la búsqueda infructuosa",
        paragraphs: [
          "Horas después de aquel intercambio de señales, un temporal con vientos de fuerza 11 en la escala Beaufort y olas gigantescas azotó el litoral sudafricano. Cuando el Waratah no recaló en Ciudad del Cabo el 29 de julio en la fecha prevista, sonaron todas las alarmas en el Almirantazgo.",
          "Tres cruceros de guerra de la Royal Navy británica (el HMS Pandora, el HMS Forte y el HMS Hermes) peinaron durante semanas miles de millas náuticas a lo largo de la costa. Tres expediciones privadas contratadas por las familias de los desaparecidos rastrearon las corrientes antárticas y las islas del archipiélago de las Marion durante meses.",
          "El resultado fue desolador: ni un solo cuerpo humano, ni un bote salvavidas, ni un salvavidas de corcho, ni una caja de madera rotulada apareció en las playas sudafricanas ni en las redes de los pesqueros."
        ],
        callout: "La comisión de investigación británica de 1911 concluyó que el Waratah fue víctima de una 'ola solitaria o freak wave' combinada con una deficiencia estructural de estabilidad, volcando de campana en cuestión de segundos y atrapando a toda su tripulación y pasaje en su interior."
      }
    ]
  },
  {
    id: "art-rebelion-canuts-lyon",
    slug: "rebelion-canuts-tejedores-seda-lyon-1831",
    title: "«Vivir trabajando o morir combatiendo»: La insurrección de los tejedores de seda de Lyon",
    subtitle: "En noviembre de 1831, treinta mil obreros de la seda se sublevaron contra los fabricantes de la colina de la Croix-Rousse, derrotaron a la guarnición militar y gobernaron la segunda ciudad de Francia durante diez días históricos.",
    category: "acontecimientos",
    categoryLabel: "Acontecimientos",
    coverImage: "/images/real/wiki_rebelion-canuts-tejedores-seda-lyon-1831.jpg",
    imageCaption: "Talleres textiles históricos en las pendientes de la Croix-Rousse con grandes ventanales para la iluminación de los telares Jacquard.",
    date: "1831 / Archivos Municipales de Lyon",
    publishedAt: "2026-10-15",
    readingTime: "22 min",
    excerpt: "Los tejedores de Lyon no eran una masa anónima, sino artesanos altamente cualificados cuyos telares Jacquard vestían a la nobleza europea. Agotados por jornadas de dieciocho horas con tarifas de hambre, bajaron de las colinas portando una bandera negra y tomaron el control de la ciudad sin cometer saqueos ni ejecuciones.",
    socialHookTitle: "LA REBELIÓN OBRERA QUE DERROTÓ AL EJÉRCITO CON SEDA",
    socialLocation: "LA CROIX-ROUSSE · LYON, FRANCIA",
    accessionNumber: "SOC-1831-CANUT",
    featured: false,
    tags: [
      "Historia Social",
      "Francia",
      "Revolución Industrial",
      "Siglo XIX",
      "Economía"
    ],
    quote: "Los canuts han demostrado al mundo que los trabajadores de la industria moderna no son simples engranajes de hierro, sino una fuerza política con dignidad propia.",
    quoteAuthor: "Fernand Rude, historiador de las insurrecciones de Lyon",
    sources: [
      {
        title: "Archives Municipales de Lyon - Fonds des Canuts et des Événements de Novembre 1831 (Série I-3).",
        url: "https://www.archives-lyon.fr"
      },
      {
        title: "Rude, Fernand. (1969). C'est nous les canuts... L'insurrection de Lyon, 1831. Éditions Maspero, Paris.",
        url: "https://gallica.bnf.fr"
      },
      {
        title: "Le Globe & L'Écho de la Fabrique. (1831-1832). Journal industriel et littéraire des ouvriers en soie de Lyon.",
        url: "https://echo-fabrique.ens-lyon.fr"
      }
    ],
    content: [
      {
        id: "sec-canuts-1",
        heading: "1. La colina de los techos altos y los telares Jacquard",
        paragraphs: [
          "En la década de 1830, la colina de la Croix-Rousse en Lyon albergaba la mayor concentración de tejedores de seda de alta costura de Europa. Conocidos popularmente como los 'canuts', estos maestros artesanos trabajaban en apartamentos diseñados a medida: techos de casi cuatro metros de altura para dar cabida a los gigantescos telares Jacquard inventados a principios de siglo, y ventanales inmensos que aprovechaban hasta el último rayo de luz del sol.",
          "Sin embargo, el sistema de producción estaba profundamente desequilibrado. Los canuts eran propietarios de sus herramientas y telares, pero dependían de un puñado de grandes 'fabricantes' y comerciantes del centro de la ciudad que imponían precios a la baja. Tras la crisis comercial de 1830, las tarifas pagadas por metro de tafetán y damasco cayeron a niveles que apenas permitían a las familias obreras adquirir pan y carbón para sobrevivir."
        ]
      },
      {
        id: "sec-canuts-2",
        heading: "2. El pacto de honor roto y el estallido",
        paragraphs: [
          "En octubre de 1831, tras semanas de asambleas pacíficas, los representantes de los tejedores y una delegación de fabricantes presidida por el prefecto del departamento del Ródano, Louis Bouvier-Dumolart, firmaron un acuerdo histórico: una 'tarifa mínima de retribución' para garantizar una subsistencia digna.",
          "Pero el 10 de noviembre, los comerciantes más reaccionarios desconocieron el pacto, acusando al prefecto de vulnerar el libre mercado y suspendiendo los pagos pactados. La indignación cundió en la Croix-Rousse. En la mañana del 21 de noviembre, miles de tejedores desarmados comenzaron a descender por las pendientes hacia el centro urbano entonando himnos gremiales."
        ]
      },
      {
        id: "sec-canuts-3",
        heading: "3. La batalla de las barricadas y la bandera negra",
        paragraphs: [
          "En la plaza de la Croix-Rousse, la Guardia Nacional y el regimiento de infantería regular abrieron fuego contra los manifestantes, matando a varios artesanos. Aquel acto transformó la marcha en una insurrección armada fulminante. Los tejedores se atrincheraron en las estrechas callejuelas y 'traboules' (pasadizos peatonales techados que atraviesan los patios de los edificios de Lyon), arrojando adoquines, vigas y muebles contra los soldados.",
          "Desplegaron una bandera negra con un lema bordado en letras rojas que pasaría a la historia del movimiento obrero universal: «VIVRE EN TRAVAILLANT, OU MOURIR EN COMBATTANT» (Vivir trabajando o morir combatiendo). Al cabo de cuarenta y ocho horas de combate callejero, los militares se vieron obligados a evacuar la ciudad por las puertas del norte, dejando el Ayuntamiento en manos de los rebeldes."
        ],
        callout: "Durante los diez días que gobernaron Lyon, los canuts establecieron patrullas para proteger los comercios de sus propios opresores contra el pillaje, mantuvieron el orden público y no ejecutaron a ningún prisionero de guerra, demostrando una disciplina cívica que maravilló a los cronistas de la época."
      },
      {
        id: "sec-canuts-4",
        heading: "4. La reconquista real y el nacimiento de la conciencia obrera",
        paragraphs: [
          "Alarmado por la caída de la segunda urbe del reino, el rey Luis Felipe I envió un ejército de veinte mil soldados comandado por su propio hijo, el duque de Orleans, y el ministro de Guerra, el mariscal Soult. El 3 de diciembre las tropas entraron en Lyon sin disparar un solo tiro: los canuts, sin pretensiones de derrocar al régimen sino de hacer valer sus derechos salariales, negociaron la entrega de la ciudad a cambio del cese de represalias masivas.",
          "La rebelión de los canuts de 1831 fue el primer episodio donde la clase obrera industrial actuó de manera autónoma frente a los partidos políticos tradicionales, inspirando las primeras publicaciones sindicales autogestionadas como 'L'Écho de la Fabrique' y sentando las bases del cooperativismo europeo moderno."
        ]
      }
    ]
  },
  {
    id: "art-manuscrito-rohonc",
    slug: "codice-rohonc-manuscrito-criptografia-hungria",
    title: "Ochocientos símbolos desconocidos y ochenta y siete grabados sacros: El códice indescifrable de Rohonc",
    subtitle: "Preservado en la Academia Húngara de Ciencias desde 1838, un manuscrito de 448 páginas encuadernado en piel continúa resistiendo los análisis criptográficos y filológicos más avanzados del mundo.",
    category: "misterios",
    categoryLabel: "Misterios documentados",
    coverImage: "/images/real/wiki_codice-rohonc-manuscrito-criptografia-hungria.jpg",
    imageCaption: "Folio original con caligrafía críptica e iconografía sincrética del Códice Rohonc. Biblioteca de la Academia Húngara de Ciencias (MTA).",
    date: "1838 / Colección Batthyány, Budapest",
    publishedAt: "2026-10-14",
    readingTime: "24 min",
    excerpt: "Donado por el conde Gusztáv Batthyány en 1838 junto a su biblioteca privada, este libro de 448 páginas contiene casi 800 glifos únicos que no coinciden con ningún alfabeto conocido en la Tierra. Acompañado de 87 ilustraciones que mezclan cruces cristianas, medias lunas musulmanas y soles paganos, ha desconcertado tanto a eruditos del siglo XIX como a superordenadores modernos.",
    socialHookTitle: "EL CÓDICE QUE NINGÚN CRIPTÓGRAFO HA PODIDO LEER",
    socialLocation: "ROHONC / BUDAPEST · HUNGRÍA",
    accessionNumber: "CRT-1838-ROH",
    featured: false,
    tags: [
      "Criptografía",
      "Manuscritos",
      "Historia Medieval",
      "Hungría",
      "Lingüística"
    ],
    quote: "A diferencia del Manuscrito Voynich, el Códice de Rohonc presenta una estructura gramatical y una variedad iconográfica que sugieren una liturgia secreta perdida en los confines de Europa del Este.",
    quoteAuthor: "Dr. Benedek Láng, criptoanalista e historiador de la ciencia (2018)",
    sources: [
      {
        title: "Hungarian Academy of Sciences (MTA) - Rare Books and Manuscripts Collection, MS K 114 (Rohonci Kódex).",
        url: "https://konyvtar.mta.hu"
      },
      {
        title: "Láng, Benedek. (2018). The Rohonc Code: Tracing a Historical Mystery. Penn State University Press.",
        url: "https://www.psupress.org/books/titles/978-0-271-08104-5.html"
      },
      {
        title: "Kiraly, Levente Zoltán. (2011). 'Structural and Syntactic Characteristics of the Rohonc Script'. Cryptologia, 35(3): 215-242.",
        url: "https://www.tandfonline.com/doi/abs/10.1080/01611194.2011.583711"
      }
    ],
    content: [
      {
        id: "sec-rohonc-1",
        heading: "1. La donación del conde Batthyány",
        paragraphs: [
          "En 1838, el noble húngaro conde Gusztáv Batthyány formalizó la donación de toda su biblioteca particular a la recién fundada Academia de Ciencias de Hungría en Pest. Entre los más de treinta mil volúmenes que componían la colección figuraba un pequeño tomo de 12 por 10 centímetros, encuadernado en piel marrón desgastada, registrado escuetamente en el inventario como un 'Libro de oraciones en lengua desconocida'.",
          "El manuscrito procedía de la biblioteca del castillo de la familia Batthyány en la localidad de Rohonc (actual Rechnitz, en la frontera entre Austria y Hungría). Desde el momento en que los filólogos de la academia abrieron sus páginas, comprendieron que se hallaban ante una de las anomalías paleográficas más desconcertantes de Europa."
        ]
      },
      {
        id: "sec-rohonc-2",
        heading: "2. La filigrana veneciana y el enigma material",
        paragraphs: [
          "Uno de los primeros debates giró en torno a la posible falsificación del texto. Sin embargo, los exámenes químicos y físicos del papel revelaron una filigrana auténtica: una figura de un ancla dentro de un círculo coronada por una flor de lis de seis puntas, producida por los molinos papeleros de la República de Venecia entre 1529 y 1540.",
          "El códice no es un fragmento: contiene 448 páginas completas escritas con tinta ferrogálica marrón y negra. Las líneas de texto fluyen de derecha a izquierda (o en espiral según algunas páginas) con una cadencia caligráfica extraordinariamente regular, lo que demuestra que el escriba dominaba el sistema gráfico con absoluta soltura y rapidez."
        ],
        callout: "El sistema de escritura del Códice Rohonc cuenta con cerca de 800 caracteres individuales distintos, una cifra casi diez veces mayor que la de cualquier alfabeto alfabético tradicional y muy similar a la complejidad de los sistemas silábicos o logosilábicos como el cuneiforme o el maya."
      },
      {
        id: "sec-rohonc-3",
        heading: "3. Ochenta y siete ilustraciones sincréticas",
        paragraphs: [
          "Lo que hace verdaderamente único al Códice Rohonc frente a otros manuscritos cifrados es su rica iconografía. A lo largo de sus 448 páginas se intercalan 87 ilustraciones a pluma que representan escenas religiosas y militares con una desconcertante mezcla de símbolos.",
          "En varias láminas coexisten en el mismo plano la cruz latina cristiana, la media luna islámica, estrellas de ocho puntas y representaciones del sol radiante pagano. Las figuras visten túnicas con turbantes orientales, armaduras de caballeros medievales y coronas de tipo bizantino, participando en banquetes sagrados, bautismos, crucifixiones y batallas campales frente a ciudades amuralladas."
        ]
      },
      {
        id: "sec-rohonc-4",
        heading: "4. Siglo y medio de intentos fallidos de descifrado",
        paragraphs: [
          "A lo largo de los siglos XIX y XX, decenas de lingüistas, expertos en runas magiares, paleógrafos eslavos y criptoanalistas de los servicios de inteligencia de la Segunda Guerra Mundial intentaron descifrar el texto sin éxito. Se formularon hipótesis que lo vinculaban con el dacio antiguo, el búlgaro medieval, el idioma de los jázaros o una versión críptica del griego clásico.",
          "En la última década, análisis computacionales de entropía y frecuencia léxica realizados por los investigadores Levente Zoltán Király y Benedek Láng han demostrado que el texto no es una secuencia aleatoria de garabatos sin sentido: posee las firmas matemáticas y la distribución de Zipf de un lenguaje natural altamente estructurado, probablemente un sistema de código litúrgico utilizado por una secta o comunidad sincrética en los Balcanes o Transilvania durante el convulso siglo XVI."
        ]
      }
    ]
  }
];

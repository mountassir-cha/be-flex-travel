export interface BlogSection {
  type: 'paragraph' | 'heading' | 'list';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  date: string;
  readTime: Record<string, string>;
  image: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  title: Record<string, string>;
  excerpt: Record<string, string>;
  sections: Record<string, BlogSection[]>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'medina-secrets',
    date: '2026-06-15',
    readTime: {
      en: '4 min read',
      fr: '4 min de lecture',
      es: '4 min de lectura',
      it: '4 min di lettura',
      de: '4 Min. Lesezeit',
    },
    image: '/images/blog/medina-secrets.png',
    category: 'guides',
    author: {
      name: 'Mountassir Chaghough',
      role: 'Marrakech Guide',
      avatar: '/logo.jpg',
    },
    title: {
      en: 'Marrakech Insiders: 5 Secret Spots in the Medina',
      fr: 'Marrakech Insiders : 5 spots secrets dans la Médina',
      es: 'Marrakech Insiders: 5 lugares secretos en la Medina',
      it: 'Marrakech Insiders: 5 luoghi segreti nella Medina',
      de: 'Marrakech Insiders: 5 geheime Orte in der Medina',
    },
    excerpt: {
      en: 'Escape the crowds and discover the hidden courtyards, quiet riad cafes, and artisan workshops that tourists usually miss.',
      fr: 'Échappez à la foule et découvrez les cours cachées, les cafés de riad calmes et les ateliers d\'artisans que les touristes manquent habituellement.',
      es: 'Escapa de las multitudes y descubre los patios ocultos, los cafés tranquilos de riads y los talleres artesanales que los turistas suelen perderse.',
      it: 'Sfuggi alla folla e scopri i cortili nascosti, i caffè tranquilli nei riad e le botteghe artigiane che i turisti di solito si perdono.',
      de: 'Entfliehen Sie den Massen und entdecken Sie die versteckten Innenhöfe, ruhigen Riad-Cafés und Handwerkswerkstätten, die Touristen meist übersehen.',
    },
    sections: {
      en: [
        { type: 'heading', text: '1. Le Jardin Secret - A Palace Oasis' },
        { type: 'paragraph', text: 'Tucked away behind high mud-brick walls in the Mouassine district, Le Jardin Secret is a restored 19th-century palace complex. While Jemaa el-Fna is full of energy, this garden offers total peace. It features a traditional Islamic garden divided into four parts, fed by an ancient water channel system, and a lush exotic garden filled with plants from all over the world.' },
        { type: 'heading', text: '2. Cafe des Epices - The Spice Square Retreat' },
        { type: 'paragraph', text: 'Located in Rahba Kedima (the spice square), Cafe des Epices is the perfect spot to take a break from bargaining. Walk past the colorful baskets of spices and head up to the rooftop terrace. Order a spiced Moroccan coffee or a fresh mint tea, and watch the busy daily life of the market from above.' },
        { type: 'heading', text: '3. The Artisan Quarter of Bab Debbagh' },
        { type: 'paragraph', text: 'For an authentic look at Marrakech\'s traditional crafts, walk towards the Bab Debbagh tanneries. Unlike the main tourist shops, here you will see artisans working with leather using centuries-old techniques. It is intense, raw, and offers a deep connection to Marrakech\'s history.' },
        { type: 'heading', text: '4. Dar Cherifa - The Literary Cafe' },
        { type: 'paragraph', text: 'Dar Cherifa is one of the oldest riads in the medina, dating back to the Saadian era. Today, it operates as a cultural café and art gallery. The carved plasterwork and cedarwood arches are masterpieces. It is a quiet sanctuary to read a book, enjoy local pastries, and appreciate Moroccan calligraphy.' },
        { type: 'heading', text: '5. The Quiet Streets of the Mellah' },
        { type: 'paragraph', text: 'The old Jewish quarter (Mellah) has a distinct architectural style with balconies facing the streets, unlike traditional Islamic houses where windows face inward. Walk through its quiet alleyways to discover the Jewish Cemetery and the Lazama Synagogue, experiencing a beautiful chapter of Morocco\'s multicultural heritage.' }
      ],
      fr: [
        { type: 'heading', text: '1. Le Jardin Secret - Une oasis de palais' },
        { type: 'paragraph', text: 'Niché derrière de hauts murs de briques de terre dans le quartier de Mouassine, Le Jardin Secret est un complexe de palais du XIXe siècle restauré. Alors que Jemaa el-Fna regorge d\'énergie, ce jardin offre une paix totale. Il présente un jardin islamique traditionnel divisé en quatre parties, alimenté par un ancien système de canaux d\'eau, et un jardin exotique luxuriant rempli de plantes du monde entier.' },
        { type: 'heading', text: '2. Café des Épices - Le refuge de la place des Épices' },
        { type: 'paragraph', text: 'Situé sur la place Rahba Kedima (la place des épices), le Café des Épices est l\'endroit idéal pour faire une pause dans les négociations. Passez devant les paniers colorés d\'épices et montez sur la terrasse sur le toit. Commandez un café marocain épicé ou un thé à la menthe frais, et observez la vie quotidienne animée du marché depuis les hauteurs.' },
        { type: 'heading', text: '3. Le quartier des artisans de Bab Debbagh' },
        { type: 'paragraph', text: 'Pour un aperçu authentique de l\'artisanat traditionnel de Marrakech, marchez vers les tanneries de Bab Debbagh. Contrairement aux principaux magasins touristiques, vous y verrez des artisans travailler le cuir selon des techniques séculaires. C\'est intense, brut et offre un lien profond avec l\'histoire de Marrakech.' },
        { type: 'heading', text: '4. Dar Cherifa - Le café littéraire' },
        { type: 'paragraph', text: 'Dar Cherifa est l\'un des plus anciens riads de la médina, datant de l\'époque saadienne. Aujourd\'hui, il fonctionne comme un café culturel et une galerie d\'art. Les plâtres sculptés et les arches en bois de cèdre sont des chefs-d\'œuvre. C\'est un sanctuaire calme pour lire un livre, déguster des pâtisseries locales et apprécier la calligraphie marocaine.' },
        { type: 'heading', text: '5. Les rues calmes du Mellah' },
        { type: 'paragraph', text: 'L\'ancien quartier juif (Mellah) possède un style architectural distinct avec des balcons donnant sur les rues, contrairement aux maisons islamiques traditionnelles où les fenêtres font face à l\'intérieur. Promenez-vous dans ses ruelles calmes pour découvrir le cimetière juif et la synagogue Lazama, et vivre un beau chapitre du patrimoine multiculturel du Maroc.' }
      ],
      es: [
        { type: 'heading', text: '1. Le Jardin Secret - Un oasis palaciego' },
        { type: 'paragraph', text: 'Escondido detrás de altos muros de adobe en el distrito de Mouassine, Le Jardin Secret es un palacio restaurado del siglo XIX. Mientras Jemaa el-Fna está llena de energía, este jardín ofrece paz absoluta. Cuenta con un jardín islámico tradicional dividido en cuatro partes, alimentado por un antiguo sistema de acequias, y un exuberante jardín exótico con plantas de todo el mundo.' },
        { type: 'heading', text: '2. Cafe des Epices - El refugio de la Plaza de las Especias' },
        { type: 'paragraph', text: 'Ubicado en Rahba Kedima (la plaza de las especias), Cafe des Epices es el lugar perfecto para descansar del regateo. Camina entre las coloridas cestas de especias y sube a la terraza superior. Pide un café marroquí especiado o un té de menta fresco y contempla el bullicio diario del mercado desde arriba.' },
        { type: 'heading', text: '3. El barrio de artesanos de Bab Debbagh' },
        { type: 'paragraph', text: 'Para ver de cerca la artesanía tradicional de Marrakech, dirígete hacia las curtidurías de Bab Debbagh. A diferencia de las tiendas turísticas habituales, aquí verás a los artesanos trabajar el cuero con técnicas centenarias. Es una experiencia intensa, real y te conecta con la historia de Marrakech.' },
        { type: 'heading', text: '4. Dar Cherifa - El café literario' },
        { type: 'paragraph', text: 'Dar Cherifa es uno de los riads más antiguos de la medina, de la época saadí. Hoy funciona como café cultural y galería de arte. Sus yeserías talladas y arcos de madera de cedro son obras de arte. Es un refugio tranquilo para leer, tomar pasteles locales y admirar la caligrafía marroquí.' },
        { type: 'heading', text: '5. Las calles tranquilas de la Mellah' },
        { type: 'paragraph', text: 'El antiguo barrio judío (Mellah) tiene un estilo arquitectónico único con balcones hacia la calle, al revés que las casas islámicas tradicionales que miran hacia dentro. Pasea por sus tranquilas calles para descubrir el cementerio judío y la sinagoga de Lazama, conociendo el legado multicultural de Marruecos.' }
      ],
      it: [
        { type: 'heading', text: '1. Le Jardin Secret - Un\'oasi nel palazzo' },
        { type: 'paragraph', text: 'Nascosto dietro alti muri di mattoni di fango nel quartiere di Mouassine, Le Jardin Secret è un palazzo restaurato del XIX secolo. Mentre Jemaa el-Fna è piena di energia, questo giardino offre una pace totale. Presenta un giardino islamico diviso in quattro parti, alimentato da un antico canale, e un giardino esotico ricco di piante da tutto il mondo.' },
        { type: 'heading', text: '2. Cafe des Epices - Il rifugio nella Piazza delle Spezie' },
        { type: 'paragraph', text: 'Situato in Rahba Kedima (la piazza delle spezie), il Cafe des Epices è il posto perfetto per fare una pausa. Passa accanto ai cesti colorati di spezie e sali sulla terrazza sul tetto. Ordina un caffè speziato marocchino o un tè alla menta e osserva la vita quotidiana del mercato dall\'alto.' },
        { type: 'heading', text: '3. Il quartiere degli artigiani di Bab Debbagh' },
        { type: 'paragraph', text: 'Per uno sguardo autentico sull\'artigianato di Marrakech, cammina verso le concerie di Bab Debbagh. A differenza dei negozi turistici, qui vedrai gli artigiani lavorare la pelle con tecniche secolari. È un\'esperienza intensa, autentica e legata alla storia della città.' },
        { type: 'heading', text: '4. Dar Cherifa - Il caffè letterario' },
        { type: 'paragraph', text: 'Dar Cherifa è uno dei riad più antichi della medina, risalente all\'epoca saadiana. Oggi è un caffè culturale e galleria d\'arte. I lavori in gesso intagliato e gli archi in legno di cedro sono capolavori. È un santuario tranquillo per leggere, gustare dolci locali e apprezzare la caligrafia marocchina.' },
        { type: 'heading', text: '5. Le strade tranquille della Mellah' },
        { type: 'paragraph', text: 'L\'antico quartiere ebraico (Mellah) ha uno stile architettonico unico con balconi che danno sulle strade, a differenza delle case islamiche tradizionali in cui le finestre guardano all\'interno. Cammina tra i suoi vicoli per scoprire il Cimitero Ebraico e la Sinagoga Lazama, scoprendo la ricca storia multiculturale del Marocco.' }
      ],
      de: [
        { type: 'heading', text: '1. Le Jardin Secret - Eine Palastoase' },
        { type: 'paragraph', text: 'Hinter hohen Lehmziegelmauern im Stadtteil Mouassine versteckt, ist Le Jardin Secret ein restaurierter Palastkomplex aus dem 19. Jahrhundert. Während Jemaa el-Fna voller Energie ist, bietet dieser Garten absolute Ruhe. Er besteht aus einem traditionellen islamischen Garten, der in vier Teile unterteilt ist und von einem alten Wasserkanalsystem gespeist wird, sowie einem üppigen exotischen Garten mit Pflanzen aus aller Welt.' },
        { type: 'heading', text: '2. Cafe des Epices - Rückzugsort am Gewürzplatz' },
        { type: 'paragraph', text: 'Das Cafe des Epices liegt an der Rahba Kedima (dem Gewürzplatz) und ist der perfekte Ort für eine Pause vom Feilschen. Gehen Sie an den bunten Gewürzkörben vorbei und steigen Sie auf die Dachterrasse. Bestellen Sie einen marokkanischen Gewürzkaffee oder einen frischen Minztee und beobachten Sie das bunte Treiben des Marktes von oben.' },
        { type: 'heading', text: '3. Das Handwerkerviertel von Bab Debbagh' },
        { type: 'paragraph', text: 'Um das traditionelle Handwerk von Marrakesch hautnah zu erleben, gehen Sie zu den Gerbereien von Bab Debbagh. Im Gegensatz zu den touristischen Geschäften sehen Sie hier Handwerker, die Leder nach jahrhundertealten Techniken verarbeiten. Es ist intensiv, rau und bietet eine tiefe Verbindung zur Geschichte der Stadt.' },
        { type: 'heading', text: '4. Dar Cherifa - Das Literaturcafé' },
        { type: 'paragraph', text: 'Dar Cherifa ist eines der ältesten Riads in der Medina und stammt aus der Saadier-Zeit. Heute wird es als Kulturcafé und Kunstgalerie genutzt. Die geschnitzten Stuckarbeiten und Bögen aus Zedernholz sind Meisterwerke. Es ist ein ruhiger Zufluchtsort, um ein Buch zu lesen, marokkanisches Gebäck zu genießen und Kalligraphie zu bewundern.' },
        { type: 'heading', text: '5. Die ruhigen Gassen der Mellah' },
        { type: 'paragraph', text: 'Das alte jüdische Viertel (Mellah) hat einen besonderen Baustil mit Balkonen zur Straße hin, im Gegensatz zu traditionellen islamischen Häusern, bei denen die Fenster nach innen zeigen. Spazieren Sie durch die ruhigen Gassen, um den jüdischen Friedhof und die Lazama-Synagoge zu entdecken und ein schönes Kapitel des multikulturellen Erbes Marokkos kennenzulernen.' }
      ],
    },
  },
  {
    slug: 'sahara-packing',
    date: '2026-06-20',
    readTime: {
      en: '5 min read',
      fr: '5 min de lecture',
      es: '5 min de lectura',
      it: '5 min di lettura',
      de: '5 Min. Lesezeit',
    },
    image: '/images/blog/sahara-packing.png',
    category: 'sahara',
    author: {
      name: 'Mountassir Chaghough',
      role: 'Desert Tour Leader',
      avatar: '/logo.jpg',
    },
    title: {
      en: 'Sahara Desert Packing List: What to Bring to Erg Chebbi',
      fr: 'Liste de bagages pour le désert du Sahara : Que prendre à Erg Chebbi',
      es: 'Lista de equipaje para el desierto del Sahara: Qué llevar a Erg Chebbi',
      it: 'Lista di valigie per il deserto del Sahara: cosa portare a Erg Chebbi',
      de: 'Packliste für die Sahara: Was man nach Erg Chebbi mitbringen sollte',
    },
    excerpt: {
      en: 'A comprehensive packing guide written by local desert guides to keep you comfortable, warm, and sun-protected in the dunes.',
      fr: 'Un guide de bagages complet rédigé par des guides locaux du désert pour vous assurer confort, chaleur et protection solaire dans les dunes.',
      es: 'Una guía completa de equipaje escrita por guías locales para que estés cómodo, abrigado y protegido del sol en las dunas.',
      it: 'Una guida completa alle valigie scritta da guide locali del deserto per mantenerti comodo, caldo e protetto dal sole tra le dune.',
      de: 'Ein umfassender Packratgeber, verfasst von lokalen Wüstenführern, damit Sie sich in den Dünen wohlfühlen, warm bleiben und vor der Sonne geschützt sind.',
    },
    sections: {
      en: [
        { type: 'heading', text: 'Preparing for the Desert Dunes' },
        { type: 'paragraph', text: 'Taking a trip into the Sahara Desert (like our popular 3-Day Sahara Tour) is a highlights of any Moroccan vacation. However, the desert environment has very unique weather. The sun is extremely hot during the day, but the temperature drops quickly at night. To make sure you enjoy stargazing and camel riding, here is the ultimate packing list.' },
        { type: 'heading', text: '1. Clothing Layers are Essential' },
        { type: 'paragraph', text: 'You need to dress for both heat and cold. Long, loose cotton clothing is best for the day to keep you cool and protect you from the sun. For the night, pack warm fleece jackets, thermal underwear, and a beanie, especially if you visit between October and April.' },
        { type: 'heading', text: '2. Footwear for Sand and Camels' },
        { type: 'paragraph', text: 'We recommend bringing two types of shoes:' },
        { type: 'list', items: [
          'Closed-toe walking shoes or sneakers for walking around the camp and climbing dunes.',
          'Strap-on sandals for easy wear around the tent.',
          'Avoid flip-flops as they easily get lost in the deep desert sand!'
        ]},
        { type: 'heading', text: '3. Sun and Sand Protection' },
        { type: 'paragraph', text: 'The desert sun is powerful and wind can blow fine sand. Do not forget:' },
        { type: 'list', items: [
          'A lightweight cotton scarf (shesh) to wrap around your head and face (your guide will teach you how to tie it!).',
          'Sunglasses with good UV protection.',
          'High SPF sunscreen and moisturizing lip balm.'
        ]},
        { type: 'heading', text: '4. Electronics and Power' },
        { type: 'paragraph', text: 'While luxury desert camps have charging plugs inside the tents, it is always smart to bring a power bank. Keep your phone and camera in a sealed bag (like a ziploc) when not in use, as the fine desert dust can easily damage sensitive electronic lenses.' }
      ],
      fr: [
        { type: 'heading', text: 'Se préparer pour les dunes du désert' },
        { type: 'paragraph', text: 'Un voyage dans le désert du Sahara (comme notre célèbre circuit de 3 jours) est le point fort de toutes vacances au Maroc. Cependant, l\'environnement du désert présente des conditions météo uniques. Le soleil est très chaud la journée, mais la température chute rapidement la nuit. Pour profiter pleinement des étoiles et de la balade à chameau, voici notre liste essentielle.' },
        { type: 'heading', text: '1. Les couches de vêtements sont essentielles' },
        { type: 'paragraph', text: 'Vous devez vous habiller pour le chaud et le froid. Les vêtements amples en coton et à manches longues sont parfaits en journée. Pour la nuit, prévoyez une veste chaude en polaire, des sous-vêtements thermiques et un bonnet, surtout d\'octobre à avril.' },
        { type: 'heading', text: '2. Chaussures pour le sable et les chameaux' },
        { type: 'paragraph', text: 'Nous vous conseillons d\'apporter deux types de chaussures :' },
        { type: 'list', items: [
          'Des chaussures de marche fermées ou des baskets pour monter sur les dunes.',
          'Des sandales à lanières pour rester au camp.',
          'Évitez les tongs qui se perdent facilement dans le sable profond !'
        ]},
        { type: 'heading', text: '3. Protection contre le soleil et le sable' },
        { type: 'paragraph', text: 'Le soleil brille fort et le vent peut lever du sable fin. N\'oubliez pas :' },
        { type: 'list', items: [
          'Un chèche (écharpe en coton) pour protéger votre visage (votre guide vous montrera comment le nouer).',
          'Des lunettes de soleil avec protection UV.',
          'De la crème solaire haute protection et un baume à lèvres hydratant.'
        ]},
        { type: 'heading', text: '4. Électronique et énergie' },
        { type: 'paragraph', text: 'Même si les camps de luxe disposent de prises de recharge, apportez une batterie externe. Rangez votre téléphone et appareil photo dans un sac hermétique (type ziploc) pour éviter que la poussière de sable ne raye les objectifs.' }
      ],
      es: [
        { type: 'heading', text: 'Preparándose para las dunas del desierto' },
        { type: 'paragraph', text: 'Un viaje al desierto del Sahara (como nuestro tour de 3 días) es lo mejor de tu viaje a Marruecos. Pero el desierto tiene un clima especial. Hace mucho calor de día y frío de noche. Para disfrutar de las estrellas y los camellos, esta es tu lista de equipaje.' },
        { type: 'heading', text: '1. Vestirse en capas es la clave' },
        { type: 'paragraph', text: 'Ropa larga de algodón y ligera para el día. Para la noche, una buena chaqueta, ropa térmica y un gorro, especialmente de octubre a abril.' },
        { type: 'heading', text: '2. Calzado adecuado' },
        { type: 'paragraph', text: 'Leva dos opciones:' },
        { type: 'list', items: [
          'Zapatillas cerradas para caminar por las dunas.',
          'Sandalias con tiras para estar cómodo en el campamento.',
          '¡Evita las chanclas sueltas porque se hunden en la arena!'
        ]},
        { type: 'heading', text: '3. Contra el sol y la arena' },
        { type: 'list', items: [
          'Un pañuelo de algodón (chèche) para la cabeza y cara.',
          'Gafas de sol con buena protección UV.',
          'Protector solar alto y bálsamo labial.'
        ]},
        { type: 'heading', text: '4. Electrónica' },
        { type: 'paragraph', text: 'Trae una batería portátil. Guarda tus dispositivos en bolsas herméticas para protegerlos del polvo fino del desierto.' }
      ],
      it: [
        { type: 'heading', text: 'Prepararsi per le dune del deserto' },
        { type: 'paragraph', text: 'Un viaggio nel deserto del Sahara (come il nostro tour di 3 giorni) è il momento più bello del viaggio in Marocco. Ma il deserto ha un clima unico. Molto caldo di giorno e freddo di notte. Per goderti le stelle e i cammelli, ecco la lista di cosa portare.' },
        { type: 'heading', text: '1. Vestirsi a strati è fondamentale' },
        { type: 'paragraph', text: 'Ritiene comodo indossare abiti lunghi e freschi di cotone di giorno. Per la notte porta giacche calde, abbigliamento termico e un berretto, specialmente da ottobre ad aprile.' },
        { type: 'heading', text: '2. Scarpe per sabbia e cammelli' },
        { type: 'list', items: [
          'Scarpe chiuse o sneakers per scalare le dune.',
          'Sandali per stare comodi al campo.',
          'Evita le infradito perché si perdono facilmente nella sabbia!'
        ]},
        { type: 'heading', text: '3. Protezione solare e vento' },
        { type: 'list', items: [
          'Una sciarpa di cotone (chèche) per coprire testa e viso.',
          'Occhiali da sole protettivi.',
          'Crema solare ad alta protezione e burrocacao.'
        ]},
        { type: 'heading', text: '4. Dispositivi elettronici' },
        { type: 'paragraph', text: 'Porta un power bank. Proteggi telefono e fotocamera in sacchetti sigillati per evitare che la sabbia danneggi le lenti.' }
      ],
      de: [
        { type: 'heading', text: 'Vorbereitung auf die Wüstendünen' },
        { type: 'paragraph', text: 'Eine Reise in die Sahara (wie unsere 3-tägige Wüstentour) ist das Highlight jeder Marokko-Reise. Allerdings ist das Wüstenklima speziell: tagsüber heiß, nachts sehr kalt. Hier ist die ultimative Packliste, damit Sie Ihren Aufenthalt genießen können.' },
        { type: 'heading', text: '1. Kleidung im Zwiebellook ist wichtig' },
        { type: 'paragraph', text: 'Tragen Sie tagsüber lange, luftige Baumwollkleidung. Für die Nacht packen Sie eine warme Fleecejacke, Thermo-Unterwäsche und eine Mütze ein, besonders zwischen Oktober und April.' },
        { type: 'heading', text: '2. Schuhe für Sand und Kamele' },
        { type: 'list', items: [
          'Geschlossene Wanderschuhe oder Sneaker zum Besteigen der Dünen.',
          'Riemchen-Sandalen für die Zeit im Camp.',
          'Vermeiden Sie Flip-Flops, da diese im tiefen Sand verloren gehen!'
        ]},
        { type: 'heading', text: '3. Sonnen- und Sandschutz' },
        { type: 'list', items: [
          'Ein Baumwolltuch (Schal) zum Schutz vor Wind und Sonne.',
          'Eine Sonnenbrille mit gutem UV-Schutz.',
          'Sonnencreme mit hohem Lichtschutzfaktor und Lippenbalsam.'
        ]},
        { type: 'heading', text: '4. Elektronik' },
        { type: 'paragraph', text: 'Nehmen Sie eine Powerbank mit. Bewahren Sie Handys und Kameras in Plastikbeuteln auf, damit kein feiner Wüstenstaub in die Linsen gelangt.' }
      ],
    },
  },
  {
    slug: 'hammam-guide',
    date: '2026-06-25',
    readTime: {
      en: '3 min read',
      fr: '3 min de lecture',
      es: '3 min de lectura',
      it: '3 min di lettura',
      de: '3 Min. Lesezeit',
    },
    image: '/images/blog/hammam-guide.png',
    category: 'wellness',
    author: {
      name: 'Mountassir Chaghough',
      role: 'Local Culture Specialist',
      avatar: '/logo.jpg',
    },
    title: {
      en: 'Traditional Moroccan Hammam: Etiquette & What to Expect',
      fr: 'Hammam traditionnel marocain : étiquette & à quoi s\'attendre',
      es: 'Hammam tradicional marroquí: etiqueta y qué esperar',
      it: 'Hammam tradizionale marocchino: etichetta e cosa aspettarsi',
      de: 'Traditionelles marokkanisches Hammam: Knigge & Was Sie erwartet',
    },
    excerpt: {
      en: 'Demystifying the historic Moroccan steam bath ritual. Learn about black soap, the kessa scrubbing glove, and spa etiquette.',
      fr: 'Démystifier le rituel historique du bain de vapeur marocain. Découvrez le savon noir, le gant de gommage kessa et l\'étiquette du spa.',
      es: 'Descubre el ritual histórico del baño de vapor marroquí. Aprende sobre el jabón negro, el guante de exfoliación kessa y las normas del spa.',
      it: 'Scopri lo storico rituale del bagno di vapore marocchino. Informazioni su sapone nero, guanto kessa e regole della spa.',
      de: 'Entmystifizierung des historischen marokkanischen Dampfbad-Rituals. Erfahren Sie mehr über schwarze Seife, den Kessa-Peelinghandschuh und die Spa-Etikette.',
    },
    sections: {
      en: [
        { type: 'heading', text: 'The Art of Relaxation and Cleansing' },
        { type: 'paragraph', text: 'The hammam is an important part of Moroccan social life and wellness. It is a steam room cleansing ritual that has been practiced for hundreds of years. Visiting a hammam is a great way to relax after walking through the souks. Here is everything you need to know about your first hammam visit.' },
        { type: 'heading', text: 'Step 1: Acclimatizing in the Steam Room' },
        { type: 'paragraph', text: 'You start by relaxing in a hot, steamy room. The heat opens your pores and prepares your skin for cleansing. You will lie down on warm marble or tiles, letting your muscles relax completely.' },
        { type: 'heading', text: 'Step 2: The Black Soap (Savon Noir) Application' },
        { type: 'paragraph', text: 'Next, an attendant or you will apply "savon noir", a dark, paste-like soap made from olive oil and crushed olives. It sits on your skin for 5 to 10 minutes to soften dead skin cells.' },
        { type: 'heading', text: 'Step 3: Vigorous Exfoliation with the Kessa Glove' },
        { type: 'paragraph', text: 'This is the core of the hammam. Using a sand-paper-like glove called a "kessa", the attendant will firmly scrub your body. You will see rolls of dead skin come off. It sounds intense, but it leaves your skin feeling incredibly soft and clean.' },
        { type: 'heading', text: 'Hammam Etiquette Tips' },
        { type: 'list', items: [
          'Underwear is required: Keep your swim briefs or bikini bottoms on.',
          'Drink plenty of water before and after to stay hydrated in the heat.',
          'Traditional public hammams are separated by gender, while private riad spas offer private couple rooms.'
        ]}
      ],
      fr: [
        { type: 'heading', text: 'L\'art de la relaxation et de la purification' },
        { type: 'paragraph', text: 'Le hammam fait partie intégrante de la vie sociale et du bien-être au Maroc. C\'est un rituel de purification par la vapeur pratiqué depuis des siècles. C\'est le moyen idéal de se détendre après une journée dans les souks. Voici ce qu\'il faut savoir avant votre visite.' },
        { type: 'heading', text: 'Étape 1 : S\'adapter à la chaleur' },
        { type: 'paragraph', text: 'Vous commencez par vous détendre dans une pièce chaude et humide. La chaleur ouvre vos pores. Vous vous allongez sur le marbre chaud, permettant à vos muscles de se relâcher.' },
        { type: 'heading', text: 'Étape 2 : L\'application du savon noir' },
        { type: 'paragraph', text: 'Ensuite, on applique le savon noir, une pâte à base d\'huile d\'olive. Elle reste sur votre peau 5 à 10 minutes pour assouplir les cellules mortes.' },
        { type: 'heading', text: 'Étape 3 : Le gommage au gant Kessa' },
        { type: 'paragraph', text: 'C\'est le cœur du hammam. À l\'aide d\'un gant de gommage appelé "kessa", le gommage élimine les peaux mortes. Votre peau ressort incroyablement douce et propre.' },
        { type: 'heading', text: 'Quelques règles de politesse' },
        { type: 'list', items: [
          'Le maillot de bain est obligatoire (le bas suffit généralement).',
          'Hydratez-vous bien en buvant de l\'eau avant et après.',
          'Les hammams publics sont séparés hommes/femmes, tandis que les spas privés proposent des cabines pour couples.'
        ]}
      ],
      es: [
        { type: 'heading', text: 'El arte del relax marroquí' },
        { type: 'paragraph', text: 'El hammam es clave para la salud y vida social en Marruecos. Es un baño de vapor tradicional ideal para relajarse tras los paseos. Te contamos cómo funciona.' },
        { type: 'heading', text: 'Paso 1: Calor y Vapor' },
        { type: 'paragraph', text: 'Empiezas tumbado sobre mármol caliente en una sala de vapor para abrir los poros de la piel.' },
        { type: 'heading', text: 'Paso 2: Jabón Negro' },
        { type: 'paragraph', text: 'Se aplica "savon noir", un jabón natural de aceite de oliva, dejándolo actuar unos minutos.' },
        { type: 'heading', text: 'Paso 3: Exfoliación con Kessa' },
        { type: 'paragraph', text: 'Con un guante especial llamado "kessa", se frota la piel para retirar las impurezas. Tu piel quedará como nueva.' },
        { type: 'heading', text: 'Normas del Hammam' },
        { type: 'list', items: [
          'Se usa siempre ropa interior o bañador.',
          'Bebe agua para mantenerte hidratado.',
          'Los baños públicos dividen por sexos; los de los hoteles son privados.'
        ]}
      ],
      it: [
        { type: 'heading', text: 'L\'arte della purificazione' },
        { type: 'paragraph', text: 'Il hammam è una parte fondamentale del benessere in Marocco. Un bagno turco tradizionale perfetto per rilassarsi dopo i souk. Ecco i passaggi.' },
        { type: 'heading', text: 'Passo 1: Vapore' },
        { type: 'paragraph', text: 'Ti rilassi in una stanza calda e umida per far aprire i pori.' },
        { type: 'heading', text: 'Passo 2: Sapone Nero' },
        { type: 'paragraph', text: 'Si stende il sapone nero naturale a base di olive, lasciandolo agire sulla pelle.' },
        { type: 'heading', text: 'Passo 3: Scrub Kessa' },
        { type: 'paragraph', text: 'Si esegue lo scrub energico con il guanto ruvido kessa per eliminare le cellule morte.' },
        { type: 'heading', text: 'Regole del Hammam' },
        { type: 'list', items: [
          'Si tiene addosso lo slip del costume.',
          'Bevi acqua prima e dopo il trattamento.',
          'I bagni tradizionali sono separati tra uomini e donne.'
        ]}
      ],
      de: [
        { type: 'heading', text: 'Die Kunst der Entspannung' },
        { type: 'paragraph', text: 'Das Hammam ist ein wichtiger Teil der marokkanischen Kultur. Ein traditionelles Dampfbad zur Reinigung und Entspannung. So läuft ein Besuch ab.' },
        { type: 'heading', text: 'Schritt 1: Aufwärmen im Dampfbad' },
        { type: 'paragraph', text: 'Sie entspannen sich im heißen Dampfbereich, wodurch sich die Poren öffnen.' },
        { type: 'heading', text: 'Schritt 2: Schwarze Seife' },
        { type: 'paragraph', text: 'Die klassische schwarze Olivenölseife wird aufgetragen und wirkt ein paar Minuten ein.' },
        { type: 'heading', text: 'Schritt 3: Peeling mit dem Kessa-Handschuh' },
        { type: 'paragraph', text: 'Mit dem rauen Kessa-Handschuh wird die Haut gründlich abgerieben. Ihre Haut fühlt sich danach wunderbar weich an.' },
        { type: 'heading', text: 'Knigge-Tipps' },
        { type: 'list', items: [
          'Tragen Sie Badebekleidung.',
          'Trinken Sie davor und danach ausreichend Wasser.',
          'Öffentliche Hammams sind nach Geschlechtern getrennt.'
        ]}
      ],
    },
  },
  {
    slug: 'morocco-itinerary',
    date: '2026-06-26',
    readTime: {
      en: '6 min read',
      fr: '6 min de lecture',
      es: '6 min de lectura',
      it: '6 min di lettura',
      de: '6 Min. Lesezeit',
    },
    image: '/images/blog/morocco-itinerary.png',
    category: 'morocco-tips',
    author: {
      name: 'Mountassir Chaghough',
      role: 'Senior Travel Planner',
      avatar: '/logo.jpg',
    },
    title: {
      en: 'The Perfect 7-Day Morocco Itinerary',
      fr: 'L\'itinéraire parfait de 7 jours au Maroc',
      es: 'El itinerario perfecto de 7 días por Marruecos',
      it: 'L\'itinerario perfetto di 7 giorni in Marocco',
      de: 'Die perfekte 7-tägige Marokko-Reiseroute',
    },
    excerpt: {
      en: 'Maximized weekly road trip covering Marrakech, the Atlas Mountains, Todra Gorge, the Sahara dunes, and historic Ait Benhaddou.',
      fr: 'Un road trip hebdomadaire optimisé couvrant Marrakech, l\'Atlas, les gorges du Todra, les dunes du Sahara et l\'historique Aït-ben-Haddou.',
      es: 'Un viaje de una semana para ver Marrakech, las montañas del Atlas, las gargantas del Todra, las dunas del Sahara y Ait Ben Haddou.',
      it: 'Un viaggio di una settimana per vedere Marrakech, l\'Atlante, le gole del Todra, le dune del Sahara e Ait Benhaddou.',
      de: 'Eine optimierte einwöchige Rundreise durch Marrakesch, das Atlasgebirge, die Todra-Schlucht, die Sahara-Dünen und das historische Ait Benhaddou.',
    },
    sections: {
      en: [
        { type: 'heading', text: 'Morocco in a Week: Can It Be Done?' },
        { type: 'paragraph', text: 'Many travelers only have 7 days to visit Morocco. While you cannot see everything, a well-planned itinerary lets you experience the incredible diversity of the country — from old imperial cities to high mountain passes and deep desert dunes. Here is the perfect weekly schedule.' },
        { type: 'heading', text: 'Days 1-2: Explore Marrakech Medina' },
        { type: 'paragraph', text: 'Start in the red city of Marrakech. Explore the historical Bahia Palace, Saadian Tombs, and Koutoubia Mosque. Spend your afternoon wandering through the colorful souks and enjoy the sunset from a rooftop café overlooking Jemaa el-Fna.' },
        { type: 'heading', text: 'Day 3: High Atlas & Ait Benhaddou' },
        { type: 'paragraph', text: 'Leave Marrakech and drive across the High Atlas Mountains via the Tizi n\'Tichka pass (2,260m). Stop at the UNESCO world heritage site of Ait Benhaddou, a beautiful mud-brick fortified village that has appeared in many movies like Gladiator and Game of Thrones.' },
        { type: 'heading', text: 'Day 4: Todra Gorge to Sahara Desert' },
        { type: 'paragraph', text: 'Drive through the Dades Valley and walk between the huge rock walls of the Todra Gorge. In the afternoon, reach Merzouga. Ride a camel into the Erg Chebbi dunes at sunset and spend the night in a traditional desert camp under a clear sky.' },
        { type: 'heading', text: 'Day 5: Desert Sunrise and Ouarzazate' },
        { type: 'paragraph', text: 'Wake up early to see a beautiful sunrise over the dunes. After breakfast, head back and drive to Ouarzazate, Morocco\'s cinema capital, to visit Atlas Film Studios.' },
        { type: 'heading', text: 'Day 6: Drive Back to Marrakech' },
        { type: 'paragraph', text: 'Take a scenic route back to Marrakech. Spend your last evening relaxing in a traditional hammam and enjoying a farewell tagine dinner.' },
        { type: 'heading', text: 'Day 7: Departure' },
        { type: 'paragraph', text: 'Do some last-minute souvenir shopping in the souks before heading to Marrakech Menara Airport for your flight home.' }
      ],
      fr: [
        { type: 'heading', text: 'Le Maroc en une semaine : Est-ce possible ?' },
        { type: 'paragraph', text: 'Beaucoup de voyageurs n\'ont que 7 jours. Bien que l\'on ne puisse pas tout voir, un itinéraire optimisé permet de découvrir la diversité du pays — des villes impériales aux dunes du Sahara. Voici le planning parfait.' },
        { type: 'heading', text: 'Jours 1-2 : Explorer Marrakech' },
        { type: 'paragraph', text: 'Commencez par la ville rouge. Visitez le palais de la Bahia, les tombeaux saadiens et la mosquée de la Koutoubia. Perdez-vous dans les souks et admirez le coucher de soleil sur Jemaa el-Fna.' },
        { type: 'heading', text: 'Jour 3 : Le Haut Atlas & Aït-ben-Haddou' },
        { type: 'paragraph', text: 'Traversez le Haut Atlas par le col de Tizi n\'Tichka (2260 m). Arrêtez-vous à Aït-ben-Haddou, village fortifié classé à l\'UNESCO et célèbre lieu de tournage (Gladiator, Game of Thrones).' },
        { type: 'heading', text: 'Jour 4 : Gorges du Todra et Désert' },
        { type: 'paragraph', text: 'Découvrez les impressionnantes gorges du Todra. L\'après-midi, rejoignez Merzouga. Partez à dos de chameau dans les dunes d\'Erg Chebbi et dormez dans un campement sous les étoiles.' },
        { type: 'heading', text: 'Jour 5 : Lever de soleil et Ouarzazate' },
        { type: 'paragraph', text: 'Admirez le lever du soleil sur les dunes. Reprenez la route vers Ouarzazate, la capitale du cinéma marocain.' },
        { type: 'heading', text: 'Jour 6 : Retour à Marrakech' },
        { type: 'paragraph', text: 'Retournez à Marrakech par des routes de montagne pittoresques. Profitez de votre dernière soirée pour vous détendre dans un hammam.' },
        { type: 'heading', text: 'Jour 7 : Départ' },
        { type: 'paragraph', text: 'Derniers achats de souvenirs avant de rejoindre l\'aéroport pour votre vol de retour.' }
      ],
      es: [
        { type: 'heading', text: 'Marruecos en una semana' },
        { type: 'paragraph', text: 'Es posible ver lo mejor en 7 días si planificas bien. Descubre la mezcla de ciudades históricas, montañas y desierto.' },
        { type: 'heading', text: 'Días 1-2: Marrakech' },
        { type: 'paragraph', text: 'Explora los palacios, los zocos y la animada plaza Jemaa el-Fna.' },
        { type: 'heading', text: 'Día 3: Atlas y Ait Ben Haddou' },
        { type: 'paragraph', text: 'Cruza el Atlas y visita el famoso pueblo fortificado de Ait Ben Haddou.' },
        { type: 'heading', text: 'Día 4: Gargantas del Todra y Desierto' },
        { type: 'paragraph', text: 'Camina por las gargantas del Todra y viaja al desierto de Merzouga. Duerme en un campamento nómada.' },
        { type: 'heading', text: 'Día 5: Ouarzazate' },
        { type: 'paragraph', text: 'Disfruta del amanecer en el desierto y viaja a Ouarzazate, centro del cine marroquí.' },
        { type: 'heading', text: 'Día 6: Regreso a Marrakech' },
        { type: 'paragraph', text: 'Vuelve a Marrakech y relájate en un baño turco.' },
        { type: 'heading', text: 'Día 7: Fin del Viaje' },
        { type: 'paragraph', text: 'Souvenirs y traslado al aeropuerto.' }
      ],
      it: [
        { type: 'heading', text: 'Il Marocco in una settimana' },
        { type: 'paragraph', text: 'Un itinerario ottimizzato per vivere le attrazioni principali tra città, montagne e deserto in 7 giorni.' },
        { type: 'heading', text: 'Giorni 1-2: Marrakech' },
        { type: 'paragraph', text: 'Scopri i palazzi, i souk colorati e la vibrante piazza Jemaa el-Fna.' },
        { type: 'heading', text: 'Giorno 3: Atlante e Ait Benhaddou' },
        { type: 'paragraph', text: 'Attraversa le montagne dell\'Atlante e visita la celebre kasbah di Ait Benhaddou.' },
        { type: 'heading', text: 'Giorno 4: Gole del Todra e Merzouga' },
        { type: 'paragraph', text: 'Guarda le gole del Todra e viaggia verso il deserto di Merzouga per dormire sotto le stelle.' },
        { type: 'heading', text: 'Giorno 5: Ouarzazate' },
        { type: 'paragraph', text: 'Alba sulle dune e viaggio a Ouarzazate, la Hollywood marocchina.' },
        { type: 'heading', text: 'Giorno 6: Rientro a Marrakech' },
        { type: 'paragraph', text: 'Rientro a Marrakech e cena tipica a base di tagine.' },
        { type: 'heading', text: 'Giorno 7: Partenza' },
        { type: 'paragraph', text: 'Ultimi acquisti e volo di rientro.' }
      ],
      de: [
        { type: 'heading', text: 'Marokko in einer Woche' },
        { type: 'paragraph', text: 'Eine optimale Reiseroute, um die Vielfalt Marokkos in 7 Tagen zu erleben.' },
        { type: 'heading', text: 'Tage 1-2: Marrakesch' },
        { type: 'paragraph', text: 'Erkunden Sie die Paläste, Souks und den lebendigen Gewürzplatz.' },
        { type: 'heading', text: 'Tag 3: Atlasgebirge & Ait Benhaddou' },
        { type: 'paragraph', text: 'Fahrt über den Atlaspass nach Ait Benhaddou, der berühmten Lehmfestung.' },
        { type: 'heading', text: 'Tag 4: Todra-Schlucht & Wüste' },
        { type: 'paragraph', text: 'Spaziergang durch die Todra-Schlucht und Kamelritt in die Dünen von Merzouga mit Übernachtung im Camp.' },
        { type: 'heading', text: 'Tag 5: Ouarzazate' },
        { type: 'paragraph', text: 'Sonnenaufgang in den Dünen und Fahrt nach Ouarzazate.' },
        { type: 'heading', text: 'Tag 6: Rückreise nach Marrakesch' },
        { type: 'paragraph', text: 'Rückfahrt über das Gebirge und Entspannung im Hammam.' },
        { type: 'heading', text: 'Tag 7: Abreise' },
        { type: 'paragraph', text: 'Souvenirshopping und Transfer zum Flughafen.' }
      ],
    },
  },
];

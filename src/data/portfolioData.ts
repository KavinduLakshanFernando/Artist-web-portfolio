export interface Artwork {
  id: string;
  title: string;
  category: 'painting' | 'photography' | 'design';
  medium: string;
  dimensions: string;
  year: number;
  image: string;
  price?: string;
  status: 'Available' | 'Sold' | 'In Private Collection' | 'Museum Loan';
  description: string;
  provenance: string;
  curatorNote: string;
  series: string;
  featured?: boolean;
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  city: string;
  country: string;
  dates: string;
  type: 'upcoming' | 'current' | 'past';
  status: string;
  curator: string;
  description: string;
  image: string;
  catalogUrl?: string;
}

export interface Discussion {
  id: string;
  title: string;
  interviewer: string;
  role: string;
  platform: string;
  date: string;
  duration: string;
  audioSnippetUrl?: string;
  keyQuote: string;
  transcriptExcerpt: {
    speaker: string;
    text: string;
  }[];
}

export interface PressItem {
  id: string;
  title: string;
  publication: string;
  type: 'newspaper' | 'magazine' | 'article' | 'review';
  date: string;
  author: string;
  snippet: string;
  fullContent: string;
  coverImage?: string;
  badge: string;
  pdfUrl?: string;
}

export interface Publication {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  publisher: string;
  isbn: string;
  pages: number;
  coverImage: string;
  price: string;
  description: string;
  forewordBy: string;
  sampleSpreads: string[];
}

export interface Workshop {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  duration: string;
  location: string;
  capacity: number;
  seatsLeft: number;
  level: string;
  price: string;
  image: string;
  syllabus: string[];
  materialsIncluded: string[];
  instructor: string;
}

export interface ShopItem {
  id: string;
  title: string;
  category: 'Original Painting' | 'Archival Print' | 'Fine Art Photo' | 'Sculptural Object' | 'Edition';
  editionDetails: string;
  medium: string;
  size: string;
  price: number;
  formattedPrice: string;
  image: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  coaSigned: boolean;
  estimatedDelivery: string;
}

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: 'art-1',
    title: 'Luminescence No. VIII: The Architecture of Gold',
    category: 'painting',
    medium: 'Raw lapis lazuli, Prussian oil impasto, 24k gold leaf on Belgian linen',
    dimensions: '180 x 220 cm',
    year: 2024,
    image: '/images/hero_masterpiece.jpg',
    price: 'Rs. 38,000',
    status: 'Available',
    description: 'An exploration of subterranean light and celestial mineral strata. Using cold-pressed linseed oils and pure 24-karat Florentine gold leaf, the work shifts dynamically across daylight hours, capturing atmospheric luminescence.',
    provenance: 'Created at Atelier Montmartre, Paris. Exhibited at Salon d’Automne 2024.',
    curatorNote: '“Vance commands raw pigment with volcanic urgency while maintaining an almost devotional reverence for classical gilding techniques.” — Dr. Genevieve Laurent',
    series: 'Chromatics of Solitude',
    featured: true
  },
  {
    id: 'art-2',
    title: 'Earth Tremors & Saffron Vespers',
    category: 'painting',
    medium: 'Venetian red pigment, raw volcanic ash, cold wax, gold leaf on cradled oak panel',
    dimensions: '120 x 120 cm',
    year: 2024,
    image: '/images/painting_square.jpg',
    price: 'Rs. 19,500',
    status: 'Available',
    description: 'Layered with volcanic sediments gathered during field research in Sicily, this tactile square composition juxtaposes violent ochre impasto with whisper-thin gilded fault lines.',
    provenance: 'Studio Collection, Aurelia Vance Archive.',
    curatorNote: '“A searing study of terrestrial friction and sacred light.” — Artforum International',
    series: 'Terrestrial Memories',
    featured: true
  },
  {
    id: 'art-3',
    title: 'Vessel of the Void (Form No. 04)',
    category: 'design',
    medium: 'Lost-wax cast patinated bronze, carved Tuscan travertine limestone',
    dimensions: '94 x 62 x 45 cm',
    year: 2023,
    image: '/images/design_sculpture.jpg',
    price: 'Rs. 24,000',
    status: 'In Private Collection',
    description: 'A monolithic continuum of gravity and negative space. The heavy travertine base supports a cantilevered bronze torus hand-rubbed with liver of sulfur to achieve deep midnight black patina.',
    provenance: 'Private Collection of The Moreau Foundation, Zurich.',
    curatorNote: '“Echoes Brâncuși while pioneering an abrasive contemporary dialogue between raw stone and metal.” — Architectural Digest',
    series: 'Monoliths & Voids',
    featured: true
  },
  {
    id: 'art-4',
    title: 'Alpine Cyanotype & Nocturnal Flora IV',
    category: 'photography',
    medium: 'Sun-exposed ferric ammonium citrate on handmade 640gsm Arches cotton paper',
    dimensions: '110 x 150 cm',
    year: 2024,
    image: '/images/fine_art_photo.jpg',
    price: 'Rs. 8,200',
    status: 'Available',
    description: 'Direct sun-printed botanicals gathered from the Swiss Engadin valley combined with high-contrast large-format negative exposure under alpine solar radiation.',
    provenance: 'Solo Exhibition at Galerie Éphémère, Basel.',
    curatorNote: '“A luminous dialogue between nineteenth-century photographic alchemy and environmental fragility.” — Frieze',
    series: 'Solar Nocturnes',
    featured: true
  },
  {
    id: 'art-5',
    title: 'Torso of the Dawn',
    category: 'design',
    medium: 'Smoked hand-blown Murano glass, brass pinions, charred cedar',
    dimensions: '75 x 40 x 30 cm',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    price: 'Rs. 14,500',
    status: 'Sold',
    description: 'Light-refracting sculptural vessel conceived as an ode to diurnal transitions and organic respiration in modern architecture.',
    provenance: 'Acquired by Private Collector, Kyoto.',
    curatorNote: '“A masterful synthesis of artisanal glasscraft and conceptual design minimalism.”',
    series: 'Monoliths & Voids'
  },
  {
    id: 'art-6',
    title: 'Spectral Coastline: Fog & Cadmium',
    category: 'photography',
    medium: 'Archival silver gelatin print, toned with selenium and gold chloride',
    dimensions: '90 x 135 cm',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    price: 'Rs. 6,800',
    status: 'Available',
    description: 'Captured at 5:00 AM on the Brittany headlands during winter squalls, capturing water mist and distant maritime signals.',
    provenance: 'Exhibited at Rencontres d’Arles Photography Festival.',
    curatorNote: '“Atmospheric photography pushed into the sublime domain of Turner-like haze.”',
    series: 'Solar Nocturnes'
  },
  {
    id: 'art-7',
    title: 'Ode to the Pale Horizon',
    category: 'painting',
    medium: 'Bone white pigment, ground marble dust, raw linen unprimed weave',
    dimensions: '160 x 140 cm',
    year: 2024,
    image: '/images/painting_square.jpg',
    price: 'Rs. 22,000',
    status: 'Museum Loan',
    description: 'An acoustic field of quietude. Subdued textural fissures evoke drying lakebeds and ancient stucco facades.',
    provenance: 'On long-term loan to Fondation Beyeler, Riehen.',
    curatorNote: '“Quietude rendered as monumental physical presence.”',
    series: 'Chromatics of Solitude'
  },
  {
    id: 'art-8',
    title: 'Kyoto Echoes: Shadow Partition',
    category: 'design',
    medium: 'Cast iron framework, indigo-dyed kozo paper, brass joints',
    dimensions: '190 x 180 x 25 cm',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80',
    price: 'Rs. 18,000',
    status: 'Available',
    description: 'Freestanding architectural screen commissioned during residency at Villa Kujoyama, Kyoto.',
    provenance: 'Studio Collection.',
    curatorNote: '“Translating Tanizaki’s In Praise of Shadows into sculptural contemporary furniture.”',
    series: 'Spatial Modules'
  }
];

export const EXHIBITIONS_DATA: Exhibition[] = [
  {
    id: 'ex-1',
    title: 'Aurelia Vance: Chronicles of Lumen & Matter',
    venue: 'Palais de Tokyo (Contemporary Wing)',
    city: 'Paris',
    country: 'France',
    dates: 'Nov 14, 2026 – Feb 28, 2027',
    type: 'upcoming',
    status: 'Opening Next Month // VIP Preview Nov 12',
    curator: 'Camille Desmoulins & Hans Ulrich Obrist',
    description: 'A landmark mid-career survey spanning ten years of Vance’s monumental paintings, bronze designs, and light-sensitive cyanotypes across five grand gallery halls.',
    image: '/images/exhibition_gallery.jpg',
    catalogUrl: '/publications'
  },
  {
    id: 'ex-2',
    title: 'The Architecture of Silence: Mineral & Shadow',
    venue: 'Hayward Gallery',
    city: 'London',
    country: 'United Kingdom',
    dates: 'Aug 10 – Oct 22, 2026',
    type: 'current',
    status: 'Currently on View // Final 2 Weeks',
    curator: 'Dr. Genevieve Laurent',
    description: 'Featuring 18 large-scale canvases incorporating raw lapis lazuli and Florentine gold leaf alongside custom tactile bronze fixtures.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ex-3',
    title: 'Echoes of the Stratum',
    venue: 'Mori Art Museum (Tokyo Roppongi)',
    city: 'Tokyo',
    country: 'Japan',
    dates: 'Jan 15 – May 02, 2025',
    type: 'past',
    status: 'Catalogue in Second Edition',
    curator: 'Kenzo Takahashi',
    description: 'A transatlantic dialogue between Vance’s Parisian pigment studies and traditional Japanese mineral nihonga craftsmanship.',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ex-4',
    title: 'Venice Biennale: Collateral Pavilion of Light',
    venue: 'Biennale Arte // Campo San Maurizio',
    city: 'Venice',
    country: 'Italy',
    dates: 'Apr 20 – Nov 24, 2024',
    type: 'past',
    status: 'Special Golden Lion Mention nominee',
    curator: 'Alessandra Moretti',
    description: 'Site-specific installation reacting directly to tidal water reflections in the Venetian lagoon through suspended gilded panels.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80'
  }
];

export const DISCUSSIONS_DATA: Discussion[] = [
  {
    id: 'disc-1',
    title: 'The Tactile Sublime: Paint as Living Geologic Flesh',
    interviewer: 'Hans Ulrich Obrist',
    role: 'Artistic Director, Serpentine Galleries',
    platform: 'Frieze Talks & Art Basel Live Sound Series',
    date: 'September 2026',
    duration: '42 min audio session',
    keyQuote: '“I do not apply paint to simulate an image. I compress minerals into the linen so that light behaves like a physical collision.”',
    transcriptExcerpt: [
      {
        speaker: 'Hans Ulrich Obrist',
        text: 'Aurelia, when walking through your Paris atelier, one feels less inside a modern workshop and more inside an alchemist’s laboratory. You harvest raw lapis from Badakhshan, crush your own cinnabar, and simmer walnut husks. Why this insistence on tactile materiality in an age dominated by pixel and algorithm?'
      },
      {
        speaker: 'Aurelia Vance',
        text: 'Because digital pixels possess no weight, no mortality, and no resistance. When you grind lapis lazuli into linseed oil, the crystal fractures at microscopic angles. Light doesn’t just bounce off; it gets refracted, trapped, and released differently at 9:00 in the morning than at twilight. That temporal breath is something synthetic pigment simply cannot do.'
      },
      {
        speaker: 'Hans Ulrich Obrist',
        text: 'And the gold leaf? It has such historic religious weight—from Byzantium to Fra Angelico.'
      },
      {
        speaker: 'Aurelia Vance',
        text: 'For me, gold is not wealth; it is distilled sunlight held hostage on earth. When applied over dark, volcanic umber, it creates an unbearable tension: sacred and terrestrial, immortal and decaying.'
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'Dissecting Negative Space: From Canvas to Blackened Bronze',
    interviewer: 'Claire Bishop',
    role: 'Art Critic & Professor, CUNY Graduate Center',
    platform: 'Artforum Audio Chronicles // Episode 88',
    date: 'June 2026',
    duration: '35 min interview',
    keyQuote: '“Sculpture for me is painting that refused to stay trapped against the wall.”',
    transcriptExcerpt: [
      {
        speaker: 'Claire Bishop',
        text: 'Your transition from monumental impasto paintings into heavy cast bronze and travertine sculptures felt unexpected to many collectors. Was it an evolution or a reaction?'
      },
      {
        speaker: 'Aurelia Vance',
        text: 'Every painter reaches a point of physical frustration with the two-dimensional picture plane. In 2022, I found myself literally pressing my body against the wet canvas trying to give it volume. The bronze sculptures became my way of making the shadow stand independently without needing the wall.'
      }
    ]
  }
];

export const PRESS_DATA: PressItem[] = [
  {
    id: 'press-1',
    title: 'The Alchemist of Montmartre: How Aurelia Vance Revived the Monumental Canvas',
    publication: 'The New York Times (Arts & Leisure)',
    type: 'newspaper',
    date: 'October 14, 2026',
    author: 'Roberta Smith / Editorial',
    badge: 'Front Page Feature',
    snippet: '“Vance’s paintings do not merely hang in a gallery; they alter the acoustic resonance of the room. Her mastery of gold leaf and raw pigments bridges the Renaissance with brutalist abstraction.”',
    fullContent: 'In an era where much of contemporary art feels optimized for smartphone screens, Aurelia Vance’s monumental paintings demand bodily presence. Stepping into her Parisian atelier on the slopes of Montmartre, one is greeted by sacks of raw lapis lazuli, cold-pressed cold wax, and sheets of 24-karat gold leaf that tremble with each breath of air.\n\nHer upcoming Palais de Tokyo retrospective marks the triumphant arrival of a painter who refused every digital shortcut. “Light is not an intellectual concept,” Vance remarks. “It is a physical collision.” The retrospective promises to be one of Europe’s essential cultural milestones this autumn.'
  },
  {
    id: 'press-2',
    title: 'Aurelia Vance and the New Materialism: Beauty Against the Algorithm',
    publication: 'Vogue Art & Culture International',
    type: 'magazine',
    date: 'September 2026',
    author: 'Eleanor Sterling',
    badge: 'Cover Story',
    snippet: '“With her signature impasto and sculpted bronze forms, Aurelia Vance has become the defining voice of contemporary tactile art for a generation starved for authenticity.”',
    fullContent: 'From her atelier overlooking Paris to the Biennales of Venice and Tokyo, Vance works in disciplined solitude. In this exclusive Vogue cover dialogue, she opens up on her monastic daily painting rituals, the spiritual discipline of hand-grinding minerals, and why art must provoke sensory awe.'
  },
  {
    id: 'press-3',
    title: 'Review: The Architecture of Silence at Hayward Gallery',
    publication: 'The Guardian (Culture & Visual Arts)',
    type: 'newspaper',
    date: 'August 28, 2026',
    author: 'Adrian Searle',
    badge: '5-Star Review ★★★★★',
    snippet: '“A breathless exhibition. Vance’s dark, geological paintings possess a gravity that pulls you toward the linen until your nose almost brushes the gold leaf.”',
    fullContent: 'Five stars are barely sufficient for this Hayward exhibition. In gallery three, where Vance’s 12-meter diptych hangs bathed in cold northern light, the room fell into collective cathedral silence among three hundred patrons on opening night.'
  },
  {
    id: 'press-4',
    title: 'Artforum Spotlight: Mineral Pigments and Planetary Time',
    publication: 'Artforum International',
    type: 'article',
    date: 'July 2026',
    author: 'Julian Stallabrass',
    badge: 'Critical Essay',
    snippet: '“An analytical breakdown of Vance’s chemical formulations and tectonic sensibilities. Her works embody Deep Time in an age of disposable culture.”',
    fullContent: 'Vance’s pigments are gathered from specific geographical quarries—Sardinian volcanic ash, Afghan lapis lazuli, Florentine ochres. Her work connects modern human consciousness with deep planetary memory.'
  },
  {
    id: 'press-5',
    title: 'Wallpaper* Atelier Tour: The Brutalist Haven of Aurelia Vance',
    publication: 'Wallpaper* Magazine',
    type: 'magazine',
    date: 'May 2026',
    author: 'Marco Bellini',
    badge: 'Architecture & Design',
    snippet: '“Step inside the 19th-century timber-framed atelier transformed into a serene minimalist sanctuary for monumental painting and bronze casting.”',
    fullContent: 'Concrete plinths, blackened steel racks holding 3-meter canvases, and antique porcelain pestles. Explore the architectural layout where every tool has its ritualistic place.'
  }
];

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: 'pub-1',
    title: 'Chronicles of Lumen',
    subtitle: 'A Monograph on Contemporary Art, Light & Pigment (2016–2026)',
    year: 2026,
    publisher: 'Thames & Hudson / Éditions du Regard',
    isbn: '978-0-500-02845-1',
    pages: 368,
    coverImage: '/images/monograph_book.jpg',
    price: 'Rs. 110',
    description: 'The definitive hardbound monograph documenting a decade of Aurelia Vance’s creative output. Bound in bespoke midnight blue linen with hot-stamped gold foil typography, featuring 280 full-color plates printed on 170gsm GardaMatt archival paper.',
    forewordBy: 'Hans Ulrich Obrist and Dr. Genevieve Laurent',
    sampleSpreads: [
      'Foreword: The Weight of Gold in Post-Digital Painting',
      'Chapter I: The Montmartre Notebooks & Raw Pigments (2016–2019)',
      'Chapter II: Tectonic Fractures & Sicilian Volcanic Ash (2020–2022)',
      'Chapter III: Monoliths, Lost-Wax Bronze & Travertine (2023–2024)',
      'Chapter IV: The Venice Biennale & Solar Nocturnes (2025–2026)',
      'Comprehensive Provenance & Index of Complete Works'
    ]
  },
  {
    id: 'pub-2',
    title: 'In Praise of Mineral Solitude',
    subtitle: 'Essays & Studio Notes on Pigment Preparation and Philosophy',
    year: 2025,
    publisher: 'Atelier Aurelia Editions',
    isbn: '978-2-958-30112-9',
    pages: 184,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    price: 'Rs. 45',
    description: 'An intimate artist book collecting Aurelia Vance’s personal field notebooks, poetic aphorisms, pigment recipes, and correspondence with contemporary philosophers during her Kyoto residency.',
    forewordBy: 'By Aurelia Vance with Afterword by Kenzo Takahashi',
    sampleSpreads: [
      'The Chemistry of Lapis Lazuli Extraction',
      'Notes on Solitude and the 4:00 AM Studio Shift',
      'On Refusing Synthetic Pigments: A Moral Choice',
      'Dialogues with Japanese Nihonga Masters in Kyoto'
    ]
  },
  {
    id: 'pub-3',
    title: 'The Architecture of Silence: Exhibition Catalogue',
    subtitle: 'Official Hayward Gallery Retrospective Catalogue',
    year: 2026,
    publisher: 'Hayward Gallery Publishing, London',
    isbn: '978-1-85332-389-8',
    pages: 220,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    price: 'Rs. 55',
    description: 'Richly illustrated exhibition catalogue featuring critical essays by Roberta Smith, Adrian Searle, and high-resolution panoramic installation photographs of the Hayward Gallery exhibition.',
    forewordBy: 'Ralph Rugoff, Director of Hayward Gallery',
    sampleSpreads: [
      'Curator’s Essay: Painting as Sonic Architecture',
      'Full Color Exhibition Plates (Works 01–48)',
      'Studio Floor Plans and Spatial Staging Studies'
    ]
  }
];

export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: 'ws-1',
    title: 'The Alchemy of Raw Minerals & 24k Gold Leaf',
    subtitle: 'An Immersive 3-Day Atelier Masterclass in Montmartre, Paris',
    dates: 'December 11 – 13, 2026',
    duration: '3 Full Days (10:00 – 17:30)',
    location: 'Atelier Aurelia Vance, 14 Rue Lepic, Paris, France',
    capacity: 10,
    seatsLeft: 3,
    level: 'Intermediate to Advanced Artists',
    price: 'Rs. 1,850',
    image: '/images/art_workshop.jpg',
    syllabus: [
      'Day 1: Geological Harvesting & Mineral Grinding on Glass Slabs (Lapis, Malachite, Cinnabar)',
      'Day 2: Egg Tempera, Stand Oils, and Cold Wax Medium Formulations',
      'Day 3: Water Gilding & Oil Gilding: Applying 24k Florentine Gold Leaf and Sgraffito Techniques'
    ],
    materialsIncluded: [
      'Personal set of pure mineral pigments (100g each)',
      'Handmade glass muller & ground glass grinding slab',
      'Booklet of 25 sheets 24-karat genuine Florentine gold leaf',
      'Two pre-stretched Belgian linen canvases (60 x 80 cm)',
      'Atelier apron & archival finishing varnishes',
      'Daily catered French lunch & atelier salon wine evening'
    ],
    instructor: 'Aurelia Vance (Direct mentorship with max 10 students)'
  },
  {
    id: 'ws-2',
    title: 'Large-Format Solar Cyanotype & Botanical Alchemy',
    subtitle: 'Weekend Intensive Workshop on Alternative Photographic Printing',
    dates: 'January 23 – 24, 2027',
    duration: '2 Full Days (10:00 – 16:30)',
    location: 'Atelier Aurelia Vance, Paris & Jardin des Plantes Field Trip',
    capacity: 12,
    seatsLeft: 5,
    level: 'All Levels (Artists, Photographers & Designers)',
    price: 'Rs. 950',
    image: '/images/fine_art_photo.jpg',
    syllabus: [
      'Day 1: Chemistry of Iron Salts, Paper Selection, Coating Heavy 640gsm Arches Paper',
      'Day 2: Solar Exposure Timing, Botanical Composition, Gold and Tannin Toning Baths'
    ],
    materialsIncluded: [
      'Full bottle set of ferric ammonium citrate and potassium ferricyanide',
      'Box of 10 sheets 640gsm Arches Aquarelle rag paper',
      'Custom UV contact printing frame (50 x 70 cm)',
      'Toning botanicals and green tea / wine tannin baths'
    ],
    instructor: 'Aurelia Vance & Special Guest Printmaker Marc Duvall'
  },
  {
    id: 'ws-3',
    title: 'Intuitive Spatial Abstraction & Heavy Impasto',
    subtitle: '4-Week Global Online Intensive & Bi-Weekly Studio Critiques',
    dates: 'February 1 – February 28, 2027',
    duration: '4 Weeks (Weekly Live Seminars + 1-on-1 Portfolio Reviews)',
    location: 'Live Interactive Virtual Atelier (Worldwide Access)',
    capacity: 20,
    seatsLeft: 8,
    level: 'Open to All Dedicated Painters',
    price: 'Rs. 650',
    image: '/images/painting_square.jpg',
    syllabus: [
      'Week 1: Developing an Idiosyncratic Visual Language Beyond Trends',
      'Week 2: Heavy Knife Impasto: Structural Tension and Drying Dynamics',
      'Week 3: Composition as Musical Rhythms and Spatial Balance',
      'Week 4: 1-on-1 Individual Studio Critique & Career Navigation'
    ],
    materialsIncluded: [
      'Lifetime access to 16 hours of 4K studio demonstration recordings',
      'Curated recipe PDF of historical binder recipes',
      'Private Community Access & Discord Masterclass Salon',
      'Certificate of Masterclass Completion signed by Aurelia Vance'
    ],
    instructor: 'Aurelia Vance'
  }
];

export const SHOP_DATA: ShopItem[] = [
  {
    id: 'shop-1',
    title: 'Luminescence No. VIII (Archival Giclée Print)',
    category: 'Archival Print',
    editionDetails: 'Limited Edition of 50 // Hand-signed and numbered in 24k gold ink',
    medium: 'Hahnemühle Photo Rag Ultra Smooth 305gsm, Hand-embellished with genuine gold foil',
    size: '70 x 90 cm (Unframed) // Optional museum UV-plexi framing available',
    price: 480,
    formattedPrice: 'Rs. 480',
    image: '/images/hero_masterpiece.jpg',
    inStock: true,
    stockCount: 14,
    description: 'Museum-quality fine art reproduction with hand-applied 24k gold leaf accents executed directly in the studio by Aurelia Vance. Delivered with embossed Certificate of Authenticity.',
    coaSigned: true,
    estimatedDelivery: 'Dispatches within 3-5 business days in custom wooden flat crate.'
  },
  {
    id: 'shop-2',
    title: 'Earth Tremors & Saffron Vespers (Original Canvas)',
    category: 'Original Painting',
    editionDetails: 'Unique Original Work of Art (1 of 1)',
    medium: 'Venetian red pigment, volcanic ash, cold wax, gold leaf on cradled oak panel',
    size: '120 x 120 cm (Ready to hang with custom walnut shadowbox frame)',
    price: 19500,
    formattedPrice: 'Rs. 19,500',
    image: '/images/painting_square.jpg',
    inStock: true,
    stockCount: 1,
    description: 'The monumental original masterpiece featured in Vance’s 2026 London retrospective. Signed, dated, and registered in the Aurelia Vance Catalogue Raisonné.',
    coaSigned: true,
    estimatedDelivery: 'White-glove art courier delivery worldwide (Insurance included).'
  },
  {
    id: 'shop-3',
    title: 'Alpine Cyanotype IV (Archival Darkroom Print)',
    category: 'Fine Art Photo',
    editionDetails: 'Limited Edition of 25 // Numbered & Blind-stamped',
    medium: 'Hand-toned cyanotype on 640gsm deckle-edge Arches cotton paper',
    size: '60 x 85 cm (Deckled edges for float mounting)',
    price: 620,
    formattedPrice: 'Rs. 620',
    image: '/images/fine_art_photo.jpg',
    inStock: true,
    stockCount: 7,
    description: 'Hand-pulled cyanotype print made under alpine sunlight. The natural deckle edges of the French paper create an ethereal floating effect when framed.',
    coaSigned: true,
    estimatedDelivery: 'Ships rolled in archival acid-free tissue and reinforced tube.'
  },
  {
    id: 'shop-4',
    title: 'Chronicles of Lumen (Collector’s Deluxe Slipcase Edition)',
    category: 'Edition',
    editionDetails: 'Limited to 200 Deluxe Copies // Numbered with Signed Original Studio Etching',
    medium: 'Hardcover monograph in handcrafted linen slipcase + signed 5x7 inch original etching',
    size: '30 x 38 cm, 368 pages',
    price: 240,
    formattedPrice: 'Rs. 240',
    image: '/images/monograph_book.jpg',
    inStock: true,
    stockCount: 22,
    description: 'The luxury collector’s edition of the monograph. Contains a hand-pulled original studio drypoint etching signed by Aurelia Vance enclosed in a glassine envelope.',
    coaSigned: true,
    estimatedDelivery: 'Dispatches within 48 hours worldwide.'
  },
  {
    id: 'shop-5',
    title: 'Torso of the Void (Bronze Study Maquette)',
    category: 'Sculptural Object',
    editionDetails: 'Cast Bronze Edition of 12 // Numbered & Foundry Stamped',
    medium: 'Solid blackened bronze on honed Belgian black marble base',
    size: '32 x 20 x 18 cm, Weight: 7.5 kg',
    price: 3600,
    formattedPrice: 'Rs. 3,600',
    image: '/images/design_sculpture.jpg',
    inStock: true,
    stockCount: 3,
    description: 'Sculptural maquette cast at the famed Susse Fondeur in Paris. Deep midnight patina with hand-waxed finish.',
    coaSigned: true,
    estimatedDelivery: 'Ships in custom foam-lined wooden box via DHL Express.'
  },
  {
    id: 'shop-6',
    title: 'Mineral & Celestial Silk Scarf (Wearable Art Edition)',
    category: 'Edition',
    editionDetails: 'Limited Production of 100 // Hand-rolled edges',
    medium: '100% Mulberry Twill Silk (18mm weight), High-definition reactive dye print',
    size: '90 x 90 cm',
    price: 185,
    formattedPrice: 'Rs. 185',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockCount: 34,
    description: 'An ethereal wearable silk square translating the fluid pigments of "Chromatics of Solitude". Comes packaged in a gold-embossed matte black presentation box.',
    coaSigned: false,
    estimatedDelivery: 'Dispatches within 2 business days.'
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'pencil' | 'painting' | 'photography';
  categoryLabel: string;
  image: string;
}

export const GALLERY_IMAGES_DATA: GalleryItem[] = [
  // ==========================================
  // PENCIL ART (13 Images)
  // ==========================================
  {
    id: 'pencil-1',
    title: 'Anatomical Classical Draft (Graphite on Linen Paper)',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: '/images/pencil_art_hero.jpg',
  },
  {
    id: 'pencil-2',
    title: 'Botanical Classical Graphite Study',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-3',
    title: 'Architectural Perspective Graphite Study',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-4',
    title: 'Charcoal & Graphite Drapery Draft',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-5',
    title: 'Minimalist Gestural Contour Sketch',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-6',
    title: 'Intricate Ink & Graphite Portrait',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-7',
    title: 'Abstract Monochrome Graphite Form',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-8',
    title: 'Chiaroscuro Pencil & Carbon Study',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-9',
    title: 'Raw Graphite on Heavy Pressed Paper',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-10',
    title: 'Fine Hatching Study on Parchment',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-11',
    title: 'Vintage Lithograph & Graphite Plate',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-12',
    title: 'Monochromatic Pencil Illustration',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pencil-13',
    title: 'Anatomical Charcoal & Carbon Study',
    category: 'pencil',
    categoryLabel: 'Pencil Art',
    image: 'https://images.unsplash.com/photo-1581337204873-ef36aa186caa?auto=format&fit=crop&w=800&q=80',
  },

  // ==========================================
  // PAINTING ART (14 Images)
  // ==========================================
  {
    id: 'painting-1',
    title: 'Volcanic Strata: Monumental Oil on Linen',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: '/images/hero_masterpiece.jpg',
  },
  {
    id: 'painting-2',
    title: 'Crimson & Mineral Pigments',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: '/images/painting_square.jpg',
  },
  {
    id: 'painting-3',
    title: 'Color Field Atmospheric Oil on Linen',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-4',
    title: 'Indigo & Ultramarine Pigment Wash',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-5',
    title: 'Sienna & Ochre Textured Impasto',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-6',
    title: 'Fluid Mineral Dynamics on Canvas',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-7',
    title: 'Midnight Monolith Contemporary Acrylic',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-8',
    title: 'Golden Hour Palette Knife Impasto',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1576769267415-9642010aa962?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-9',
    title: 'Modernist Oil Study in Emerald & Cyan',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-10',
    title: 'Chromatic Geometric Composition',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-11',
    title: 'Volcanic Red Abstract Oil on Board',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-12',
    title: 'Lapis Lazuli & Gold Leaf Oil Canvas',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1579783483458-83d02161294e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-13',
    title: 'Classical Glaze & Chiaroscuro Texture',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting-14',
    title: 'Raw Earth Mineral Pigment Immersion',
    category: 'painting',
    categoryLabel: 'Painting Art',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  },

  // ==========================================
  // PHOTOGRAPHY (13 Images)
  // ==========================================
  {
    id: 'photo-1',
    title: 'Kyoto Solar Eclipse Cyanotype',
    category: 'photography',
    categoryLabel: 'Photography',
    image: '/images/fine_art_photo.jpg',
  },
  {
    id: 'photo-2',
    title: 'Fine Art High-Contrast Monochrome Portrait',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-3',
    title: 'Architectural Shadow & Minimalist Form',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-4',
    title: 'Atmospheric Misty Fine Art Landscape',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-5',
    title: 'Monolithic Geometric Reflections',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-6',
    title: 'Solar Silhouette & Light Particle Capture',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-7',
    title: 'Tactile Monochrome Gestural Study',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-8',
    title: 'Architectural Curves & Deep Shadows',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-9',
    title: 'Coastal Horizon & Long-Exposure Salt',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-10',
    title: 'Fine Art Chiaroscuro Human Form',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-11',
    title: 'Botanical Cyanotype & Texture Macro',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-12',
    title: 'Cinematic Twilight Fog Horizon',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photo-13',
    title: 'Monolithic Geometric Reflections',
    category: 'photography',
    categoryLabel: 'Photography',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
  },
];



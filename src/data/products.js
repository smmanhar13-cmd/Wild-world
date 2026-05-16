export const COLORS = {
  'Obsidian Black':  '#1a1a1a',
  'Alpine Green':    '#2D4A2D',
  'Storm Grey':      '#6B7280',
  'Desert Sand':     '#C2A878',
  'Flame Orange':    '#D4622A',
  'Navy Blue':       '#1B2A4A',
  'Slate Blue':      '#3B4F6E',
  'Terracotta':      '#C0603A',
  'Olive Drab':      '#6B7645',
  'Midnight Blue':   '#192335',
};

// ─── Local image paths (served from /public/images/) ───────────────
const IMG = {
  // orange pack, Himalayan snow peaks backdrop — iconic hero shot
  himalayaOrange: '/images/pexels-dreamlensproduction-2450296.jpg',
  // compact grey canvas pack, snowy mountain ridge, cinematic
  snowPeakGrey:   '/images/pexels-jarodlovekamp-2404444.jpg',
  // two large expedition packs against tree — green 60L + orange — product flat-lay
  twoPacksForest: '/images/pexels-kamaji-ogino-5065154.jpg',
  // man with large orange pack, lush green Indian forest
  forestOrange:   '/images/pexels-kamaji-ogino-5065321.jpg',
  // trekker with massive grey frame pack in golden-hour pine forest
  goldenFramePack:'/images/pexels-mohamedelaminemsiouri-2108809.jpg',
  // man in yellow jacket with teal expedition pack, misty forest
  mistyTealPack:  '/images/pexels-thirdman-5048529.jpg',
  // woman with black roll-top pack, dramatic foggy cliff
  fogCliffBlack:  '/images/pexels-tomas-malik-793526-2581920.jpg',
};

/* ─────────────────────────────────────────────
   Prices in INR · range ₹2,499 – ₹4,999
   GST (18%) inclusive
───────────────────────────────────────────── */
export const products = [

  // ── FLAGSHIP FOUR ──────────────────────────────────────────────

  {
    id: 1,
    name: 'The Kedarkantha',
    tagline: 'Your perfect 45L trail companion',
    capacity: '45L',
    price: 3499,
    originalPrice: null,
    category: 'Trekking',
    rating: 4.9,
    reviewCount: 412,
    badge: 'Best Seller',
    colors: ['Flame Orange', 'Alpine Green', 'Obsidian Black'],
    sizes: ['45L'],
    images: [
      IMG.himalayaOrange,
      IMG.forestOrange,
      IMG.twoPacksForest,
    ],
    description:
      'Named after one of India\'s most beloved winter treks, the Kedarkantha 45L is the ideal pack for 3–5 day Himalayan adventures. Engineered for Indian terrain — from rocky Uttarakhand trails to Himachal forest paths — it balances load distribution with all-day comfort.',
    features: [
      'Adjustable torso length for Indian body types',
      'Rain cover included (essential for monsoon treks)',
      '1000D Cordura® ripstop nylon — abrasion resistant',
      'Padded hip belt with dual organiser pockets',
      'Top loader + front U-zip panel access',
      'Trekking pole loops & ice axe attachment',
      'Hydration reservoir compatible (3L bladder sleeve)',
      'Ventilated back panel with air channel mesh',
    ],
    specs: {
      Volume:       '45 Litres',
      Dimensions:   '62 × 33 × 22 cm',
      Weight:       '1.35 kg',
      Back:         'Adjustable S/M/L',
      Material:     '1000D Cordura® Nylon',
      Warranty:     '5 Years',
      'Rain Cover': 'Included',
    },
  },

  {
    id: 2,
    name: 'The Roopkund',
    tagline: 'Five days in the Himalaya — ready',
    capacity: '55L',
    price: 4299,
    originalPrice: 4799,
    category: 'Trekking',
    rating: 4.8,
    reviewCount: 287,
    badge: 'Sale',
    colors: ['Alpine Green', 'Storm Grey', 'Midnight Blue'],
    sizes: ['55L'],
    images: [
      IMG.mistyTealPack,
      IMG.twoPacksForest,
      IMG.goldenFramePack,
    ],
    description:
      'The Roopkund 55L is built for India\'s most demanding high-altitude treks. Whether you\'re heading to Roopkund Lake (5,029m) or traversing the Hampta Pass, this pack carries everything — sleeping bag, layers, food, and technical gear — without sacrificing comfort on 8-hour trail days.',
    features: [
      'Dual-density foam back panel with lumbar pad',
      'Adjustable sternum strap with safety whistle',
      'Separate sleeping bag compartment at base',
      'Gear-lash points for crampons / helmets',
      'Waterproof YKK® zippers on all main compartments',
      'Side compression straps to stabilise load',
      'Integrated 3L hydration sleeve',
      'Removable top lid converts to day pack',
    ],
    specs: {
      Volume:       '55 Litres',
      Dimensions:   '70 × 34 × 24 cm',
      Weight:       '1.65 kg',
      Back:         'Adjustable S/M/L/XL',
      Material:     '420D Nylon + Cordura® reinforcement',
      Warranty:     '5 Years',
      'Rain Cover': 'Included',
    },
  },

  {
    id: 3,
    name: 'The Gangotri',
    tagline: 'High altitude. Zero compromise.',
    capacity: '60L',
    price: 4599,
    originalPrice: null,
    category: 'Expedition',
    rating: 4.9,
    reviewCount: 198,
    badge: 'Premium',
    colors: ['Obsidian Black', 'Alpine Green', 'Olive Drab'],
    sizes: ['60L'],
    images: [
      IMG.twoPacksForest,
      IMG.goldenFramePack,
      IMG.mistyTealPack,
    ],
    description:
      'The Gangotri 60L is our most technically refined pack — engineered for 7–10 day high-altitude treks across Uttarakhand and Ladakh. An integrated frame sheet and precision load-transfer hip belt system make 15+ kg feel effortless. Named for the glacier that feeds the Ganga.',
    features: [
      'Internal frame sheet for structural rigidity',
      'Precision load-lifter webbing at shoulders',
      'Padded hip wings with pivot system',
      'Dual side water bottle pockets (deep)',
      'Front organiser panel with key clip + tool loops',
      'Compression dry bag set included',
      'Breathable 3D Air-mesh back system',
      'Packable rain cover in dedicated base pocket',
    ],
    specs: {
      Volume:       '60 Litres',
      Dimensions:   '74 × 36 × 26 cm',
      Weight:       '1.85 kg',
      Back:         'Adjustable S/M/L/XL',
      Material:     '630D Dyneema® reinforced Nylon',
      Warranty:     'Lifetime',
      'Rain Cover': 'Integrated pocket',
    },
  },

  {
    id: 4,
    name: 'The Everest',
    tagline: 'Built for basecamp and beyond',
    capacity: '80L',
    price: 4999,
    originalPrice: null,
    category: 'Expedition',
    rating: 5.0,
    reviewCount: 114,
    badge: 'Limited',
    colors: ['Obsidian Black', 'Midnight Blue'],
    sizes: ['80L'],
    images: [
      IMG.goldenFramePack,
      IMG.twoPacksForest,
      IMG.mistyTealPack,
    ],
    description:
      'The Everest 80L is reserved for those who go the absolute furthest — full Himalayan expedition, multi-week base camp, or rugged overland adventure. Every element has been tested at altitude, from reinforced grab handles on all six faces to the sub-zero compression system that holds tight at 5,000m+.',
    features: [
      'Full-perimeter aluminium frame with removable stays',
      'Six-point suspension system for extreme loads',
      'Side access zip to all three compartments',
      'Detachable top lid with dedicated zip pockets',
      'Crampon pouch and ice axe loop system',
      'Emergency whistle on all straps',
      'RFID-blocking documents pocket inside lid',
      'Colour-coded compartment liners for organisation',
    ],
    specs: {
      Volume:       '80 Litres',
      Dimensions:   '84 × 38 × 30 cm',
      Weight:       '2.1 kg',
      Back:         'Adjustable S/M/L/XL + torso length',
      Material:     '1000D Cordura® + 6061-T6 Aluminium frame',
      Warranty:     'Lifetime + free repair',
      'Rain Cover': 'Included + extra drybag set',
    },
  },

  // ── SUPPORTING RANGE ───────────────────────────────────────────

  {
    id: 5,
    name: 'The Valley Pack',
    tagline: 'Light, fast, day-hike ready',
    capacity: '30L',
    price: 2499,
    originalPrice: null,
    category: 'Day Hike',
    rating: 4.7,
    reviewCount: 563,
    badge: null,
    colors: ['Flame Orange', 'Alpine Green', 'Storm Grey'],
    sizes: ['30L'],
    images: [
      IMG.snowPeakGrey,
      IMG.fogCliffBlack,
      IMG.himalayaOrange,
    ],
    description:
      'The lightest pack in the Wild World range. Perfect for day hikes on routes like Valley of Flowers, Triund, or Kheerganga — the Valley Pack is stripped back, durable, and exactly what you need when speed matters.',
    features: [
      'Ultra-lightweight 210D ripstop nylon shell',
      'Padded 15" laptop sleeve (doubles as hydration sleeve)',
      'External trekking pole loops',
      'Minimal profile for technical trail sections',
      'DWR coating — light rain resistant',
      'Packable — folds flat when empty',
    ],
    specs: {
      Volume:       '30 Litres',
      Dimensions:   '52 × 28 × 18 cm',
      Weight:       '0.65 kg',
      Back:         'Fixed',
      Material:     '210D Ripstop Nylon',
      Warranty:     '3 Years',
      'Rain Cover': 'Not included',
    },
  },

  {
    id: 6,
    name: 'The Hampta',
    tagline: 'Weekend warrior, urban explorer',
    capacity: '40L',
    price: 2999,
    originalPrice: 3499,
    category: 'Trekking',
    rating: 4.8,
    reviewCount: 334,
    badge: 'Sale',
    colors: ['Desert Sand', 'Obsidian Black', 'Terracotta'],
    sizes: ['40L'],
    images: [
      IMG.fogCliffBlack,
      IMG.snowPeakGrey,
      IMG.himalayaOrange,
    ],
    description:
      'Named after the iconic Hampta Pass that connects Manali to Spiti, this 40L is the perfect crossover bag — smart enough for the city, rugged enough for 2–3 day mountain trips. The clean aesthetic hides a seriously capable interior.',
    features: [
      'Clean exterior silhouette — office-to-trail ready',
      'Padded laptop compartment up to 15.6"',
      'Clamshell opening for easy packing',
      'Hip belt stows away when not needed',
      'Integrated luggage pass-through sleeve',
      'Quick-grab reinforced top handle',
    ],
    specs: {
      Volume:       '40 Litres',
      Dimensions:   '58 × 30 × 20 cm',
      Weight:       '1.1 kg',
      Back:         'Fixed M',
      Material:     '900D Recycled Polyester',
      Warranty:     '3 Years',
      'Rain Cover': 'Included',
    },
  },

  {
    id: 7,
    name: 'The Annapurna',
    tagline: 'Base camp-ready, 50L of freedom',
    capacity: '50L',
    price: 3799,
    originalPrice: null,
    category: 'Trekking',
    rating: 4.8,
    reviewCount: 221,
    badge: 'New',
    colors: ['Alpine Green', 'Midnight Blue', 'Storm Grey'],
    sizes: ['50L'],
    images: [
      IMG.forestOrange,
      IMG.himalayaOrange,
      IMG.mistyTealPack,
    ],
    description:
      'The Annapurna 50L sits at the sweet spot between versatility and technical capability. It\'s the pack for Annapurna Circuit, Goecha La, or Stok Kangri Base Camp — where 6 days of gear needs to fit without compromise.',
    features: [
      'G-hook dual-density hip belt',
      'Shoulder straps with integrated whistle',
      'Three-point load adjustment system',
      'Removable sleeping bag divider',
      'Front shove-it pocket for quick access',
      'Hydration ready — 3L bladder compatible',
    ],
    specs: {
      Volume:       '50 Litres',
      Dimensions:   '67 × 33 × 23 cm',
      Weight:       '1.55 kg',
      Back:         'Adjustable S/M/L',
      Material:     '630D Nylon Ripstop',
      Warranty:     '5 Years',
      'Rain Cover': 'Included',
    },
  },

  {
    id: 8,
    name: 'The Spiti',
    tagline: 'Longest trails. Wildest skies.',
    capacity: '70L',
    price: 4799,
    originalPrice: null,
    category: 'Expedition',
    rating: 4.9,
    reviewCount: 97,
    badge: 'New',
    colors: ['Obsidian Black', 'Olive Drab', 'Slate Blue'],
    sizes: ['70L'],
    images: [
      IMG.goldenFramePack,
      IMG.twoPacksForest,
      IMG.forestOrange,
    ],
    description:
      'The Spiti 70L is engineered for India\'s harshest and most remote terrain — the cold desert valleys of Spiti, Pin-Bhaba Pass, and Kinnaur. Where resupply is impossible and the weather is unpredictable, the Spiti carries everything and still feels comfortable.',
    features: [
      'Full internal frame + removable stays',
      'Oversized hip belt for 10+ day load bearing',
      'Floating top lid with 3 zip pockets',
      'Trekking pole + ice axe carry system',
      'Compression dry bag set included',
      'Reflective trim — visible at dusk',
    ],
    specs: {
      Volume:       '70 Litres',
      Dimensions:   '80 × 37 × 28 cm',
      Weight:       '1.95 kg',
      Back:         'Adjustable S/M/L/XL',
      Material:     '840D Ballistic Nylon',
      Warranty:     'Lifetime',
      'Rain Cover': 'Included + drybag set',
    },
  },
];

export const categories = ['All', 'Day Hike', 'Trekking', 'Expedition'];

export const sortOptions = [
  { value: 'featured',   label: 'Featured'           },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated'          },
  { value: 'newest',     label: 'Newest Arrivals'    },
];

export const INDIA_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Ladakh', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

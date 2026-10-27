// LIVY — Living Indian Voices and Yarns
// Product Catalog Data — 5 Authentic SKUs from Brand Reference

const LIVY_PRODUCTS = [
  {
    id: "sku-01",
    skuCode: "LIVY-SKU-01",
    name: "Floral Garden",
    subtitle: "Cream bedsheet with a delicate floral print",
    collection: "Botanical & Meadow",
    category: "botanical",
    priceINR: 5200,
    priceUSD: 68,
    priceEUR: 62,
    priceGBP: 54,
    rating: 4.9,
    reviewCount: 38,
    isBestseller: true,
    isNew: false,
    tagline: "Hand-Block Meadow Botanical",
    shortDescription: "A serene cream ground decorated with scattered hand-pressed floral blooms in marigold ochre, gentle madder terracotta, and sage leaves.",
    fullDescription: "Inspired by the wild meadow gardens of Sanganer, the Floral Garden bedsheet is printed using hand-carved teak wood blocks on our signature 400-thread-count combed cotton percale. Crisp yet soft to the touch, this piece breathes effortless calm into contemporary sleeping spaces, aging into an increasingly tender drape with every wash.",
    artisanCluster: "Sanganer & Jaipur, Rajasthan",
    craftTechnique: "Teak-block relief printing with AZO-free botanical mineral pigments",
    fabricComposition: "100% Long-Staple Indian Combed Cotton",
    threadCount: "400 TC Single-Ply Percale Weave",
    weaveType: "Matte Crisp Percale (Cooling & Breathable)",
    images: {
      folded: "assets/products/sku-01-folded-clean.png",
      lifestyle: "assets/products/sku-01-lifestyle.png",
      foldedHD: "assets/products/sku-01-folded-hd-clean.png",
      lifestyleHD: "assets/products/sku-01-lifestyle-hd.png"
    },
    palette: [
      { name: "Raw Cream", hex: "#F5E8DC" },
      { name: "Terracotta Ochre", hex: "#C87030" },
      { name: "Meadow Sage", hex: "#8A947A" }
    ],
    sizes: [
      {
        id: "single",
        label: "Single",
        sheetDimensions: "150 × 250 cm (60 × 98 in)",
        mattressFit: "Up to 30 cm (12 in) depth",
        includes: "1 Flat Sheet + 1 Standard Pillowcase",
        priceMultiplier: 0.8
      },
      {
        id: "queen",
        label: "Queen",
        sheetDimensions: "230 × 275 cm (90 × 108 in)",
        mattressFit: "Up to 36 cm (14 in) depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.0,
        isDefault: true
      },
      {
        id: "king",
        label: "King",
        sheetDimensions: "275 × 275 cm (108 × 108 in)",
        mattressFit: "Up to 40 cm (16 in) depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.15
      },
      {
        id: "superking",
        label: "Super King",
        sheetDimensions: "275 × 305 cm (108 × 120 in)",
        mattressFit: "Up to 45 cm (18 in) depth",
        includes: "1 Flat Sheet + 2 King Pillowcases",
        priceMultiplier: 1.25
      }
    ],
    pillowDimensions: "46 × 70 cm (18 × 28 in) with deep 20 cm envelope closure",
    careInstructions: [
      "Machine wash gentle at 30°C / 85°F with similar neutrals",
      "Use pH-neutral, plant-based detergent; avoid bleach or optic brighteners",
      "Line dry in open shade to preserve natural dye luster",
      "Warm iron while slightly damp for crisp hotel-linen finish",
      "Softens naturally and gently with successive washes"
    ],
    craftNotes: "Each bedsheet takes approximately 18 hours of artisan hand-block printing. Minor subtle variations in motif alignment reflect the true hallmark of human handiwork.",
    sustainabilityImpact: "Saves 1,400 liters of water via closed-loop river-safe vegetable dye curing."
  },
  {
    id: "sku-02",
    skuCode: "LIVY-SKU-02",
    name: "Soft Blue Stripes",
    subtitle: "Light neutral bedsheet with fine blue stripes",
    collection: "Quiet Lines",
    category: "minimal",
    priceINR: 4950,
    priceUSD: 64,
    priceEUR: 58,
    priceGBP: 51,
    rating: 4.8,
    reviewCount: 29,
    isBestseller: false,
    isNew: true,
    tagline: "Yarn-Dyed Indigo Waves",
    shortDescription: "A rhythmic interplay of undyed organic cream yarn and delicate wavy indigo pinstripes, quietly soothing and effortlessly minimal.",
    fullDescription: "Inspired by gentle ripples across Indian inland riverbeds, Soft Blue Stripes brings an airy, meditative presence to your room. Woven from single-origin organic cotton, each stripe is yarn-dyed with indigo extract before weaving, guaranteeing deep colorfastness that remains luminous season after season.",
    artisanCluster: "Maheshwar, Madhya Pradesh",
    craftTechnique: "Slow shuttle pit-loom weaving with yarn-dyed indigo threads",
    fabricComposition: "100% Organic Hand-Picked Cotton",
    threadCount: "380 TC Balanced Percale",
    weaveType: "Matte Breathable Slub Percale",
    images: {
      folded: "assets/products/sku-02-folded-clean.png",
      lifestyle: "assets/products/sku-02-lifestyle.png",
      foldedHD: "assets/products/sku-02-folded-hd-clean.png",
      lifestyleHD: "assets/products/sku-02-lifestyle-hd.png"
    },
    palette: [
      { name: "Cream Base", hex: "#F5E8DC" },
      { name: "River Indigo", hex: "#2D36A8" },
      { name: "Flax Grey", hex: "#B8B3A8" }
    ],
    sizes: [
      {
        id: "single",
        label: "Single",
        sheetDimensions: "150 × 250 cm (60 × 98 in)",
        mattressFit: "Up to 30 cm depth",
        includes: "1 Flat Sheet + 1 Standard Pillowcase",
        priceMultiplier: 0.8
      },
      {
        id: "queen",
        label: "Queen",
        sheetDimensions: "230 × 275 cm (90 × 108 in)",
        mattressFit: "Up to 36 cm depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.0,
        isDefault: true
      },
      {
        id: "king",
        label: "King",
        sheetDimensions: "275 × 275 cm (108 × 108 in)",
        mattressFit: "Up to 40 cm depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.15
      },
      {
        id: "superking",
        label: "Super King",
        sheetDimensions: "275 × 305 cm (108 × 120 in)",
        mattressFit: "Up to 45 cm depth",
        includes: "1 Flat Sheet + 2 King Pillowcases",
        priceMultiplier: 1.25
      }
    ],
    pillowDimensions: "46 × 70 cm (18 × 28 in) with deep 20 cm envelope closure",
    careInstructions: [
      "Machine wash gentle at 30°C / 85°F",
      "Do not soak in bleach or chlorine",
      "Tumble dry low or line dry in gentle breeze",
      "Warm iron if desired; natural relaxed rumple is encouraged"
    ],
    craftNotes: "Yarns are spun on traditional charkha spinners and dyed in cold indigo vats before being mounted on slow wooden looms.",
    sustainabilityImpact: "Zero chemical sizing agents used throughout the weaving cycle."
  },
  {
    id: "sku-03",
    skuCode: "LIVY-SKU-03",
    name: "Botanical Sprig",
    subtitle: "Warm ivory bedsheet with a subtle botanical motif",
    collection: "Botanical & Meadow",
    category: "botanical",
    priceINR: 5400,
    priceUSD: 70,
    priceEUR: 65,
    priceGBP: 56,
    rating: 5.0,
    reviewCount: 44,
    isBestseller: true,
    isNew: false,
    tagline: "Quiet Woodland Flora",
    shortDescription: "Delicate hand-carved botanical sprigs floating over a warm ivory bed of long-staple Indian cotton, imparting organic serenity.",
    fullDescription: "Botanical Sprig embodies the philosophy of LIVY: quiet, intentional, and intimately tied to nature. Small clusters of herbal flora are pressed by master block carvers onto undyed ivory cotton. The resulting texture is delightfully smooth, offering an unhurried morning calm that transforms bedroom retreats.",
    artisanCluster: "Bagru, Rajasthan",
    craftTechnique: "Mud-resist (Dabu) and natural alum dye immersion",
    fabricComposition: "100% Long-Staple Combed Cotton",
    threadCount: "420 TC Satin-Crisp Percale",
    weaveType: "Silky Percale (Luxe Matte Sheen)",
    images: {
      folded: "assets/products/sku-03-folded-clean.png",
      lifestyle: "assets/products/sku-03-lifestyle.png",
      foldedHD: "assets/products/sku-03-folded-hd-clean.png",
      lifestyleHD: "assets/products/sku-03-lifestyle-hd.png"
    },
    palette: [
      { name: "Warm Ivory", hex: "#F5E8DC" },
      { name: "Clay Ink", hex: "#1A1A2A" },
      { name: "Earthy Bark", hex: "#7A6455" }
    ],
    sizes: [
      {
        id: "single",
        label: "Single",
        sheetDimensions: "150 × 250 cm (60 × 98 in)",
        mattressFit: "Up to 30 cm depth",
        includes: "1 Flat Sheet + 1 Standard Pillowcase",
        priceMultiplier: 0.8
      },
      {
        id: "queen",
        label: "Queen",
        sheetDimensions: "230 × 275 cm (90 × 108 in)",
        mattressFit: "Up to 36 cm depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.0,
        isDefault: true
      },
      {
        id: "king",
        label: "King",
        sheetDimensions: "275 × 275 cm (108 × 108 in)",
        mattressFit: "Up to 40 cm depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.15
      },
      {
        id: "superking",
        label: "Super King",
        sheetDimensions: "275 × 305 cm (108 × 120 in)",
        mattressFit: "Up to 45 cm depth",
        includes: "1 Flat Sheet + 2 King Pillowcases",
        priceMultiplier: 1.25
      }
    ],
    pillowDimensions: "46 × 70 cm (18 × 28 in) with deep 20 cm envelope closure",
    careInstructions: [
      "Gentle cycle with cool water (30°C)",
      "Wash inside out with gentle detergent",
      "Air dry flat or line dry away from direct scorching sun",
      "Medium iron for structured elegance"
    ],
    craftNotes: "Printed by third-generation artisan families using century-old wooden block stamps with natural tannin mordants.",
    sustainabilityImpact: "Biodegradable, zero synthetic microplastics, fully compostable packaging."
  },
  {
    id: "sku-04",
    skuCode: "LIVY-SKU-04",
    name: "Minimal Dash",
    subtitle: "Neutral bedsheet with a restrained linear print",
    collection: "Quiet Lines",
    category: "minimal",
    priceINR: 4800,
    priceUSD: 62,
    priceEUR: 56,
    priceGBP: 49,
    rating: 4.8,
    reviewCount: 22,
    isBestseller: false,
    isNew: false,
    tagline: "Meditative Loom Rhythms",
    shortDescription: "A rhythmic cadence of miniature hand-stamped dashes, expressing the quiet simplicity of contemporary Indian architecture.",
    fullDescription: "Inspired by the tally marks etched into wooden weaver looms, Minimal Dash speaks to the modern minimalist. Its restrained, warm monochrome palette blends seamlessly with oak, limestone, and raw plaster spaces, inviting effortless rest with tactile softness.",
    artisanCluster: "Patan, Gujarat & Barmer, Rajasthan",
    craftTechnique: "Precision micro-stamp block printing on washed percale",
    fabricComposition: "100% GOTS-Certified Organic Cotton",
    threadCount: "400 TC Cool Weave",
    weaveType: "Matte Percale (Year-Round Comfort)",
    images: {
      folded: "assets/products/sku-04-folded-clean.png",
      lifestyle: "assets/products/sku-04-lifestyle.png",
      foldedHD: "assets/products/sku-04-folded-hd-clean.png",
      lifestyleHD: "assets/products/sku-04-lifestyle-hd.png"
    },
    palette: [
      { name: "Oat Cream", hex: "#F5E8DC" },
      { name: "Soft Charcoal", hex: "#2C2C38" },
      { name: "Coffee Thread", hex: "#8C6C58" }
    ],
    sizes: [
      {
        id: "single",
        label: "Single",
        sheetDimensions: "150 × 250 cm (60 × 98 in)",
        mattressFit: "Up to 30 cm depth",
        includes: "1 Flat Sheet + 1 Standard Pillowcase",
        priceMultiplier: 0.8
      },
      {
        id: "queen",
        label: "Queen",
        sheetDimensions: "230 × 275 cm (90 × 108 in)",
        mattressFit: "Up to 36 cm depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.0,
        isDefault: true
      },
      {
        id: "king",
        label: "King",
        sheetDimensions: "275 × 275 cm (108 × 108 in)",
        mattressFit: "Up to 40 cm depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.15
      },
      {
        id: "superking",
        label: "Super King",
        sheetDimensions: "275 × 305 cm (108 × 120 in)",
        mattressFit: "Up to 45 cm depth",
        includes: "1 Flat Sheet + 2 King Pillowcases",
        priceMultiplier: 1.25
      }
    ],
    pillowDimensions: "46 × 70 cm (18 × 28 in) with deep 20 cm envelope closure",
    careInstructions: [
      "Machine wash at 30°C with mild liquid detergent",
      "Do not dry clean or use industrial tumble dry",
      "Line dry in partial shade",
      "Steam iron for crisp linen finish"
    ],
    craftNotes: "Each dash is hand-stamped in rhythmic intervals following a hand-measured grid marked with herbal chalk.",
    sustainabilityImpact: "Fair trade certified artisan wages with community health micro-grants."
  },
  {
    id: "sku-05",
    skuCode: "LIVY-SKU-05",
    name: "Indigo Geometry",
    subtitle: "Cream bedsheet with a blue geometric print",
    collection: "Indigo Crafts",
    category: "geometric",
    priceINR: 5600,
    priceUSD: 74,
    priceEUR: 68,
    priceGBP: 59,
    rating: 4.9,
    reviewCount: 52,
    isBestseller: true,
    isNew: true,
    tagline: "Heritage Indigo Diamond Matrix",
    shortDescription: "Geometric medallion diamonds in authentic fermented Indian indigo, hand-pressed over an unbleached cream cotton foundation.",
    fullDescription: "Rooted in India's millennia-old indigo mastery, Indigo Geometry pairs mathematical harmony with artisan unpredictability. Hand-pressed with hand-carved acacia wood blocks into pure plant-fermented indigo, every diamond reveals deep celestial blues and subtle tone gradients that celebrate the poetry of human craft.",
    artisanCluster: "Akola & Bagru, Rajasthan",
    craftTechnique: "Natural indigo vat immersion with wooden block resist",
    fabricComposition: "100% Long-Staple Indian Combed Cotton",
    threadCount: "400 TC Royal Percale",
    weaveType: "Matte Smooth Percale",
    images: {
      folded: "assets/products/sku-05-folded-clean.png",
      lifestyle: "assets/products/sku-05-lifestyle.png",
      foldedHD: "assets/products/sku-05-folded-hd-clean.png",
      lifestyleHD: "assets/products/sku-05-lifestyle-hd.png"
    },
    palette: [
      { name: "Warm Cream", hex: "#F5E8DC" },
      { name: "Royal Indigo", hex: "#2D36A8" },
      { name: "Ink Black", hex: "#1A1A2A" }
    ],
    sizes: [
      {
        id: "single",
        label: "Single",
        sheetDimensions: "150 × 250 cm (60 × 98 in)",
        mattressFit: "Up to 30 cm depth",
        includes: "1 Flat Sheet + 1 Standard Pillowcase",
        priceMultiplier: 0.8
      },
      {
        id: "queen",
        label: "Queen",
        sheetDimensions: "230 × 275 cm (90 × 108 in)",
        mattressFit: "Up to 36 cm depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.0,
        isDefault: true
      },
      {
        id: "king",
        label: "King",
        sheetDimensions: "275 × 275 cm (108 × 108 in)",
        mattressFit: "Up to 40 cm depth",
        includes: "1 Flat Sheet + 2 Standard Pillowcases",
        priceMultiplier: 1.15
      },
      {
        id: "superking",
        label: "Super King",
        sheetDimensions: "275 × 305 cm (108 × 120 in)",
        mattressFit: "Up to 45 cm depth",
        includes: "1 Flat Sheet + 2 King Pillowcases",
        priceMultiplier: 1.25
      }
    ],
    pillowDimensions: "46 × 70 cm (18 × 28 in) with deep 20 cm envelope closure",
    careInstructions: [
      "First wash separate in cold water with a pinch of sea salt to set natural indigo",
      "Subsequent washes at 30°C with mild wool/linen detergent",
      "Do not dry under direct harsh desert sunlight",
      "Iron on cotton setting while slightly damp"
    ],
    craftNotes: "Indigo vats are biologically fermented for over 25 days using jaggery and lime before being stamped by master artisans.",
    sustainabilityImpact: "100% natural plant pigment without petroleum or synthetic petrochemical fixatives."
  }
];

const LIVY_COLLECTIONS = [
  { id: "all", name: "All Pieces", count: 5, description: "The complete five-piece foundational bedding suite." },
  { id: "botanical", name: "Botanical & Meadow", count: 2, description: "Intricate floral and sprig block motifs celebrating Rajasthan flora." },
  { id: "minimal", name: "Quiet Lines", count: 2, description: "Understated pinstripes and dash rhythms for meditative living." },
  { id: "geometric", name: "Indigo Crafts", count: 1, description: "Deep indigo vat geometries honoring ancient Indian dye heritage." }
];

const CURRENCIES = {
  INR: { symbol: "₹", rate: 1.0, label: "INR (₹)" },
  USD: { symbol: "$", rate: 0.012, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.011, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.0095, label: "GBP (£)" }
};

if (typeof module !== 'undefined') {
  module.exports = { LIVY_PRODUCTS, LIVY_COLLECTIONS, CURRENCIES };
}

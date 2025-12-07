/**
 * Categories Mock Data
 * Product categories for marine equipment brands
 * Structure: Brand → Category → Products
 */

import { Category } from "../types";

/**
 * CATEGORIES DATA
 * Categories organized by brand (e.g., WARTSILA → 32, 36, 38A, 46)
 */
export const categories: Category[] = [
  // ===== WARTSILA CATEGORIES =====
  {
    id: "wartsila-16",
    name: "16",
    slug: "16",
    brandId: "wartsila-16",
    description: "WARTSILA 16 series marine diesel engines",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "wartsila-20",
    name: "20",
    slug: "20",
    brandId: "wartsila-16",
    description: "WARTSILA 20 series marine diesel engines",
    order: 2,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "wartsila-26",
    name: "26",
    slug: "26",
    brandId: "wartsila-16",
    description: "WARTSILA 26 series marine diesel engines",
    order: 3,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "wartsila-32",
    name: "32",
    slug: "32",
    brandId: "wartsila-16",
    description: "WARTSILA 32 series marine diesel engines",
    order: 4,
    productCount: 15,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "wartsila-34",
    name: "34",
    slug: "34",
    brandId: "wartsila-16",
    description: "WARTSILA 34 series marine diesel engines",
    order: 5,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "wartsila-36",
    name: "36",
    slug: "36",
    brandId: "wartsila-16",
    description: "WARTSILA 36 series marine diesel engines",
    order: 6,
    productCount: 12,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "wartsila-38a",
    name: "38A",
    slug: "38a",
    brandId: "wartsila-16",
    description: "WARTSILA 38A series marine diesel engines",
    order: 7,
    productCount: 10,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "wartsila-46",
    name: "46",
    slug: "46",
    brandId: "wartsila-16",
    description: "WARTSILA 46 series marine diesel engines",
    order: 8,
    productCount: 8,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "wartsila-64",
    name: "64",
    slug: "64",
    brandId: "wartsila-16",
    description: "WARTSILA 64 series marine diesel engines",
    order: 9,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== CATERPILLAR CATEGORIES =====
  {
    id: "caterpillar-34-series",
    name: "34 Series",
    slug: "34-series",
    brandId: "caterpillar-8",
    description: "Caterpillar 34 series industrial and marine engines",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-35-series",
    name: "35 Series",
    slug: "35-series",
    brandId: "caterpillar-8",
    description: "Caterpillar 35 series industrial and marine engines",
    order: 2,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3406",
    name: "3406",
    slug: "3406",
    brandId: "caterpillar-8",
    description: "Caterpillar 3406 series diesel engines",
    order: 3,
    productCount: 5,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3408",
    name: "3408",
    slug: "3408",
    brandId: "caterpillar-8",
    description: "Caterpillar 3408 series diesel engines",
    order: 4,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3412",
    name: "3412",
    slug: "3412",
    brandId: "caterpillar-8",
    description: "Caterpillar 3412 series diesel engines",
    order: 5,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3508",
    name: "3508",
    slug: "3508",
    brandId: "caterpillar-8",
    description: "Caterpillar 3508 series diesel engines",
    order: 6,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3512",
    name: "3512",
    slug: "3512",
    brandId: "caterpillar-8",
    description: "Caterpillar 3512 series diesel engines",
    order: 7,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3516",
    name: "3516",
    slug: "3516",
    brandId: "caterpillar-8",
    description: "Caterpillar 3516 series diesel engines",
    order: 8,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3600",
    name: "3600",
    slug: "3600",
    brandId: "caterpillar-8",
    description: "Caterpillar 3600 series diesel engines",
    order: 9,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3608",
    name: "3608",
    slug: "3608",
    brandId: "caterpillar-8",
    description: "Caterpillar 3608 series diesel engines",
    order: 10,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "caterpillar-3612",
    name: "3612",
    slug: "3612",
    brandId: "caterpillar-8",
    description: "Caterpillar 3612 series diesel engines",
    order: 11,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== CUMMINS CATEGORIES =====
  {
    id: "cummins-kt19",
    name: "KT19",
    slug: "kt19",
    brandId: "cummins-18",
    description: "Cummins KT19 series diesel engines",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "cummins-kt38",
    name: "KT38",
    slug: "kt38",
    brandId: "cummins-18",
    description: "Cummins KT38 series diesel engines",
    order: 2,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "cummins-kt50",
    name: "KT50",
    slug: "kt50",
    brandId: "cummins-18",
    description: "Cummins KT50 series diesel engines",
    order: 3,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== MAN B&W CATEGORIES =====
  {
    id: "man-l23-30",
    name: "L23/30",
    slug: "l23-30",
    brandId: "man-11",
    description: "MAN B&W L23/30 series diesel engines",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "man-l27-38",
    name: "L27/38",
    slug: "l27-38",
    brandId: "man-11",
    description: "MAN B&W L27/38 series diesel engines",
    order: 2,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "man-l32-40",
    name: "L32/40",
    slug: "l32-40",
    brandId: "man-11",
    description: "MAN B&W L32/40 series diesel engines",
    order: 3,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "man-l35-44",
    name: "L35/44",
    slug: "l35-44",
    brandId: "man-11",
    description: "MAN B&W L35/44 series diesel engines",
    order: 4,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== ROLLS-ROYCE CATEGORIES =====
  {
    id: "rolls-royce-bergen-b32-40",
    name: "Bergen B32:40",
    slug: "bergen-b32-40",
    brandId: "rolls-royce-21",
    description: "Rolls-Royce Bergen B32:40 series diesel engines",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "rolls-royce-bergen-c25-33",
    name: "Bergen C25:33",
    slug: "bergen-c25-33",
    brandId: "rolls-royce-21",
    description: "Rolls-Royce Bergen C25:33 series diesel engines",
    order: 2,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== YANMAR CATEGORIES =====
  {
    id: "yanmar-6eal",
    name: "6EAL",
    slug: "6eal",
    brandId: "yanmar-27",
    description: "Yanmar 6EAL series marine diesel engines",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "yanmar-6n18",
    name: "6N18",
    slug: "6n18",
    brandId: "yanmar-27",
    description: "Yanmar 6N18 series marine diesel engines",
    order: 2,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
  {
    id: "yanmar-6n21",
    name: "6N21",
    slug: "6n21",
    brandId: "yanmar-27",
    description: "Yanmar 6N21 series marine diesel engines",
    order: 3,
    productCount: 0,
    thumbnail: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // Additional brands can have generic "Parts & Accessories" category

  // ===== DAIHATSU CATEGORIES =====
  {
    id: "daihatsu-parts",
    name: "Engine Parts",
    slug: "engine-parts",
    brandId: "daihatsu-9",
    description: "Daihatsu marine engine parts and accessories",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== DEUTZ CATEGORIES =====
  {
    id: "deutz-parts",
    name: "Engine Parts",
    slug: "engine-parts",
    brandId: "deutz-10",
    description: "Deutz marine engine parts and accessories",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== MAK CATEGORIES =====
  {
    id: "mak-parts",
    name: "Engine Parts",
    slug: "engine-parts",
    brandId: "mak-12",
    description: "MAK marine engine parts and accessories",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== HYUNDAI HIMSEN CATEGORIES =====
  {
    id: "hyundai-himsen-parts",
    name: "Engine Parts",
    slug: "engine-parts",
    brandId: "hyundai-himsen-19",
    description: "Hyundai HiMSEN marine engine parts and accessories",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== MITSUBISHI CATEGORIES =====
  {
    id: "mitsubishi-parts",
    name: "Engine Parts",
    slug: "engine-parts",
    brandId: "mitsubishi-13",
    description: "Mitsubishi marine engine parts and accessories",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },

  // ===== MTU CATEGORIES =====
  {
    id: "mtu-parts",
    name: "Engine Parts",
    slug: "engine-parts",
    brandId: "mtu-14",
    description: "MTU marine engine parts and accessories",
    order: 1,
    productCount: 0,
    thumbnail: "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-12-07"),
  },
];

/**
 * HELPER FUNCTIONS
 */

/**
 * Get all categories for a specific brand
 */
export const getCategoriesByBrand = (brandId: string): Category[] => {
  return categories
    .filter((category) => category.brandId === brandId)
    .sort((a, b) => a.order - b.order);
};

/**
 * Get a single category by slug and brand
 */
export const getCategoryBySlug = (
  brandId: string,
  slug: string
): Category | undefined => {
  return categories.find(
    (category) => category.brandId === brandId && category.slug === slug
  );
};

/**
 * Get a category by ID
 */
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

/**
 * Get products count for a brand across all categories
 */
export const getBrandProductCount = (brandId: string): number => {
  return categories
    .filter((category) => category.brandId === brandId)
    .reduce((sum, category) => sum + category.productCount, 0);
};

/**
 * Get categories count for a brand
 */
export const getBrandCategoryCount = (brandId: string): number => {
  return categories.filter((category) => category.brandId === brandId).length;
};

/**
 * Search categories by name
 */
export const searchCategories = (query: string): Category[] => {
  const lowerQuery = query.toLowerCase();
  return categories.filter(
    (category) =>
      category.name.toLowerCase().includes(lowerQuery) ||
      category.description?.toLowerCase().includes(lowerQuery)
  );
};

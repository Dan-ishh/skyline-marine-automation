/**
 * Data Utility Functions
 * Helper functions to query and filter products, brands, and categories
 * This is the core of your static data management system
 */

import { Product } from "../types/product.types";
import { Brand } from "../types/brand.types";
import { products } from "../data/products";
import { brands } from "../data/brands";

/**
 * ============================================================
 * PRODUCT FILTERING FUNCTIONS
 * ============================================================
 */

/**
 * Get products filtered by main category and optional sub-category
 * Used for Marine Spare Parts filtering
 *
 * @example
 * // Get all marine spare parts
 * getProductsByMainCategory("marine-spare-parts")
 *
 * // Get all air valve products
 * getProductsByMainCategory("marine-spare-parts", "air-valve")
 *
 * // Get all complete engine products
 * getProductsByMainCategory("complete-engine")
 */
export const getProductsByMainCategory = (
  mainCategory: string,
  subCategory?: string
): Product[] => {
  return products.filter((product) => {
    // Filter by main category
    if (product.mainCategory !== mainCategory) return false;
    // Filter by sub-category if provided
    if (subCategory && product.subCategory !== subCategory) return false;
    return true;
  });
};

/**
 * Get products filtered by brand and main category
 * Used when viewing a brand's products in a specific category
 *
 * @example
 * // Get all Wärtsilä air valve products
 * getProductsByBrandAndCategory("wartsila-16", "marine-spare-parts", "air-valve")
 *
 * // Get all Caterpillar complete engine products
 * getProductsByBrandAndCategory("caterpillar-8", "complete-engine")
 */
export const getProductsByBrandAndCategory = (
  brandId: string,
  mainCategory: string,
  subCategory?: string
): Product[] => {
  return products.filter((product) => {
    if (product.brandId !== brandId) return false;
    if (product.mainCategory !== mainCategory) return false;
    if (subCategory && product.subCategory !== subCategory) return false;
    return true;
  });
};

/**
 * Get a single product by its slug
 * Used on individual product detail pages
 *
 * @example
 * // Get product with slug "air-valve-assembly"
 * getProductBySlug("air-valve-assembly")
 */
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.filter((p) => p.slug === slug)[0];
};

/**
 * Get all products for a specific brand across all categories
 * Used when you need all products from one brand
 *
 * @example
 * // Get all Wärtsilä products (all categories)
 * getProductsByBrand("wartsila-16")
 */
export const getProductsByBrand = (brandId: string): Product[] => {
  return products.filter((product) => product.brandId === brandId);
};

/**
 * ============================================================
 * BRAND FILTERING FUNCTIONS
 * ============================================================
 */

/**
 * Get unique brands that have products in a specific main category
 * Used to display brand listings on category pages
 * This is the PRIMARY function to use for category-specific brand filtering
 *
 * @example
 * // Get all brands with generator products
 * getBrandsInMainCategory("generators")
 *
 * // Get all brands with complete engine products
 * getBrandsInMainCategory("complete-engine")
 *
 * // Get all brands with air valve products in marine-spare-parts
 * getBrandsInMainCategory("marine-spare-parts", "air-valve")
 */
export const getBrandsInMainCategory = (
  mainCategory: string,
  subCategory?: string
): Brand[] => {
  const filteredProducts = getProductsByMainCategory(mainCategory, subCategory);
  const brandIds = [...new Set(filteredProducts.map((p) => p.brandId))];
  return brandIds
    .map((brandId) => brands.find((b) => b.id === brandId))
    .filter((brand): brand is Brand => Boolean(brand));
};

/**
 * Alias for getBrandsInMainCategory - Get brands with products in a category
 * Used on category pages to display only relevant brands
 *
 * @example
 * // Get all brands that have generator products
 * getBrandsByCategory("generators")
 */
export const getBrandsByCategory = (
  mainCategory: string,
  subCategory?: string
): Brand[] => {
  return getBrandsInMainCategory(mainCategory, subCategory);
};

/**
 * Get unique brands from a given list of products
 * Internal utility function
 */
export const getUniqueBrandsFromProducts = (
  productList: Product[]
): Brand[] => {
  const brandIds = [...new Set(productList.map((p) => p.brandId))];
  return brandIds
    .map((brandId) => brands.find((b) => b.id === brandId))
    .filter((brand): brand is Brand => Boolean(brand));
};

/**
 * Get a brand by ID
 * Used for displaying brand information
 *
 * @example
 * // Get Wärtsilä brand
 * getBrandById("wartsila-16")
 */
export const getBrandById = (id: string): Brand | undefined => {
  return brands.find((brand) => brand.id === id);
};

/**
 * Get a brand by slug
 * Used in routing when slug is extracted from URL
 *
 * @example
 * // Get brand from URL slug
 * getBrandBySlug("wartsila")
 */
export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find((brand) => brand.slug === slug);
};

/**
 * ============================================================
 * BREADCRUMB & NAVIGATION FUNCTIONS
 * ============================================================
 */

/**
 * Get breadcrumb data for any main category
 * Used for generating consistent breadcrumb navigation
 *
 * @example
 * getCategoryBreadcrumb("complete-engine")
 * // Returns: { name: "Complete Engine", slug: "complete-engine" }
 *
 * getCategoryBreadcrumb("generators")
 * // Returns: { name: "Generators", slug: "generators" }
 */
export const getCategoryBreadcrumb = (
  mainCategory: string
): { name: string; slug: string } => {
  const categoryMap: { [key: string]: { name: string; slug: string } } = {
    "marine-spare-parts": {
      name: "Marine Spare Parts",
      slug: "marine-spare-parts",
    },
    "complete-engine": { name: "Complete Engine", slug: "complete-engine" },
    generators: { name: "Generators", slug: "generators" },
    turbochargers: { name: "Turbochargers", slug: "turbochargers" },
  };

  return (
    categoryMap[mainCategory] || { name: mainCategory, slug: mainCategory }
  );
};

/**
 * Get breadcrumb data for Marine Spare Parts sub-category
 * Returns object with main category and sub-category info
 *
 * @example
 * const breadcrumb = getMarineSparePartsBreadcrumb("air-valve")
 * // Returns: { mainCategory: "Marine Spare Parts", subCategory: "Air Valve", ... }
 */
export const getMarineSparePartsBreadcrumb = (
  subCategorySlug: string | undefined
) => {
  if (!subCategorySlug) {
    return {
      mainCategory: "Marine Spare Parts",
      mainCategorySlug: "marine-spare-parts",
      subCategory: null,
      subCategorySlug: null,
    };
  }

  // Map sub-category slugs to names
  const subCategoryMap: { [key: string]: string } = {
    "air-valve": "Air Valve",
    "cylinder-head": "Cylinder Head",
    "cylinder-liner": "Cylinder Liner",
    "connecting-rod": "Connecting Rod",
    "indicator-valve": "Indicator Valve",
    "piston-head": "Piston Head",
    "piston-rod": "Piston Rod",
    "piston-skirt": "Piston Skirt",
    "cylinder-head-water-jacket": "Cylinder Head Water Jacket",
    "cylinder-water-jacket": "Cylinder Water Jacket",
    camshaft: "Camshaft",
    crankshaft: "Crankshaft",
    "fuel-injector": "Fuel Injector",
    "safety-valve": "Safety Valve",
    "valve-box": "Valve Box",
    "valve-seat": "Valve Seat",
  };

  return {
    mainCategory: "Marine Spare Parts",
    mainCategorySlug: "marine-spare-parts",
    subCategory: subCategoryMap[subCategorySlug] || null,
    subCategorySlug,
  };
};

/**
 * ============================================================
 * All functions are already exported above
 * ============================================================
 */

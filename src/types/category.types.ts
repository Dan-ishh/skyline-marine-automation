/**
 * Category Type Definitions
 * Represents categories for products in the marine equipment portal
 * Structure: Brand → Category → Products
 */

import { Brand } from "./brand.types";

/**
 * Product Category - Direct level under Brand
 * Example: WARTSILA → 32, 36, 38A, 46
 * Example: CATERPILLAR → 3406, 3408, 3412, 3508
 */
export interface Category {
  /** Unique identifier for the category */
  id: string;

  /** Category name/number (e.g., "32", "36", "3406", "3508") */
  name: string;

  /** URL-friendly slug for routing */
  slug: string;

  /** Brand ID this category belongs to */
  brandId: string;

  /** Brand object reference (optional) */
  brand?: Brand;

  /** Category description */
  description?: string;

  /** Display order for sorting */
  order: number;

  /** Number of products in this category */
  productCount: number;

  /** Thumbnail image for category */
  thumbnail?: string;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Brand with Categories - For brand page and menu display
 */
export interface BrandWithCategories {
  brand: Brand;
  categories: Category[];
}

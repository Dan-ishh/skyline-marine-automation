/**
 * Product Type Definitions
 * Represents products in the marine equipment portal
 * Structure: Brand → Category → Product
 */

import { Brand } from "./brand.types";
import { Category } from "./category.types";

export interface Product {
  /** Unique identifier for the product */
  id: string;

  /** Product name */
  name: string;

  /** URL-friendly slug for routing */
  slug: string;

  /** Brand ID (foreign key) */
  brandId: string;

  /** Brand object reference (optional, populated when needed) */
  brand?: Brand;

  /** Category ID (foreign key) - Optional for backward compatibility */
  categoryId?: string;

  /** Category object reference (optional) */
  category?: Category | string;

  /** Array of product image URLs */
  images: string[];

  /** Primary thumbnail image (optional) */
  thumbnail?: string;

  /** Detailed product description */
  description: string;

  /** Product specifications as key-value pairs */
  specifications: Record<string, string>;

  /** Product price (optional, 0 means price on request) */
  price?: number;

  /** Availability status */
  inStock: boolean;

  /** Number of inquiries received for this product */
  enquiryCount: number;

  /** Flag for featured products (shown prominently) */
  featured: boolean;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Simplified Product for card/list views
 */
export interface ProductCard {
  id: string;
  name: string;
  slug: string;
  brandName: string;
  brandSlug: string;
  categoryName: string;
  categorySlug: string;
  thumbnail: string;
  price?: number;
  enquiryCount: number;
}

/**
 * Product filter options
 */
export interface ProductFilter {
  brandId?: string;
  categoryId?: string;
  searchQuery?: string;
  sortBy?: "name" | "date" | "popularity";
  sortOrder?: "asc" | "desc";
}

/**
 * Simplified Product option for select dropdowns
 */
export interface ProductOption {
  value: string;
  label: string;
  brandId: string;
}

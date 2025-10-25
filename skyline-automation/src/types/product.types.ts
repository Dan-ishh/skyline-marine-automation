/**
 * Product Type Definitions
 * Represents products in the marine equipment portal
 */

import { Brand } from "./brand.types";

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

  /** Array of product image URLs */
  images: string[];

  /** Primary thumbnail image (optional) */
  thumbnail?: string;

  /** Detailed product description */
  description: string;

  /** Product specifications as key-value pairs */
  specifications: Record<string, string>;

  /** Product category (e.g., "Main Engines", "Automation", "Hydraulic Pump") */
  category: string;

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
  thumbnail: string;
  category?: string;
  price?: number;
  enquiryCount: number;
}

/**
 * Product filter options
 */
export interface ProductFilter {
  brandId?: string;
  category?: string;
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

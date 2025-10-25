/**
 * Brand Type Definitions
 * Represents a brand/manufacturer in the marine equipment portal
 */

export interface Brand {
  /** Unique identifier for the brand */
  id: string;

  /** Brand name */
  name: string;

  /** URL-friendly slug for routing */
  slug: string;

  /** Path to brand logo image */
  logo: string;

  /** Brand description/bio */
  description?: string;

  /** Brand website URL */
  website?: string;

  /** Number of products for this brand */
  productCount?: number;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Simplified Brand option for select dropdowns
 */
export interface BrandOption {
  value: string;
  label: string;
}

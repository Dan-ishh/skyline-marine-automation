/**
 * Inquiry Type Definitions
 * Represents customer inquiries and the inquiry form
 */

/**
 * Inquiry status types
 */
export type InquiryStatus = "pending" | "contacted" | "closed";

/**
 * Inquiry form data structure
 */
export interface InquiryForm {
  /** Customer name (required) */
  name: string;

  /** Customer email (required) */
  email: string;

  /** Customer phone number (optional) */
  phone?: string;

  /** Selected brand ID (required) */
  brandId: string;

  /** Selected product ID (required) */
  productId: string;

  /** Additional message/inquiry details (optional) */
  message?: string;
}

/**
 * Complete inquiry record with metadata
 */
export interface Inquiry extends InquiryForm {
  /** Unique inquiry identifier */
  id: string;

  /** Inquiry status */
  status: InquiryStatus;

  /** Submission timestamp */
  createdAt: Date;
}

/**
 * Inquiry form validation errors
 */
export interface InquiryFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  brandId?: string;
  productId?: string;
  message?: string;
}

/**
 * Prefilled data for inquiry modal
 */
export interface InquiryPrefillData {
  brandId?: string;
  brandName?: string;
  productId?: string;
  productName?: string;
}

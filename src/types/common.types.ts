/**
 * Common Type Definitions
 * Shared types used across the application
 */

/**
 * Generic API Response wrapper
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Select option for React Select component
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Pagination data structure
 */
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Loading state types
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Sort order types
 */
export type SortOrder = "asc" | "desc";

/**
 * Breakpoint types for responsive design
 */
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

/**
 * Image data structure
 */
export interface ImageData {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Navigation link structure
 */
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

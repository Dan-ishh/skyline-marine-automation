/**
 * Product Utilities
 * Helper functions for product operations
 */

import type { Product, Category } from "../types";

/**
 * Get category name from product
 * Handles both old string format and new Category object format
 */
export const getProductCategoryName = (product: Product): string => {
  if (!product.category) return "";
  if (typeof product.category === "string") return product.category;
  if (typeof product.category === "object" && "name" in product.category) {
    return product.category.name;
  }
  return "";
};

/**
 * Get category display string for product
 */
export const getProductCategoryDisplay = (product: Product): string => {
  const categoryName = getProductCategoryName(product);
  return categoryName || "Uncategorized";
};

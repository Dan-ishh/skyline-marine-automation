/**
 * Product Store
 * Manages product-related state using Zustand
 */

import { create } from "zustand";
import { Product, ProductFilter } from "../types";

interface ProductState {
  // State
  products: Product[];
  latestProducts: Product[];
  mostEnquired: Product[];
  selectedProduct: Product | null;
  filters: ProductFilter;
  loading: boolean;
  error: string | null;

  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductsByBrand: (brandId: string) => Promise<void>;
  fetchProductBySlug: (brandSlug: string, productSlug: string) => Promise<void>;
  fetchLatestProducts: () => Promise<void>;
  fetchMostEnquired: () => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  setFilters: (filters: Partial<ProductFilter>) => void;
  clearFilters: () => void;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  // Initial state
  products: [],
  latestProducts: [],
  mostEnquired: [],
  selectedProduct: null,
  filters: {},
  loading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/products');
      // const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 500));

      set({ products: [], loading: false });
      console.log("Products fetched successfully");
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
        loading: false,
      });
    }
  },

  // Fetch products by brand
  fetchProductsByBrand: async (brandId: string) => {
    set({ loading: true, error: null });

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filter products by brand from existing products
      const { products } = get();
      const brandProducts = products.filter((p) => p.brandId === brandId);

      set({ products: brandProducts, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
        loading: false,
      });
    }
  },

  // Fetch product by slug
  fetchProductBySlug: async (brandSlug: string, productSlug: string) => {
    set({ loading: true, error: null });

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { products } = get();
      const product = products.find(
        (p) => p.slug === productSlug && p.brand.slug === brandSlug
      );

      if (!product) {
        throw new Error("Product not found");
      }

      set({ selectedProduct: product, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch product",
        loading: false,
      });
    }
  },

  // Fetch latest products
  fetchLatestProducts: async () => {
    set({ loading: true, error: null });

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { products } = get();
      const latest = products
        .filter((p) => p.isLatest)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 8);

      set({ latestProducts: latest, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch latest products",
        loading: false,
      });
    }
  },

  // Fetch most enquired products
  fetchMostEnquired: async () => {
    set({ loading: true, error: null });

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { products } = get();
      const mostEnquired = products
        .sort((a, b) => b.enquiryCount - a.enquiryCount)
        .slice(0, 8);

      set({ mostEnquired, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch most enquired products",
        loading: false,
      });
    }
  },

  // Set selected product
  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  // Set filters
  setFilters: (newFilters: Partial<ProductFilter>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  // Clear filters
  clearFilters: () => {
    set({ filters: {} });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

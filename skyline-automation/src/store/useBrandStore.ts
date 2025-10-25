/**
 * Brand Store
 * Manages brand-related state using Zustand
 */

import { create } from "zustand";
import { Brand } from "../types";
import { getAllBrands, getBrandBySlug } from "../data";

interface BrandState {
  // State
  brands: Brand[];
  selectedBrand: Brand | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchBrands: () => Promise<void>;
  fetchBrandBySlug: (slug: string) => Promise<void>;
  setSelectedBrand: (brand: Brand | null) => void;
  clearError: () => void;
}

export const useBrandStore = create<BrandState>((set, get) => ({
  // Initial state
  brands: [],
  selectedBrand: null,
  loading: false,
  error: null,

  // Fetch all brands
  fetchBrands: async () => {
    set({ loading: true, error: null });

    try {
      // Simulating API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 300));

      const brands = getAllBrands();
      set({ brands, loading: false });

      console.log("Brands fetched successfully:", brands.length);
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch brands",
        loading: false,
      });
    }
  },

  // Fetch brand by slug
  fetchBrandBySlug: async (slug: string) => {
    set({ loading: true, error: null });

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const brand = getBrandBySlug(slug);

      if (!brand) {
        throw new Error("Brand not found");
      }

      set({ selectedBrand: brand, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch brand",
        loading: false,
      });
    }
  },

  // Set selected brand
  setSelectedBrand: (brand: Brand | null) => {
    set({ selectedBrand: brand });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

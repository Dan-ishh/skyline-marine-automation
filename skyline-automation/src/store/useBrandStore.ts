/**
 * Brand Store
 * Manages brand-related state using Zustand
 */

import { create } from "zustand";
import { Brand } from "../types";

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
      // TODO: Replace with actual API call
      // const response = await fetch('/api/brands');
      // const data = await response.json();

      // Simulating API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data will be imported here
      // For now, set empty array
      set({ brands: [], loading: false });

      console.log("Brands fetched successfully");
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
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/brands/${slug}`);
      // const data = await response.json();

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { brands } = get();
      const brand = brands.find((b) => b.slug === slug);

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

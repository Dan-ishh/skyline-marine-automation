/**
 * UI Store
 * Manages UI-related state (modals, menus, etc.) using Zustand
 */

import { create } from "zustand";
import { InquiryPrefillData } from "../types";

interface UIState {
  // State
  isInquiryModalOpen: boolean;
  prefilledData: InquiryPrefillData | null;
  isMobileMenuOpen: boolean;
  isLoading: boolean;

  // Actions
  openInquiryModal: (prefilled?: InquiryPrefillData) => void;
  closeInquiryModal: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isInquiryModalOpen: false,
  prefilledData: null,
  isMobileMenuOpen: false,
  isLoading: false,

  // Open inquiry modal
  openInquiryModal: (prefilled?: InquiryPrefillData) => {
    set({
      isInquiryModalOpen: true,
      prefilledData: prefilled || null,
    });

    // Prevent body scroll when modal is open
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  },

  // Close inquiry modal
  closeInquiryModal: () => {
    set({
      isInquiryModalOpen: false,
      prefilledData: null,
    });

    // Restore body scroll
    if (typeof window !== "undefined") {
      document.body.style.overflow = "unset";
    }
  },

  // Toggle mobile menu
  toggleMobileMenu: () => {
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    }));

    // Handle body scroll
    if (typeof window !== "undefined") {
      const isOpen = !useUIStore.getState().isMobileMenuOpen;
      document.body.style.overflow = isOpen ? "hidden" : "unset";
    }
  },

  // Close mobile menu
  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false });

    // Restore body scroll
    if (typeof window !== "undefined") {
      document.body.style.overflow = "unset";
    }
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

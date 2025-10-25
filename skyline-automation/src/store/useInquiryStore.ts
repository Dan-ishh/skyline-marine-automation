/**
 * Inquiry Store
 * Manages inquiry form state and submission using Zustand
 */

import { create } from "zustand";
import { Inquiry, InquiryForm, InquiryFormErrors } from "../types";

interface InquiryState {
  // State
  inquiries: Inquiry[];
  currentInquiry: Partial<InquiryForm>;
  submitting: boolean;
  submitSuccess: boolean;
  error: string | null;
  formErrors: InquiryFormErrors;

  // Actions
  submitInquiry: (data: InquiryForm) => Promise<void>;
  setFormData: (data: Partial<InquiryForm>) => void;
  resetForm: () => void;
  validateForm: (data: InquiryForm) => boolean;
  clearError: () => void;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (flexible for different formats)
const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;

export const useInquiryStore = create<InquiryState>((set, get) => ({
  // Initial state
  inquiries: [],
  currentInquiry: {},
  submitting: false,
  submitSuccess: false,
  error: null,
  formErrors: {},

  // Validate form
  validateForm: (data: InquiryForm): boolean => {
    const errors: InquiryFormErrors = {};

    // Name validation
    if (!data.name || data.name.trim().length === 0) {
      errors.name = "Name is required";
    } else if (data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!data.email || data.email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but validate format if provided)
    if (data.phone && data.phone.trim().length > 0) {
      if (!PHONE_REGEX.test(data.phone)) {
        errors.phone = "Please enter a valid phone number";
      }
    }

    // Brand validation
    if (!data.brandId || data.brandId.trim().length === 0) {
      errors.brandId = "Please select a brand";
    }

    // Product validation
    if (!data.productId || data.productId.trim().length === 0) {
      errors.productId = "Please select a product";
    }

    set({ formErrors: errors });
    return Object.keys(errors).length === 0;
  },

  // Submit inquiry
  submitInquiry: async (data: InquiryForm) => {
    const { validateForm } = get();

    // Validate form
    if (!validateForm(data)) {
      return;
    }

    set({ submitting: true, error: null, submitSuccess: false });

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/inquiries', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create inquiry object
      const inquiry: Inquiry = {
        ...data,
        id: `INQ-${Date.now()}`,
        status: "pending",
        createdAt: new Date(),
      };

      // Add to inquiries list
      set((state) => ({
        inquiries: [...state.inquiries, inquiry],
        submitting: false,
        submitSuccess: true,
      }));

      console.log("Inquiry submitted successfully:", inquiry);

      // Auto-reset success message after 3 seconds
      setTimeout(() => {
        set({ submitSuccess: false });
      }, 3000);
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to submit inquiry",
        submitting: false,
        submitSuccess: false,
      });
    }
  },

  // Set form data
  setFormData: (data: Partial<InquiryForm>) => {
    set((state) => ({
      currentInquiry: { ...state.currentInquiry, ...data },
    }));
  },

  // Reset form
  resetForm: () => {
    set({
      currentInquiry: {},
      formErrors: {},
      submitSuccess: false,
      error: null,
    });
  },

  // Clear error
  clearError: () => {
    set({ error: null, formErrors: {} });
  },
}));

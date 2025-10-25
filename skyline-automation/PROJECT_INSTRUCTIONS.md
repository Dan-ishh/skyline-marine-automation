# Skyline Marine Automation - Project Instructions

## 📋 Project Overview

**Project Name:** Skyline Marine Automation Portal  
**Framework:** Next.js (TypeScript, Page Router)  
**State Management:** Zustand  
**Styling:** SCSS/SASS  
**Special Components:** React Select for custom select fields  
**Responsive Design:** Mobile-first, minimum width 320px

## 🎯 Project Purpose

A product portal where users and potential buyers can:

- Browse products by brands
- View detailed product information
- Submit inquiries for products
- Contact the business

---

## 📁 Project Structure

```
skyline-automation/
├── pages/
│   ├── _app.tsx                    # Custom App wrapper
│   ├── _document.tsx               # Custom Document
│   ├── index.tsx                   # Home page
│   ├── brands/
│   │   ├── index.tsx              # All brands listing
│   │   ├── [brandSlug]/
│   │   │   ├── index.tsx          # Brand products listing
│   │   │   └── [productSlug].tsx  # Individual product page
│   └── contact.tsx                 # Contact page
├── src/
│   ├── components/
│   │   ├── common/                # Reusable components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── InquiryPopup/
│   │   │   ├── ImageGallery/
│   │   │   └── Loader/
│   │   ├── layout/                # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Layout/
│   │   ├── home/                  # Home page components
│   │   │   ├── Banner/
│   │   │   ├── LatestProducts/
│   │   │   ├── MostEnquiredProducts/
│   │   │   └── InquirySection/
│   │   ├── brands/                # Brand page components
│   │   │   ├── BrandCard/
│   │   │   └── BrandGrid/
│   │   └── products/              # Product page components
│   │       ├── ProductCard/
│   │       ├── ProductGrid/
│   │       └── ProductDetails/
│   ├── store/                     # Zustand state management
│   │   ├── index.ts              # Export all stores
│   │   ├── useProductStore.ts    # Product state
│   │   ├── useBrandStore.ts      # Brand state
│   │   ├── useInquiryStore.ts    # Inquiry state
│   │   └── useUIStore.ts         # UI state (modals, loading, etc.)
│   ├── types/                     # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── product.types.ts
│   │   ├── brand.types.ts
│   │   ├── inquiry.types.ts
│   │   └── common.types.ts
│   ├── utils/                     # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── api.ts
│   ├── hooks/                     # Custom React hooks
│   │   ├── useResponsive.ts
│   │   └── useInquiry.ts
│   ├── data/                      # Mock data / Static data
│   │   ├── brands.ts
│   │   └── products.ts
│   └── styles/                    # SCSS styles
│       ├── globals.scss           # Global styles
│       ├── variables.scss         # SCSS variables
│       ├── mixins.scss            # SCSS mixins
│       ├── components/            # Component styles
│       └── pages/                 # Page-specific styles
├── public/
│   ├── images/
│   │   ├── brands/
│   │   ├── products/
│   │   └── placeholders/
│   └── icons/
├── PROJECT_INSTRUCTIONS.md        # This file
├── PROMPTS.md                     # Session continuation prompts
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🛠️ Technology Stack

### Core Dependencies

- **next**: ^16.0.0 - Next.js framework
- **react**: ^19.2.0 - React library
- **react-dom**: ^19.2.0 - React DOM
- **typescript**: ^5 - TypeScript
- **zustand**: ^5.0.2 - State management
- **sass**: ^1.83.3 - SCSS preprocessor
- **react-select**: ^5.9.0 - Custom select component

### Development Tools

- **@types/node**: ^20
- **@types/react**: ^19
- **@types/react-dom**: ^19

---

## 📄 Pages Breakdown

### 1. Home Page (`/`)

**Route:** `/`  
**File:** `pages/index.tsx`

**Sections:**

- **Header:** Navigation with links (Home, Brands, Contact)
- **Banner:** Hero section with main CTA
- **Latest Products:** Display 6-8 most recent products
- **Most Enquired Products:** Display 6-8 most popular products
- **Inquiry Form Section:** Embedded contact/inquiry form
- **Footer:** Company info, links, copyright

**Key Features:**

- Responsive grid layout for product cards
- Auto-rotating banner (optional)
- Quick inquiry access from products

---

### 2. Brands Page (`/brands`)

**Route:** `/brands`  
**File:** `pages/brands/index.tsx`

**Content:**

- Grid of all available brands
- Brand cards with logo and name
- Click redirects to brand products page

**Key Features:**

- Searchable/filterable brand list
- Alphabetical sorting option
- Responsive grid (1 col on mobile, 2-3 on tablet, 4+ on desktop)

---

### 3. Brand Products Page (`/brands/[brandSlug]`)

**Route:** `/brands/yamaha` (example)  
**File:** `pages/brands/[brandSlug]/index.tsx`

**Content:**

- Breadcrumb navigation (Home > Brands > Yamaha)
- Brand header with logo and description
- Grid of all products for this brand
- Product cards with image, name, brief info

**Key Features:**

- Filter by category/type
- Sort by name, date, popularity
- "Inquire Now" button on each card
- Pagination for large product lists

---

### 4. Individual Product Page (`/brands/[brandSlug]/[productSlug]`)

**Route:** `/brands/yamaha/outboard-motor-f150` (example)  
**File:** `pages/brands/[brandSlug]/[productSlug].tsx`

**Content:**

- Breadcrumb navigation
- Product image gallery (main + thumbnails)
- Product name and brand
- Detailed specifications
- Description/features
- **"Inquire Now" button** (opens popup)
- Related products section

**Key Features:**

- Image zoom/lightbox
- Spec table layout
- Responsive image gallery
- Share buttons (optional)

---

### 5. Contact Page (`/contact`)

**Route:** `/contact`  
**File:** `pages/contact.tsx`

**Content:**

- Contact information (phone, email, address)
- Google Maps embed (optional)
- Contact form (similar to inquiry popup)
- Business hours

**Key Features:**

- Form validation
- Success/error messages
- "Inquire Now" button (opens same popup as products)

---

## 🔘 Inquiry Popup Modal

### Trigger

- Clicking "Inquire Now" button anywhere on site
- Can be pre-filled with brand/product if triggered from product page

### Form Fields

**Required Fields:**

- **Name** - Text input
- **Email** - Email input with validation
- **Brand** - React Select dropdown (all available brands)
- **Product** - React Select dropdown (products from selected brand)

**Optional Fields:**

- **Phone Number** - Text input with phone format
- **Message** - Textarea for additional info

### Behavior

- Opens as modal overlay (dark background)
- Close button (X) in top-right
- Close on outside click (optional)
- Form validation before submit
- Loading state on submit
- Success message after submission
- Clear form after success

### State Management

Managed in `useInquiryStore.ts` and `useUIStore.ts`

---

## 🎨 Design Requirements

### Responsive Breakpoints

```scss
// SCSS Variables
$breakpoint-xs: 320px; // Extra small devices
$breakpoint-sm: 576px; // Small devices
$breakpoint-md: 768px; // Medium devices
$breakpoint-lg: 992px; // Large devices
$breakpoint-xl: 1200px; // Extra large devices
$breakpoint-xxl: 1400px; // XXL devices
```

### Grid Layout Guidelines

- **Mobile (320px - 575px):** 1 column
- **Tablet (576px - 991px):** 2 columns
- **Desktop (992px+):** 3-4 columns

### Color Scheme

Define in `src/styles/variables.scss`:

```scss
// Example color palette (adjust as needed)
$primary-color: #003366; // Navy blue
$secondary-color: #0066cc; // Light blue
$accent-color: #ff6b00; // Orange
$text-primary: #333333;
$text-secondary: #666666;
$background-light: #ffffff;
$background-gray: #f5f5f5;
$border-color: #dddddd;
$error-color: #d32f2f;
$success-color: #388e3c;
```

### Typography

```scss
$font-family-primary: "Inter", "Roboto", sans-serif;
$font-family-heading: "Poppins", "Montserrat", sans-serif;

$font-size-xs: 0.75rem; // 12px
$font-size-sm: 0.875rem; // 14px
$font-size-base: 1rem; // 16px
$font-size-lg: 1.125rem; // 18px
$font-size-xl: 1.25rem; // 20px
$font-size-2xl: 1.5rem; // 24px
$font-size-3xl: 2rem; // 32px
```

---

## 🗂️ Type Definitions

### Brand Type (`src/types/brand.types.ts`)

```typescript
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
  website?: string;
  productCount?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Product Type (`src/types/product.types.ts`)

```typescript
export interface Product {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  brand: Brand;
  images: string[];
  thumbnail: string;
  description: string;
  specifications: Record<string, string>;
  category?: string;
  price?: number;
  isAvailable: boolean;
  enquiryCount: number;
  isLatest: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Inquiry Type (`src/types/inquiry.types.ts`)

```typescript
export interface InquiryForm {
  name: string;
  email: string;
  phone?: string;
  brandId: string;
  productId: string;
  message?: string;
}

export interface Inquiry extends InquiryForm {
  id: string;
  status: "pending" | "contacted" | "closed";
  createdAt: Date;
}
```

---

## 🔄 State Management (Zustand)

### Product Store (`src/store/useProductStore.ts`)

```typescript
interface ProductState {
  products: Product[];
  latestProducts: Product[];
  mostEnquired: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductsByBrand: (brandId: string) => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
}
```

### Brand Store (`src/store/useBrandStore.ts`)

```typescript
interface BrandState {
  brands: Brand[];
  selectedBrand: Brand | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchBrands: () => Promise<void>;
  fetchBrandBySlug: (slug: string) => Promise<void>;
  setSelectedBrand: (brand: Brand | null) => void;
}
```

### Inquiry Store (`src/store/useInquiryStore.ts`)

```typescript
interface InquiryState {
  inquiries: Inquiry[];
  currentInquiry: InquiryForm | null;
  submitting: boolean;
  submitSuccess: boolean;
  error: string | null;

  // Actions
  submitInquiry: (data: InquiryForm) => Promise<void>;
  resetForm: () => void;
}
```

### UI Store (`src/store/useUIStore.ts`)

```typescript
interface UIState {
  isInquiryModalOpen: boolean;
  prefilledData: Partial<InquiryForm> | null;
  isMobileMenuOpen: boolean;

  // Actions
  openInquiryModal: (prefilled?: Partial<InquiryForm>) => void;
  closeInquiryModal: () => void;
  toggleMobileMenu: () => void;
}
```

---

## 🧩 Component Guidelines

### Common Component Pattern

Each component should follow this structure:

```
ComponentName/
├── index.tsx           # Component logic
├── ComponentName.module.scss  # Component styles
└── ComponentName.types.ts     # Component-specific types (if needed)
```

### Example: Button Component

```typescript
// src/components/common/Button/index.tsx
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  fullWidth = false,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        fullWidth ? styles.fullWidth : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
```

---

## 🎯 Implementation Phases

### Phase 1: Foundation Setup ✅

- [x] Initialize Next.js project with TypeScript
- [x] Install dependencies (Zustand, SASS, React Select)
- [x] Create folder structure
- [ ] Set up TypeScript types
- [ ] Create global SCSS files (variables, mixins, globals)
- [ ] Set up Zustand stores

### Phase 2: Layout & Common Components

- [ ] Create Header component with navigation
- [ ] Create Footer component
- [ ] Create Layout wrapper
- [ ] Create InquiryPopup modal
- [ ] Create Button component
- [ ] Create Card component
- [ ] Create Loader component

### Phase 3: Home Page

- [ ] Create Banner section
- [ ] Create LatestProducts section
- [ ] Create MostEnquiredProducts section
- [ ] Create InquirySection
- [ ] Implement responsive layout
- [ ] Add mock data for testing

### Phase 4: Brands & Products Pages

- [ ] Create Brands listing page
- [ ] Create BrandCard component
- [ ] Create Brand products listing page
- [ ] Create ProductCard component
- [ ] Implement filtering and sorting
- [ ] Add pagination

### Phase 5: Individual Product Page

- [ ] Create product details page
- [ ] Create image gallery component
- [ ] Create specifications table
- [ ] Integrate inquiry modal with prefilled data
- [ ] Add related products section

### Phase 6: Contact Page

- [ ] Create contact page layout
- [ ] Add contact information
- [ ] Integrate inquiry form
- [ ] Add map (optional)

### Phase 7: Integration & Testing

- [ ] Connect all Zustand stores
- [ ] Test inquiry form submission
- [ ] Test responsive design on all breakpoints
- [ ] Test navigation between pages
- [ ] Add loading states
- [ ] Add error handling

### Phase 8: Polish & Optimization

- [ ] Optimize images (Next.js Image component)
- [ ] Add SEO meta tags
- [ ] Add animations (optional)
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Cross-browser testing

---

## 🚀 Running the Project

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Build

```bash
npm run build
npm run start
```

---

## 📝 Best Practices

### TypeScript

- Always define types for props, state, and functions
- Use interfaces over types when possible
- Avoid `any` type - use `unknown` if needed

### SCSS

- Use BEM naming convention for classes
- Keep component styles modular
- Use variables and mixins for consistency
- Mobile-first approach (min-width media queries)

### Components

- Keep components small and focused
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Props should be typed with TypeScript interfaces

### State Management

- Use Zustand for global state only
- Keep local state in components when possible
- Use proper separation of concerns

### Performance

- Use Next.js Image component for all images
- Implement lazy loading for product lists
- Optimize bundle size
- Use React.memo for expensive components

---

## 🔍 Key Features Checklist

- [ ] Responsive design (320px - 1920px+)
- [ ] React Select for brand/product selection
- [ ] Zustand state management working
- [ ] SCSS styling with proper organization
- [ ] Inquiry popup modal functional
- [ ] Dynamic routing for brands/products
- [ ] Latest products section
- [ ] Most enquired products section
- [ ] Contact page with inquiry form
- [ ] Form validation
- [ ] Loading states
- [ ] Error handling
- [ ] Mobile navigation menu
- [ ] Image galleries
- [ ] Breadcrumb navigation

---

## 📞 Support & Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Zustand Documentation:** https://docs.pmnd.rs/zustand
- **React Select Documentation:** https://react-select.com
- **SCSS Guide:** https://sass-lang.com/guide

---

## 📌 Notes

- This is a frontend-only project. Inquiry submissions should be handled by a backend API (to be implemented separately) or can use a service like EmailJS, Formspree, etc.
- Mock data is used for development. Replace with API calls when backend is ready.
- Images should be placed in `public/images/` directory
- Consider adding a CMS (like Contentful, Sanity) for easier product/brand management in production

---

**Last Updated:** October 25, 2025  
**Version:** 1.0.0

# Project Folder Structure

## 📁 Current Structure

```
skyline-automation/
├── pages/                          # Next.js Pages (Page Router)
│   ├── _app.tsx                   # Custom App component
│   ├── _document.tsx              # Custom Document
│   ├── index.tsx                  # Home page (/)
│   ├── brands/                    # Brands section
│   │   ├── index.tsx             # All brands (/brands)
│   │   └── [brandSlug]/
│   │       ├── index.tsx         # Brand products (/brands/yamaha)
│   │       └── [productSlug].tsx # Product detail (/brands/yamaha/motor-123)
│   └── contact.tsx                # Contact page (/contact)
│
├── src/
│   ├── Assets/                    # Static assets and styles
│   │   ├── fonts/                # Custom fonts
│   │   ├── images/               # Images, logos, icons
│   │   └── scss/                 # Global SCSS files
│   │       ├── globals.scss      # Main global styles
│   │       ├── _variables.scss   # SCSS variables
│   │       └── _mixins.scss      # SCSS mixins
│   │
│   ├── Components/                # Reusable React components
│   │   ├── Navbar/               # Navigation component
│   │   │   ├── index.tsx
│   │   │   └── Navbar.module.scss
│   │   ├── Footer/               # Footer component
│   │   │   ├── index.tsx
│   │   │   └── Footer.module.scss
│   │   ├── Error/                # Error component
│   │   │   ├── index.tsx
│   │   │   └── Error.module.scss
│   │   └── index.ts              # Export all components
│   │
│   ├── Pages/                     # Page-specific components
│   │   ├── Home/                 # Home page components
│   │   │   ├── Banner/
│   │   │   ├── LatestProducts/
│   │   │   ├── MostEnquired/
│   │   │   └── index.ts
│   │   ├── About/                # About page components
│   │   ├── Blogs/                # Blogs page components
│   │   ├── ContactUs/            # Contact page components
│   │   ├── Products/             # Products page components
│   │   └── index.ts              # Export all page components
│   │
│   ├── store/                     # Zustand state management
│   │   ├── useBrandStore.ts
│   │   ├── useProductStore.ts
│   │   ├── useInquiryStore.ts
│   │   ├── useUIStore.ts
│   │   └── index.ts
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── brand.types.ts
│   │   ├── product.types.ts
│   │   ├── inquiry.types.ts
│   │   ├── common.types.ts
│   │   └── index.ts
│   │
│   ├── data/                      # Mock/static data
│   │   ├── brands.ts
│   │   ├── products.ts
│   │   └── index.ts
│   │
│   ├── utils/                     # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   │
│   └── hooks/                     # Custom React hooks
│       ├── useResponsive.ts
│       ├── useInquiry.ts
│       └── index.ts
│
├── public/                        # Public static files
│   ├── favicon.ico
│   └── ...
│
├── PROJECT_INSTRUCTIONS.md        # Detailed project documentation
├── PROMPTS.md                     # Development session prompts
├── STRUCTURE.md                   # This file
├── README.md                      # Project overview
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 📂 Folder Purposes

### `/pages` - Next.js Routes

- **Purpose:** Defines the application routes using Next.js Page Router
- **Naming:** File names become URL paths
- **Examples:**
  - `pages/index.tsx` → `/`
  - `pages/contact.tsx` → `/contact`
  - `pages/brands/[brandSlug]/index.tsx` → `/brands/yamaha`

### `/src/Assets` - Static Resources

- **Purpose:** Houses all static assets like fonts, images, and global styles
- **Structure:**
  - `fonts/` - Custom web fonts
  - `images/` - Product images, logos, banners, icons
  - `scss/` - Global SCSS files (variables, mixins, globals)

### `/src/Components` - Reusable Components

- **Purpose:** Shared components used across multiple pages
- **Examples:** Navbar, Footer, Error, Modal, Card, Button
- **Pattern:** Each component in its own folder with `.tsx` and `.module.scss`

### `/src/Pages` - Page-Specific Components

- **Purpose:** Components that are specific to individual pages
- **Structure:** Organized by page (Home, About, Blogs, ContactUs, Products)
- **Note:** These are NOT routes, they're component collections for pages

### `/src/store` - State Management

- **Purpose:** Zustand stores for global state
- **Stores:**
  - `useBrandStore` - Brand data
  - `useProductStore` - Product catalog
  - `useInquiryStore` - Inquiry forms
  - `useUIStore` - UI state (modals, menus)

### `/src/types` - TypeScript Types

- **Purpose:** Centralized type definitions
- **Files:** One file per domain (brands, products, inquiries, common)

### `/src/data` - Mock Data

- **Purpose:** Static/mock data for development
- **Usage:** Will be replaced with API calls in production

### `/src/utils` - Utilities

- **Purpose:** Helper functions and utilities
- **Examples:** Formatters, validators, API helpers

### `/src/hooks` - Custom Hooks

- **Purpose:** Reusable React hooks
- **Examples:** useResponsive, useInquiry

## 🎨 Styling Approach

### Global Styles

- Located in `src/Assets/scss/`
- Variables and mixins for consistency
- Imported in `pages/_app.tsx`

### Component Styles

- Each component has its own `.module.scss` file
- Uses CSS Modules for scoped styles
- Example: `Navbar/Navbar.module.scss`

### SCSS Organization

```scss
// Import order in component files:
@import "../../Assets/scss/variables";
@import "../../Assets/scss/mixins";

// Component styles...
```

## 🔄 Import Patterns

### Importing Components

```typescript
// From Components folder
import { Navbar, Footer } from "@/src/Components";

// From Pages folder
import { HomeContent } from "@/src/Pages";
```

### Importing Stores

```typescript
import { useBrandStore, useProductStore } from "@/src/store";
```

### Importing Types

```typescript
import { Brand, Product, InquiryForm } from "@/src/types";
```

### Importing Utils

```typescript
import { formatDate, validateEmail } from "@/src/utils";
```

## 📝 Component Structure Pattern

Each component follows this structure:

```
ComponentName/
├── index.tsx                 # Component logic
├── ComponentName.module.scss # Component styles
└── ComponentName.types.ts    # Component-specific types (optional)
```

Example component file:

```typescript
// src/Components/Navbar/index.tsx
import styles from "./Navbar.module.scss";

interface NavbarProps {
  // props
}

export const Navbar: React.FC<NavbarProps> = () => {
  return <nav className={styles.navbar}>{/* ... */}</nav>;
};
```

## 🚀 Key Differences from Previous Structure

### Previous Structure (Removed):

- Had separate folders for `layout/`, `home/`, `brands/`, `products/` components
- Styles were in `src/styles/components` and `src/styles/pages`

### New Structure (Current):

- Simplified to `Components/` (shared) and `Pages/` (page-specific)
- All styles co-located with components as `.module.scss`
- Global SCSS in `Assets/scss/`

## 💡 Best Practices

1. **Component Organization:**

   - Shared/reusable → `Components/`
   - Page-specific → `Pages/PageName/`

2. **Styling:**

   - Global styles → `Assets/scss/`
   - Component styles → Component folder (`.module.scss`)

3. **Imports:**

   - Use relative imports for siblings
   - Use absolute imports (`@/src/...`) for cross-folder imports

4. **Naming:**

   - Components: PascalCase (e.g., `Navbar`, `ProductCard`)
   - Files: Match component name (e.g., `Navbar.tsx`, `Navbar.module.scss`)
   - Folders: PascalCase for components

5. **Export Pattern:**
   - Each folder has an `index.ts` for clean imports
   - Export named exports (not default)

---

**Last Updated:** October 25, 2025  
**Version:** 2.0.0 (Restructured)

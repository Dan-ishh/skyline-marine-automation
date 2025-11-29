# Skyline Marine Automation - Development Prompts

This file contains session continuation prompts to build the Skyline Marine Automation portal step-by-step. Use these prompts sequentially with GitHub Copilot or your AI assistant to ensure comprehensive implementation.

---

## 🎯 How to Use This File

1. **Sequential Execution:** Work through prompts in order (Session 1 → Session 8)
2. **Session Context:** Each session builds upon previous work
3. **Verification:** Test functionality after each session before moving forward
4. **Customization:** Adjust prompts based on your specific requirements

---

## 📋 Session 1: Foundation & Type System

### Prompt 1.1: Set Up TypeScript Types

```
I'm working on the Skyline Marine Automation portal project. I need to set up the complete TypeScript type system for the project.

Please create the following type definition files in the src/types/ directory:

1. src/types/brand.types.ts
   - Brand interface with: id, name, slug, logo, description, website, productCount, createdAt, updatedAt

2. src/types/product.types.ts
   - Product interface with: id, name, slug, brandId, brand, images, thumbnail, description, specifications, category, price, isAvailable, enquiryCount, isLatest, createdAt, updatedAt
   - ProductCard interface (simplified version for list views)
   - ProductFilter interface for filtering options

3. src/types/inquiry.types.ts
   - InquiryForm interface with: name, email, phone, brandId, productId, message
   - Inquiry interface extending InquiryForm with: id, status, createdAt
   - InquiryStatus type ('pending' | 'contacted' | 'closed')

4. src/types/common.types.ts
   - SelectOption interface for React Select (value, label)
   - APIResponse<T> generic type
   - PaginationData interface
   - LoadingState type

5. src/types/index.ts
   - Export all types from other files

Make sure all types are properly documented with JSDoc comments.
```

---

## 📋 Session 2: Global Styles & SCSS Setup

### Prompt 2.1: Create Global SCSS Files

```
Continue with the Skyline Marine Automation project. I need to set up the complete SCSS styling foundation.

Please create the following SCSS files:

1. src/styles/variables.scss
   - Color palette (primary, secondary, accent, text, background, borders, etc.)
   - Typography variables (font families, font sizes from xs to 3xl)
   - Breakpoints (xs: 320px, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px)
   - Spacing scale (using rem units)
   - Border radius values
   - Shadows
   - Z-index scale
   - Transition durations

2. src/styles/mixins.scss
   - Responsive breakpoint mixins (mobile, tablet, desktop, etc.)
   - Flexbox utilities (flex-center, flex-between, flex-column)
   - Grid utilities
   - Typography mixins (heading, body-text, small-text)
   - Button reset mixin
   - Card mixin
   - Container mixin
   - Transition mixin

3. src/styles/globals.scss
   - CSS reset
   - Box-sizing
   - Body styles
   - Typography defaults
   - Link styles
   - Image defaults
   - Form element resets
   - Utility classes (text-center, mb-1, mt-2, etc.)
   - Container class
   - Grid utilities

Make sure to use the color scheme suitable for a marine/industrial business.
Update pages/_app.tsx to import '../src/styles/globals.scss' instead of the current styles import.
```

---

## 📋 Session 3: Zustand State Management

### Prompt 3.1: Create Zustand Stores

```
Continue with the Skyline Marine Automation project. I need to implement all Zustand stores for state management.

Please create the following store files in src/store/:

1. src/store/useBrandStore.ts
   - State: brands (Brand[]), selectedBrand (Brand | null), loading, error
   - Actions: fetchBrands, fetchBrandBySlug, setSelectedBrand, clearError
   - Use immer middleware for immutable updates
   - Include proper TypeScript typing

2. src/store/useProductStore.ts
   - State: products, latestProducts, mostEnquired, selectedProduct, loading, error, filters
   - Actions: fetchProducts, fetchProductsByBrand, fetchProductBySlug, setSelectedProduct, fetchLatestProducts, fetchMostEnquired, setFilters, clearFilters
   - Include filtering logic

3. src/store/useInquiryStore.ts
   - State: inquiries, currentInquiry, submitting, submitSuccess, error
   - Actions: submitInquiry, resetForm, setFormData, clearError
   - Include form validation logic

4. src/store/useUIStore.ts
   - State: isInquiryModalOpen, prefilledData, isMobileMenuOpen, isLoading
   - Actions: openInquiryModal, closeInquiryModal, toggleMobileMenu, setLoading
   - Handle modal state

5. src/store/index.ts
   - Export all stores

For now, use mock data (we'll create proper mock data in the next session). Add TODO comments where API calls would go.
```

---

## 📋 Session 4: Mock Data & Utilities

### Prompt 4.1: Create Mock Data

```
Continue with the Skyline Marine Automation project. I need to create comprehensive mock data for development and testing.

Please create the following data files in src/data/:

1. src/data/brands.ts
   - Array of 6-8 marine equipment brands (Yamaha, Mercury, Honda Marine, Suzuki Marine, etc.)
   - Each brand should have complete data matching the Brand type
   - Include realistic logos paths and descriptions
   - Export brands array and helper functions: getBrandBySlug, getAllBrands

2. src/data/products.ts
   - Array of 20-30 products across different brands
   - Products should include: outboard motors, boat engines, marine electronics, etc.
   - Mix of latest products (isLatest: true) and popular products (high enquiryCount)
   - Include realistic specifications, descriptions, and image paths
   - Export products array and helper functions: getProductsByBrand, getProductBySlug, getLatestProducts, getMostEnquiredProducts, getAllProducts

3. src/data/index.ts
   - Export all data and helper functions

Make sure the mock data is realistic and representative of marine equipment.
```

### Prompt 4.2: Create Utility Functions

```
Continue with the Skyline Marine Automation project. I need utility functions for common operations.

Please create the following utility files in src/utils/:

1. src/utils/formatters.ts
   - formatDate (date to readable string)
   - formatPrice (number to currency string)
   - slugify (string to URL-friendly slug)
   - truncateText (text, maxLength)
   - formatPhoneNumber

2. src/utils/validators.ts
   - validateEmail (email string validation)
   - validatePhone (phone number validation)
   - validateInquiryForm (validate complete inquiry form)
   - validateRequired (check if field is empty)

3. src/utils/helpers.ts
   - getImageUrl (construct full image path)
   - debounce function
   - throttle function
   - createSelectOptions (convert array to React Select options)

4. src/utils/index.ts
   - Export all utilities

Include proper TypeScript typing and error handling.
```

---

## 📋 Session 5: Layout Components

### Prompt 5.1: Create Header Component

```
Continue with the Skyline Marine Automation project. I need to create the Header component with navigation.

Please create:

1. src/components/layout/Header/index.tsx
   - Desktop navigation with links: Home, Brands, Contact
   - Mobile hamburger menu
   - Logo/brand name
   - Sticky header on scroll (optional)
   - Active link highlighting
   - Use Next.js Link component
   - Integrate with useUIStore for mobile menu state

2. src/components/layout/Header/Header.module.scss
   - Responsive styles
   - Mobile menu overlay
   - Smooth transitions
   - Sticky header styles
   - Active link styles

The header should be fully responsive from 320px width upward.
```

### Prompt 5.2: Create Footer Component

```
Continue with the Skyline Marine Automation project. I need to create the Footer component.

Please create:

1. src/components/layout/Footer/index.tsx
   - Company information section
   - Quick links (Home, Brands, Contact, Terms, Privacy)
   - Contact information (email, phone, address)
   - Social media links (optional)
   - Copyright notice
   - Newsletter signup (optional)

2. src/components/layout/Footer/Footer.module.scss
   - Multi-column layout on desktop
   - Single column on mobile
   - Proper spacing and typography
   - Link hover effects

Make it professional and suitable for a B2B marine equipment portal.
```

### Prompt 5.3: Create Layout Wrapper

```
Continue with the Skyline Marine Automation project. I need to create the main Layout wrapper component.

Please create:

1. src/components/layout/Layout/index.tsx
   - Wrapper component that includes Header and Footer
   - Main content area
   - Props for custom page classes, meta tags
   - Include Head component for SEO

2. src/components/layout/Layout/Layout.module.scss
   - Main container styles
   - Min-height to push footer down
   - Consistent padding/margins

Then update pages/_app.tsx to wrap all pages with this Layout component.
```

---

## 📋 Session 6: Common Components

### Prompt 6.1: Create Button Component

```
Continue with the Skyline Marine Automation project. I need to create a reusable Button component.

Please create:

1. src/components/common/Button/index.tsx
   - Props: children, variant (primary, secondary, outline, ghost), size (small, medium, large), disabled, loading, onClick, type, fullWidth, icon
   - Loading state with spinner
   - Disabled state
   - TypeScript types

2. src/components/common/Button/Button.module.scss
   - Styles for all variants
   - Hover, active, focus states
   - Loading animation
   - Responsive sizes
   - Icon alignment

Follow the color scheme from variables.scss.
```

### Prompt 6.2: Create Card Component

```
Continue with the Skyline Marine Automation project. I need to create a reusable Card component for displaying products and brands.

Please create:

1. src/components/common/Card/index.tsx
   - Generic card wrapper
   - Props: children, hover effect, padding, className
   - Click handler
   - TypeScript types

2. src/components/common/Card/Card.module.scss
   - Box shadow
   - Border radius
   - Hover lift effect
   - Smooth transitions
   - Responsive padding

This will be used as a base for ProductCard and BrandCard.
```

### Prompt 6.3: Create Loader Component

```
Continue with the Skyline Marine Automation project. I need to create a Loader component for loading states.

Please create:

1. src/components/common/Loader/index.tsx
   - Spinning loader animation
   - Props: size (small, medium, large), fullScreen, text
   - Full-screen overlay option
   - TypeScript types

2. src/components/common/Loader/Loader.module.scss
   - Spinner animation
   - Sizes
   - Overlay styles
   - Center alignment

Use a professional loading animation suitable for a business site.
```

### Prompt 6.4: Create Inquiry Popup Modal

```
Continue with the Skyline Marine Automation project. I need to create the Inquiry Popup modal - this is a critical component.

Please create:

1. src/components/common/InquiryPopup/index.tsx
   - Modal overlay with backdrop
   - Close button (X in top-right)
   - Close on backdrop click
   - Form fields:
     * Name (text input, required)
     * Email (email input, required)
     * Brand (React Select, required, populated from useBrandStore)
     * Product (React Select, required, filtered by selected brand)
     * Phone (text input, optional)
     * Message (textarea, optional)
   - Submit button with loading state
   - Form validation before submit
   - Success message after submission
   - Integration with useInquiryStore and useUIStore
   - Prevent body scroll when open
   - Pre-fill brand/product if provided via prefilled data

2. src/components/common/InquiryPopup/InquiryPopup.module.scss
   - Modal overlay (fixed, full-screen, dark backdrop)
   - Modal content (centered, white background, max-width)
   - Form layout (responsive, 2 columns on desktop, 1 on mobile)
   - Form field styles
   - React Select custom styles
   - Close button positioning
   - Animations (fade in)

This is the most important component - make sure it's fully functional and well-styled.
```

---

## 📋 Session 7: Home Page Components

### Prompt 7.1: Create Banner Section

```
Continue with the Skyline Marine Automation project. I need to create the Banner/Hero section for the home page.

Please create:

1. src/components/home/Banner/index.tsx
   - Hero section with headline and subheadline
   - CTA button (opens inquiry modal)
   - Optional background image
   - TypeScript types

2. src/components/home/Banner/Banner.module.scss
   - Full-width section
   - Background image/gradient
   - Text overlay
   - Centered content
   - Responsive typography
   - CTA button styling

Make it visually appealing and professional for a marine equipment business.
```

### Prompt 7.2: Create Product Card Component

```
Continue with the Skyline Marine Automation project. I need to create a ProductCard component for displaying products in lists.

Please create:

1. src/components/products/ProductCard/index.tsx
   - Props: product (Product type)
   - Display: product image, name, brand, brief description
   - "View Details" link (to product page)
   - "Inquire Now" button (opens modal with prefilled data)
   - Use Next.js Image component
   - Use Next.js Link component

2. src/components/products/ProductCard/ProductCard.module.scss
   - Card layout
   - Image aspect ratio
   - Text truncation
   - Button positioning
   - Hover effects
   - Responsive design

This card will be used in Latest Products and Most Enquired Products sections.
```

### Prompt 7.3: Create Latest Products Section

```
Continue with the Skyline Marine Automation project. I need to create the Latest Products section for the home page.

Please create:

1. src/components/home/LatestProducts/index.tsx
   - Section title
   - Grid of 6-8 latest products using ProductCard
   - "View All" link to brands page
   - Fetch data from useProductStore (getLatestProducts)
   - Loading state
   - Empty state

2. src/components/home/LatestProducts/LatestProducts.module.scss
   - Section container
   - Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)
   - Spacing and alignment

Include proper loading and error handling.
```

### Prompt 7.4: Create Most Enquired Products Section

```
Continue with the Skyline Marine Automation project. I need to create the Most Enquired Products section for the home page.

Please create:

1. src/components/home/MostEnquiredProducts/index.tsx
   - Section title
   - Grid of 6-8 most enquired products using ProductCard
   - "View All" link to brands page
   - Fetch data from useProductStore (getMostEnquiredProducts)
   - Loading state
   - Empty state

2. src/components/home/MostEnquiredProducts/MostEnquiredProducts.module.scss
   - Section container
   - Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)
   - Spacing and alignment

Similar to Latest Products but with most enquired products.
```

### Prompt 7.5: Create Home Page Inquiry Section

```
Continue with the Skyline Marine Automation project. I need to create an Inquiry Form section for the home page.

Please create:

1. src/components/home/InquirySection/index.tsx
   - Section with heading and description
   - "Inquire Now" button (opens inquiry modal)
   - Optional: display contact information
   - TypeScript types

2. src/components/home/InquirySection/InquirySection.module.scss
   - Section styling
   - Background color/gradient
   - Centered content
   - Responsive design

This should encourage users to submit inquiries.
```

### Prompt 7.6: Assemble Home Page

```
Continue with the Skyline Marine Automation project. I need to update the home page to use all the components we've created.

Please update:

1. pages/index.tsx
   - Import all home page components
   - Assemble in order: Banner, LatestProducts, MostEnquiredProducts, InquirySection
   - Load data using Zustand stores in useEffect
   - Add page title and meta tags
   - Handle loading states

2. Update pages/index.module.css or create src/styles/pages/home.module.scss
   - Page-level styles
   - Section spacing
   - Container widths

Make sure all components are properly integrated and responsive.
```

---

## 📋 Session 8: Brands Pages

### Prompt 8.1: Create Brand Card Component

```
Continue with the Skyline Marine Automation project. I need to create a BrandCard component for the brands listing page.

Please create:

1. src/components/brands/BrandCard/index.tsx
   - Props: brand (Brand type)
   - Display: brand logo, name, product count
   - Link to brand products page
   - Use Next.js Image and Link components
   - TypeScript types

2. src/components/brands/BrandCard/BrandCard.module.scss
   - Card layout
   - Logo container (square, centered)
   - Text alignment
   - Hover effects
   - Responsive design

Keep it clean and professional.
```

### Prompt 8.2: Create Brands Listing Page

```
Continue with the Skyline Marine Automation project. I need to create the Brands listing page.

Please create:

1. pages/brands/index.tsx
   - Page title "Our Brands"
   - Grid of all brands using BrandCard
   - Optional: search/filter functionality
   - Fetch brands from useBrandStore
   - Loading state
   - Empty state
   - Breadcrumb: Home > Brands

2. Create src/styles/pages/brands.module.scss
   - Page layout
   - Grid system (responsive)
   - Search bar styles (if implemented)

Make sure it's responsive from 320px width.
```

### Prompt 8.3: Create Brand Products Page

```
Continue with the Skyline Marine Automation project. I need to create the Brand Products listing page.

Please create:

1. pages/brands/[brandSlug]/index.tsx
   - Use getStaticProps and getStaticPaths for static generation
   - Display brand header (logo, name, description)
   - Grid of all products for this brand using ProductCard
   - Filter/sort options (optional)
   - Pagination (if more than 12 products)
   - Fetch brand and products using Zustand stores
   - Breadcrumb: Home > Brands > [Brand Name]
   - Loading state

2. Create src/styles/pages/brand-products.module.scss
   - Page layout
   - Brand header section
   - Product grid
   - Filter/sort UI

Implement proper Next.js static generation for better performance.
```

---

## 📋 Session 9: Product Details Page

### Prompt 9.1: Create Image Gallery Component

```
Continue with the Skyline Marine Automation project. I need to create an Image Gallery component for the product details page.

Please create:

1. src/components/products/ImageGallery/index.tsx
   - Props: images (string array)
   - Main large image display
   - Thumbnail strip below main image
   - Click thumbnail to change main image
   - Optional: lightbox/zoom on click
   - Use Next.js Image component
   - TypeScript types

2. src/components/products/ImageGallery/ImageGallery.module.scss
   - Responsive layout
   - Main image container (aspect ratio)
   - Thumbnail grid
   - Active thumbnail highlight
   - Hover effects

Make sure it works well on mobile and desktop.
```

### Prompt 9.2: Create Product Details Component

```
Continue with the Skyline Marine Automation project. I need to create a ProductDetails component to display product information.

Please create:

1. src/components/products/ProductDetails/index.tsx
   - Props: product (Product type)
   - Display: name, brand, description, price (if available)
   - Specifications table
   - "Inquire Now" button (opens modal with prefilled data)
   - TypeScript types

2. src/components/products/ProductDetails/ProductDetails.module.scss
   - Info section layout
   - Specifications table styling
   - Typography hierarchy
   - Button positioning
   - Responsive design

Keep it clean and easy to read.
```

### Prompt 9.3: Create Individual Product Page

```
Continue with the Skyline Marine Automation project. I need to create the Individual Product page.

Please create:

1. pages/brands/[brandSlug]/[productSlug].tsx
   - Use getStaticProps and getStaticPaths for static generation
   - Breadcrumb: Home > Brands > [Brand Name] > [Product Name]
   - Two-column layout: ImageGallery on left, ProductDetails on right (desktop)
   - Stacked layout on mobile
   - Related products section at bottom (same brand)
   - Fetch product data using Zustand store
   - Add SEO meta tags (title, description)
   - Loading state

2. Create src/styles/pages/product-detail.module.scss
   - Page layout
   - Two-column grid (responsive)
   - Related products section
   - Spacing and alignment

This is the most important detail page - make it comprehensive and user-friendly.
```

---

## 📋 Session 10: Contact Page

### Prompt 10.1: Create Contact Page

```
Continue with the Skyline Marine Automation project. I need to create the Contact page.

Please create:

1. pages/contact.tsx
   - Page title "Contact Us"
   - Contact information section (address, phone, email, business hours)
   - "Send Inquiry" button (opens inquiry modal)
   - Optional: embedded Google Map
   - Optional: social media links
   - Breadcrumb: Home > Contact

2. Create src/styles/pages/contact.module.scss
   - Page layout
   - Contact info cards
   - Map container (if implemented)
   - Responsive design

Keep it simple and professional.
```

---

## 📋 Session 11: Custom Hooks

### Prompt 11.1: Create Custom Hooks

```
Continue with the Skyline Marine Automation project. I need to create some custom React hooks for common functionality.

Please create:

1. src/hooks/useResponsive.ts
   - Hook to detect current breakpoint
   - Returns: isMobile, isTablet, isDesktop, currentBreakpoint
   - Use window.matchMedia
   - Update on resize

2. src/hooks/useInquiry.ts
   - Hook to handle inquiry form logic
   - Wraps useInquiryStore and useUIStore
   - Returns: openInquiry, submitInquiry, closeInquiry, isOpen, isSubmitting, error
   - Makes it easier to use inquiry functionality

3. src/hooks/index.ts
   - Export all hooks

These hooks will make components cleaner and more reusable.
```

---

## 📋 Session 12: Integration & Testing

### Prompt 12.1: Update Stores with Mock Data

```
Continue with the Skyline Marine Automation project. I need to connect the Zustand stores with the mock data we created.

Please update:

1. src/store/useBrandStore.ts
   - Update fetchBrands to use mock data from src/data/brands
   - Update fetchBrandBySlug to use getBrandBySlug helper

2. src/store/useProductStore.ts
   - Update fetchProducts to use mock data from src/data/products
   - Update fetchProductsByBrand to use getProductsByBrand helper
   - Update fetchLatestProducts to use getLatestProducts helper
   - Update fetchMostEnquired to use getMostEnquiredProducts helper
   - Update fetchProductBySlug to use getProductBySlug helper

3. src/store/useInquiryStore.ts
   - Update submitInquiry to simulate API call (console.log data, delay, success)
   - Add proper validation

Make sure all stores are working with the mock data properly.
```

### Prompt 12.2: Test Inquiry Flow

```
Continue with the Skyline Marine Automation project. I need to test and refine the inquiry flow.

Please verify:

1. InquiryPopup opens correctly from:
   - Header/Footer "Inquire" button
   - Product cards "Inquire Now" button
   - Product details page "Inquire Now" button
   - Contact page "Send Inquiry" button

2. Form validation works correctly:
   - Required fields are enforced
   - Email validation works
   - Phone validation works (if implemented)

3. Brand/Product selection:
   - Product dropdown updates based on selected brand
   - Pre-filled data works when opened from product page

4. Form submission:
   - Loading state displays
   - Success message appears
   - Form clears after success
   - Modal closes after success (optional)

Fix any issues found during testing.
```

### Prompt 12.3: Responsive Design Check

```
Continue with the Skyline Marine Automation project. I need to verify responsive design across all breakpoints.

Please test all pages at these widths:
- 320px (minimum)
- 375px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1440px (large desktop)

Check:
1. Home page - all sections
2. Brands listing page
3. Brand products page
4. Individual product page
5. Contact page
6. Header navigation (mobile menu)
7. Footer
8. Inquiry modal

Fix any layout issues, overflow problems, or poor spacing at any breakpoint.
```

---

## 📋 Session 13: Polish & Optimization

### Prompt 13.1: Add Loading States

```
Continue with the Skyline Marine Automation project. I need to add proper loading states throughout the application.

Please add:

1. Page-level loading (use Loader component):
   - Home page while fetching products
   - Brands page while fetching brands
   - Brand products page
   - Product details page

2. Component-level loading:
   - Latest Products section
   - Most Enquired Products section
   - Product cards skeleton (optional)

3. Button loading states:
   - Inquiry form submit button
   - All CTA buttons

Make sure no component shows undefined data while loading.
```

### Prompt 13.2: Add Error Handling

```
Continue with the Skyline Marine Automation project. I need to add comprehensive error handling.

Please add:

1. Error states in stores:
   - Display error messages
   - Retry functionality

2. Error boundaries (optional):
   - Page-level error boundary
   - Component error boundary

3. Form errors:
   - Display validation errors
   - API error messages

4. Fallback UI:
   - Empty states (no products, no brands)
   - Error states with retry button

Make sure users get clear feedback when something goes wrong.
```

### Prompt 13.3: SEO & Meta Tags

```
Continue with the Skyline Marine Automation project. I need to add proper SEO meta tags to all pages.

Please add to each page:

1. Home page:
   - Title: "Skyline Marine Automation - Marine Equipment Portal"
   - Description, keywords
   - Open Graph tags

2. Brands page:
   - Title: "Our Brands - Skyline Marine Automation"
   - Description

3. Brand products page:
   - Dynamic title: "[Brand Name] Products - Skyline Marine Automation"
   - Description

4. Product details page:
   - Dynamic title: "[Product Name] - [Brand Name] - Skyline Marine Automation"
   - Description from product data
   - Open Graph image (product image)

5. Contact page:
   - Title: "Contact Us - Skyline Marine Automation"
   - Description

Use Next.js Head component or next/head for all meta tags.
```

### Prompt 13.4: Image Optimization

```
Continue with the Skyline Marine Automation project. I need to ensure all images are properly optimized.

Please verify:

1. All images use Next.js Image component
2. Proper width/height or layout props set
3. Alt text for accessibility
4. Priority flag for above-fold images
5. Lazy loading for below-fold images
6. Placeholder blur (optional)

Update any components that don't follow these best practices.
```

### Prompt 13.5: Accessibility Improvements

```
Continue with the Skyline Marine Automation project. I need to improve accessibility (a11y).

Please add/verify:

1. Semantic HTML elements (header, nav, main, footer, section, article)
2. ARIA labels where needed
3. Keyboard navigation support (modal, forms, navigation)
4. Focus states on interactive elements
5. Alt text on all images
6. Form labels properly associated
7. Color contrast ratios (WCAG AA minimum)
8. Skip to content link (optional)

Test with keyboard navigation and screen reader (if possible).
```

---

## 📋 Session 14: Final Touches

### Prompt 14.1: Add Animations (Optional)

```
Continue with the Skyline Marine Automation project. I want to add subtle animations to improve user experience.

Please add:

1. Page transitions (fade in)
2. Modal animations (fade in backdrop, slide up content)
3. Hover animations on cards and buttons
4. Scroll animations (fade in sections as they enter viewport) - optional
5. Loading spinner animations

Keep animations subtle and professional - this is a B2B site.
Use CSS transitions/animations, avoid heavy JS animation libraries.
```

### Prompt 14.2: Create README

```
Continue with the Skyline Marine Automation project. I need to create a comprehensive README.md file.

Please create README.md in the root directory with:

1. Project title and description
2. Features list
3. Tech stack
4. Installation instructions
5. Running the project (dev, build, start)
6. Project structure overview
7. Available scripts
8. Configuration
9. Deployment notes
10. Contributing guidelines (if applicable)
11. License

Make it clear and professional.
```

### Prompt 14.3: Code Cleanup

```
Continue with the Skyline Marine Automation project. I need to do a final code cleanup.

Please:

1. Remove console.logs (except intentional ones)
2. Remove commented code
3. Remove unused imports
4. Check for TypeScript any types
5. Ensure consistent formatting
6. Add JSDoc comments to complex functions
7. Check for unused files
8. Ensure all TODOs are addressed or documented

Run through all files and clean up.
```

### Prompt 14.4: Build & Deploy Preparation

```
Continue with the Skyline Marine Automation project. I need to prepare for production build and deployment.

Please:

1. Test production build:
   - Run `npm run build`
   - Check for build errors
   - Verify bundle size
   - Test production server `npm start`

2. Update environment variables (if any):
   - Create .env.example
   - Document required variables

3. Add deployment instructions to README:
   - Vercel deployment steps
   - Environment variable configuration
   - Build settings

4. Verify all pages work in production mode

Let me know if there are any issues with the production build.
```

---

## 🎯 Summary Checklist

After completing all sessions, verify:

- [ ] All pages work correctly (Home, Brands, Brand Products, Product Details, Contact)
- [ ] Inquiry popup works from all locations
- [ ] Form validation works
- [ ] Responsive design works (320px - 1920px+)
- [ ] All Zustand stores function properly
- [ ] React Select works for brand/product selection
- [ ] SCSS styling is consistent
- [ ] Loading states display correctly
- [ ] Error handling is in place
- [ ] SEO meta tags are set
- [ ] Images are optimized
- [ ] Accessibility is improved
- [ ] Code is clean and documented
- [ ] Production build succeeds
- [ ] TypeScript has no errors

---

## 📝 Additional Prompts (As Needed)

### Add New Feature

```
I need to add [feature description] to the Skyline Marine Automation project.

Current state: [describe current implementation]
Desired outcome: [describe what you want]
Affected components: [list components that need changes]

Please implement this feature while maintaining the existing code structure and styling consistency.
```

### Fix Bug

```
I found a bug in the Skyline Marine Automation project.

Bug description: [what's wrong]
Steps to reproduce: [how to see the bug]
Expected behavior: [what should happen]
Actual behavior: [what actually happens]
Component/file: [where the bug is]

Please fix this bug.
```

### Refactor Component

```
I need to refactor [component name] in the Skyline Marine Automation project.

Current implementation: [describe current code]
Issues: [what's wrong with current approach]
Desired outcome: [how it should work instead]

Please refactor this component while maintaining functionality.
```

---

## 💡 Tips for Using These Prompts

1. **Copy the entire prompt block** including context and requirements
2. **Wait for completion** before moving to the next prompt
3. **Test functionality** after each session
4. **Customize as needed** based on your specific requirements
5. **Ask follow-up questions** if something isn't clear
6. **Save your progress** regularly
7. **Review generated code** to understand implementation

---

**Happy Coding! 🚀**

_Last Updated: October 25, 2025_

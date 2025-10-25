# Pages Structure - Implementation Guide

## 📄 All Pages Created

### ✅ Pages Implemented

1. **Home Page** (`/`)
   - File: `src/pages/index.tsx`
   - Sections:
     - Banner with hero content
     - Latest Products (8 products)
     - Most Enquired Products (8 products)
     - Inquiry Section with CTA button
   - Uses: `useProductStore`, `useUIStore`

2. **Brands Listing** (`/brands`)
   - File: `src/pages/brands/index.tsx`
   - Shows all available brands in a grid
   - Uses: `useBrandStore`
   - Features: Loading states, error handling

3. **Brand Products** (`/brands/[brandSlug]`)
   - File: `src/pages/brands/[brandSlug]/index.tsx`
   - Dynamic route for each brand
   - Shows all products for selected brand
   - Breadcrumb navigation
   - Uses: `useBrandStore`, `useProductStore`

4. **Individual Product** (`/brands/[brandSlug]/[productSlug]`)
   - File: `src/pages/brands/[brandSlug]/[productSlug].tsx`
   - Dynamic route for each product
   - Features:
     - Product images gallery
     - Full product details
     - Specifications table
     - "Inquire Now" button with prefilled modal
   - Breadcrumb navigation
   - Uses: `useProductStore`, `useUIStore`

5. **Contact Us** (`/contact`)
   - File: `src/pages/contact.tsx`
   - Contact information display
   - "Inquire Now" button to open modal
   - Features:
     - Email, phone, address
     - Business hours
     - Optional: Google Maps embed (commented out)

---

## 🗺️ Routing Structure

```
/                                           → Home Page
/brands                                     → All Brands
/brands/yamaha                             → Yamaha Products
/brands/yamaha/f150-outboard               → Specific Product
/contact                                    → Contact Page
```

---

## 🔗 Navigation Flow

### User Journey Examples:

1. **Browse by Brand:**
   ```
   Home → Brands → Select Brand → View Products → Select Product → Inquire
   ```

2. **Quick Inquiry:**
   ```
   Home → Click "Inquire Now" → Fill Form → Submit
   ```

3. **Product Discovery:**
   ```
   Home → Latest Products → Click Product → View Details → Inquire
   ```

---

## 🎯 Key Features Per Page

### Home Page
- ✅ Header with navigation
- ✅ Banner section
- ✅ Latest products section (dynamic)
- ✅ Most enquired products section (dynamic)
- ✅ Inquiry form section
- ✅ Footer
- 🔄 Connects to: `useProductStore.fetchLatestProducts()`, `fetchMostEnquired()`

### Brands Page
- ✅ Grid of all brands
- ✅ Brand cards (logo, name, description)
- ✅ Click to view brand products
- 🔄 Connects to: `useBrandStore.fetchBrands()`

### Brand Products Page
- ✅ Breadcrumb navigation
- ✅ Brand header (logo, name, description)
- ✅ Products grid for selected brand
- ✅ Filter/sort options (ready to implement)
- 🔄 Connects to: `useBrandStore.fetchBrandBySlug()`, `useProductStore.fetchProductsByBrand()`

### Product Detail Page
- ✅ Breadcrumb navigation
- ✅ Image gallery (main image + thumbnails ready)
- ✅ Product name and brand
- ✅ Category display
- ✅ Full description
- ✅ Specifications table
- ✅ "Inquire Now" button (opens modal with prefilled data)
- ✅ Related products section (ready to implement)
- 🔄 Connects to: `useProductStore.fetchProductBySlug()`, `useUIStore.openInquiryModal()`

### Contact Page
- ✅ Contact information (email, phone, address)
- ✅ Business hours
- ✅ "Inquire Now" button
- ✅ Google Maps embed (commented, ready to add)
- 🔄 Connects to: `useUIStore.openInquiryModal()`

---

## 🎨 Components Needed (Next Steps)

### Priority 1: Essential Components
1. **Navbar** - Navigation with links to Home, Brands, Contact
2. **Footer** - Company info, links, copyright
3. **InquiryPopup** - Modal form with:
   - Name (required)
   - Email (required)
   - Brand Select (required)
   - Product Select (required, filtered by brand)
   - Phone (optional)
   - Message (optional)

### Priority 2: Page Components
4. **BrandCard** - Display brand in grid
5. **ProductCard** - Display product in grid
6. **ImageGallery** - Product images with thumbnails
7. **ProductDetails** - Product info section

### Priority 3: Sections
8. **Banner** - Home page hero section
9. **LatestProducts** - Section component
10. **MostEnquiredProducts** - Section component
11. **InquirySection** - CTA section

---

## 📋 Implementation Status

### ✅ Completed
- [x] All 5 pages created
- [x] Dynamic routing set up
- [x] Zustand store integration
- [x] Breadcrumb navigation
- [x] SEO meta tags
- [x] Inquiry modal integration
- [x] Loading states
- [x] Error handling

### 🔄 Ready for Implementation
- [ ] Navbar component
- [ ] Footer component
- [ ] InquiryPopup modal
- [ ] BrandCard component
- [ ] ProductCard component
- [ ] ImageGallery component
- [ ] Page styling (SCSS modules)
- [ ] Mock data creation
- [ ] API integration

---

## 🚀 Next Steps

### Phase 1: Layout Components (Critical)
```
1. Create Navbar component
   - Logo
   - Navigation links: Home, Brands, Contact
   - Mobile menu toggle

2. Create Footer component
   - Company info
   - Quick links
   - Social media
   - Copyright

3. Update _app.tsx to include Navbar and Footer on all pages
```

### Phase 2: Inquiry Modal (Critical)
```
4. Create InquiryPopup component
   - Form with all fields
   - React Select for Brand/Product
   - Validation
   - Submit to useInquiryStore
   - Success/error messages

5. Test inquiry flow from all pages
```

### Phase 3: Product Display
```
6. Create ProductCard component
7. Create BrandCard component
8. Create ImageGallery component
9. Add components to pages
```

### Phase 4: Styling
```
10. Create SCSS modules for each page
11. Style all components
12. Ensure responsive design (320px+)
13. Test on all breakpoints
```

### Phase 5: Data & Integration
```
14. Create mock data (brands.ts, products.ts)
15. Update Zustand stores to use mock data
16. Test all pages with data
17. Add loading skeletons
18. Add empty states
```

---

## 💡 Usage Examples

### Opening Inquiry Modal

```typescript
// From any page
import { useUIStore } from '@/src/store';

const { openInquiryModal } = useUIStore();

// Simple inquiry
openInquiryModal();

// With prefilled data (from product page)
openInquiryModal({
  brandId: '123',
  brandName: 'Yamaha',
  productId: '456',
  productName: 'F150 Outboard Motor',
});
```

### Navigation

```typescript
// Using Next.js Link
import Link from 'next/link';

<Link href="/brands">View All Brands</Link>
<Link href="/brands/yamaha">Yamaha Products</Link>
<Link href="/brands/yamaha/f150">F150 Outboard</Link>
<Link href="/contact">Contact Us</Link>
```

---

## 📝 Notes

- All pages use TypeScript
- All pages have proper Head tags for SEO
- All pages integrate with Zustand stores
- Breadcrumb navigation on detail pages
- Inquiry modal can be triggered from any page
- Dynamic routes use Next.js file-based routing
- Ready for static generation with `getStaticProps`/`getStaticPaths`

---

**Last Updated:** October 25, 2025  
**Status:** Pages Structure Complete ✅
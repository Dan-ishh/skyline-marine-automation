# Hierarchical Brand Structure Implementation Guide

## Overview

This guide outlines the complete implementation of a hierarchical structure:
**Brand → Category → Sub-Category → Products**

Example: `WARTSILA → 32 → Air Starting Valve → Product List`

## 1. Type Definitions (✅ Complete)

Created `/src/types/category.types.ts` with:

- `Category` interface (Brand's model categories like "32", "36", "38A")
- `SubCategory` interface (Component types like "Air Starting Valve", "Camshaft")
- Helper types: `CategoryWithSubCategories`, `BrandWithCategories`

Updated `/src/types/product.types.ts` to include:

- `categoryId` and `subCategoryId` fields
- References to Category and SubCategory objects

## 2. Data Structure

### Categories Data (`/src/data/categories.ts`)

```typescript
// Example structure for WARTSILA brand
const categories = [
  {
    id: "wartsila-32",
    name: "32",
    slug: "32",
    brandId: "wartsila-16",
    description: "WARTSILA 32 series marine diesel engines",
    order: 1,
    subCategoryCount: 8,
    productCount: 15,
  },
  // More categories: 36, 38A, 46, 64...
];

const subCategories = [
  {
    id: "wartsila-32-air-starting-valve",
    name: "Air Starting Valve",
    slug: "air-starting-valve",
    categoryId: "wartsila-32",
    brandId: "wartsila-16",
    order: 1,
    productCount: 3,
  },
  // More sub-categories: Camshaft, Connecting Rod, Cylinder Head...
];
```

### Products Update

Update each product to include:

```typescript
{
  categoryId: "wartsila-32",
  subCategoryId: "wartsila-32-air-starting-valve",
  // ... other fields
}
```

## 3. Routing Structure

### New Page Routes

1. **Brand Page** (existing): `/brands/[brandSlug]`

   - Shows all categories for the brand
   - Example: `/brands/wartsila` → Shows "32, 36, 38A, 46, More"

2. **Category Page** (new): `/brands/[brandSlug]/[categorySlug]`

   - Shows all sub-categories in that category
   - Example: `/brands/wartsila/32` → Shows sub-categories list

3. **Sub-Category Page** (new): `/brands/[brandSlug]/[categorySlug]/[subCategorySlug]`

   - Shows all products in that sub-category
   - Example: `/brands/wartsila/32/air-starting-valve` → Shows products

4. **Product Page** (update): `/brands/[brandSlug]/[categorySlug]/[subCategorySlug]/[productSlug]`
   - Shows individual product details
   - Example: `/brands/wartsila/32/air-starting-valve/wartsila-32-air-valve-complete`

## 4. Navigation Menu Redesign

### Desktop Menu Structure

```
Our Inventory (dropdown)
├─ WARTSILA
│  ├─ 32
│  │  ├─ Air Starting Valve
│  │  ├─ Anti Polishing Ring
│  │  ├─ Camshaft
│  │  └─ ...
│  ├─ 36
│  ├─ 38A
│  ├─ 46
│  └─ More (shows all categories)
├─ ROLLS-ROYCE
├─ MAN B&W
└─ ...
```

### Mobile Menu

- Accordion-style expandable sections
- Brand → Expand to show Categories
- Category → Expand to show Sub-Categories
- Sub-Category → Navigate to products page

## 5. Helper Functions Needed

```typescript
// Get categories by brand
getCategoriesByBrand(brandId: string): Category[]

// Get sub-categories by category
getSubCategoriesByCategory(categoryId: string): SubCategory[]

// Get products by sub-category
getProductsBySubCategory(subCategoryId: string): Product[]

// Navigation helpers
getBrandCategorySubCategoryPath(brandSlug, categorySlug, subCategorySlug)
```

## 6. Zustand Store Updates

Add to stores:

- `useCategoryStore` for category state management
- Update `useProductStore` to filter by category/sub-category
- Update `useBrandStore` to include categories

## 7. UI Components Needed

1. **CategoryGrid** - Display category cards for a brand
2. **SubCategoryGrid** - Display sub-category cards for a category
3. **HierarchicalMenu** - New navigation menu with nested structure
4. **Breadcrumbs** - Enhanced to show full path

## 8. Implementation Steps

### Step 1: Complete Data Migration

- Fill out all categories for WARTSILA
- Add sample sub-categories
- Update sample products with category/sub-category IDs

### Step 2: Create New Pages

- Create `/brands/[brandSlug]/[categorySlug]/index.tsx`
- Create `/brands/[brandSlug]/[categorySlug]/[subCategorySlug]/index.tsx`
- Update `/brands/[brandSlug]/[categorySlug]/[subCategorySlug]/[productSlug].tsx`

### Step 3: Update Navigation

- Redesign Navbar component with hierarchical menu
- Add accordion functionality for mobile
- Implement hover dropdowns for desktop

### Step 4: Test & Refine

- Test all navigation paths
- Ensure breadcrumbs work correctly
- Verify product filtering

## 9. Scalability

To add new content:

**Add a new Brand:**

1. Add to `/src/data/brands.ts`

**Add a new Category to existing Brand:**

1. Add to `/src/data/categories.ts` in `categories` array
2. Update brand's `productCount`

**Add a new Sub-Category:**

1. Add to `/src/data/categories.ts` in `subCategories` array
2. Update parent category's `subCategoryCount` and `productCount`

**Add a new Product:**

1. Add to `/src/data/products.ts`
2. Include `brandId`, `categoryId`, and `subCategoryId`
3. Update sub-category's `productCount`

## Next Steps

Would you like me to:

1. Create the complete categories.ts file with sample data?
2. Build the new page routes?
3. Redesign the navigation menu component?
4. Or proceed with all of the above?

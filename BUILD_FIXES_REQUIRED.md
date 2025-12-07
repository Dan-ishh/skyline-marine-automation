# Hierarchical Brand Structure - Build Fixes Required

## Status: Phase 2 In Progress - Build Errors Need Resolution

### Completed ✅

1. Created type definitions for Category and SubCategory
2. Created categories data file with sample WARTSILA data
3. Created new page routes:
   - `/brands/[brandSlug]/[categorySlug]/index.tsx` - Shows sub-categories
   - `/brands/[brandSlug]/[categorySlug]/[subCategorySlug]/index.tsx` - Shows products
   - `/brands/[brandSlug]/[categorySlug]/[subCategorySlug]/[productSlug].tsx` - Product details
4. Updated brand page to show categories instead of products
5. Created product utility helpers

### Build Errors to Fix ❌

The following files have TypeScript errors related to `product.category` which is now `string | Category | undefined`:

1. **`/src/pages/products/index.tsx`** - Line 50

   - Error: `p.category` is possibly undefined
   - Fix: Add optional chaining or type check

2. **`/src/pages/products/[productSlug].tsx`** - Line 180

   - Error: Category type not assignable to ReactNode
   - Fix: Use `getProductCategoryName()` helper

3. **`/src/pages/stock/[stockSlug].tsx`** - Line 174

   - Error: Category type not assignable to ReactNode
   - Fix: Use `getProductCategoryName()` helper

4. **`/src/pages/stock/[stockSlug]/[productSlug].tsx`** - Lines 62, 129
   - Error: Category type not assignable to ReactNode
   - Fix: Use `getProductCategoryName()` helper

### Quick Fix Script

Import the helper in each file:

```typescript
import { getProductCategoryName } from "@/src/utils/productUtils";
```

Replace occurrences:

- `{product.category}` → `{getProductCategoryName(product)}`
- `product.category.toLowerCase()` → `getProductCategoryName(product).toLowerCase()`
- `p.category?.toLowerCase()` → `getProductCategoryName(p)?.toLowerCase()`

### Files That Need Updates

1. `/src/pages/products/index.tsx`
2. `/src/pages/products/[productSlug].tsx`
3. `/src/pages/stock/[stockSlug].tsx`
4. `/src/pages/stock/[stockSlug]/[productSlug].tsx`

### Next Steps After Build Fixes

1. Update data exports in `/src/data/index.ts`
2. Test the new routing structure
3. Add sample products with `categoryId` and `subCategoryId`
4. Create the navigation menu redesign
5. Add CSS styling for category and sub-category pages

### Commands to Run After Fixes

```bash
# Build
npm run build

# Dev server
npm run dev

# Test navigation
# Visit: http://localhost:3000/brands/wartsila
# Should show: Categories (32, 36, 38A, 46)
# Click on 32 → Should show sub-categories
# Click on sub-category → Should show products
```

---

**Last Updated:** December 7, 2025
**Status:** Awaiting build error fixes before proceeding

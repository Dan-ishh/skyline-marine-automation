# Stock Page Fix - Brand Consistency Update

## Date: December 7, 2025

## Issues Fixed

### 1. **Wrong Brands on `/stock` Page**

**Problem:** The `/stock` page had hardcoded brands that didn't match the actual brands in `brands.ts`:

- STORK WERKSPOOR ❌
- MAN B&W MAIN ENGINE ❌
- SCHALLER ❌
- INGERSOLL RAND ❌
- ALLEN DIESEL ❌
- BREATHING COMPRESSOR ❌

**Solution:** Now dynamically imports and displays all brands from `src/data/brands.ts`:

- Caterpillar Marine ✅
- Cummins Marine ✅
- Deutz ✅
- Hanshin Diesel ✅
- MaK ✅
- MAN B&W ✅
- MAN Diesel ✅
- Mitsubishi Diesel Engine ✅
- Niigata Power Systems ✅
- S.E.M.T. Pielstick ✅
- Rolls-Royce ✅
- SKL ✅
- Sulzer ✅
- Daihatsu Diesel ✅
- Volvo Penta ✅
- Wärtsilä ✅
- Yanmar Marine ✅
- Zexel ✅

### 2. **Inconsistent Routing**

**Problem:**

- Navbar STOCK menu linked to: `/brands/{brandSlug}` ✅
- `/stock` page linked to: `/stock/{brandSlug}` ❌ (routes don't exist!)

**Solution:** Updated `/stock` page to link to `/brands/{brandSlug}` for consistency

## Changes Made

### File: `/src/pages/stock/index.tsx`

#### Before:

```typescript
const stockBrands = [
  {
    name: "STORK WERKSPOOR",
    slug: "stork-werkspoor",
    description: "Marine diesel engines and spare parts",
  },
  // ... 8 more hardcoded brands
];

// Links pointed to non-existent routes
href={`/stock/${brand.slug}`}
```

#### After:

```typescript
import { brands } from "@/src/data";

// Uses real brands data
const filteredBrands = brands.filter((brand) =>
  brand.name.toLowerCase().includes(searchQuery.toLowerCase())
);

// Links point to correct brand pages
href={`/brands/${brand.slug}`}
```

## Benefits

1. ✅ **Single Source of Truth:** Stock page now uses the same brand data as navbar
2. ✅ **Consistent Routing:** All brand links point to `/brands/{slug}`
3. ✅ **Dynamic Updates:** Adding/removing brands in `brands.ts` automatically updates stock page
4. ✅ **18 Brands:** Now displays all 18 brands instead of just 9
5. ✅ **Real Descriptions:** Uses actual brand descriptions from data file
6. ✅ **Working Links:** All brand cards now link to existing brand pages

## Navigation Flow (Fixed)

```
/stock (Stock Page)
  ↓ Click on any brand card
/brands/{brandSlug} (Brand Categories Page)
  ↓ Click on any category card
/brands/{brandSlug}/{categorySlug} (Category Products Page)
  ↓ Click on any product card
/brands/{brandSlug}/{categorySlug}/{productSlug} (Product Detail Page)
```

## Verification

✅ Build successful - no TypeScript errors
✅ All 18 brands now displayed on `/stock` page
✅ All brand links work correctly
✅ Search functionality maintained
✅ Consistent with navbar STOCK mega menu

## Testing Instructions

1. Go to `http://localhost:3001/stock`
2. Verify all 18 brands are displayed (not the old 9 hardcoded ones)
3. Click on any brand card → Should navigate to `/brands/{brandSlug}`
4. Use search to filter brands by name
5. Verify brand descriptions match those in `brands.ts`

## Files Modified

- `/src/pages/stock/index.tsx` - Fixed brand data source and routing

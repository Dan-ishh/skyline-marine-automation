# Navigation Menu Structure - Quick Reference

## Current Menu Layout

```
╔═══════════════════════════════════════════════════════════════════╗
║  HOME  |  OUR INVENTORY ▼  |  CONTACT US  | [REQUEST A FREE QUOTE]║
╚═══════════════════════════════════════════════════════════════════╝
```

## Our Inventory Mega Menu

### Desktop View (Hover-based)

When user hovers "OUR INVENTORY":

```
┌────────────────────────────────────────────────────────────────┐
│  Brands                  │  [Selected Brand] Categories        │
├──────────────────────────┼─────────────────────────────────────┤
│  ► WARTSILA              │  32          (15 products)          │
│    CATERPILLAR           │  36          (12 products)          │
│    CUMMINS               │  38A         (10 products)          │
│    MAN B&W               │  46          (8 products)           │
│    ROLLS-ROYCE           │  64          (0 products)           │
│    YANMAR                │  ...                                │
│    DAIHATSU              │                                     │
│    DEUTZ                 │                                     │
│    MAK                   │                                     │
│    HYUNDAI HIMSEN        │                                     │
└──────────────────────────┴─────────────────────────────────────┘
```

### Interaction Flow:

1. **Hover Brand Name** (left column)

   - Categories appear in right column
   - Brand name gets highlighted/active state
   - Arrow icon (►) indicates selection

2. **Click Brand Name**

   - Navigate to: `/brands/[brandSlug]`
   - Example: `/brands/wartsila`
   - Shows all categories for that brand

3. **Click Category** (right column)
   - Navigate to: `/brands/[brandSlug]/[categorySlug]`
   - Example: `/brands/wartsila/32`
   - Shows all products in that category

## URL Structure

### Three Levels:

1. **Brand Page**

   ```
   URL: /brands/wartsila
   Shows: All categories (32, 36, 38A, 46, 64, etc.)
   ```

2. **Category Page**

   ```
   URL: /brands/wartsila/32
   Shows: All products in WARTSILA 32 category
   ```

3. **Product Detail Page**
   ```
   URL: /brands/wartsila/32/product-slug
   Shows: Individual product information
   ```

## Menu Configuration

### Hidden Items:

- ❌ **PRODUCTS** menu - Completely removed
- ❌ **STOCK** menu - Renamed to "OUR INVENTORY"

### Active Items:

- ✅ **HOME** - Homepage
- ✅ **OUR INVENTORY** - Brands → Categories mega menu
- ✅ **CONTACT US** - Contact page
- ✅ **REQUEST A FREE QUOTE** - CTA button (links to /contact)

## Component State

### File: `/src/Components/Navbar.tsx`

**State Variables:**

```typescript
const [showInventoryMegaMenu, setShowInventoryMegaMenu] = useState(false);
const [hoveredBrandId, setHoveredBrandId] = useState<string | null>(null);
```

**Key Functions:**

```typescript
// Import at top:
import { brands, getCategoriesByBrand } from "@/src/data";

// On brand hover:
onMouseEnter={() => setHoveredBrandId(brand.id)}

// Get categories for hovered brand:
{hoveredBrandId && (
  getCategoriesByBrand(hoveredBrandId).map((category) => ...)
)}
```

## Mobile Menu (TODO - Optional Enhancement)

### Recommended Structure:

```
📱 Mobile Menu
├─ HOME
├─ OUR INVENTORY ▼
│  ├─ WARTSILA ▼
│  │  ├─ 32
│  │  ├─ 36
│  │  ├─ 38A
│  │  ├─ 46
│  │  └─ More...
│  ├─ CATERPILLAR ▼
│  │  ├─ 3406
│  │  ├─ 3508
│  │  └─ More...
│  └─ [All Brands...]
└─ CONTACT US
```

**Implementation Notes:**

- Use accordion/collapsible sections
- Brand tap → Expand categories
- Category tap → Navigate to category page
- Smooth animations for expand/collapse

## CSS Classes (For Styling)

```scss
// Mega Menu Container
.navbar__mega-menu--hierarchical {
}

// Brands Column (Left)
.navbar__mega-menu-brands {
}
.navbar__brand-item {
}
.navbar__brand-item--active {
} // When hovered
.navbar__brand-link {
}

// Categories Column (Right)
.navbar__mega-menu-categories {
}
.navbar__categories-grid {
}
.navbar__category-link {
}
.navbar__category-count {
} // Product count badge

// Subtitle Headers
.navbar__mega-menu-subtitle {
}
```

## Brand IDs Reference

For use in code when filtering categories:

```typescript
// Major brands with model categories:
"wartsila-16"; // WARTSILA (9 categories)
"caterpillar-8"; // CATERPILLAR (10 categories)
"cummins-18"; // CUMMINS (3 categories)
"man-11"; // MAN B&W (4 categories)
"rolls-royce-21"; // ROLLS-ROYCE (2 categories)
"yanmar-27"; // YANMAR (3 categories)

// Brands with generic "Engine Parts" category:
"daihatsu-9";
"deutz-10";
"mak-12";
"hyundai-himsen-19";
"mitsubishi-13";
"mtu-14";
```

## Example Category Slugs

### WARTSILA:

- `16`, `20`, `26`, `32`, `34`, `36`, `38a`, `46`, `64`

### CATERPILLAR:

- `34-series`, `35-series`, `3406`, `3408`, `3412`, `3508`, `3512`, `3516`, `3600`, `3608`

### CUMMINS:

- `kt19`, `kt38`, `kt50`

### MAN B&W:

- `l23-30`, `l27-38`, `l32-40`, `l35-44`

---

## Quick Test Checklist

When testing the menu:

- [ ] Hover "OUR INVENTORY" → Mega menu appears
- [ ] Hover first brand (WARTSILA) → Categories appear on right
- [ ] Hover second brand (CATERPILLAR) → Different categories appear
- [ ] Click brand name → Navigate to brand page
- [ ] Click category → Navigate to category page
- [ ] Mouse leave menu → Menu closes, categories hide
- [ ] "PRODUCTS" menu not visible
- [ ] "STOCK" renamed to "OUR INVENTORY"

---

**Last Updated:** December 7, 2025
**Structure:** Brand → Category → Products
**Menu Type:** Two-column hierarchical mega menu

# STOCK Menu - Quick Visual Guide

## How It Works

### 1️⃣ Initial State

```
Navigation Bar:
[ HOME ] [ STOCK ▼ ] [ CONTACT US ] [ REQUEST A FREE QUOTE ]
```

### 2️⃣ Hover "STOCK" - Mega Menu Opens

```
┌─────────────────────────────────────────────────────────────┐
│  STOCK Menu - Available Brands                              │
├─────────────────────────────────────────────────────────────┤
│  Available Brands                                           │
│  ────────────────────                                       │
│  □ ABM MARINE EQUIPMENT                                     │
│  □ AKASAKA DIESELS                                          │
│  □ CATERPILLAR            →                                 │
│  □ CUMMINS                →                                 │
│  □ DAIHATSU               →                                 │
│  □ DEUTZ                  →                                 │
│  □ EMD                    →                                 │
│  □ HANSHIN DIESEL         →                                 │
│  □ HYUNDAI HIMSEN         →                                 │
│  □ IVECO                  →                                 │
│  □ MAK                    →                                 │
│  □ MAN B&W                →                                 │
│  □ MITSUBISHI             →                                 │
│  □ MTU                    →                                 │
│  □ MWM                    →                                 │
│  □ NIIGATA                →                                 │
│  □ PIELSTICK              →                                 │
│  □ ROLLS-ROYCE            →                                 │
│  □ STORK WERKSPOOR        →                                 │
│  □ SULZER                 →                                 │
│  □ WARTSILA               →                                 │
│  □ WAUKESHA               →                                 │
│  □ WICHMANN               →                                 │
│  □ YANMAR                 →                                 │
│  ... (scrollable)                                           │
└─────────────────────────────────────────────────────────────┘
```

### 3️⃣ Hover "WARTSILA" - Categories Popover Appears

```
┌──────────────────────────┬──────────────────────────────────┐
│  Available Brands        │  WARTSILA Categories             │
├──────────────────────────┼──────────────────────────────────┤
│  □ ABM MARINE EQUIPMENT  │  ┌────────────────────────────┐  │
│  □ AKASAKA DIESELS       │  │ 16         (0 products)    │  │
│  □ CATERPILLAR           │  │ 20         (0 products)    │  │
│  □ CUMMINS               │  │ 26         (0 products)    │  │
│  □ DAIHATSU              │  │ 32         (15 products)   │  │
│  □ DEUTZ                 │  │ 34         (0 products)    │  │
│  □ EMD                   │  │ 36         (12 products)   │  │
│  □ HANSHIN DIESEL        │  │ 38A        (10 products)   │  │
│  □ HYUNDAI HIMSEN        │  │ 46         (8 products)    │  │
│  ► WARTSILA        ━━━━━━│→ │ 64         (0 products)    │  │
│    (highlighted)         │  └────────────────────────────┘  │
│  □ YANMAR                │                                  │
│  ... (scrollable)        │  Click any category to view     │
│                          │  products                        │
└──────────────────────────┴──────────────────────────────────┘
```

### 4️⃣ Hover "CATERPILLAR" - Different Categories Appear

```
┌──────────────────────────┬──────────────────────────────────┐
│  Available Brands        │  CATERPILLAR Categories          │
├──────────────────────────┼──────────────────────────────────┤
│  □ ABM MARINE EQUIPMENT  │  ┌────────────────────────────┐  │
│  □ AKASAKA DIESELS       │  │ 34 Series  (0 products)    │  │
│  ► CATERPILLAR     ━━━━━━│→ │ 35 Series  (0 products)    │  │
│    (highlighted)         │  │ 3406       (5 products)    │  │
│  □ CUMMINS               │  │ 3408       (0 products)    │  │
│  □ DAIHATSU              │  │ 3412       (0 products)    │  │
│  □ DEUTZ                 │  │ 3508       (0 products)    │  │
│  □ EMD                   │  │ 3512       (0 products)    │  │
│  □ HANSHIN DIESEL        │  │ 3516       (0 products)    │  │
│  □ HYUNDAI HIMSEN        │  │ 3600       (0 products)    │  │
│  □ WARTSILA              │  │ 3608       (0 products)    │  │
│  □ YANMAR                │  └────────────────────────────┘  │
│  ... (scrollable)        │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

### 5️⃣ Click Category "32" (for WARTSILA)

```
✓ Navigates to: /brands/wartsila/32
✓ Page shows: All products in WARTSILA 32 category
✓ Breadcrumb: Home > Brands > WARTSILA > 32
```

### 6️⃣ Click Brand Name "WARTSILA"

```
✓ Navigates to: /brands/wartsila
✓ Page shows: All categories for WARTSILA (32, 36, 38A, 46, 64, etc.)
✓ Breadcrumb: Home > Brands > WARTSILA
```

---

## User Actions Summary

| Action               | Result                                           |
| -------------------- | ------------------------------------------------ |
| **Hover "STOCK"**    | Mega menu opens with ALL brands                  |
| **Hover Brand Name** | Categories popover appears on right              |
| **Click Brand Name** | Navigate to `/brands/[brandSlug]`                |
| **Click Category**   | Navigate to `/brands/[brandSlug]/[categorySlug]` |
| **Mouse Leave**      | Mega menu closes                                 |

---

## Example User Journeys

### Journey 1: Find WARTSILA 32 Products

```
1. Hover "STOCK"
2. Hover "WARTSILA"
3. Click "32"
→ Result: Viewing all WARTSILA 32 products
```

### Journey 2: Browse CATERPILLAR Categories

```
1. Hover "STOCK"
2. Click "CATERPILLAR"
→ Result: Viewing all CATERPILLAR categories
```

### Journey 3: Direct to Product

```
1. Hover "STOCK"
2. Hover "CATERPILLAR"
3. Click "3406"
4. Click specific product
→ Result: Viewing product details page
```

---

## Brand → Category Mapping

### Brands with Multiple Categories:

**WARTSILA (9 categories):**

- 16, 20, 26, 32, 34, 36, 38A, 46, 64

**CATERPILLAR (10 categories):**

- 34 Series, 35 Series, 3406, 3408, 3412, 3508, 3512, 3516, 3600, 3608

**CUMMINS (3 categories):**

- KT19, KT38, KT50

**MAN B&W (4 categories):**

- L23/30, L27/38, L32/40, L35/44

**ROLLS-ROYCE (2 categories):**

- Bergen B32:40, Bergen C25:33

**YANMAR (3 categories):**

- 6EAL, 6N18, 6N21

### Brands with Generic Category:

**These brands show "Engine Parts" category:**

- DAIHATSU
- DEUTZ
- MAK
- HYUNDAI HIMSEN
- MITSUBISHI
- MTU

---

## Mobile View Recommendation

```
📱 STOCK (tap to expand)
   ├─ WARTSILA (tap to expand)
   │  ├─ 32
   │  ├─ 36
   │  ├─ 38A
   │  ├─ 46
   │  └─ 64
   ├─ CATERPILLAR (tap to expand)
   │  ├─ 3406
   │  ├─ 3508
   │  └─ ...
   └─ ... (all brands)
```

---

## Performance Notes

✅ **Lightweight:** Only renders visible content
✅ **Fast:** Categories load on hover (no API call needed)
✅ **Scalable:** Handles 27+ brands with 50+ total categories
✅ **Smooth:** Popover appears/disappears instantly
✅ **Accessible:** Keyboard navigation supported

---

**Created:** December 7, 2025
**Status:** Production Ready
**Navigation Type:** Hover-based mega menu with category popover

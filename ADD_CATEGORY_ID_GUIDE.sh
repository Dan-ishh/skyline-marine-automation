#!/bin/bash
# Script to add categoryId to products in products.ts
# This is a reference guide for the mapping

# WARTSILA products → wartsila-32 category
# prod-001: Wärtsilä 31 → wartsila-32 ✅ (already done)
# prod-006: Wärtsilä NACOS → wartsila-32 (automation system)
# prod-016, prod-020, prod-025, prod-027, prod-031, prod-035: → wartsila-36 or wartsila-38a
# prod-990-997: Wärtsilä 46 → wartsila-46 ✅ (already done)

# CATERPILLAR products → caterpillar-3516
# prod-003, prod-014: → caterpillar-3516 ✅ (prod-003 done)

# MAN products
# prod-002: MAN B&W → man-l32-40 ✅ (already done)
# prod-008, prod-011, prod-016: MAN Diesel → man-l32-40 or man-l27-38

# YANMAR products → yanmar-6eal
# prod-004: ✅ (already done)

# CUMMINS products → cummins-kt50
# prod-005: ✅ (already done)

# ROLLS-ROYCE products → rolls-royce-bergen-b32-40
# prod-007, prod-015, prod-018, prod-019, etc.: → rolls-royce-bergen-b32-40

# Other brands: Map to their generic "Engine Parts" category
# MITSUBISHI → mitsubishi-parts
# DEUTZ → deutz-parts
# DAIHATSU → daihatsu-parts
# VOLVO → Use brand categories if they exist
# SULZER → sulzer (if category exists)

echo "This is a reference guide for adding categoryId to products"
echo "Edit products.ts manually or use find/replace to add categoryId fields"

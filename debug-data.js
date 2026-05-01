/**
 * DEBUG: Test script to verify data loading works correctly
 * This helps identify issues with the turbochargers page
 */

const {
  getBrandsByCategory,
  getProductsByMainCategory,
} = require("./src/utils/dataUtils");
const { brands } = require("./src/data/brands");
const { products } = require("./src/data/products");

console.log("\n=== DATA LOADING DEBUG ===\n");

// Test 1: Check if products export works
console.log(`Total products loaded: ${products.length}`);
console.log(`Total brands loaded: ${brands.length}`);

// Test 2: Check turbocharger products
const turboProducts = getProductsByMainCategory("turbochargers");
console.log(`\nTurbocharger products: ${turboProducts.length}`);

// List first 5
console.log("First 5 turbocharger products:");
turboProducts.slice(0, 5).forEach((p) => {
  console.log(`  - ${p.name} (brandId: ${p.brandId})`);
});

// Test 3: Check brands by category
const turboBrands = getBrandsByCategory("turbochargers");
console.log(`\nTurbocharger brands: ${turboBrands.length}`);
turboBrands.forEach((b) => {
  console.log(`  - ${b.name} (${b.slug})`);
});

// Test 4: Check if all brand IDs exist
console.log("\n\nVerifying brand ID references...");
const brandIds = new Set(turboProducts.map((p) => p.brandId));
const missingBrands = [];

brandIds.forEach((brandId) => {
  const exists = brands.find((b) => b.id === brandId);
  if (!exists) {
    missingBrands.push(brandId);
    console.log(`  ❌ Missing brand: ${brandId}`);
  }
});

if (missingBrands.length === 0) {
  console.log("  ✓ All brand IDs are valid");
}

console.log("\n=== END DEBUG ===\n");

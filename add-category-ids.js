/**
 * This script adds categoryId to all products in products.ts
 * Run with: node add-category-ids.js
 */

const fs = require("fs");
const path = require("path");

// Mapping of brandId to default categoryId
const brandToCategoryMap = {
  "wartsila-16": "wartsila-32", // Wärtsilä → 32 series (default)
  "cat-1": "caterpillar-3516", // Caterpillar → 3516
  "man-bw-6": "man-l32-40", // MAN B&W → L32/40
  "man-7": "man-l32-40", // MAN Diesel → L32/40
  "yanmar-17": "yanmar-6eal", // Yanmar → 6EAL
  "cummins-2": "cummins-kt50", // Cummins → KT50
  "rolls-royce-11": "rolls-royce-bergen-b32-40", // Rolls-Royce → Bergen B32:40
  "mitsubishi-8": "mitsubishi-parts", // Mitsubishi → Engine Parts
  "deutz-3": "deutz-parts", // Deutz → Engine Parts
  "daihatsu-14": "daihatsu-parts", // Daihatsu → Engine Parts
  "volvo-15": "wartsila-32", // Volvo → Use Wärtsilä category as fallback
  "sulzer-13": "wartsila-32", // Sulzer → Use Wärtsilä category as fallback
  "niigata-9": "wartsila-32", // Niigata → Use Wärtsilä category as fallback
};

const filePath = path.join(__dirname, "src/data/products.ts");
let content = fs.readFileSync(filePath, "utf8");

// Find all products that don't have categoryId
// Pattern: brandId: "xxx",\n    category:
// We need to add categoryId between these two lines

Object.entries(brandToCategoryMap).forEach(([brandId, categoryId]) => {
  // Match pattern: brandId: "brandId",\n    category:
  // And insert categoryId: "categoryId",\n before category:

  const regex = new RegExp(`(brandId: "${brandId}",)\\n(    category:)`, "g");

  content = content.replace(
    regex,
    `$1\\n    categoryId: "${categoryId}",\\n$2`
  );
});

// Write back to file
fs.writeFileSync(filePath, content, "utf8");

console.log("✅ Successfully added categoryId to all products!");
console.log("Mappings applied:");
Object.entries(brandToCategoryMap).forEach(([brandId, categoryId]) => {
  console.log(`  ${brandId} → ${categoryId}`);
});

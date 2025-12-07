/**
 * Products Page
 * Route: /products
 * Displays all products from all brands
 */

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { products } from "@/src/data";
import { ProductGridSkeleton } from "@/src/Components";
import type { Product } from "@/src/types";
import { getProductCategoryName } from "@/src/utils/productUtils";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(
      new Set(products.map((p) => getProductCategoryName(p)).filter(Boolean))
    ),
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAllProducts(products);
      setFilteredProducts(products);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          getProductCategoryName(p)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (typeof p.brand === "string" ? p.brand : p.brand?.name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, allProducts]);

  return (
    <>
      <Head>
        <title>All Products - Skyline Marine Automation</title>
        <meta
          name="description"
          content="Browse all marine equipment products from top brands. Find engines, automation systems, pumps, and more."
        />
      </Head>

      <div className="products-page">
        {/* Hero Section */}
        <section className="products-page__hero">
          <div className="container">
            <div className="products-page__hero-content">
              <h1 className="products-page__title">
                Our{" "}
                <span className="products-page__title--highlight">
                  Products
                </span>
              </h1>
              <p className="products-page__subtitle">
                Browse our complete collection of marine equipment and products
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="products-page__filters">
          <div className="container">
            <div className="products-page__filters-wrapper">
              {/* Search Bar */}
              <div className="products-page__search">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="products-page__search-input"
                />
              </div>

              {/* Category Filter */}
              <div className="products-page__category-filter">
                <label htmlFor="category-select">Filter by Category:</label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="products-page__category-select"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="products-page__results-count">
                Showing <strong>{filteredProducts.length}</strong> of{" "}
                <strong>{allProducts.length}</strong> products
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-page__content">
          <div className="container">
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length > 0 ? (
              <div className="products-page__grid">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="products-page__card"
                  >
                    <div className="products-page__card-image">
                      <img
                        src={product.thumbnail || product.images[0]}
                        alt={product.name}
                        loading="lazy"
                      />
                      <div className="products-page__card-overlay">
                        <span className="products-page__card-view">
                          View Details →
                        </span>
                      </div>
                    </div>
                    <div className="products-page__card-content">
                      <h3 className="products-page__card-title">
                        {product.name}
                      </h3>
                      <p className="products-page__card-category">
                        {getProductCategoryName(product)}
                      </p>
                      <div className="products-page__card-footer">
                        <span className="products-page__card-brand">
                          {typeof product.brand === "string"
                            ? product.brand
                            : product.brand?.name || "N/A"}
                        </span>
                        {product.enquiryCount > 0 && (
                          <span className="products-page__card-enquiries">
                            {product.enquiryCount} enquiries
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="products-page__empty">
                <div className="products-page__empty-icon">🔍</div>
                <h3 className="products-page__empty-title">
                  No products found
                </h3>
                <p className="products-page__empty-text">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="products-page__empty-button"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

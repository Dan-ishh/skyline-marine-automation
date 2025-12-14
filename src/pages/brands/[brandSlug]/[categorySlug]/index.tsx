/**
 * Category Products Page
 * Route: /brands/[brandSlug]/[categorySlug]
 * Displays all products for a specific brand category
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useBrandStore, useProductStore } from "@/src/store";
import { getCategoryBySlug } from "@/src/data/categories";
import { ProductGridSkeleton } from "@/src/Components";
import type { Category, Product } from "@/src/types";

export default function CategoryPage() {
  const router = useRouter();
  const { brandSlug, categorySlug } = router.query;

  const {
    selectedBrand,
    loading: brandLoading,
    fetchBrandBySlug,
  } = useBrandStore();
  const { products, loading: productsLoading } = useProductStore();

  const [category, setCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (brandSlug && typeof brandSlug === "string") {
      fetchBrandBySlug(brandSlug);
    }
  }, [brandSlug, fetchBrandBySlug]);

  useEffect(() => {
    if (selectedBrand && categorySlug && typeof categorySlug === "string") {
      const foundCategory = getCategoryBySlug(selectedBrand.id, categorySlug);
      setCategory(foundCategory || null);

      if (foundCategory) {
        // Filter products by categoryId
        const filteredProducts = products.filter(
          (product) => product.categoryId === foundCategory.id
        );
        setCategoryProducts(filteredProducts);
      }
    }
  }, [selectedBrand, categorySlug, products]);

  const loading = brandLoading || productsLoading;

  if (loading) {
    return (
      <div className="loading-container">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (!selectedBrand || !category) {
    return (
      <div className="error-container">
        <h1>Category Not Found</h1>
        <p>The requested category could not be found.</p>
        <Link href="/brands">Back to Brands</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {selectedBrand.name} {category.name} - Skyline Marine Automation
        </title>
        <meta
          name="description"
          content={`Browse ${selectedBrand.name} ${category.name} series products and equipment`}
        />
      </Head>

      <main className="category-products-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <Link href="/stock">stock</Link>
          <span className="separator">/</span>
          <Link href={`/brands/${brandSlug}`}>{selectedBrand.name}</Link>
          <span className="separator">/</span>
          <span className="current">{category.name}</span>
        </nav>

        {/* Category Header */}
        <section className="category-header">
          <div className="category-header-content">
            {category.thumbnail && (
              <div className="category-image">
                <Image
                  src={category.thumbnail}
                  alt={category.name}
                  width={80}
                  height={80}
                  objectFit="cover"
                />
              </div>
            )}
            <div className="category-info">
              <div className="category-breadcrumb-title">
                <span className="brand-name">{selectedBrand.name}</span>
                <span className="separator-icon">›</span>
                <span className="category-name">{category.name}</span>
              </div>
              <h1 className="category-title">
                {selectedBrand.name} {category.name} Series
              </h1>
              {category.description && (
                <p className="category-description">{category.description}</p>
              )}
              <div className="category-stats">
                <div className="stat-item">
                  <svg
                    className="icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  <span className="stat-value">{categoryProducts.length}</span>
                  <span className="stat-label">
                    {categoryProducts.length === 1 ? "Product" : "Products"}{" "}
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          {categoryProducts.length > 0 ? (
            <div className="products-grid">
              {categoryProducts.map((product) => (
                <Link
                  href={`/brands/${brandSlug}/${categorySlug}/${product.slug}`}
                  key={product.id}
                  className="product-card"
                >
                  <div className="product-card-image">
                    <Image
                      src={product.thumbnail || product.images[0]}
                      alt={product.name}
                      width={400}
                      height={300}
                      objectFit="cover"
                      loading="lazy"
                    />
                    <div className="product-card-overlay">
                      <span className="view-text">View Details →</span>
                    </div>
                    {/* {product.inStock && (
                      <span className="stock-badge">In Stock</span>
                    )} */}
                  </div>
                  <div className="product-card-content">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-brand">{selectedBrand.name}</p>
                    <div className="product-footer">
                      {product.enquiryCount > 0 && (
                        <div className="enquiry-count">
                          <svg
                            className="icon"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span>{product.enquiryCount} enquiries</span>
                        </div>
                      )}
                      <svg
                        className="arrow-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">📦</div>
              <h3>No Products Available</h3>
              <p>There are currently no products in this category.</p>
              {/* <Link href={`/brands/${brandSlug}`} className="back-button">
                Browse Other Categories
              </Link> */}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

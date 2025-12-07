/**
 * Brand Categories Page
 * Route: /brands/[brandSlug]
 * Displays all categories for a specific brand
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useBrandStore } from "@/src/store";
import { getCategoriesByBrand } from "@/src/data/categories";
import { CategoriesGridSkeleton } from "@/src/Components";
import type { Category } from "@/src/types";

export default function BrandCategoriesPage() {
  const router = useRouter();
  const { brandSlug } = router.query;

  const { selectedBrand, loading, fetchBrandBySlug } = useBrandStore();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (brandSlug && typeof brandSlug === "string") {
      fetchBrandBySlug(brandSlug);
    }
  }, [brandSlug, fetchBrandBySlug]);

  useEffect(() => {
    if (selectedBrand) {
      const brandCategories = getCategoriesByBrand(selectedBrand.id);
      setCategories(brandCategories);
    }
  }, [selectedBrand]);

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Brand... - Skyline Marine Automation</title>
        </Head>
        <main className="brand-categories-page">
          {/* Brand Header Skeleton */}
          <section className="brand-header">
            <div className="brand-header-content">
              <div className="brand-info">
                <div
                  className="skeleton-text"
                  style={{
                    height: "40px",
                    width: "300px",
                    marginBottom: "16px",
                  }}
                />
                <div
                  className="skeleton-text"
                  style={{
                    height: "20px",
                    width: "500px",
                    marginBottom: "24px",
                  }}
                />
                <div className="brand-stats">
                  <div className="stat-item">
                    <div
                      className="skeleton-text"
                      style={{
                        height: "32px",
                        width: "40px",
                        marginBottom: "8px",
                      }}
                    />
                    <div
                      className="skeleton-text"
                      style={{ height: "16px", width: "80px" }}
                    />
                  </div>
                  <div className="stat-item">
                    <div
                      className="skeleton-text"
                      style={{
                        height: "32px",
                        width: "40px",
                        marginBottom: "8px",
                      }}
                    />
                    <div
                      className="skeleton-text"
                      style={{ height: "16px", width: "80px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Grid Skeleton */}
          <section className="categories-section">
            <div className="section-header">
              <div
                className="skeleton-text"
                style={{ height: "32px", width: "250px", marginBottom: "12px" }}
              />
              <div
                className="skeleton-text"
                style={{ height: "18px", width: "400px" }}
              />
            </div>
            <CategoriesGridSkeleton count={9} />
          </section>
        </main>
      </>
    );
  }

  if (!selectedBrand) {
    return (
      <div className="error-container">
        <h1>Brand Not Found</h1>
        <p>The requested brand could not be found.</p>
        <Link href="/brands">Back to Brands</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {selectedBrand.name} Categories - Skyline Marine Automation
        </title>
        <meta
          name="description"
          content={`Browse ${selectedBrand.name} product categories on Skyline Marine Automation`}
        />
      </Head>

      <main className="brand-categories-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <Link href="/stock">stock</Link>
          <span className="separator">/</span>
          <span className="current">{selectedBrand.name}</span>
        </nav>

        {/* Brand Header */}
        <section className="brand-header">
          <div className="brand-header-content">
            {selectedBrand.logo && (
              <div className="brand-logo">
                <Image
                  src={selectedBrand.logo}
                  alt={selectedBrand.name}
                  width={120}
                  height={60}
                  objectFit="contain"
                />
              </div>
            )}
            <div className="brand-info">
              <h1 className="brand-title">{selectedBrand.name}</h1>
              {selectedBrand.description && (
                <p className="brand-description">{selectedBrand.description}</p>
              )}
              <div className="brand-stats">
                <div className="stat-item">
                  <span className="stat-value">{categories.length}</span>
                  <span className="stat-label">Categories</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    {selectedBrand.productCount || 0}
                  </span>
                  <span className="stat-label">Products</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="categories-section">
          <div className="section-header">
            <h2 className="section-title">Product Categories</h2>
            <p className="section-subtitle">
              Select a category to view available products
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="categories-grid">
              {categories.map((category) => (
                <Link
                  href={`/brands/${brandSlug}/${category.slug}`}
                  key={category.id}
                  className="category-card"
                >
                  <div className="category-card-image">
                    <Image
                      src={
                        category.thumbnail ||
                        "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"
                      }
                      alt={category.name}
                      width={400}
                      height={250}
                      objectFit="cover"
                      loading="lazy"
                    />
                    <div className="category-card-overlay">
                      <span className="view-text">View Products →</span>
                    </div>
                  </div>

                  <div className="category-card-content">
                    <h3 className="category-name">{category.name}</h3>
                    {category.description && (
                      <p className="category-description">
                        {category.description}
                      </p>
                    )}
                    <div className="category-footer">
                      <div className="product-count">
                        <svg
                          className="icon"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>
                          {category.productCount}{" "}
                          {category.productCount === 1 ? "Product" : "Products"}
                        </span>
                      </div>
                      <svg
                        className="arrow-icon"
                        width="20"
                        height="20"
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
              <h3>No Categories Available</h3>
              <p>There are currently no categories for this brand.</p>
              <Link href="/brands" className="back-button">
                Browse Other Brands
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

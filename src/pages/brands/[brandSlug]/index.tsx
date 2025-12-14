/**
 * Brand Products Page
 * Route: /brands/[brandSlug]
 * Displays all products for a specific brand
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useBrandStore, useProductStore } from "@/src/store";
import { ProductGridSkeleton } from "@/src/Components";
import type { Product } from "@/src/types";

export default function BrandProductsPage() {
  const router = useRouter();
  const { brandSlug } = router.query;

  const {
    selectedBrand,
    loading: brandLoading,
    fetchBrandBySlug,
  } = useBrandStore();
  const {
    products,
    loading: productsLoading,
    fetchProducts,
  } = useProductStore();

  const [brandProducts, setBrandProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (brandSlug && typeof brandSlug === "string") {
      fetchBrandBySlug(brandSlug);
    }
  }, [brandSlug, fetchBrandBySlug]);

  useEffect(() => {
    // Load all products on page mount
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (selectedBrand && products.length > 0) {
      // Filter products by brand ID
      const filteredProducts = products.filter(
        (product) => product.brandId === selectedBrand.id
      );
      setBrandProducts(filteredProducts);
    }
  }, [selectedBrand, products]);

  const loading = brandLoading || productsLoading;

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Brand... - Skyline Marine Automation</title>
        </Head>
        <main className="brand-products-page">
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

          {/* Products Grid Skeleton */}
          <section className="products-section">
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
            <ProductGridSkeleton count={8} />
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
        <title>{selectedBrand.name} Products - Skyline Marine Automation</title>
        <meta
          name="description"
          content={`Browse ${selectedBrand.name} marine engine and component products on Skyline Marine Automation`}
        />
      </Head>

      <main className="brand-products-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          {/* <span className="separator">/</span> */}
          {/* <Link href="/stock">stock</Link> */}
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
                  <span className="stat-value">{brandProducts.length}</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    {selectedBrand.productCount || 0}
                  </span>
                  <span className="stat-label">Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">Products</h2>
            <p className="section-subtitle">
              Select a product to view detailed information
            </p>
          </div>

          {brandProducts.length > 0 ? (
            <div className="products-grid">
              {brandProducts.map((product) => (
                <Link
                  href={`/brands/${brandSlug}/${product.slug}${
                    router.query.from ? `?from=${router.query.from}` : ""
                  }`}
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
              <p>There are currently no products for this brand.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

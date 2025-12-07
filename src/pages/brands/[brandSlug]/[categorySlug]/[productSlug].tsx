/**
 * Product Detail Page (New Route)
 * Route: /brands/[brandSlug]/[categorySlug]/[productSlug]
 * Displays individual product details with full context
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useBrandStore, useProductStore, useUIStore } from "@/src/store";
import { getCategoryBySlug } from "@/src/data/categories";
import type { Product, Category } from "@/src/types";

export default function ProductDetailPage() {
  const router = useRouter();
  const { brandSlug, categorySlug, productSlug } = router.query;

  const {
    selectedBrand,
    loading: brandLoading,
    fetchBrandBySlug,
  } = useBrandStore();
  const { products, loading: productsLoading } = useProductStore();
  const { openInquiryModal } = useUIStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    if (brandSlug && typeof brandSlug === "string") {
      fetchBrandBySlug(brandSlug);
    }
  }, [brandSlug, fetchBrandBySlug]);

  useEffect(() => {
    if (productSlug && typeof productSlug === "string" && products.length > 0) {
      const foundProduct = products.find((p) => p.slug === productSlug);
      setProduct(foundProduct || null);

      if (foundProduct) {
        setMainImage(foundProduct.thumbnail || foundProduct.images[0]);
      }
    }
  }, [productSlug, products]);

  useEffect(() => {
    if (selectedBrand && categorySlug && typeof categorySlug === "string") {
      const foundCategory = getCategoryBySlug(selectedBrand.id, categorySlug);
      setCategory(foundCategory || null);
    }
  }, [selectedBrand, categorySlug]);

  const loading = brandLoading || productsLoading;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">Loading product details...</div>
      </div>
    );
  }

  if (!product || !selectedBrand || !category) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h1>Product Not Found</h1>
          <p>The requested product could not be found.</p>
          <Link href="/brands" className="back-button">
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  const handleInquiry = () => {
    openInquiryModal({
      brandId: selectedBrand.id,
      brandName: selectedBrand.name,
      productId: product.id,
      productName: product.name,
    });
  };

  return (
    <>
      <Head>
        <title>
          {product.name} - {selectedBrand.name} {category.name} - Skyline Marine
          Automation
        </title>
        <meta name="description" content={product.description} />
      </Head>

      <main className="product-detail-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <Link href="/brands">Brands</Link>
          <span className="separator">/</span>
          <Link href={`/brands/${brandSlug}`}>{selectedBrand.name}</Link>
          <span className="separator">/</span>
          <Link href={`/brands/${brandSlug}/${categorySlug}`}>
            {category.name}
          </Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </nav>

        {/* Product Content */}
        <div className="product-detail-container">
          <div className="product-detail-content">
            {/* Image Gallery */}
            <div className="product-gallery">
              <div className="product-main-image">
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={600}
                  height={600}
                  objectFit="contain"
                  priority
                />
                {product.inStock && (
                  <span className="stock-badge-large">In Stock</span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="product-thumbnails">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image)}
                      className={`thumbnail-button ${
                        mainImage === image ? "active" : ""
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        width={100}
                        height={100}
                        objectFit="cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-meta">
                <span className="meta-brand">{selectedBrand.name}</span>
                <span className="meta-separator">›</span>
                <span className="meta-category">{category.name}</span>
              </div>

              <h1 className="product-title">{product.name}</h1>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              {/* Stock & Inquiry Stats */}
              <div className="product-badges">
                <div
                  className={`stock-status ${
                    product.inStock ? "in-stock" : "out-of-stock"
                  }`}
                >
                  <svg
                    className="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {product.inStock ? (
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
                    ) : (
                      <circle cx="12" cy="12" r="10" />
                    )}
                  </svg>
                  <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
                </div>
                {product.enquiryCount > 0 && (
                  <div className="enquiry-badge">
                    <svg
                      className="icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>{product.enquiryCount} enquiries received</span>
                  </div>
                )}
              </div>

              {/* Inquiry Button */}
              <div className="product-actions">
                <button onClick={handleInquiry} className="inquiry-button">
                  <svg
                    className="icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Send Inquiry</span>
                </button>
              </div>

              {/* Specifications */}
              {Object.keys(product.specifications).length > 0 && (
                <div className="product-specifications">
                  <h2 className="specs-title">Technical Specifications</h2>
                  <div className="specifications-table">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div key={key} className="spec-row">
                          <span className="spec-label">{key}</span>
                          <span className="spec-value">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {products.filter(
          (p) => p.categoryId === category.id && p.id !== product.id
        ).length > 0 && (
          <section className="related-products">
            <div className="related-products-header">
              <h2 className="section-title">
                More from {category.name} Series
              </h2>
              <Link
                href={`/brands/${brandSlug}/${categorySlug}`}
                className="view-all-link"
              >
                View All
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="related-products-grid">
              {products
                .filter(
                  (p) => p.categoryId === category.id && p.id !== product.id
                )
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    href={`/brands/${brandSlug}/${categorySlug}/${relatedProduct.slug}`}
                    key={relatedProduct.id}
                    className="related-product-card"
                  >
                    <div className="related-product-image">
                      <Image
                        src={
                          relatedProduct.thumbnail || relatedProduct.images[0]
                        }
                        alt={relatedProduct.name}
                        width={300}
                        height={250}
                        objectFit="cover"
                        loading="lazy"
                      />
                      <div className="related-product-overlay">
                        <span>View Details</span>
                      </div>
                    </div>
                    <div className="related-product-info">
                      <h3 className="related-product-title">
                        {relatedProduct.name}
                      </h3>
                      <p className="related-product-brand">
                        {selectedBrand.name}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

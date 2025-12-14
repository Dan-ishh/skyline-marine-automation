/**
 * Product Detail Page
 * Route: /brands/[brandSlug]/[productSlug]
 * Displays individual product details
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useBrandStore, useProductStore, useUIStore } from "@/src/store";
import { Skeleton } from "@/src/Components";
import type { Product } from "@/src/types";

export default function ProductDetailPage() {
  const router = useRouter();
  const { brandSlug, productSlug } = router.query;

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
  const { openInquiryModal } = useUIStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

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
    if (productSlug && typeof productSlug === "string" && products.length > 0) {
      const foundProduct = products.find((p) => p.slug === productSlug);
      setProduct(foundProduct || null);

      if (foundProduct) {
        setMainImage(foundProduct.thumbnail || foundProduct.images[0]);
      }
    }
  }, [productSlug, products]);

  const loading = brandLoading || productsLoading;

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Product... - Skyline Marine Automation</title>
        </Head>
        <main className="product-detail-page">
          {/* Breadcrumb Skeleton */}
          <nav className="breadcrumb">
            <Skeleton variant="text" width="150px" height="16px" />
            <span className="separator">/</span>
            <Skeleton variant="text" width="150px" height="16px" />
            <span className="separator">/</span>
            <Skeleton variant="text" width="150px" height="16px" />
          </nav>

          {/* Product Content Skeleton */}
          <div className="product-detail-container">
            <div className="product-detail-content">
              {/* Image Gallery Skeleton */}
              <div className="product-gallery">
                <div className="product-main-image">
                  <Skeleton
                    variant="rectangular"
                    width="600px"
                    height="600px"
                  />
                </div>
                <div className="product-thumbnails">
                  <Skeleton
                    variant="rectangular"
                    width="100px"
                    height="100px"
                    count={3}
                  />
                </div>
              </div>

              {/* Product Info Skeleton */}
              <div className="product-info">
                <div className="product-meta">
                  <Skeleton variant="text" width="150px" height="16px" />
                </div>

                <h1 className="product-title">
                  <Skeleton variant="text" width="400px" height="32px" />
                </h1>

                <div className="product-description">
                  <Skeleton variant="text" width="100%" height="60px" />
                </div>

                {/* Stock & Inquiry Stats Skeleton */}
                <div className="product-badges">
                  <Skeleton variant="text" width="200px" height="32px" />
                  <Skeleton variant="text" width="250px" height="32px" />
                </div>

                {/* Inquiry Button Skeleton */}
                <div className="product-actions">
                  <Skeleton variant="text" width="200px" height="48px" />
                </div>

                {/* Specifications Skeleton */}
                <div className="product-specifications">
                  <Skeleton variant="text" width="250px" height="24px" />
                  <div style={{ marginTop: "1rem" }}>
                    <Skeleton
                      variant="text"
                      width="100%"
                      height="24px"
                      count={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!product || !selectedBrand) {
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

  // Find related products from same brand
  const relatedProducts = products.filter(
    (p) => p.brandId === selectedBrand.id && p.id !== product.id
  );

  return (
    <>
      <Head>
        <title>
          {product.name} - {selectedBrand.name} - Skyline Marine Automation
        </title>
        <meta name="description" content={product.description} />
      </Head>

      <main className="product-detail-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          {router.query.from === "marine-spare-parts" ? (
            <>
              <Link href="/marine-spare-parts">Marine Spare Parts</Link>
              <span className="separator">/</span>
            </>
          ) : router.query.from === "generators" ? (
            <>
              <Link href="/generators">Generators</Link>
              <span className="separator">/</span>
            </>
          ) : router.query.from === "turbochargers" ? (
            <>
              <Link href="/turbochargers">Turbochargers</Link>
              <span className="separator">/</span>
            </>
          ) : router.query.from === "complete-engine" ? (
            <>
              <Link href="/complete-engine">Complete Engine</Link>
              <span className="separator">/</span>
            </>
          ) : null}
          <Link href={`/brands/${brandSlug}`}>{selectedBrand.name}</Link>
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
                {/* {product.inStock && (
                  <span className="stock-badge-large">In Stock</span>
                )} */}
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
                  {/* <span>{product.inStock ? "In Stock" : "Out of Stock"}</span> */}
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
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <div className="related-products-header">
              <h2 className="section-title">
                More {selectedBrand.name} Products
              </h2>
              <Link
                href={`/brands/${brandSlug}${
                  router.query.from ? `?from=${router.query.from}` : ""
                }`}
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
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link
                  href={`/brands/${brandSlug}/${relatedProduct.slug}${
                    router.query.from ? `?from=${router.query.from}` : ""
                  }`}
                  key={relatedProduct.id}
                  className="related-product-card"
                >
                  <div className="related-product-image">
                    <Image
                      src={relatedProduct.thumbnail || relatedProduct.images[0]}
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

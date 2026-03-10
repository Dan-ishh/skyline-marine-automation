/**
 * Complete Engine Product Detail Page
 * Route: /complete-engine/[brandSlug]/[productSlug]
 * Displays detailed information about a specific complete engine product
 *
 * Example: /complete-engine/caterpillar/cat-c32-diesel-generator-806kw-2019
 * Shows: Full product details, specifications, images, inquiry form
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useBrandStore, useUIStore } from "@/src/store";
import { CategoryPageSkeleton } from "@/src/Components";
import {
  getProductsByBrandAndCategory,
  getCategoryBreadcrumb,
  getProductBySlug,
} from "@/src/utils/dataUtils";
import type { Product } from "@/src/types";
import styles from "./ProductDetail.module.scss";

const CATEGORY = "complete-engine";

export default function CompleteEngineProductDetailPage() {
  const router = useRouter();
  const { brandSlug, productSlug } = router.query;

  const {
    selectedBrand,
    loading: brandLoading,
    fetchBrandBySlug,
  } = useBrandStore();

  const { openInquiryModal } = useUIStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  // Fetch brand when slug changes
  useEffect(() => {
    if (brandSlug && typeof brandSlug === "string") {
      fetchBrandBySlug(brandSlug);
    }
  }, [brandSlug, fetchBrandBySlug]);

  // Fetch product and related products when brand and product slug change
  useEffect(() => {
    if (productSlug && typeof productSlug === "string" && selectedBrand) {
      // Get the specific product
      const foundProduct = getProductBySlug(productSlug);

      if (
        foundProduct &&
        foundProduct.brandId === selectedBrand.id &&
        foundProduct.mainCategory === CATEGORY
      ) {
        setProduct(foundProduct);

        // Get related products (same brand, same category, exclude current)
        const related = getProductsByBrandAndCategory(
          selectedBrand.id,
          CATEGORY
        ).filter((p) => p.id !== foundProduct.id);

        setRelatedProducts(related);
      }

      setIsLoading(false);
    }
  }, [productSlug, selectedBrand]);

  // Handle image carousel
  const nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  // Copy product link to clipboard
  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  // Loading state
  if (isLoading || brandLoading) {
    return (
      <>
        <Head>
          <title>Loading Product... - Skyline Marine Automation</title>
        </Head>
        <main className={styles.productDetailPage}>
          <CategoryPageSkeleton gridCount={1} />
        </main>
      </>
    );
  }

  // Product not found or doesn't belong to this brand/category
  if (!product) {
    return (
      <>
        <Head>
          <title>Product Not Found - Skyline Marine Automation</title>
        </Head>
        <main className={styles.productDetailPage}>
          <section className={styles.errorSection}>
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            {selectedBrand && (
              <Link href={`/complete-engine/${selectedBrand.slug}`}>
                ← Back to {selectedBrand.name}
              </Link>
            )}
            {!selectedBrand && (
              <Link href="/complete-engine">← Back to Complete Engine</Link>
            )}
          </section>
        </main>
      </>
    );
  }

  // Brand not found
  if (!selectedBrand) {
    return (
      <>
        <Head>
          <title>Brand Not Found - Skyline Marine Automation</title>
        </Head>
        <main className={styles.productDetailPage}>
          <section className={styles.errorSection}>
            <h1>Brand Not Found</h1>
            <p>The brand you're looking for doesn't exist.</p>
            <Link href="/complete-engine">← Back to Complete Engine</Link>
          </section>
        </main>
      </>
    );
  }

  const categoryBreadcrumb = getCategoryBreadcrumb(CATEGORY);
  const currentImage =
    product.images && product.images.length > 0
      ? product.images[currentImageIndex]
      : null;

  return (
    <>
      <Head>
        <title>
          {product.name} - {selectedBrand.name} - Complete Engine - Skyline
          Marine Automation
        </title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        {currentImage && <meta property="og:image" content={currentImage} />}
      </Head>

      <main className={styles.productDetailPage}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/${categoryBreadcrumb.slug}`}>
            {categoryBreadcrumb.name}
          </Link>
          <span className={styles.separator}>/</span>
          <Link href={`/complete-engine/${selectedBrand.slug}`}>
            {selectedBrand.name}
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{product.name}</span>
        </nav>

        {/* Product Container */}
        <section className={styles.productContainer}>
          <div className={styles.productContent}>
            {/* Images Section */}
            <div className={styles.imagesSection}>
              <div className={styles.mainImage}>
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={product.name}
                    width={500}
                    height={400}
                    objectFit="cover"
                    priority
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>{product.name}</div>
                )}
              </div>

              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    className={styles.prevButton}
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    className={styles.nextButton}
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    →
                  </button>

                  {/* Thumbnails */}
                  <div className={styles.thumbnails}>
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`${styles.thumbnail} ${
                          idx === currentImageIndex ? styles.active : ""
                        }`}
                        onClick={() => setCurrentImageIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          width={80}
                          height={60}
                          objectFit="cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product Info Section */}
            <div className={styles.infoSection}>
              {/* Brand Info */}
              {selectedBrand.logo && (
                <div className={styles.brandBadge}>
                  <Image
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    width={80}
                    height={50}
                    objectFit="contain"
                  />
                </div>
              )}

              {/* Product Title */}
              <h1 className={styles.productTitle}>{product.name}</h1>

              {/* Product Meta */}
              <div className={styles.productMeta}>
                <span className={styles.category}>Complete Engine</span>
                <span className={styles.brand}>{selectedBrand.name}</span>
                {product.inStock && (
                  <span className={styles.inStock}>In Stock</span>
                )}
              </div>

              {/* Description */}
              <p className={styles.description}>{product.description}</p>

              {/* Specifications */}
              {product.specifications &&
                Object.keys(product.specifications).length > 0 && (
                  <div className={styles.specifications}>
                    <h3>Specifications</h3>
                    <table className={styles.specsTable}>
                      <tbody>
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <tr key={key}>
                              <td className={styles.specKey}>
                                {key.charAt(0).toUpperCase() +
                                  key.slice(1).replace(/([A-Z])/g, " $1")}
                              </td>
                              <td className={styles.specValue}>{value}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                <button
                  className={styles.inquiryButton}
                  onClick={() => openInquiryModal(product)}
                >
                  Send Inquiry
                </button>
                <button
                  className={styles.shareButton}
                  onClick={copyLink}
                  title="Copy link to clipboard"
                >
                  {linkCopied ? "✓ Copied!" : "Share"}
                </button>
              </div>

              {/* Additional Info */}
              <div className={styles.additionalInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Product ID:</span>
                  <span className={styles.value}>{product.id}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Category:</span>
                  <span className={styles.value}>Complete Engine</span>
                </div>
                {product.createdAt && (
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Listed:</span>
                    <span className={styles.value}>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedProducts}>
            <div className="container">
              <h2>More {selectedBrand.name} Complete Engine Products</h2>
              <div className={styles.productsGrid}>
                {relatedProducts.slice(0, 6).map((relProduct) => (
                  <div key={relProduct.id} className={styles.productCard}>
                    <Link
                      href={`/complete-engine/${selectedBrand.slug}/${relProduct.slug}`}
                    >
                      <div className={styles.productImage}>
                        {relProduct.images && relProduct.images.length > 0 ? (
                          <Image
                            src={relProduct.images[0]}
                            alt={relProduct.name}
                            width={300}
                            height={200}
                            objectFit="cover"
                          />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            {relProduct.name}
                          </div>
                        )}
                      </div>
                      <div className={styles.productContent}>
                        <h3>{relProduct.name}</h3>
                        <p className={styles.description}>
                          {relProduct.description.substring(0, 80)}...
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Button */}
        <section className={styles.backSection}>
          <div className="container">
            <Link href={`/complete-engine/${selectedBrand.slug}`}>
              ← Back to {selectedBrand.name} Products
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

/**
 * Generators Product Detail Page
 * Route: /generators/[brandSlug]/[productSlug]
 * Displays detailed information about a specific generator product
 *
 * Example: /generators/caterpillar/mtu-16v4000-diesel-generator-set-2000kva
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

const CATEGORY = "generators";

export default function GeneratorsProductDetailPage() {
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
              <Link href={`/generators/${selectedBrand.slug}`}>
                ← Back to {selectedBrand.name}
              </Link>
            )}
            {!selectedBrand && (
              <Link href="/generators">← Back to Generators</Link>
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
            <Link href="/generators">← Back to Generators</Link>
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
          {product.name} - {selectedBrand.name} - Generators - Skyline Marine
          Automation
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
          <Link href={`/generators/${selectedBrand.slug}`}>
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

            {/* Product Information Section */}
            <div className={styles.infoSection}>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <p className={styles.productDescription}>{product.description}</p>

              {/* Specifications */}
              {product.specifications && (
                <div className={styles.specifications}>
                  <h2>Specifications</h2>
                  <div className={styles.specsList}>
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div key={key} className={styles.specItem}>
                          <span className={styles.specKey}>{key}</span>
                          <span className={styles.specValue}>
                            {String(value)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                <button
                  className={styles.inquireButton}
                  onClick={() =>
                    openInquiryModal({
                      productId: product.id,
                      productName: product.name,
                      brandId: selectedBrand.id,
                      brandName: selectedBrand.name,
                    })
                  }
                >
                  Send Inquiry
                </button>
                <button
                  className={styles.shareButton}
                  onClick={copyLink}
                  title="Copy product link"
                >
                  {linkCopied ? "Link Copied!" : "Share Product"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedProducts}>
            <div className={styles.container}>
              <h2>Other {selectedBrand.name} Generator Products</h2>
              <div className={styles.relatedGrid}>
                {relatedProducts.map((relProduct) => (
                  <Link
                    key={relProduct.id}
                    href={`/generators/${selectedBrand.slug}/${relProduct.slug}`}
                  >
                    <article className={styles.relatedCard}>
                      <div className={styles.relatedImage}>
                        {relProduct.thumbnail && (
                          <Image
                            src={relProduct.thumbnail}
                            alt={relProduct.name}
                            width={250}
                            height={180}
                            objectFit="cover"
                          />
                        )}
                      </div>
                      <h3>{relProduct.name}</h3>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

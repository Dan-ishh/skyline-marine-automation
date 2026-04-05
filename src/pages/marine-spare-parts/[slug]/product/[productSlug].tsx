/**
 * Marine Spare Parts Product Detail Page - Catch-all Route
 * Route: /marine-spare-parts/[slug]/product/[productSlug]
 * Displays detailed information about a specific marine spare parts product
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useUIStore } from "@/src/store";
import { CategoryPageSkeleton } from "@/src/Components";
import {
  getProductsByBrandAndSubcategory,
  getProductBySlug,
  getBrandById,
} from "@/src/utils/dataUtils";
import { marineSparePartsItems } from "@/src/data/menuData";
import type { Product, Brand } from "@/src/types";
import styles from "./ProductDetail.module.scss";

export default function MarineSparePartProductDetailPage() {
  const router = useRouter();
  const { slug, productSlug } = router.query;
  const { openInquiryModal } = useUIStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [sparePart, setSparePart] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  // Initialize component
  useEffect(() => {
    if (slug && productSlug) {
      // Find the spare part category
      const slugStr = typeof slug === "string" ? slug : slug[0];
      const productSlugStr =
        typeof productSlug === "string" ? productSlug : productSlug[0];

      const sparePartItem = marineSparePartsItems.find(
        (item) => item.slug === slugStr
      );
      setSparePart(sparePartItem);

      // Find the product by slug
      const foundProduct = getProductBySlug(productSlugStr);
      if (foundProduct && sparePartItem) {
        setProduct(foundProduct);

        // Get the brand
        if (foundProduct.brandId) {
          const foundBrand = getBrandById(foundProduct.brandId);
          if (foundBrand) {
            setBrand(foundBrand);
            // Get related products (same brand, same category, exclude current)
            const related = getProductsByBrandAndSubcategory(
              foundProduct.brandId,
              slugStr
            ).filter((p) => p.id !== foundProduct.id);
            setRelatedProducts(related);
          }
        }
      }

      setIsLoading(false);
    }
  }, [slug, productSlug]);

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
  if (isLoading) {
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

  // Product not found
  if (!product || !sparePart) {
    return (
      <>
        <Head>
          <title>Product Not Found - Skyline Marine Automation</title>
        </Head>
        <main className={styles.productDetailPage}>
          <section className={styles.errorSection}>
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            {sparePart && (
              <Link href={`/marine-spare-parts/${sparePart.slug}`}>
                ← Back to {sparePart.label}
              </Link>
            )}
            {!sparePart && (
              <Link href="/marine-spare-parts">
                ← Back to Marine Spare Parts
              </Link>
            )}
          </section>
        </main>
      </>
    );
  }

  const currentImage =
    product.images && product.images.length > 0
      ? product.images[currentImageIndex]
      : null;

  return (
    <>
      <Head>
        <title>
          {product.name} - {brand?.name || "Marine Spare Parts"} - Skyline
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
          <Link href="/marine-spare-parts">Marine Spare Parts</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/marine-spare-parts/${sparePart.slug}`}>
            {sparePart.label}
          </Link>
          {brand && (
            <>
              <span className={styles.separator}>/</span>
              <Link
                href={`/marine-spare-parts/${sparePart.slug}/${brand.slug}`}
              >
                {brand.name}
              </Link>
            </>
          )}
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
              {brand?.logo && (
                <div className={styles.brandBadge}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
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
                <span className={styles.category}>{sparePart.label}</span>
                {brand && <span className={styles.brand}>{brand.name}</span>}
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
                  onClick={() =>
                    openInquiryModal({
                      productId: product.id,
                      productName: product.name,
                      brandId: brand?.id || "",
                      brandName: brand?.name || "Marine Spare Parts",
                    })
                  }
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
                  <span className={styles.value}>{sparePart.label}</span>
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
              <h2>
                More {brand?.name} {sparePart.label} Products
              </h2>
              <div className={styles.productsGrid}>
                {relatedProducts.slice(0, 6).map((relProduct) => (
                  <div key={relProduct.id} className={styles.productCard}>
                    <Link
                      href={`/marine-spare-parts/${sparePart.slug}/product/${relProduct.slug}`}
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
                        ) : relProduct.thumbnail ? (
                          <Image
                            src={relProduct.thumbnail}
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
            {brand ? (
              <Link
                href={`/marine-spare-parts/${sparePart.slug}/${brand.slug}`}
              >
                ← Back to {brand.name} Products
              </Link>
            ) : (
              <Link href={`/marine-spare-parts/${sparePart.slug}`}>
                ← Back to {sparePart.label}
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string; productSlug: string };
}) {
  // Validate that the slug exists in marine spare parts
  const validSlug = marineSparePartsItems.some(
    (item) => item.slug === params.slug
  );

  if (!validSlug) {
    return {
      notFound: true,
    };
  }

  // Validate that the product exists
  const product = getProductBySlug(params.productSlug);
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
    revalidate: 3600, // Revalidate every hour
  };
}

export async function getStaticPaths() {
  // Generate paths for all product slugs across all marine spare parts categories
  // We'll use fallback: 'blocking' to generate pages on-demand
  // This is more efficient than pre-generating all paths at build time
  return {
    paths: [],
    fallback: "blocking",
  };
}

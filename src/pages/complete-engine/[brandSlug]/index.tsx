/**
 * Complete Engine Brand Products Page
 * Route: /compl      <main className="brand-products-page">
        <CategoryPageSkeleton gridCount={12} />e-engine/[brandSlug]
 * Displays all complete engine products from a specific brand
 * 
 * Example: /complete-engine/caterpillar
 * Shows: All Caterpillar complete engine products
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useBrandStore } from "@/src/store";
import { CategoryPageSkeleton } from "@/src/Components";
import {
  getProductsByBrandAndCategory,
  getCategoryBreadcrumb,
} from "@/src/utils/dataUtils";
import type { Product } from "@/src/types";
import styles from "./BrandProducts.module.scss";

const CATEGORY = "complete-engine";

export default function CompleteEngineBrandPage() {
  const router = useRouter();
  const { brandSlug } = router.query;

  const {
    selectedBrand,
    loading: brandLoading,
    fetchBrandBySlug,
  } = useBrandStore();

  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (brandSlug && typeof brandSlug === "string") {
      fetchBrandBySlug(brandSlug);
    }
  }, [brandSlug, fetchBrandBySlug]);

  useEffect(() => {
    if (selectedBrand) {
      // Filter products: Complete Engine category + this brand
      const filtered = getProductsByBrandAndCategory(
        selectedBrand.id,
        CATEGORY
      );
      setBrandProducts(filtered);
      setIsLoading(false);
    }
  }, [selectedBrand]);

  if (isLoading || brandLoading) {
    return (
      <>
        <Head>
          <title>
            Loading Complete Engine Brand... - Skyline Marine Automation
          </title>
        </Head>
        <main className="brand-products-page">
          <CategoryPageSkeleton gridCount={12} />
        </main>
      </>
    );
  }

  if (!selectedBrand) {
    return (
      <>
        <Head>
          <title>Brand Not Found - Skyline Marine Automation</title>
        </Head>
        <main className="brand-products-page">
          <section className="error-section">
            <h1>Brand Not Found</h1>
            <p>The brand you're looking for doesn't exist.</p>
            <Link href="/complete-engine">← Back to Complete Engine</Link>
          </section>
        </main>
      </>
    );
  }

  const categoryBreadcrumb = getCategoryBreadcrumb(CATEGORY);

  return (
    <>
      <Head>
        <title>
          {selectedBrand.name} - Complete Engine Products - Skyline Marine
          Automation
        </title>
        <meta
          name="description"
          content={`Browse all ${selectedBrand.name} complete engine products. Marine engines and propulsion systems.`}
        />
      </Head>

      <main className="brand-products-page">
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/${categoryBreadcrumb.slug}`}>
            {categoryBreadcrumb.name}
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{selectedBrand.name}</span>
        </nav>

        {/* Brand Header */}
        <section className={styles.brandHeader}>
          <div className={styles.brandHeaderContent}>
            <div className={styles.brandInfo}>
              {selectedBrand.logo && (
                <div className={styles.brandLogo}>
                  <Image
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    width={200}
                    height={100}
                    objectFit="contain"
                  />
                </div>
              )}
              <h1>{selectedBrand.name}</h1>
              {selectedBrand.description && (
                <p className={styles.description}>
                  {selectedBrand.description}
                </p>
              )}
              <div className={styles.brandStats}>
                <span className={styles.statItem}>
                  <strong>{brandProducts.length}</strong> Complete Engine
                  Products
                </span>
                {selectedBrand.website && (
                  <a
                    href={selectedBrand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.websiteLink}
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className={styles.productsSection}>
          <div className="container">
            {brandProducts.length === 0 ? (
              <div className={styles.noProducts}>
                <h2>No Products Found</h2>
                <p>
                  {selectedBrand.name} doesn't have any complete engine products
                  yet.
                </p>
                <Link href="/complete-engine">← Back to Complete Engine</Link>
              </div>
            ) : (
              <>
                <h2>Complete Engine Products</h2>
                <div className={styles.productsGrid}>
                  {brandProducts.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                      <Link
                        href={`/complete-engine/${selectedBrand.slug}/${product.slug}`}
                      >
                        <div className={styles.productImage}>
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={300}
                              height={200}
                              objectFit="cover"
                            />
                          ) : (
                            <div className={styles.imagePlaceholder}>
                              {product.name}
                            </div>
                          )}
                        </div>
                        <div className={styles.productContent}>
                          <h3>{product.name}</h3>
                          <p className={styles.description}>
                            {product.description.substring(0, 100)}...
                          </p>
                          <div className={styles.productFooter}>
                            <span className={styles.category}>
                              {product.mainCategory === "complete-engine"
                                ? "Complete Engine"
                                : product.mainCategory}
                            </span>
                            <span className={styles.arrow}>→</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

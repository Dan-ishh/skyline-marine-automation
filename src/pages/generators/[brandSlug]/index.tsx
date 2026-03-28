/**
 * Generators Brand Products Page
 * Route: /generators/[brandSlug]
 * Displays all generator products from a specific brand
 *
 * Example: /generators/caterpillar
 * Shows: All Caterpillar generator products
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

const CATEGORY = "generators";

export default function GeneratorsBrandPage() {
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
      // Filter products: Generators category + this brand
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
          <title>Loading Generator Brand... - Skyline Marine Automation</title>
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
            <Link href="/generators">← Back to Generators</Link>
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
          {selectedBrand.name} - Generator Products - Skyline Marine Automation
        </title>
        <meta
          name="description"
          content={`Browse all ${selectedBrand.name} generator products. Marine and industrial diesel generators.`}
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
                  <strong>{brandProducts.length}</strong> Generator Products
                </span>
                {/* {selectedBrand.website && (
                  <a
                    href={selectedBrand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.websiteLink}
                  >
                    Visit Website →
                  </a>
                )} */}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className={styles.productsSection}>
          <div className={styles.container}>
            {brandProducts.length === 0 ? (
              <div className={styles.noProducts}>
                <p>
                  No generator products available for {selectedBrand.name} at
                  the moment.
                </p>
                <Link href="/generators">← Back to Generators</Link>
              </div>
            ) : (
              <>
                <h2>Products ({brandProducts.length})</h2>
                <div className={styles.productsGrid}>
                  {brandProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/generators/${selectedBrand.slug}/${product.slug}`}
                    >
                      <article className={styles.productCard}>
                        <div className={styles.productImage}>
                          {product.thumbnail && (
                            <Image
                              src={product.thumbnail}
                              alt={product.name}
                              width={300}
                              height={200}
                              objectFit="cover"
                            />
                          )}
                        </div>
                        <div className={styles.productInfo}>
                          <h3>{product.name}</h3>
                          <p className={styles.productDescription}>
                            {product.description}
                          </p>
                          <div className={styles.productMeta}>
                            {product.specifications && (
                              <span className={styles.specs}>
                                {Object.keys(product.specifications).length}{" "}
                                Specs
                              </span>
                            )}
                            <span className={styles.cta}>View Details →</span>
                          </div>
                        </div>
                      </article>
                    </Link>
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

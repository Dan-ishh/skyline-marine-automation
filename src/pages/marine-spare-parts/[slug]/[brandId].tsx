import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { marineSparePartsItems } from "@/src/data/menuData";
import { CategoryPageSkeleton } from "@/src/Components";
import {
  getProductsByBrandAndSubcategory,
  getBrandBySlug,
} from "@/src/utils/dataUtils";
import type { Product, Brand } from "@/src/types";
import styles from "./BrandProducts.module.scss";

export default function MarineSparePartBrandPage() {
  const router = useRouter();
  const { slug, brandId } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (slug && brandId) {
      const slugStr = typeof slug === "string" ? slug : slug[0];
      const sparePart = marineSparePartsItems.find(
        (item) => item.slug === slugStr
      );
      if (sparePart && typeof brandId === "string") {
        // Get brand by slug
        const foundBrand = getBrandBySlug(brandId);
        setBrand(foundBrand || null);

        // Get products for this brand and subcategory
        if (foundBrand) {
          const filteredProducts = getProductsByBrandAndSubcategory(
            foundBrand.id,
            slugStr
          );
          setProducts(filteredProducts);
        }
      }

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [slug, brandId]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading... - Skyline Marine Automation</title>
        </Head>
        <main className="brand-products-page">
          <CategoryPageSkeleton gridCount={12} />
        </main>
      </>
    );
  }

  if (!brand) {
    return (
      <>
        <Head>
          <title>Brand Not Found - Skyline Marine Automation</title>
        </Head>
        <main className="brand-products-page">
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <h1>Brand Not Found</h1>
            <Link href={`/marine-spare-parts/${slug}`}>← Back to {slug}</Link>
          </div>
        </main>
      </>
    );
  }

  const sparePart = marineSparePartsItems.find((item) => item.slug === slug);

  return (
    <>
      <Head>
        <title>
          {brand.name} - {sparePart?.label} - Skyline Marine Automation
        </title>
        <meta
          name="description"
          content={`Browse ${brand.name} ${sparePart?.label} products for marine engines and equipment.`}
        />
      </Head>

      <main className="brand-products-page">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/marine-spare-parts">Marine Spare Parts</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/marine-spare-parts/${slug}`}>{sparePart?.label}</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{brand.name}</span>
        </nav>

        {/* Brand Header */}
        <section className={styles.brandHeader}>
          <div className={styles.brandHeaderContent}>
            <div className={styles.brandInfo}>
              {brand.logo && (
                <div className={styles.brandLogo}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={200}
                    height={100}
                    objectFit="contain"
                  />
                </div>
              )}
              <h1>{brand.name}</h1>
              {brand.description && (
                <p className={styles.description}>{brand.description}</p>
              )}
              <div className={styles.brandStats}>
                <span className={styles.statItem}>
                  <strong>{products.length}</strong> {sparePart?.label} Products
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className={styles.productsSection}>
          <div className="container">
            {products.length === 0 ? (
              <div className={styles.noProducts}>
                <h2>No Products Found</h2>
                <p>
                  No {sparePart?.label} products available from {brand.name} at
                  the moment.
                </p>
                <Link href={`/marine-spare-parts/${slug}`}>
                  ← Back to {sparePart?.label}
                </Link>
              </div>
            ) : (
              <>
                <h2>Our {sparePart?.label} Products</h2>
                <div className={styles.productsGrid}>
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/marine-spare-parts/${slug}/product/${product.slug}`}
                      className={styles.productCard}
                    >
                      <div className={styles.imageContainer}>
                        {product.thumbnail ? (
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={200}
                            height={200}
                            objectFit="contain"
                          />
                        ) : (
                          <div className={styles.noImage}>No Image</div>
                        )}
                      </div>
                      <div className={styles.productInfo}>
                        <h3>{product.name}</h3>
                        <p className={styles.description}>
                          {product.description}
                        </p>
                        {product.inStock && (
                          <span className={styles.inStock}>In Stock</span>
                        )}
                      </div>
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

export async function getStaticProps({
  params,
}: {
  params: { slug: string; brandId: string };
}) {
  // Validate that the slug exists
  const validSlug = marineSparePartsItems.some(
    (item) => item.slug === params.slug
  );

  if (!validSlug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  // For now, return empty paths to use fallback: "blocking"
  // This ensures pages are generated on-demand
  return {
    paths: [],
    fallback: "blocking",
  };
}

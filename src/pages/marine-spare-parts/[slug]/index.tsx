import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { marineSparePartsItems } from "@/src/data/menuData";
import { CategoryPageSkeleton, NoItemsAvailable } from "@/src/Components";
import { getBrandsByCategory } from "@/src/utils/dataUtils";
import type { Brand } from "@/src/types";
import styles from "./MarineSparePartDetail.module.scss";

export default function MarineSparePartDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    // Simulate 1-second data fetching delay
    if (slug) {
      const slugStr = typeof slug === "string" ? slug : slug[0];
      const sparePart = marineSparePartsItems.find(
        (item) => item.slug === slugStr
      );
      if (sparePart) {
        // Get brands that have products in this subcategory
        const filteredBrands = getBrandsByCategory(
          "marine-spare-parts",
          slugStr
        );
        setBrands(filteredBrands);
      }

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [slug]);

  // Find the spare part item
  const slugStr = typeof slug === "string" ? slug : slug?.[0];
  const sparePart = marineSparePartsItems.find((item) => item.slug === slugStr);

  if (!sparePart && slugStr) {
    return (
      <>
        <Head>
          <title>Spare Part Not Found - Skyline Marine Automation</title>
        </Head>
        <main className="category-page">
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <h1>Spare Part Not Found</h1>
            <p>Sorry, we couldn't find the spare part you're looking for.</p>
            <Link href="/marine-spare-parts">← Back to Marine Spare Parts</Link>
          </div>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading... - Skyline Marine Automation</title>
        </Head>
        <CategoryPageSkeleton gridCount={6} />
      </>
    );
  }

  if (!sparePart) {
    return null;
  }

  const categoryDescription = `Complete range of ${sparePart.label} components for marine engines and equipment. Find high-quality ${sparePart.label} from leading marine suppliers.`;

  return (
    <>
      <Head>
        <title>
          {sparePart.label} - Marine Spare Parts - Skyline Marine Automation
        </title>
        <meta
          name="description"
          content={`Browse ${sparePart.label} from leading marine equipment suppliers. Find the ${sparePart.label} you need at competitive prices.`}
        />
      </Head>

      <main className="category-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <Link href="/marine-spare-parts">Marine Spare Parts</Link>
          <span className="separator">/</span>
          <span className="current">{sparePart.label}</span>
        </nav>

        {/* Category Header */}
        <section className="category-header">
          <div className="category-header-content">
            <div className="category-info">
              <h1>{sparePart.label}</h1>
              <p className="category-description">{categoryDescription}</p>
            </div>
          </div>
        </section>

        {/* No Brands Available - Marine Spare Parts Coming Soon */}
        <section className="brands-grid-section">
          <div className="container">
            <h2>Available Brands</h2>
            {brands.length === 0 ? (
              <NoItemsAvailable
                itemType="brands"
                message={`No brands with ${sparePart?.label.toLowerCase()} products are currently available.`}
              />
            ) : (
              <div className={styles.brandsGrid}>
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/marine-spare-parts/${slug}/[brandId]`}
                    as={`/marine-spare-parts/${slug}/${brand.slug}`}
                  >
                    <div className={styles.brandCard}>
                      {brand.logo ? (
                        <div className={styles.logoContainer}>
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            width={150}
                            height={80}
                            objectFit="contain"
                          />
                        </div>
                      ) : (
                        <div className={styles.noLogo}>{brand.name}</div>
                      )}
                      <h3>{brand.name}</h3>
                      {brand.description && (
                        <p className={styles.description}>
                          {brand.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  // Validate that the slug exists in our menu data
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
    revalidate: 3600, // Revalidate every hour
  };
}

export async function getStaticPaths() {
  // Generate paths for all marine spare parts
  const paths = marineSparePartsItems.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

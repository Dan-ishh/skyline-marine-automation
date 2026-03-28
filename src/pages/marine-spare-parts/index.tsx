import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { marineSparePartsItems } from "@/src/data/menuData";
import { CategoryPageSkeleton } from "@/src/Components";
import styles from "./MarineSparePartsIndex.module.scss";

export default function MarineSparePartsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate 1-second data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const categoryName = "Marine Spare Parts";
  const categoryDescription =
    "Complete range of marine spare parts and components for diesel engines and propulsion systems.";

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{categoryName} - Skyline Marine Automation</title>
        </Head>
        <CategoryPageSkeleton gridCount={marineSparePartsItems.length} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{categoryName} - Subcategories - Skyline Marine</title>
        <meta
          name="description"
          content={`${categoryName} from leading marine equipment manufacturers at Skyline Marine Automation. Browse by component type.`}
        />
      </Head>

      <main className={styles.marineSparePartsPage}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{categoryName}</span>
        </nav>

        {/* Category Header */}
        <section className={styles.categoryHeader}>
          <div className={styles.categoryHeaderContent}>
            <div className={styles.categoryInfo}>
              <h1>{categoryName}</h1>
              <p className={styles.categoryDescription}>
                {categoryDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Subcategories Grid */}
        <section className={styles.subcategoriesSection}>
          <div className={styles.container}>
            <h2>Select Component Type</h2>
            <p className={styles.sectionSubtitle}>
              Choose a spare parts category to view available brands and
              products
            </p>
            <div className={styles.subcategoriesGrid}>
              {marineSparePartsItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <article className={styles.subcategoryCard}>
                    <div className={styles.subcategoryIcon}>
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="30"
                          cy="30"
                          r="28"
                          fill="#E8F0FF"
                          stroke="#003D7A"
                          strokeWidth="2"
                        />
                        <path
                          d="M30 15V45M15 30H45"
                          stroke="#003D7A"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className={styles.subcategoryContent}>
                      <h3>{item.label}</h3>
                      <p>Browse {item.label.toLowerCase()} components</p>
                    </div>
                    <div className={styles.arrowIcon}>→</div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { marineSparePartsItems } from "@/src/data/menuData";
import { CategoryPageSkeleton } from "@/src/Components";
import styles from "./MarineSparePartsIndex.module.scss";

// Icon component for each subcategory
const getSubcategoryIcon = (slug: string) => {
  switch (slug) {
    case "cylinder-head":
      return (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="12"
            y="20"
            width="36"
            height="20"
            rx="2"
            fill="#E8F0FF"
            stroke="#003D7A"
            strokeWidth="2"
          />
          <circle cx="18" cy="30" r="2" fill="#003D7A" />
          <circle cx="30" cy="30" r="2" fill="#003D7A" />
          <circle cx="42" cy="30" r="2" fill="#003D7A" />
          <path
            d="M15 40V45M30 40V45M45 40V45"
            stroke="#003D7A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "cylinder-liner":
      return (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="20"
            y="15"
            width="20"
            height="30"
            rx="2"
            fill="#E8F0FF"
            stroke="#003D7A"
            strokeWidth="2"
          />
          <rect
            x="18"
            y="12"
            width="24"
            height="4"
            fill="#003D7A"
            opacity="0.5"
          />
          <path
            d="M25 40H35"
            stroke="#003D7A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "connecting-rod":
      return (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="6"
            fill="#E8F0FF"
            stroke="#003D7A"
            strokeWidth="2"
          />
          <circle
            cx="40"
            cy="40"
            r="6"
            fill="#E8F0FF"
            stroke="#003D7A"
            strokeWidth="2"
          />
          <path
            d="M24 24L36 36"
            stroke="#003D7A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "piston":
      return (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="18"
            y="15"
            width="24"
            height="18"
            rx="2"
            fill="#E8F0FF"
            stroke="#003D7A"
            strokeWidth="2"
          />
          <rect
            x="22"
            y="33"
            width="16"
            height="12"
            rx="1"
            fill="#E8F0FF"
            stroke="#003D7A"
            strokeWidth="2"
          />
          <path
            d="M30 45V48"
            stroke="#003D7A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "crankshaft":
      return (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 30H20M20 25V35M40 30H45M40 25V35M30 20V40"
            stroke="#003D7A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="20"
            cy="30"
            r="4"
            fill="#E8F0FF"
            stroke="#003D7A"
            strokeWidth="2"
          />
          <circle
            cx="40"
            cy="30"
            r="4"
            fill="#E8F0FF"
            stroke="#003D7A"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return (
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
      );
  }
};

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
                      {getSubcategoryIcon(item.slug)}
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

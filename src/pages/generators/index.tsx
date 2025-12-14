import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { brands } from "@/src/data";
import { CategoryPageSkeleton } from "@/src/Components";

export default function GeneratorsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate 1-second data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const categoryName = "Generators";
  const categoryDescription =
    "Marine electrical generators and power generation systems for reliable onboard power supply.";

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{categoryName} - Brands & Products - Skyline Marine</title>
        </Head>
        <CategoryPageSkeleton gridCount={brands.length} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{categoryName} - Brands & Products - Skyline Marine</title>
        <meta
          name="description"
          content={`Browse ${categoryName} from leading marine generator manufacturers at Skyline Marine Automation.`}
        />
      </Head>

      <main className="category-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <span className="current">{categoryName}</span>
        </nav>

        {/* Category Header */}
        <section className="category-header">
          <div className="category-header-content">
            <div className="category-info">
              <h1>{categoryName}</h1>
              <p className="category-description">{categoryDescription}</p>
              <div className="category-stats">
                <span className="stat-item">
                  <strong>{brands.length}</strong> Brands Available
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="brands-grid-section">
          <div className="container">
            <h2>Available Brands</h2>
            <div className="brands-grid">
              {brands.map((brand) => (
                <div key={brand.id} className="brand-card">
                  <Link href={`/brands/${brand.slug}?from=generators`}>
                    <div className="brand-card-image">
                      {brand.logo ? (
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={120}
                          height={60}
                          objectFit="contain"
                        />
                      ) : (
                        <div className="brand-placeholder">{brand.name}</div>
                      )}
                    </div>
                    <div className="brand-card-content">
                      <h3>{brand.name}</h3>
                      <p>{brand.description}</p>
                      <div className="brand-card-footer">
                        <span className="product-count">
                          {brand.productCount} Products
                        </span>
                        <span className="arrow">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

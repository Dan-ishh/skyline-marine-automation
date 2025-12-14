import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { marineSparePartsItems } from "@/src/data/menuData";
import { CategoryPageSkeleton } from "@/src/Components";

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
    "Complete range of marine spare parts and components for all vessel types and marine engines.";

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{categoryName} - Skyline Marine Automation</title>
        </Head>
        <CategoryPageSkeleton sparePartsCount={16} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{categoryName} - Skyline Marine Automation</title>
        <meta
          name="description"
          content={`Browse ${categoryName} from leading marine equipment suppliers. Find the spare parts you need at competitive prices.`}
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
                  <strong>{marineSparePartsItems.length}</strong> Sub-Categories
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Spare Parts Categories Grid */}
        <section className="spare-parts-grid-section">
          <div className="container">
            <h2>Browse by Spare Part Type</h2>
            <div className="spare-parts-grid">
              {marineSparePartsItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="spare-part-card"
                >
                  <div className="spare-part-card-content">
                    <h3>{item.label}</h3>
                    <p className="spare-part-slug">{item.slug}</p>
                    <div className="spare-part-card-footer">
                      <span className="arrow">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="info-section">
          <div className="container">
            <h2>Why Choose Our Spare Parts?</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Genuine Parts</h3>
                <p>
                  We supply genuine, authentic marine spare parts from
                  established manufacturers.
                </p>
              </div>
              <div className="info-card">
                <h3>Quality Assurance</h3>
                <p>
                  All parts undergo strict quality checks before shipment to
                  ensure reliability.
                </p>
              </div>
              <div className="info-card">
                <h3>Expert Support</h3>
                <p>
                  Our team of marine engineers provides technical support and
                  guidance.
                </p>
              </div>
              <div className="info-card">
                <h3>Competitive Pricing</h3>
                <p>
                  We offer the best prices without compromising on quality and
                  service.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

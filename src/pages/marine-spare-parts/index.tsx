import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
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
    "Complete range of marine spare parts and components for diesel engines and propulsion systems.";

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{categoryName} - Skyline Marine Automation</title>
        </Head>
        <CategoryPageSkeleton gridCount={12} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{categoryName} - Brands & Products - Skyline Marine</title>
        <meta
          name="description"
          content={`${categoryName} from leading marine equipment manufacturers at Skyline Marine Automation.`}
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
            </div>
          </div>
        </section>

        {/* No Brands Available */}
        <section className="brands-grid-section">
          <div className="container">
            <h2>Available Brands</h2>
            <div className="no-brands-available">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: "0 auto 20px", opacity: 0.6 }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#ccc"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M 30 40 Q 50 60 70 40" stroke="#ccc" strokeWidth="3" />
                <circle cx="40" cy="35" r="3" fill="#ccc" />
                <circle cx="60" cy="35" r="3" fill="#ccc" />
              </svg>
              <h3>No Brands Available</h3>
              <p>
                No brands with products are currently available in the Marine
                Spare Parts category.
              </p>
              <p style={{ fontSize: "14px", color: "#999", marginTop: "10px" }}>
                Please check back soon as we continue to expand our inventory.
              </p>
            </div>
          </div>
        </section>

        <style jsx>{`
          .category-page {
            min-height: 100vh;
            background-color: #f8f9fa;
          }

          .breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 16px 20px;
            background-color: white;
            border-bottom: 1px solid #eee;
            margin-bottom: 32px;
            font-size: 14px;
            color: #666;
          }

          .breadcrumb a {
            color: #0066cc;
            text-decoration: none;
          }

          .breadcrumb a:hover {
            text-decoration: underline;
          }

          .breadcrumb .separator {
            color: #ccc;
          }

          .breadcrumb .current {
            color: #333;
            font-weight: 600;
          }

          .category-header {
            background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
            padding: 40px 0;
            margin-bottom: 40px;
            border-bottom: 2px solid #eee;
          }

          .category-header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .category-info h1 {
            font-size: 32px;
            font-weight: 700;
            color: #003366;
            margin: 0 0 16px 0;
          }

          .category-description {
            font-size: 16px;
            color: #666;
            line-height: 1.6;
            max-width: 700px;
            margin: 0;
          }

          .brands-grid-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px 60px;
          }

          .brands-grid-section h2 {
            font-size: 24px;
            font-weight: 700;
            color: #003366;
            margin-bottom: 32px;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .no-brands-available {
            text-align: center;
            padding: 80px 40px;
            background: white;
            border-radius: 8px;
            border: 2px dashed #ddd;
          }

          .no-brands-available h3 {
            font-size: 24px;
            font-weight: 700;
            color: #003366;
            margin: 0 0 12px 0;
          }

          .no-brands-available p {
            font-size: 16px;
            color: #666;
            margin: 8px 0;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }

          @media (max-width: 768px) {
            .category-header {
              padding: 30px 0;
            }

            .category-info h1 {
              font-size: 24px;
            }

            .category-description {
              font-size: 14px;
            }

            .no-brands-available {
              padding: 40px 20px;
            }
          }
        `}</style>
      </main>
    </>
  );
}

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { getBrandsByCategory } from "@/src/utils/dataUtils";
import { CategoryPageSkeleton, NoItemsAvailable } from "@/src/Components";

export default function TurbochargiersPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryBrands, setCategoryBrands] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        // Add safety check to ensure function exists
        if (!getBrandsByCategory || typeof getBrandsByCategory !== "function") {
          throw new Error("getBrandsByCategory function not available");
        }

        // Get only brands that have turbocharger products
        const brandsWithProducts = getBrandsByCategory("turbochargers");

        // Ensure we have an array
        if (!Array.isArray(brandsWithProducts)) {
          console.warn(
            "getBrandsByCategory did not return an array:",
            brandsWithProducts
          );
          setCategoryBrands([]);
          setError(null);
          return;
        }

        // Filter to get unique brands with turbocharger products
        const filteredBrands = brandsWithProducts.filter(
          (brand: any) => brand && brand.id
        );

        setCategoryBrands(filteredBrands || []);
        setError(null);
      } catch (err) {
        console.error("Error loading turbochargers:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load turbochargers. Please try again later.";
        setError(errorMessage);
        setCategoryBrands([]);
      } finally {
        // Simulate 1-second data fetching delay
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
      }
    };

    loadBrands();
  }, []);

  const categoryName = "Turbochargers";
  const categoryDescription =
    "Turbocharger systems and components for enhanced marine engine performance and efficiency.";

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{categoryName} - Brands & Products - Skyline Marine</title>
        </Head>
        <CategoryPageSkeleton gridCount={12} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>{categoryName} - Brands & Products - Skyline Marine</title>
        </Head>
        <main className="category-page">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">{categoryName}</span>
          </nav>
          <section className="category-header">
            <div className="category-header-content">
              <div className="category-info">
                <h1>{categoryName}</h1>
                <div
                  style={{
                    backgroundColor: "#fee",
                    border: "1px solid #f99",
                    padding: "1.5rem",
                    borderRadius: "6px",
                    marginTop: "1rem",
                  }}
                >
                  <p
                    style={{
                      color: "#c00",
                      margin: "0.5rem 0",
                      fontWeight: "600",
                    }}
                  >
                    ⚠️ Error Loading Brands
                  </p>
                  <p style={{ color: "#666", margin: "0.5rem 0" }}>{error}</p>
                  <p
                    style={{
                      color: "#999",
                      fontSize: "0.9rem",
                      margin: "1rem 0 0 0",
                    }}
                  >
                    If this persists, please try refreshing the page or contact
                    support.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{categoryName} - Brands & Products - Skyline Marine</title>
        <meta
          name="description"
          content={`Browse ${categoryName} from leading marine turbocharger manufacturers at Skyline Marine Automation.`}
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
                  <strong>{categoryBrands.length}</strong> Brands Available
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="brands-grid-section">
          <div className="container">
            <h2>Available Brands</h2>
            {categoryBrands.length === 0 ? (
              <NoItemsAvailable itemType="brands" />
            ) : (
              <div className="brands-grid">
                {categoryBrands.map((brand) => (
                  <div key={brand.id} className="brand-card">
                    <Link href={`/turbochargers/${brand.slug}`}>
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
                          <span className="product-count">View Products</span>
                          <span className="arrow">→</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

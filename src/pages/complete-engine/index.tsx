import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { getBrandsByCategory } from "@/src/utils/dataUtils";
import { CategoryPageSkeleton, NoItemsAvailable } from "@/src/Components";

export default function CompleteEnginePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryBrands, setCategoryBrands] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get only brands that have complete-engine products
      const brandsWithProducts = getBrandsByCategory("complete-engine");
      setCategoryBrands(brandsWithProducts || []);
      setError(null);
    } catch (err) {
      console.error("Error loading complete engines:", err);
      setError("Failed to load complete engines. Please try again later.");
      setCategoryBrands([]);
    } finally {
      // Simulate 1-second data fetching delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const categoryName = "Complete Engine";
  const categoryDescription =
    "Complete marine engines and propulsion systems for various vessel types and requirements.";

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
                <p className="category-description" style={{ color: "red" }}>
                  {error}
                </p>
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
          content={`Browse ${categoryName} from leading marine engine manufacturers at Skyline Marine Automation.`}
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
                    <Link href={`/complete-engine/${brand.slug}`}>
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

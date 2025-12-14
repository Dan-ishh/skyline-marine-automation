/**
 * Brands Listing Page
 * Route: /brands
 * Displays all available brands on the portal
 */

import { useEffect, useState } from "react";
import Head from "next/head";
import { useBrandStore } from "@/src/store";
import { BrandCardGridSkeleton } from "@/src/Components";

export default function BrandsPage() {
  const { brands, loading, error, fetchBrands } = useBrandStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
    // Simulate 1-second data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchBrands]);

  return (
    <>
      <Head>
        <title>Our Brands - Skyline Marine Automation</title>
        <meta
          name="description"
          content="Browse all marine equipment brands available on Skyline Marine Automation portal"
        />
      </Head>

      <div className="brands-page">
        <div className="container">
          <h1>Our Brands</h1>

          {isLoading && <BrandCardGridSkeleton count={12} />}

          {!isLoading && error && <p className="error">{error}</p>}

          {!isLoading && !error && brands.length === 0 && (
            <p>No brands available at the moment.</p>
          )}

          {!isLoading && brands.length > 0 && (
            <div className="brands-grid">
              {brands.map((brand) => (
                <div key={brand.id} className="brand-card">
                  <h2>{brand.name}</h2>
                  <p>{brand.description}</p>
                  {/* BrandCard component will be added here */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

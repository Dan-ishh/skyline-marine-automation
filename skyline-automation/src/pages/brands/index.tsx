/**
 * Brands Listing Page
 * Route: /brands
 * Displays all available brands on the portal
 */

import { useEffect } from "react";
import Head from "next/head";
import { useBrandStore } from "@/src/store";

export default function BrandsPage() {
  const { brands, loading, error, fetchBrands } = useBrandStore();

  useEffect(() => {
    fetchBrands();
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

          {loading && <p>Loading brands...</p>}

          {error && <p className="error">{error}</p>}

          {!loading && !error && brands.length === 0 && (
            <p>No brands available at the moment.</p>
          )}

          {!loading && brands.length > 0 && (
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

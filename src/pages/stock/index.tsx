/**
 * Stock Page
 * Lists all available stock brands
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { StockGridSkeleton } from "@/src/Components";
import { brands } from "@/src/data";

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Available Stock - Skyline Marine</title>
        <meta
          name="description"
          content="Browse our available stock of marine equipment and spare parts from leading brands"
        />
      </Head>

      <main className="stock-page">
        {/* Hero Section */}
        <section className="stock-hero">
          <div className="stock-hero__container">
            <h1 className="stock-hero__title">Available Stock</h1>
            <p className="stock-hero__subtitle">
              Browse our current inventory of marine equipment and spare parts
              from world-class manufacturers
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="stock-search">
          <div className="stock-search__container">
            <input
              type="text"
              placeholder="Search stock brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="stock-search__input"
            />
          </div>
        </section>

        {/* Stock Grid */}
        <section className="stock-grid">
          <div className="stock-grid__container">
            {isLoading ? (
              <StockGridSkeleton count={18} />
            ) : filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="stock-card"
                >
                  <div className="stock-card__content">
                    <h2 className="stock-card__name">{brand.name}</h2>
                    <p className="stock-card__description">
                      {brand.description}
                    </p>
                    <span className="stock-card__link">
                      View Products
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="stock-grid__empty">
                <p>No stock brands found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

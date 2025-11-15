/**
 * Stock Page
 * Lists all available stock brands
 */

import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const stockBrands = [
  {
    name: "STORK WERKSPOOR",
    slug: "stork-werkspoor",
    description: "Marine diesel engines and spare parts",
  },
  {
    name: "MAN B&W MAIN ENGINE",
    slug: "man-bandw-main-engine",
    description: "Main propulsion engines for vessels",
  },
  {
    name: "SCHALLER",
    slug: "schaller",
    description: "Automation systems and control equipment",
  },
  {
    name: "INGERSOLL RAND",
    slug: "ingersoll-rand",
    description: "Air compressors and pneumatic tools",
  },
  {
    name: "DAIHATSU",
    slug: "daihatsu",
    description: "Diesel engines and generators",
  },
  {
    name: "ALLEN DIESEL",
    slug: "allen-diesel",
    description: "Diesel engine parts and components",
  },
  {
    name: "YANMAR",
    slug: "yanmar",
    description: "Marine engines and power solutions",
  },
  {
    name: "BREATHING COMPRESSOR",
    slug: "breathing-compressor",
    description: "Marine breathing air compressors",
  },
  {
    name: "WARTSILA",
    slug: "wartsila",
    description: "Power solutions and marine equipment",
  },
];

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = stockBrands.filter((brand) =>
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
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/stock/${brand.slug}`}
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

/**
 * Stock Brand Detail Page
 * Shows products for a specific stock brand
 */

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { products } from "@/src/data";
import { StockBrandProductsGridSkeleton } from "@/src/Components";

const stockBrandsInfo = {
  "stork-werkspoor": {
    name: "STORK WERKSPOOR",
    description:
      "Premium marine diesel engines and spare parts for commercial vessels",
    fullDescription:
      "Stork Werkspoor is a renowned manufacturer of marine diesel engines, known for their reliability and efficiency in commercial shipping applications. We stock a comprehensive range of genuine parts and components.",
  },
  "man-bandw-main-engine": {
    name: "MAN B&W MAIN ENGINE",
    description: "Main propulsion engines for large vessels and tankers",
    fullDescription:
      "MAN B&W main engines are the gold standard in marine propulsion. Our stock includes critical spare parts, service kits, and components for various MAN B&W engine models.",
  },
  schaller: {
    name: "SCHALLER",
    description: "Advanced automation systems and marine control equipment",
    fullDescription:
      "Schaller provides state-of-the-art automation and control systems for modern vessels. We maintain stock of control panels, sensors, and automation components.",
  },
  "ingersoll-rand": {
    name: "INGERSOLL RAND",
    description: "Industrial air compressors and pneumatic systems",
    fullDescription:
      "Ingersoll Rand is a global leader in compressed air systems. Our inventory includes air compressors, pneumatic tools, and replacement parts for marine applications.",
  },
  daihatsu: {
    name: "DAIHATSU",
    description: "Reliable diesel engines and generator sets",
    fullDescription:
      "Daihatsu marine diesel engines are known for their fuel efficiency and durability. We stock genuine Daihatsu parts, service kits, and complete engine assemblies.",
  },
  "allen-diesel": {
    name: "ALLEN DIESEL",
    description: "Diesel engine components and replacement parts",
    fullDescription:
      "Allen Diesel specializes in high-quality diesel engine components. Our stock includes pistons, liners, bearings, and other critical engine parts.",
  },
  yanmar: {
    name: "YANMAR",
    description: "Compact marine engines and power generation equipment",
    fullDescription:
      "Yanmar offers reliable and compact marine engines suitable for various vessel types. We maintain an extensive inventory of Yanmar parts and complete engine units.",
  },
  "breathing-compressor": {
    name: "BREATHING COMPRESSOR",
    description: "Marine breathing air compressors and safety equipment",
    fullDescription:
      "Essential safety equipment for marine vessels. Our stock includes breathing air compressors, filtration systems, and related safety components.",
  },
  wartsila: {
    name: "WARTSILA",
    description: "Complete power solutions and marine propulsion systems",
    fullDescription:
      "Wärtsilä is a world leader in marine and energy markets. We stock a wide range of Wärtsilä parts, from engine components to complete propulsion systems.",
  },
};

export default function StockBrandPage() {
  const router = useRouter();
  const { stockSlug } = router.query;
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);
  const [isLoading, setIsLoading] = useState(true);

  const brandInfo =
    stockBrandsInfo[stockSlug as keyof typeof stockBrandsInfo] || null;

  useEffect(() => {
    if (stockSlug && brandInfo) {
      // Simulate loading
      const timer = setTimeout(() => {
        // Filter products by brand name (case-insensitive match)
        const filtered = products.filter((product) => {
          const productBrand =
            typeof product.brand === "string"
              ? product.brand
              : product.brand?.name || "";
          const brandName = brandInfo.name.toLowerCase();
          const prodBrand = productBrand.toLowerCase();

          return prodBrand.includes(brandName) || brandName.includes(prodBrand);
        });
        setFilteredProducts(filtered);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stockSlug, brandInfo]);

  if (!brandInfo) {
    return (
      <main className="stock-brand-page">
        <div className="stock-brand-page__container">
          <h1>Stock Brand Not Found</h1>
          <p>The requested stock brand does not exist.</p>
          <Link href="/stock" className="stock-brand-page__back-link">
            ← Back to Stock
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{brandInfo.name} Stock - Skyline Marine</title>
        <meta name="description" content={brandInfo.fullDescription} />
      </Head>
      <main className="stock-brand-page">
        {/* Hero Section */}
        <section className="stock-brand-hero">
          <div className="stock-brand-hero__container">
            <Link href="/stock" className="stock-brand-hero__back">
              ← Back to Stock
            </Link>
            <h1 className="stock-brand-hero__title">{brandInfo.name}</h1>
            <p className="stock-brand-hero__description">
              {brandInfo.description}
            </p>
          </div>
        </section>

        {/* Brand Info */}
        <section className="stock-brand-info">
          <div className="stock-brand-info__container">
            <div className="stock-brand-info__content">
              <h2>About {brandInfo.name}</h2>
              <p>{brandInfo.fullDescription}</p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="stock-brand-products">
          <div className="stock-brand-products__container">
            <h2 className="stock-brand-products__title">
              Available Products {!isLoading && `(${filteredProducts.length})`}
            </h2>

            {isLoading ? (
              <StockBrandProductsGridSkeleton count={6} />
            ) : filteredProducts.length > 0 ? (
              <div className="stock-brand-products__grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-card__image">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="product-card__content">
                      <h3 className="product-card__name">{product.name}</h3>
                      <p className="product-card__brand">
                        {typeof product.brand === "string"
                          ? product.brand
                          : product.brand?.name || "N/A"}
                      </p>
                      <p className="product-card__category">
                        {product.category}
                      </p>
                      <Link
                        href={`/stock/${stockSlug}/${product.slug}`}
                        className="product-card__link"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="stock-brand-products__empty">
                <p>
                  No products currently available for {brandInfo.name}. Please
                  contact us for availability.
                </p>
                <Link href="/contact" className="stock-brand-products__contact">
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

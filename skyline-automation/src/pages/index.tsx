/**
 * Home Page
 * Route: /
 * Main landing page with Hero Slider, Stock Slider, Recent Products Slider
 */

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useProductStore, useUIStore } from "@/src/store";
import { HeroSlider } from "@/src/Components";
import { products, brands } from "@/src/data";

export default function Home() {
  const router = useRouter();
  const { openInquiryModal } = useUIStore();

  // State for sliders
  const [stockSlide, setStockSlide] = useState(0);
  const [recentSlide, setRecentSlide] = useState(0);

  // Specific stock brands to showcase with custom slugs
  const stockBrands = [
    { name: "STORK WERKSPOOR", slug: "stork-werkspoor" },
    { name: "MAN B&W MAIN ENGINE", slug: "man-bandw-main-engine" },
    { name: "SCHALLER", slug: "schaller" },
    { name: "INGERSOLL RAND", slug: "ingersoll-rand" },
    { name: "DAIHATSU", slug: "daihatsu" },
    { name: "ALLEN DIESEL", slug: "allen-diesel" },
    { name: "YANMAR", slug: "yanmar" },
    { name: "BREATHING COMPRESSOR", slug: "breathing-compressor" },
    { name: "WARTSILA", slug: "wartsila" },
  ];

  // Get featured stock brands with their data
  const stockBrandsWithInquiries = stockBrands
    .map((stockBrand) => {
      // Try to find matching brand in brands data
      const matchingBrand = brands.find((brand) => {
        const brandUpper = brand.name.toUpperCase();
        const stockUpper = stockBrand.name.toUpperCase();
        // Check for partial matches
        return (
          brandUpper.includes(stockUpper) ||
          stockUpper.includes(brandUpper) ||
          brandUpper
            .replace(/\s+/g, "")
            .includes(stockUpper.replace(/\s+/g, ""))
        );
      });

      if (matchingBrand) {
        // Use existing brand data but override slug and displayName
        const brandProducts = products.filter(
          (p) => p.brandId === matchingBrand.id && p.inStock
        );
        const totalInquiries = brandProducts.reduce(
          (sum, p) => sum + p.enquiryCount,
          0
        );
        return {
          ...matchingBrand,
          displayName: stockBrand.name, // Use the display name from stockBrands
          slug: stockBrand.slug, // Use custom slug from stockBrands
          totalInquiries,
          stockCount: brandProducts.length,
        };
      } else {
        // Create placeholder for brands not in data
        return {
          id: `placeholder-${stockBrand.slug}`,
          name: stockBrand.name,
          displayName: stockBrand.name,
          slug: stockBrand.slug,
          logo: "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg",
          description: `${stockBrand.name} marine equipment`,
          website: "#",
          productCount: 0,
          totalInquiries: 0,
          stockCount: 5, // Placeholder stock count
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    })
    .filter((brand) => brand.stockCount > 0);

  // Get 10 most recent products (sorted by createdAt)
  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  // Auto-rotate stock brands slider every 4 seconds
  useEffect(() => {
    if (stockBrandsWithInquiries.length > 0) {
      const interval = setInterval(() => {
        setStockSlide(
          (prev) => (prev + 1) % Math.ceil(stockBrandsWithInquiries.length / 4)
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [stockBrandsWithInquiries.length]);

  // Auto-rotate recent products slider every 4 seconds
  useEffect(() => {
    if (recentProducts.length > 0) {
      const interval = setInterval(() => {
        setRecentSlide(
          (prev) => (prev + 1) % Math.ceil(recentProducts.length / 4)
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [recentProducts.length]);

  const nextStockSlide = () => {
    setStockSlide(
      (prev) => (prev + 1) % Math.ceil(stockBrandsWithInquiries.length / 4)
    );
  };

  const prevStockSlide = () => {
    setStockSlide((prev) =>
      prev === 0 ? Math.ceil(stockBrandsWithInquiries.length / 4) - 1 : prev - 1
    );
  };

  const nextRecentSlide = () => {
    setRecentSlide((prev) => (prev + 1) % Math.ceil(recentProducts.length / 4));
  };

  const prevRecentSlide = () => {
    setRecentSlide((prev) =>
      prev === 0 ? Math.ceil(recentProducts.length / 4) - 1 : prev - 1
    );
  };

  const handleInquiryClick = () => {
    openInquiryModal();
  };

  const handleInventoryClick = () => {
    router.push("/products");
  };

  return (
    <>
      <Head>
        <title>Skyline Marine Automation - Marine Equipment Portal</title>
        <meta
          name="description"
          content="Browse and inquire about premium marine equipment and products from top brands"
        />
      </Head>

      <div className="home-page">
        {/* Hero Slider Section */}
        <HeroSlider />

        {/* Action Buttons Section */}
        <section className="home-page__actions">
          <div className="container">
            <div className="home-page__actions-wrapper">
              <button
                className="home-page__action-btn home-page__action-btn--inquiry"
                onClick={handleInquiryClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Inquiry
              </button>
              <button
                className="home-page__action-btn home-page__action-btn--inventory"
                onClick={handleInventoryClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Inventory
              </button>
            </div>
          </div>
        </section>

        {/* Available Stock Brands Slider */}
        <section className="home-page__stock-section">
          <div className="container">
            <div className="home-page__slider-header">
              <h2 className="home-page__slider-title">
                Available <span>Stock</span>
              </h2>
              <Link href="/stock" className="home-page__view-all">
                View All →
              </Link>
            </div>

            <div className="home-page__carousel">
              <button
                className="home-page__carousel-btn home-page__carousel-btn--prev"
                onClick={prevStockSlide}
                aria-label="Previous"
              >
                ‹
              </button>

              <div className="home-page__carousel-track">
                <div
                  className="home-page__carousel-slides"
                  style={{ transform: `translateX(-${stockSlide * 100}%)` }}
                >
                  {stockBrandsWithInquiries.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/stock/${brand.slug}`}
                      className="home-page__stock-brand-card"
                    >
                      <div className="home-page__stock-brand-image">
                        <img
                          src={brand.logo}
                          alt={brand.displayName || brand.name}
                        />
                        <div className="home-page__stock-brand-overlay">
                          <span className="home-page__stock-brand-name">
                            {brand.displayName || brand.name}
                          </span>
                        </div>
                      </div>
                      <div className="home-page__stock-brand-info">
                        <p className="home-page__stock-brand-count">
                          {brand.stockCount}{" "}
                          {brand.stockCount === 1 ? "product" : "products"} in
                          stock
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <button
                className="home-page__carousel-btn home-page__carousel-btn--next"
                onClick={nextStockSlide}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        {/* Recent Products Slider */}
        <section className="home-page__slider-section home-page__slider-section--recent">
          <div className="container">
            <div className="home-page__slider-header">
              <h2 className="home-page__slider-title">
                Recent <span>Products</span>
              </h2>
              <Link href="/products" className="home-page__view-all">
                View All →
              </Link>
            </div>

            <div className="home-page__carousel">
              <button
                className="home-page__carousel-btn home-page__carousel-btn--prev"
                onClick={prevRecentSlide}
                aria-label="Previous"
              >
                ‹
              </button>

              <div className="home-page__carousel-track">
                <div
                  className="home-page__carousel-slides"
                  style={{ transform: `translateX(-${recentSlide * 100}%)` }}
                >
                  {recentProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="home-page__product-card"
                    >
                      <div className="home-page__product-image">
                        <img src={product.thumbnail} alt={product.name} />
                        <div className="home-page__product-overlay">
                          <span className="home-page__product-category">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="home-page__product-info">
                        <h3 className="home-page__product-name">
                          {product.name}
                        </h3>
                        <p className="home-page__product-brand">
                          {product?.category || "Unknown Brand"}
                        </p>
                        {product.enquiryCount > 0 && (
                          <span className="home-page__enquiry-badge">
                            {product.enquiryCount} enquiries
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <button
                className="home-page__carousel-btn home-page__carousel-btn--next"
                onClick={nextRecentSlide}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

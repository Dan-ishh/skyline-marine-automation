/**
 * Home Page
 * Route: /
 * Main landing page with Hero Slider, Stock Slider, Recent Products Slider
 */

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getProductCategoryName } from "@/src/utils/productUtils";
import { useUIStore } from "@/src/store";
import {
  HeroSlider,
  BrandCardSkeleton,
  ProductCardSkeleton,
} from "@/src/Components";
import { products, brands } from "@/src/data";

export default function Home() {
  const router = useRouter();
  const { openInquiryModal } = useUIStore();

  // State for sliders
  const [marineSparePartsSlide, setMarineSparePartsSlide] = useState(0);
  const [enginesSlide, setEnginesSlide] = useState(0);
  const [generatorsSlide, setGeneratorsSlide] = useState(0);

  // Loading states
  const [isLoadingMarineSparePartsSlide, setIsLoadingMarineSparePartsSlide] =
    useState(true);
  const [isLoadingEnginesSlide, setIsLoadingEnginesSlide] = useState(true);
  const [isLoadingGeneratorsSlide, setIsLoadingGeneratorsSlide] =
    useState(true);

  // Get 20 most recent Marine Spare Parts products (regardless of sub-category)
  const recentMarineSparePartsProducts = [...products]
    .filter((p) => p.mainCategory === "marine-spare-parts")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 20);

  // Get 20 most recent Complete Engine products
  const recentEnginesProducts = [...products]
    .filter((p) => p.mainCategory === "complete-engine")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 20)
    .map((product) => ({
      ...product,
      brandSlug: brands.find((b) => b.id === product.brandId)?.slug,
    }));

  // Get 20 most recent Generators products
  const recentGeneratorsProducts = [...products]
    .filter((p) => p.mainCategory === "generators")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 20)
    .map((product) => ({
      ...product,
      brandSlug: brands.find((b) => b.id === product.brandId)?.slug,
    }));

  // Simulate loading for Marine Spare Parts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingMarineSparePartsSlide(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading for Engines
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingEnginesSlide(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading for Generators
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingGeneratorsSlide(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate marine spare parts slider every 4 seconds
  useEffect(() => {
    if (recentMarineSparePartsProducts.length > 0) {
      const interval = setInterval(() => {
        setMarineSparePartsSlide(
          (prev) =>
            (prev + 1) % Math.ceil(recentMarineSparePartsProducts.length / 4)
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [recentMarineSparePartsProducts.length]);

  // Auto-rotate engines slider every 4 seconds
  useEffect(() => {
    if (recentEnginesProducts.length > 0) {
      const interval = setInterval(() => {
        setEnginesSlide(
          (prev) => (prev + 1) % Math.ceil(recentEnginesProducts.length / 4)
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [recentEnginesProducts.length]);

  // Auto-rotate generators slider every 4 seconds
  useEffect(() => {
    if (recentGeneratorsProducts.length > 0) {
      const interval = setInterval(() => {
        setGeneratorsSlide(
          (prev) => (prev + 1) % Math.ceil(recentGeneratorsProducts.length / 4)
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [recentGeneratorsProducts.length]);

  // Navigation functions for Marine Spare Parts
  const nextMarineSparePartsSlide = () => {
    setMarineSparePartsSlide(
      (prev) =>
        (prev + 1) % Math.ceil(recentMarineSparePartsProducts.length / 4)
    );
  };

  const prevMarineSparePartsSlide = () => {
    setMarineSparePartsSlide((prev) =>
      prev === 0
        ? Math.ceil(recentMarineSparePartsProducts.length / 4) - 1
        : prev - 1
    );
  };

  // Navigation functions for Engines
  const nextEnginesSlide = () => {
    setEnginesSlide(
      (prev) => (prev + 1) % Math.ceil(recentEnginesProducts.length / 4)
    );
  };

  const prevEnginesSlide = () => {
    setEnginesSlide((prev) =>
      prev === 0 ? Math.ceil(recentEnginesProducts.length / 4) - 1 : prev - 1
    );
  };

  // Navigation functions for Generators
  const nextGeneratorsSlide = () => {
    setGeneratorsSlide(
      (prev) => (prev + 1) % Math.ceil(recentGeneratorsProducts.length / 4)
    );
  };

  const prevGeneratorsSlide = () => {
    setGeneratorsSlide((prev) =>
      prev === 0 ? Math.ceil(recentGeneratorsProducts.length / 4) - 1 : prev - 1
    );
  };

  const handleInquiryClick = () => {
    openInquiryModal();
  };

  const handleInventoryClick = () => {
    router.push("/marine-spare-parts");
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

        {/* Recent Marine Spare Parts Slider */}
        <section className="home-page__slider-section home-page__slider-section--marine-spare-parts">
          <div className="container">
            <div className="home-page__slider-header">
              <h2 className="home-page__slider-title">
                Recent <span>Marine Spare Parts</span>
              </h2>
              <Link href="/marine-spare-parts" className="home-page__view-all">
                View All →
              </Link>
            </div>

            <div className="home-page__carousel">
              <button
                className="home-page__carousel-btn home-page__carousel-btn--prev"
                onClick={prevMarineSparePartsSlide}
                aria-label="Previous"
                disabled={recentMarineSparePartsProducts.length === 0}
              >
                ‹
              </button>

              <div className="home-page__carousel-track">
                <div
                  className="home-page__carousel-slides"
                  style={{
                    transform: `translateX(-${marineSparePartsSlide * 100}%)`,
                  }}
                >
                  {isLoadingMarineSparePartsSlide
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                      ))
                    : recentMarineSparePartsProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/marine-spare-parts/${product?.subCategory}/product/${product.slug}`}
                          className="home-page__product-card"
                        >
                          <div className="home-page__product-image">
                            <img
                              src={product.images?.[0] || product.thumbnail}
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg";
                              }}
                            />
                            <div className="home-page__product-overlay">
                              <span className="home-page__product-category">
                                Marine Spare Parts
                              </span>
                            </div>
                          </div>
                          <div className="home-page__product-info">
                            <h3 className="home-page__product-name">
                              {product.name}
                            </h3>
                            <p className="home-page__product-brand">
                              {getProductCategoryName(product)}
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
                onClick={nextMarineSparePartsSlide}
                aria-label="Next"
                disabled={recentMarineSparePartsProducts.length === 0}
              >
                ›
              </button>
            </div>
          </div>
        </section>

        {/* Recent Complete Engines Slider */}
        <section className="home-page__slider-section home-page__slider-section--engines">
          <div className="container">
            <div className="home-page__slider-header">
              <h2 className="home-page__slider-title">
                Recent <span>Complete Engines</span>
              </h2>
              <Link href="/complete-engine" className="home-page__view-all">
                View All →
              </Link>
            </div>

            <div className="home-page__carousel">
              <button
                className="home-page__carousel-btn home-page__carousel-btn--prev"
                onClick={prevEnginesSlide}
                aria-label="Previous"
                disabled={recentEnginesProducts.length === 0}
              >
                ‹
              </button>

              <div className="home-page__carousel-track">
                <div
                  className="home-page__carousel-slides"
                  style={{ transform: `translateX(-${enginesSlide * 100}%)` }}
                >
                  {isLoadingEnginesSlide
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                      ))
                    : recentEnginesProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`complete-engine/${product.brandSlug}/${product.slug}`}
                          className="home-page__product-card"
                        >
                          <div className="home-page__product-image">
                            <img
                              src={product.images?.[0] || product.thumbnail}
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg";
                              }}
                            />
                            <div className="home-page__product-overlay">
                              <span className="home-page__product-category">
                                Complete Engine
                              </span>
                            </div>
                          </div>
                          <div className="home-page__product-info">
                            <h3 className="home-page__product-name">
                              {product.name}
                            </h3>
                            <p className="home-page__product-brand">
                              {getProductCategoryName(product)}
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
                onClick={nextEnginesSlide}
                aria-label="Next"
                disabled={recentEnginesProducts.length === 0}
              >
                ›
              </button>
            </div>
          </div>
        </section>

        {/* Recent Generators Slider */}
        <section className="home-page__slider-section home-page__slider-section--generators">
          <div className="container">
            <div className="home-page__slider-header">
              <h2 className="home-page__slider-title">
                Recent <span>Generators</span>
              </h2>
              <Link href="/generators" className="home-page__view-all">
                View All →
              </Link>
            </div>

            <div className="home-page__carousel">
              <button
                className="home-page__carousel-btn home-page__carousel-btn--prev"
                onClick={prevGeneratorsSlide}
                aria-label="Previous"
                disabled={recentGeneratorsProducts.length === 0}
              >
                ‹
              </button>

              <div className="home-page__carousel-track">
                <div
                  className="home-page__carousel-slides"
                  style={{
                    transform: `translateX(-${generatorsSlide * 100}%)`,
                  }}
                >
                  {isLoadingGeneratorsSlide
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                      ))
                    : recentGeneratorsProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/generators/${product.brandSlug}/${product.slug}`}
                          className="home-page__product-card"
                        >
                          <div className="home-page__product-image">
                            <img
                              src={product.images?.[0] || product.thumbnail}
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg";
                              }}
                            />
                            <div className="home-page__product-overlay">
                              <span className="home-page__product-category">
                                Generators
                              </span>
                            </div>
                          </div>
                          <div className="home-page__product-info">
                            <h3 className="home-page__product-name">
                              {product.name}
                            </h3>
                            <p className="home-page__product-brand">
                              {getProductCategoryName(product)}
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
                onClick={nextGeneratorsSlide}
                aria-label="Next"
                disabled={recentGeneratorsProducts.length === 0}
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

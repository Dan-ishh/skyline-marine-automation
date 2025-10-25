/**
 * Home Page
 * Route: /
 * Main landing page with Banner, Latest Products, Most Enquired Products, and Inquiry Section
 */

import { useEffect } from 'react';
import Head from 'next/head';
import { useProductStore, useUIStore } from '@/src/store';

export default function Home() {
  const { latestProducts, mostEnquired, fetchLatestProducts, fetchMostEnquired } = useProductStore();
  const { openInquiryModal } = useUIStore();

  useEffect(() => {
    fetchLatestProducts();
    fetchMostEnquired();
  }, [fetchLatestProducts, fetchMostEnquired]);

  return (
    <>
      <Head>
        <title>Skyline Marine Automation - Marine Equipment Portal</title>
        <meta name="description" content="Browse and inquire about premium marine equipment and products from top brands" />
      </Head>

      <div className="home-page">
        {/* Banner Section */}
        <section className="banner">
          <div className="container">
            <h1>Welcome to Skyline Marine Automation</h1>
            <p>Your trusted source for premium marine equipment</p>
            <button onClick={() => openInquiryModal()}>
              Get Started
            </button>
          </div>
        </section>

        {/* Latest Products Section */}
        <section className="latest-products">
          <div className="container">
            <h2>Latest Products</h2>
            <div className="products-grid">
              {latestProducts.slice(0, 8).map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>{product.brand.name}</p>
                  {/* ProductCard component will be added here */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Most Enquired Products Section */}
        <section className="most-enquired">
          <div className="container">
            <h2>Most Enquired Products</h2>
            <div className="products-grid">
              {mostEnquired.slice(0, 8).map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>{product.brand.name}</p>
                  <span className="enquiry-count">{product.enquiryCount} inquiries</span>
                  {/* ProductCard component will be added here */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Section */}
        <section className="inquiry-section">
          <div className="container">
            <h2>Have Questions?</h2>
            <p>Get in touch with us for product inquiries and information</p>
            <button onClick={() => openInquiryModal()}>
              Inquire Now
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

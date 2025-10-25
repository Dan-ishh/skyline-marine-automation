/**
 * Individual Product Page
 * Route: /brands/[brandSlug]/[productSlug]
 * Displays detailed product information with photos and inquiry button
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useProductStore, useUIStore } from '@/src/store';

export default function ProductDetailPage() {
  const router = useRouter();
  const { brandSlug, productSlug } = router.query;
  
  const { selectedProduct, loading, error, fetchProductBySlug } = useProductStore();
  const { openInquiryModal } = useUIStore();

  useEffect(() => {
    if (brandSlug && productSlug && typeof brandSlug === 'string' && typeof productSlug === 'string') {
      fetchProductBySlug(brandSlug, productSlug);
    }
  }, [brandSlug, productSlug, fetchProductBySlug]);

  const handleInquireClick = () => {
    if (selectedProduct) {
      openInquiryModal({
        brandId: selectedProduct.brandId,
        brandName: selectedProduct.brand.name,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
      });
    }
  };

  return (
    <>
      <Head>
        <title>{selectedProduct?.name || 'Product'} - Skyline Marine Automation</title>
        <meta name="description" content={selectedProduct?.description || 'Product details'} />
      </Head>

      <div className="product-detail-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/">Home</a> &gt; 
            <a href="/brands">Brands</a> &gt; 
            <a href={`/brands/${brandSlug}`}>{selectedProduct?.brand.name || 'Brand'}</a> &gt; 
            <span>{selectedProduct?.name || 'Loading...'}</span>
          </nav>

          {loading && <p>Loading product...</p>}
          
          {error && <p className="error">{error}</p>}

          {selectedProduct && (
            <div className="product-detail">
              <div className="product-gallery">
                {/* Image Gallery will be added here */}
                {selectedProduct.images.length > 0 && (
                  <Image
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    width={600}
                    height={400}
                    priority
                  />
                )}
              </div>

              <div className="product-info">
                <h1>{selectedProduct.name}</h1>
                <p className="brand-name">{selectedProduct.brand.name}</p>
                
                {selectedProduct.category && (
                  <p className="category">Category: {selectedProduct.category}</p>
                )}

                <div className="description">
                  <h2>Description</h2>
                  <p>{selectedProduct.description}</p>
                </div>

                {Object.keys(selectedProduct.specifications).length > 0 && (
                  <div className="specifications">
                    <h2>Specifications</h2>
                    <table>
                      <tbody>
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <td><strong>{key}</strong></td>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <button 
                  className="inquire-button"
                  onClick={handleInquireClick}
                >
                  Inquire Now
                </button>
              </div>
            </div>
          )}

          {/* Related Products section will be added here */}
        </div>
      </div>
    </>
  );
}
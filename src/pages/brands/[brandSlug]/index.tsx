/**
 * Brand Products Page
 * Route: /brands/[brandSlug]
 * Displays all products for a specific brand
 */

import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useBrandStore, useProductStore } from "@/src/store";

export default function BrandProductsPage() {
  const router = useRouter();
  const { brandSlug } = router.query;

  const {
    selectedBrand,
    loading: brandLoading,
    fetchBrandBySlug,
  } = useBrandStore();
  const {
    products,
    loading: productsLoading,
    fetchProductsByBrand,
  } = useProductStore();

  useEffect(() => {
    if (brandSlug && typeof brandSlug === "string") {
      fetchBrandBySlug(brandSlug);
    }
  }, [brandSlug, fetchBrandBySlug]);

  useEffect(() => {
    if (selectedBrand) {
      fetchProductsByBrand(selectedBrand.id);
    }
  }, [selectedBrand, fetchProductsByBrand]);

  const loading = brandLoading || productsLoading;

  return (
    <>
      <Head>
        <title>
          {selectedBrand?.name || "Brand"} Products - Skyline Marine Automation
        </title>
        <meta
          name="description"
          content={`Browse ${
            selectedBrand?.name || ""
          } products on Skyline Marine Automation`}
        />
      </Head>

      <div className="brand-products-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/">Home</a> &gt;
            <a href="/brands">Brands</a> &gt;
            <span>{selectedBrand?.name || "Loading..."}</span>
          </nav>

          {loading && <p>Loading products...</p>}

          {selectedBrand && (
            <div className="brand-header">
              <h1>{selectedBrand.name}</h1>
              {selectedBrand.description && <p>{selectedBrand.description}</p>}
            </div>
          )}

          {!loading && products.length === 0 && (
            <p>No products available for this brand.</p>
          )}

          {!loading && products.length > 0 && (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {/* ProductCard component will be added here */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

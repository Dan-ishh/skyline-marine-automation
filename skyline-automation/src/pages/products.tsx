/**
 * Products Page
 * Route: /products
 * Displays all products from all brands
 */

import { useEffect } from "react";
import Head from "next/head";
import { useProductStore } from "@/src/store";

export default function ProductsPage() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Head>
        <title>All Products - Skyline Marine Automation</title>
        <meta
          name="description"
          content="Browse all marine equipment products from top brands. Find engines, automation systems, pumps, and more."
        />
      </Head>

      <div className="products-page">
        <div className="container">
          <div className="page-header">
            <h1>All Products</h1>
            <p>
              Browse our complete collection of marine equipment and products
            </p>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>{product.brand?.name}</p>
                {/* ProductCard component will be added here */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

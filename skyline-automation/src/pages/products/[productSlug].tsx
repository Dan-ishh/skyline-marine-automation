import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { products } from "@/src/data";
import { useUIStore } from "@/src/store";
import type { Product } from "@/src/types";

export default function ProductDetailPage() {
  const router = useRouter();
  const { productSlug } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const { openInquiryModal } = useUIStore();

  // WhatsApp number from your contact info
  const WHATSAPP_NUMBER = "917016439122"; // Update this to the actual WhatsApp number

  useEffect(() => {
    if (productSlug && typeof productSlug === "string") {
      // Find product by matching the slug field
      const foundProduct = products.find((p) => p.slug === productSlug);

      // If product not found, create dummy data for testing
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Dummy product data for testing
        setProduct({
          id: "dummy-001",
          name: "Marine Diesel Generator Set",
          slug: productSlug,
          brandId: "dummy-brand",
          category: "Power Generation",
          description:
            "High-performance marine diesel generator set designed for reliable power generation on vessels. Features advanced control systems and meets international maritime standards.",
          price: 0,
          images: [
            "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
          ],
          thumbnail:
            "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
          specifications: {
            "Power Output": "500 kW",
            Voltage: "440V 3-phase",
            Frequency: "50/60 Hz",
            "Fuel Type": "Marine Diesel Oil",
            "Noise Level": "75 dB(A) @ 7m",
            Weight: "2,500 kg",
          },
          inStock: true,
          featured: false,
          enquiryCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          brand: {
            id: "dummy-brand",
            name: "Marine Equipment Co.",
            slug: "marine-equipment-co",
            logo: "/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg",
            description: "Leading manufacturer of marine equipment",
            productCount: 50,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
    }
  }, [productSlug]);

  const handleRequestQuote = () => {
    if (product) {
      openInquiryModal({
        productName: product.name,
        productId: product.id,
      });
    }
  };

  const handleWhatsAppQuote = () => {
    if (product) {
      const message = `I'd like to know more about ${product.name}. Please contact me.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  if (router.isFallback || !product) {
    return (
      <div className="product-detail-loading">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Skyline Marine Automation</title>
        <meta
          name="description"
          content={`${product.name} - ${product.category}`}
        />
      </Head>

      <div className="product-detail">
        {/* Breadcrumb */}
        <div className="product-detail__breadcrumb">
          <div className="container">
            <Link href="/">Home</Link>
            <span> / </span>
            <Link href="/products">Products</Link>
            <span> / </span>
            <span>{product.name}</span>
          </div>
        </div>

        {/* Product Hero */}
        <section className="product-detail__hero">
          <div className="container">
            <div className="product-detail__hero-grid">
              {/* Product Image Gallery */}
              <div className="product-detail__images">
                <div className="product-detail__main-image">
                  <img
                    src={product.images[0] || product.thumbnail}
                    alt={product.name}
                  />
                </div>
                {/* Add thumbnail gallery if you have multiple images */}
              </div>

              {/* Product Info */}
              <div className="product-detail__info">
                <h1 className="product-detail__title">{product.name}</h1>

                <div className="product-detail__meta">
                  <div className="product-detail__meta-item">
                    <span className="product-detail__meta-label">Brand:</span>
                    <span className="product-detail__meta-value">
                      {product.brand?.name || "N/A"}
                    </span>
                  </div>
                  <div className="product-detail__meta-item">
                    <span className="product-detail__meta-label">
                      Category:
                    </span>
                    <span className="product-detail__meta-value">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Inquiry Buttons */}
                <div className="product-detail__actions">
                  <button
                    className="product-detail__btn product-detail__btn--primary"
                    onClick={handleRequestQuote}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Request Quote
                  </button>

                  <button
                    className="product-detail__btn product-detail__btn--whatsapp"
                    onClick={handleWhatsAppQuote}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp Quote
                  </button>
                </div>

                {/* Product Description */}
                {product.description && (
                  <div className="product-detail__description">
                    <h2>Description</h2>
                    <p>{product.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Product Details Section */}
        <section className="product-detail__content">
          <div className="container">
            <div className="product-detail__tabs">
              <h2>Product Specifications</h2>
              <div className="product-detail__specs">
                <p>
                  For detailed specifications and technical information about
                  this product, please contact us or request a quote using the
                  buttons above.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="product-detail__cta">
          <div className="container">
            <div className="product-detail__cta-content">
              <h2>Need More Information?</h2>
              <p>
                Our team is ready to assist you with any questions about this
                product.
              </p>
              <div className="product-detail__cta-buttons">
                <button
                  className="product-detail__btn product-detail__btn--primary"
                  onClick={handleRequestQuote}
                >
                  Request Quote
                </button>
                <Link
                  href="/contact"
                  className="product-detail__btn product-detail__btn--outline"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { products } from "@/src/data";
import { useUIStore } from "@/src/store";
import type { Product } from "@/src/types";

// Sample product features/items that come under each product
const productFeatures = {
  automation: [
    "DYNAMIC POSITIONING SYSTEM",
    "ENGINE CONTROL AND ALARM SYSTEM",
    "BILGE ALARM MONITOR",
    "BOILER AUTOMATION",
    "FIRE DETECTION",
    "GENERATOR POWER MANAGEMENT SYSTEM",
    "GAS DETECTING SYSTEM",
    "POSITIONER",
    "TANK RADAR SYSTEM",
    "THRUSTER CONTROL SYSTEM",
    "UTI TAPES",
    "AND MANY MORE SPARES AS PER REQUIREMENT",
  ],
  // Add more product-specific features as needed
};

// Sample brands (you can customize based on product)
const availableBrands = [
  { name: "ANSCHUTZ", logo: "/Assets/images/brands/anschutz.png" },
  { name: "CONSILIUM", logo: "/Assets/images/brands/consilium.png" },
  { name: "DECKMA", logo: "/Assets/images/brands/deckma.png" },
  { name: "KONGSBERG", logo: "/Assets/images/brands/kongsberg.png" },
  { name: "MMC", logo: "/Assets/images/brands/mmc.png" },
  { name: "NOR", logo: "/Assets/images/brands/nor.png" },
  { name: "SAAB", logo: "/Assets/images/brands/saab.png" },
  { name: "SAACKE", logo: "/Assets/images/brands/saacke.png" },
  { name: "SAMYUNG", logo: "/Assets/images/brands/samyung.png" },
  { name: "TOKYO KEIKI", logo: "/Assets/images/brands/keiki.png" },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const { productSlug } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const { openInquiryModal } = useUIStore();

  // WhatsApp number from your contact info
  const WHATSAPP_NUMBER = "917016439122";

  useEffect(() => {
    if (productSlug && typeof productSlug === "string") {
      // Find product by matching the slug field
      const foundProduct = products.find((p) => p.slug === productSlug);

      if (foundProduct) {
        setProduct(foundProduct);

        // Get related products (all products except current one)
        const related = products
          .filter((p) => p.slug !== productSlug)
          .slice(0, 8);
        setRelatedProducts(related);
      } else {
        // Dummy product data for testing
        setProduct({
          id: "dummy-001",
          name: "AUTOMATION",
          slug: productSlug,
          brandId: "dummy-brand",
          category: "Marine Automation Systems",
          description:
            "All of our products are of the highest possible quality. To assure product quality, we carry out extensive tests and thus guarantee functionality and quality before our products reach your vessels. Feel free to contact us at the below mentioned addresses.",
          price: 0,
          images: [
            "/Assets/images/Products/Automation.jpg",
            "/Assets/images/Products/panel-boards-v3.jpg",
            "/Assets/images/Products/electric-motors-v1.jpg",
          ],
          thumbnail: "/Assets/images/Products/Automation.jpg",
          specifications: {},
          inStock: true,
          featured: false,
          enquiryCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          brand: {
            id: "dummy-brand",
            name: "Marine Equipment Co.",
            slug: "marine-equipment-co",
            logo: "/Assets/images/Products/Automation.jpg",
            description: "Leading manufacturer of marine equipment",
            productCount: 50,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        // Get all products as related
        setRelatedProducts(products.slice(0, 8));
      }
    }
  }, [productSlug]);

  // Auto-rotate carousel
  useEffect(() => {
    if (relatedProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(
          (prev) => (prev + 1) % Math.ceil(relatedProducts.length / 4)
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [relatedProducts]);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(relatedProducts.length / 4)
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(relatedProducts.length / 4) - 1 : prev - 1
    );
  };

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

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setLinkCopied(true);

      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
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
            <Link href="/">HOME</Link>
            <span> / </span>
            <span className="product-detail__breadcrumb-current">
              {product.name}
            </span>
          </div>
        </div>

        {/* Product Hero Section */}
        <section className="product-detail__hero">
          <div className="container">
            {/* Welcome Header */}
            <div className="product-detail__welcome">
              <h1 className="product-detail__main-title">
                <span className="product-detail__title-prefix">
                  {product.name}
                </span>
              </h1>
              <p className="product-detail__welcome-text">
                Welcome to Skyline Marine Automation
              </p>
              <p className="product-detail__description">
                {product.description}
              </p>
            </div>

            {/* Product Content: Column Layout */}
            <div className="product-detail__content-column">
              {/* Product Info & Features */}
              <div className="product-detail__info-section">
                <div className="product-detail__header-row">
                  <div className="product-detail__title-group">
                    <h2 className="product-detail__product-name">
                      {product.name}
                    </h2>
                    <div className="product-detail__rating">
                      <div className="product-detail__stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="product-detail__star">
                            ☆
                          </span>
                        ))}
                      </div>
                      <span className="product-detail__reviews">
                        (0 reviews)
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                </div>

                {/* Features List */}
                <div className="product-detail__features-section">
                  <h3 className="product-detail__section-title">
                    Product Features
                  </h3>

                  {/* Row Layout: Images + Features */}
                  <div className="product-detail__features-row">
                    {/* Left: Product Images Grid */}
                    <div className="product-detail__images-section">
                      <div className="product-detail__image-main">
                        <img
                          src={product.images[0] || product.thumbnail}
                          alt={product.name}
                        />
                      </div>
                      {product.images.length > 1 && (
                        <div className="product-detail__image-thumbnails">
                          {product.images.slice(1, 4).map((image, index) => (
                            <div
                              key={index}
                              className="product-detail__image-thumb"
                            >
                              <img
                                src={image}
                                alt={`${product.name} ${index + 2}`}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Features List */}
                    <ul className="product-detail__features-list">
                      {productFeatures.automation.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="product-detail__contact-info">
                  <p className="product-detail__inquiry-text">
                    To inquire further for {product.name}, kindly email us at{" "}
                    <a href={`mailto:info@skylinemarine.co`}>
                      info@skylinemarine.co
                    </a>{" "}
                    or contact us on{" "}
                    <a href="tel:+917016439122">+91 70164 39122</a>
                  </p>

                  {/* Copy Link Button */}
                  <div className="product-detail__share">
                    <button
                      className="product-detail__copy-link-btn"
                      onClick={handleCopyLink}
                    >
                      {linkCopied ? (
                        <>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
                          Copy Link
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available Brands Section */}
        <section className="product-detail__brands">
          <div className="container">
            <div className="product-detail__brands-grid">
              {availableBrands.map((brand, index) => (
                <div key={index} className="product-detail__brand-card">
                  <div className="product-detail__brand-logo">{brand.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products Carousel */}
        <section className="product-detail__related">
          <div className="container">
            <h2 className="product-detail__related-title">
              Related <strong>Products</strong>
            </h2>

            <div className="product-detail__carousel">
              <button
                className="product-detail__carousel-btn product-detail__carousel-btn--prev"
                onClick={prevSlide}
                aria-label="Previous"
              >
                ‹
              </button>

              <div className="product-detail__carousel-track">
                <div
                  className="product-detail__carousel-slides"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {relatedProducts.map((relatedProduct) => (
                    <Link
                      key={relatedProduct.id}
                      href={`/products/${relatedProduct.slug}`}
                      className="product-detail__related-card"
                    >
                      <div className="product-detail__related-image">
                        <img
                          src={relatedProduct.thumbnail}
                          alt={relatedProduct.name}
                        />
                      </div>
                      <h3 className="product-detail__related-name">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>

              <button
                className="product-detail__carousel-btn product-detail__carousel-btn--next"
                onClick={nextSlide}
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

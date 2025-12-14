import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { marineSparePartsItems } from "@/src/data/menuData";
import { brands } from "@/src/data";
import { CategoryPageSkeleton } from "@/src/Components";

export default function MarineSparePartDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate 1-second data fetching delay
    if (slug) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [slug]);

  // Find the spare part item
  const sparePart = marineSparePartsItems.find((item) => item.slug === slug);

  if (!sparePart && slug) {
    return (
      <>
        <Head>
          <title>Spare Part Not Found - Skyline Marine Automation</title>
        </Head>
        <main className="category-page">
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <h1>Spare Part Not Found</h1>
            <p>Sorry, we couldn't find the spare part you're looking for.</p>
            <Link href="/marine-spare-parts">← Back to Marine Spare Parts</Link>
          </div>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading... - Skyline Marine Automation</title>
        </Head>
        <CategoryPageSkeleton gridCount={brands.length} />
      </>
    );
  }

  if (!sparePart) {
    return null;
  }

  const categoryDescription = `Complete range of ${sparePart.label} components for marine engines and equipment. Find high-quality ${sparePart.label} from leading marine suppliers.`;

  return (
    <>
      <Head>
        <title>
          {sparePart.label} - Marine Spare Parts - Skyline Marine Automation
        </title>
        <meta
          name="description"
          content={`Browse ${sparePart.label} from leading marine equipment suppliers. Find the ${sparePart.label} you need at competitive prices.`}
        />
      </Head>

      <main className="category-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <Link href="/marine-spare-parts">Marine Spare Parts</Link>
          <span className="separator">/</span>
          <span className="current">{sparePart.label}</span>
        </nav>

        {/* Category Header */}
        <section className="category-header">
          <div className="category-header-content">
            <div className="category-info">
              <h1>{sparePart.label}</h1>
              <p className="category-description">{categoryDescription}</p>
              <div className="category-stats">
                <span className="stat-item">
                  <strong>{brands.length}</strong> Brands Available
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="brands-grid-section">
          <div className="container">
            <h2>Available Brands for {sparePart.label}</h2>
            <div className="brands-grid">
              {brands.map((brand) => (
                <div key={brand.id} className="brand-card">
                  <Link href={`/brands/${brand.slug}?from=marine-spare-parts`}>
                    <div className="brand-card-image">
                      {brand.logo ? (
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={120}
                          height={60}
                          objectFit="contain"
                        />
                      ) : (
                        <div className="brand-placeholder">{brand.name}</div>
                      )}
                    </div>
                    <div className="brand-card-content">
                      <h3>{brand.name}</h3>
                      <p>{brand.description}</p>
                      <div className="brand-card-footer">
                        <span className="product-count">
                          {brand.productCount} Products
                        </span>
                        <span className="arrow">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section style={{ padding: "40px 20px", textAlign: "center" }}>
          <Link
            href="/marine-spare-parts"
            className="btn-back"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#003d82",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              transition: "all 0.3s ease",
            }}
          >
            ← Back to Marine Spare Parts
          </Link>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  // Validate that the slug exists in our menu data
  const validSlug = marineSparePartsItems.some(
    (item) => item.slug === params.slug
  );

  if (!validSlug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
    revalidate: 3600, // Revalidate every hour
  };
}

export async function getStaticPaths() {
  // Generate paths for all marine spare parts
  const paths = marineSparePartsItems.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

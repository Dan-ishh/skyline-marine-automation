import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { marineSparePartsItems } from "@/src/data/menuData";
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
        <CategoryPageSkeleton gridCount={6} />
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
            </div>
          </div>
        </section>

        {/* No Brands Available - Marine Spare Parts Coming Soon */}
        <section className="brands-grid-section">
          <div className="container">
            <h2>Available Brands</h2>
            <div className="no-brands-available">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: "0 auto 20px", opacity: 0.6 }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#ccc"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M 30 40 Q 50 60 70 40" stroke="#ccc" strokeWidth="3" />
                <circle cx="40" cy="35" r="3" fill="#ccc" />
                <circle cx="60" cy="35" r="3" fill="#ccc" />
              </svg>
              <h3>No Brands Available</h3>
              <p>
                No brands with {sparePart.label.toLowerCase()} products are
                currently available.
              </p>
              <p style={{ fontSize: "14px", color: "#999", marginTop: "10px" }}>
                Please check back soon as we continue to expand our{" "}
                {sparePart.label.toLowerCase()} inventory.
              </p>
              <Link
                href="/marine-spare-parts"
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#003366",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                ← Back to Categories
              </Link>
            </div>
          </div>
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

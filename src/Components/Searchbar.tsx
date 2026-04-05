import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { products } from "@/src/data/products";
import { brands } from "@/src/data/brands";

interface FilteredProduct {
  id: string;
  name: string;
  slug: string;
  mainCategory: string;
  subCategory?: string;
  brandId: string;
  thumbnail?: string;
  images?: string[];
  brandSlug?: string;
}

export default function Searchbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<FilteredProduct[]>(
    []
  );
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products when search query changes (3+ characters)
  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsLoading(true);
      // Simulate slight delay for better UX
      const debounceTimer = setTimeout(() => {
        const query = searchQuery.toLowerCase();

        const results = products
          .filter(
            (product) =>
              product.name.toLowerCase().includes(query) ||
              product.slug.toLowerCase().includes(query) ||
              (product.brandId &&
                brands
                  .find((b) => b.id === product.brandId)
                  ?.name.toLowerCase()
                  .includes(query))
          )
          .map((product) => ({
            ...product,
            brandSlug: brands.find((b) => b.id === product.brandId)?.slug,
          }));

        setFilteredProducts(results.slice(0, 8)); // Limit to 8 results
        setIsLoading(false);
      }, 300); // 300ms debounce

      return () => clearTimeout(debounceTimer);
    } else {
      setFilteredProducts([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle product click and redirection
  const handleProductClick = (product: FilteredProduct) => {
    setSearchQuery("");
    setShowResults(false);

    // Get brand slug from brandId
    const brand = brands.find((b) => b.id === product.brandId);
    const brandSlug = brand?.slug || "";

    // Navigate to the appropriate product detail page based on category
    if (product.mainCategory === "marine-spare-parts" && product.subCategory) {
      // Marine Spare Parts: /marine-spare-parts/[subCategory]/product/[productSlug]
      router.push(
        `/marine-spare-parts/${product.subCategory}/product/${product.slug}`
      );
    } else if (product.mainCategory === "complete-engine") {
      // Complete Engine: /products/[productSlug]
      router.push(`complete-engine/${product.brandSlug}/${product.slug}`);
    } else if (product.mainCategory === "generators") {
      // Generators: /products/[productSlug]
      router.push(`/generators/${product.brandSlug}/${product.slug}`);
    } else if (product.mainCategory === "turbochargers") {
      // Turbochargers: /products/[productSlug]
      router.push(`/turbochargers/${product.brandSlug}/${product.slug}`);
    } else {
      // Default fallback
      router.push(`/products/${product.slug}`);
    }
  };

  const handleInputFocus = () => {
    if (filteredProducts.length > 0) {
      setShowResults(true);
    }
  };

  // Get brand name by ID
  const getBrandName = (brandId: string) => {
    return brands.find((b) => b.id === brandId)?.name || "Unknown";
  };

  return (
    <div className="searchbar" ref={searchRef}>
      <div className="searchbar__input-wrapper">
        <svg
          className="searchbar__icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          className="searchbar__input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.length >= 3) {
              setShowResults(true);
            }
          }}
          onFocus={handleInputFocus}
          aria-label="Search products"
        />
        {searchQuery && (
          <button
            className="searchbar__clear"
            onClick={() => {
              setSearchQuery("");
              setFilteredProducts([]);
              setShowResults(false);
            }}
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {showResults && (
        <div className="searchbar__results">
          {isLoading ? (
            <div className="searchbar__loading">
              <div className="searchbar__loader"></div>
              <span>Searching...</span>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <ul className="searchbar__results-list">
                {filteredProducts.map((product) => (
                  <li key={product.id} className="searchbar__result-item">
                    <button
                      className="searchbar__result-button"
                      onClick={() => handleProductClick(product)}
                      type="button"
                    >
                      <div className="searchbar__result-image">
                        <img
                          src={
                            product.images?.[0] ||
                            product.thumbnail ||
                            "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg"
                          }
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg";
                          }}
                        />
                      </div>
                      <div className="searchbar__result-content">
                        <h4 className="searchbar__result-name">
                          {product.name}
                        </h4>
                        <p className="searchbar__result-brand">
                          {getBrandName(product.brandId)}
                        </p>
                        <span className="searchbar__result-category">
                          {product.mainCategory
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      <svg
                        className="searchbar__result-arrow"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              {filteredProducts.length > 0 && (
                <div className="searchbar__footer">
                  <p className="searchbar__results-count">
                    Showing {filteredProducts.length} results
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="searchbar__no-results">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <p>No products found</p>
              <span>Try searching with different keywords</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

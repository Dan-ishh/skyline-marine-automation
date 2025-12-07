/**
 * Skeleton Component
 * Reusable skeleton loading placeholders for different content types
 */

interface SkeletonProps {
  variant?: "card" | "text" | "circle" | "rectangular";
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

export function Skeleton({
  variant = "rectangular",
  width = "100%",
  height = "100%",
  count = 1,
  className = "",
}: SkeletonProps) {
  const getSkeletonClass = () => {
    const baseClass = "skeleton";
    const variantClass = `skeleton--${variant}`;
    return `${baseClass} ${variantClass} ${className}`.trim();
  };

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={getSkeletonClass()} style={style} />
        ))}
      </>
    );
  }

  return <div className={getSkeletonClass()} style={style} />;
}

// Product Card Skeleton (for home page recent products slider)
export function ProductCardSkeleton() {
  return (
    <div className="skeleton-product-card">
      <div className="skeleton-product-card__image">
        <Skeleton variant="rectangular" height="100%" />
      </div>
      <div className="skeleton-product-card__content">
        <Skeleton variant="text" height="20px" width="85%" />
        <Skeleton variant="text" height="16px" width="50%" />
        <Skeleton variant="text" height="14px" width="40%" />
      </div>
    </div>
  );
}

// Brand/Stock Card Skeleton (for home page stock slider)
export function BrandCardSkeleton() {
  return (
    <div className="skeleton-brand-card">
      <div className="skeleton-brand-card__image">
        <Skeleton variant="rectangular" height="100%" />
      </div>
      <div className="skeleton-brand-card__info">
        <Skeleton variant="text" height="14px" width="60%" />
      </div>
    </div>
  );
}

// Product Grid Card Skeleton (for products listing page)
export function ProductGridCardSkeleton() {
  return (
    <div className="skeleton-product-grid-card">
      <div className="skeleton-product-grid-card__image">
        <Skeleton variant="rectangular" height="100%" />
      </div>
      <div className="skeleton-product-grid-card__content">
        <Skeleton variant="text" height="20px" width="90%" />
        <Skeleton variant="text" height="16px" width="50%" />
        <div className="skeleton-product-grid-card__footer">
          <Skeleton variant="text" height="14px" width="45%" />
          <Skeleton variant="text" height="14px" width="35%" />
        </div>
      </div>
    </div>
  );
}

// Product Grid Skeleton (multiple cards for products listing page)
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="products-page__grid">
      {Array.from({ length: count }).map((_, index) => (
        <ProductGridCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Brand Grid Skeleton (multiple cards)
export function BrandGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="home-page__carousel-slides">
      {Array.from({ length: count }).map((_, index) => (
        <BrandCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Stock Brand Card Skeleton (for stock listing page)
export function StockBrandCardSkeleton() {
  return (
    <div className="skeleton-stock-brand-card">
      <div className="skeleton-stock-brand-card__content">
        <Skeleton variant="text" height="24px" width="70%" />
        <Skeleton variant="text" height="16px" width="90%" />
        <Skeleton variant="text" height="16px" width="40%" />
      </div>
    </div>
  );
}

// Stock Grid Skeleton (for stock listing page)
export function StockGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <StockBrandCardSkeleton key={index} />
      ))}
    </>
  );
}

// Stock Brand Products Grid Skeleton (for stock brand detail page)
export function StockBrandProductsGridSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="stock-brand-products__grid">
      {Array.from({ length: count }).map((_, index) => (
        <ProductGridCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Category Card Skeleton (for brand categories page)
export function CategoryCardSkeleton() {
  return (
    <div className="category-card skeleton-card">
      <div className="category-card-image">
        <Skeleton variant="rectangular" height="250px" />
      </div>
      <div className="category-card-content">
        <Skeleton variant="text" height="24px" width="60%" />
        <Skeleton variant="text" height="16px" width="90%" />
        <Skeleton variant="text" height="16px" width="80%" />
        <div className="category-footer" style={{ marginTop: "12px" }}>
          <Skeleton variant="text" height="16px" width="40%" />
        </div>
      </div>
    </div>
  );
}

// Categories Grid Skeleton (for brand categories page)
export function CategoriesGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="categories-grid">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default Skeleton;

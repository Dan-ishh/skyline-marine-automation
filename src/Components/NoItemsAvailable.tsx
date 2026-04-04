/**
 * NoItemsAvailable Component
 * Reusable component for displaying empty state when no items (brands or products) are available
 * Used in category pages to provide a consistent empty state UI
 */

import React from "react";
import styles from "./NoItemsAvailable.module.scss";

interface NoItemsAvailableProps {
  itemType?: "brands" | "products";
  message?: string;
  showIcon?: boolean;
}

export const NoItemsAvailable: React.FC<NoItemsAvailableProps> = ({
  itemType = "items",
  message,
  showIcon = true,
}) => {
  const defaultMessages: Record<string, string> = {
    brands: "No brands available in this category at the moment.",
    products: "No products available for this selection at the moment.",
    items: "No items available at the moment.",
  };

  const displayMessage = message || defaultMessages[itemType];

  return (
    <div className={styles.noItemsAvailable}>
      {showIcon && (
        <div className={styles.icon}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        </div>
      )}
      <p className={styles.message}>{displayMessage}</p>
    </div>
  );
};

export default NoItemsAvailable;

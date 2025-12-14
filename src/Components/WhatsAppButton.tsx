/**
 * WhatsApp Floating Button Component
 * Floating button that appears on all pages
 * Redirects user to WhatsApp chat when clicked
 */

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  // WhatsApp number (include country code, e.g., +91 for India)
  // Update this with your actual WhatsApp business number
  const whatsappNumber = "+917016439122"; // Replace with your number
  const whatsappMessage =
    "Hello! I'm interested in your marine products and services.";

  // Create WhatsApp chat link
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Open WhatsApp in new tab
  const openWhatsApp = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    isVisible && (
      <button
        className="whatsapp-button"
        onClick={openWhatsApp}
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* WhatsApp Chat Bubble Icon */}
          <path d="M19.05 4.91C17.18 3.03 14.76 2 12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.76 2.56 15.56 3.41 17.15L2 22L7.07 20.62C8.57 21.39 10.26 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.19 20.92 6.78 19.05 4.91ZM12.04 20.15C10.51 20.15 9.04 19.76 7.76 19.05L7.46 18.88L4.45 19.64L5.23 16.74L5.04 16.43C4.25 15.1 3.82 13.54 3.82 11.91C3.82 7.38 7.38 3.82 10.91 3.82C13.17 3.82 15.27 4.72 16.75 6.2C18.23 7.68 19.13 9.78 19.13 12.04C19.13 15.57 15.57 19.13 12.04 20.15ZM15.55 13.5C15.3 13.39 14.11 12.78 13.87 12.69C13.64 12.59 13.47 12.54 13.3 12.79C13.13 13.04 12.63 13.63 12.48 13.81C12.33 13.99 12.18 14.01 11.93 13.9C11.68 13.79 10.91 13.54 10 12.74C9.26 12.1 8.75 11.29 8.6 11.04C8.45 10.79 8.58 10.65 8.71 10.54C8.82 10.44 8.96 10.26 9.09 10.11C9.22 9.95 9.27 9.84 9.37 9.66C9.47 9.48 9.42 9.33 9.35 9.22C9.28 9.11 8.77 7.92 8.55 7.41C8.34 6.92 8.13 7 7.99 6.99C7.86 6.98 7.71 6.98 7.56 6.98C7.41 6.98 7.14 7.05 6.9 7.29C6.67 7.54 6.05 8.15 6.05 9.34C6.05 10.53 6.93 11.68 7.06 11.86C7.19 12.04 8.75 14.28 11.02 15.25C11.53 15.47 11.93 15.59 12.23 15.67C12.75 15.82 13.22 15.79 13.59 15.73C14 15.66 14.86 15.23 15.08 14.74C15.3 14.25 15.3 13.84 15.24 13.73C15.18 13.63 15.8 13.61 15.55 13.5Z" />
        </svg>
      </button>
    )
  );
}

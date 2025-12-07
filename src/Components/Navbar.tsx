/**
 * Navbar Component
 * Main navigation header with logo, contact info, navigation links, and CTA button
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { brands, getCategoriesByBrand } from "@/src/data";

interface NavLink {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
}

// Stock/Brand names for Stock mega menu
const stockBrands = [
  "STORK WERKSPOOR",
  "MAN B&W MAIN ENGINE",
  "SCHALLER",
  "INGERSOLL RAND",
  "DAIHATSU",
  "ALLEN DIESEL",
  "YANMAR",
  "BREATHING COMPRESSOR",
  "WARTSILA",
];

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Stock", href: "/stock", hasMegaMenu: true },
  // PRODUCTS menu hidden as per requirements
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStockMegaMenu, setShowStockMegaMenu] = useState(false);
  const [hoveredBrandId, setHoveredBrandId] = useState<string | null>(null);

  // Mobile menu state
  const [mobileStockExpanded, setMobileStockExpanded] = useState(false);
  const [mobileSelectedBrandId, setMobileSelectedBrandId] = useState<
    string | null
  >(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    // Match /stock and all its sub-routes
    if (href === "/stock") {
      return (
        router.pathname === "/stock" || router.pathname.startsWith("/stock/")
      );
    }
    // Match /products and all its sub-routes (including product detail pages)
    if (href === "/products") {
      return (
        router.pathname === "/products" ||
        router.pathname.startsWith("/products/")
      );
    }
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        {/* Top Bar - Contact Info */}
        <div className="navbar__top-bar">
          <div className="navbar__container">
            {/* Email Section */}
            <div className="navbar__contact-group">
              <span className="navbar__contact-label">Send Us an Email</span>
              <div className="navbar__contact-links">
                <a
                  href="mailto:info@skylinemarine.co"
                  className="navbar__contact-link"
                >
                  info@skylinemarine.co
                </a>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="navbar__contact-group">
              <span className="navbar__contact-label">Contact</span>
              <div className="navbar__contact-links">
                <a href="tel:+917016439122" className="navbar__contact-link">
                  +91 70164 39122
                </a>
                <a href="tel:+919825308448" className="navbar__contact-link">
                  +91 98253 08448
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="navbar__social">
              <span className="navbar__contact-label">Follow Us</span>
              <div className="navbar__social-links">
                <a
                  href="https://www.facebook.com/people/Skyline-Marine/61564057198879/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label="Facebook"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sky_line_marine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/skyline-marine-navaz-ofthani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="navbar__main">
          <div className="navbar__container">
            {/* Logo */}
            <Link href="/" className="navbar__logo">
              <Image
                src="/Assets/images/Banner/skyline-black.svg"
                alt="Skyline Marine Automation"
                width={180}
                height={60}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="navbar__nav">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className="navbar__nav-item"
                  onMouseEnter={() => {
                    if (link.hasMegaMenu && link.label === "Stock") {
                      setShowStockMegaMenu(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.hasMegaMenu && link.label === "Stock") {
                      setShowStockMegaMenu(false);
                      setHoveredBrandId(null);
                    }
                  }}
                  style={{ position: "relative" }}
                >
                  <Link
                    href={link.href}
                    className={`navbar__nav-link ${
                      isActiveLink(link.href) ? "navbar__nav-link--active" : ""
                    }`}
                  >
                    {link.label}
                    {link.hasMegaMenu && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        style={{ marginLeft: "6px", display: "inline-block" }}
                      >
                        <path d="M6 9L1 4h10z" />
                      </svg>
                    )}
                  </Link>

                  {/* Stock Mega Menu - All Brands with Category Popover */}
                  {link.label === "Stock" && showStockMegaMenu && (
                    <div className="navbar__mega-menu navbar__mega-menu--hierarchical">
                      <div className="navbar__mega-menu-container">
                        <div className="navbar__mega-menu-layout">
                          {/* Brands Column - Shows ALL brands from images */}
                          <div className="navbar__mega-menu-brands">
                            <h4 className="navbar__mega-menu-subtitle">
                              Available Brands
                            </h4>
                            <div className="navbar__brands-list">
                              {brands.map((brand) => (
                                <div
                                  key={brand.id}
                                  className={`navbar__brand-item ${
                                    hoveredBrandId === brand.id
                                      ? "navbar__brand-item--active"
                                      : ""
                                  }`}
                                  onMouseEnter={() =>
                                    setHoveredBrandId(brand.id)
                                  }
                                >
                                  <Link
                                    href={`/brands/${brand.slug}`}
                                    className="navbar__brand-link"
                                  >
                                    {brand.name}
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="currentColor"
                                      style={{ marginLeft: "auto" }}
                                    >
                                      <path
                                        d="M6 4L10 8L6 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                      />
                                    </svg>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Categories Popover (shows when brand is hovered) */}
                          {hoveredBrandId && (
                            <div className="navbar__mega-menu-categories">
                              <h4 className="navbar__mega-menu-subtitle">
                                {
                                  brands.find((b) => b.id === hoveredBrandId)
                                    ?.name
                                }{" "}
                                Categories
                              </h4>
                              <div className="navbar__categories-grid">
                                {getCategoriesByBrand(hoveredBrandId).length >
                                0 ? (
                                  getCategoriesByBrand(hoveredBrandId).map(
                                    (category) => (
                                      <Link
                                        key={category.id}
                                        href={`/brands/${
                                          brands.find(
                                            (b) => b.id === hoveredBrandId
                                          )?.slug
                                        }/${category.slug}`}
                                        className="navbar__category-link"
                                      >
                                        <span className="navbar__category-name">
                                          {category.name}
                                        </span>
                                        <span className="navbar__category-count">
                                          {category.productCount} products
                                        </span>
                                      </Link>
                                    )
                                  )
                                ) : (
                                  <div className="navbar__no-categories">
                                    <p>No categories available</p>
                                    <Link
                                      href={`/brands/${
                                        brands.find(
                                          (b) => b.id === hoveredBrandId
                                        )?.slug
                                      }`}
                                      className="navbar__view-brand"
                                    >
                                      View Brand Page →
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link href="/contact" className="navbar__cta">
              Request a Free Quote
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`navbar__hamburger ${
                isMobileMenuOpen ? "navbar__hamburger--active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="navbar__hamburger-line"></span>
              <span className="navbar__hamburger-line"></span>
              <span className="navbar__hamburger-line"></span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`navbar__mobile-menu ${
            isMobileMenuOpen ? "navbar__mobile-menu--open" : ""
          }`}
        >
          {/* Close Button */}
          <button
            className="navbar__mobile-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <ul className="navbar__mobile-nav">
            {navLinks.map((link) => (
              <li key={link.href} className="navbar__mobile-nav-item">
                {link.hasMegaMenu && link.label === "Stock" ? (
                  <>
                    {/* Stock Menu with Hierarchical Navigation */}
                    <button
                      className={`navbar__mobile-nav-link navbar__mobile-nav-link--expandable ${
                        mobileStockExpanded ? "expanded" : ""
                      }`}
                      onClick={() =>
                        setMobileStockExpanded(!mobileStockExpanded)
                      }
                    >
                      {link.label}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          marginLeft: "auto",
                          transform: mobileStockExpanded
                            ? "rotate(180deg)"
                            : "rotate(0)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <path d="M8 11L3 6h10z" />
                      </svg>
                    </button>

                    {/* Mobile Hierarchical Menu */}
                    {mobileStockExpanded && (
                      <div className="navbar__mobile-stock-menu">
                        {/* Link to main Stock page */}
                        <Link
                          href="/stock"
                          className="navbar__mobile-stock-link navbar__mobile-stock-link--main"
                        >
                          View All Stock
                        </Link>

                        {/* Brands List */}
                        <div className="navbar__mobile-brands-list">
                          {brands.map((brand) => (
                            <div
                              key={brand.id}
                              className="navbar__mobile-brand-item"
                            >
                              <button
                                className={`navbar__mobile-brand-button ${
                                  mobileSelectedBrandId === brand.id
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setMobileSelectedBrandId(
                                    mobileSelectedBrandId === brand.id
                                      ? null
                                      : brand.id
                                  )
                                }
                              >
                                <span>{brand.name}</span>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                  style={{
                                    transform:
                                      mobileSelectedBrandId === brand.id
                                        ? "rotate(180deg)"
                                        : "rotate(0)",
                                    transition: "transform 0.3s ease",
                                  }}
                                >
                                  <path d="M8 11L3 6h10z" />
                                </svg>
                              </button>

                              {/* Categories for selected brand */}
                              {mobileSelectedBrandId === brand.id && (
                                <div className="navbar__mobile-categories-list">
                                  <Link
                                    href={`/brands/${brand.slug}`}
                                    className="navbar__mobile-category-link navbar__mobile-category-link--all"
                                  >
                                    View All Categories
                                  </Link>
                                  {getCategoriesByBrand(brand.id).map(
                                    (category) => (
                                      <Link
                                        key={category.id}
                                        href={`/brands/${brand.slug}/${category.slug}`}
                                        className="navbar__mobile-category-link"
                                      >
                                        <span>{category.name}</span>
                                        <span className="navbar__mobile-category-count">
                                          {category.productCount}
                                        </span>
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`navbar__mobile-nav-link ${
                      isActiveLink(link.href)
                        ? "navbar__mobile-nav-link--active"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Contact Info */}
          <div className="navbar__mobile-contact">
            <div className="navbar__mobile-contact-group">
              <h4>Email</h4>
              {/* <a href="mailto:info@skylinemarine.co">info@skylinemarine.co</a> */}
              <a href="mailto:info@skylinemarine.co">info@skylinemarine.co</a>
            </div>
            <div className="navbar__mobile-contact-group">
              <h4>Phone</h4>
              <a href="tel:+917016439122">+91 70164 39122</a>
              <a href="tel:+919825308448">+91 98253 08448</a>
            </div>
            <div className="navbar__mobile-contact-group">
              <h4>Follow Us</h4>
              <div className="navbar__mobile-social">
                <a
                  href="https://www.facebook.com/people/Skyline-Marine/61564057198879/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label="Facebook"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sky_line_marine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/skyline-marine-navaz-ofthani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <Link href="/contact" className="navbar__mobile-cta">
            REQUEST A FREE QUOTE
          </Link>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="navbar__overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
}

/**
 * Navbar Component
 * Main navigation header with logo, contact info, navigation links, and CTA button
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { categories } from "@/src/data";

interface NavLink {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
}

// Brand names for Brands mega menu
const brandNames = [
  "WARTSILA",
  "ROLLS-ROYCE",
  "MAN B&W",
  "WICHMANN",
  "HYUNDAI HIMSE",
  "DEUTZ",
  "MAK",
  "DAIHATSU",
  "TURBOCHARGERS",
  "WINCH",
  "COMPLETE ENGINES",
  "AKASAKA",
  "GENERATORS",
  "CATERPILLAR",
  "EMD",
  "EQUIPMENTS",
  "OIL WELL EQUIPMENTS",
  "BLOWERS",
  "HANSHIN",
  "MITSUBISHI",
  "GOVERNOR",
  "PIELSTICK",
  "YANMAR",
];

const navLinks: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "BRANDS", href: "/brands", hasMegaMenu: true },
  { label: "PRODUCTS", href: "/products", hasMegaMenu: true },
  { label: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBrandsMegaMenu, setShowBrandsMegaMenu] = useState(false);
  const [showProductsMegaMenu, setShowProductsMegaMenu] = useState(false);

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
    // Exact match for /brands and /products to avoid conflicts
    if (href === "/brands") {
      return (
        router.pathname === "/brands" || router.pathname.startsWith("/brands/")
      );
    }
    if (href === "/products") {
      return router.pathname === "/products";
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
              <span className="navbar__contact-label">SEND US AN EMAIL</span>
              <div className="navbar__contact-links">
                <a
                  href="mailto:sales@skylinemarine.co"
                  className="navbar__contact-link"
                >
                  sales@skylinemarine.co
                </a>
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
              <span className="navbar__contact-label">CONTACT</span>
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
              <span className="navbar__contact-label">FOLLOW US</span>
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
                    if (link.hasMegaMenu) {
                      if (link.label === "BRANDS") {
                        setShowBrandsMegaMenu(true);
                      } else if (link.label === "PRODUCTS") {
                        setShowProductsMegaMenu(true);
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.hasMegaMenu) {
                      if (link.label === "BRANDS") {
                        setShowBrandsMegaMenu(false);
                      } else if (link.label === "PRODUCTS") {
                        setShowProductsMegaMenu(false);
                      }
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

                  {/* Brands Mega Menu - Brand Names */}
                  {link.label === "BRANDS" && showBrandsMegaMenu && (
                    <div className="navbar__mega-menu">
                      <div className="navbar__mega-menu-container">
                        <h3 className="navbar__mega-menu-title">
                          Marine Equipment Brands
                        </h3>
                        <div className="navbar__mega-menu-grid">
                          {brandNames.map((brandName) => (
                            <Link
                              key={brandName}
                              href={`/brands?search=${encodeURIComponent(
                                brandName
                              )}`}
                              className="navbar__mega-menu-item"
                            >
                              {brandName}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Products Mega Menu - Product Categories */}
                  {link.label === "PRODUCTS" && showProductsMegaMenu && (
                    <div className="navbar__mega-menu">
                      <div className="navbar__mega-menu-container">
                        <h3 className="navbar__mega-menu-title">
                          Product Categories
                        </h3>
                        <div className="navbar__mega-menu-grid">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/products?category=${category.slug}`}
                              className="navbar__mega-menu-item"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link href="/contact" className="navbar__cta">
              REQUEST A FREE QUOTE
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
              </li>
            ))}
          </ul>

          {/* Mobile Contact Info */}
          <div className="navbar__mobile-contact">
            <div className="navbar__mobile-contact-group">
              <h4>Email</h4>
              <a href="mailto:sales@skylinemarine.co">sales@skylinemarine.co</a>
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

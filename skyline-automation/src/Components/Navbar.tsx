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

const navLinks: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "BRANDS", href: "/brands", hasMegaMenu: true },
  { label: "PRODUCTS", href: "/products" },
  { label: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBrandsMegaMenu, setShowBrandsMegaMenu] = useState(false);

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
                  href="mailto:skyline@example.com"
                  className="navbar__contact-link"
                >
                  skyline@example.com
                </a>
                <a
                  href="mailto:info@skyline.com"
                  className="navbar__contact-link"
                >
                  info@skyline.com
                </a>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="navbar__contact-group">
              <span className="navbar__contact-label">CONTACT</span>
              <div className="navbar__contact-links">
                <a href="tel:+917624070809" className="navbar__contact-link">
                  +91 76240 70809
                </a>
                <a href="tel:+919428401641" className="navbar__contact-link">
                  +91 94284 01641
                </a>
                <a href="tel:+919428401650" className="navbar__contact-link">
                  +91 94284 01650
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="navbar__social">
              <span className="navbar__contact-label">FOLLOW US</span>
              <div className="navbar__social-links">
                <a
                  href="https://facebook.com"
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
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label="Twitter"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
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
                  onMouseEnter={() =>
                    link.hasMegaMenu && setShowBrandsMegaMenu(true)
                  }
                  onMouseLeave={() =>
                    link.hasMegaMenu && setShowBrandsMegaMenu(false)
                  }
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

                  {/* Brands Mega Menu */}
                  {link.hasMegaMenu && showBrandsMegaMenu && (
                    <div
                      className="navbar__mega-menu"
                      onMouseEnter={() => setShowBrandsMegaMenu(true)}
                      onMouseLeave={() => setShowBrandsMegaMenu(false)}
                    >
                      <div className="navbar__mega-menu-container">
                        <h3 className="navbar__mega-menu-title">
                          Product Categories
                        </h3>
                        <div className="navbar__mega-menu-grid">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/brands?category=${category.slug}`}
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
              <a href="mailto:skyline@example.com">skyline@example.com</a>
              <a href="mailto:info@skyline.com">info@skyline.com</a>
            </div>
            <div className="navbar__mobile-contact-group">
              <h4>Phone</h4>
              <a href="tel:+917624070809">+91 76240 70809</a>
              <a href="tel:+919428401641">+91 94284 01641</a>
              <a href="tel:+919428401650">+91 94284 01650</a>
            </div>
            <div className="navbar__mobile-contact-group">
              <h4>Follow Us</h4>
              <div className="navbar__mobile-social">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
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

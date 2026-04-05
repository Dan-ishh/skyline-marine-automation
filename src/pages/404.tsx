/**
 * 404 Not Found Page
 * Route: /*
 * Handles all invalid routes and displays a custom 404 error page
 */

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Skyline Marine Automation</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className={`not-found-page ${mounted ? "loaded" : ""}`}>
        {/* Background Animation */}
        <div className="not-found-page__background">
          <div className="not-found-page__animation-box animation-box-1"></div>
          <div className="not-found-page__animation-box animation-box-2"></div>
          <div className="not-found-page__animation-box animation-box-3"></div>
        </div>

        {/* Content Container */}
        <div className="not-found-page__container">
          {/* Error Code */}
          <div className="not-found-page__code-wrapper">
            <h1 className="not-found-page__code">404</h1>
            <div className="not-found-page__code-shadow"></div>
          </div>

          {/* Error Message */}
          <div className="not-found-page__content">
            <h2 className="not-found-page__title">Oops! Page Not Found</h2>

            <p className="not-found-page__description">
              The page you're looking for doesn't exist or has been moved. It
              might be under maintenance or the URL could be incorrect.
            </p>

            {/* Requested Path (if available) */}
            {mounted && router.asPath && (
              <div className="not-found-page__path">
                <span className="not-found-page__path-label">
                  Requested path:
                </span>
                <code className="not-found-page__path-value">
                  {router.asPath}
                </code>
              </div>
            )}

            {/* Action Buttons */}
            <div className="not-found-page__actions">
              <button
                className="not-found-page__btn not-found-page__btn--primary"
                onClick={handleGoHome}
                aria-label="Go to home page"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Go to Home
              </button>

              <button
                className="not-found-page__btn not-found-page__btn--secondary"
                onClick={handleGoBack}
                aria-label="Go back to previous page"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"></path>
                </svg>
                Go Back
              </button>
            </div>

            {/* Navigation Links */}
            <div className="not-found-page__links">
              <p className="not-found-page__links-title">Quick Navigation:</p>
              <nav className="not-found-page__links-nav">
                <Link
                  href="/marine-spare-parts"
                  className="not-found-page__link"
                >
                  Marine Spare Parts
                </Link>
                <Link href="/complete-engine" className="not-found-page__link">
                  Complete Engine
                </Link>
                <Link href="/generators" className="not-found-page__link">
                  Generators
                </Link>
                <Link href="/contact" className="not-found-page__link">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

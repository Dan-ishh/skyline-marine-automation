/**
 * Hero Slider Component
 * Displays a rotating banner on the home page
 */

import { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Premium Marine Equipment",
    subtitle: "Skyline Marine Automation",
    description:
      "Your trusted source for high-quality marine engines, automation systems, and equipment",
    image: "/Assets/images/Banner/ship-engine.jpg",
    cta: "Explore Products",
    ctaLink: "/brands",
  },
  {
    id: 2,
    title: "Advanced Automation Systems",
    subtitle: "Smart Marine Solutions",
    description:
      "State-of-the-art automation and control systems for modern vessels",
    image: "/Assets/images/Banner/panel.jpg",
    cta: "View Automation",
    ctaLink: "/brands",
  },
  {
    id: 3,
    title: "Power Generation Excellence",
    subtitle: "Diesel Engines & Generators",
    description: "Reliable power solutions from world-leading manufacturers",
    image: "/Assets/images/Banner/power.jpg",
    cta: "Discover More",
    ctaLink: "/brands",
  },
  //   {
  //     id: 4,
  //     title: "Expert Marine Services",
  //     subtitle: "Sales & Support",
  //     description: "Comprehensive support for all your marine equipment needs",
  //     image: "/Assets/images/Banner/ship2.jpg",
  //     cta: "Contact Us",
  //     ctaLink: "/contact",
  //   },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause auto-play when user manually changes slide

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="hero-slider">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : ""} ${
              index < currentSlide ? "prev" : ""
            } ${index > currentSlide ? "next" : ""}`}
          >
            {/* Background Image */}
            <div className="slide-image">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
                quality={90}
              />
              <div className="overlay"></div>
            </div>

            {/* Slide Content */}
            <div className="slide-content">
              <div className="container">
                <span className="subtitle">{slide.subtitle}</span>
                <h1 className="title">{slide.title}</h1>
                <p className="description">{slide.description}</p>
                <a href={slide.ctaLink} className="cta-button">
                  {slide.cta}
                  <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="nav-arrow prev-arrow"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <span>‹</span>
      </button>
      <button
        className="nav-arrow next-arrow"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <span>›</span>
      </button>

      {/* Dots Navigation */}
      <div className="dots-navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="autoplay-indicator">
        {isAutoPlaying && (
          <div
            className="progress-bar"
            style={{ animation: "slideProgress 5s linear" }}
          />
        )}
      </div>
    </div>
  );
}

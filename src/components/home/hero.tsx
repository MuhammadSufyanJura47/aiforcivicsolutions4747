
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from "lucide-react";

const slides = [
  {
    eyebrow: "A CIVIC INNOVATION HACKATHON",
    title: "Build AI That Makes a Difference.",
    description:
      "Bring your ideas, technical skills, and curiosity together to create practical solutions for the challenges communities face.",
    image: "/images/hero/civic-innovation.jpg",
    alt: "Civic innovation and community problem-solving",
  },
  {
    eyebrow: "FROM IDEAS TO PROTOTYPES",
    title: "Turn Real Problems Into Real Solutions.",
    description:
      "Explore civic challenges, learn through workshops, and work towards a prototype that demonstrates your idea.",
    image: "/images/hero/ideas-to-prototypes.jpg",
    alt: "People collaborating on a technology project",
  },
  {
    eyebrow: "TECHNOLOGY WITH PURPOSE",
    title: "Your Skills. Your Ideas. Your Impact.",
    description:
      "Join fellow builders and innovators exploring responsible AI for public services and community needs.",
    image: "/images/hero/technology-with-purpose.jpg",
    alt: "Technology being used to support communities",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  function previousSlide() {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length,
    );
  }

  function nextSlide() {
    setActiveSlide((current) => (current + 1) % slides.length);
  }

  return (
    <section className="hero" aria-label="Hackathon introduction">
      {slides.map((item, index) => (
        <div
          key={item.title}
          className={`hero-image ${index === activeSlide ? "is-active" : ""}`}
          style={{ backgroundImage: `url("${item.image}")` }}
          role="img"
          aria-label={item.alt}
          aria-hidden={index !== activeSlide}
        />
      ))}

      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <Lightbulb size={16} />
            {slide.eyebrow}
          </span>

          <p className="hero-edition">AI FOR CIVIC SOLUTIONS · 2026</p>

          <h1 key={slide.title} className="hero-title">
            {slide.title}
          </h1>

          <p className="hero-description">{slide.description}</p>

          <div className="hero-actions">
            <Link href="/apply" className="btn btn-primary">
              Apply Now <ArrowRight size={18} />
            </Link>

            <Link href="#about" className="btn hero-secondary">
              Explore Hackathon <ArrowDown size={17} />
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-dot" />
            A CODELOGIX Solutions initiative
          </div>
        </div>

        <div className="hero-controls">
          <span className="hero-slide-count">
            0{activeSlide + 1} <span>/</span> 0{slides.length}
          </span>

          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="hero-indicators" aria-label="Choose slide">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === activeSlide ? "active" : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === activeSlide}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigationLinks } from "@/lib/site";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container navbar-inner">
        <Link
          href="/"
          className="brand"
          aria-label="AI for Civic Solutions homepage"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            className="brand-mark"
            src="/images/logo.svg"
            alt="AI for Civic Solutions"
            width={43}
            height={43}
            priority
          />

          <span className="brand-copy">
            <strong>AI for Civic Solutions</strong>
            <small>2026 · By CODELOGIX Solutions</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link className="btn btn-secondary navbar-apply" href="/check-status">
            Check Status
          </Link>

          <Link className="btn btn-primary navbar-apply" href="/apply">
            Apply Now <ArrowUpRight size={16} />
          </Link>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/check-status"
            onClick={() => setMenuOpen(false)}
          >
            Check Application Status
          </Link>

          <Link
            href="/apply"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Apply Now <ArrowUpRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}

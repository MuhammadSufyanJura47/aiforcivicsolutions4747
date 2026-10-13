
import type { Metadata, Viewport } from "next";
import ScrollToTop from "@/components/layout/scroll-to-top";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aiforcivicsolutions.tech/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI for Civic Solutions 2026 | CODELOGIX Solutions",
    template: "%s | AI for Civic Solutions 2026",
  },
  description:
    "Build practical AI-powered solutions for real civic challenges. Join AI for Civic Solutions 2026 by CODELOGIX Solutions.",
  alternates: {
    canonical: "/",
  },
  applicationName: "AI for Civic Solutions 2026",
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  keywords: [
    "AI for Civic Solutions",
    "civic technology",
    "artificial intelligence",
    "hackathon Pakistan",
    "CODELOGIX Solutions",
    "social innovation",
  ],
  openGraph: {
    title: "AI for Civic Solutions 2026",
    description:
      "Bring your ideas to life with AI-powered solutions to civic challenges.",
    type: "website",
    siteName: "AI for Civic Solutions 2026",
    locale: "en_PK",
    url: "/",
    images: [
      {
        url: "/images/hero/civic-innovation.jpg",
        width: 1600,
        height: 900,
        alt: "AI for Civic Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Civic Solutions 2026",
    description:
      "Bring your ideas to life with AI-powered solutions to civic challenges.",
    images: ["/images/hero/civic-innovation.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "02uQ1Qq-xKpqDzkIKaIck7QWSnLIUY6BKCzDCBD40eg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e7f5ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}

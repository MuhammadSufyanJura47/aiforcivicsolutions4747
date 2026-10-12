import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aiforcivicsolutions.tech/";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/apply",
    "/check-status",
    "/contact",
    "/faq",
    "/benefits",
    "/rules",
    "/speakers",
    "/sponsors",
    "/timeline",
    "/tracks",
    "/workshops",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

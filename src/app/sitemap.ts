import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-08");
  const paths = [
    "/",
    "/services",
    "/training",
    "/training/arvind-fashions",
    "/training/autobahn-group",
    "/about",
  ] as const;

  return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified }));
}

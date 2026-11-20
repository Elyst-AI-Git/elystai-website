import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-20");
  const paths = [
    "/",
    "/transformation",
    "/kickstart",
    "/work",
    "/work/nalakath-holdings-ai-content-system",
    "/work/arvind-fashions-ai-training",
    "/work/kalyan-ai-onboarding-system",
    "/work/autobahn-ai-training-for-hr",
    "/about",
    "/contact",
  ] as const;

  return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified }));
}

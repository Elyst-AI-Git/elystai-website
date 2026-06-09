import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/aios", priority: 0.9, changeFrequency: "monthly" },
    { path: "/learn", priority: 0.9, changeFrequency: "monthly" },
    { path: "/circle", priority: 0.8, changeFrequency: "monthly" },
    { path: "/juniors", priority: 0.8, changeFrequency: "monthly" },
  ];
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

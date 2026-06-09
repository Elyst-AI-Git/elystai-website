import type { Metadata } from "next";

export const SITE_URL = "https://elystai.com";
export const OG_IMAGE = "/og-image.png";

/**
 * Builds per-page metadata with a self-canonical, page-specific Open Graph +
 * Twitter cards, and the shared og-image. `title` is the bare page title — the
 * root layout's title template appends "· Elyst AI", so do NOT include the
 * brand here (avoids the "… · Elyst AI · Elyst AI" double-branding).
 */
export function pageMeta({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const ogTitle = `${title} · Elyst AI`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Elyst AI",
      url: path,
      title: ogTitle,
      description,
      locale: "en_US",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Elyst AI" }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

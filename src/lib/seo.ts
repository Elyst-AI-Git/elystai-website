import type { Metadata } from "next";

export const SITE_URL = "https://elystai.com";
// Sitewide social preview. A page can override it through pageMeta().
export const OG_IMAGE = "/images/og/site.png";

/**
 * Builds per-page metadata with a self-canonical, page-specific Open Graph +
 * Twitter cards. `title` is the bare page title; the root layout's title
 * template appends " | Elyst AI", so do NOT include the brand here (avoids
 * "… | Elyst AI | Elyst AI" double-branding).
 *
 * `image` lets a page override the sitewide preview when it has specific art.
 */
export function pageMeta({
  path,
  title,
  description,
  image = OG_IMAGE,
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const ogTitle = `${title} | Elyst AI`;
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
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}

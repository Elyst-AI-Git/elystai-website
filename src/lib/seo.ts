import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const SITE_URL = "https://elystai.com";
// Sitewide social preview: generated from src/app/opengraph-image.tsx.
export const OG_IMAGE = "/opengraph-image";

/**
 * Social preview for a page. If a designed image is in
 * public/images/og/<name>.jpg (or .png) it is used; otherwise the generated one is.
 * (WhatsApp skips previews over about 300 KB, so keep those files small.)
 */
export function ogImage(name: string, generated: string): string {
  for (const ext of ["jpg", "png"]) {
    const file = `/images/og/${name}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", file))) return file;
  }
  return generated;
}

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
  const ogTitle = title.endsWith("Elyst AI") ? title : `${title} | Elyst AI`;
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

import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/site/Nav";
import PreFooter from "@/components/site/PreFooter";
import Footer from "@/components/site/Footer";
import { OG_IMAGE } from "@/lib/seo";
import MarketingAnalytics from "@/components/marketing/MarketingAnalytics";
import ScrollToTop from "@/components/site/ScrollToTop";

const SITE_URL = "https://elystai.com";
const SITE_TITLE = "Elyst AI";
const SITE_DESCRIPTION =
  "Elyst AI finds one costly workflow, builds the smallest useful AI system, and hands it over with training, documentation, and clear human review.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Elyst AI",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Elyst AI",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Elyst AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      // Note: the old /favicon.svg was a 2 MB base64 raster wrapped in <svg>
      // (no vector benefit) that was fetched on every page. Dropped in favour
      // of the 12 KB PNG + ICO below.
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: { url: "/apple-touch-icon.png" },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald focus:px-4 focus:py-2 focus:text-fg-on-dark"
        >
          Skip to content
        </a>
        <Nav />
        <ScrollToTop />
        {children}
        <PreFooter />
        <Footer />
        <MarketingAnalytics enableWebAnalytics={Boolean(process.env.VERCEL)} />
      </body>
    </html>
  );
}

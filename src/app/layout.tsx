import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = "https://elystai.com";
const SITE_TITLE = "Elyst AI: AI systems for business and programs for people";
const SITE_DESCRIPTION =
  "Elyst AI builds AI into how businesses run with AIOS, and teaches people to use it through the Accelerator. Based in Kozhikode, Kerala, working across India and the GCC.";

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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
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
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald focus:px-4 focus:py-2 focus:text-fg-on-dark"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

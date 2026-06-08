import type { Metadata } from "next";
import { DM_Sans, Kalam } from "next/font/google";
import "./globals.css";
import Nav from "@/components/site/Nav";
import PreFooter from "@/components/site/PreFooter";
import Footer from "@/components/site/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Kalam — a restrained, print-adjacent handwriting face (not a flowery
// cursive script). Used sparingly for the testimonial "notes" on the
// Accelerator page, where it needs to read as "someone wrote this carefully"
// and stay legible at body-text size, not blur into decorative scrawl.
const kalam = Kalam({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://elyst.ai"),
  title: {
    default: "Elyst AI — AI systems for business, programs for people",
    template: "%s · Elyst AI",
  },
  description:
    "Elyst AI deploys AI into how businesses run (AIOS) and teaches people to use it (the Accelerator). Kozhikode, Kerala — for India and the GCC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${kalam.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald focus:px-4 focus:py-2 focus:text-fg-on-dark"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <PreFooter />
        <Footer />
      </body>
    </html>
  );
}

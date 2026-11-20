import type { NextConfig } from "next";

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  ...(process.env.NODE_ENV === "development" ? ["'unsafe-eval'"] : []),
  "https://va.vercel-scripts.com",
].join(" ");

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src ${scriptSources}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

// Security headers applied to every route. Inline script/style allowances are
// currently required by Next.js hydration and the metallic button renderer;
// every other resource type is restricted to the minimum origins in use.
const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // The guide is for people who asked for it: keep the PDF out of search results.
      {
        source: "/downloads/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    const permanent = (source: string, destination: string) => ({
      source,
      destination,
      permanent: true,
    });

    return [
      // Renamed service pages: old links and rankings carry over.
      permanent("/services", "/transformation"),
      permanent("/training", "/kickstart"),
      permanent("/training/arvind-fashions", "/work/arvind-fashions-ai-training"),
      permanent("/training/autobahn-group", "/work/autobahn-ai-training-for-hr"),

      // Case study pages moved to keyword slugs.
      permanent("/work/arvind-fashions", "/work/arvind-fashions-ai-training"),
      permanent("/work/autobahn-mahindra", "/work/autobahn-ai-training-for-hr"),
      permanent("/work/nalakath-holdings", "/work/nalakath-holdings-ai-content-system"),
      permanent("/work/kalyan-tourism-travel", "/work/kalyan-ai-onboarding-system"),
      permanent("/work/hal-management-academy", "/work"),

      // Retired routes.
      permanent("/guide", "/transformation"),
      permanent("/guide/thank-you", "/transformation"),
      permanent("/aios", "/transformation"),
      permanent("/learn", "/kickstart"),
      permanent("/ai-for-work", "/kickstart"),
      permanent("/juniors", "/kickstart"),
      permanent("/waitlist", "/kickstart"),
      permanent("/circle", "/kickstart"),
      permanent("/register", "/kickstart"),
      permanent("/register/onboarding", "/kickstart"),
      permanent("/register/confirmation", "/kickstart"),

      // Booking is replaced by the contact form.
      permanent("/book/:intent", "/contact"),
      permanent("/booking-complete", "/contact"),
    ];
  },
};

export default nextConfig;

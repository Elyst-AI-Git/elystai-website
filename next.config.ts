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
  "frame-src 'self' https://cal.com",
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
    ];
  },
  async redirects() {
    return [
      {
        source: "/aios",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/learn",
        destination: "/training",
        permanent: true,
      },
      {
        source: "/ai-for-work",
        destination: "/training",
        permanent: true,
      },
      {
        source: "/juniors",
        destination: "/training",
        permanent: true,
      },
      {
        source: "/waitlist",
        destination: "/training",
        permanent: true,
      },
      {
        source: "/register/onboarding",
        destination: "/training",
        permanent: true,
      },
      {
        source: "/register/confirmation",
        destination: "/training",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

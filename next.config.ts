import type { NextConfig } from "next";

// Security headers applied to every route. CSP is intentionally omitted here
// because the site uses inline styles + a WebGL/canvas pipeline that a strict
// CSP would break without nonce plumbing; the headers below cover the
// high-value protections (clickjacking, MIME sniffing, referrer leakage,
// HSTS, and locking down powerful browser features).
const securityHeaders = [
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

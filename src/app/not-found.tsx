import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 flex-col items-center justify-center bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)", minHeight: "60vh" }}>
      <p
        className="font-display font-bold leading-none"
        style={{ fontSize: "clamp(6rem, 18vw, 14rem)", color: "var(--elyst-emerald)", opacity: 0.18, lineHeight: 1, userSelect: "none" }}
        aria-hidden
      >
        404
      </p>
      <div className="relative -mt-6 text-center sm:-mt-8">
        <h1 className="font-display font-bold text-fg-on-dark" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.2 }}>
          We could not find that page.
        </h1>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-fg-on-dark">
        {[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Training", href: "/training" },
          { label: "About", href: "/about" },
        ].map((link) => (
          <Link key={link.href} href={link.href} className="font-semibold underline decoration-green/55 underline-offset-4 hover:text-green">
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}

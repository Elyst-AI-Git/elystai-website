import { BrandButton } from "@/components/ui/brand-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist.",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center bg-surface-dark"
      style={{ padding: "var(--section-py) var(--section-px)", minHeight: "60vh" }}
    >
      {/* 404 number */}
      <p
        className="font-display font-bold leading-none"
        style={{
          fontSize: "clamp(6rem, 18vw, 14rem)",
          color: "var(--elyst-emerald)",
          opacity: 0.18,
          lineHeight: 1,
          userSelect: "none",
        }}
        aria-hidden
      >
        404
      </p>

      {/* Message */}
      <div className="relative -mt-6 text-center sm:-mt-8">
        <h1
          className="font-display font-bold text-fg-on-dark"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.2 }}
        >
          This page doesn&rsquo;t exist.
        </h1>
        <p
          className="mx-auto mt-4 max-w-sm text-fg-muted-dark"
          style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
        >
          The link might be old, mistyped, or we may have moved it.
          Everything you need is a click away.
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <BrandButton href="/" variant="metal" tone="emerald">
          Go to Home
        </BrandButton>
        <BrandButton href="/aios" variant="outline" tone="emerald">
          AIOS for Business
        </BrandButton>
      </div>
    </main>
  );
}

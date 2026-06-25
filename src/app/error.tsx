"use client";

import { useEffect } from "react";
import { BrandButton } from "@/components/ui/brand-button";

/**
 * Route-level error boundary. Catches render/runtime errors in a page subtree
 * and shows a brand-consistent fallback with a retry, instead of a blank screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for any monitoring wired up later.
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center bg-surface-dark text-center"
      style={{ padding: "var(--section-py) var(--section-px)", minHeight: "60vh" }}
    >
      <h1
        className="font-display font-bold text-fg-on-dark"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.2 }}
      >
        Something went wrong.
      </h1>
      <p
        className="mx-auto mt-4 max-w-sm text-fg-muted-dark"
        style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
      >
        A part of the page failed to load. You can try again, or head back home.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <BrandButton variant="metal" tone="emerald" onClick={() => reset()}>
          Try again
        </BrandButton>
        <BrandButton href="/" variant="outline" tone="emerald">
          Go to Home
        </BrandButton>
      </div>
    </main>
  );
}

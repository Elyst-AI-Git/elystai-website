"use client";

import { useEffect } from "react";

/**
 * Global error boundary — the last line of defence. Catches errors thrown in
 * the root layout itself (where the normal error.tsx can't render), so it must
 * ship its own <html>/<body>. Kept dependency-free and inline-styled.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          background: "#0E211A",
          color: "#F5F8F6",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", margin: 0 }}>
          Something went wrong.
        </h1>
        <p style={{ maxWidth: "28rem", opacity: 0.8, lineHeight: 1.6 }}>
          The page failed to load. Please try again.
        </p>
        <button
          onClick={() => reset()}
          style={{
            cursor: "pointer",
            border: "none",
            borderRadius: "6px",
            padding: "0.7rem 1.4rem",
            fontSize: "1rem",
            fontWeight: 600,
            background: "#00DF82",
            color: "#0E211A",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Forces a page to open at the top on an actual browser refresh (F5) — without
 * touching `history.scrollRestoration` globally, which would also disable the
 * browser's native scroll-position restore on back/forward navigation. Scoped
 * to the `navigation.type === "reload"` case via the Navigation Timing API, and
 * skipped entirely when the URL has a hash (e.g. `#enrol`) so deep links still
 * land on the right section instead of being yanked back to the top.
 */
export default function ScrollToTop() {
  useEffect(() => {
    if (window.location.hash) return;
    const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (entry?.type === "reload") {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}

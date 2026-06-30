"use client";

import { useEffect } from "react";

/**
 * Forces every page to open at the top on a fresh load / refresh. Browsers
 * default to history.scrollRestoration = "auto", which restores the previous
 * scroll position on reload — so a refresh half-way down a page leaves you
 * half-way down. Switching to "manual" and scrolling to the top on mount makes
 * a refresh always start from the top, which is what we want here.
 */
export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}

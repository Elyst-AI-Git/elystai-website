"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    if (window.location.hash) return;

    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const timer = window.setTimeout(scrollToTop, 80);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}

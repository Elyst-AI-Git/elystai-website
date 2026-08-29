"use client";

import { useEffect, useState } from "react";

/** True on devices without a hover-capable pointer. */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsTouch(window.matchMedia("(hover: none)").matches);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return isTouch;
}

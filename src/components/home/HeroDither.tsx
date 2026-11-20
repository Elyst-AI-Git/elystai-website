"use client";

import { useEffect, useState } from "react";
import MarkDither from "@/components/site/MarkDither";

/**
 * The hero has a large card for wide screens and a smaller one for phones and
 * tablets. Only the one that is visible gets a canvas; the other stays empty.
 */
export default function HeroDither({ variant }: { variant: "wide" | "narrow" }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setActive(variant === "wide" ? media.matches : !media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [variant]);

  if (!active) return null;
  return <MarkDither colorFront="#03624C" colorBack="#F5F8F6" pixelSize={variant === "narrow" ? 4 : undefined} />;
}

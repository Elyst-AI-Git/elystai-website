"use client";

import { useEffect, useState } from "react";

type Logo = { name: string; src: string; width: number; height: number; tall?: boolean } | null;

/**
 * Twelve slots in three rows (A, B, C) of four. Two rows show at a time and
 * cycle A+B, C+A. Logos are already single-tone white.
 */
const ROWS: readonly (readonly Logo[])[] = [
  [
    { name: "Arvind Fashions", src: "/brands/arvind-white.webp", width: 2000, height: 667 },
    { name: "Edex Life School", src: "/brands/edex-white.png", width: 1152, height: 392 },
    { name: "iCorp Future", src: "/brands/icorp-white.webp", width: 2000, height: 667 },
    { name: "Jizcon", src: "/brands/jizcon-white.png", width: 1452, height: 496 },
  ],
  [
    { name: "Dreamfield Football Academy", src: "/brands/dreamfield-white.png", width: 1432, height: 1344, tall: true },
    { name: "Autobahn Mahindra", src: "/brands/card/autobahn-mahindra.webp", width: 700, height: 355, tall: true },
    { name: "Kalyan Tourism and Travel", src: "/brands/kalyan-white.webp", width: 2000, height: 1751, tall: true },
    { name: "Nalakath Holdings", src: "/brands/nalakath-white.webp", width: 1409, height: 1116, tall: true },
  ],
  [
    { name: "HAL Management Academy", src: "/brands/hal-white.webp", width: 1957, height: 804 },
    { name: "De' Lead International", src: "/brands/delead-white.png", width: 988, height: 268 },
    { name: "Autobahn Trucking", src: "/brands/card/autobahn-trucking.webp", width: 700, height: 357, tall: true },
    { name: "Looco's Pizza", src: "/brands/loocos-white.png", width: 600, height: 567, tall: true },
  ],
];

// Rows B and C are never on screen together, so the two Autobahn logos
// (Mahindra in B, Trucking in C) never appear at the same time.
const FRAMES: readonly (readonly [number, number])[] = [
  [0, 1],
  [2, 0],
];

function LogoItem({ logo }: { logo: Logo }) {
  if (!logo) return <li aria-hidden />;
  return (
    <li className="flex h-20 items-center justify-center px-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt={logo.name} width={logo.width} height={logo.height} loading="lazy" decoding="async" className={`w-auto max-w-full object-contain ${logo.tall ? "max-h-[4.8rem]" : "max-h-12"}`} />
    </li>
  );
}

export default function NamesStrip() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 4160);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      aria-labelledby="names-strip-heading"
      className="bg-surface-dark"
      style={{ padding: "clamp(51px, 6.4vw, 83px) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="names-strip-heading"
          className="text-center font-display font-bold uppercase text-white/60"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
        >
          Teams we have worked with
        </h2>
        <div className="mt-10 grid gap-y-5">
          {[0, 1].map((slot) => (
            <div key={slot} className="relative h-20">
              {ROWS.map((row, rowIndex) => {
                const visible = FRAMES[frame][slot] === rowIndex;
                return (
                  <ul
                    key={rowIndex}
                    aria-hidden={!visible}
                    className="absolute inset-0 grid grid-cols-4 items-center gap-x-3 transition-opacity duration-700"
                    style={{ opacity: visible ? 1 : 0 }}
                  >
                    {row.map((logo, i) => (
                      <LogoItem key={i} logo={logo} />
                    ))}
                  </ul>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

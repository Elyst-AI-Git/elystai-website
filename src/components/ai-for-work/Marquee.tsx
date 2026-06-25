"use client";

/**
 * Announcement marquee — a narrow horizontal strip between the hero and the
 * Pain section. A single phrase scrolls right-to-left in a seamless loop, set
 * in bright brand green with dark ink text so it reads as a live "enrolment is
 * open" banner. Two identical tracks sit side by side and the pair is
 * translated by exactly -50%, so the loop has no visible seam.
 */

function Track() {
  // aria-hidden on the duplicate; the first copy carries the readable text.
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-display font-bold uppercase"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", letterSpacing: "-0.01em", color: "#ffffff" }}
          >
            AI for Work — <span style={{ color: "var(--elyst-green)" }}>open now</span> — starts July 13th
          </span>
          <span aria-hidden className="mx-7 text-[1.1em] opacity-60" style={{ color: "var(--elyst-green)" }}>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "#06140e",
        paddingTop: "clamp(13px, 2vw, 22px)",
        paddingBottom: "clamp(13px, 2vw, 22px)",
      }}
    >
      <style>{`
        @keyframes afw-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .afw-marquee-track { animation: afw-marquee 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .afw-marquee-track { animation: none; } }
      `}</style>
      <div className="afw-marquee-track flex w-max flex-nowrap whitespace-nowrap">
        <Track />
        <Track />
      </div>
    </div>
  );
}

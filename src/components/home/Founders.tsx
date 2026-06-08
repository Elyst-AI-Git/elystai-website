"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import DitherShader from "@/components/ui/dither-shader";

const founders = [
  {
    name: "Nihal Anas",
    photo: "/images/founders/nihal.jpg",
    role: "Chief AI Officer · AIOS",
    bio: "Builds and deploys AIOS for SMEs across India and the GCC.",
    linkedin: "#",
    cta: "Work with Nihal",
    href: "/aios",
  },
  {
    name: "Fathima Shirin P",
    photo: "/images/founders/shirin.jpg",
    role: "CEO · AI Accelerator",
    bio: "Leads live AI learning programs for professionals and students.",
    linkedin: "#",
    cta: "Learn with Shirin",
    href: "/learn",
  },
];

const REVEAL_RADIUS = 110;

function FounderCard({ f }: { f: (typeof founders)[number] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  // Radial mask: real photo only visible inside the cursor circle.
  const mask = pos
    ? `radial-gradient(circle ${REVEAL_RADIUS}px at ${pos.x}px ${pos.y}px, #000 0%, #000 55%, transparent 78%)`
    : undefined;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[28px] bg-bg shadow-card ring-1 ring-black/5">
      {/* Portrait — dithered base, real photo revealed under the cursor */}
      <div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setPos(null)}
        className="relative aspect-[4/3] w-full overflow-hidden"
      >
        {/* Dithered base — always visible */}
        <div className="absolute inset-0">
          <DitherShader
            src={f.photo}
            ditherMode="bayer"
            colorMode="duotone"
            primaryColor="#03624C"
            secondaryColor="#F5F8F6"
            gridSize={5}
            brightness={0.05}
            contrast={1.15}
            objectFit="cover"
            className="h-full w-full"
          />
        </div>
        {/* Real photo revealed dynamically under the pointer (desktop only) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.photo}
          alt={f.name}
          className="absolute inset-0 hidden h-full w-full object-cover object-top transition-opacity duration-200 md:block"
          style={{
            opacity: pos ? 1 : 0,
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        />
        {/* Mobile: show the real photo plainly (no hover available) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.photo}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-top md:hidden"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col justify-center gap-2 p-8">
        <h3 className="text-fg" style={{ fontSize: "var(--text-h3)" }}>
          {f.name}
        </h3>
        <p className="text-small font-semibold text-emerald">{f.role}</p>
        <p className="mt-1 max-w-sm text-small leading-relaxed text-fg-2">
          {f.bio}
        </p>
        <div className="mt-6 flex items-center gap-5">
          <a
            href={f.linkedin}
            className="text-small text-fg-3 underline-offset-4 hover:text-emerald hover:underline"
          >
            LinkedIn
          </a>
          <Link
            href={f.href}
            className="inline-flex items-center gap-1.5 text-small font-bold text-emerald"
          >
            {f.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Founders() {
  return (
    <section
      className="bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">The founders</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Built by Kerala&apos;s first AI graduates.
          </h2>
          <p
            className="mx-auto mt-4 max-w-prose text-fg-2"
            style={{ fontSize: "var(--text-body)" }}
          >
            Two people from Kozhikode building for India and the GCC — both
            arms of Elyst grow from the same foundation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <FounderCard key={f.name} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

function FounderCard({ f }: { f: (typeof founders)[number] }) {
  return (
    <div className="group flex overflow-hidden rounded-[28px] bg-bg shadow-card ring-1 ring-black/5">
      {/* Left: dithered portrait at rest → real photo on hover */}
      <div className="relative h-auto w-64 flex-shrink-0 md:w-80">
        {/* Dithered at rest */}
        <div className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0">
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
        {/* Real photo on hover */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.photo}
          alt={f.name}
          className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 max-md:opacity-100"
        />
      </div>

      {/* Right: text content */}
      <div className="flex flex-1 flex-col justify-center gap-2 p-8 md:p-10">
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
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
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

        <div className="mt-12 flex flex-col gap-6">
          {founders.map((f) => (
            <FounderCard key={f.name} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

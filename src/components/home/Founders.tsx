"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { SectionMark } from "@/components/ui/section-mark";
import type { CSSProperties, SVGProps } from "react";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.74V1.74C24 .78 23.19 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.12-1.38c.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.12A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

/** Name — white site-bg chip so it pops over both the photo and the hover fill */
const nameChipStyle: CSSProperties = {
  display: "inline-block",
  backgroundColor: "var(--bg)",
  color: "var(--fg)",
  padding: "0.08em 0.45em",
  fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
  lineHeight: 1.2,
  fontWeight: 700,
};

/** Role/designation — matching white chip */
const roleChipStyle: CSSProperties = {
  display: "inline-block",
  backgroundColor: "var(--bg)",
  color: "var(--fg-2)",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  lineHeight: 1.45,
  padding: "0.22em 0.5em",
};

/** Dark-green metal social button */
const socialStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, hsl(160 38% 14%) 0%, hsl(160 38% 8%) 55%, hsl(160 38% 11%) 100%)",
  borderTop: "1px solid rgba(255,255,255,0.12)",
  borderBottom: "1px solid rgba(0,0,0,0.38)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.26)",
};

type Founder = {
  name: string;
  photo: string;
  role: string;
  title: string;
  linkedin: string;
  instagram: string;
  href: string;
  side: "left" | "right";
  fill: string;
};

const founders: Founder[] = [
  {
    name: "Fathima Shirin P",
    photo: "/images/founders/shirin.svg",
    role: "Co-founder",
    title: "CEO",
    linkedin: "https://www.linkedin.com/in/fathimashirin-p/",
    instagram: "https://www.instagram.com/fathimashirin.ai/",
    href: "/learn",
    side: "left",
    fill: "var(--elyst-green)",
  },
  {
    name: "Nihal Anas",
    photo: "/images/founders/nihal.svg",
    role: "Co-founder",
    title: "Chief AI Officer",
    linkedin: "#",
    instagram: "#",
    href: "/aios",
    side: "right",
    fill: "var(--elyst-emerald)",
  },
];

function FounderCard({
  founder,
  hovered,
  dim,
  onHover,
}: {
  founder: Founder;
  hovered: boolean;
  dim: boolean;
  onHover: (v: boolean) => void;
}) {
  const isLeft = founder.side === "left";

  return (
    <motion.div
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      initial={false}
      animate={{ backgroundColor: hovered ? founder.fill : "var(--bg)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden"
      style={{ opacity: dim ? 0.6 : 1, minHeight: "68vh" }}
    >
      {/* Full-card link sits below text (z-[1]) */}
      <Link
        href={founder.href}
        className="absolute inset-0 z-[1]"
        aria-label={`Learn more about ${founder.name}`}
      />

      {/* Photo — contain + bottom-aligned so full figure rises from the bottom */}
      <Image
        src={founder.photo}
        alt={founder.name}
        fill
        className="object-contain object-bottom"
        sizes="(min-width: 768px) 50vw, 100vw"
        priority
      />

      {/* Bottom overlay — name chip + socials on content side, role chip on outer edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between p-8 md:p-10"
      >
        {isLeft ? (
          <>
            {/* Outer left edge: role chip */}
            <div className="flex flex-col items-start gap-1">
              <span style={roleChipStyle}>{founder.role}</span>
              <span style={roleChipStyle}>{founder.title}</span>
            </div>

            {/* Inner right: name right-aligned + social icons */}
            <div className="pointer-events-auto flex flex-col items-end gap-3">
              <h3
                className="font-display text-right"
                style={nameChipStyle}
              >
                {founder.name}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={founder.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${founder.name} on Instagram`}
                  className="flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 hover:scale-110"
                  style={socialStyle}
                  onClick={(e) => e.stopPropagation()}
                >
                  <InstagramIcon className="h-4 w-4" style={{ color: "rgba(255,255,255,0.92)" }} />
                </a>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${founder.name} on LinkedIn`}
                  className="flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 hover:scale-110"
                  style={socialStyle}
                  onClick={(e) => e.stopPropagation()}
                >
                  <LinkedinIcon className="h-4 w-4" style={{ color: "rgba(255,255,255,0.92)" }} />
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Inner left: name left-aligned + social icons */}
            <div className="pointer-events-auto flex flex-col items-start gap-3">
              <h3
                className="font-display text-left"
                style={nameChipStyle}
              >
                {founder.name}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={founder.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${founder.name} on Instagram`}
                  className="flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 hover:scale-110"
                  style={socialStyle}
                  onClick={(e) => e.stopPropagation()}
                >
                  <InstagramIcon className="h-4 w-4" style={{ color: "rgba(255,255,255,0.92)" }} />
                </a>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${founder.name} on LinkedIn`}
                  className="flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 hover:scale-110"
                  style={socialStyle}
                  onClick={(e) => e.stopPropagation()}
                >
                  <LinkedinIcon className="h-4 w-4" style={{ color: "rgba(255,255,255,0.92)" }} />
                </a>
              </div>
            </div>

            {/* Outer right edge: role chip */}
            <div className="flex flex-col items-end gap-1">
              <span style={{ ...roleChipStyle, textAlign: "right" }}>{founder.role}</span>
              <span style={{ ...roleChipStyle, textAlign: "right" }}>{founder.title}</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Founders() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-bg">
      {/* Section heading */}
      <div
        className="mx-auto max-w-5xl text-center"
        style={{
          paddingTop: "clamp(40px, 5vw, 72px)",
          paddingBottom: "clamp(28px, 3.5vw, 48px)",
          paddingLeft: "var(--section-px)",
          paddingRight: "var(--section-px)",
        }}
      >
        <SectionMark>Who&apos;s behind it</SectionMark>
        <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
          We build AI systems for businesses
          <br />
          and teach what we learn doing it.
        </h2>
      </div>

      {/* Founder cards — no top border, no divider between panels */}
      <div className="grid md:grid-cols-2">
        {founders.map((f, i) => (
          <FounderCard
            key={f.href}
            founder={f}
            hovered={hovered === i}
            dim={hovered !== null && hovered !== i}
            onHover={(v) => setHovered(v ? i : null)}
          />
        ))}
      </div>
    </section>
  );
}

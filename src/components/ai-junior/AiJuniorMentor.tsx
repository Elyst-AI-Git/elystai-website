"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { SVGProps } from "react";

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

const credentials = [
  "30+ sessions delivered",
  "2,000+ Students Trained in AI",
  "Co-founder of Elyst AI",
];

export default function AiJuniorMentor() {
  return (
    <section className="overflow-hidden bg-surface-muted" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "var(--green-tint-15)" }}
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
            <Image
              src="/images/ai-junior/mentor.jpeg"
              alt="Fathima Shirin P, Co-Founder, Elyst AI"
              fill
              sizes="(min-width: 768px) 35vw, 80vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <span className="chip">Expert Guidance</span>
          <h2 className="mt-6 font-display font-bold leading-tight text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Learn from Someone Who&rsquo;s Built It
          </h2>
          <p className="mt-5 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.7 }}>
            &ldquo;Shirin is one of Kerala&rsquo;s first BTech AI graduates, and she&rsquo;s
            been teaching it ever since. Her superpower? Making AI feel like
            something your child can actually do, not just read about.&rdquo;
          </p>

          <div className="mt-7">
            <p className="font-display font-bold text-fg" style={{ fontSize: "1.1rem" }}>Fathima Shirin P</p>
            <p className="text-fg-2" style={{ fontSize: "var(--text-small)" }}>Co-Founder, Elyst AI</p>
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {credentials.map((c) => (
              <li key={c} className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 shrink-0" style={{ color: "var(--elyst-emerald)" }} />
                <span className="text-fg-2" style={{ fontSize: "var(--text-small)" }}>{c}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3">
            {/* Instagram first */}
            <a
              href="https://www.instagram.com/fathimashirin.ai/"
              target="_blank"
              rel="noreferrer"
              aria-label="Fathima Shirin on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-md transition-all duration-200 hover:scale-105 hover:brightness-125"
              style={{
                background: "linear-gradient(180deg, hsl(160 38% 12%) 0%, hsl(160 38% 8%) 55%, hsl(160 38% 11%) 100%)",
                borderTop: "1px solid rgba(255,255,255,0.09)",
                borderBottom: "1px solid rgba(0,0,0,0.35)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <InstagramIcon className="h-5 w-5" style={{ color: "rgba(255,255,255,0.92)" }} />
            </a>
            {/* LinkedIn second */}
            <a
              href="https://www.linkedin.com/in/fathimashirin-p/"
              target="_blank"
              rel="noreferrer"
              aria-label="Fathima Shirin on LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-md transition-all duration-200 hover:scale-105 hover:brightness-125"
              style={{
                background: "linear-gradient(180deg, hsl(160 38% 12%) 0%, hsl(160 38% 8%) 55%, hsl(160 38% 11%) 100%)",
                borderTop: "1px solid rgba(255,255,255,0.09)",
                borderBottom: "1px solid rgba(0,0,0,0.35)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <LinkedinIcon className="h-5 w-5" style={{ color: "rgba(255,255,255,0.92)" }} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

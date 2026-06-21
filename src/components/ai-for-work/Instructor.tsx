"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";

/**
 * Instructor — trust section for Shirin (Fathima Shirin P), Founder of Elyst AI.
 * Reuses her brand photo from the home page. The photo sits like a sticker:
 * white-bordered, slightly rotated and scaled past its tinted frame, so it pops
 * off the surface. Three credibility stats sit alongside the bio.
 */

const stats = [
  { value: "6+", label: "years in AI" },
  { value: "50+", label: "sessions taught" },
  { value: "2,000+", label: "people taught" },
];

export default function Instructor() {
  return (
    <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto grid max-w-4xl items-center gap-14 md:grid-cols-[300px_1fr] md:gap-16">
        {/* Photo — framed mat with the sticker-style portrait popping out of it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mx-auto w-56 md:w-full"
        >
          {/* Tinted frame / mat — the card the photo rests on */}
          <div
            className="aspect-square rounded-[28px]"
            style={{
              background: "linear-gradient(160deg, rgba(0,223,130,0.22), rgba(3,98,76,0.30))",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
          {/* Sticker photo — tilted, white-bordered, and anchored to the card's
              bottom while rising well above its top edge so it pops out above
              the card rather than sitting inside it. */}
          <div
            className="absolute -top-16 right-1 bottom-3 left-1 overflow-hidden rounded-[22px] border-[6px] border-white shadow-2xl"
            style={{ transform: "rotate(-4deg)" }}
          >
            <Image
              src="/images/founders/shirin.webp"
              alt="Fathima Shirin P, Founder of Elyst AI"
              fill
              sizes="(max-width: 768px) 224px, 300px"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Copy + credibility stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionMark tone="dark">Your instructor</SectionMark>
          <h2 className="mt-6 text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            Taught by Shirin.
          </h2>
          <p className="mt-4 text-fg-on-dark/80" style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}>
            Fathima Shirin P is an AI educator and founder of Elyst AI. She helps
            professionals, founders and educators turn AI into a real, everyday
            advantage through hands-on live sessions, practical use cases, and
            simple, jargon-free teaching. Having guided thousands of
            non-technical learners, she equips everyday people to confidently
            use, build with, and lead alongside AI.
          </p>

          {/* Credibility stats */}
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 px-4 py-5 text-center"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <dt className="font-display font-bold text-[var(--elyst-green)]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", lineHeight: 1 }}>
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-fg-on-dark/70" style={{ fontSize: "0.85rem", lineHeight: 1.3 }}>
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

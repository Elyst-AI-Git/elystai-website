"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";

/**
 * Instructor — trust section for Shirin (Fathima Shirin P), Founder of Elyst AI.
 *
 * TODO(launch): drop the real headshot into /public/images/ai-for-work/ and set
 * INSTRUCTOR_PHOTO below; add 1–2 lines of background/credentials to `extra`.
 */

const INSTRUCTOR_PHOTO = ""; // TODO(launch): e.g. "/images/ai-for-work/shirin.jpg"

export default function Instructor() {
  return (
    <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[260px_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mx-auto aspect-square w-56 overflow-hidden rounded-[24px] md:w-full"
          style={{
            background:
              "linear-gradient(160deg, rgba(0,223,130,0.18), rgba(3,98,76,0.25))",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {INSTRUCTOR_PHOTO ? (
            <Image
              src={INSTRUCTOR_PHOTO}
              alt="Fathima Shirin P, Founder of Elyst AI"
              fill
              sizes="(max-width: 768px) 224px, 260px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-fg-on-dark/40">
              <span style={{ fontSize: "var(--text-small)" }}>Photo coming soon</span>
            </div>
          )}
        </motion.div>

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
            Fathima Shirin P, Founder of Elyst AI, teaches AI to non-technical
            professionals and founders in plain, practical language — no jargon,
            just things you can use the same day.
          </p>
          {/* TODO(launch): 1–2 lines on background / credentials. */}
        </motion.div>
      </div>
    </section>
  );
}

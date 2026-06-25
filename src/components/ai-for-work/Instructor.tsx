"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";

/**
 * Instructor — trust section for Shirin (Fathima Shirin P), Founder of Elyst AI.
 * Sits on the same light-green halftone texture as the Accelerator hero. The
 * photo rests on a square card with no border, anchored so its bottom edge
 * lines up with the card's bottom — Shirin's head rises above the card's top
 * edge rather than being contained inside it.
 */

const stats = [
  { value: "6+", label: "years in AI" },
  { value: "50+", label: "sessions taught" },
  { value: "2,000+", label: "people taught" },
];

export default function Instructor() {
  return (
    <section
      style={{
        padding: "var(--section-py) var(--section-px)",
        background: "var(--bg) url('/ai-for-work/instructor-bg.jpg') center / cover no-repeat",
      }}
    >
      <div className="mx-auto grid max-w-4xl items-center gap-14 md:grid-cols-[300px_1fr] md:gap-16">
        {/* Photo — square mat with the portrait anchored to its bottom edge,
            rising above the top edge rather than being framed inside it. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative order-2 mx-auto w-56 md:order-1 md:w-full"
        >
          {/* Mat — the square card the photo rests on */}
          <div
            className="aspect-square rounded-[28px]"
            style={{
              background: "linear-gradient(160deg, rgba(3,98,76,0.16), rgba(0,223,130,0.22))",
              border: "1px solid rgba(3,98,76,0.14)",
            }}
          />
          {/* Photo — bottom flush with the mat's bottom edge, head rising
              above the mat's top edge. No border. */}
          <div className="absolute -top-14 right-0 bottom-0 left-0 overflow-hidden rounded-[24px]">
            <Image
              src="/images/founders/shirin-v2.webp"
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
          className="order-1 md:order-2"
        >
          <SectionMark>Your instructor</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Taught by Shirin.
          </h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "calc(var(--text-body) + 2px)", lineHeight: 1.65 }}>
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
                className="rounded-2xl border-[3px] px-4 py-5 text-center"
                style={{ background: "rgba(255,255,255,0.7)", borderColor: "var(--elyst-emerald)" }}
              >
                <dt className="font-display font-bold text-emerald" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", lineHeight: 1 }}>
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-fg-2" style={{ fontSize: "calc(0.85rem + 2px)", lineHeight: 1.3 }}>
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

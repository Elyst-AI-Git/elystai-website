"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Shield, ShieldHalf, Zap } from "lucide-react";

const points = [
  {
    Icon: Zap,
    title: "No Coding Required",
    desc: "We focus on Prompt Engineering — teaching kids to communicate with AI using plain language. Zero syntax, all creativity.",
  },
  {
    Icon: ShieldHalf,
    title: "90 Mins a Day, Real Results",
    desc: "Five focused live sessions that go from “what is AI?” to actually building something. No overwhelm, just momentum.",
  },
  {
    Icon: Shield,
    title: "Built for Their Age",
    desc: "Every session is designed for grades 5–10 — simple enough to follow, challenging enough to excite.",
  },
];

export default function AiJuniorCurriculum() {
  return (
    <section id="curriculum" className="overflow-hidden bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative order-2 md:order-1"
        >
          <div
            className="pointer-events-none absolute -top-12 -left-12 h-64 w-64 rounded-full blur-3xl"
            style={{ background: "var(--green-tint-15)" }}
          />
          <div className="relative aspect-square overflow-hidden rounded-xl shadow-2xl" style={{ background: "var(--green-tint-15)" }}>
            <Image
              src="/images/ai-junior/junior-happy.png"
              alt="Students learning with AI"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 max-w-60 rounded-xl border border-border bg-white p-6 shadow-2xl">
            <div className="mb-2 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ background: "var(--elyst-emerald-light)" }} />
              <span className="font-bold uppercase tracking-wider text-fg-2" style={{ fontSize: "0.7rem" }}>
                Student Feedback
              </span>
            </div>
            <p className="font-display font-bold leading-tight text-fg" style={{ fontSize: "1.1rem" }}>
              &ldquo;I made my own website using AI!&rdquo;
            </p>
            <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-small)" }}>
              Rahil Farzad <br /> Grade 6
            </p>
          </div>
        </motion.div>

        {/* Copy + features */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="order-1 md:order-2"
        >
          <h2 className="font-display mb-8 font-bold leading-tight text-fg" style={{ fontSize: "var(--text-h2)" }}>
            AI will be their <span style={{ color: "var(--elyst-emerald)" }}>newest superpower.</span>
          </h2>
          <div className="flex flex-col gap-7">
            {points.map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald">
                  <Icon className="h-5 w-5 text-fg-on-dark" />
                </span>
                <div>
                  <h4 className="font-display mb-1.5 font-bold text-fg" style={{ fontSize: "1.15rem" }}>{title}</h4>
                  <p className="text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center md:justify-start">
            <a
              href="/AI-for-juniors-curriculum.pdf"
              download="AI for juniors - Elyst AI.pdf"
              className="inline-flex items-center gap-2 rounded-full px-9 py-4 font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ background: "var(--elyst-green)", color: "var(--elyst-emerald)", fontSize: "1.05rem" }}
            >
              <Download className="h-4 w-4" />
              Curriculum
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

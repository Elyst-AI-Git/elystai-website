"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";
import { IconTile } from "@/components/ui/icons";

export default function AiJuniorHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--elyst-emerald) 0%, var(--elyst-emerald-light) 100%)",
        padding: "clamp(64px, 9vw, 120px) var(--section-px)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-7"
        >
          {/* Eyebrow matching the rest of the site, dark tone on dark bg */}
          <SectionMark tone="dark">Next-Gen AI Learning</SectionMark>

          <h1 className="font-display font-bold leading-tight text-fg-on-dark" style={{ fontSize: "var(--text-h1)" }}>
            Your Child Will Build with AI in <span className="text-green">Just 5 Days</span>
          </h1>

          <p className="max-w-lg text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.7 }}>
            Not just watching AI, your child will learn what AI is, how to
            talk to it, and build something real with it.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Closed, non-clickable */}
            <span
              className="inline-flex cursor-not-allowed items-center justify-center rounded-md px-7 py-3.5 font-bold"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.55)",
                fontSize: "var(--text-body)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Closed for now
            </span>
            {/* 2000+ badge, navbar corner radius */}
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "var(--radius-md, 10px)",
              }}
            >
              <span className="font-display font-bold text-green" style={{ fontSize: "1.1rem", lineHeight: 1 }}>2000+</span>
              <span className="font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-small)" }}>Students Trained</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <div className="rotate-3 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(6px)" }}>
            <Image
              src="/images/ai-junior/ai-for-juniors-poster.png"
              alt="Students building with AI"
              width={640}
              height={480}
              className="w-full rounded-lg object-cover shadow-2xl"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 -rotate-3 rounded-lg bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <IconTile tone="darkgreen" size={44}>
                <Rocket className="h-5 w-5" />
              </IconTile>
              <span className="font-display font-bold text-fg" style={{ fontSize: "var(--text-small)" }}>
                5 Live Sessions
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

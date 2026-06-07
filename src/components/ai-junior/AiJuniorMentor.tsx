"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AtSign, BadgeCheck, Link as LinkIcon } from "lucide-react";

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
              alt="Fathima Shirin P — Co-Founder, Elyst AI"
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
            &ldquo;Shirin is one of Kerala&rsquo;s first BTech AI graduates — and she&rsquo;s
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
            <a
              href="https://www.instagram.com/fathimashirin.ai/"
              target="_blank"
              rel="noreferrer"
              aria-label="Fathima Shirin on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald transition-transform hover:scale-105"
            >
              <AtSign className="h-5 w-5 text-fg-on-dark" />
            </a>
            <a
              href="https://www.linkedin.com/in/fathimashirin-p/"
              target="_blank"
              rel="noreferrer"
              aria-label="Fathima Shirin on LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald transition-transform hover:scale-105"
            >
              <LinkIcon className="h-5 w-5 text-fg-on-dark" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

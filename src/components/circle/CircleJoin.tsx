"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Apply",
    desc: "Fill out a short application. Two minutes, no long forms, no essays. Just enough for us to know who you are and what you are working on.",
  },
  {
    num: "02",
    title: "Review",
    desc: "We go through every application personally. Within 24 hours you will hear back, not an automated email, a real response.",
  },
  {
    num: "03",
    title: "Welcome",
    desc: "Once you are in, you get a personal invite into the Circle. From that point, everything inside is yours.",
  },
];

export default function CircleJoin() {
  return (
    <section id="join" className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow" style={{ color: "var(--elyst-emerald)" }}>How it works</span>
          <h2 className="mt-4 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
            Three simple steps.
          </h2>
          <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            No long waitlists. No complex onboarding. The whole thing is
            designed to be quick.
          </p>
        </motion.div>

        <div className="relative mt-14 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {/* Connector line on desktop */}
          <div
            className="absolute top-9 right-[calc(33.3%-12px)] left-[calc(33.3%-12px)] hidden h-0.5 rounded-full sm:block"
            style={{ background: "linear-gradient(to right, var(--elyst-green-mid), var(--elyst-emerald-light), var(--elyst-emerald))" }}
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="card relative z-10 flex flex-col items-center p-7 text-center"
            >
              <span
                className="font-display mb-5 flex h-16 w-16 items-center justify-center rounded-full font-extrabold text-fg-on-dark"
                style={{
                  background: "var(--elyst-emerald)",
                  fontSize: "1.3rem",
                  border: "4px solid var(--surface-muted)",
                  boxShadow: "0 0 0 2px var(--elyst-emerald)",
                }}
              >
                {s.num}
              </span>
              <h3 className="font-display font-bold text-fg" style={{ fontSize: "1.1rem" }}>
                {s.title}
              </h3>
              <p className="mt-2.5 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.7 }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

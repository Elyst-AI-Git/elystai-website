"use client";

import { motion } from "framer-motion";

const features = [
  { title: "Weekly AI Signal", desc: "AI updates that matter to your work — filtered, not trending." },
  { title: "Monthly Catchup", desc: "Honest conversations about what's changing in AI." },
  { title: "The Network", desc: "People building with AI — sharing real insights, not noise." },
  { title: "The Content Library", desc: "Step-by-step workflows, not surface-level guides." },
  { title: "Member-Only Events", desc: "Private sessions only for Circle members." },
  { title: "Deals in AI", desc: "Curated discounts on tools actually worth using." },
];

export default function CircleAbout() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-start">
        {/* Left — explanation, sticky on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:sticky md:top-28"
        >
          <span className="chip">What you join</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
            What you&rsquo;re actually joining
          </h2>
          <p className="mt-5 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.8 }}>
            Elyst AI Circle is a private, paid WhatsApp Circle for
            professionals who are done watching AI from the sidelines.
          </p>
          <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.8 }}>
            Every week, you see what is actually being built, what is being
            implemented, and what is working — alongside others doing the
            same.
          </p>
          <p className="mt-4 font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.8 }}>
            Small by design. Built for people who act.
          </p>
        </motion.div>

        {/* Right — 2×3 feature grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="card-tint p-5"
            >
              <h3 className="font-display font-bold text-fg" style={{ fontSize: "0.98rem", lineHeight: 1.3 }}>
                {f.title}
              </h3>
              <p className="mt-1.5 text-fg-2" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

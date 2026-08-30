"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";

const cards = [
  {
    label: "Professionals",
    checks: [
      "You've tried tools, but nothing has really stuck",
      "You want to know what's actually worth your time",
      "You want to be around people who are ahead, not guessing",
    ],
    dark: false,
  },
  {
    label: "Founders",
    checks: [
      "You don't want more tools, you want clarity on where to start",
      "Every week you delay, someone else moves ahead",
      "You want to be around people actually building, not just talking",
    ],
    dark: true,
  },
];

export default function CircleForWho() {
  return (
    <section style={{ padding: "var(--section-py) var(--section-px)", background: "#c2edcb" }}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionMark>Who it&rsquo;s for</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
            Who this is for
          </h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.8 }}>
            If you work on a computer, use AI occasionally but feel like you
            are lagging behind in AI, this circle is for you.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className={c.dark ? "rounded-md bg-emerald p-8" : "rounded-md bg-white p-8 shadow-card"}
              style={c.dark ? { boxShadow: "0 12px 40px rgba(3,98,76,0.25)" } : undefined}
            >
              <h3
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 1.95rem)",
                  letterSpacing: "-0.0072171em",
                  color: c.dark ? "var(--elyst-green)" : "var(--fg)",
                }}
              >
                {c.label}
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {c.checks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: c.dark ? "var(--elyst-green)" : "var(--elyst-emerald)" }}
                    />
                    <span
                      style={{
                        fontSize: "var(--text-small)",
                        lineHeight: 1.7,
                        color: c.dark ? "var(--fg-on-dark)" : "var(--fg-2)",
                        opacity: c.dark ? 0.9 : 1,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-10 text-center"
        >
          <p className="text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.65, fontWeight: 500 }}>
            If either of those sounds like you,{" "}
            <strong className="font-bold text-fg">apply now.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Languages, Radio, Users2, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

/**
 * Why learn with Elyst — the differentiator. Four warm value blocks, all
 * framed in the brand's gradient-edge card, closing on the agency-proof card:
 * what AIOS (our Services arm) builds and experiments with daily, distilled
 * into what's actually useful to know in this AI era. Replaces the prior
 * founder-story block — same credibility, sharper and more concrete.
 */

const reasons = [
  {
    Icon: Languages,
    title: "Bilingual & local",
    line: "Taught in Malayalam + English, built for Indian and GCC professionals — not a generic Western course.",
  },
  {
    Icon: Radio,
    title: "Live, not recorded",
    line: "Real sessions with real interaction — not a dumped video library you never finish.",
  },
  {
    Icon: Users2,
    title: "Community-backed",
    line: "Learning doesn't stop when the session ends — the Circle keeps you sharp between them.",
  },
];

export default function AccelWhy() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip" style={{ background: "var(--green-tint-15)" }}>
            Why Elyst
          </span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Learn AI from people who actually build it.
          </h2>
        </div>

        {/* Three value blocks + the agency-proof card, all gradient-framed */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {reasons.map(({ Icon, title, line }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
            >
              <Card
                variant="gradient"
                className="h-full p-7"
                style={{
                  borderRadius: "var(--radius-card, 20px)",
                  background: "var(--card)",
                  border: "1px solid var(--green-tint-15)",
                }}
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "var(--green-tint-15)" }}
                >
                  <Icon className="h-5 w-5 text-emerald" />
                </span>
                <h3 className="mt-5 text-fg" style={{ fontSize: "var(--text-h3)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-fg-2">{line}</p>
              </Card>
            </motion.div>
          ))}

          {/* Agency-proof card — replaces the prior founder-story block.
              What AIOS (our Services arm) builds and experiments with daily,
              distilled into what's actually useful for you to know right now. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: reasons.length * 0.08, ease: "easeOut" }}
          >
            <Card
              variant="gradient"
              className="h-full p-7"
              style={{
                borderRadius: "var(--radius-card, 20px)",
                background:
                  "linear-gradient(135deg, var(--green-tint-15), var(--emerald-tint-10))",
                border: "1px solid var(--green-tint-15)",
              }}
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "var(--green-tint-15)" }}
              >
                <FlaskConical className="h-5 w-5 text-emerald" />
              </span>
              <h3 className="mt-5 text-fg" style={{ fontSize: "var(--text-h3)" }}>
                Built on what we ship
              </h3>
              <p className="mt-2 text-small leading-relaxed text-fg-2">
                AIOS — our agency arm — builds and ships production AI for
                businesses every day. What we learn, test, and experiment with
                there doesn&rsquo;t stay there: it gets distilled straight into
                what you actually need to know to stay sharp in this AI era.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

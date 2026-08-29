"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrackedExternalLink } from "@/components/marketing/TrackedCta";
import { useIsTouch } from "@/lib/use-touch";

function CtaPanel({ hovered, onHover }: { hovered: boolean; onHover: (value: boolean) => void }) {
  const isTouch = useIsTouch();
  const text = !isTouch && hovered ? "var(--fg-on-dark)" : "var(--fg)";
  const linkClassName = "flex min-h-[30vh] flex-col justify-between p-8 max-md:min-h-[22vh] md:p-12";
  const body = (
    <>
      <h3 className="font-display font-bold leading-[1.05]" style={{ fontSize: "var(--text-h1)", color: text }}>
        Book an audit call
      </h3>
      <p style={{ color: text, fontSize: "clamp(1.2rem, 1.7vw, 1.45rem)", lineHeight: 1.4 }}>
        Bring the task that takes too long. We will tell you if AI is the answer.
      </p>
    </>
  );

  if (isTouch) {
    return (
      <div className="relative" style={{ background: "var(--bg)" }}>
        <TrackedExternalLink intent="audit" className={linkClassName}>{body}</TrackedExternalLink>
      </div>
    );
  }

  return (
    <motion.div
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      initial={false}
      animate={{ backgroundColor: hovered ? "var(--elyst-emerald)" : "var(--bg)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative"
    >
      <TrackedExternalLink intent="audit" className={linkClassName}>{body}</TrackedExternalLink>
    </motion.div>
  );
}

export default function FinalCta() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-6xl px-[var(--section-px)] pt-[var(--section-py)] text-center">
        <h2 className="text-fg" style={{ fontSize: "var(--text-h2)" }}>Start with one workflow.</h2>
      </div>
      <div className="mt-12 border-y border-border">
        <CtaPanel hovered={hovered} onHover={setHovered} />
      </div>
    </section>
  );
}

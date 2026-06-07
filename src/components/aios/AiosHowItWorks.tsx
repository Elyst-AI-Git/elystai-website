"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, FolderOpen, MessageCircle, Sparkles } from "lucide-react";

type Step = {
  marker: string;
  label: string;
  sub: string;
};

const steps: Step[] = [
  {
    marker: "1 · Message",
    label: "Message it like a colleague.",
    sub: "In the WhatsApp or Telegram your team already uses.",
  },
  {
    marker: "2 · Understands",
    label: "It understands your business.",
    sub: "Reads your own documents, data, and tools — not the open internet.",
  },
  {
    marker: "3 · Acts",
    label: "It answers, or does the work.",
    sub: "The answer, or the finished document — straight to the right person.",
  },
];

/** Step 1 — the incoming message, a single bubble. */
function StepOnePanel() {
  return (
    <div className="flex h-full flex-col items-start justify-center gap-3 p-8">
      <span className="eyebrow text-fg-3">In WhatsApp</span>
      <div
        className="max-w-[80%] px-4 py-3 text-fg shadow-sm"
        style={{
          background: "#ffffff",
          borderRadius: "14px 14px 14px 4px",
          fontSize: "var(--text-small)",
          border: "1px solid var(--border)",
        }}
      >
        <MessageCircle className="mb-2 h-4 w-4 text-fg-3" />
        “Make the June invoice for Al Noor Trading.”
      </div>
      <p className="text-fg-3" style={{ fontSize: "0.78rem" }}>
        Plain language. No commands, no training.
      </p>
    </div>
  );
}

/** Step 2 — AIOS reading the company's own sources, lighting up as context. */
function StepTwoPanel() {
  const sources = ["Invoices · Drive", "Client list · Sheets", "Templates · Docs"];
  return (
    <div className="flex h-full flex-col items-start justify-center gap-4 p-8">
      <span className="eyebrow text-fg-3">Drawing on your business</span>
      <div className="flex flex-col gap-2.5">
        {sources.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0.35 }}
            animate={{ opacity: [0.35, 1, 0.7] }}
            transition={{ duration: 1.1, delay: i * 0.18, ease: "easeInOut" }}
            className="flex items-center gap-2.5 px-3.5 py-2"
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              fontSize: "0.82rem",
              color: "var(--fg-2)",
            }}
          >
            <FolderOpen className="h-4 w-4 text-emerald" />
            {s}
          </motion.div>
        ))}
      </div>
      <p className="text-fg-3" style={{ fontSize: "0.78rem" }}>
        It checks what&rsquo;s actually true for Al Noor Trading — not a guess.
      </p>
    </div>
  );
}

/** Step 3 — the outcome: answer returned and the finished artifact produced. */
function StepThreePanel() {
  return (
    <div className="flex h-full flex-col items-start justify-center gap-3 p-8">
      <span className="eyebrow text-fg-3">Done</span>
      <div
        className="flex w-full max-w-[340px] items-center gap-3 px-4 py-3"
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "var(--green-tint-07)" }}
        >
          <FileText className="h-4 w-4 text-emerald" />
        </span>
        <div>
          <p className="font-semibold text-fg" style={{ fontSize: "0.84rem" }}>
            invoice-al-noor-june.pdf
          </p>
          <p className="text-fg-3" style={{ fontSize: "0.72rem" }}>
            Sent to Accounts · 09:41
          </p>
        </div>
        <Sparkles className="ml-auto h-4 w-4 text-emerald" />
      </div>
      <p className="text-fg-3" style={{ fontSize: "0.78rem" }}>
        Totalled, formatted, and delivered — the right person sees it.
      </p>
    </div>
  );
}

const panels = [StepOnePanel, StepTwoPanel, StepThreePanel];

/** Desktop — interactive click-through: markers control one shared display panel. */
function InteractiveWalkthrough() {
  const [active, setActive] = useState(0);
  const ActivePanel = panels[active];

  return (
    <div className="hidden md:block">
      {/* Step markers + progress connector */}
      <div className="relative flex items-start justify-between">
        <div
          className="absolute top-[9px] right-0 left-0 h-px"
          style={{ background: "var(--border)" }}
        />
        <motion.div
          className="absolute top-[9px] left-0 h-px"
          style={{ background: "var(--elyst-emerald)" }}
          animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        {steps.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <button
              key={s.marker}
              onClick={() => setActive(i)}
              className="relative flex flex-col items-start gap-3 text-left"
              style={{ width: "31%" }}
            >
              <span
                className="z-10 h-[18px] w-[18px] rounded-full transition-colors"
                style={{
                  background: isActive || isPast ? "var(--elyst-emerald)" : "var(--bg)",
                  border: `2px solid ${isActive || isPast ? "var(--elyst-emerald)" : "var(--fg-3)"}`,
                }}
              />
              <span
                className="font-semibold transition-colors"
                style={{
                  fontSize: "0.78rem",
                  color: isActive ? "var(--elyst-emerald)" : "var(--fg-3)",
                }}
              >
                {s.marker}
              </span>
              <span
                className="leading-snug transition-colors"
                style={{
                  fontSize: "var(--text-small)",
                  color: isActive ? "var(--fg)" : "var(--fg-3)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Display panel — swaps on click, snappy crossfade */}
      <div
        className="relative mt-10 h-[260px] overflow-hidden"
        style={{
          background: "var(--surface-muted)",
          borderRadius: "var(--radius-card)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ActivePanel />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Mobile — three static stacked panels, top to bottom. Always in the DOM. */
function StackedSteps() {
  return (
    <div className="flex flex-col gap-6 md:hidden">
      {steps.map((s, i) => {
        const Panel = panels[i];
        return (
          <div key={s.marker}>
            <div className="mb-3 flex items-center gap-2.5">
              <span
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full font-semibold"
                style={{
                  background: "var(--elyst-emerald)",
                  color: "var(--fg-on-dark)",
                  fontSize: "0.74rem",
                }}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-fg" style={{ fontSize: "var(--text-small)" }}>
                  {s.label}
                </p>
                <p className="text-fg-3" style={{ fontSize: "0.76rem" }}>
                  {s.sub}
                </p>
              </div>
            </div>
            <div
              className="h-[220px] overflow-hidden"
              style={{ background: "var(--surface-muted)", borderRadius: "var(--radius-card)" }}
            >
              <Panel />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AiosHowItWorks() {
  return (
    <section
      className="bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">How AIOS works</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            One message. It knows what to do.
          </h2>
        </div>

        <div className="mt-14">
          <InteractiveWalkthrough />
          <StackedSteps />
        </div>

        {/* Contrast line — kills the "isn't this just ChatGPT?" doubt */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-fg" style={{ fontSize: "var(--text-body)", fontWeight: 600 }}>
            A generic chatbot doesn&rsquo;t know your business and can&rsquo;t act
            inside it.{" "}
            <span style={{ color: "var(--elyst-emerald)" }}>AIOS does both.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

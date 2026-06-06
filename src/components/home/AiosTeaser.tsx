"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, FileText } from "lucide-react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { BrandButton } from "@/components/ui/brand-button";

const benefits = [
  "Knowledge trapped in a few heads → instant answers for the whole team",
  "Documents made by hand → generated from one message",
  "Nobody knowing what to do → automatic daily task briefings",
];

const REPLY_LINE1 = "Done!";
const REPLY_LINE2 = "June invoice for Al Noor Trading is ready.";
const REPLY_LINE3 = "I have totalled 14 line items and generated the PDF.";
const FULL_REPLY = `${REPLY_LINE1}\n${REPLY_LINE2}\n\n${REPLY_LINE3}`;

function renderTyped(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {i === 0 ? <strong>{line}</strong> : line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

function ChatMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setTyped(FULL_REPLY);
          setDone(true);
          return;
        }
        let i = 0;
        const id = setInterval(() => {
          i += 1;
          setTyped(FULL_REPLY.slice(0, i));
          if (i >= FULL_REPLY.length) {
            clearInterval(id);
            setDone(true);
          }
        }, 18);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <CardContainer className="w-full" containerClassName="py-0">
      <CardBody className="mx-auto !w-full !max-w-[460px]">
        <div
          ref={ref}
          className="overflow-hidden border border-border bg-white shadow-card"
          style={{ borderRadius: "14px" }}
        >
          {/* WhatsApp-style header */}
          <div
            className="flex items-center gap-3 px-4 py-3 text-fg-on-dark"
            style={{ background: "#075E54" }}
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-base font-bold"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              A
            </div>
            <div className="leading-tight">
              <p className="font-bold" style={{ fontSize: "var(--text-small)" }}>
                AIOS
              </p>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>
                online
              </p>
            </div>
            {/* WhatsApp-style header icons */}
            <div className="ml-auto flex items-center gap-4 opacity-80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 10l5-5M20 10V5h-5M9 14l-5 5M4 14v5h5"/>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            </div>
          </div>

          {/* Chat body — WhatsApp beige */}
          <div
            className="flex flex-col gap-3 px-4 py-5"
            style={{ background: "#ECE5DD", minHeight: "260px" }}
          >
            {/* User message — right */}
            <div className="flex justify-end">
              <div
                className="max-w-[82%] px-3 py-2 shadow-sm"
                style={{
                  background: "#DCF8C6",
                  borderRadius: "12px 12px 4px 12px",
                  fontSize: "var(--text-small)",
                  color: "#111",
                }}
              >
                <p>Make the June invoice for Al Noor Trading.</p>
                <p
                  className="mt-1 text-right"
                  style={{ fontSize: "0.68rem", color: "rgba(0,0,0,0.4)" }}
                >
                  09:41 ✓✓
                </p>
              </div>
            </div>

            {/* AIOS reply — left */}
            <div className="flex justify-start">
              <div
                className="max-w-[85%] px-3 py-2 shadow-sm"
                style={{
                  background: "#ffffff",
                  borderRadius: "12px 12px 12px 4px",
                  fontSize: "var(--text-small)",
                  color: "#111",
                }}
              >
                <p style={{ lineHeight: 1.55 }}>
                  {renderTyped(typed)}
                  {!done && <span className="ml-0.5 animate-pulse">▍</span>}
                </p>
                {done && (
                  <>
                    <div
                      className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2"
                      style={{ background: "#f0f9f4", border: "1px solid rgba(3,98,76,0.15)" }}
                    >
                      <FileText className="h-4 w-4 flex-shrink-0 text-emerald" />
                      <span
                        className="font-semibold text-emerald"
                        style={{ fontSize: "0.8rem" }}
                      >
                        invoice-al-noor-june.pdf
                      </span>
                      <Check className="ml-auto h-3.5 w-3.5 text-emerald" />
                    </div>
                    <p
                      className="mt-1 text-right"
                      style={{ fontSize: "0.68rem", color: "rgba(0,0,0,0.4)" }}
                    >
                      09:41
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default function AiosTeaser() {
  return (
    <section
      className="bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <span className="chip">AIOS for Business</span>
          <h2
            className="mt-6 text-fg"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Your team already uses WhatsApp. Now it works for you.
          </h2>
          <p
            className="mt-4 max-w-prose text-fg-2"
            style={{ fontSize: "var(--text-body)" }}
          >
            AIOS is the operations layer for small teams with no technical
            staff — message it like a colleague, and it answers, drafts, and
            acts.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3 font-medium text-fg-2" style={{ fontSize: "var(--text-small)" }}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <BrandButton href="/aios">
              See how AIOS works
              <ArrowRight className="h-4 w-4" />
            </BrandButton>
          </div>
          <p className="mt-4 text-fg-3" style={{ fontSize: "var(--text-small)" }}>
            Configured and deployed for you. Nothing to install.
          </p>
        </div>

        <ChatMockup />
      </div>
    </section>
  );
}

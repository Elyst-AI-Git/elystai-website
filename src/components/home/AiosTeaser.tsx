"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";

const benefits = [
  "Knowledge trapped in a few heads → instant answers for the whole team",
  "Documents made by hand → generated from one message",
  "Nobody knowing what to do → automatic daily task briefings",
];

const REPLY =
  "Done — June invoice for Al Noor Trading is ready. I've totalled 14 line items and generated the PDF.";

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
          setTyped(REPLY);
          setDone(true);
          return;
        }
        let i = 0;
        const id = setInterval(() => {
          i += 1;
          setTyped(REPLY.slice(0, i));
          if (i >= REPLY.length) {
            clearInterval(id);
            setDone(true);
          }
        }, 22);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <CardContainer className="w-full" containerClassName="py-0">
      <CardBody className="mx-auto w-full max-w-sm">
    <div
      ref={ref}
      className="overflow-hidden rounded-card border border-border bg-white shadow-card"
    >
      <div className="flex items-center gap-3 bg-emerald px-4 py-3 text-fg-on-dark">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-display text-small font-bold">
          A
        </div>
        <div className="leading-tight">
          <p className="text-small font-bold">AIOS</p>
          <p className="text-[0.7rem] text-fg-on-dark/70">online</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-surface-muted px-4 py-5">
        {/* User message — sent from the right */}
        <div className="max-w-[80%] self-end rounded-2xl rounded-tr-sm bg-white px-3 py-2 text-small text-fg shadow-sm">
          Make the June invoice for Al Noor Trading.
        </div>

        {/* AIOS reply — received from the left */}
        <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-emerald px-3 py-2 text-small text-fg-on-dark shadow-sm">
          {typed}
          {!done && <span className="ml-0.5 animate-pulse">▍</span>}
          {done && (
            <span className="mt-2 flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-1 text-[0.72rem] font-semibold">
              <Check className="h-3.5 w-3.5" />
              invoice-al-noor-june.pdf generated
            </span>
          )}
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
              <li key={b} className="flex gap-3 text-small font-medium text-fg-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link href="/aios" className="btn btn-primary">
              See how AIOS works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-small text-fg-3">
            Configured and deployed for you. Nothing to install.
          </p>
        </div>

        <ChatMockup />
      </div>
    </section>
  );
}

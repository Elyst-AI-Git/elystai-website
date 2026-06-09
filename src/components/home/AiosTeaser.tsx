"use client";

import { useEffect, useRef, useState } from "react";
import { SectionMark } from "@/components/ui/section-mark";
import { BrandButton } from "@/components/ui/brand-button";
import Image from "next/image";

const REPLY_TEXT = "Done!\n\nJune invoice for Al Noor Trading is ready.\n\nI have totalled 14 line items and generated the PDF.";

function renderTyped(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {i === 0 ? <strong>{line}</strong> : line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

/** WhatsApp-style blue double read-receipt tick */
function BlueTick() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="inline-block ml-1 align-middle">
      <path d="M1 5L4.5 8.5L10.5 1" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5L10.5 8.5L16.5 1" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** WhatsApp-style PDF attachment bubble */
function PdfBubble() {
  return (
    <div className="flex justify-start">
      <div
        className="max-w-[85%] overflow-hidden shadow-sm"
        style={{
          background: "#ffffff",
          borderRadius: "12px 12px 12px 4px",
        }}
      >
        {/* Red PDF header */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: "#E8F5E9", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          {/* PDF icon */}
          <div
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
            style={{ background: "#E53935" }}
          >
            <span className="font-bold text-white" style={{ fontSize: "0.72rem", letterSpacing: "0.02em" }}>PDF</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold" style={{ fontSize: "0.82rem", color: "#111", lineHeight: 1.3 }}>
              Al Noor Invoice (June).pdf
            </p>
            <p style={{ fontSize: "0.68rem", color: "rgba(0,0,0,0.45)", marginTop: "2px" }}>
              9 pages · PDF · 1 MB
            </p>
          </div>
        </div>
        {/* Bottom action bar */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: "#ffffff" }}
        >
          <span style={{ fontSize: "0.72rem", color: "rgba(0,0,0,0.55)" }}>Open</span>
          <p style={{ fontSize: "0.68rem", color: "rgba(0,0,0,0.55)", textAlign: "right" }}>
            12:47
          </p>
        </div>
      </div>
    </div>
  );
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
          setTyped(REPLY_TEXT);
          setDone(true);
          return;
        }
        let i = 0;
        const id = setInterval(() => {
          i += 1;
          setTyped(REPLY_TEXT.slice(0, i));
          if (i >= REPLY_TEXT.length) {
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
    <div className="ml-auto w-full max-w-[460px]">
      <div
        ref={ref}
        className="overflow-hidden border border-border bg-white"
        style={{
          borderRadius: "14px",
          boxShadow:
            "0 8px 40px rgba(3,98,76,0.13), 0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(3,98,76,0.06)",
        }}
      >
        {/* WhatsApp-style header */}
        <div
          className="flex items-center gap-3 px-4 py-3 text-fg-on-dark"
          style={{ background: "#075E54" }}
        >
          {/* Logo avatar — bigger */}
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <Image
              src="/images/brand/logo-emerald.svg"
              alt="AIOS"
              width={38}
              height={38}
              className="h-10 w-10 object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <div className="leading-tight">
            <p className="font-bold" style={{ fontSize: "1.05rem" }}>
              AIOS
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>
              online
            </p>
          </div>
          {/* Single header icon — three-dot menu only, zoom removed */}
          <div className="ml-auto flex items-center gap-4 opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
          </div>
        </div>

        {/* Chat body — WhatsApp beige */}
        <div
          className="flex flex-col gap-3 px-4 py-5"
          style={{ background: "#ECE5DD", minHeight: "280px" }}
        >
          {/* User message — right, time 12:47 PM, blue double tick */}
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
                className="mt-1 flex items-center justify-end"
                style={{ fontSize: "0.68rem", color: "rgba(0,0,0,0.55)", gap: "2px" }}
              >
                12:47 PM
                <BlueTick />
              </p>
            </div>
          </div>

          {/* AIOS reply — left, typing animation */}
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
                <p
                  className="mt-1 text-right"
                  style={{ fontSize: "0.68rem", color: "rgba(0,0,0,0.55)" }}
                >
                  12:47
                </p>
              )}
            </div>
          </div>

          {/* PDF attachment — left, appears after reply is done */}
          {done && <PdfBubble />}
        </div>
      </div>
    </div>
  );
}

export default function AiosTeaser() {
  return (
    <section
      className="bg-bg"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "clamp(40px, 5vw, 72px)",
        paddingLeft: "var(--section-px)",
        paddingRight: "var(--section-px)",
      }}
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-2">
        <div>
          <SectionMark>AIOS for Business</SectionMark>
          <h2
            className="mt-6 text-fg"
            style={{ fontSize: "clamp(2.05rem, 3.75vw, 2.9rem)" }}
          >
            <span className="block">
              Your team already runs on{" "}
              <span style={{ color: "#128C7E" }}>WhatsApp</span>.
            </span>
            <span className="mt-4 block">Now they can run on AI.</span>
          </h2>
          <p
            className="mt-4 max-w-prose text-fg-2"
            style={{ fontSize: "clamp(1.3rem, 1.65vw, 1.45rem)" }}
          >
            AIOS is the AI employee for your team, that does the manual time consuming work, freeing up your team for more creative works.
          </p>

          <div className="mt-8">
            <BrandButton href="/aios">
              See how AIOS works
            </BrandButton>
          </div>
        </div>

        <div className="md:mt-8">
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}

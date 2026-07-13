"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Wordmark from "@/components/site/Wordmark";
import { BrandButton } from "@/components/ui/brand-button";
import { useIsTouch } from "@/lib/use-touch";

const leftLinks = [
  { label: "Home", href: "/" },
  { label: "AIOS", href: "/aios" },
];

type LearnItem = { label: string; href?: string; badge?: string };

const learnItems: LearnItem[] = [
  { label: "Overview", href: "/learn" },
  { label: "Elyst AI Circle", href: "/circle" },
  { label: "AI for Juniors", href: "/juniors" },
  { label: "AI for Work", href: "/ai-for-work", badge: "Closed" },
];

const joinPrefixes = ["/learn", "/circle", "/ai-yathra"];

function ctaForPath(pathname: string) {
  if (pathname.startsWith("/ai-for-work")) {
    return { label: "Join", href: "#enrol" };
  }
  const join = joinPrefixes.some((p) => pathname.startsWith(p));
  return join
    ? { label: "Join", href: "/learn#join" }
    : { label: "Book a call", href: "https://cal.com/elyst-ai/30min" };
}

function NavCta({
  label,
  href,
  full = false,
  onClick,
}: {
  label: string;
  href: string;
  full?: boolean;
  onClick?: () => void;
}) {
  return (
    <BrandButton
      href={href}
      onClick={onClick}
      full={full}
      tone="light"
      preset="silver"
      className="min-h-[40px]! px-5! text-[length:calc(var(--text-small)+1px)]"
    >
      {label}
    </BrandButton>
  );
}

/** Light-grey metal badge, dark-green text, navbar corner radius. */
function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      className="shrink-0 rounded-md px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide"
      style={{
        background: "linear-gradient(180deg, #f8faf9 0%, #dde4e0 55%, #ebefed 100%)",
        color: "hsl(160, 38%, 9%)",
        borderTop: "1px solid rgba(255,255,255,0.92)",
        borderBottom: "1px solid rgba(3,98,76,0.2)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      {children}
    </span>
  );
}

function Logo({ onClick, isTouch }: { onClick?: () => void; isTouch: boolean }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Elyst AI | Your AI Partner">
      <Wordmark
        className="h-7 w-auto text-fg-on-dark"
        // The drop-shadow glow is a few extra paint layers on every frame —
        // on touch the navbar is otherwise static, so skip it and render
        // the plain wordmark.
        style={
          isTouch
            ? undefined
            : {
                filter:
                  "drop-shadow(0 0 1px rgba(255,255,255,0.65)) drop-shadow(0 1px 2px rgba(180,210,200,0.45)) drop-shadow(0 0 8px rgba(0,223,130,0.25))",
              }
        }
      />
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const cta = ctaForPath(pathname);

  const isTouch = useIsTouch();
  const [scrolled, setScrolled] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement>(null);

  // The scrolled-state restyle (background/blur/shadow swap) fires on every
  // scroll event and triggers a repaint of the fixed navbar — on touch we
  // skip the listener entirely and keep one plain, static pill.
  useEffect(() => {
    if (isTouch) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTouch]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileLearnOpen(false);
  };

  // lock body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass =
    "font-medium text-fg-on-dark/85 transition-colors duration-200 hover:text-green";
  const linkStyle = { fontSize: "calc(var(--text-small) + 1px)" };

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
        style={{ width: "min(900px, calc(100vw - 48px))" }}
      >
        <div
          className={`relative flex h-14 items-center rounded-md px-3 ${isTouch ? "" : "transition-all duration-300"}`}
          style={
            isTouch
              ? {
                  // Plain, static pill — no scroll-driven repaints, no blur.
                  background: "color-mix(in srgb, var(--surface-dark) 95%, transparent)",
                  borderTop: "1px solid rgba(255,255,255,0.09)",
                  borderBottom: "1px solid rgba(0,0,0,0.35)",
                  boxShadow: "0 4px 24px rgba(3,98,76,0.12)",
                }
              : {
                  background: scrolled
                    ? "linear-gradient(180deg, hsl(160 38% 12%) 0%, hsl(160 38% 8%) 55%, hsl(160 38% 11%) 100%)"
                    : "color-mix(in srgb, var(--surface-dark) 95%, transparent)",
                  backdropFilter: scrolled ? "blur(16px)" : "none",
                  borderTop: "1px solid rgba(255,255,255,0.09)",
                  borderBottom: "1px solid rgba(0,0,0,0.35)",
                  boxShadow: scrolled
                    ? "inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)"
                    : "0 4px 24px rgba(3,98,76,0.12)",
                }
          }
        >
          {/* Desktop: left links */}
          <div className="hidden flex-1 items-center gap-6 md:flex">
            {leftLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass} style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Centred logo (desktop) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <Logo isTouch={isTouch} />
          </div>

          {/* Mobile: logo left */}
          <div className="flex flex-1 items-center md:hidden">
            <Logo isTouch={isTouch} />
          </div>

          {/* Desktop: right links + CTA */}
          <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
            <div ref={learnRef} className="relative">
              <button
                type="button"
                onClick={() => setLearnOpen((o) => !o)}
                onMouseEnter={() => setLearnOpen(true)}
                className={`inline-flex items-center gap-1 ${linkClass}`}
                style={linkStyle}
                aria-expanded={learnOpen}
                aria-haspopup="menu"
              >
                Accelerator
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    learnOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {learnOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    onMouseLeave={() => setLearnOpen(false)}
                    role="menu"
                    className="absolute right-0 top-full mt-5 w-56 overflow-hidden rounded-md p-1.5 shadow-card"
                    style={{
                      background:
                        "linear-gradient(180deg, hsl(160 38% 12%) 0%, hsl(160 38% 8%) 55%, hsl(160 38% 11%) 100%)",
                      borderTop: "1px solid rgba(255,255,255,0.09)",
                      borderBottom: "1px solid rgba(0,0,0,0.35)",
                    }}
                  >
                    {learnItems.map((item) =>
                      item.href ? (
                        <Link
                          key={item.label}
                          href={item.href}
                          role="menuitem"
                          className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-small text-fg-on-dark/85 transition-colors hover:bg-surface-dark-hover hover:text-fg-on-dark"
                        >
                          {item.label}
                          {item.badge && <Pill>{item.badge}</Pill>}
                        </Link>
                      ) : (
                        <div
                          key={item.label}
                          role="menuitem"
                          aria-disabled="true"
                          className="flex cursor-default items-center justify-between gap-3 rounded-md px-3 py-2 text-small text-fg-on-dark/45"
                        >
                          {item.label}
                          {item.badge && <Pill>{item.badge}</Pill>}
                        </div>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavCta label={cta.label} href={cta.href} />
          </div>

          {/* Mobile: hamburger */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg-on-dark"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
            style={{ background: "var(--surface-dark)" }}
          >
            <div className="relative flex items-center justify-center px-6 py-5">
              <Logo onClick={() => setMobileOpen(false)} isTouch={isTouch} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="absolute right-5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-fg-on-dark"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2 px-6 pt-6">
              {leftLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="font-display text-h3 font-semibold text-fg-on-dark"
                >
                  {l.label}
                </Link>
              ))}

              {/* Learn AI accordion */}
              <button
                type="button"
                onClick={() => setMobileLearnOpen((o) => !o)}
                className="flex items-center justify-between font-display text-h3 font-semibold text-fg-on-dark"
                aria-expanded={mobileLearnOpen}
              >
                Accelerator
                <ChevronDown
                  className={`h-6 w-6 transition-transform duration-200 ${
                    mobileLearnOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {mobileLearnOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 py-2 pl-4">
                      {learnItems.map((item) =>
                        item.href ? (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeMobile}
                            className="flex items-center gap-2 text-body text-fg-on-dark/80"
                          >
                            {item.label}
                            {item.badge && <Pill>{item.badge}</Pill>}
                          </Link>
                        ) : (
                          <div
                            key={item.label}
                            aria-disabled="true"
                            className="flex items-center gap-2 text-body text-fg-on-dark/45"
                          >
                            {item.label}
                            {item.badge && <Pill>{item.badge}</Pill>}
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 pb-10">
              <NavCta
                label={cta.label}
                href={cta.href}
                full
                onClick={closeMobile}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

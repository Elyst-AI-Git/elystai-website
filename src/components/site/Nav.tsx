"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Wordmark from "@/components/site/Wordmark";
import { BrandButton } from "@/components/ui/brand-button";

const leftLinks = [
  { label: "AIOS for Business", href: "/aios" },
  { label: "About", href: "/about" },
];

const rightLinks = [{ label: "Blog", href: "/blog" }];

const learnItems = [
  { label: "Accelerator overview", href: "/learn" },
  { label: "Circle", href: "/circle" },
  { label: "AI Junior", href: "/ai-junior" },
  { label: "AI Yathra", href: "/ai-yathra" },
  { label: "Flagship Course", href: "/flagship", soon: true },
];

const joinPrefixes = ["/learn", "/circle", "/ai-junior", "/ai-yathra", "/flagship"];

function ctaForPath(pathname: string) {
  const join = joinPrefixes.some((p) => pathname.startsWith(p));
  return join
    ? { label: "Join", href: "/learn#join" }
    : { label: "Book a call", href: "/contact" };
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
      preset="silver"
      className="min-h-[40px]! px-5! text-[length:var(--text-small)]"
    >
      {label}
    </BrandButton>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Elyst AI — home">
      <Wordmark
        className="h-5 w-auto text-fg-on-dark"
        style={{
          filter:
            "drop-shadow(0 0 1px rgba(255,255,255,0.65)) drop-shadow(0 1px 2px rgba(180,210,200,0.45)) drop-shadow(0 0 8px rgba(0,223,130,0.25))",
        }}
      />
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const cta = ctaForPath(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    "text-small font-medium text-fg-on-dark/85 transition-colors duration-200 hover:text-green";

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
        style={{ width: "min(900px, calc(100vw - 48px))" }}
      >
        <div
          className="relative flex h-14 items-center rounded-pill px-3 transition-all duration-300"
          style={{
            background: scrolled
              ? "linear-gradient(180deg, hsl(160 38% 12%) 0%, hsl(160 38% 8%) 55%, hsl(160 38% 11%) 100%)"
              : "color-mix(in srgb, var(--surface-dark) 95%, transparent)",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderTop: "1px solid rgba(255,255,255,0.09)",
            borderBottom: "1px solid rgba(0,0,0,0.35)",
            boxShadow: scrolled
              ? "inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)"
              : "0 4px 24px rgba(3,98,76,0.12)",
          }}
        >
          {/* Desktop: left links */}
          <div className="hidden flex-1 items-center gap-6 md:flex">
            {leftLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Centred logo (desktop) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <Logo />
          </div>

          {/* Mobile: logo left */}
          <div className="flex flex-1 items-center md:hidden">
            <Logo />
          </div>

          {/* Desktop: right links + CTA */}
          <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
            <div ref={learnRef} className="relative">
              <button
                type="button"
                onClick={() => setLearnOpen((o) => !o)}
                onMouseEnter={() => setLearnOpen(true)}
                className={`inline-flex items-center gap-1 ${linkClass}`}
                aria-expanded={learnOpen}
                aria-haspopup="menu"
              >
                Learn AI
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
                    className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-card p-2 shadow-card"
                    style={{ background: "var(--surface-dark-2)" }}
                  >
                    {learnItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-small text-fg-on-dark/85 transition-colors hover:bg-surface-dark-hover hover:text-fg-on-dark"
                      >
                        {item.label}
                        {item.soon && (
                          <span className="rounded-pill bg-emerald/30 px-2 py-0.5 text-[0.65rem] font-bold text-green">
                            Coming soon
                          </span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {rightLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}

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
              <Logo onClick={() => setMobileOpen(false)} />
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
                Learn AI
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
                      {learnItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobile}
                          className="flex items-center gap-2 text-body text-fg-on-dark/80"
                        >
                          {item.label}
                          {item.soon && (
                            <span className="rounded-pill bg-emerald/30 px-2 py-0.5 text-[0.65rem] font-bold text-green">
                              Coming soon
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {rightLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="font-display text-h3 font-semibold text-fg-on-dark"
                >
                  {l.label}
                </Link>
              ))}
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

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import TrackedCta from "@/components/marketing/TrackedCta";
import Wordmark from "@/components/site/Wordmark";
import { useIsTouch } from "@/lib/use-touch";

const links = [
  { label: "Services", href: "/services" },
  { label: "Training", href: "/training" },
  { label: "About", href: "/about" },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Elyst AI">
      <Wordmark className="h-7 w-auto text-fg-on-dark" />
    </Link>
  );
}

export default function Nav() {
  const isTouch = useIsTouch();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTraining = pathname === "/training";
  const ctaLabel = isTraining ? "Plan a team session" : "Book a Call";
  const ctaIntent = isTraining ? "training" : "audit";

  useEffect(() => {
    if (isTouch) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTouch]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const linkClass =
    "font-medium tracking-[calc(var(--tracking-body)*1.1)] text-fg-on-dark/85 transition-colors duration-200 hover:text-green";
  const linkStyle = { fontSize: "calc(var(--text-small) + 1px)" };
  const pillStyle = isTouch
    ? {
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
      };

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
        style={{ width: "min(900px, calc(100vw - 48px))" }}
      >
        <div
          className={`relative flex h-14 items-center justify-between rounded-md px-3 ${isTouch ? "" : "transition-all duration-300"}`}
          style={pillStyle}
        >
          <Logo />

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass}
                aria-current={pathname === link.href ? "page" : undefined}
                style={linkStyle}
              >
                {link.label}
              </Link>
            ))}
            <TrackedCta
              label={ctaLabel}
              intent={ctaIntent}
              tone="light"
              className="min-h-[40px]! px-5! text-[length:calc(var(--text-small)+1px)] tracking-[calc(var(--tracking-body)*1.1)]"
            />
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-on-dark md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

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
            <div className="relative flex items-center justify-between px-6 py-5">
              <Logo onClick={closeMobile} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMobile}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-on-dark"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-6 pt-10">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`font-display tracking-[calc(var(--tracking-body)*1.1)] text-h3 font-semibold ${pathname === link.href ? "text-green" : "text-fg-on-dark"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="px-6 pb-10">
              <TrackedCta
                label={ctaLabel}
                intent={ctaIntent}
                tone="green"
                full
                className="tracking-[calc(var(--tracking-body)*1.1)]"
                onClick={closeMobile}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

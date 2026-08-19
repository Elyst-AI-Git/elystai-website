import Link from "next/link";
import { Menu, X } from "lucide-react";
import BookingButton from "@/components/marketing/BookingButton";
import Wordmark from "@/components/site/Wordmark";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Training", href: "/training" },
] as const;

function Logo() {
  return (
    <Link href="/" aria-label="Elyst AI | Your AI Partner">
      <Wordmark className="h-7 w-auto text-fg-on-dark drop-shadow-[0_1px_5px_color-mix(in_srgb,var(--elyst-green)_24%,transparent)]" />
    </Link>
  );
}

function AuditButton({ full = false }: { full?: boolean }) {
  return (
    <BookingButton
      intent="audit"
      full={full}
      tone="light"
      className="min-h-10 px-5 text-[length:var(--text-small)]"
    >
      Book an audit call
    </BookingButton>
  );
}

export default function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
      style={{ width: "min(1180px, calc(100vw - 48px))" }}
    >
      <div className="nav-shell flex h-14 items-center rounded-md px-3">
        <Logo />

        <div className="ml-auto hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-fg-on-dark/85 transition-colors duration-150 hover:text-green focus-visible:text-green"
              style={{ fontSize: "var(--text-small)" }}
            >
              {link.label}
            </Link>
          ))}
          <AuditButton />
        </div>

        <details className="group ml-auto md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-fg-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green [&::-webkit-details-marker]:hidden">
            <Menu className="size-6 group-open:hidden" aria-hidden />
            <X className="hidden size-6 group-open:block" aria-hidden />
            <span className="sr-only">Toggle menu</span>
          </summary>

          <div className="mobile-nav-panel fixed inset-x-0 top-[76px] min-h-[calc(100vh-76px)] px-6 py-10 shadow-2xl">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-h3 font-semibold text-fg-on-dark"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-12">
              <AuditButton full />
            </div>
          </div>
        </details>
      </div>
    </nav>
  );
}

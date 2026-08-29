import Link from "next/link";
import type { ReactNode } from "react";
import { SectionMark } from "@/components/ui/section-mark";

export const showPreviewPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_NEEDS_PLACEHOLDERS === "true";

export function LocalPreviewOnly({ children }: { children: ReactNode }) {
  if (!showPreviewPlaceholders) return null;
  return <>{children}</>;
}

export function MarketingSection({
  children,
  id,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "light" | "muted" | "dark";
}) {
  const surface = tone === "dark" ? "bg-surface-dark" : tone === "muted" ? "bg-surface-muted" : "bg-bg";

  return (
    <section
      id={id}
      className={`scroll-mt-28 ${surface} ${className}`}
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function MarketingEyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <SectionMark tone={tone === "dark" ? "dark" : undefined}>{children}</SectionMark>;
}

export function SectionTitle({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <h2
      className={`font-display font-bold ${tone === "dark" ? "text-fg-on-dark" : "text-fg"} ${className}`}
      style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}
    >
      {children}
    </h2>
  );
}

export function BodyText({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={tone === "dark" ? `text-fg-muted-dark ${className}` : `text-fg-2 ${className}`}
      style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
    >
      {children}
    </p>
  );
}

export function TextLink({ children, href, className = "" }: { children: ReactNode; href: string; className?: string }) {
  return (
    <Link href={href} className={`font-semibold text-emerald underline decoration-emerald/35 underline-offset-4 hover:text-emerald-light ${className}`}>
      {children}
    </Link>
  );
}

export function BulletList({
  items,
  tone = "light",
  className = "",
}: {
  items: ReactNode[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3" style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}>
          <span aria-hidden className={`mt-[0.63em] h-2 w-2 shrink-0 rounded-full ${tone === "dark" ? "bg-green" : "bg-emerald"}`} />
          <span className={tone === "dark" ? "text-fg-muted-dark" : "text-fg-2"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NumberedItem({
  number,
  title,
  children,
  tone = "light",
}: {
  number: string;
  title: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <article className="border-t border-current/15 pt-5">
      <div className="flex items-baseline gap-4">
        <span className={`font-display font-bold ${dark ? "text-green" : "text-emerald"}`} style={{ fontSize: "var(--text-h3)" }}>
          {number}
        </span>
        <h3 className={dark ? "font-display text-fg-on-dark" : "font-display text-fg"} style={{ fontSize: "var(--text-h3)" }}>
          {title}
        </h3>
      </div>
      <div className={dark ? "mt-3 text-fg-muted-dark" : "mt-3 text-fg-2"} style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
        {children}
      </div>
    </article>
  );
}

export function NeedsPlaceholder({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (!showPreviewPlaceholders) return null;
  const dark = tone === "dark";

  return (
    <div
      role="note"
      className={`border-2 border-dashed p-5 ${dark ? "border-green/45 bg-white/5 text-fg-muted-dark" : "border-emerald/45 bg-emerald/5 text-fg-2"} ${className}`}
      style={{ fontSize: "var(--text-small)", lineHeight: 1.55 }}
    >
      {children}
    </div>
  );
}

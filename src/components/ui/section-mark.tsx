/**
 * Section mark — the small label that introduces each section across the site.
 *
 * Replaces the generic rounded "pill chip" pattern (a coloured badge above a
 * headline) that reads as templated/AI-generated. This is a symmetric
 * rule–label–rule mark instead — closer to a technical drawing's callout than
 * a marketing badge, which fits the brand's engineered/blueprint register.
 *
 * Used across the commercial pages so the eyebrow treatment stays consistent.
 */

export function SectionMark({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  /** "light" = on the page's light surfaces; "dark" = on a dark-green surface. */
  tone?: "light" | "dark";
}) {
  const lineColor = tone === "dark" ? "var(--elyst-green)" : "var(--elyst-emerald)";
  const textColor = tone === "dark" ? "var(--elyst-green)" : "var(--fg-2)";
  return (
    <div className="inline-flex items-center gap-3">
      <span aria-hidden className="h-px w-7" style={{ background: lineColor, opacity: 0.55 }} />
      <span
        className="font-display"
        style={{
          fontSize: "0.9rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.086093442em",
          color: textColor,
        }}
      >
        {children}
      </span>
      <span aria-hidden className="h-px w-7" style={{ background: lineColor, opacity: 0.55 }} />
    </div>
  );
}

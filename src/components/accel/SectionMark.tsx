/**
 * Section mark — a small label that introduces each Accelerator section.
 *
 * Replaces the generic rounded "pill chip" pattern (icon-less coloured badge
 * above a headline) that's become a dead giveaway of templated/AI-generated
 * sites. This is a plain, symmetric rule–label–rule mark instead — closer to
 * a technical drawing's callout than a marketing badge, which fits the
 * brand's "engineered, blueprint" register (gradient-frame cards, grid
 * textures) far better than a coloured pill ever did.
 */

export function SectionMark({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  /** "light" = on the page's light surfaces; "dark" = on the one deliberate
   *  dark-green surface (Paths section). */
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
          fontSize: "0.78rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: textColor,
        }}
      >
        {children}
      </span>
      <span aria-hidden className="h-px w-7" style={{ background: lineColor, opacity: 0.55 }} />
    </div>
  );
}

import { BrandButton } from "@/components/ui/brand-button";

// TODO(webinar): paste the Google Forms registration URL here before going live.
const WEBINAR_FORM_URL = "https://forms.gle/placeholder";

const WEBINAR_DATE = "Thursday, 9 July";
const WEBINAR_TIME = "7:30 PM IST · Free · Online";

export default function WebinarStrip() {
  return (
    <section
      aria-label="Free webinar"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface-muted)",
        padding: "clamp(28px, 4vw, 44px) var(--section-px)",
      }}
    >
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center gap-7 sm:gap-10 md:gap-14">

        {/* Poster — Instagram 1:1 */}
        <div
          className="shrink-0 rounded-2xl overflow-hidden shadow-md"
          style={{ width: "clamp(148px, 20vw, 188px)", aspectRatio: "1 / 1" }}
        >
          <Poster />
        </div>

        {/* Copy + CTA */}
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <span
            className="inline-block self-center sm:self-start rounded-full px-3 py-1 font-bold"
            style={{
              background: "var(--elyst-green)",
              color: "var(--elyst-ink)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.03em",
            }}
          >
            Free Webinar · {WEBINAR_DATE}
          </span>

          <h2
            className="font-display font-bold text-fg"
            style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.65rem)", lineHeight: 1.15 }}
          >
            Not sure if AI is really for you?
          </h2>

          <p
            className="text-fg-2"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.6, maxWidth: "50ch" }}
          >
            Join us live this Thursday for a free session — no jargon, no pressure. We&rsquo;ll cut through the confusion and help you figure out exactly where to begin.
          </p>

          <p
            className="text-fg-3 font-bold"
            style={{ fontSize: "var(--text-label)" }}
          >
            {WEBINAR_TIME}
          </p>

          <div className="mt-1">
            <BrandButton
              href={WEBINAR_FORM_URL}
              variant="solid"
              tone="emerald"
            >
              Reserve your free spot →
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Poster() {
  return (
    <div
      className="w-full h-full flex flex-col justify-between"
      style={{
        background: "var(--surface-dark)",
        padding: "clamp(14px, 3vw, 20px)",
      }}
    >
      {/* Top: live badge */}
      <div className="flex items-center justify-between">
        <span
          className="rounded px-2 py-0.5 font-bold uppercase"
          style={{
            background: "var(--elyst-green)",
            color: "var(--elyst-ink)",
            fontSize: "0.62rem",
            letterSpacing: "0.08em",
          }}
        >
          Free Live
        </span>
        <span
          style={{
            fontSize: "0.62rem",
            color: "var(--fg-muted-dark)",
            letterSpacing: "0.04em",
            fontWeight: 600,
          }}
        >
          9 JUL
        </span>
      </div>

      {/* Middle: headline */}
      <div className="flex flex-col gap-1">
        <p
          className="font-display font-bold"
          style={{
            fontSize: "clamp(0.82rem, 1.6vw, 0.98rem)",
            lineHeight: 1.25,
            color: "var(--fg-on-dark)",
          }}
        >
          Where should you begin with AI?
        </p>
        <p
          style={{
            fontSize: "0.68rem",
            color: "var(--fg-muted-dark)",
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          Live · No fluff · Free
        </p>
      </div>

      {/* Bottom: wordmark */}
      <p
        style={{
          fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.075em",
          fontSize: "0.82rem",
          color: "var(--elyst-green)",
        }}
      >
        elyst AI
      </p>
    </div>
  );
}

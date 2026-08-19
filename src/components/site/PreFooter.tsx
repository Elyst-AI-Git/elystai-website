const PHRASES = [
  "work for your team.",
  "genuinely useful.",
  "worth your time.",
] as const;

export default function PreFooter() {
  return (
    <section className="bg-bg" style={{ padding: "clamp(36px, 5.5vw, 75px) var(--section-px)" }}>
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p
          className="font-display font-bold text-fg"
          style={{ fontSize: "var(--text-prefooter)", lineHeight: 1.12 }}
        >
          Making AI{" "}
          <span className="prefooter-cycle" aria-hidden>
            {PHRASES.map((phrase) => <span key={phrase}>{phrase}</span>)}
          </span>
          <span className="sr-only">{PHRASES[0]}</span>
        </p>
      </div>
    </section>
  );
}

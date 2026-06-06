export default function Home() {
  return (
    <main id="main" className="flex-1 pt-24">
      <section
        className="mx-auto max-w-3xl"
        style={{ padding: "var(--section-py) var(--section-px)" }}
      >
        <span className="chip">Kozhikode · Kerala · India &amp; GCC</span>
        <h1 className="mt-6 text-hero">Elyst AI</h1>
        <p
          className="mt-4 max-w-prose text-fg-2"
          style={{ fontSize: "var(--text-body)" }}
        >
          Global shell in progress. Brand tokens, fonts, and primitives wired
          from DESIGN.md.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="btn btn-primary">Book a call</button>
          <button className="btn btn-ghost btn-pill">Explore programs</button>
        </div>
      </section>
    </main>
  );
}

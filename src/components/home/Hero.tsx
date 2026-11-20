import ContactCta from "@/components/marketing/ContactCta";
import { CometCard } from "@/components/ui/comet-card";
import HeroDither from "@/components/home/HeroDither";
import { ONE_LINER } from "@/lib/site-content";

export default function Hero() {
  return (
    <section className="flex lg:min-h-[calc(100svh-6rem)] lg:items-center" style={{ padding: "clamp(40px, 5vw, 72px) var(--section-px)" }}>
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
        <div>
          <h1
            className="text-balance text-fg"
            style={{
              fontSize: "clamp(2.52rem, 5.4vw, 4.95rem)",
              lineHeight: 1.08,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            Put AI to <span className="hero-accent-word">work</span> in your business.
          </h1>

          <p
            className="mt-5 max-w-xl text-fg-2"
            style={{
              fontSize: "calc(var(--text-body) + 2px)",
              lineHeight: 1.5,
              letterSpacing: "-0.029229255em",
            }}
          >
            {ONE_LINER}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ContactCta tone="green" />
            <a
              href="#how-it-works"
              className="inline-flex min-h-12 items-center rounded-md border-2 border-emerald bg-white px-6 font-display font-semibold text-emerald"
              style={{ fontSize: "var(--text-small)" }}
            >
              See how it works
            </a>
          </div>
        </div>

        <CometCard className="hidden self-stretch lg:block">
          <div
            className="relative overflow-hidden rounded-card"
            style={{ background: "#F5F8F6", height: "480px" }}
            aria-label="A workflow moves from messy input through a human review gate to an owned result."
          >
            <HeroDither variant="wide" />
          </div>
        </CometCard>

        <CometCard className="lg:hidden">
          <div
            className="relative h-[260px] overflow-hidden rounded-card md:h-[320px]"
            style={{ background: "#F5F8F6" }}
            aria-label="A workflow moves from messy input through a human review gate to an owned result."
          >
            <HeroDither variant="narrow" />
          </div>
        </CometCard>
      </div>
    </section>
  );
}

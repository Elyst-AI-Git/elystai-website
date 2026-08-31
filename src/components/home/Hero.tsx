import Link from "next/link";
import MarkDither from "@/components/site/MarkDither";
import TrackedCta from "@/components/marketing/TrackedCta";
import { BrandButton } from "@/components/ui/brand-button";
import { CometCard } from "@/components/ui/comet-card";

export default function Hero() {
  return (
    <section style={{ padding: "clamp(40px, 5vw, 72px) var(--section-px)" }}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[3fr_2fr]">
        <div>
          <h1
            className="text-fg"
            style={{
              fontSize: "clamp(2.52rem, 5.4vw, 4.95rem)",
              lineHeight: 1.08,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            <span className="block">Don&apos;t just use AI,</span>
            <span className="block md:whitespace-nowrap">
              we <span className="hero-accent-word">change</span> how your
            </span>
            <span className="block">team works with it.</span>
          </h1>

          <p
            className="mt-5 max-w-md text-fg-2 md:max-w-none"
            style={{
              fontSize: "calc(var(--text-body) + 2px)",
              lineHeight: 1.5,
              letterSpacing: "-0.029229255em",
            }}
          >
            We map the work, decide what is worth changing, build the smallest useful system, and train your team to run it.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TrackedCta label="Book a Call" intent="audit" tone="green" />
            <span className="hidden md:inline-flex">
              <BrandButton
                href="/services"
                variant="outline"
                className="border-2! bg-white! text-emerald! hover:bg-emerald/5!"
              >
                <span style={{ fontSize: "calc(var(--text-small) + 2px)" }}>
                  See how it works
                </span>
              </BrandButton>
            </span>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center px-1 font-semibold text-emerald underline decoration-emerald/35 underline-offset-4 hover:text-emerald-light md:hidden"
            >
              See how it works →
            </Link>
          </div>
        </div>

        <CometCard className="hidden self-stretch md:block">
          <div
            className="relative overflow-hidden rounded-card"
            style={{ background: "#F5F8F6", height: "480px" }}
            aria-label="A workflow moves from messy input through a human review gate to an owned result."
          >
            <MarkDither colorFront="#03624C" colorBack="#F5F8F6" />
          </div>
        </CometCard>

        <CometCard className="md:hidden">
          <div
            className="relative h-[260px] overflow-hidden rounded-card"
            style={{ background: "#F5F8F6" }}
            aria-label="A workflow moves from messy input through a human review gate to an owned result."
          >
            <MarkDither colorFront="#03624C" colorBack="#F5F8F6" pixelSize={4} />
          </div>
        </CometCard>
      </div>
    </section>
  );
}

import ContactCta from "@/components/marketing/ContactCta";
import { SectionMark } from "@/components/ui/section-mark";
import { TransformationFlowVisual } from "@/components/site/HeroVisuals";

export default function TransformationHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(76px, 10vw, 148px) var(--section-px) clamp(64px, 8vw, 104px)",
        background: "linear-gradient(to bottom, var(--surface-dark) 0%, var(--surface-dark) 62%, color-mix(in srgb, var(--surface-dark) 72%, var(--surface-accent-soft)) 82%, var(--surface-accent-soft) 100%)",
      }}
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.62fr)] xl:items-center xl:gap-16">
        <div className="max-w-3xl">
          <SectionMark tone="dark">AI Transformation</SectionMark>
          <h1 className="training-hero-title mt-6 text-balance text-fg-on-dark" style={{ lineHeight: 1.04 }}>
            Change how your team <span className="hero-accent-word">works</span> with AI
          </h1>
          <p className="mt-7 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.5 }}>
            We find the work AI can do for you, build the AI system, and train your people to use it.
          </p>
          <div className="mt-8">
            <ContactCta tone="green" />
          </div>
        </div>
        <TransformationFlowVisual />
      </div>
    </section>
  );
}

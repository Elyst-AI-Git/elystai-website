import Image from "next/image";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";

export default function ServicesHero() {
  return (
    <section
      className="relative bg-bg"
      style={{
        padding: "clamp(14px, 2vw, 28px) clamp(10px, 2.4vw, 28px) clamp(40px, 6vw, 84px)",
      }}
    >
      <div className="relative mx-auto max-w-[1480px] overflow-hidden rounded-md shadow-[0_24px_64px_rgb(3_98_76/18%),0_4px_16px_rgb(3_98_76/10%)]">
        <Image
          src="/accel-hero/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-left"
        />

        <div className="relative z-10 grid min-h-[34rem] gap-10 px-6 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] md:items-center md:gap-12 md:px-12 lg:px-20 lg:py-20">
          <div className="flex flex-col justify-center">
            <SectionMark>Services</SectionMark>
            <h1
              className="mt-6 text-left text-fg"
              style={{ fontSize: "var(--text-h1)", lineHeight: 1.05 }}
            >
              Go from a workflow problem to an <span className="hero-accent-word">AI system</span> your team owns.
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center text-center md:translate-x-4">
            <p
              className="max-w-xl text-fg"
              style={{ fontSize: "calc(var(--text-body) + 2px)", lineHeight: 1.6 }}
            >
              We audit the work, build the smallest useful system, and hand it over with training, documentation and clear limits.
            </p>
            <div className="mt-8">
              <BrandButton href="/services#our-process" variant="metal" tone="light" preset="silver">
                See our process
              </BrandButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

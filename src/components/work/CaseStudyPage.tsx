import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import ContactCta from "@/components/marketing/ContactCta";
import { SectionMark } from "@/components/ui/section-mark";
import TestimonialCarousel from "@/components/work/TestimonialCarousel";
import WorkCard from "@/components/work/WorkCard";
import { CASE_CATEGORIES, WORK_CASES, type WorkCase } from "@/lib/work-content";

/**
 * One case, in the order a buyer reads it: who and where, photos, the brief,
 * what we did step by step, what the team left with, quick answers, what they
 * said (only when approved), then one call to action.
 */
export default function CaseStudyPage({ item }: { item: WorkCase }) {
  const category = CASE_CATEGORIES[item.category];
  const portrait = item.photoOrientation === "portrait";
  // The next two cases in the list, wrapping around.
  const index = WORK_CASES.findIndex((c) => c.slug === item.slug);
  const others = [1, 2].map((offset) => WORK_CASES[(index + offset) % WORK_CASES.length]);

  return (
    <main id="main" className="flex-1 bg-bg pt-24">
      {/* 1. Hero */}
      <section className="bg-surface-dark" style={{ padding: "clamp(56px, 8vw, 110px) var(--section-px) clamp(56px, 7vw, 96px)" }}>
        <header className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-8 items-center underline underline-offset-4 hover:text-fg-on-dark">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/work" className="inline-flex min-h-8 items-center underline underline-offset-4 hover:text-fg-on-dark">Works</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/work?category=${item.category}`} className="inline-flex min-h-8 items-center underline underline-offset-4 hover:text-fg-on-dark">{category.label}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{item.client}</li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
            <div>
              <SectionMark tone="dark">{category.eyebrow}</SectionMark>
              <h1 className="mt-6 text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h1)", lineHeight: 1.02 }}>
                {item.client}
              </h1>
              <p className="mt-6 max-w-2xl font-display font-semibold text-green" style={{ fontSize: "var(--text-lead)", lineHeight: 1.3 }}>
                {item.subtitle}
              </p>
              <p className="mt-5 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 rounded-md border border-white/15 bg-white/[0.04] p-8 lg:min-h-[14rem]">
              <Image src={item.logo.src} alt={item.logo.alt} width={item.logo.width} height={item.logo.height} className="max-h-24 w-auto max-w-[14rem] object-contain" />
              {item.groupCompanies ? (
                <div className="w-full border-t border-white/15 pt-5 text-center">
                  <p className="font-display font-bold uppercase text-fg-muted-dark" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}>
                    Group companies
                  </p>
                  <ul className="mt-4 flex flex-col items-center gap-4">
                    {item.groupCompanies.map((company) => (
                      <li key={company.name} className="flex h-10 items-center">
                        {company.logo ? (
                          <Image src={company.logo.src} alt={company.logo.alt} width={company.logo.width} height={company.logo.height} className="max-h-10 w-auto max-w-[10rem] object-contain" />
                        ) : (
                          <span className="font-display font-bold uppercase tracking-[0.18em] text-fg-on-dark" style={{ fontSize: "var(--text-small)" }}>
                            {company.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </header>
      </section>

      {/* 2. Photos: used as given. Portrait pairs and landscape pairs each keep their own ratio. */}
      {item.photos.length ? (
        <section className="bg-bg" style={{ padding: "clamp(40px, 5vw, 72px) var(--section-px) 0" }}>
          <div className={`mx-auto grid max-w-6xl gap-4 ${item.photos.length > 1 ? "sm:grid-cols-2" : ""} ${portrait ? "max-w-4xl" : ""}`}>
            {item.photos.map((photo, index) => (
              <figure key={photo.src} className={`relative w-full overflow-hidden rounded-md bg-surface-muted ${portrait ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={index === 0}
                  sizes={portrait ? "(min-width: 896px) 440px, 100vw" : "(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* 3. The brief + facts */}
      <section className="bg-bg" style={{ padding: "clamp(64px, 8vw, 112px) var(--section-px)" }}>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-20">
          <div>
            <SectionMark>The brief</SectionMark>
            <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h3)", lineHeight: 1.1 }}>
              What they asked for
            </h2>
            <p className="mt-6 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.5 }}>
              {item.asked}
            </p>
          </div>
          <dl className="grid h-fit gap-0 divide-y divide-emerald/15 rounded-md border-2 border-emerald/25 bg-surface-accent-soft px-6 shadow-card">
            {item.facts.map((fact) => (
              <div key={fact.label} className="py-4">
                <dt className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}>
                  {fact.label}
                </dt>
                <dd className="mt-1 font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.25 }}>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4. What we did */}
      <section className="bg-surface-accent-soft" aria-labelledby="did-heading" style={{ padding: "clamp(64px, 8vw, 112px) var(--section-px)" }}>
        <div className="mx-auto max-w-6xl">
          <SectionMark>The work</SectionMark>
          <h2 id="did-heading" className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}>
            What we did
          </h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2">
            {item.steps.map((step, index) => (
              <li key={step.title} className="rounded-md border-2 border-emerald/25 bg-surface-light p-7 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-full border-2 border-emerald font-display text-small font-bold text-emerald">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.1 }}>
                  {step.title}
                </h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. What the team left with */}
      <section className="bg-bg" aria-labelledby="left-heading" style={{ padding: "clamp(64px, 8vw, 112px) var(--section-px)" }}>
        <div className="mx-auto max-w-6xl">
          <h2 id="left-heading" className="text-center text-fg" style={{ fontSize: "var(--text-h3)", lineHeight: 1.1 }}>
            What the team left with
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {item.leftWith.map((line) => (
              <li key={line} className="flex items-start gap-4 rounded-md border border-emerald/20 bg-surface-light p-6">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald text-fg-on-dark">
                  <Check aria-hidden className="size-4" strokeWidth={3} />
                </span>
                <span className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.3 }}>
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. In their words: only when there is an approved quote */}
      {item.quotes.length ? (
        <section className="bg-surface-dark" aria-label="In their words" style={{ padding: "clamp(64px, 8vw, 112px) var(--section-px)" }}>
          <div className="mx-auto max-w-5xl">
            <SectionMark tone="dark">In their words</SectionMark>
            <div className="mt-10">
              <TestimonialCarousel quotes={item.quotes} />
            </div>
          </div>
        </section>
      ) : null}

      {/* 7. Quick answers (also in the page's FAQ schema) */}
      <section className="bg-surface-accent-soft" aria-labelledby="quick-heading" style={{ padding: "clamp(64px, 8vw, 112px) var(--section-px)" }}>
        <div className="mx-auto max-w-4xl">
          <h2 id="quick-heading" className="text-fg" style={{ fontSize: "var(--text-h3)", lineHeight: 1.1 }}>
            Quick answers
          </h2>
          <div className="mt-8 grid gap-4">
            {item.faqs.map((faq) => (
              <div key={faq.q} className="rounded-md border border-emerald/20 bg-surface-light p-6">
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.3, letterSpacing: "var(--tracking-body)" }}>
                  {faq.q}
                </h3>
                <p className="mt-2 text-fg-2" style={{ fontSize: "calc(var(--text-body) - 1px)", lineHeight: 1.5, letterSpacing: "var(--tracking-body)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. More works: the next two cases */}
      <section className="bg-bg" aria-labelledby="more-heading" style={{ padding: "clamp(64px, 8vw, 112px) var(--section-px)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between gap-4">
            <h2 id="more-heading" className="text-fg" style={{ fontSize: "var(--text-h3)", lineHeight: 1.1 }}>
              More works
            </h2>
            <Link href="/work" className="inline-flex min-h-11 items-center font-display font-semibold text-emerald underline decoration-emerald/35 underline-offset-4" style={{ fontSize: "var(--text-small)" }}>
              All works
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((other) => (
              <WorkCard key={other.slug} item={other} size="large" />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Call to action */}
      <section className="bg-surface-dark" aria-labelledby="cta-heading" style={{ padding: "clamp(64px, 8vw, 112px) var(--section-px)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="cta-heading" className="text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}>
            Want this for your team?
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <ContactCta tone="green" />
            <Link href={category.href} className="inline-flex min-h-11 items-center font-display font-semibold text-green underline decoration-green/40 underline-offset-4" style={{ fontSize: "var(--text-small)" }}>
              See how {category.label} works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { OG_IMAGE, ogImage, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { BrandButton } from "@/components/ui/brand-button";
import { deliveryReady } from "@/lib/deliver";
import ContactForm from "@/components/forms/ContactForm";
import { SectionMark } from "@/components/ui/section-mark";
import { CONTACT } from "@/lib/site-content";

const DESCRIPTION =
  "Tell us about your team and the work it repeats. We reply within one working day by email, phone or WhatsApp.";

export const metadata = {
  ...pageMeta({ path: "/contact", title: "Contact Elyst AI: Get in Touch", description: DESCRIPTION, image: ogImage("contact", OG_IMAGE) }),
  title: { absolute: "Contact Elyst AI: Get in Touch" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd data={[webPageSchema({ path: "/contact", name: "Contact Elyst AI: Get in Touch", description: DESCRIPTION, type: "ContactPage" })]} />
      <section className="bg-bg" style={{ padding: "clamp(60px, 8vw, 120px) var(--section-px) var(--section-py)" }}>
        <div className="mx-auto max-w-7xl">
          <SectionMark>Contact</SectionMark>
          <h1 className="mt-6 max-w-4xl text-balance text-fg" style={{ fontSize: "var(--text-h1)", lineHeight: 1.05 }}>
            Tell us one task your team repeats every week.
          </h1>
          <p className="mt-5 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
            We reply within one working day.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="rounded-md border-2 border-emerald/25 bg-surface-light p-6 shadow-card sm:p-9">
              <ContactForm deliveryReady={deliveryReady()} />
            </div>

            <aside aria-label="Other ways to reach us" className="grid content-start gap-8">
              <ul className="grid gap-4 text-fg" style={{ fontSize: "var(--text-body)" }}>
                <li className="flex items-center gap-3">
                  <Phone aria-hidden className="size-5 text-emerald" strokeWidth={1.8} />
                  <a href={CONTACT.phoneHref} className="inline-flex min-h-11 items-center font-semibold hover:text-emerald">{CONTACT.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail aria-hidden className="size-5 text-emerald" strokeWidth={1.8} />
                  <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-11 items-center font-semibold hover:text-emerald">{CONTACT.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin aria-hidden className="size-5 text-emerald" strokeWidth={1.8} />
                  <span>{CONTACT.place}</span>
                </li>
              </ul>
              <BrandButton href={CONTACT.whatsappHref} variant="metal" tone="emerald">
                Message us on WhatsApp
              </BrandButton>

              {/* TODO(photo): swap in the founders' photo together. */}
              <figure className="flex items-center gap-4 rounded-md border border-border bg-surface-card p-4">
                <div className="flex shrink-0 overflow-hidden rounded-md">
                  <div className="relative size-20" style={{ background: "var(--elyst-green)" }}>
                    <Image src="/images/founders/shirin-final.webp" alt="Fathima Shirin P" fill sizes="80px" className="object-contain object-bottom" />
                  </div>
                  <div className="relative size-20" style={{ background: "var(--elyst-emerald)" }}>
                    <Image src="/images/founders/nihal-v2.webp" alt="Nihal Anas" fill sizes="80px" className="object-contain object-bottom" />
                  </div>
                </div>
                <figcaption className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.25 }}>
                  You will hear from Nihal or Shirin.
                </figcaption>
              </figure>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

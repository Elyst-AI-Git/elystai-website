import Image from "next/image";
import { MarketingSection, SectionTitle, TextLink } from "@/components/marketing/MarketingPrimitives";

const team = [
  {
    name: "Fathima Shirin P",
    photo: "/images/founders/shirin-v2.webp",
    role: "Co-founder and CEO. Discovery, solution mapping, training.",
  },
  {
    name: "Nihal Anas",
    photo: "/images/founders/nihal-v2.webp",
    role: "Co-founder and Chief AI Officer. Scoping, implementation, handover.",
  },
];

export default function TeamSection() {
  return (
    <MarketingSection>
      <SectionTitle>A team of two, from first call to handover.</SectionTitle>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {team.map((person) => (
          <article key={person.name} className="overflow-hidden rounded-card border border-border bg-white shadow-card">
            <div className="relative aspect-[4/3] bg-surface-muted">
              <Image src={person.photo} alt={person.name} fill className="object-contain object-bottom" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-fg" style={{ fontSize: "var(--text-h3)" }}>{person.name}</h3>
              <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}>{person.role}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 text-center">
        <TextLink href="/about">About Elyst AI</TextLink>
      </div>
    </MarketingSection>
  );
}

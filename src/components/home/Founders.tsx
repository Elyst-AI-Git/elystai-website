import Image from "next/image";
import type { SVGProps } from "react";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.74V1.74C24 .78 23.19 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-2.15.56-2.91.3-.79.72-1.46 1.38-2.12.66-.66 1.33-1.08 2.12-1.38.76-.3 1.64-.5 2.91-.56C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.12-1.38c.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.12A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

export type Founder = {
  name: string;
  photo: string;
  role: string;
  title: string;
  linkedin: string;
  instagram: string;
  description: string;
  identitySide: "left" | "right";
  fill: string;
};

export const founders: Founder[] = [
  {
    name: "Fathima Shirin P",
    photo: "/images/founders/shirin-v2.webp",
    role: "Co-founder",
    title: "CEO",
    linkedin: "https://www.linkedin.com/in/fathimashirin-p/",
    instagram: "https://www.instagram.com/fathimashirin.ai/",
    description:
      "Fathima Shirin P is Co-founder and CEO of Elyst AI. Her focus for over six years has been the same: turning AI from an abstract idea into a practical skill for people who aren't technical, from founders to functional leads across India and the Middle East. She has trained 3,000+ people through 50+ live sessions across 4+ industries and now leads discovery, training, and adoption for every client Elyst AI works with.",
    identitySide: "right",
    fill: "var(--elyst-green)",
  },
  {
    name: "Nihal Anas",
    photo: "/images/founders/nihal-v2.webp",
    role: "Co-founder",
    title: "Chief AI Officer",
    linkedin: "https://www.linkedin.com/in/nihalanas/",
    instagram: "https://www.instagram.com/nihalanas.ai/",
    description:
      "Nihal Anas is Co-founder and Chief AI Officer of Elyst AI, where he leads the entire AI transformation journey. One of the first AI engineers in Kerala, he has worked across five disciplines in AI, from machine learning and computer vision to natural language processing, generative AI and AI automations. Nihal is focused on building systems that survive handover, so a client's team can run what was built without us.",
    identitySide: "left",
    fill: "var(--elyst-emerald)",
  },
];

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md transition-transform duration-200 hover:scale-110"
      style={{
        background: "linear-gradient(180deg, hsl(160 38% 14%) 0%, hsl(160 38% 8%) 55%, hsl(160 38% 11%) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "1px solid rgba(0,0,0,0.38)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.26)",
      }}
    >
      {children}
    </a>
  );
}

function FounderStrip({ founder }: { founder: Founder }) {
  const identityOnRight = founder.identitySide === "right";
  const identity = (
    <div
      className={`relative order-1 min-h-[clamp(280px,28vw,420px)] overflow-hidden ${identityOnRight ? "md:order-2" : ""}`}
      style={{ background: founder.fill }}
    >
      <Image
        src={founder.photo}
        alt={founder.name}
        fill
        className="object-contain object-bottom"
        sizes="(min-width: 768px) 50vw, 100vw"
        priority
      />
      <div className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-5 md:p-9 ${identityOnRight ? "items-end text-right" : "items-start text-left"}`}>
        <div className={`flex flex-col gap-1 ${identityOnRight ? "items-end" : "items-start"}`}>
          <span className="inline-block bg-bg px-2 py-1 text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.052488em] text-fg-2">
            {founder.role}
          </span>
          <span className="inline-block bg-bg px-2 py-1 text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.052488em] text-fg-2">
            {founder.title}
          </span>
        </div>
        <div className={`pointer-events-auto flex flex-col gap-3 ${identityOnRight ? "items-end text-right" : "items-start text-left"}`}>
          <h2
            className="bg-bg px-2 py-1 font-display font-bold text-fg"
            style={{ fontSize: "var(--text-founder)", lineHeight: 1.15 }}
          >
            {founder.name}
          </h2>
          <div className="flex gap-2">
            <SocialLink href={founder.instagram} label={`${founder.name} on Instagram`}>
              <InstagramIcon className="h-4 w-4 text-white" />
            </SocialLink>
            <SocialLink href={founder.linkedin} label={`${founder.name} on LinkedIn`}>
              <LinkedinIcon className="h-4 w-4 text-white" />
            </SocialLink>
          </div>
        </div>
      </div>
    </div>
  );

  const description = (
    <div className={`order-2 flex min-h-[clamp(280px,28vw,420px)] items-center bg-bg px-8 py-8 md:px-[8vw] md:py-10 ${identityOnRight ? "md:order-1" : ""}`}>
      <p className="max-w-xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
        {founder.description}
      </p>
    </div>
  );

  return (
    <article className="grid border-b border-border first:border-t md:grid-cols-2">
      {founder.identitySide === "right" ? (
        <>
          {description}
          {identity}
        </>
      ) : (
        <>
          {identity}
          {description}
        </>
      )}
    </article>
  );
}

export default function Founders() {
  return (
    <section className="bg-bg">
      <div>
        {founders.map((founder) => (
          <FounderStrip key={founder.name} founder={founder} />
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DitheringShader from "@/components/site/DitheringShader";

const founders = [
  {
    name: "Nihal Anas",
    initials: "NA",
    photo: "/images/founders/nihal.jpg",
    role: "Chief AI Officer · AIOS",
    bio: "Builds and deploys AIOS for SMEs across India and the GCC.",
    linkedin: "#",
    cta: "Work with Nihal",
    href: "/aios",
  },
  {
    name: "Fathima Shirin P",
    initials: "FS",
    photo: "/images/founders/shirin.jpg",
    role: "CEO · AI Accelerator",
    bio: "Leads live AI learning programs for professionals and students.",
    linkedin: "#",
    cta: "Learn with Shirin",
    href: "/learn",
  },
];

function FounderCard({ f }: { f: (typeof founders)[number] }) {
  return (
    <div className="group overflow-hidden rounded-[24px] bg-bg shadow-card">
      <div className="relative h-80 overflow-hidden">
        {/* Default layer: initials + dithering (materialising) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "var(--emerald-tint-10)" }}
        >
          <span className="font-display text-hero font-bold text-emerald/30">
            {f.initials}
          </span>
          <div className="absolute inset-0 opacity-80 mix-blend-multiply">
            <DitheringShader speed={0.5} scale={0.9} pixelSize={4} />
          </div>
        </div>

        {/* Real photo — crossfades in on hover (and always on mobile/touch) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.photo}
          alt={f.name}
          className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 max-md:opacity-100"
        />
      </div>

      <div className="flex flex-col gap-1 p-6">
        <h3 className="text-fg" style={{ fontSize: "var(--text-h3)" }}>
          {f.name}
        </h3>
        <p className="text-small font-medium text-emerald">{f.role}</p>
        <p className="mt-1 text-small text-fg-2">{f.bio}</p>
        <div className="mt-4 flex items-center justify-between">
          <a
            href={f.linkedin}
            className="text-small text-fg-3 underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <Link
            href={f.href}
            className="inline-flex items-center gap-1.5 text-small font-bold text-emerald"
          >
            {f.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Founders() {
  return (
    <section
      className="bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">The founders</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Built by Kerala&apos;s first AI graduates.
          </h2>
          <p
            className="mx-auto mt-4 max-w-prose text-fg-2"
            style={{ fontSize: "var(--text-body)" }}
          >
            Two people from Kozhikode building for India and the GCC — both arms
            of Elyst grow from the same foundation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <FounderCard key={f.name} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

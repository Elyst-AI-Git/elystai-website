import Image from "next/image";
import FaqList, { type Faq } from "@/components/marketing/FaqList";
import { ArtifactFrame, CtaBand, FounderStrip, PageThesis, ResponsibilityMap } from "@/components/marketing/WorkflowVisuals";
import { BodyText, MarketingEyebrow, MarketingSection, SectionTitle } from "@/components/marketing/MarketingPrimitives";

function FounderPairVisual() {
  return (
    <div className="rounded-card bg-emerald p-5 shadow-card md:p-7">
      <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
        <div>
          <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-green">People on the delivery chain</p>
          <p className="mt-2 font-display font-bold text-fg-on-dark" style={{ fontSize: "var(--text-h3)" }}>The people who scope it do the work.</p>
        </div>
        <span className="rounded-full border border-green/35 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-green">2 founders</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          { name: "Fathima Shirin P", role: "Discovery · training · adoption", image: "/images/founders/shirin-v2.webp" },
          { name: "Nihal Anas", role: "Technical scope · build · handover", image: "/images/founders/nihal-v2.webp" },
        ].map((person) => (
          <div key={person.name} className="overflow-hidden rounded-lg border border-white/12 bg-black/10">
            <div className="relative h-44 bg-white/5"><Image src={person.image} alt={`${person.name}, ${person.role}`} fill className="object-contain object-bottom" sizes="(min-width: 768px) 240px, 45vw" /></div>
            <div className="p-4"><p className="font-display font-bold text-fg-on-dark" style={{ fontSize: "var(--text-small)" }}>{person.name}</p><p className="mt-2 text-fg-muted-dark" style={{ fontSize: "var(--text-label)", lineHeight: 1.4 }}>{person.role}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-green p-4 text-ink"><p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.13em]">Then the client owner takes control</p><p className="mt-2 font-display font-bold" style={{ fontSize: "var(--text-small)" }}>One accountable delivery chain. No sales handoff to an unknown team.</p></div>
    </div>
  );
}
const principles = [
  ["What AI does", "Prepare, classify, retrieve, or draft within an agreed boundary."],
  ["What a person decides", "Approve high-impact actions, exceptions, and anything unclear."],
  ["What data is used", "Only the source material the workflow needs and the client approves."],
  ["What failure looks like", "A visible pause, fallback, or out-of-scope state—not a confident guess."],
  ["Who owns it afterwards", "A named client owner with access, runbook, limits, and escalation."],
];

const aboutFaqs: Faq[] = [
  { question: "Who will actually work on the engagement?", answer: "The two founders on this page stay close to discovery, technical decisions, implementation, training, and handover. The exact involvement is written into the scope." },
  { question: "Why work with a small team?", answer: "It keeps context close and makes responsibility visible. It also means we take on only work where the founders can remain involved." },
  { question: "Are you an AI tool vendor?", answer: "No. We decide what the workflow needs, use approved tools where they fit, and build only when a bounded system is useful." },
  { question: "Where are you based?", answer: "Kozhikode, Kerala, India. We work remotely and agree any on-site delivery or travel in advance." },
  { question: "How do I start?", answer: "Bring one repeated workflow to an audit call. We will understand the owner, source material, stall point, and useful next step." },
];

export default function AboutPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <PageThesis
        eyebrow="About Elyst AI"
        title="Your AI partner, from the first question to handover."
        description="The two people on this page handle discovery, technical decisions, implementation, training, and ownership. We stay close to the work so the client knows who is responsible."
        note="We are a small team by design: selective enough to stay involved, broad enough to cover the full delivery chain."
        visual={<FounderPairVisual />}
      />

      <div id="founders" className="scroll-mt-28">
        <FounderStrip
          name="Fathima Shirin P"
          role="Co-founder and CEO"
          eyebrow="Discovery + adoption"
          image="/images/founders/shirin-v2.webp"
          surface="green"
          linkedin="https://www.linkedin.com/in/fathimashirin-p/"
          bio="Shirin leads the part of the work where a business problem becomes a clear, usable plan. She owns discovery, solution mapping, training, and the adoption boundary—so the people expected to use a system can see why it belongs in their work."
        />
        <FounderStrip
          name="Nihal Anas"
          role="Co-founder and Chief AI Officer"
          eyebrow="Technical scope + handover"
          image="/images/founders/nihal-v2.webp"
          surface="emerald"
          side="right"
          linkedin="https://www.linkedin.com/in/nihalanas/"
          bio="Nihal leads the technical boundary from a mapped workflow to a tested system. He owns technical scoping, implementation, deployment, and handover—making limits, exceptions, access, and the client’s operating path explicit."
        />
      </div>

      <MarketingSection>
        <div className="max-w-3xl">
          <MarketingEyebrow>Responsibility map</MarketingEyebrow>
          <SectionTitle className="mt-6">Two founders. One accountable delivery chain.</SectionTitle>
          <BodyText className="mt-5">Discovery passes into technical scope, build moves through client review, and handover ends with the client owner in control.</BodyText>
        </div>
        <div className="mt-10">
          <ResponsibilityMap
            rows={[
              { phase: "Discover", shirin: "Surface the operational problem", nihal: "Check technical context", client: "Share the workflow and owner" },
              { phase: "Decide", shirin: "Shape the useful outcome", nihal: "Define safe technical boundary", client: "Approve scope and measure" },
              { phase: "Build", shirin: "Keep the work usable", nihal: "Implement and test", client: "Review representative cases" },
              { phase: "Handover", shirin: "Train and support adoption", nihal: "Transfer access and runbook", client: "Own daily operation and exceptions" },
            ]}
          />
        </div>
      </MarketingSection>

      <MarketingSection tone="muted">
        <div className="max-w-3xl">
          <MarketingEyebrow>Operating principles</MarketingEyebrow>
          <SectionTitle className="mt-6">The trade-offs we make visible.</SectionTitle>
          <BodyText className="mt-5">These are not abstract values. They are the questions we keep in the project brief before anyone calls a demo a result.</BodyText>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {principles.map(([label, body], index) => <article key={label} className={`rounded-card border p-5 ${index === 1 ? "border-emerald bg-emerald text-fg-on-dark" : "border-border bg-white shadow-card"}`}><span className={`font-mono text-[0.66rem] font-bold ${index === 1 ? "text-green" : "text-emerald"}`}>0{index + 1}</span><h3 className={`mt-7 font-display font-bold ${index === 1 ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-small)", lineHeight: 1.3 }}>{label}</h3><p className={`mt-3 ${index === 1 ? "text-fg-on-dark/80" : "text-fg-2"}`} style={{ fontSize: "var(--text-label)", lineHeight: 1.5 }}>{body}</p></article>)}
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
          <div>
            <MarketingEyebrow>Company facts</MarketingEyebrow>
            <SectionTitle className="mt-6">Based in Kerala. Built to work across teams.</SectionTitle>
            <BodyText className="mt-5">A truthful footprint is more useful than an inflated one. We publish what a client needs to verify and contact us.</BodyText>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Base", "Kozhikode, Kerala, India"],
              ["Delivery", "Remote-first; on-site by agreement"],
              ["Focus", "Workflow implementation and practical AI training"],
              ["Contact", "info@elystai.com · +91 96332 88931"],
            ].map(([label, value]) => <div key={label} className="rounded-card border border-border bg-white p-5 shadow-card"><p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-emerald">{label}</p><p className="mt-4 text-fg" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>{value}</p></div>)}
          </div>
        </div>
      </MarketingSection>

      <MarketingSection tone="muted">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <MarketingEyebrow>Proof of people</MarketingEyebrow>
            <SectionTitle className="mt-6">How we make one decision together.</SectionTitle>
            <BodyText className="mt-5">Shirin surfaces the operational problem. Nihal defines the safe technical boundary. The client owner approves the change and takes control.</BodyText>
          </div>
          <ArtifactFrame status="Demonstration" label="responsibility example" title="The two-person model is useful only when the handoffs are explicit." footer="Representative delivery model · no client result implied">
            <div className="space-y-3">
              {["Problem: what work is actually leaking?", "Boundary: what may AI prepare, and where must it stop?", "Decision: who approves the change?", "Ownership: who runs it and handles exceptions?"].map((item, index) => <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-surface-muted p-4"><span className="font-mono text-[0.65rem] font-bold text-emerald">0{index + 1}</span><span>{item}</span></div>)}
            </div>
          </ArtifactFrame>
        </div>
      </MarketingSection>

      <FaqList faqs={aboutFaqs} />

      <CtaBand
        eyebrow="Speak to the people doing the work"
        title="Bring us one workflow."
        description="Bring the task that takes too long. We will tell you whether AI is the answer and who should own the next step."
        label="Book an audit call"
        intent="audit"
        promptChips={["The workflow", "The owner", "The stall point", "The useful outcome"]}
      />
    </main>
  );
}

import {
  Building2,
  GraduationCap,
  Truck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const industries: { label: string; Icon: LucideIcon }[] = [
  { label: "Real estate", Icon: Building2 },
  { label: "Staffing", Icon: UsersRound },
  { label: "Education", Icon: GraduationCap },
  { label: "Logistics", Icon: Truck },
];

function BusinessMarkers() {
  return (
    <div className="mt-5 flex max-w-sm items-center gap-1.5" aria-hidden>
      {Array.from({ length: 10 }, (_, index) => (
        <span key={index} className="flex flex-1 items-center gap-1.5">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: index === 9 ? "var(--elyst-green)" : "rgba(0,223,130,0.46)" }}
          />
          {index < 9 && <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.12)" }} />}
        </span>
      ))}
    </div>
  );
}

function IndustryMarkers() {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
      {industries.map(({ label, Icon }) => (
        <li
          key={label}
          className="flex items-center gap-2.5 border-t pt-3"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <Icon className="h-4 w-4 shrink-0 text-green" strokeWidth={1.8} aria-hidden />
          <span className="font-medium text-white" style={{ fontSize: "var(--text-small)" }}>
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Metric({
  index,
  value,
  label,
  children,
}: {
  index: string;
  value: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <article className="px-6 py-6 sm:px-8 sm:py-7 lg:px-10">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-end gap-3">
          <span
            className="font-display font-bold text-green"
            style={{ fontSize: "var(--text-stat-compact)", lineHeight: 0.86, letterSpacing: "var(--tracking-stat-compact)" }}
          >
            {value}
          </span>
          <p
            className="max-w-[11rem] pb-0.5 font-display font-semibold text-white"
            style={{ fontSize: "var(--text-small)", lineHeight: 1.15 }}
          >
            {label}
          </p>
        </div>
        <span className="font-display" style={{ color: "rgba(255,255,255,0.35)", fontSize: "var(--text-micro)" }}>
          {index}
        </span>
      </div>
      {children}
    </article>
  );
}

export default function ProofBar() {
  return (
    <section className="bg-bg" aria-label="Elyst AI experience" style={{ padding: "clamp(32px, 5vw, 64px) var(--section-px)" }}>
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-md border"
        style={{ borderColor: "rgba(255,255,255,0.09)", background: "var(--surface-dark)" }}
      >
        <div className="border-b px-6 py-3.5 sm:px-8 lg:px-10" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <span
            className="font-display font-bold uppercase text-green"
            style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}
          >
            Proof
          </span>
        </div>

        <div className="grid md:grid-cols-2 md:divide-x" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <Metric index="01 / 02" value="10+" label="Businesses worked with">
            <BusinessMarkers />
          </Metric>

          <div className="border-t md:border-t-0" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.025)" }}>
            <Metric index="02 / 02" value="4+" label="Industries served">
              <IndustryMarkers />
            </Metric>
          </div>
        </div>
      </div>
    </section>
  );
}

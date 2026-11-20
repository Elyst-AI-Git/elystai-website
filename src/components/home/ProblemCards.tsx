import type { ReactNode } from "react";

/** Four problem cards on dark green, each with a small picture of the problem. */

const G = "var(--elyst-green)";
const LINE = "#3d6b5b";
const PANEL = "#16352b";
const MUTED = "#9db8ad";

function AppsNobodyOpens() {
  const icons = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg viewBox="0 0 200 170" className="w-full" aria-hidden>
      <rect x="40" y="4" width="120" height="162" rx="18" fill={PANEL} stroke={LINE} strokeWidth="2" />
      {icons.map((i) => {
        const x = 56 + (i % 3) * 36;
        const y = 24 + Math.floor(i / 3) * 40;
        const ai = i === 4;
        return (
          <g key={i} className={ai ? "pc-fade" : undefined}>
            <rect x={x} y={y} width="28" height="28" rx="8" fill={ai ? "#0d2a21" : "#244a3d"} stroke={ai ? G : "none"} strokeWidth="1.5" strokeDasharray={ai ? "3 3" : undefined} />
            {ai ? <path d={`M${x + 14} ${y + 6} l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6z`} fill={G} /> : null}
            {!ai && i % 2 === 0 ? <circle cx={x + 26} cy={y + 2} r="5" fill="#e7776a" /> : null}
          </g>
        );
      })}
      <circle cx="152" cy="82" r="11" fill={PANEL} stroke={G} strokeWidth="1.5" />
      <text x="152" y="86.5" textAnchor="middle" fill={G} className="font-display" style={{ fontSize: "12px", fontWeight: 700 }}>0</text>
    </svg>
  );
}

function SameTasksByHand() {
  const days = ["M", "T", "W", "T", "F"];
  const rows = ["Copy", "Paste", "Send"];
  return (
    <svg viewBox="0 0 200 170" className="w-full" aria-hidden>
      {days.map((d, c) => {
        const x = 8 + c * 38;
        return (
          <g key={c}>
            <text x={x + 17} y="16" textAnchor="middle" fill={MUTED} className="font-display" style={{ fontSize: "10px", fontWeight: 700 }}>{d}</text>
            {rows.map((r, i) => (
              <g key={r} className="pc-sweep" style={{ animationDelay: `${c * 0.35 + i * 0.12}s` }}>
                <rect x={x} y={26 + i * 40} width="34" height="32" rx="7" fill={PANEL} stroke={LINE} strokeWidth="1.5" />
                <text x={x + 17} y={46 + i * 40} textAnchor="middle" fill="#d6e6de" className="font-display" style={{ fontSize: "9px", fontWeight: 600 }}>{r}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function FollowUpsInHead() {
  const notes = [
    { x: 58, y: 22, r: -8, t: "Call back" },
    { x: 96, y: 14, r: 5, t: "Send quote" },
    { x: 70, y: 52, r: 4, t: "Chase" },
    { x: 108, y: 48, r: -6, t: "Remind" },
  ];
  return (
    <svg viewBox="0 0 200 170" className="w-full" aria-hidden>
      <g transform="translate(26 0)">
      <circle cx="48" cy="114" r="20" fill={G} />
      <path d="M12 166 a36 30 0 0 1 72 0z" fill={G} />
      <ellipse cx="94" cy="44" rx="54" ry="38" fill={PANEL} stroke={LINE} strokeWidth="2" />
      <circle cx="58" cy="88" r="5" fill={PANEL} stroke={LINE} strokeWidth="2" />
      <circle cx="52" cy="98" r="3" fill={PANEL} stroke={LINE} strokeWidth="2" />
      {notes.map((n, i) => (
        <g key={n.t} className="pc-blink" style={{ animationDelay: `${i * 0.7}s` }} transform={`rotate(${n.r} ${n.x + 22} ${n.y + 10})`}>
          <rect x={n.x - 12} y={n.y - 2} width="44" height="22" rx="3" fill="#ffe9a8" />
          <text x={n.x + 10} y={n.y + 12} textAnchor="middle" fill="#6b5a1f" className="font-display" style={{ fontSize: "8px", fontWeight: 700 }}>{n.t}</text>
        </g>
      ))}
      </g>
    </svg>
  );
}

function ReportsTakeADay() {
  return (
    <svg viewBox="0 0 200 170" className="w-full" aria-hidden>
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={10 + (i % 4) * 19} y={14 + Math.floor(i / 4) * 17} width="16" height="13" rx="2" fill={i % 5 === 0 ? "#2f7d62" : "#244a3d"} />
      ))}
      <path d="M92 52 h22" stroke={LINE} strokeWidth="2" strokeDasharray="3 4" />
      <path d="M118 48 l8 4 -8 4z" fill={LINE} />
      <rect x="132" y="12" width="58" height="82" rx="6" fill={PANEL} stroke={LINE} strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="140" y={22 + i * 11} width={i === 0 ? 30 : 42} height="5" rx="2.5" fill={i === 0 ? G : "#2e5546"} />
      ))}
      <text x="10" y="118" fill={MUTED} className="font-display" style={{ fontSize: "9px", fontWeight: 700 }}>9:00</text>
      <text x="190" y="118" textAnchor="end" fill={MUTED} className="font-display" style={{ fontSize: "9px", fontWeight: 700 }}>18:00</text>
      <rect x="10" y="124" width="180" height="14" rx="7" fill="#244a3d" />
      <rect x="10" y="124" width="180" height="14" rx="7" fill={G} className="pc-fill" />
    </svg>
  );
}

const CARDS: readonly { n: string; title: string; visual: ReactNode }[] = [
  { n: "01", title: "AI features and apps that no one opens.", visual: <AppsNobodyOpens /> },
  { n: "02", title: "The same tasks done by hand every week", visual: <SameTasksByHand /> },
  { n: "03", title: "Follow-ups that live in one person's head", visual: <FollowUpsInHead /> },
  { n: "04", title: "Reports that take a day to put together", visual: <ReportsTakeADay /> },
];

export default function ProblemCards() {
  return (
    <ul className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
      {CARDS.map((card) => (
        <li
          key={card.n}
          className="flex min-h-[22rem] flex-col rounded-[0.875rem] border border-emerald/40 bg-surface-dark px-6 pb-7 pt-6"
        >
          <span className="font-display font-bold text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
            {card.n}
          </span>
          <div className="mx-auto flex w-full max-w-[19rem] flex-1 items-center py-12">{card.visual}</div>
          <p className="text-center font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.22 }}>
            {card.title}
          </p>
        </li>
      ))}
    </ul>
  );
}

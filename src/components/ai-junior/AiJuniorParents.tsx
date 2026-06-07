"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Reshmi",
    role: "AI for Juniors Parent",
    text: "My son attended the program and really enjoyed it. The sessions were fun, engaging, and kept him actively involved throughout. He loved creating his own superhero-style images and even built a simple website using the Lovable app, which was a big highlight. Overall, it's a great program that encourages kids to be creative and actually build things with AI.",
    initials: "R",
    color: "var(--elyst-emerald)",
  },
  {
    name: "Saleena",
    role: "AI for Juniors Parent",
    text: "As a parent, I was happy to see my son so involved during the AI session. He got practical experience with posters, videos and website designing. He knows a bit already, but this still gave him a fresh perspective and boosted his interest. A good initiative for young learners.",
    initials: "S",
    color: "var(--elyst-emerald-light)",
  },
  {
    name: "Anusha",
    role: "AI for Juniors Parent",
    text: "Thank you Elyst AI for your guidance to understand the basics of AI. I think my son got an idea about the language of the future. Prompt creation, web design using AI — so interesting for basic students. They can use these tools in many situations.",
    initials: "A",
    color: "var(--elyst-green-mid)",
  },
];

const CARD_STYLES = [
  { transform: "translateY(0px) rotate(0deg) scale(1)", zIndex: 3, boxShadow: "var(--shadow-card-hover)" },
  { transform: "translateY(14px) translateX(-6px) rotate(-3.5deg) scale(0.955)", zIndex: 2, boxShadow: "var(--shadow-card)" },
  { transform: "translateY(26px) translateX(6px) rotate(3.5deg) scale(0.915)", zIndex: 1, boxShadow: "0 2px 12px rgba(3,98,76,0.07)" },
];

export default function AiJuniorParents() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(advance, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance]);

  const handleClick = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    advance();
    timerRef.current = setInterval(advance, 5000);
  };

  return (
    <section className="bg-surface-muted" style={{ padding: "var(--section-py) var(--section-px)", overflow: "hidden" }}>
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">What Parents Say</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
            Real results the parents saw.
          </h2>
          <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
            Every card is a story from someone who started exactly where you are now.
          </p>
        </div>

        <div
          onClick={handleClick}
          className="relative mx-auto mt-14 cursor-pointer"
          style={{ width: "100%", maxWidth: 620, height: "clamp(360px, 65vw, 420px)" }}
        >
          {testimonials.map((t, i) => {
            const pos = (i - active + testimonials.length) % testimonials.length;
            const style = CARD_STYLES[pos] ?? CARD_STYLES[2];
            const scrimOpacity = pos === 1 ? 0.3 : pos === 2 ? 0.55 : 0;
            return (
              <div
                key={t.name}
                className="absolute inset-0 flex select-none flex-col gap-4 overflow-hidden rounded-[20px] border border-border bg-white p-7"
                style={{ ...style, transition: "transform 0.58s cubic-bezier(0.4,0,0.2,1), box-shadow 0.58s ease" }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[20px]"
                  style={{ background: `rgba(255,255,255,${scrimOpacity})`, transition: "background 0.58s ease", zIndex: 1 }}
                />
                <Quote className="h-8 w-8" style={{ color: "var(--elyst-green)" }} />
                <p className="flex-1 text-fg-2" style={{ fontSize: "0.92rem", lineHeight: 1.6 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5 border-t border-border pt-3.5">
                  <span
                    className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-fg-on-dark"
                    style={{ background: t.color, fontSize: "0.85rem" }}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-display font-bold text-fg" style={{ fontSize: "0.95rem" }}>{t.name}</p>
                    <p className="text-fg-3" style={{ fontSize: "0.8rem" }}>{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" style={{ color: "var(--elyst-green)" }} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={(e) => { e.stopPropagation(); handleClick(); }}
              className="h-2 w-2 rounded-full transition-all"
              style={{
                background: i === active ? "var(--elyst-emerald)" : "var(--green-tint-15)",
                transform: i === active ? "scale(1.25)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "AI Yathra finally made GenAI click for me — practical, in my own language, and taught by people who clearly build this stuff.",
    by: "Participant, AI Yathra 2.0"
  },
  {
    tempId: 1,
    testimonial: "The community keeps me current without the noise. I get the updates that matter and people to actually talk through them with.",
    by: "Member, the Circle"
  },
  {
    tempId: 2,
    testimonial: "I went from occasionally using AI to working with it every day. The live sessions made all the difference.",
    by: "Working professional, Kozhikode"
  },
  {
    tempId: 3,
    testimonial: "Learning in Malayalam and English meant nothing got lost in translation. It felt built for us, not adapted for us.",
    by: "Participant, AI Yathra 2.0"
  },
  {
    tempId: 4,
    testimonial: "You can tell they ship real AI for a living — the examples were from actual work, not slides.",
    by: "Professional, GCC"
  },
  {
    tempId: 5,
    testimonial: "I came in nervous about falling behind. I left genuinely confident using AI in my own field.",
    by: "Member, the Circle"
  },
  {
    tempId: 6,
    testimonial: "The pace was right for working people. Live, hands-on, and you could ask anything.",
    by: "Working professional, Kerala"
  },
  {
    tempId: 7,
    testimonial: "Being first to hear what's coming — and learning alongside people who build it — is why I stay in the community.",
    by: "Member, the Circle"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

// Warm, paper-note palette — deliberately NOT brand-emerald. A "note left
// behind" should look and feel like paper with ink on it; the only brand
// colour that survives is a thin emerald edge marking the centre note as
// "currently being read," plus the emerald signature line (which already
// carries the brand through the rest of the page).
const PAPER = "#FBF6EC";
const PAPER_MUTED = "#F4EFE2";
const INK = "#2E2B26";
const INK_MUTED = "#6B6457";
const RULE_LINE = "rgba(120, 110, 95, 0.16)";

/** Faint ruled-notebook lines + a soft paper-grain wash, layered as backgrounds. */
function paperBackground(base: string) {
  return [
    `repeating-linear-gradient(to bottom, transparent 0px, transparent 30px, ${RULE_LINE} 31px, transparent 32px)`,
    `radial-gradient(ellipse 140% 90% at 18% 8%, rgba(255,255,255,0.5), transparent 60%)`,
    base,
  ].join(", ");
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;
  // A small, stable per-note tilt derived from its id — so each "note" rests
  // at its own slightly-askew angle, like someone actually set it down,
  // rather than a uniform mechanical stagger.
  const restTilt = ((testimonial.tempId * 53) % 5) - 2;

  return (
    <div
      onClick={() => handleMove(position)}
      className="absolute left-1/2 top-1/2 cursor-pointer p-8 transition-all duration-500 ease-in-out"
      style={{
        width: cardSize,
        height: cardSize,
        color: isCenter ? INK : INK_MUTED,
        background: paperBackground(isCenter ? PAPER : PAPER_MUTED),
        border: `3px solid ${isCenter ? "var(--elyst-emerald)" : "rgba(120,110,95,0.28)"}`,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${(isCenter ? 0 : position % 2 ? 2.5 : -2.5) + restTilt}deg)
        `,
        boxShadow: isCenter
          ? "0 18px 38px -14px rgba(46,43,38,0.35)"
          : "0 8px 22px -14px rgba(46,43,38,0.25)",
      }}
    >
      {/* Folded-corner crease — reinforced with a soft shadow so it reads as
          paper catching light, not a flat graphic cut. */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          background: "rgba(120,110,95,0.3)",
          boxShadow: "0 1px 3px rgba(46,43,38,0.18)",
        }}
      />
      <h3
        className="font-handwrite"
        style={{
          fontSize: "clamp(1.2rem, 1.6vw + 0.9rem, 1.65rem)",
          lineHeight: 1.6,
          fontWeight: 400,
          color: "inherit",
        }}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className="absolute bottom-8 left-8 right-8 mt-2 text-base font-semibold not-italic"
        style={{ color: "var(--elyst-emerald)" }}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/30"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
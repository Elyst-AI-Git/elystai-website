"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TextOpacityEnum = "none" | "soft" | "medium";
type ViewTypeEnum = "word" | "letter";

type TextGradientScrollProps = {
  text: string;
  type?: ViewTypeEnum;
  className?: string;
  textOpacity?: TextOpacityEnum;
};

/**
 * Text that lights up as it scrolls through the middle of the screen.
 *
 * One scroll listener per line, only attached while the line is near the
 * viewport. It sets opacity directly on the highlighted spans, so scrolling
 * never re-renders React. Reduced motion shows the final state.
 */
function TextGradientScroll({ text, className, type = "letter", textOpacity = "soft" }: TextGradientScrollProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("text-gradient-scroll--enhanced");

    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-range]")).map((node) => {
      const [start, end] = (node.dataset.range ?? "0,1").split(",").map(Number);
      return { node, start, end };
    });
    const apply = (progress: number) => {
      for (const { node, start, end } of nodes) {
        node.style.opacity = String(Math.min(1, Math.max(0, (progress - start) / (end - start))));
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      // 0 when the line's top reaches the middle of the screen, 1 when its bottom does.
      apply(Math.min(1, Math.max(0, (window.innerHeight / 2 - rect.top) / rect.height)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
          // Settle at the right end state once the line has left the screen.
          update();
        }
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className={cn("text-gradient-scroll relative m-0 text-center", className)}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;

        return type === "word" ? (
          <span key={`${word}-${index}`} className="relative mt-2 me-2 inline-block last:me-0">
            <span>{word}</span>
            <span aria-hidden data-char={word} data-range={`${start},${end}`} className="text-gradient-scroll__active absolute inset-0" style={{ opacity: 0 }} />
          </span>
        ) : (
          <span key={`${word}-${index}`} className="relative mt-2 me-2 inline-block last:me-0">
            {word.split("").map((char, charIndex) => {
              const step = (end - start) / word.length;
              return (
                <span key={`char-${charIndex}`} className="relative inline-block">
                  <span className="text-gradient-scroll__base" data-text-opacity={textOpacity}>
                    {char}
                  </span>
                  <span
                    aria-hidden
                    data-char={char}
                    data-range={`${start + charIndex * step},${start + (charIndex + 1) * step}`}
                    className="text-gradient-scroll__active absolute inset-0"
                    style={{ opacity: 0 }}
                  />
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

export { TextGradientScroll };

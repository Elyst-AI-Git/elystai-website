"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type TextOpacityEnum = "none" | "soft" | "medium";
type ViewTypeEnum = "word" | "letter";

type TextGradientScrollProps = {
  text: string;
  type?: ViewTypeEnum;
  className?: string;
  textOpacity?: TextOpacityEnum;
};

type LetterProps = {
  children: string;
  progress: MotionValue<number>;
  range: number[];
  reducedMotion: boolean | null;
};

type WordProps = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
  reducedMotion: boolean | null;
};

type CharProps = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
  reducedMotion: boolean | null;
};

type TextGradientScrollContextType = {
  textOpacity?: TextOpacityEnum;
  type?: ViewTypeEnum;
};

const TextGradientScrollContext = createContext<TextGradientScrollContextType>({});

function TextGradientScroll({
  text,
  className,
  type = "letter",
  textOpacity = "soft",
}: TextGradientScrollProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const words = text.split(" ");

  useEffect(() => {
    ref.current?.classList.add("text-gradient-scroll--enhanced");
  }, []);

  return (
    <TextGradientScrollContext.Provider value={{ textOpacity, type }}>
      <p
        ref={ref}
        aria-label={text}
        className={cn(
          "text-gradient-scroll relative m-0 flex flex-wrap justify-center",
          className,
        )}
      >
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 1 / words.length;

          return type === "word" ? (
            <Word key={`${word}-${index}`} progress={scrollYProgress} range={[start, end]} reducedMotion={reducedMotion}>
              {word}
            </Word>
          ) : (
            <Letter key={`${word}-${index}`} progress={scrollYProgress} range={[start, end]} reducedMotion={reducedMotion}>
              {word}
            </Letter>
          );
        })}
      </p>
    </TextGradientScrollContext.Provider>
  );
}

export { TextGradientScroll };

const Word = ({ children, progress, range, reducedMotion }: WordProps) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mt-2 me-2 inline-block">
      <span aria-hidden>{children}</span>
      <motion.span
        aria-hidden
        className="text-gradient-scroll__active absolute inset-0"
        style={{ opacity: reducedMotion ? 1 : opacity }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const Letter = ({ children, progress, range, reducedMotion }: LetterProps) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="relative mt-2 me-2 inline-block">
      {children.split("").map((char, index) => {
        const start = range[0] + index * step;
        const end = range[0] + (index + 1) * step;

        return (
          <Char key={`char-${index}`} progress={progress} range={[start, end]} reducedMotion={reducedMotion}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({ children, progress, range, reducedMotion }: CharProps) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useContext(TextGradientScrollContext);

  return (
    <span className="relative inline-block">
      <span aria-hidden className="text-gradient-scroll__base" data-text-opacity={textOpacity}>
        {children}
      </span>
      <motion.span
        aria-hidden
        className="text-gradient-scroll__active absolute inset-0"
        style={{ opacity: reducedMotion ? 1 : opacity }}
      >
        {children}
      </motion.span>
    </span>
  );
};

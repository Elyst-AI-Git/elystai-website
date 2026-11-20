"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorOnType?: boolean;
  cursorChar?: string | React.ReactNode;
  cursorClassName?: string;
}

export function Typewriter({
  text,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "|",
  cursorClassName = "ml-1",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentText = texts[currentTextIndex];

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false);
          if (currentTextIndex === texts.length - 1 && !loop) return;
          setCurrentTextIndex((previous) => (previous + 1) % texts.length);
          setCurrentIndex(0);
        } else {
          timeout = setTimeout(() => setDisplayText((previous) => previous.slice(0, -1)), deleteSpeed);
        }
      } else if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((previous) => previous + currentText[currentIndex]);
          setCurrentIndex((previous) => previous + 1);
        }, speed);
      } else if (texts.length > 1) {
        timeout = setTimeout(() => setIsDeleting(true), waitTime);
      }
    };

    if (currentIndex === 0 && !isDeleting && displayText === "") {
      timeout = setTimeout(startTyping, initialDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, currentTextIndex, deleteSpeed, displayText, initialDelay, isDeleting, loop, speed, texts, waitTime]);

  return (
    <span className={cn("inline whitespace-pre-wrap tracking-[-0.0146146275em]", className)}>
      <span>{displayText}</span>
      {showCursor ? (
        <span
          aria-hidden
          className={cn("typewriter-caret", cursorClassName, hideCursorOnType && (currentIndex < texts[currentTextIndex].length || isDeleting) ? "hidden" : "")}
        >
          {cursorChar}
        </span>
      ) : null}
    </span>
  );
}

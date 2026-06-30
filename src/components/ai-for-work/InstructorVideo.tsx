"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";

/**
 * Instructor video — Shirin explaining the program. Loads the YouTube iframe
 * only once the section scrolls into view (no wasted load on page mount),
 * autoplaying unmuted. Note: most browsers (Chrome, Safari, Firefox) block
 * unmuted autoplay unless the visitor has already interacted with the page or
 * the site has a high per-browser "media engagement" score — so on a cold
 * first visit this commonly arrives paused rather than erroring, which is why
 * there's still a play button overlay below as a fallback, sent through the
 * postMessage API so it doesn't reload (and restart) the iframe.
 */

const YOUTUBE_VIDEO_ID = "_g9XH0ArBng";

const SRC = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=0&rel=0&playsinline=1&enablejsapi=1`;

export default function InstructorVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [showPlayFallback, setShowPlayFallback] = useState(false);

  useEffect(() => {
    if (isInView) setShouldLoad(true);
  }, [isInView]);

  // If the browser silently blocked unmuted autoplay, the iframe sits there
  // paused — offer a visible "Play" control after a beat instead of leaving
  // a frozen frame with no way to tell anything is wrong.
  useEffect(() => {
    if (!shouldLoad) return;
    const id = setTimeout(() => setShowPlayFallback(true), 1200);
    return () => clearTimeout(id);
  }, [shouldLoad]);

  const handlePlay = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "*",
    );
    setShowPlayFallback(false);
  };

  return (
    <section
      ref={sectionRef}
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 flex justify-center">
          <SectionMark>Why AI for Work</SectionMark>
        </div>
        <h2
          className="text-fg font-display font-bold leading-none tracking-display mb-8"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Should you join this program?
        </h2>
      </div>

      {/* Video container — 25% wider than the text column above it. */}
      <div className="mx-auto max-w-[960px] text-center">
        <div
          className="relative mx-auto aspect-video w-full overflow-hidden rounded-md"
          style={{ border: "8px solid var(--elyst-emerald)" }}
        >
          {shouldLoad ? (
            <iframe
              ref={iframeRef}
              src={SRC}
              title="Shirin explains the AI for Work program"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0A0F0C]">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
            </div>
          )}

          {shouldLoad && showPlayFallback && (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute bottom-4 right-4 rounded-md bg-[#0A0F0C]/85 px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-white transition hover:bg-[#0A0F0C]"
            >
              Play
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

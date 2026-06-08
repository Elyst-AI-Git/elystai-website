"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const videos = [
  { name: "Fathima Akleema", role: "Grade 5", src: "/media/ai-junior/student-video-1.mp4" },
  { name: "Aradhya", role: "Grade 6", src: "/media/ai-junior/student-video-2.mp4" },
];

const audios = [
  { name: "Farha", role: "Grade 9", src: "/media/ai-junior/student-audio-1.ogg", rotate: -1.5 },
  { name: "Anjana", role: "Grade 5", src: "/media/ai-junior/student-audio-2.ogg", rotate: 1.5 },
];

// Fixed waveform pattern — alternating bar heights for a static, balanced look
const WAVE_HEIGHTS = [9, 16, 11, 20, 13, 18, 10, 16, 12, 20];

function AudioCard({ a, i }: { a: (typeof audios)[number]; i: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
      className="flex items-center gap-5 rounded-[24px] bg-white p-5 shadow-sm"
      style={{ rotate: a.rotate }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${a.name}'s audio` : `Play ${a.name}'s audio`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-fg-on-dark transition-transform hover:scale-105"
        style={{ background: "var(--elyst-emerald)" }}
      >
        {playing ? (
          <Pause className="h-4 w-4" fill="currentColor" />
        ) : (
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
        )}
      </button>

      <div className="flex h-7 flex-1 items-end gap-[3px] sm:flex-none sm:basis-32">
        {WAVE_HEIGHTS.map((h, j) => (
          <span
            key={j}
            className="w-[3px] rounded-full"
            style={{
              height: `${h}px`,
              background: j % 2 === 0 ? "var(--elyst-green)" : "var(--green-tint-30, rgba(46,200,102,0.35))",
            }}
          />
        ))}
      </div>

      <div className="hidden text-center sm:block sm:flex-1">
        <p className="font-display font-bold text-fg" style={{ fontSize: "1rem" }}>{a.name}</p>
        <p className="text-fg-3" style={{ fontSize: "0.82rem" }}>{a.role}</p>
      </div>

      <div className="ml-auto text-right sm:ml-0 sm:text-right">
        <p className="font-display font-bold text-fg sm:hidden" style={{ fontSize: "0.95rem" }}>{a.name}</p>
        <p className="text-fg-3 sm:hidden" style={{ fontSize: "0.78rem" }}>{a.role}</p>
        <p className="mt-1 font-semibold uppercase text-fg-3 sm:mt-0" style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}>
          Audio
        </p>
      </div>

      <audio
        ref={audioRef}
        src={a.src}
        preload="metadata"
        className="hidden"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </motion.div>
  );
}

export default function AiJuniorStudents() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Student Testimonials</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
            In <span style={{ color: "var(--elyst-green)" }}>their</span> own words.
          </h2>
          <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
            Real reactions from the students themselves.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {videos.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-dark"
              style={{ aspectRatio: "9 / 14" }}
            >
              <video
                src={v.src}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-4">
                <div>
                  <p className="font-display font-bold text-fg-on-dark" style={{ fontSize: "0.95rem" }}>{v.name}</p>
                  <p className="text-fg-muted-dark" style={{ fontSize: "0.78rem" }}>{v.role}</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--elyst-green)" }}>
                  <Play className="h-4 w-4" style={{ color: "var(--elyst-emerald)" }} fill="currentColor" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-14 text-center font-display font-bold text-fg" style={{ fontSize: "1.1rem" }}>
          Also hear from them
        </p>

        <div className="mx-auto mt-7 flex max-w-2xl flex-col gap-5">
          {audios.map((a, i) => (
            <AudioCard key={a.name} a={a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

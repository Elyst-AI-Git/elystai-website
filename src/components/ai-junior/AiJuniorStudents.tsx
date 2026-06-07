"use client";

import { motion } from "framer-motion";
import { Mic, Play } from "lucide-react";

const videos = [
  { name: "Fathima Akleema", role: "Grade 5", src: "/media/ai-junior/student-video-1.mp4" },
  { name: "Aradhya", role: "Grade 6", src: "/media/ai-junior/student-video-2.mp4" },
];

const audios = [
  { name: "Farha", role: "Grade 9", src: "/media/ai-junior/student-audio-1.ogg" },
  { name: "Anjana", role: "Grade 5", src: "/media/ai-junior/student-audio-2.ogg" },
];

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

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {audios.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="card-tint flex flex-col gap-4 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald">
                  <Mic className="h-5 w-5 text-fg-on-dark" />
                </span>
                <div>
                  <p className="font-display font-bold text-fg" style={{ fontSize: "0.95rem" }}>{a.name}</p>
                  <p className="text-fg-3" style={{ fontSize: "0.8rem" }}>{a.role}</p>
                </div>
              </div>
              <audio src={a.src} controls preload="metadata" className="w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

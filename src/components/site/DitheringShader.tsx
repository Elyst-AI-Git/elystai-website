"use client";

import { useEffect, useRef } from "react";

// Dependency-free emerald dithering field — "intelligence materialising
// out of noise" (DESIGN.md hero/founder NOTES). Renders a slow-shifting
// scalar field at low resolution, Bayer-ordered-dithered to two brand
// colours, then scaled up with image-rendering:pixelated.

const BAYER_8 = [
  0, 48, 12, 60, 3, 51, 15, 63, 32, 16, 44, 28, 35, 19, 47, 31, 8, 56, 4, 52,
  11, 59, 7, 55, 40, 24, 36, 20, 43, 27, 39, 23, 2, 50, 14, 62, 1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29, 10, 58, 6, 54, 9, 57, 5, 53, 42, 26, 38, 22,
  41, 25, 37, 21,
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function DitheringShader({
  colorFront = "#03624C",
  colorBack = "#F5F8F6",
  speed = 0.6,
  scale = 0.8,
  pixelSize = 3,
  className,
}: {
  colorFront?: string;
  colorBack?: string;
  speed?: number;
  scale?: number;
  pixelSize?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const front = hexToRgb(colorFront);
    const back = hexToRgb(colorBack);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let image: ImageData | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width / pixelSize));
      h = Math.max(1, Math.round(rect.height / pixelSize));
      canvas.width = w;
      canvas.height = h;
      image = ctx.createImageData(w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const render = (tMs: number) => {
      if (!image) return;
      const t = (tMs / 1000) * speed;
      const data = image.data;
      const sx = scale * 6;
      const sy = scale * 6;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const u = (x / w) * sx;
          const v = (y / h) * sy;
          // smooth drifting field, biased so density grows left→right
          let f =
            0.5 +
            0.5 *
              Math.sin(u + t) *
              Math.cos(v - t * 0.6) *
              Math.sin((u + v) * 0.5 + t * 0.3);
          f = f * 0.6 + (x / w) * 0.5 - 0.05;
          const threshold = (BAYER_8[(y & 7) * 8 + (x & 7)] + 0.5) / 64;
          const on = f > threshold;
          const c = on ? front : back;
          const i = (y * w + x) * 4;
          data[i] = c[0];
          data[i + 1] = c[1];
          data[i + 2] = c[2];
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(image, 0, 0);
      if (!reduce) raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [colorFront, colorBack, speed, scale, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
    />
  );
}

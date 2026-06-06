"use client";

import { useEffect, useRef } from "react";

// Elyst wordmark glyph paths (same source as the Wordmark component). Each
// glyph shares the baseline translate ty; tx positions it along the line.
const TY = 518.62631;
const GLYPHS: { tx: number; d: string }[] = [
  {
    tx: 143.402336,
    d: "M 59.203125 2.796875 C 49.335938 2.796875 40.632812 0.695312 33.09375 -3.5 C 25.5625 -7.695312 19.695312 -13.628906 15.5 -21.296875 C 11.300781 -28.960938 9.203125 -38 9.203125 -48.40625 L 9.203125 -50.796875 C 9.203125 -61.203125 11.265625 -70.238281 15.390625 -77.90625 C 19.523438 -85.570312 25.328125 -91.503906 32.796875 -95.703125 C 40.265625 -99.898438 48.929688 -102 58.796875 -102 C 68.535156 -102 77.003906 -99.832031 84.203125 -95.5 C 91.398438 -91.164062 97 -85.164062 101 -77.5 C 105 -69.832031 107 -60.929688 107 -50.796875 L 107 -42.203125 L 34.796875 -42.203125 C 35.066406 -35.398438 37.597656 -29.863281 42.390625 -25.59375 C 47.191406 -21.332031 53.0625 -19.203125 60 -19.203125 C 67.0625 -19.203125 72.257812 -20.734375 75.59375 -23.796875 C 78.925781 -26.867188 81.460938 -30.269531 83.203125 -34 L 103.796875 -23.203125 C 101.929688 -19.734375 99.234375 -15.960938 95.703125 -11.890625 C 92.171875 -7.828125 87.46875 -4.363281 81.59375 -1.5 C 75.726562 1.363281 68.265625 2.796875 59.203125 2.796875 Z M 35 -61 L 81.40625 -61 C 80.863281 -66.726562 78.5625 -71.328125 74.5 -74.796875 C 70.4375 -78.265625 65.132812 -80 58.59375 -80 C 51.800781 -80 46.40625 -78.265625 42.40625 -74.796875 C 38.40625 -71.328125 35.9375 -66.726562 35 -61 Z M 35 -61 ",
  },
  { tx: 243.799231, d: "M 14 0 L 14 -140 L 39.203125 -140 L 39.203125 0 Z M 14 0 " },
  {
    tx: 281.997799,
    d: "M 24.796875 40 L 24.796875 18 L 78.796875 18 C 82.535156 18 84.40625 16 84.40625 12 L 84.40625 -13 L 80.796875 -13 C 79.734375 -10.726562 78.066406 -8.457031 75.796875 -6.1875 C 73.535156 -3.925781 70.46875 -2.0625 66.59375 -0.59375 C 62.726562 0.863281 57.796875 1.59375 51.796875 1.59375 C 44.066406 1.59375 37.300781 -0.171875 31.5 -3.703125 C 25.695312 -7.234375 21.195312 -12.128906 18 -18.390625 C 14.800781 -24.660156 13.203125 -31.863281 13.203125 -40 L 13.203125 -99.203125 L 38.40625 -99.203125 L 38.40625 -42 C 38.40625 -34.53125 40.238281 -28.925781 43.90625 -25.1875 C 47.570312 -21.457031 52.800781 -19.59375 59.59375 -19.59375 C 67.332031 -19.59375 73.332031 -22.160156 77.59375 -27.296875 C 81.863281 -32.429688 84 -39.597656 84 -48.796875 L 84 -99.203125 L 109.203125 -99.203125 L 109.203125 17.59375 C 109.203125 24.394531 107.203125 29.828125 103.203125 33.890625 C 99.203125 37.960938 93.867188 40 87.203125 40 Z M 24.796875 40 ",
  },
  {
    tx: 390.194506,
    d: "M 55.203125 2.796875 C 42.265625 2.796875 31.660156 0 23.390625 -5.59375 C 15.128906 -11.195312 10.132812 -19.195312 8.40625 -29.59375 L 31.59375 -35.59375 C 32.53125 -30.925781 34.097656 -27.257812 36.296875 -24.59375 C 38.492188 -21.925781 41.226562 -20.023438 44.5 -18.890625 C 47.769531 -17.765625 51.335938 -17.203125 55.203125 -17.203125 C 61.066406 -17.203125 65.398438 -18.234375 68.203125 -20.296875 C 71.003906 -22.367188 72.40625 -24.9375 72.40625 -28 C 72.40625 -31.0625 71.070312 -33.425781 68.40625 -35.09375 C 65.738281 -36.757812 61.46875 -38.128906 55.59375 -39.203125 L 50 -40.203125 C 43.0625 -41.535156 36.726562 -43.367188 31 -45.703125 C 25.269531 -48.035156 20.671875 -51.265625 17.203125 -55.390625 C 13.734375 -59.523438 12 -64.863281 12 -71.40625 C 12 -81.269531 15.597656 -88.832031 22.796875 -94.09375 C 29.992188 -99.363281 39.460938 -102 51.203125 -102 C 62.265625 -102 71.460938 -99.53125 78.796875 -94.59375 C 86.128906 -89.664062 90.929688 -83.203125 93.203125 -75.203125 L 69.796875 -68 C 68.734375 -73.0625 66.566406 -76.660156 63.296875 -78.796875 C 60.035156 -80.929688 56.003906 -82 51.203125 -82 C 46.398438 -82 42.734375 -81.164062 40.203125 -79.5 C 37.671875 -77.832031 36.40625 -75.53125 36.40625 -72.59375 C 36.40625 -69.394531 37.738281 -67.03125 40.40625 -65.5 C 43.070312 -63.96875 46.671875 -62.800781 51.203125 -62 L 56.796875 -61 C 64.265625 -59.664062 71.03125 -57.898438 77.09375 -55.703125 C 83.164062 -53.503906 87.96875 -50.367188 91.5 -46.296875 C 95.03125 -42.234375 96.796875 -36.734375 96.796875 -29.796875 C 96.796875 -19.398438 93.03125 -11.367188 85.5 -5.703125 C 77.96875 -0.0351562 67.867188 2.796875 55.203125 2.796875 Z M 55.203125 2.796875 ",
  },
  {
    tx: 479.991712,
    d: "M 52 0 C 45.46875 0 40.164062 -2.03125 36.09375 -6.09375 C 32.03125 -10.164062 30 -15.601562 30 -22.40625 L 30 -78.40625 L 5.203125 -78.40625 L 5.203125 -99.203125 L 30 -99.203125 L 30 -130 L 55.203125 -130 L 55.203125 -99.203125 L 82.40625 -99.203125 L 82.40625 -78.40625 L 55.203125 -78.40625 L 55.203125 -26.796875 C 55.203125 -22.796875 57.066406 -20.796875 60.796875 -20.796875 L 80 -20.796875 L 80 0 Z M 52 0 ",
  },
  {
    tx: 591.987822,
    d: "M 3.59375 0 L 40.40625 -140 L 86.40625 -140 L 123.203125 0 L 96 0 L 88.40625 -30.796875 L 38.40625 -30.796875 L 30.796875 0 Z M 44.59375 -55.203125 L 82.203125 -55.203125 L 65.203125 -123.40625 L 61.59375 -123.40625 Z M 44.59375 -55.203125 ",
  },
  { tx: 703.784417, d: "M 13.203125 0 L 13.203125 -140 L 39.59375 -140 L 39.59375 0 Z M 13.203125 0 " },
];
// Wordmark bounding box in glyph coordinates.
const MARK = { x: 145, y: 375, w: 603, h: 187 };

// 8x8 Bayer ordered-dither matrix.
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

type Props = {
  colorFront?: string;
  colorBack?: string;
  pixelSize?: number;
  className?: string;
};

export default function MarkDither({
  colorFront = "#03624C",
  colorBack = "#F5F8F6",
  pixelSize = 5,
  className,
}: Props) {
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

    let cols = 0;
    let rows = 0;
    let mask: Uint8Array = new Uint8Array(0);
    let image: ImageData | null = null;

    // Pointer in cell coordinates; strength fades when the pointer leaves.
    let mx = -999;
    let my = -999;
    let mStrength = 0;

    function buildMask() {
      const rect = canvas!.getBoundingClientRect();
      cols = Math.max(8, Math.round(rect.width / pixelSize));
      rows = Math.max(8, Math.round(rect.height / pixelSize));
      canvas!.width = cols;
      canvas!.height = rows;
      image = ctx!.createImageData(cols, rows);

      // Rasterize the wordmark into a mask the size of the cell grid.
      const m = document.createElement("canvas");
      m.width = cols;
      m.height = rows;
      const mc = m.getContext("2d")!;
      const fit = (cols * 0.82) / MARK.w;
      const scale = Math.min(fit, (rows * 0.6) / MARK.h);
      const markW = MARK.w * scale;
      const markH = MARK.h * scale;
      const ox = (cols - markW) / 2 - MARK.x * scale;
      const oy = (rows - markH) / 2 - MARK.y * scale;
      mc.fillStyle = "#000";
      for (const g of GLYPHS) {
        mc.setTransform(scale, 0, 0, scale, ox, oy);
        mc.translate(g.tx, TY);
        mc.fill(new Path2D(g.d));
      }
      mc.setTransform(1, 0, 0, 1, 0, 0);
      const data = mc.getImageData(0, 0, cols, rows).data;
      mask = new Uint8Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) mask[i] = data[i * 4 + 3] > 40 ? 1 : 0;
    }

    let raf = 0;
    let start = 0;

    function frame(now: number) {
      if (!start) start = now;
      const t = (now - start) / 1000;
      const reveal = reduce ? 1 : Math.min(t / 1.1, 1);
      const px = image!.data;
      mStrength += ((mx > -900 ? 1 : 0) - mStrength) * 0.08;

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const idx = cy * cols + cx;
          const inside = mask[idx];
          const shimmer = reduce
            ? 0.5
            : 0.5 +
              0.5 * Math.sin(cx * 0.3 + t * 1.6) * Math.cos(cy * 0.34 - t * 1.25);

          let halo = 0;
          if (mStrength > 0.01) {
            const dx = cx - mx;
            const dy = cy - my;
            halo =
              mStrength * Math.exp(-(dx * dx + dy * dy) / (2 * 9 * 9));
          }

          const field = inside
            ? (0.74 + 0.2 * shimmer) * reveal + 0.3 * halo
            : 0.04 + 0.04 * shimmer + 0.5 * halo;

          const threshold = (BAYER[(cy & 7) * 8 + (cx & 7)] + 0.5) / 64;
          const on = field > threshold;
          const p = idx * 4;
          px[p] = on ? front[0] : back[0];
          px[p + 1] = on ? front[1] : back[1];
          px[p + 2] = on ? front[2] : back[2];
          px[p + 3] = 255;
        }
      }
      ctx!.putImageData(image!, 0, 0);
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width) * cols;
      my = ((e.clientY - rect.top) / rect.height) * rows;
    }
    function onLeave() {
      mx = -999;
      my = -999;
    }

    buildMask();
    const ro = new ResizeObserver(() => {
      buildMask();
      if (reduce) frame(performance.now());
    });
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    if (reduce) {
      frame(performance.now());
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [colorFront, colorBack, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        imageRendering: "pixelated",
      }}
    />
  );
}

"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

interface ActiveStar {
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const rectRef = useRef<SVGRectElement>(null);

  // The previous implementation called setState on every animation frame, which
  // forced a full React re-render *and* re-subscribed the move effect ~60×/sec
  // just to slide one <rect> across the screen — a real cost on weak CPUs. Here
  // a single RAF loop mutates the <rect> attributes directly, so React renders
  // the SVG exactly once. (Background tabs throttle RAF, so it self-pauses when
  // the page isn't visible.)
  useEffect(() => {
    const rect = rectRef.current;
    if (!rect) return;

    let star: ActiveStar | null = null;
    let raf = 0;
    let spawnTimer: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const { x, y, angle } = getRandomStartPoint();
      star = {
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
    };

    const scheduleSpawn = () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      spawnTimer = setTimeout(() => {
        spawn();
        scheduleSpawn();
      }, delay);
    };

    const tick = () => {
      if (star) {
        star.x += star.speed * Math.cos((star.angle * Math.PI) / 180);
        star.y += star.speed * Math.sin((star.angle * Math.PI) / 180);
        star.distance += star.speed;
        star.scale = 1 + star.distance / 100;

        const offscreen =
          star.x < -20 ||
          star.x > window.innerWidth + 20 ||
          star.y < -20 ||
          star.y > window.innerHeight + 20;

        if (offscreen) {
          star = null;
          rect.style.display = "none";
        } else {
          // scale can dip below 0 as a star leaves the frame; clamp so the
          // <rect> never gets a negative width (invalid SVG → console errors).
          const w = Math.max(0, starWidth * star.scale);
          rect.setAttribute("x", String(star.x));
          rect.setAttribute("y", String(star.y));
          rect.setAttribute("width", String(w));
          rect.setAttribute(
            "transform",
            `rotate(${star.angle}, ${star.x + w / 2}, ${star.y + starHeight / 2})`,
          );
          rect.style.display = "";
        }
      }
      raf = requestAnimationFrame(tick);
    };

    spawn();
    scheduleSpawn();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(spawnTimer);
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay, starWidth, starHeight]);

  return (
    <svg className={cn("w-full h-full absolute inset-0", className)}>
      <rect
        ref={rectRef}
        width={starWidth}
        height={starHeight}
        fill="url(#gradient)"
        style={{ display: "none" }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#03624c" />
              <stop offset="40%" stopColor="#00df82" />
              <stop offset="70%" stopColor="#04855f" />
              <stop offset="100%" stopColor="#03624c" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      {/* Ghost outline — visible on light bg */}
      <text
        x="10%"
        y="50%"
        textAnchor="start"
        dominantBaseline="middle"
        strokeWidth="0.4"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{
          stroke: "rgba(3,98,76,0.18)",
          fontFamily: "'Manrope', sans-serif",
          opacity: hovered ? 0.7 : 1,
        }}
      >
        {text}
      </text>
      {/* Draw-in animation on mount */}
      <motion.text
        x="10%"
        y="50%"
        textAnchor="start"
        dominantBaseline="middle"
        strokeWidth="0.4"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{
          stroke: "rgba(3,98,76,0.35)",
          fontFamily: "'Manrope', sans-serif",
        }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      {/* Gradient reveal on hover */}
      <text
        x="10%"
        y="50%"
        textAnchor="start"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.4"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {text}
      </text>
    </svg>
  );
};

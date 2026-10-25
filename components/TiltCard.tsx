"use client";

import { useRef, useState } from "react";

/** 3D tilt card with a cursor-following sheen, subtle, Apple-grade. */
export default function TiltCard({
  children,
  className = "",
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50, on: false });

  return (
    <div
      ref={ref}
      className={`group relative [transform-style:preserve-3d] transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: t.on ? `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` : "perspective(900px)",
      }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setT({ rx: (0.5 - py) * max, ry: (px - 0.5) * max, mx: px * 100, my: py * 100, on: true });
      }}
      onMouseLeave={() => setT((s) => ({ ...s, rx: 0, ry: 0, on: false }))}
    >
      {children}
      {/* cursor sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${t.mx}% ${t.my}%, rgba(228,207,158,0.10), transparent 55%)`,
        }}
      />
    </div>
  );
}

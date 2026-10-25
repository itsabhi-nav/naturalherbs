"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/** Animated count-up that fires once, when the number scrolls into view. */
export default function Counter({
  value,
  suffix = "",
  duration = 1.8,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

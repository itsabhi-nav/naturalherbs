"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft gold-green light that trails the cursor on pointer-fine devices, 
 * the "spotlight on silk" effect. Renders nothing on touch.
 */
export default function CursorGlow() {
  const [fine, setFine] = useState(false);
  const x = useMotionValue(-1200);
  const y = useMotionValue(-1200);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!fine) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-20"
    >
      <div
        className="h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,169,104,0.12), rgba(125,185,138,0.07) 45%, transparent 70%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </motion.div>
  );
}

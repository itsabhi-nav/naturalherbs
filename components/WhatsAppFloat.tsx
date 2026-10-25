"use client";

import { motion } from "framer-motion";

/** Floating WhatsApp pill, gently pulsing. */
export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/918285330983"
      target="_blank"
      rel="noreferrer"
      aria-label="Message us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="animate-pulse-ring fixed bottom-6 right-6 z-[80] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12.04 2.5A9.4 9.4 0 0 0 2.66 11.9c0 1.66.44 3.28 1.27 4.7L2.5 21.5l5.06-1.32a9.44 9.44 0 0 0 4.48 1.14h.01a9.4 9.4 0 0 0 9.38-9.4 9.34 9.34 0 0 0-9.39-9.42Zm5.44 13.3c-.23.65-1.36 1.27-1.86 1.31-.5.05-.95.23-3.2-.67-2.72-1.07-4.42-3.85-4.55-4.03-.13-.18-1.08-1.44-1.08-2.75 0-1.3.68-1.95.92-2.21.24-.27.52-.33.7-.33h.5c.16 0 .38-.06.59.45.23.55.77 1.9.84 2.03.07.14.11.3.02.48-.09.18-.13.29-.27.45-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.16-.18.7-.81.88-1.09.18-.27.37-.23.62-.14.25.1 1.58.75 1.85.88.28.14.46.2.53.32.07.11.07.65-.16 1.3Z" />
      </svg>
    </motion.a>
  );
}

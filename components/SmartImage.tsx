"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: true;
  width?: number;
  height?: number;
};

/**
 * Image with a graceful fallback: if the remote photo ever 404s we swap to a
 * deterministic picsum seed so the layout never shows a broken frame.
 */
export default function SmartImage({ src, alt, className, sizes, priority, fill, width, height }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  const seed = encodeURIComponent(alt.replace(/\W+/g, "-").toLowerCase().slice(0, 40) || "herb");

  return (
    <Image
      ref={ref}
      src={failed ? `https://picsum.photos/seed/${seed}/1200/1500` : src}
      alt={alt}
      {...(fill ? { fill: true } : { width: width ?? 1200, height: height ?? 1500 })}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

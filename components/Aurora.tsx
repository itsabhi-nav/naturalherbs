/** Slow-drifting aurora glow fields, the ambient light of the whole site. */
export default function Aurora({ variant = "default" }: { variant?: "default" | "gold" }) {
  const blobs =
    variant === "gold"
      ? [
          "left-[-10%] top-[10%] h-[38rem] w-[38rem] bg-gold/12",
          "right-[-15%] top-[40%] h-[32rem] w-[32rem] bg-leaf/10",
        ]
      : [
          "left-[-12%] top-[-6%] h-[36rem] w-[36rem] bg-leaf/12",
          "right-[-14%] top-[28%] h-[40rem] w-[40rem] bg-gold/10",
          "left-[30%] bottom-[-20%] h-[30rem] w-[30rem] bg-fern/40",
        ];

  return (
    <div aria-hidden className="aurora pointer-events-none isolate absolute inset-0 overflow-hidden">
      {blobs.map((c, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${c} animate-drift-slow`}
          style={{
            animationDelay: `${i * -9}s`,
            filter: "blur(110px)",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
      ))}
    </div>
  );
}

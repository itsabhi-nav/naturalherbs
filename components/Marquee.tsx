const LATIN_NAMES = [
  "Withania somnifera",
  "Bacopa monnieri",
  "Curcuma longa",
  "Ocimum sanctum",
  "Azadirachta indica",
  "Sapindus mukorossi",
  "Lawsonia inermis",
  "Mentha piperita",
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {LATIN_NAMES.map((name) => (
        <span key={name} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap px-6 text-[0.82rem] italic tracking-wide text-cream/75 md:px-9 md:text-[0.95rem]">
            {name}
          </span>
          <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
        </span>
      ))}
    </div>
  );
}

/** Slow botanical index ticker used as a quiet divider between sections. */
export default function Marquee() {
  return (
    <div className="marquee-track flex w-max items-center">
      <Group />
      <Group hidden />
    </div>
  );
}

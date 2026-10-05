export default function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-white/60" : "text-neutral-500"
        }`}
      >
        {kicker}
      </span>
      <h2
        className={`mt-3 text-balance text-3xl font-bold sm:text-4xl ${
          dark ? "text-white" : "text-neutral-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 ${dark ? "text-white/70" : "text-neutral-500"} ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

const stages = [
  {
    step: "01",
    title: "Measure",
    text: "Choose tests that answer a defined health question and establish a useful baseline.",
  },
  {
    step: "02",
    title: "Interpret",
    text: "Understand what the result means, its limitations and whether it needs clinical follow-up.",
  },
  {
    step: "03",
    title: "Prioritise",
    text: "Separate material risks and worthwhile actions from a long list of marginal optimisations.",
  },
  {
    step: "04",
    title: "Act",
    text: "Use the findings to shape appropriate medical care, training, nutrition or everyday routines.",
  },
  {
    step: "05",
    title: "Track",
    text: "Repeat only the measurements that are useful, using a comparable method and appropriate timing.",
  },
] as const;

type LongevityJourneyProps = {
  compact?: boolean;
  eyebrow?: string;
  title?: string;
};

export default function LongevityJourney({
  compact = false,
  eyebrow = "The diagnostic journey",
  title = "A useful test should lead somewhere.",
}: LongevityJourneyProps) {
  return (
    <section className={`border-y border-[#d8cebf] bg-[#29241d] px-5 text-[#fbf8f1] sm:px-6 ${compact ? "py-10 sm:py-12" : "py-12 sm:py-16"}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 max-w-3xl sm:mb-9">
          <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#d8cebf] sm:text-[11px]">{eyebrow}</p>
          <h2 className={`font-serif font-normal leading-tight tracking-[-0.045em] ${compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}>
            {title}
          </h2>
        </div>

        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-5 sm:overflow-visible sm:px-0">
          {stages.map((stage) => (
            <article key={stage.step} className="min-w-[76%] snap-start border border-[#fbf8f1]/16 p-5 sm:min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d8cebf]">{stage.step}</p>
              <h3 className="mt-4 font-serif text-2xl font-normal leading-tight">{stage.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#fbf8f1]/72">{stage.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

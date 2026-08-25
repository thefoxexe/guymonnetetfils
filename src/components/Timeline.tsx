export type TimelineStep = { year: string; title: string; description: string };

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative space-y-10 border-l border-line pl-8">
      {steps.map((step) => (
        <li key={step.title} className="relative">
          <span className="absolute -left-[35px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-paper" />
          <p className="font-display text-xl font-bold text-accent">{step.year}</p>
          <p className="mt-1 font-display text-lg font-semibold text-ink">{step.title}</p>
          <p className="mt-2 max-w-content text-sm leading-relaxed text-concrete">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

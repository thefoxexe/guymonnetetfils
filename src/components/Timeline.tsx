import { Reveal } from "./Reveal";

export type TimelineStep = { year: string; title: string; description: string };

/** Frise chronologique : grande année condensée à gauche, récit à droite. */
export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="border-b border-ink/15">
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.title}
          delay={index * 60}
          className="grid grid-cols-1 gap-3 border-t border-ink/15 py-8 sm:grid-cols-[minmax(0,320px)_minmax(0,1fr)] sm:gap-10"
        >
          <p className="stretch-75 font-display text-[44px] font-black uppercase leading-none text-accent-ink sm:text-[56px]">
            {step.year}
          </p>
          <div>
            <p className="font-display text-xl font-extrabold uppercase sm:text-[22px]">{step.title}</p>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-steel">{step.description}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

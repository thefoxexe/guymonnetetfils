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
          className="grid grid-cols-1 gap-2 border-t border-ink/15 py-6 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:gap-10 sm:py-8"
        >
          <p className="stretch-75 break-words font-display text-[32px] font-black uppercase leading-none text-accent-ink sm:text-[44px] lg:text-[52px]">
            {step.year}
          </p>
          <div>
            <p className="font-display text-lg font-extrabold uppercase sm:text-[22px]">{step.title}</p>
            <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-steel sm:text-base">{step.description}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

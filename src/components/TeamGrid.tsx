import type { TeamGroup } from "@/data/team";
import { Reveal } from "./Reveal";

function initials(name: string) {
  return name.trim().slice(0, 1).toUpperCase();
}

export function TeamGroupSection({ group, index }: { group: TeamGroup; index: number }) {
  return (
    <Reveal className="grid grid-cols-1 gap-6 border-t-2 border-ink pt-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-10">
      <div className="flex items-baseline gap-4 lg:flex-col lg:gap-2">
        <span className="font-display text-sm font-extrabold text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="stretch-85 font-display text-[26px] font-extrabold uppercase leading-none sm:text-[30px]">
          {group.label}
        </h3>
        <span className="text-sm text-steel">
          {group.members.length} personne{group.members.length > 1 ? "s" : ""}
        </span>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {group.members.map((name, i) => (
          <li
            key={`${name}-${i}`}
            className="group flex items-center gap-3 border border-line bg-paper p-3 transition-colors hover:border-ink hover:bg-accent"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink font-display text-lg font-black text-accent">
              {initials(name)}
            </span>
            <span className="font-display text-base font-bold">{name}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

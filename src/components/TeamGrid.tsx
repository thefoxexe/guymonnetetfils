import type { TeamGroup } from "@/data/team";

function initials(name: string) {
  return name.trim().slice(0, 1).toUpperCase();
}

export function TeamGroupSection({ group }: { group: TeamGroup }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-ink">{group.label}</h3>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {group.members.map((name, index) => (
          <li
            key={`${name}-${index}`}
            className="flex items-center gap-3 border border-line bg-paper p-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-anthracite font-display text-sm font-bold text-paper">
              {initials(name)}
            </span>
            <span className="text-sm text-ink">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

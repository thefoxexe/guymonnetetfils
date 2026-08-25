export type Stat = { value: string; label: string; note?: string };

const desktopCols: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden border border-line bg-line ${
        desktopCols[items.length] ?? "md:grid-cols-4"
      }`}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-paper p-6 md:p-8">
          <dt className="font-display text-3xl font-bold text-ink md:text-4xl">{item.value}</dt>
          <dd className="mt-2 text-sm text-concrete">{item.label}</dd>
          {item.note ? <dd className="mt-1 text-xs text-concrete/70">{item.note}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

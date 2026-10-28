/**
 * Bandeau jaune repris du logo (« ■ TRANSPORTS ■ TERRASSEMENTS ■ GÉNIE-CIVIL »),
 * précédé du liseré pointillé noir. Sert de transition sous les heros.
 */
export function BrandBand({ items }: { items: string[] }) {
  return (
    <div aria-hidden="true">
      <div className="brand-stripe" />
      <div className="bg-accent">
        <div className="container-wide flex flex-wrap gap-x-6 gap-y-1.5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.08em] text-ink sm:gap-x-9 sm:py-4 sm:text-[15px]">
          {items.map((item) => (
            <span key={item}>■ {item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export const companyBandItems = ["Transports", "Terrassements", "Génie civil", "Maçonnerie"];

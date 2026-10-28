import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /**
   * primary : jaune de marque (fonds clairs ou sombres)
   * dark : noir (sur les bandeaux jaunes)
   * outline / outline-light : contour noir (fond clair) ou blanc (fond sombre)
   * ghost : lien souligné jaune
   */
  variant?: "primary" | "dark" | "outline" | "outline-light" | "ghost";
  className?: string;
  external?: boolean;
};

const base =
  "focus-ring inline-flex min-h-[48px] items-center justify-center gap-2 px-5 py-3 text-[15px] font-bold transition-colors duration-200 ease-editorial sm:px-7 sm:py-4";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-ink hover:bg-accent-dark",
  dark: "bg-ink text-paper hover:bg-anthracite",
  outline: "btn-outline border-2 border-ink text-ink hover:bg-ink hover:text-paper",
  "outline-light": "border-2 border-paper text-paper hover:bg-paper hover:text-ink",
  ghost: "!min-h-0 !px-0 !py-1 text-ink underline decoration-accent decoration-[3px] underline-offset-[6px] hover:text-accent-ink",
};

export function Button({ href, children, variant = "primary", className = "", external }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

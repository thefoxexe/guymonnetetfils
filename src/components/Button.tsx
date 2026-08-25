import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const base =
  "focus-ring inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ease-editorial";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-paper hover:bg-[#a83e19]",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent",
};

export function Button({ href, children, variant = "primary", className = "", external }: ButtonProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

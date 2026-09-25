import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-[#ff441f] text-white hover:bg-[#e63a1a]",
  secondary: "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50",
  ghost: "text-stone-700 hover:bg-stone-100",
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

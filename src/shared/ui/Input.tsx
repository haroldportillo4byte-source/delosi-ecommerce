import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: Props) {
  return (
    <input
      className={`w-full rounded-full border border-stone-200 bg-white py-2.5 pr-4 pl-4 text-sm shadow-sm outline-none ring-[#ff441f]/30 focus:ring-2 ${className}`}
      {...props}
    />
  );
}

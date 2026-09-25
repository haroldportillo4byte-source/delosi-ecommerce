import Link from "next/link";
import type { BreadcrumbItem } from "@/shared/seo/json-ld";

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className = "" }: Props) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Ruta de navegación" className={`text-xs text-stone-600 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1">
              {index > 0 ? <span aria-hidden="true">·</span> : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-medium text-stone-800 underline decoration-stone-400 underline-offset-2 hover:text-[#c93312] hover:decoration-[#c93312]"
                >
                  {item.name}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-stone-700" : undefined} aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

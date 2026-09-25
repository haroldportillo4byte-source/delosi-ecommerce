import Link from "next/link";
import type { ProductCategory } from "../../domain/entities/product";

const CATEGORY_EMOJI: Record<string, string> = {
  electronics: "💻",
  jewelery: "💎",
  "men's clothing": "👔",
  "women's clothing": "👗",
};

type Props = {
  categories: ProductCategory[];
  activeCategory?: string;
};

export function CategoryList({ categories, activeCategory }: Props) {
  return (
    <section aria-label="Categorías">
      <h2 className="mb-3 text-lg font-semibold text-stone-800">Explora por categoría</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <CategoryPill href="/products" label="Todos" emoji="🛍️" active={!activeCategory} />
        {categories.map((category) => (
          <CategoryPill
            key={category}
            href={`/products?category=${encodeURIComponent(category)}`}
            label={formatCategoryLabel(category)}
            emoji={CATEGORY_EMOJI[category] ?? "🏷️"}
            active={activeCategory?.toLowerCase() === category.toLowerCase()}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryPill({
  href,
  label,
  emoji,
  active,
}: {
  href: string;
  label: string;
  emoji: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex w-20 shrink-0 flex-col items-center gap-2 text-center ${
        active ? "opacity-100" : "opacity-80 hover:opacity-100"
      }`}
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm ring-1 ${
          active ? "ring-[#ff441f]" : "ring-stone-200"
        }`}
      >
        {emoji}
      </span>
      <span className="text-xs font-medium text-stone-700 capitalize">{label}</span>
    </Link>
  );
}

function formatCategoryLabel(category: string): string {
  return category.replaceAll("'", "’");
}

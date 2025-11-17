"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export function CategoryNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-3 border-b border-slate-200 pb-4">
        <Link
          href={pathname}
          className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
            !currentCategory
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Alle categorieën
        </Link>
        {CATEGORIES.map((category) => {
          const isActive = currentCategory === category.id;
          const href = `${pathname}?category=${category.id}`;
          return (
            <Link
              key={category.id}
              href={href}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}


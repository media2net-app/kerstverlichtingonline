"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ScrapedProduct } from "@/lib/amazon";
import { ShopCard } from "./shop-card";
import { ShopFilterPanel } from "./shop-filter-panel";

type FilterConfig = {
  title: string;
  options: string[];
};

type Props = {
  products: ScrapedProduct[];
  filterConfig: FilterConfig[];
};

export function ProductGrid({ products, filterConfig }: Props) {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = useCallback((newFilters: Record<string, string[]>) => {
    setFilters(newFilters);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category first
    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    // Then apply other filters
    if (Object.keys(filters).length === 0) {
      return filtered;
    }

    return filtered.filter((product) => {
      // Filter by Merk (Brand)
      if (filters["Merk"] && filters["Merk"].length > 0) {
        const brandMatch = filters["Merk"].some((brand) =>
          product.title.toLowerCase().includes(brand.toLowerCase())
        );
        if (!brandMatch) return false;
      }

      // Filter by Kleur (Color)
      if (filters["Kleur"] && filters["Kleur"].length > 0) {
        const colorMatch = filters["Kleur"].some((color) => {
          const colorLower = color.toLowerCase();
          const titleLower = product.title.toLowerCase();
          if (colorLower === "warm wit") {
            return titleLower.includes("warm") || titleLower.includes("warmwit");
          }
          if (colorLower === "kleurrijk") {
            return titleLower.includes("kleur") || titleLower.includes("rgb") || titleLower.includes("multicolor");
          }
          if (colorLower === "koel wit") {
            return titleLower.includes("koel") || titleLower.includes("koud");
          }
          return titleLower.includes(colorLower);
        });
        if (!colorMatch) return false;
      }

      // Filter by Lengte (Length/Height)
      if (filters["Lengte"] && filters["Lengte"].length > 0) {
        const lengthMatch = filters["Lengte"].some((length) => {
          const lengthLower = length.toLowerCase();
          const titleLower = product.title.toLowerCase();
          
          if (lengthLower === "3 m") {
            return titleLower.includes("3") && (titleLower.includes("m") || titleLower.includes("300"));
          }
          if (lengthLower === "5 m") {
            return titleLower.includes("5") && (titleLower.includes("m") || titleLower.includes("500"));
          }
          if (lengthLower === "6 m") {
            return titleLower.includes("6") && (titleLower.includes("m") || titleLower.includes("600"));
          }
          if (lengthLower === "8 m+") {
            return titleLower.includes("8") || titleLower.includes("800");
          }
          return titleLower.includes(lengthLower);
        });
        if (!lengthMatch) return false;
      }

      // Filter by Product type
      if (filters["Product type"] && filters["Product type"].length > 0) {
        const typeMatch = filters["Product type"].some((type) => {
          const typeLower = type.toLowerCase();
          const titleLower = product.title.toLowerCase();
          
          if (typeLower.includes("vlaggenmast bomen")) {
            return titleLower.includes("kerstboom") || titleLower.includes("boom");
          }
          if (typeLower.includes("led lichtmantels")) {
            return titleLower.includes("lichtmantel") || titleLower.includes("mantel");
          }
          if (typeLower.includes("cluster")) {
            return titleLower.includes("cluster");
          }
          return titleLower.includes(typeLower);
        });
        if (!typeMatch) return false;
      }

      return true;
    });
  }, [products, filters, categoryFilter]);

  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <ShopFilterPanel filters={filterConfig} onFilterChange={handleFilterChange} />
      </div>
      <section className="space-y-6 lg:col-span-3">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ShopCard key={product.asin} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm">
              <p className="mb-2 font-semibold text-slate-900">Geen producten gevonden</p>
              <p className="text-sm">
                {categoryFilter
                  ? `Geen producten gevonden in categorie "${categoryFilter}". Probeer een andere categorie of reset de filters.`
                  : "Probeer onze filters te resetten."}
              </p>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-slate-500">
          {filteredProducts.length > 0
            ? `Toont ${filteredProducts.length} van ${products.length} producten${categoryFilter ? ` in categorie "${categoryFilter}"` : ""}. Resultaten tonen slechts een gedeelte van het actuele aanbod. Vraag gerust een offerte aan voor maatwerk.`
            : categoryFilter
              ? `Geen producten gevonden in categorie "${categoryFilter}".`
              : "Geen producten gevonden met de geselecteerde filters."}
        </p>
      </section>
    </div>
  );
}


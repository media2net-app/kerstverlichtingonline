"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { ScrapedProduct } from "@/lib/amazon";

type Props = {
  product: ScrapedProduct;
  quantity?: number;
  className?: string;
  variant?: "default" | "outline";
};

export function AddToCartButton({ product, quantity = 1, className = "", variant = "default" }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const baseClasses = "rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all";
  const variantClasses =
    variant === "outline"
      ? "border border-slate-200 text-slate-900 hover:bg-slate-50"
      : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses} ${className} ${added ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
    >
      {added ? "✓ Toegevoegd!" : "Toevoegen aan winkelwagen"}
    </button>
  );
}


"use client";

import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Producten", href: "/#producten" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex w-full items-center justify-between px-6 py-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold">
            KO
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">kerstverlichtingonline.nl</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              vlaggenmast specialisten
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Login
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Winkelwagen
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}


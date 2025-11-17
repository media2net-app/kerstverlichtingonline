"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/contexts/cart-context";
import { createProductSlug } from "@/lib/slug";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
        <SiteHeader />
        <main className="w-full px-6 py-16 lg:px-12">
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
              <svg
                className="h-12 w-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-semibold text-slate-900">Je winkelwagen is leeg</h1>
            <p className="mb-8 text-slate-600">
              Voeg producten toe aan je winkelwagen om verder te gaan.
            </p>
            <Link
              href="/shop"
              className="inline-block rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Verder winkelen
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <SiteHeader />
      <main className="w-full px-6 py-10 lg:px-12">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">Winkelwagen</h1>
          <p className="mt-2 text-slate-600">
            {items.length} {items.length === 1 ? "product" : "producten"} in je winkelwagen
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const slug = item.product.slug ?? createProductSlug(item.product.title);
              return (
                <div
                  key={item.product.asin}
                  className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
                >
                  <Link
                    href={`/product/${slug}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100"
                  >
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        Geen afbeelding
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/product/${slug}`}
                        className="text-lg font-semibold text-slate-900 hover:text-slate-600"
                      >
                        {item.product.title}
                      </Link>
                      <p className="mt-1 text-sm text-slate-600">
                        ASIN: {item.product.asin}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-slate-600">Aantal:</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.asin, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            −
                          </button>
                          <span className="w-12 text-center text-sm font-semibold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.asin, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-900">
                          {item.product.price
                            ? `€${(parseFloat(item.product.price.replace(/[^\d,]/g, "").replace(",", ".")) * item.quantity).toFixed(2)}`
                            : "Prijs op aanvraag"}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-slate-500">
                            {item.product.price} per stuk
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.asin)}
                    className="ml-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Verwijderen"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Winkelwagen legen
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Bestelling overzicht</h2>
              <div className="mb-4 space-y-3 border-b border-slate-200 pb-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotaal</span>
                  <span className="font-semibold text-slate-900">€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Verzendkosten</span>
                  <span className="font-semibold text-slate-900">Gratis</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>BTW (21%)</span>
                  <span className="font-semibold text-slate-900">
                    €{(total * 0.21).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mb-6 flex justify-between border-b border-slate-200 pb-4 text-lg font-semibold text-slate-900">
                <span>Totaal</span>
                <span>€{(total * 1.21).toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
              >
                Naar checkout
              </Link>
              <Link
                href="/shop"
                className="mt-3 block w-full rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Verder winkelen
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


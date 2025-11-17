"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/contexts/cart-context";
import { createProductSlug } from "@/lib/slug";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Nederland",
    paymentMethod: "ideal",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
        <SiteHeader />
        <main className="w-full px-6 py-16 lg:px-12">
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <h1 className="mb-4 text-3xl font-semibold text-slate-900">Geen producten in winkelwagen</h1>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page
    clearCart();
    router.push("/checkout/success");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <SiteHeader />
      <main className="w-full px-6 py-10 lg:px-12">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Terug naar winkelwagen
          </Link>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-slate-900">Contactgegevens</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-slate-900">Verzendadres</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-700">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-700">
                    Achternaam *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">
                    Adres *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-slate-700">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">
                    Stad *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="country" className="mb-2 block text-sm font-medium text-slate-700">
                    Land *
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  >
                    <option>Nederland</option>
                    <option>België</option>
                    <option>Duitsland</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-slate-900">Betaalmethode</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 hover:border-slate-900 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ideal"
                    checked={formData.paymentMethod === "ideal"}
                    onChange={handleChange}
                    className="h-4 w-4 text-slate-900"
                  />
                  <span className="font-medium text-slate-900">iDEAL</span>
                </label>
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 hover:border-slate-900 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditcard"
                    checked={formData.paymentMethod === "creditcard"}
                    onChange={handleChange}
                    className="h-4 w-4 text-slate-900"
                  />
                  <span className="font-medium text-slate-900">Creditcard</span>
                </label>
                <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 hover:border-slate-900 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                    className="h-4 w-4 text-slate-900"
                  />
                  <span className="font-medium text-slate-900">PayPal</span>
                </label>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Bestelling overzicht</h2>
              <div className="mb-4 space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => {
                  const slug = item.product.slug ?? createProductSlug(item.product.title);
                  return (
                    <div key={item.product.asin} className="flex gap-3">
                      <Link
                        href={`/product/${slug}`}
                        className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100"
                      >
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-slate-400">
                            Geen afbeelding
                          </div>
                        )}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${slug}`}
                          className="block text-sm font-medium text-slate-900 hover:text-slate-600 line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                        <p className="mt-1 text-xs text-slate-600">
                          Aantal: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {item.product.price
                            ? `€${(parseFloat(item.product.price.replace(/[^\d,]/g, "").replace(",", ".")) * item.quantity).toFixed(2)}`
                            : "Prijs op aanvraag"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mb-4 space-y-3 border-t border-slate-200 pt-4">
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
              <div className="mb-6 flex justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
                <span>Totaal</span>
                <span>€{(total * 1.21).toFixed(2)}</span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Bestelling verwerken..." : "Bestelling plaatsen"}
              </button>
              <p className="mt-4 text-xs text-slate-500">
                Door te bestellen ga je akkoord met onze{" "}
                <Link href="/terms" className="underline hover:text-slate-900">
                  algemene voorwaarden
                </Link>
                .
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}


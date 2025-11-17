import Image from "next/image";
import Link from "next/link";
import { scrapeAmazonListings } from "@/lib/amazon";
import { SAMPLE_FEATURED_PRODUCTS } from "@/lib/sample-products";
import { createProductSlug } from "@/lib/slug";

export const revalidate = 0;

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof scrapeAmazonListings>>;
  try {
    products = await scrapeAmazonListings(undefined, 50);
  } catch {
    products = {
      products: SAMPLE_FEATURED_PRODUCTS,
      scrapedAt: new Date().toISOString(),
      source: "",
    };
  }

  const allProducts = products.products.length > 0 ? products.products : SAMPLE_FEATURED_PRODUCTS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Productbeheer</h1>
          <p className="mt-2 text-slate-600">
            Beheer alle producten in je shop ({allProducts.length} producten)
          </p>
        </div>
        <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          + Nieuw product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Zoek producten..."
          className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
        <select className="rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none">
          <option>Alle categorieën</option>
          <option>Vlaggenmast bomen</option>
          <option>LED lichtmantels</option>
          <option>Cluster verlichting</option>
          <option>Accessoires</option>
        </select>
        <select className="rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none">
          <option>Sorteer op</option>
          <option>Naam A-Z</option>
          <option>Naam Z-A</option>
          <option>Prijs laag-hoog</option>
          <option>Prijs hoog-laag</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allProducts.map((product) => {
          const slug = product.slug ?? createProductSlug(product.title);
          return (
            <div
              key={product.asin}
              className="group rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <Link
                href={`/product/${slug}`}
                className="relative mb-3 block aspect-square overflow-hidden rounded-xl bg-slate-100"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    Geen afbeelding
                  </div>
                )}
              </Link>
              <div className="space-y-2">
                <Link
                  href={`/product/${slug}`}
                  className="block text-sm font-semibold text-slate-900 hover:text-slate-600 line-clamp-2"
                >
                  {product.title}
                </Link>
                <p className="text-xs text-slate-500">ASIN: {product.asin}</p>
                <p className="text-lg font-semibold text-slate-900">{product.price ?? "Prijs op aanvraag"}</p>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                    Bewerken
                  </button>
                  <button className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50">
                    Verwijderen
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


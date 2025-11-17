import Image from "next/image";
import Link from "next/link";
import { ScrapedProduct } from "@/lib/amazon";
import { createProductSlug } from "@/lib/slug";

type Props = {
  product: ScrapedProduct;
};

export function ProductCard({ product }: Props) {
  const slug = product.slug ?? createProductSlug(product.title);

  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-emerald-900/20 backdrop-blur">
      <div className="space-y-4">
        <Link href={`/product/${slug}`} className="relative block h-48 w-full overflow-hidden rounded-xl bg-slate-900/30">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              unoptimized
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-white/60">
              Geen beeld
            </div>
          )}
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
              {product.badge}
            </span>
          )}
        </Link>
        <div className="space-y-2">
          <Link href={`/product/${slug}`} className="text-lg font-semibold text-white hover:text-emerald-200">
            {product.title}
          </Link>
          <div className="flex items-center gap-3 text-sm text-white/70">
            {product.rating && <span>{product.rating}</span>}
            {product.reviews && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {product.reviews}
              </span>
            )}
          </div>
          {product.delivery && (
            <p className="text-sm text-emerald-200/80">{product.delivery}</p>
          )}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/60">Prijs</p>
          <p className="text-2xl font-semibold text-amber-300">
            {product.price ?? "n.t.b."}
          </p>
        </div>
        <Link
          href={`/product/${slug}`}
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          Bekijk details
        </Link>
      </div>
    </article>
  );
}


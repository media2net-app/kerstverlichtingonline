"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrapedProduct } from "@/lib/amazon";
import { createProductSlug } from "@/lib/slug";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getCategoryById } from "@/lib/categories";

type Props = {
  product: ScrapedProduct;
};

export function ShopCard({ product }: Props) {
  const slug = product.slug ?? createProductSlug(product.title);
  const category = product.category 
    ? getCategoryById(product.category) 
    : null;
  const categoryName = category?.name || "Kerstverlichting";
  const [imageError, setImageError] = useState(false);

  return (
    <article className="flex flex-col rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/product/${slug}`}
        className="relative mb-4 block aspect-square overflow-hidden rounded-2xl bg-slate-50"
      >
        {product.image && !imageError ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2">Geen afbeelding</p>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-900">
          Nieuw
        </div>
      </Link>
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{categoryName}</p>
        <Link href={`/product/${slug}`} className="text-lg font-semibold text-slate-900 hover:text-slate-600">
          {product.title}
        </Link>
        {product.rating && (
          <p className="text-sm text-amber-500">
            {product.rating} · {product.reviews ?? "Nieuwe review"}
          </p>
        )}
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Vanaf</p>
          <p className="text-2xl font-semibold text-slate-900">{product.price ?? "Prijs op aanvraag"}</p>
        </div>
        <div className="flex gap-2">
          <AddToCartButton product={product} className="flex-1" />
          <Link
            href={`/product/${slug}`}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Bekijk
          </Link>
        </div>
      </div>
    </article>
  );
}


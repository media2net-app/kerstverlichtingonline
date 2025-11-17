import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-900/60 via-emerald-900/30 to-transparent p-10 shadow-[0_0_80px_rgba(15,59,45,0.35)]">
      <div className="absolute inset-0 opacity-60 blur-3xl">
        <div className="glow-ring" />
      </div>
      <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.25em] text-white/70">
            Moderne Kerstshop
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl xl:text-6xl">
            {BRAND.name} brengt{" "}
            <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-emerald-200 bg-clip-text text-transparent">
              vlaggenmast-verlichting
            </span>{" "}
            rechtstreeks van Amazon naar jouw tuin.
          </h1>
          <p className="max-w-2xl text-lg text-white/80">{BRAND.tagline}</p>
          <div className="flex flex-wrap gap-3 text-sm text-white/80">
            {BRAND.highlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="#producten"
              className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-amber-300"
            >
              Bekijk assortiment
            </Link>
            <Link
              href="#scrape-tool"
              className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Live Amazon scrape
            </Link>
          </div>
        </div>
        <div className="hero-grid relative rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="snowfall absolute inset-0 rounded-2xl opacity-60" />
          <div className="relative space-y-6 text-white">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">Dropship status</p>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                Live
              </span>
            </div>
            <div className="rounded-2xl bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-widest text-white/60">
                Gemiddelde voorraad
              </p>
              <p className="mt-2 text-4xl font-semibold text-emerald-200">86%</p>
              <p className="mt-4 text-sm text-white/70">
                Automatisch geüpdatet via Amazon scraping.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-white/60">LED masten</p>
                <p className="text-2xl font-semibold text-white">32</p>
                <p className="text-xs text-emerald-200">+6 nieuw</p>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-white/60">Gem. review</p>
                <p className="text-2xl font-semibold text-white">4,3★</p>
                <p className="text-xs text-amber-200">Amazon top-rated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



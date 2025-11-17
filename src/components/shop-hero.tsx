export function ShopHero() {
  return (
    <section className="w-full rounded-3xl bg-white p-10 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-800">
            nieuwe collectie 2025
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Laat je vlaggenmast stralen met geselecteerde kerstverlichting.
          </h1>
          <p className="text-lg text-slate-600">
            Kies uit premium LED bomen, sterrenmantels en accessoires. Handpicked door
            onze specialisten en direct leverbaar binnen Nederland.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white">
              Shop nieuwe items
            </button>
            <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Vraag advies
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-emerald-200 via-amber-100 to-white p-8 text-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-600">Top reviews</p>
              <p className="text-4xl font-semibold">4.7 ★</p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-900">
              trusted
            </div>
          </div>
          <p className="mt-6 text-lg">“Snel geleverd en de mast is prachtig verlicht!”</p>
          <p className="text-sm text-slate-600">— Fam. van den Berg</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Levertijd</p>
              <p className="text-2xl font-semibold">2-4 dagen</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sets op voorraad</p>
              <p className="text-2xl font-semibold">86</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


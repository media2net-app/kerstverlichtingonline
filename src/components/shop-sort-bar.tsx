type Props = {
  total: number;
};

const sortOptions = ["Aanbevolen", "Prijs: laag-hoog", "Prijs: hoog-laag", "Alfabetisch"];

export function ShopSortBar({ total }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 font-semibold text-slate-500">
          ◻︎
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 font-semibold text-slate-500">
          ☰
        </button>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Toont {total} items</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Sorteren op</p>
        <select className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 focus:outline-none">
          {sortOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}



"use client";

import { useState } from "react";

type Props = {
  onScrape: (url?: string) => Promise<void>;
  loading: boolean;
  status: { type: "idle" | "success" | "error" | "info"; message: string };
  lastUpdated?: string;
  total: number;
  defaultUrl: string;
};

export function ScrapePanel({
  onScrape,
  loading,
  status,
  lastUpdated,
  total,
  defaultUrl,
}: Props) {
  const [customUrl, setCustomUrl] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onScrape(customUrl.trim() || undefined);
  };

  const badgeColor = {
    idle: "text-white/70",
    info: "text-amber-200",
    success: "text-emerald-200",
    error: "text-rose-200",
  }[status.type];

  return (
    <div
      id="scrape-tool"
      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-emerald-900/40"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Scrape tool</p>
          <p className="text-2xl font-semibold text-white">Live Amazon refresh</p>
        </div>
        <span className="rounded-full bg-emerald-400/20 px-4 py-1 text-xs font-semibold text-emerald-100">
          {total} producten
        </span>
      </div>
      <p className={`mt-3 text-sm ${badgeColor}`}>{status.message}</p>
      {lastUpdated && (
        <p className="text-xs text-white/50">
          Laatste update:{" "}
          {new Date(lastUpdated).toLocaleString("nl-NL", {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <label className="text-xs uppercase tracking-[0.3em] text-white/60">
          Amazon URL (optioneel)
        </label>
        <input
          type="url"
          placeholder={defaultUrl}
          value={customUrl}
          onChange={(event) => setCustomUrl(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-slate-900/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-300 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-emerald-400/60"
        >
          {loading ? "Scrapen..." : "Scrape Amazon opnieuw"}
        </button>
      </form>
    </div>
  );
}



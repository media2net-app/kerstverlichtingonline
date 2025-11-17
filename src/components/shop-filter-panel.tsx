"use client";

import { useState } from "react";

type Filter = {
  title: string;
  options: string[];
};

type Props = {
  filters: Filter[];
  onFilterChange?: (filters: Record<string, string[]>) => void;
};

export function ShopFilterPanel({ filters, onFilterChange }: Props) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({});

  const toggleFilter = (filterTitle: string, option: string) => {
    const current = selectedFilters[filterTitle] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];

    const newFilters = {
      ...selectedFilters,
      [filterTitle]: updated.length > 0 ? updated : [],
    };

    // Remove empty filter groups
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key].length === 0) {
        delete newFilters[key];
      }
    });

    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleExpanded = (filterTitle: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterTitle]: !prev[filterTitle],
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  return (
    <aside className="space-y-6 rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-8">
      <div className="flex items-center justify-between">
        <button className="block w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
          Filter
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Reset
          </button>
        )}
      </div>
      <div className="divide-y divide-slate-100 text-sm text-slate-700">
        {filters.map((filter) => {
          const isExpanded = expandedFilters[filter.title] !== false; // Default to expanded
          const selected = selectedFilters[filter.title] || [];

          return (
            <div key={filter.title} className="py-4 first:pt-0 last:pb-0">
              <button
                onClick={() => toggleExpanded(filter.title)}
                className="flex w-full items-center justify-between"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  {filter.title}
                </p>
                <span className={`text-xs text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {isExpanded && (
                <div className="mt-3 space-y-2">
                  {filter.options.map((option) => {
                    const isChecked = selected.includes(option);
                    return (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 text-slate-600 hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFilter(filter.title, option)}
                          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                        <span>{option}</span>
                        {isChecked && (
                          <span className="ml-auto text-xs text-slate-400">✓</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}


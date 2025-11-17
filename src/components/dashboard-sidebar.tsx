"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Productbeheer", href: "/dashboard/products", icon: "📦" },
  { label: "Bestellingen", href: "/dashboard/orders", icon: "🛒" },
  { label: "Klanten", href: "/dashboard/customers", icon: "👥" },
  { label: "Statistieken", href: "/dashboard/statistics", icon: "📈" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">
            KO
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Dashboard</p>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        >
          <span className="text-lg">🏠</span>
          <span>Terug naar shop</span>
        </Link>
        <Link
          href="/login"
          className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        >
          <span className="text-lg">🚪</span>
          <span>Uitloggen</span>
        </Link>
      </div>
    </aside>
  );
}


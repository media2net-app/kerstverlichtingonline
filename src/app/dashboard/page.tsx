import Link from "next/link";
import { scrapeAmazonListings } from "@/lib/amazon";
import { SAMPLE_FEATURED_PRODUCTS } from "@/lib/sample-products";

export const revalidate = 0;

// Mock data for statistics
const mockStats = {
  totalProducts: 50,
  totalOrders: 127,
  totalRevenue: 45230,
  totalCustomers: 89,
  recentOrders: [
    { id: "ORD-001", customer: "Jan Jansen", amount: 129.99, status: "Verwerkt", date: "2025-01-15" },
    { id: "ORD-002", customer: "Maria de Vries", amount: 89.50, status: "In behandeling", date: "2025-01-15" },
    { id: "ORD-003", customer: "Pieter Bakker", amount: 199.99, status: "Verzonden", date: "2025-01-14" },
    { id: "ORD-004", customer: "Anna Smit", amount: 149.99, status: "Verwerkt", date: "2025-01-14" },
    { id: "ORD-005", customer: "Tom de Boer", amount: 79.99, status: "Nieuw", date: "2025-01-13" },
  ],
};

export default async function DashboardPage() {
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

  const totalProducts = products.products.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard Overzicht</h1>
        <p className="mt-2 text-slate-600">Welkom terug! Hier is een overzicht van je shop.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Totaal Producten</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{totalProducts}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <span className="text-2xl">📦</span>
            </div>
          </div>
          <Link
            href="/dashboard/products"
            className="mt-4 block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Bekijk alle producten →
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Totaal Bestellingen</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.totalOrders}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <span className="text-2xl">🛒</span>
            </div>
          </div>
          <Link
            href="/dashboard/orders"
            className="mt-4 block text-sm font-medium text-green-600 hover:text-green-700"
          >
            Bekijk bestellingen →
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Totale Omzet</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                €{mockStats.totalRevenue.toLocaleString("nl-NL")}
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <Link
            href="/dashboard/statistics"
            className="mt-4 block text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            Bekijk statistieken →
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Totaal Klanten</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.totalCustomers}</p>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <Link
            href="/dashboard/customers"
            className="mt-4 block text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            Bekijk klanten →
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Recente Bestellingen</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Bekijk alle →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Bestelnummer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Klant
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Bedrag
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Datum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockStats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{order.customer}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">€{order.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === "Verwerkt"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Verzonden"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "In behandeling"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

// Mock statistics data
const mockStats = {
  revenue: {
    today: 1250.50,
    thisWeek: 8750.25,
    thisMonth: 45230.00,
    thisYear: 125430.75,
  },
  orders: {
    today: 5,
    thisWeek: 32,
    thisMonth: 127,
    thisYear: 456,
  },
  customers: {
    newToday: 2,
    newThisWeek: 15,
    total: 89,
    active: 67,
  },
  products: {
    total: 50,
    inStock: 45,
    lowStock: 3,
    outOfStock: 2,
  },
  topProducts: [
    { name: "Fairybell LED Kerstboom 6m", sales: 45, revenue: 5849.55 },
    { name: "Galaxy LED Vlaggenmast 5m", sales: 32, revenue: 2864.00 },
    { name: "vidaXL LED Kerstboom 8m", sales: 28, revenue: 5599.72 },
    { name: "iBaycon LED Vlaggenmast 6m", sales: 22, revenue: 3299.78 },
    { name: "Tidyard LED Kerstboom 3m", sales: 18, revenue: 1439.82 },
  ],
  recentActivity: [
    { type: "order", message: "Nieuwe bestelling ORD-007 ontvangen", time: "2 minuten geleden" },
    { type: "customer", message: "Nieuwe klant geregistreerd: Emma de Wit", time: "15 minuten geleden" },
    { type: "order", message: "Bestelling ORD-006 verzonden", time: "1 uur geleden" },
    { type: "product", message: "Productvoorraad bijgewerkt: Fairybell LED", time: "2 uur geleden" },
    { type: "order", message: "Bestelling ORD-005 verwerkt", time: "3 uur geleden" },
  ],
};

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Statistieken</h1>
        <p className="mt-2 text-slate-600">Overzicht van je shop prestaties en metrics</p>
      </div>

      {/* Revenue Cards */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Omzet</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Vandaag</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              €{mockStats.revenue.today.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Deze week</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              €{mockStats.revenue.thisWeek.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Deze maand</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              €{mockStats.revenue.thisMonth.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Dit jaar</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              €{mockStats.revenue.thisYear.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Orders and Customers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Bestellingen</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Vandaag</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.orders.today}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Deze week</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.orders.thisWeek}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Deze maand</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.orders.thisMonth}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Dit jaar</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.orders.thisYear}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Klanten</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Nieuw vandaag</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.customers.newToday}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Nieuw deze week</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.customers.newThisWeek}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Totaal</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.customers.total}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Actief</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.customers.active}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Overview */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Productvoorraad</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Totaal producten</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{mockStats.products.total}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Op voorraad</p>
            <p className="mt-2 text-3xl font-semibold text-green-600">{mockStats.products.inStock}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Lage voorraad</p>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">{mockStats.products.lowStock}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Uitverkocht</p>
            <p className="mt-2 text-3xl font-semibold text-red-600">{mockStats.products.outOfStock}</p>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Top Producten</h2>
          <div className="space-y-4">
            {mockStats.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-600">{product.sales} verkopen</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">€{product.revenue.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Recente Activiteit</h2>
          <div className="space-y-4">
            {mockStats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm">
                  {activity.type === "order" && "🛒"}
                  {activity.type === "customer" && "👤"}
                  {activity.type === "product" && "📦"}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


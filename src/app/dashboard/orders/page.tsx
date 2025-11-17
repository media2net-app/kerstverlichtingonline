"use client";

import { useState } from "react";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customer: { name: "Jan Jansen", email: "jan@example.nl" },
    items: [
      { product: "Fairybell LED Kerstboom 6m", quantity: 1, price: 129.99 },
    ],
    total: 129.99,
    status: "Verwerkt",
    date: "2025-01-15",
    shippingAddress: "Hoofdstraat 123, 1234 AB Amsterdam",
  },
  {
    id: "ORD-002",
    customer: { name: "Maria de Vries", email: "maria@example.nl" },
    items: [
      { product: "Galaxy LED Vlaggenmast 5m", quantity: 1, price: 89.50 },
    ],
    total: 89.50,
    status: "In behandeling",
    date: "2025-01-15",
    shippingAddress: "Kerkstraat 45, 5678 CD Rotterdam",
  },
  {
    id: "ORD-003",
    customer: { name: "Pieter Bakker", email: "pieter@example.nl" },
    items: [
      { product: "vidaXL LED Kerstboom 8m", quantity: 1, price: 199.99 },
    ],
    total: 199.99,
    status: "Verzonden",
    date: "2025-01-14",
    shippingAddress: "Parkweg 78, 9012 EF Utrecht",
  },
  {
    id: "ORD-004",
    customer: { name: "Anna Smit", email: "anna@example.nl" },
    items: [
      { product: "iBaycon LED Vlaggenmast 6m", quantity: 1, price: 149.99 },
    ],
    total: 149.99,
    status: "Verwerkt",
    date: "2025-01-14",
    shippingAddress: "Dorpsstraat 12, 3456 GH Den Haag",
  },
  {
    id: "ORD-005",
    customer: { name: "Tom de Boer", email: "tom@example.nl" },
    items: [
      { product: "Tidyard LED Kerstboom 3m", quantity: 1, price: 79.99 },
    ],
    total: 79.99,
    status: "Nieuw",
    date: "2025-01-13",
    shippingAddress: "Molenstraat 34, 7890 IJ Eindhoven",
  },
  {
    id: "ORD-006",
    customer: { name: "Lisa van der Berg", email: "lisa@example.nl" },
    items: [
      { product: "Fairybell LED Kerstboom 6m", quantity: 2, price: 129.99 },
    ],
    total: 259.98,
    status: "Verzonden",
    date: "2025-01-13",
    shippingAddress: "Beeklaan 56, 2345 KL Groningen",
  },
];

const statusColors = {
  Nieuw: "bg-slate-100 text-slate-800",
  "In behandeling": "bg-yellow-100 text-yellow-800",
  Verwerkt: "bg-green-100 text-green-800",
  Verzonden: "bg-blue-100 text-blue-800",
  Geannuleerd: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("Alle");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders =
    selectedStatus === "Alle"
      ? mockOrders
      : mockOrders.filter((order) => order.status === selectedStatus);

  const statuses = ["Alle", "Nieuw", "In behandeling", "Verwerkt", "Verzonden", "Geannuleerd"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Bestellingen</h1>
          <p className="mt-2 text-slate-600">
            Overzicht van alle bestellingen ({mockOrders.length} totaal)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedStatus === status
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Zoek bestellingen..."
          className="ml-auto flex-1 max-w-xs rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-slate-900">{order.id}</h3>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      statusColors[order.status as keyof typeof statusColors] || statusColors.Nieuw
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <div>
                    <span className="font-medium">Klant:</span> {order.customer.name} ({order.customer.email})
                  </div>
                  <div>
                    <span className="font-medium">Datum:</span> {order.date}
                  </div>
                  <div>
                    <span className="font-medium">Verzendadres:</span> {order.shippingAddress}
                  </div>
                  <div>
                    <span className="font-medium">Totaal:</span>{" "}
                    <span className="font-semibold text-slate-900">€{order.total.toFixed(2)}</span>
                  </div>
                </div>
                {expandedOrder === order.id && (
                  <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h4 className="mb-2 text-sm font-semibold text-slate-900">Bestelde producten:</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm text-slate-600">
                          <span>
                            {item.product} (x{item.quantity})
                          </span>
                          <span className="font-medium text-slate-900">€{item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="ml-4 flex flex-col gap-2">
                <button
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order.id ? null : order.id)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  {expandedOrder === order.id ? "Verberg details" : "Bekijk details"}
                </button>
                {order.status === "Nieuw" && (
                  <button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800">
                    Verwerk
                  </button>
                )}
                {order.status === "Verwerkt" && (
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
                    Markeer als verzonden
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";

// Mock customers data
const mockCustomers = [
  {
    id: "CUST-001",
    name: "Jan Jansen",
    email: "jan@example.nl",
    phone: "+31 6 12345678",
    totalOrders: 3,
    totalSpent: 389.97,
    lastOrder: "2025-01-15",
    status: "Actief",
  },
  {
    id: "CUST-002",
    name: "Maria de Vries",
    email: "maria@example.nl",
    phone: "+31 6 23456789",
    totalOrders: 1,
    totalSpent: 89.50,
    lastOrder: "2025-01-15",
    status: "Actief",
  },
  {
    id: "CUST-003",
    name: "Pieter Bakker",
    email: "pieter@example.nl",
    phone: "+31 6 34567890",
    totalOrders: 2,
    totalSpent: 279.98,
    lastOrder: "2025-01-14",
    status: "Actief",
  },
  {
    id: "CUST-004",
    name: "Anna Smit",
    email: "anna@example.nl",
    phone: "+31 6 45678901",
    totalOrders: 1,
    totalSpent: 149.99,
    lastOrder: "2025-01-14",
    status: "Actief",
  },
  {
    id: "CUST-005",
    name: "Tom de Boer",
    email: "tom@example.nl",
    phone: "+31 6 56789012",
    totalOrders: 1,
    totalSpent: 79.99,
    lastOrder: "2025-01-13",
    status: "Actief",
  },
  {
    id: "CUST-006",
    name: "Lisa van der Berg",
    email: "lisa@example.nl",
    phone: "+31 6 67890123",
    totalOrders: 1,
    totalSpent: 259.98,
    lastOrder: "2025-01-13",
    status: "Actief",
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Klanten</h1>
          <p className="mt-2 text-slate-600">
            Overzicht van alle klanten ({mockCustomers.length} totaal)
          </p>
        </div>
        <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          + Nieuwe klant
        </button>
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Zoek klanten op naam of e-mail..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
      </div>

      {/* Customers Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Klant
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Bestellingen
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Totaal uitgegeven
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Laatste bestelling
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Acties
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{customer.name}</div>
                      <div className="text-xs text-slate-500">{customer.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{customer.email}</div>
                    <div className="text-xs text-slate-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{customer.totalOrders}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      €{customer.totalSpent.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{customer.lastOrder}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
                        Bekijk
                      </button>
                      <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
                        Bewerken
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <p className="text-slate-600">Geen klanten gevonden met deze zoekopdracht.</p>
        </div>
      )}
    </div>
  );
}


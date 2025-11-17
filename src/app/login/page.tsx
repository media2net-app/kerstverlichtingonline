"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "admin@kerstverlichtingonline.nl",
    password: "admin123",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any email/password
    // In production, this would validate against a backend
    if (formData.email && formData.password) {
      // Store login state (in production, use proper auth)
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Vul alle velden in");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <SiteHeader />
      <main className="w-full px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl bg-white p-8 shadow-lg sm:p-12">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold text-slate-900">Inloggen</h1>
              <p className="mt-2 text-slate-600">
                Log in op je account om verder te gaan
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  E-mailadres
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  placeholder="jouw@email.nl"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-200 text-slate-900 focus:ring-slate-900"
                  />
                  <span>Onthoud mij</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-slate-900 hover:underline"
                >
                  Wachtwoord vergeten?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Inloggen..." : "Inloggen"}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-8 text-center">
              <p className="text-sm text-slate-600">
                Nog geen account?{" "}
                <Link href="/register" className="font-semibold text-slate-900 hover:underline">
                  Registreer hier
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


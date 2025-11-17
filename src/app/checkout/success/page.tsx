import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-6 py-16 lg:px-12">
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-12 w-12 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-3xl font-semibold text-slate-900">Bestelling geplaatst!</h1>
          <p className="mb-2 text-slate-600">
            Bedankt voor je bestelling. We hebben een bevestigingsmail gestuurd naar je e-mailadres.
          </p>
          <p className="mb-8 text-sm text-slate-500">
            Je ontvangt binnenkort meer informatie over de verzending van je bestelling.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-block rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Verder winkelen
            </Link>
            <Link
              href="/"
              className="inline-block rounded-full border border-slate-200 px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Terug naar home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}


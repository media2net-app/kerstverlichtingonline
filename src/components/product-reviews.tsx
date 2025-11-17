import { ProductReview } from "@/lib/amazon";

type Props = {
  reviews: ProductReview[];
};

export function ProductReviews({ reviews }: Props) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 rounded-3xl bg-white p-6 shadow-lg sm:p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-900">Trusted Top Reviews</h2>
        <p className="mt-2 text-slate-600">
          Wat andere klanten zeggen over dit product
        </p>
      </div>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-6"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "text-amber-400"
                            : "text-slate-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                      ✓ Verifieerde aankoop
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {review.title}
                </h3>
              </div>
            </div>
            <p className="mb-4 text-slate-700 leading-relaxed">{review.content}</p>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span className="font-medium text-slate-700">{review.author}</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


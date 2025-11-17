import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const revalidate = 3600;

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <SiteHeader />
      <main className="w-full px-6 py-10 lg:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-slate-900">Blog</h1>
          <p className="mt-2 text-slate-600">
            Tips, gidsen en inspiratie voor jouw perfecte kerstverlichting
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl bg-slate-100">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    <svg
                      className="h-16 w-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{new Date(post.date).toLocaleDateString("nl-NL")}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                <span className="inline-block text-sm font-semibold text-slate-900 group-hover:underline">
                  Lees meer →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}



"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  source: { name: string };
  publishedAt: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Yangiliklarni yuklab bo‘lmadi.");
        }

        setArticles(data.articles || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Noma’lum xatolik yuz berdi."
        );
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
          <a href="/" className="text-2xl font-black tracking-tight">
            <span className="text-sky-400">NEWS</span>UZ
          </a>
          <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-300">
            Jonli yangiliklar
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-sky-400">
          Dunyo xabarlari
        </p>

        <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
          Dunyo yangiliklari
          <span className="text-sky-400"> bir joyda.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
          Eng so‘nggi xabarlar, muhim voqealar va dunyoda sodir bo‘layotgan
          yangiliklarni kuzatib boring.
        </p>

        {loading && (
          <p className="mt-10 text-sky-300">Yangiliklar yuklanmoqda...</p>
        )}

        {error && (
          <div className="mt-10 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <p className="mt-10 text-slate-400">
            Hozircha yangiliklar topilmadi.
          </p>
        )}

        {!loading && !error && articles.length > 0 && (
          <>
            <div className="mb-6 mt-12 flex items-center justify-between">
              <h2 className="text-2xl font-bold">So‘nggi xabarlar</h2>
              <span className="text-sm text-slate-400">
                {articles.length} ta maqola
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <article
                  key={`${article.url}-${index}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-950/40"
                >
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt=""
                      loading="lazy"
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-gradient-to-br from-sky-950 to-slate-800 text-5xl">
                      📰
                    </div>
                  )}

                  <div className="p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-sky-400">
                      {article.source?.name || "Yangiliklar"}
                    </p>

                    <h3 className="text-lg font-bold leading-7 transition group-hover:text-sky-300">
                      {article.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                      {article.description || "Maqola haqida batafsil ma’lumotni o‘qing."}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <time className="text-xs text-slate-500">
                        {article.publishedAt &&
                          !Number.isNaN(Date.parse(article.publishedAt))
                          ? new Date(article.publishedAt).toLocaleDateString(
                              "uz-UZ"
                            )
                          : ""}
                      </time>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-sky-400 hover:text-sky-300"
                      >
                        Batafsil ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="border-t border-white/10 px-5 py-7 text-center text-sm text-slate-500">
        NEWSUZ · Yangiliklar bir joyda
      </footer>
    </main>
  );
}

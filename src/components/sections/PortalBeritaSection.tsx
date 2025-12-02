"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  published: string;
  content: string;
  author: {
    displayName: string;
  };
  labels?: string[];
}

interface BloggerFeedData {
  feed: {
    entry: {
      id: { $t: string };
      title: { $t: string };
      link: { href: string; rel: string }[];
      published: { $t: string };
      content: { $t: string };
      author: { name: { $t: string } }[];
      category?: { term: string }[];
    }[];
  };
}

declare global {
  interface Window {
    [key: string]: ((data: BloggerFeedData) => void) | undefined;
  }
}

const PortalBeritaSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ENV Next.js
  const BLOG_SOURCES = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_BLOG_URLS || "";
    return raw
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.startsWith("http"));
  }, []);

  const MAX_RESULTS = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_MAX_RESULTS_PER_BLOG || "50";
    return Math.min(parseInt(raw), 50);
  }, []);

  // Utils
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const stripHtmlTags = useCallback((html: string) => {
    if (typeof document === "undefined") return "";
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  }, []);

  const truncateText = useCallback(
    (text: string, maxLength: number = 120) => {
      if (!text) return "";
      const stripped = stripHtmlTags(text);
      return stripped.length > maxLength
        ? stripped.substring(0, maxLength) + "..."
        : stripped;
    },
    [stripHtmlTags]
  );

  const getFirstImage = useCallback((post: BlogPost) => {
    if (typeof document === "undefined") return null;
    const temp = document.createElement("div");
    temp.innerHTML = post.content;
    const img = temp.querySelector("img");
    let imgSrc = img ? img.src : null;

    if (imgSrc && imgSrc.includes("/s1600/")) {
      imgSrc = imgSrc.replace("/s1600/", "/s0/");
    }
    return imgSrc;
  }, []);

  // JSONP Blogger Fetch
  useEffect(() => {
    if (BLOG_SOURCES.length === 0) {
      setError("URL Blog tidak ditemukan. Harap atur NEXT_PUBLIC_BLOG_URLS.");
      setLoading(false);
      return;
    }

    setLoading(true);
    let completed = 0;
    let allPosts: BlogPost[] = [];
    const total = BLOG_SOURCES.length;
    const scriptTags: HTMLScriptElement[] = [];

    const processResponse = (data: BloggerFeedData) => {
      if (data.feed?.entry) {
        const transformed = data.feed.entry.map((entry) => {
          const postUrl =
            entry.link.find((link) => link.rel === "alternate")?.href || "#";

          return {
            id: entry.id.$t,
            title: entry.title.$t,
            url: postUrl,
            published: entry.published.$t,
            content: entry.content.$t,
            author: { displayName: entry.author[0].name.$t },
            labels: entry.category?.map((c) => c.term),
          };
        });

        allPosts = allPosts.concat(transformed);
      }

      completed++;
      if (completed === total) {
        allPosts.sort(
          (a, b) =>
            new Date(b.published).getTime() -
            new Date(a.published).getTime()
        );
        setPosts(allPosts);
        setLoading(false);
      }
    };

    BLOG_SOURCES.forEach((baseUrl, index) => {
      const callbackName = `bloggerjsonp_${index}`;

      window[callbackName] = (data: BloggerFeedData) => {
        processResponse(data);
        delete window[callbackName];
      };

      const apiUrl = `${baseUrl}/feeds/posts/default?alt=json-in-script&max-results=${MAX_RESULTS}&callback=${callbackName}`;

      const script = document.createElement("script");
      script.src = apiUrl;
      script.onerror = () => {
        setError("Gagal memuat data blog. Cek URL di .env");
        completed++;
        if (completed === total) setLoading(false);
        delete window[callbackName];
      };

      document.body.appendChild(script);
      scriptTags.push(script);
    });

    return () => {
      scriptTags.forEach((script) => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });

      BLOG_SOURCES.forEach((_, i) => {
        delete window[`bloggerjsonp_${i}`];
      });
    };
  }, [BLOG_SOURCES, MAX_RESULTS]);

  // UI sama seperti kode kamu sebelumnya
  if (loading) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-black">
          Memuat artikel dari {BLOG_SOURCES.length} blog...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">
            PORTAL INFORMASI TERBARU
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Berita & Artikel Gabungan
          </h2>
          <p className="text-lg text-gray-800 mt-4">
            Menampilkan {posts.length} artikel terbaru dari{" "}
            {BLOG_SOURCES.length} sumber blog.
          </p>
        </div>

        {/* GRID ARTICLES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => {
            const thumbnail = getFirstImage(post);

            return (
              <article
                key={post.id}
                className="bg-white rounded-3xl shadow-xl border hover:shadow-2xl transition-all overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      [Image]
                    </div>
                  )}

                  {post.labels && post.labels.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full shadow">
                        {post.labels[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {post.author.displayName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(post.published)}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 line-clamp-2 text-stone-900">
                    <Link
                    // Kita gunakan ID sebagai slug
                    href={`/article/${post.id}`} 
                    className="hover:text-blue-600"
                    >
                    {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {truncateText(post.content)}
                  </p>

                  <a
                    href={post.url}
                    target="_blank"
                    className="text-blue-600 font-semibold inline-flex items-center gap-2"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortalBeritaSection;

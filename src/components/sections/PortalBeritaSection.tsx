"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, Calendar, User, Cpu, Zap } from "lucide-react";
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
  slug: string;
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

interface PortalBeritaSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

const PortalBeritaSection = ({ 
  limit, 
  showViewAll = false 
}: PortalBeritaSectionProps) => {
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

  // Generate slug dari title atau URL
  const generateSlug = useCallback((title: string, url: string) => {
    // Coba extract dari URL blogger dulu
    const urlMatch = url.match(/\/(\d{4})\/(\d{2})\/([^.]+)\.html/);
    if (urlMatch) {
      return urlMatch[3]; // Ambil slug dari URL blogger
    }
    
    // Fallback: buat slug dari title
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Hapus karakter special
      .replace(/\s+/g, '-') // Ganti spasi dengan dash
      .replace(/-+/g, '-') // Hapus multiple dash
      .trim();
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
          const title = entry.title.$t;

          return {
            id: entry.id.$t,
            title: title,
            url: postUrl,
            published: entry.published.$t,
            content: entry.content.$t,
            author: { displayName: entry.author[0].name.$t },
            labels: entry.category?.map((c) => c.term),
            slug: generateSlug(title, postUrl),
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
      const callbackName = `bloggerjsonp_${index}_${Date.now()}`;

      // Daftarkan callback SEBELUM membuat script
      window[callbackName] = (data: BloggerFeedData) => {
        try {
          processResponse(data);
        } catch (err) {
          console.error('Error processing blog data:', err);
        } finally {
          delete window[callbackName];
        }
      };

      const apiUrl = `${baseUrl}/feeds/posts/default?alt=json-in-script&max-results=${MAX_RESULTS}&callback=${callbackName}`;

      const script = document.createElement("script");
      script.src = apiUrl;
      script.async = true;
      
      script.onerror = () => {
        console.error(`Gagal memuat blog dari: ${baseUrl}`);
        completed++;
        if (completed === total && allPosts.length === 0) {
          setError("Gagal memuat data blog. Cek URL di .env");
          setLoading(false);
        }
        delete window[callbackName];
      };

      document.body.appendChild(script);
      scriptTags.push(script);
    });

    // Cleanup function
    return () => {
      scriptTags.forEach((script) => {
        try {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        } catch (err) {
          console.error('Error removing script:', err);
        }
      });

      // Clean up all callback functions
      Object.keys(window).forEach(key => {
        if (key.startsWith('bloggerjsonp_')) {
          delete window[key];
        }
      });
    };
  }, [BLOG_SOURCES, MAX_RESULTS, generateSlug]);

  // Batasi artikel jika limit diberikan
  const displayedPosts = useMemo(() => {
    return limit ? posts.slice(0, limit) : posts;
  }, [posts, limit]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-center">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-blue-500 mx-auto"></div>
          <Cpu className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-6 text-gray-700 font-semibold">
          Memuat artikel dari {BLOG_SOURCES.length} blog...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Simple Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.5)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-bold mb-4 shadow-lg">
            <Zap className="w-4 h-4" />
            PORTAL INFORMASI TEKNOLOGI
          </div>
          
          <h2 className="text-4xl p-2 md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Berita & Artikel Gabungan
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-lg text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>
              {limit
                ? `Menampilkan ${displayedPosts.length} artikel terbaru`
                : `Menampilkan ${posts.length} artikel`}{" "}
              dari {BLOG_SOURCES.length} sumber
            </span>
          </div>
        </div>

        {/* GRID ARTICLES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => {
            const thumbnail = getFirstImage(post);

            return (
              <article
                key={post.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-200"
              >
                {/* LINK KE INTERNAL WEBSITE */}
                <Link href={`/article/${post.slug}`} className="block">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {thumbnail ? (
                      <>
                        <img
                          src={thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Cpu className="w-16 h-16 text-blue-300" />
                      </div>
                    )}

                    {/* Label Badge */}
                    {post.labels && post.labels.length > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-full shadow-lg">
                          {post.labels[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Metadata */}
                    <div className="flex justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[120px]">{post.author.displayName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.published)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {truncateText(post.content)}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mb-4"></div>

                    {/* Read More */}
                    <div className="inline-flex items-center gap-2 text-blue-600 group-hover:text-cyan-600 font-semibold text-sm transition-colors duration-300">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>

                {/* Bottom Border Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </article>
            );
          })}
        </div>

        {/* TOMBOL LIHAT SEMUA */}
        {showViewAll && limit && posts.length > limit && (
          <div className="text-center mt-16">
            <Link
              href="/article"
              className="group/btn inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortalBeritaSection;
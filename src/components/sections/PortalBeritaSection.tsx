"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, Calendar, User, Tag, Zap, Cpu, Code } from "lucide-react";
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
  slug: string; // Tambahan untuk slug
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

  // JSONP Blogger Fetch - FIXED
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
            slug: generateSlug(title, postUrl), // Generate slug
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

      // PENTING: Daftarkan callback SEBELUM membuat script
      window[callbackName] = (data: BloggerFeedData) => {
        try {
          processResponse(data);
        } catch (err) {
          console.error('Error processing blog data:', err);
        } finally {
          // Cleanup
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-center relative overflow-hidden">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.5)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-float-particle" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-float-particle" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-blue-300 rounded-full animate-float-particle" style={{ animationDuration: '6s' }}></div>
        
        <div className="relative z-10">
          <div className="relative inline-block">
            <div className="animate-spin-slow rounded-full h-16 w-16 border-4 border-t-transparent border-blue-500 mx-auto"></div>
            <Cpu className="w-8 h-8 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
          </div>
          <p className="mt-6 text-blue-200 font-semibold animate-pulse-slow">
            <span className="inline-flex items-center gap-2">
              <Zap className="w-4 h-4 animate-flash" />
              Memuat artikel dari {BLOG_SOURCES.length} blog...
              <Zap className="w-4 h-4 animate-flash" style={{ animationDelay: '0.3s' }} />
            </span>
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.5)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        <p className="text-red-400 font-semibold relative z-10">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Tech Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.5)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move"></div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute top-20 left-10 opacity-20">
        <Code className="w-16 h-16 text-blue-400 animate-float-slow" />
      </div>
      <div className="absolute top-40 right-20 opacity-20">
        <Cpu className="w-20 h-20 text-cyan-400 animate-float" />
      </div>
      <div className="absolute bottom-20 left-1/4 opacity-20">
        <Zap className="w-12 h-12 text-blue-300 animate-sway" />
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan-horizontal opacity-30"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-bold mb-4 animate-pulse-glow shadow-lg shadow-blue-500/50">
            <Zap className="w-4 h-4 animate-flash" />
            PORTAL INFORMASI TEKNOLOGI
            <Zap className="w-4 h-4 animate-flash" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x mb-4">
            Berita & Artikel Gabungan
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-lg text-blue-200 animate-fade-in">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping-slow"></div>
            <span>
              {limit
                ? `Menampilkan ${displayedPosts.length} artikel terbaru`
                : `Menampilkan ${posts.length} artikel`}{" "}
              dari {BLOG_SOURCES.length} sumber
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping-slow" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* GRID ARTICLES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => {
            const thumbnail = getFirstImage(post);
            const animationDelay = `${index * 0.15}s`;

            return (
              <article
                key={post.id}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 animate-fade-in-up hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                style={{ animationDelay }}
              >
                {/* Tech Corner Decorations */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-blue-500/30 rounded-tl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-500/30 rounded-br-2xl"></div>

                {/* Scan Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-px bg-blue-400 animate-scan"></div>
                </div>

                {/* LINK KE INTERNAL WEBSITE - Bukan ke Blogger */}
                <Link href={`/article/${post.slug}`} className="block">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    {thumbnail ? (
                      <>
                        <img
                          src={thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code className="w-16 h-16 text-blue-500/30 animate-pulse-slow" />
                      </div>
                    )}

                    {/* Label Badge */}
                    {post.labels && post.labels.length > 0 && (
                      <div className="absolute top-3 left-3 animate-fade-in-left">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse-glow border border-blue-400/50">
                          {post.labels[0]}
                        </span>
                      </div>
                    )}

                    {/* Tech Badge Corner */}
                    <div className="absolute bottom-3 right-3">
                      <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-blue-400/30 animate-pulse-slow">
                        <Cpu className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    {/* Metadata */}
                    <div className="flex justify-between text-xs text-blue-300/70 mb-4">
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
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {truncateText(post.content)}
                    </p>

                    {/* Tech Divider */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping-slow"></div>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                    </div>

                    {/* Read More Text */}
                    <div className="inline-flex items-center gap-2 text-blue-400 group-hover:text-cyan-400 font-semibold text-sm transition-all duration-300">
                      <span className="relative">
                        Baca Selengkapnya
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>

                {/* Bottom Glow Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </article>
            );
          })}
        </div>

        {/* TOMBOL LIHAT SEMUA */}
        {showViewAll && limit && posts.length > limit && (
          <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/article"
              className="group/btn relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white font-bold rounded-full shadow-2xl shadow-blue-500/50 hover:shadow-cyan-500/50 transition-all duration-500 overflow-hidden animate-pulse-glow"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              
              {/* Scan Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-white/50 animate-scan-horizontal"></div>
              </div>

              <Zap className="w-5 h-5 relative z-10 animate-flash" />
              <span className="relative z-10">Lihat Semua Artikel</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300" />
              
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white/50"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white/50"></div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortalBeritaSection;
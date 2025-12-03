// src/app/(public)/article/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Calendar, User, Tag, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
  author: {
    displayName: string;
    image?: {
      url: string;
    };
  };
  url: string;
  labels?: string[];
}

// Fungsi untuk generate slug (sama seperti di PortalBeritaSection)
function generateSlug(title: string, url: string): string {
  const urlMatch = url.match(/\/(\d{4})\/(\d{2})\/([^.]+)\.html/);
  if (urlMatch) {
    return urlMatch[3];
  }
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Fungsi untuk fetch artikel dari semua blog sources
async function fetchArticleBySlug(slug: string): Promise<BlogPost | null> {
  const blogUrls = process.env.NEXT_PUBLIC_BLOG_URLS?.split(",").map(url => url.trim()) || [];
  const maxResults = process.env.NEXT_PUBLIC_MAX_RESULTS_PER_BLOG || "50";

  console.log(`🔍 Searching for slug: ${slug} in ${blogUrls.length} blogs`);

  // Fetch dari semua blog sources
  for (const blogUrl of blogUrls) {
    try {
      const apiUrl = `${blogUrl}/feeds/posts/default?alt=json&max-results=${maxResults}`;
      console.log(`📡 Fetching from: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        next: { revalidate: 3600 }, // Cache 1 jam
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        console.log(`❌ Failed to fetch from ${blogUrl}: ${response.status}`);
        continue;
      }

      const data = await response.json();
      
      if (data.feed?.entry) {
        console.log(`✅ Found ${data.feed.entry.length} entries in ${blogUrl}`);
        
        // Cari artikel yang match dengan slug
        for (const entry of data.feed.entry) {
          const postUrl = entry.link.find((link: any) => link.rel === "alternate")?.href || "";
          const title = entry.title.$t;
          const postSlug = generateSlug(title, postUrl);
          
          console.log(`🔎 Checking: ${postSlug} === ${slug}`);
          
          if (postSlug === slug) {
            console.log(`✅ MATCH FOUND!`);
            return {
              id: entry.id.$t,
              title: entry.title.$t,
              content: entry.content.$t,
              published: entry.published.$t,
              author: {
                displayName: entry.author[0].name.$t,
                image: entry.author[0].gd$image
              },
              url: postUrl,
              labels: entry.category?.map((c: any) => c.term),
            };
          }
        }
      } else {
        console.log(`⚠️ No entries found in ${blogUrl}`);
      }
    } catch (error) {
      console.error(`❌ Error fetching from ${blogUrl}:`, error);
      continue;
    }
  }

  console.log(`❌ No article found for slug: ${slug}`);
  return null;
}

// Generate metadata untuk SEO
export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const post = await fetchArticleBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  // Extract first image from content for OG image
  const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
  const ogImage = imgMatch ? imgMatch[1] : null;

  return {
    title: post.title,
    description: post.content.replace(/<[^>]*>/g, "").substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.replace(/<[^>]*>/g, "").substring(0, 160),
      images: ogImage ? [ogImage] : [],
      type: "article",
      publishedTime: post.published,
      authors: [post.author.displayName],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Await params untuk Next.js 15+
  const resolvedParams = await params;
  const post = await fetchArticleBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <PublicHeader />
      
      <main className="flex-grow py-12 relative">
        {/* Tech Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.5)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          {/* Back Button */}
          <Link 
            href="/article"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-cyan-400 mb-8 group transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Kembali ke Artikel</span>
          </Link>

          {/* Article Card */}
          <article className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/10">
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-blue-500/20">
              {/* Labels */}
              {post.labels && post.labels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.labels.map((label, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-full shadow-lg border border-blue-400/50"
                    >
                      <Tag className="w-3 h-3" />
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-blue-300/80">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-300/60">Ditulis oleh</p>
                    <p className="font-semibold text-white">{post.author.displayName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-300/60">Dipublikasikan</p>
                    <p className="font-semibold text-white">{formatDate(post.published)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Tech Divider */}
              <div className="flex items-center gap-2 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping-slow"></div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-p:text-slate-300 prose-p:leading-relaxed
                  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-cyan-400
                  prose-strong:text-white prose-strong:font-bold
                  prose-ul:text-slate-300 prose-ol:text-slate-300
                  prose-li:text-slate-300
                  prose-blockquote:border-l-blue-500 prose-blockquote:text-blue-300
                  prose-code:text-cyan-400 prose-code:bg-slate-950 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-slate-950 prose-pre:border prose-pre:border-blue-500/20
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-blue-500/20"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Bottom Divider */}
              <div className="flex items-center gap-2 mt-12 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping-slow"></div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              </div>

              {/* Share Section */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-950/50 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                    <Share2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Bagikan Artikel Ini</p>
                    <p className="text-blue-300/60 text-sm">Sebarkan informasi bermanfaat</p>
                  </div>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Lihat di Blogger
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </div>
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link
              href="/article"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-cyan-500/50 transition-all duration-500"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Semua Artikel
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
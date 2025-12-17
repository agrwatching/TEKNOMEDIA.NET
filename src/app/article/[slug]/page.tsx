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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <PublicHeader />
      
      <main className="flex-grow py-12 relative">
        {/* Light Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.5)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          {/* Back Button */}
          <Link 
            href="/article"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-cyan-600 mb-8 group transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Kembali ke Artikel</span>
          </Link>

          {/* Article Card */}
          <article className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-xl shadow-blue-100/50">
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-blue-100 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
              {/* Labels */}
              {post.labels && post.labels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.labels.map((label, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-full shadow-md"
                    >
                      <Tag className="w-3 h-3" />
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ditulis oleh</p>
                    <p className="font-semibold text-gray-900">{post.author.displayName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center border border-cyan-200">
                    <Calendar className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dipublikasikan</p>
                    <p className="font-semibold text-gray-900">{formatDate(post.published)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Divider */}
              <div className="flex items-center gap-2 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
              </div>

              {/* Article Content - Newspaper Style with Light Theme */}
              <div 
                className="article-content prose prose-lg max-w-none
                  [&_p]:text-justify [&_p]:hyphens-auto [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-gray-700
                  [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:shadow-lg [&_img]:border [&_img]:border-blue-200
                  [&_img:first-of-type]:float-left [&_img:first-of-type]:mr-6 [&_img:first-of-type]:mb-4 [&_img:first-of-type]:max-w-[45%]
                  [&_img:nth-of-type(2)]:float-right [&_img:nth-of-type(2)]:ml-6 [&_img:nth-of-type(2)]:mb-4 [&_img:nth-of-type(2)]:max-w-[45%]
                  [&_img:nth-of-type(3)]:float-left [&_img:nth-of-type(3)]:mr-6 [&_img:nth-of-type(3)]:mb-4 [&_img:nth-of-type(3)]:max-w-[45%]
                  md:[&_img]:float-none md:[&_img]:max-w-full md:[&_img]:mx-0 md:[&_img]:my-4
                  after:content-[''] after:table after:clear-both
                  prose-headings:text-gray-900 prose-headings:font-bold prose-headings:clear-both prose-headings:pt-4
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-cyan-600
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:text-gray-700 prose-ul:clear-both prose-ol:text-gray-700
                  prose-li:text-gray-700
                  prose-blockquote:border-l-blue-600 prose-blockquote:text-gray-700 prose-blockquote:bg-blue-50 prose-blockquote:clear-both
                  prose-code:text-cyan-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-gray-100 prose-pre:border prose-pre:border-blue-200 prose-pre:clear-both"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Bottom Divider */}
              <div className="flex items-center gap-2 mt-12 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
              </div>

              {/* Share Section */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border border-blue-300">
                    <Share2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold">Bagikan Artikel Ini</p>
                    <p className="text-gray-600 text-sm">Sebarkan informasi bermanfaat</p>
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
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
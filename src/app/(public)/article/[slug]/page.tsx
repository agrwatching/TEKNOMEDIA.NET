//src/app/(public)/article/slug/page.tsx
// src/app/(public)/article/[slug]/page.tsx
// Ini adalah Server Component (default di App Router)

import React from "react";

// Definisikan tipe Props yang akan menerima parameter dari URL
interface ArticlePageProps {
  params: {
    slug: string; // ID artikel dari Blogger
  };
}

// Fungsi fetching data artikel (Harus dimodifikasi sesuai Blogger API Anda)
async function fetchArticleContent(articleId: string) {
  // GANTILAH ini dengan endpoint Blogger API yang spesifik untuk satu postingan.
  // Contoh: Jika menggunakan Blogger Data API v3 (membutuhkan API Key):
  // const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/{BLOG_ID}/posts/${articleId}?key={API_KEY}`;
  
  // Karena Anda awalnya menggunakan JSONP, Anda mungkin perlu
  // (a) Mencari tahu cara mengambil satu artikel penuh dari endpoint Anda, 
  // atau (b) Membuat API Route di Next.js untuk mem-*proxy* permintaan.

  // Sebagai contoh, kita akan mengasumsikan ada fungsi yang mengembalikan objek post:
  const dummyPost = {
      title: "Judul Artikel yang Diambil",
      content: "<h1>Ini adalah konten HTML penuh dari artikel Blogger.</h1><p>Anda bisa menampilkannya di sini.</p>",
      author: "Nama Penulis",
      published: "2025-12-02T10:00:00",
  };
  
  if (articleId === "gandaan_id_blogger_anda") {
      return dummyPost;
  }
  
  return null; // Artikel tidak ditemukan
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const articleId = params.slug;
  const post = await fetchArticleContent(articleId);

  if (!post) {
    return <div className="text-center py-20">404 | Artikel tidak ditemukan.</div>;
  }

  return (
    <main className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{post.title}</h1>
      <p className="text-gray-500 mb-8">
        Dipublikasikan oleh {post.author} pada {new Date(post.published).toLocaleDateString("id-ID")}
      </p>
      
      {/* ⚠️ PENTING: Gunakan dangerouslySetInnerHTML untuk merender HTML mentah */}
      <div 
        className="prose max-w-none prose-blue"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      {/* 🛑 PENTING UNTUK SEO: Tag Canonical */}
      <link rel="canonical" href={`https://www.blogger.com/about/?hl=id`} />
    </main>
  );
}
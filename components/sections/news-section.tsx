"use client";

import { Calendar, Clock, ArrowRight } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Kabupaten Naiera Luncurkan Super App untuk Kemudahan Layanan Publik",
    excerpt:
      "Pemerintah Kabupaten Naiera resmi meluncurkan aplikasi Super App yang mengintegrasikan lebih dari 100 layanan publik dalam satu platform digital...",
    category: "Teknologi",
    date: "5 Januari 2026",
    image: "/images/news-1.jpg",
    author: "Humas Pemkab Naiera",
    readTime: "3 menit",
  },
  {
    id: "2",
    title: "Program Bantuan UMKM Digital Tahap 2 Dibuka",
    excerpt:
      "Dinas Koperasi dan UMKM Kabupaten Naiera membuka kembali program bantuan modal dan pelatihan digital untuk pelaku usaha mikro...",
    category: "Ekonomi",
    date: "4 Januari 2026",
    image: "/images/news-2.jpg",
    author: "Dinas Koperasi",
    readTime: "4 menit",
  },
  {
    id: "3",
    title: "PPDB 2026 Dibuka Secara Online, Ini Cara Mendaftarnya",
    excerpt:
      "Pendaftaran Peserta Didik Baru (PPDB) tingkat SD hingga SMA di Kabupaten Naiera tahun ajaran 2026/2027 telah dibuka secara online...",
    category: "Pendidikan",
    date: "3 Januari 2026",
    image: "/images/news-3.jpg",
    author: "Dinas Pendidikan",
    readTime: "5 menit",
  },
];

export function NewsSection() {
  return (
    <section className="py-16 md:py-20 bg-white" id="berita">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Berita Terkini
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Berita & Pengumuman
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl">
              Informasi terbaru seputar kebijakan, program, dan kegiatan
              Pemerintah Kabupaten Naiera
            </p>
          </div>
          <a
            href="#semua-berita"
            className="hidden md:inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors group"
          >
            Lihat Semua
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Featured News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Main Featured */}
          {newsArticles[0] && <NewsCard article={newsArticles[0]} featured />}

          {/* Secondary News */}
          <div className="space-y-6">
            {newsArticles.slice(1).map((article) => (
              <NewsCardCompact key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="text-center md:hidden">
          <a
            href="#semua-berita"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors group"
          >
            Lihat Semua Berita
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

function NewsCard({ article }: NewsCardProps) {
  return (
    <a
      href={`#berita/${article.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-blue-100 overflow-hidden">
        {/* Placeholder gradient - replace with actual image when available */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/80 text-center">
            <Calendar size={48} className="mx-auto mb-2" />
            <p className="text-sm">Gambar Berita</p>
          </div>
        </div>
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-full text-xs font-semibold">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {article.readTime}
            </span>
          </div>
          <span className="text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Baca →
          </span>
        </div>
      </div>
    </a>
  );
}

function NewsCardCompact({ article }: NewsCardProps) {
  return (
    <a
      href={`#berita/${article.id}`}
      className="group flex gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-24 rounded-lg bg-gradient-to-br from-emerald-100 to-blue-100 flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Calendar size={24} className="text-white/60" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-semibold mb-2">
          {article.category}
        </span>
        <h4 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {article.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </a>
  );
}

"use client";

import { Shield, Zap, Users, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Cepat & Efisien",
    description:
      "Proses layanan yang lebih cepat dengan sistem terintegrasi dan otomasi digital.",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description:
      "Data Anda dilindungi dengan enkripsi tingkat tinggi dan standar keamanan nasional.",
  },
  {
    icon: Clock,
    title: "24/7 Tersedia",
    description:
      "Akses layanan kapan saja, di mana saja, tanpa harus datang ke kantor.",
  },
  {
    icon: Users,
    title: "Mudah Digunakan",
    description:
      "Antarmuka yang intuitif dan ramah pengguna untuk semua kalangan usia.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="tentang">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Mengapa Memilih Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Transformasi Digital untuk Pelayanan Lebih Baik
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto">
            Super App Naiera hadir untuk memberikan pengalaman layanan publik
            yang modern, efisien, dan transparan bagi seluruh warga Kabupaten
            Naiera
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
              Mulai Sekarang
            </button>
            <button className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border-2 border-slate-300 transition-all duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div
      className="group p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
        <Icon size={28} strokeWidth={2} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
    </div>
  );
}

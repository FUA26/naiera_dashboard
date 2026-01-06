"use client";

import {
  CreditCard,
  FileCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  IdCard,
  MessageCircle,
  Bus,
  Home,
  Building2,
  Users,
  Briefcase,
  ArrowRight,
  Landmark,
  TreePine,
  MapPin,
  ShieldAlert,
  Palmtree,
  Award,
  Factory,
  Heart,
  Sprout,
  FileSearch,
  Building,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
  badge?: string;
  stats?: string;
  category: string;
}

interface ServiceCategory {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    name: "Kependudukan",
    icon: Users,
    color: "emerald",
    bgColor: "bg-emerald-50",
    services: [
      {
        icon: IdCard,
        name: "E-KTP",
        description: "Pembuatan dan perpanjangan KTP elektronik",
        href: "#e-ktp",
        badge: "Populer",
        stats: "5.2k pengguna",
        category: "Kependudukan",
      },
      {
        icon: FileText,
        name: "Kartu Keluarga",
        description: "Pengurusan dan pembaruan Kartu Keluarga",
        href: "#kk",
        stats: "3.8k pengguna",
        category: "Kependudukan",
      },
      {
        icon: FileCheck,
        name: "Akta Kelahiran",
        description: "Pengurusan akta kelahiran dan duplikat",
        href: "#akta",
        stats: "2.1k dokumen",
        category: "Kependudukan",
      },
      {
        icon: Home,
        name: "Surat Pindah",
        description: "Layanan administrasi surat pindah penduduk",
        href: "#pindah",
        stats: "890 permohonan",
        category: "Kependudukan",
      },
    ],
  },
  {
    name: "Kesehatan",
    icon: HeartPulse,
    color: "rose",
    bgColor: "bg-rose-50",
    services: [
      {
        icon: Heart,
        name: "BPJS Kesehatan",
        description: "Pendaftaran dan informasi layanan BPJS",
        href: "#bpjs",
        badge: "Populer",
        stats: "8.5k peserta",
        category: "Kesehatan",
      },
      {
        icon: Building2,
        name: "Puskesmas Online",
        description: "Jadwal dokter, antrian, dan konsultasi",
        href: "#puskesmas",
        stats: "4.2k kunjungan",
        category: "Kesehatan",
      },
      {
        icon: Users,
        name: "Posyandu",
        description: "Jadwal posyandu dan imunisasi balita",
        href: "#posyandu",
        stats: "2.3k ibu & balita",
        category: "Kesehatan",
      },
    ],
  },
  {
    name: "Pendidikan",
    icon: GraduationCap,
    color: "blue",
    bgColor: "bg-blue-50",
    services: [
      {
        icon: GraduationCap,
        name: "PPDB Online",
        description: "Pendaftaran peserta didik baru SD-SMA",
        href: "#ppdb",
        badge: "Baru",
        stats: "3.7k siswa",
        category: "Pendidikan",
      },
      {
        icon: Award,
        name: "Beasiswa",
        description: "Info dan pendaftaran beasiswa daerah",
        href: "#beasiswa",
        stats: "1.5k penerima",
        category: "Pendidikan",
      },
      {
        icon: FileText,
        name: "Surat Keterangan Sekolah",
        description: "Pengurusan SKL dan surat rekomendasi",
        href: "#surat-sekolah",
        stats: "2.8k dokumen",
        category: "Pendidikan",
      },
    ],
  },
  {
    name: "Ekonomi dan Bisnis",
    icon: Briefcase,
    color: "purple",
    bgColor: "bg-purple-50",
    services: [
      {
        icon: FileCheck,
        name: "Izin Usaha",
        description: "SIUP, TDP, dan izin usaha mikro",
        href: "#izin-usaha",
        stats: "1.9k UMKM",
        category: "Ekonomi dan Bisnis",
      },
      {
        icon: CreditCard,
        name: "Pajak Daerah",
        description: "Pembayaran PBB dan pajak usaha",
        href: "#pajak",
        badge: "Baru",
        stats: "4.5k transaksi",
        category: "Ekonomi dan Bisnis",
      },
      {
        icon: Factory,
        name: "Bantuan Modal UMKM",
        description: "Pengajuan bantuan modal usaha",
        href: "#modal-umkm",
        stats: "680 pengajuan",
        category: "Ekonomi dan Bisnis",
      },
    ],
  },
  {
    name: "Ketenagakerjaan",
    icon: Users,
    color: "amber",
    bgColor: "bg-amber-50",
    services: [
      {
        icon: FileSearch,
        name: "Kartu Kuning",
        description: "Kartu pencari kerja (AK1)",
        href: "#kartu-kuning",
        stats: "2.4k pencari kerja",
        category: "Ketenagakerjaan",
      },
      {
        icon: Building,
        name: "Job Fair",
        description: "Info lowongan kerja dan bursa kerja",
        href: "#job-fair",
        badge: "Populer",
        stats: "1.8k lowongan",
        category: "Ketenagakerjaan",
      },
      {
        icon: Award,
        name: "Pelatihan Kerja",
        description: "Program pelatihan dan sertifikasi",
        href: "#pelatihan",
        stats: "950 peserta",
        category: "Ketenagakerjaan",
      },
    ],
  },
  {
    name: "Pariwisata & Kebudayaan",
    icon: Palmtree,
    color: "cyan",
    bgColor: "bg-cyan-50",
    services: [
      {
        icon: MapPin,
        name: "Destinasi Wisata",
        description: "Panduan wisata dan event budaya",
        href: "#wisata",
        stats: "15k pengunjung",
        category: "Pariwisata & Kebudayaan",
      },
      {
        icon: Award,
        name: "Izin Event",
        description: "Perizinan acara kebudayaan dan festival",
        href: "#izin-event",
        stats: "120 event",
        category: "Pariwisata & Kebudayaan",
      },
    ],
  },
  {
    name: "Infrastruktur",
    icon: Building2,
    color: "slate",
    bgColor: "bg-slate-50",
    services: [
      {
        icon: Building,
        name: "IMB (Izin Mendirikan Bangunan)",
        description: "Permohonan IMB untuk bangunan baru",
        href: "#imb",
        stats: "780 permohonan",
        category: "Infrastruktur",
      },
      {
        icon: MessageCircle,
        name: "Aduan Infrastruktur",
        description: "Laporan jalan rusak, lampu mati, dll",
        href: "#aduan-infra",
        badge: "Populer",
        stats: "1.2k laporan",
        category: "Infrastruktur",
      },
      {
        icon: Bus,
        name: "Transportasi Umum",
        description: "Jadwal dan rute angkutan umum",
        href: "#transportasi",
        stats: "5.6k penumpang",
        category: "Infrastruktur",
      },
    ],
  },
  {
    name: "Sosial",
    icon: Heart,
    color: "pink",
    bgColor: "bg-pink-50",
    services: [
      {
        icon: Users,
        name: "Bantuan Sosial",
        description: "PKH, BPNT, dan bantuan langsung",
        href: "#bansos",
        stats: "3.5k penerima",
        category: "Sosial",
      },
      {
        icon: Home,
        name: "DTKS (Data Terpadu Kesejahteraan Sosial)",
        description: "Pendaftaran dan update data keluarga",
        href: "#dtks",
        stats: "2.8k keluarga",
        category: "Sosial",
      },
    ],
  },
  {
    name: "Lingkungan Hidup",
    icon: TreePine,
    color: "green",
    bgColor: "bg-green-50",
    services: [
      {
        icon: Sprout,
        name: "Bank Sampah",
        description: "Pengelolaan sampah dan daur ulang",
        href: "#bank-sampah",
        stats: "890 nasabah",
        category: "Lingkungan Hidup",
      },
      {
        icon: MessageCircle,
        name: "Aduan Lingkungan",
        description: "Laporan pencemaran dan pelanggaran",
        href: "#aduan-lingkungan",
        stats: "450 laporan",
        category: "Lingkungan Hidup",
      },
    ],
  },
  {
    name: "Pemerintahan dan Desa",
    icon: Landmark,
    color: "indigo",
    bgColor: "bg-indigo-50",
    services: [
      {
        icon: FileText,
        name: "Surat Pengantar RT/RW",
        description: "Layanan surat pengantar dari RT/RW",
        href: "#surat-rt",
        stats: "4.2k surat",
        category: "Pemerintahan dan Desa",
      },
      {
        icon: Building,
        name: "Dana Desa",
        description: "Transparansi dan laporan dana desa",
        href: "#dana-desa",
        stats: "120 desa",
        category: "Pemerintahan dan Desa",
      },
    ],
  },
  {
    name: "PPID",
    icon: FileSearch,
    color: "teal",
    bgColor: "bg-teal-50",
    services: [
      {
        icon: FileSearch,
        name: "Permohonan Informasi",
        description: "Akses informasi publik sesuai UU KIP",
        href: "#ppid",
        stats: "320 permohonan",
        category: "PPID",
      },
      {
        icon: FileText,
        name: "Dokumen Publik",
        description: "Akses dokumen dan regulasi daerah",
        href: "#dokumen-publik",
        stats: "1.5k dokumen",
        category: "PPID",
      },
    ],
  },
  {
    name: "Kebencanaan",
    icon: ShieldAlert,
    color: "red",
    bgColor: "bg-red-50",
    services: [
      {
        icon: ShieldAlert,
        name: "Tanggap Darurat",
        description: "Hotline dan layanan emergency 24/7",
        href: "#darurat",
        badge: "Penting",
        stats: "24/7 aktif",
        category: "Kebencanaan",
      },
      {
        icon: Cloud,
        name: "Info Cuaca & Bencana",
        description: "Peringatan dini dan info cuaca",
        href: "#info-bencana",
        stats: "Real-time",
        category: "Kebencanaan",
      },
    ],
  },
  {
    name: "Multisektoral (Khusus)",
    icon: Building2,
    color: "violet",
    bgColor: "bg-violet-50",
    services: [
      {
        icon: FileCheck,
        name: "Layanan Terpadu",
        description: "One-stop service untuk berbagai layanan",
        href: "#layanan-terpadu",
        stats: "2.1k transaksi",
        category: "Multisektoral (Khusus)",
      },
      {
        icon: MessageCircle,
        name: "Pengaduan Umum",
        description: "Aspirasi dan pengaduan masyarakat",
        href: "#pengaduan",
        badge: "Populer",
        stats: "3.4k laporan",
        category: "Multisektoral (Khusus)",
      },
    ],
  },
];

const allServices = serviceCategories.flatMap((cat) => cat.services);

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const displayedCategories = showAllCategories
    ? serviceCategories
    : serviceCategories.slice(0, 6);

  const displayedServices =
    selectedCategory === null
      ? allServices.slice(0, 9) // Show top 9 services when "Semua Layanan" is selected
      : serviceCategories
          .find((cat) => cat.name === selectedCategory)
          ?.services || [];

  return (
    <section className="bg-slate-50 py-16 md:py-20" id="layanan">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Layanan Digital
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Kategori Layanan
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            Akses cepat ke berbagai layanan pemerintahan yang paling sering
            digunakan
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-200 hover:text-emerald-600"
              }`}
            >
              Semua Layanan
            </button>
            {displayedCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2.5 rounded-full font-medium transition-all duration-300 inline-flex items-center gap-2 text-sm ${
                    selectedCategory === category.name
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-200 hover:text-emerald-600"
                  }`}
                >
                  <CategoryIcon size={16} />
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">
                    {category.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {serviceCategories.length > 6 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm inline-flex items-center gap-1 transition-colors"
              >
                {showAllCategories ? "Tampilkan Lebih Sedikit" : "Tampilkan Semua Kategori"}
                <ArrowRight
                  size={16}
                  className={`transition-transform ${showAllCategories ? "rotate-90" : ""}`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedServices.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {displayedServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              Tidak ada layanan dalam kategori ini
            </p>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              number="100+"
              label="Layanan Digital"
              icon={Building2}
              color="emerald"
            />
            <StatCard
              number="50K+"
              label="Pengguna Aktif"
              icon={Users}
              color="blue"
            />
            <StatCard
              number="15K+"
              label="Transaksi/Bulan"
              icon={CreditCard}
              color="purple"
            />
            <StatCard
              number="4.8/5"
              label="Rating Kepuasan"
              icon={HeartPulse}
              color="amber"
            />
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <a
            href="#semua-layanan"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors group"
          >
            Jelajahi Semua Layanan
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

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <a
      href={service.href}
      className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
      aria-label={`Layanan ${service.name} - ${service.description}`}
    >
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-16 -mt-16" />

      {/* Badge */}
      {service.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${
              service.badge === "Baru"
                ? "bg-amber-100 text-amber-700 border border-amber-200"
                : service.badge === "Penting"
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-emerald-100 text-emerald-700 border border-emerald-200"
            }`}
          >
            {service.badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {/* Icon */}
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
          <Icon size={28} strokeWidth={2} />
        </div>

        {/* Service Name */}
        <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Stats & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            {service.stats}
          </span>
          <div className="flex items-center gap-1 text-emerald-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Akses
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </a>
  );
}

interface StatCardProps {
  number: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

function StatCard({ number, label, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    emerald: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
    amber: "text-amber-600 bg-amber-50",
  };

  const selectedColor =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.emerald;

  return (
    <div className="text-center">
      <div
        className={`w-12 h-12 ${selectedColor} rounded-xl flex items-center justify-center mx-auto mb-3`}
      >
        <Icon size={24} strokeWidth={2} />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
        {number}
      </div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}

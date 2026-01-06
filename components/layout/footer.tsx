import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Smartphone,
  Building2,
  FileText,
  Info,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Section - Spans 4 columns on large screens */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Super App Naiera
                </h3>
                <p className="text-sm text-slate-400">Kabupaten Naiera</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Platform digital terpadu untuk mengakses seluruh layanan
              pemerintahan Kabupaten Naiera. Transformasi digital untuk
              pelayanan publik yang lebih baik, cepat, dan transparan.
            </p>

            {/* Social Media */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-white mb-3">
                Ikuti Kami
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#facebook"
                  className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#twitter"
                  className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#instagram"
                  className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#youtube"
                  className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  aria-label="Youtube"
                >
                  <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Layanan - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Building2 size={20} className="text-emerald-400" />
              Layanan
            </h3>
            <ul className="space-y-3">
              {[
                "Kependudukan",
                "Kesehatan",
                "Pendidikan",
                "Ekonomi & Bisnis",
                "Ketenagakerjaan",
                "Pariwisata",
                "Infrastruktur",
                "Sosial",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#layanan-${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Info size={20} className="text-emerald-400" />
              Tentang
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#tentang-kami"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#visi-misi"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Visi & Misi
                </a>
              </li>
              <li>
                <a
                  href="#struktur"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Struktur Organisasi
                </a>
              </li>
              <li>
                <a
                  href="#berita"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Berita & Pengumuman
                </a>
              </li>
              <li>
                <a
                  href="#acara"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Kalender Acara
                </a>
              </li>
              <li>
                <a
                  href="#karir"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Karir
                </a>
              </li>
            </ul>
          </div>

          {/* Bantuan - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <FileText size={20} className="text-emerald-400" />
              Bantuan
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faq"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#panduan"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Panduan Penggunaan
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a
                  href="#layanan-pengaduan"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Layanan Pengaduan
                </a>
              </li>
              <li>
                <a
                  href="#download"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                >
                  <Smartphone size={14} className="text-emerald-400" />
                  Download Aplikasi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Phone size={20} className="text-emerald-400" />
              Kontak
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin
                  size={18}
                  className="text-emerald-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Alamat</p>
                  <p className="text-sm leading-relaxed">
                    Jl. Pemerintahan No. 123
                    <br />
                    Kabupaten Naiera, 12345
                    <br />
                    Provinsi Indonesia
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone
                  size={18}
                  className="text-emerald-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Telepon</p>
                  <a
                    href="tel:+622112345678"
                    className="text-sm hover:text-emerald-400 transition-colors"
                  >
                    (021) 1234-5678
                  </a>
                  <br />
                  <a
                    href="tel:+622198765432"
                    className="text-sm hover:text-emerald-400 transition-colors"
                  >
                    (021) 9876-5432
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail
                  size={18}
                  className="text-emerald-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Email</p>
                  <a
                    href="mailto:info@naiera.go.id"
                    className="text-sm hover:text-emerald-400 transition-colors"
                  >
                    info@naiera.go.id
                  </a>
                  <br />
                  <a
                    href="mailto:layanan@naiera.go.id"
                    className="text-sm hover:text-emerald-400 transition-colors"
                  >
                    layanan@naiera.go.id
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links / Important Links */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <h4 className="text-white font-semibold mb-4">Link Terkait</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Kemendagri", url: "#" },
              { name: "KOMINFO", url: "#" },
              { name: "BPS", url: "#" },
              { name: "LKPP", url: "#" },
              { name: "OSS", url: "#" },
              { name: "PPID", url: "#" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
              >
                <ExternalLink size={14} className="flex-shrink-0" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-400 text-center md:text-left">
              © {currentYear} Pemerintah Kabupaten Naiera. Semua hak
              dilindungi undang-undang.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a
                href="#privasi"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Kebijakan Privasi
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="#syarat"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Syarat & Ketentuan
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="#disclaimer"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Disclaimer
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="#sitemap"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>

          {/* Version & Build Info */}
          <div className="mt-4 pt-4 border-t border-slate-900 text-center">
            <p className="text-xs text-slate-600">
              Super App Naiera v1.0.0 | Build: 2026.01.06 | Dikembangkan dengan
              ❤️ untuk warga Kabupaten Naiera
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Smartphone, Download, Star, Shield, Zap, QrCode } from "lucide-react";

export function AppDownloadSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-700 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
              Download Aplikasi
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Download Super App Naiera
            </h2>
            <p className="text-lg md:text-xl text-emerald-50 mb-8 leading-relaxed">
              Akses semua layanan pemerintahan dalam satu aplikasi. Download
              sekarang dan nikmati kemudahan layanan digital 24/7.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <FeatureItem
                icon={Zap}
                title="Cepat & Mudah"
                description="Proses layanan hanya dalam hitungan menit"
              />
              <FeatureItem
                icon={Shield}
                title="Aman & Terpercaya"
                description="Data Anda dilindungi dengan enkripsi tingkat tinggi"
              />
              <FeatureItem
                icon={Star}
                title="Rating 4.8/5"
                description="Dipercaya oleh 50.000+ pengguna aktif"
              />
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#download-playstore"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white text-slate-800 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-slate-600">Download di</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </a>

              <a
                href="#download-appstore"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white text-slate-800 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-slate-600">Download di</div>
                  <div className="font-bold">App Store</div>
                </div>
              </a>
            </div>

            {/* QR Code */}
            <div className="inline-flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center">
                <QrCode size={64} className="text-slate-800" />
              </div>
              <div className="text-sm">
                <p className="font-semibold mb-1">Scan QR Code</p>
                <p className="text-emerald-100">
                  Untuk download langsung dari smartphone
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative lg:scale-110">
            <div className="relative mx-auto w-full max-w-sm">
              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 p-4 animate-bounce shadow-xl">
                <Download size={40} className="text-white" />
                <p className="text-xs text-white font-semibold mt-2">
                  100K+ Download
                </p>
              </div>

              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 p-4 shadow-xl">
                <Star size={40} className="text-white fill-white" />
                <p className="text-xs text-white font-semibold mt-2">
                  Rating 4.8
                </p>
              </div>

              {/* Phone Frame */}
              <div className="relative bg-white rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-[2.5rem] overflow-hidden">
                  {/* Notch */}
                  <div className="h-6 bg-white rounded-b-3xl w-40 mx-auto mb-4" />

                  {/* Screen Content */}
                  <div className="px-6 pb-6 space-y-4">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            N
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">
                            Super App
                          </h3>
                          <p className="text-xs text-slate-500">
                            Kab. Naiera
                          </p>
                        </div>
                      </div>
                      <Smartphone size={24} className="text-emerald-600" />
                    </div>

                    {/* Quick Services */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        "E-KTP",
                        "BPJS",
                        "Pajak",
                        "Sekolah",
                        "Izin",
                        "Aduan",
                      ].map((service, i) => (
                        <div
                          key={i}
                          className="bg-white p-3 rounded-xl text-center shadow-sm"
                        >
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg mx-auto mb-2" />
                          <p className="text-xs font-medium text-slate-700">
                            {service}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Banner */}
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-4 text-white">
                      <p className="text-sm font-semibold">
                        100+ Layanan Digital
                      </p>
                      <p className="text-xs opacity-90">
                        Siap melayani Anda 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-emerald-100">{description}</p>
      </div>
    </div>
  );
}

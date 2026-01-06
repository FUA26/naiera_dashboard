"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // console.log("Login:", { email, password });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="mb-8">
            <Link
              href="/"
              className="group mb-6 inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
                <span className="text-xl font-bold text-white">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
                  Super App Naiera
                </h1>
                <p className="text-sm text-slate-500">Kabupaten Naiera</p>
              </div>
            </Link>

            <h2 className="mb-2 text-3xl font-bold text-slate-800">
              Selamat Datang Kembali
            </h2>
            <p className="text-slate-600">
              Masuk untuk mengakses layanan digital Kabupaten Naiera
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email atau NIK
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email atau NIK"
                  className="w-full rounded-lg border border-slate-300 py-3 pr-4 pl-11 transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full rounded-lg border border-slate-300 py-3 pr-12 pl-11 transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-slate-600">Ingat saya</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-700"
            >
              Masuk
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-500">
                  Atau masuk dengan
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Shield size={20} />
                E-KTP
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-slate-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="group inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Daftar sekarang
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Info */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-700 p-12 lg:flex lg:flex-1">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <h2 className="mb-6 text-4xl font-bold">
            Akses Semua Layanan dalam Satu Aplikasi
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-emerald-50">
            Lebih dari 100+ layanan pemerintahan Kabupaten Naiera siap melayani
            Anda 24/7 dengan cepat, mudah, dan aman.
          </p>

          <div className="space-y-4">
            {[
              "✓ E-KTP, KK, dan layanan kependudukan",
              "✓ Pembayaran pajak dan retribusi online",
              "✓ Perizinan usaha dan IMB",
              "✓ Layanan kesehatan dan pendidikan",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-lg text-emerald-50"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-sm text-emerald-100">Dipercaya oleh</p>
            <p className="text-3xl font-bold">50.000+ Pengguna</p>
          </div>
        </div>
      </div>
    </div>
  );
}

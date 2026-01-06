import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";
import { Providers } from "@/components/providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Super App Naiera - Layanan Digital Kabupaten Naiera",
  description:
    "Akses ratusan layanan pemerintahan dengan mudah, cepat, dan aman dalam satu platform digital. Kabupaten Naiera menuju digitalisasi pelayanan publik.",
  keywords: [
    "super app",
    "naiera",
    "kabupaten naiera",
    "layanan digital",
    "pemerintahan",
    "e-government",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}

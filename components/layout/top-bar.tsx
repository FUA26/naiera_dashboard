"use client";

import { useEffect, useState } from "react";

export function TopBar() {
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Set date
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    setCurrentDate(`${dayName}, ${day} ${monthName} ${year}`);

    // Set greeting based on time
    const hour = now.getHours();
    if (hour < 12) {
      setGreeting("Selamat Pagi");
    } else if (hour < 15) {
      setGreeting("Selamat Siang");
    } else if (hour < 18) {
      setGreeting("Selamat Sore");
    } else {
      setGreeting("Selamat Malam");
    }
  }, []);

  return (
    <div className="h-10 bg-slate-900 text-slate-200">
      <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-8">
        <div className="flex items-center gap-4">
          <span className="text-xs md:text-sm font-medium">{currentDate}</span>
          <span className="hidden md:block border-l border-slate-700 h-4" />
          <span className="hidden md:block text-sm">
            {greeting}, Warga Naiera
          </span>
        </div>
        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
          <a
            href="#kontak"
            className="hover:text-white transition-colors duration-200"
          >
            Kontak Kami
          </a>
          <span className="text-slate-700">|</span>
          <a
            href="#bantuan"
            className="hover:text-white transition-colors duration-200"
          >
            Bantuan
          </a>
        </div>
      </div>
    </div>
  );
}

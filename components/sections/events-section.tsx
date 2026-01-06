"use client";

import { Calendar, MapPin, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees?: string;
  status: "upcoming" | "ongoing" | "completed";
  type: "online" | "offline" | "hybrid";
  image?: string;
  description?: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "Kegiatan Rakorwasda dan Hakordia 2025 Inspektorat Provinsi Kabupaten Naiera",
    date: "17 Des 2025",
    time: "10:00 - 11:00 WIB",
    location: "Gedung Serbaguna Kabupaten",
    category: "Agenda Offline",
    attendees: "500 peserta",
    status: "upcoming",
    type: "offline",
    image: "/images/event-1.jpg",
    description: "Kegiatan Rakorwasda dan Hakordia 2025 Inspektorat Provinsi Kabupaten Naiera",
  },
  {
    id: "2",
    title: "Festival Kampungan Kabupaten Majalengka 2025",
    date: "24 Desember 2025",
    time: "09:00 - 22:00",
    location: "Agenda Offline | Umum",
    category: "Festival",
    status: "upcoming",
    type: "offline",
    image: "/images/event-2.jpg",
  },
  {
    id: "3",
    title: "Drama Musikal Rahvayana: Kala Cinta di Jabar",
    date: "20 Desember 2025",
    time: "19:00 - 21:00",
    location: "Agenda Offline | Umum",
    category: "Budaya",
    status: "upcoming",
    type: "offline",
    image: "/images/event-3.jpg",
  },
  {
    id: "4",
    title: "Pelatihan Digital Marketing UMKM",
    date: "12 Januari 2026",
    time: "13:00 - 16:00 WIB",
    location: "Balai Pelatihan Kerja",
    category: "Pelatihan",
    attendees: "150 peserta",
    status: "upcoming",
    type: "hybrid",
  },
  {
    id: "5",
    title: "Job Fair Kabupaten Naiera 2026",
    date: "15 Januari 2026",
    time: "08:00 - 17:00 WIB",
    location: "Stadion Utama Naiera",
    category: "Career",
    attendees: "2000+ peserta",
    status: "upcoming",
    type: "offline",
  },
];

export function EventsSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0)); // January 2026

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  const eventDays = [7, 8, 9, 10, 12, 15, 17]; // Days with events

  return (
    <section className="py-16 md:py-20 bg-slate-50" id="acara">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            Agenda & Acara
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Agenda Kabupaten Naiera
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            Dapatkan informasi terkini semua kegiatan yang diselenggarakan di Kabupaten Naiera
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Featured Event & Event List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Event */}
            {events[0] && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                {/* Featured Event Image */}
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-emerald-100 to-blue-100">
                  {/* Placeholder - replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600 opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar size={64} className="text-white/60" />
                  </div>
                  
                  {/* Event Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold shadow-lg">
                      {events[0].category}
                    </span>
                  </div>
                </div>

                {/* Featured Event Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">
                    {events[0].title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar size={18} className="text-emerald-600" />
                      <span className="font-medium">{events[0].date}</span>
                      <span className="text-slate-400">|</span>
                      <span>{events[0].time}</span>
                    </div>

                    {events[0].description && (
                      <p className="text-slate-600 leading-relaxed">
                        {events[0].description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <a
                      href={`/agenda/${events[0].id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-2 group"
                    >
                      Selengkapnya
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </a>
                    <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                      Wakili Gubernur
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Event List */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-800 mb-4">
                Agenda Telah Selesai
              </h4>
              
              {events.slice(1, 4).map((event) => (
                <a
                  key={event.id}
                  href={`/agenda/${event.id}`}
                  className="group flex gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Event Thumbnail */}
                  <div className="relative w-24 h-24 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/40 to-blue-500/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar size={32} className="text-slate-400" />
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {event.title}
                    </h5>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium whitespace-nowrap">
                      Telah Selesai
                    </span>
                  </div>
                </a>
              ))}

              {/* View All Link */}
              <div className="text-center pt-4">
                <a
                  href="#semua-agenda"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors group"
                >
                  Lihat Agenda Lainnya
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-24">
              <h4 className="text-lg font-bold text-slate-800 mb-6">
                Agenda Kabupaten Naiera
              </h4>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} className="text-slate-600" />
                </button>
                <div className="font-semibold text-slate-800">{monthName}</div>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} className="text-slate-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="mb-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const hasEvent = eventDays.includes(day);
                    const isToday = day === 6; // Example: 6th is today

                    return (
                      <button
                        key={day}
                        className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                          isToday
                            ? "bg-emerald-600 text-white font-bold"
                            : hasEvent
                              ? "bg-emerald-50 text-emerald-600 font-semibold hover:bg-emerald-100"
                              : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calendar Legend */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-emerald-600 rounded" />
                  <span className="text-slate-600">Hari ini</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-emerald-50 border border-emerald-200 rounded" />
                  <span className="text-slate-600">Ada agenda</span>
                </div>
              </div>

              {/* No Event State */}
              <div className="mt-6 p-4 bg-slate-50 rounded-xl text-center">
                <Calendar size={40} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm text-slate-500">Tidak ada agenda</p>
                <p className="text-xs text-slate-400">Belum ada agenda untuk saat ini</p>
              </div>

              {/* View Full Calendar */}
              <a
                href="#kalender-lengkap"
                className="mt-4 block text-center text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
              >
                Lihat Agenda Lainnya →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

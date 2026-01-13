import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";
import { AgendaDetailClient } from "./agenda-detail-client";
import { getEventBySlug, getAllEvents } from "@/lib/events-data";
import type { Metadata } from "next";

interface AgendaPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all events
export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AgendaPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return {
      title: "Agenda Tidak Ditemukan",
    };
  }

  return {
    title: `${event.title} - Agenda Kegiatan`,
    description: event.description || `Ikuti ${event.title} pada ${event.date}`,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "article",
      publishedTime: event.date,
    },
  };
}

export default async function AgendaDetailPage({ params }: AgendaPageProps) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  // Get related events (same category, excluding current event)
  const allEvents = await getAllEvents();
  const relatedEvents = allEvents
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <AgendaDetailClient event={event} relatedEvents={relatedEvents} />
      <Footer />
    </div>
  );
}

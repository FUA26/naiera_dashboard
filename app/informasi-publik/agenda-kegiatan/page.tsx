import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";
import { AgendaKegiatanClient } from "./agenda-client";
import { getAllEvents, getEventCategories } from "@/lib/events-data";

export default async function AgendaKegiatanPage() {
  // Fetch all events data from JSON
  const allEvents = await getAllEvents();
  const categories = await getEventCategories();

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <AgendaKegiatanClient allEvents={allEvents} categories={categories} />
      <Footer />
    </div>
  );
}

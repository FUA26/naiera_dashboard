import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";
import { BeritaTerkiniClient } from "./berita-terkini-client";
import { getAllNews, getNewsCategories } from "@/lib/news-data";

export default async function BeritaTerkiniPage() {
  // Fetch all news data from JSON
  const allNews = await getAllNews();
  const categories = await getNewsCategories();

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <BeritaTerkiniClient allNews={allNews} categories={categories} />
      <Footer />
    </div>
  );
}

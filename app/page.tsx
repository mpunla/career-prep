import { DetailedFeatures } from "@/app/_components/DetailedFeatures";
import { Features } from "@/app/_components/Features";
import { Footer } from "@/app/_components/Footer";
import { Hero } from "@/app/_components/Hero";
import { HomeNavbar } from "@/app/_components/HomeNavbar";

export default function HomePage() {
  return (
    <div className="bg-linear-to-b from-background to-muted/20">
      <HomeNavbar />
      <Hero />
      <Features />
      <DetailedFeatures />
      <Footer />
    </div>
  )
}

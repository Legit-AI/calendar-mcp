import { Header } from "./Header";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { StepsSection } from "./StepsSection";

export default function Home() {
  return (
    <div className="flex flex-col font-sans h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center">
        <HeroSection />
        <StepsSection />
      </main>
      <Footer />
    </div>
  );
}

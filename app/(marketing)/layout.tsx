import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { Preloader } from "@/components/animations/Preloader";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageTransition } from "@/components/animations/PageTransition";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </LenisProvider>
  );
}

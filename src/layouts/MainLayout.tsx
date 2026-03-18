import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeBanner from "@/components/MarqueeBanner";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <div className="sticky top-0 z-50 flex flex-col">
    <Navbar />
    <MarqueeBanner />
    </div>
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default MainLayout;

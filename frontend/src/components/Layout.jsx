import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from '@/components/Footer';
import ScrollToTopButton from './ScrollToTopButton';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const isServiceArea =
    location.pathname.startsWith("/development") ||
    location.pathname.startsWith("/services");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen min-h-[100svh] flex flex-col bg-background text-foreground">
      <Navbar />
      <main className={`flex-1 pt-[5rem] md:pt-[5.5rem] xl:pt-[6rem] ${isServiceArea ? "service-area-scroll" : ""}`}>
        {children}
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Layout;

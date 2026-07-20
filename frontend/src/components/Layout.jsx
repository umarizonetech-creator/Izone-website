import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from '@/components/Footer';
import ScrollToTopButton from './ScrollToTopButton';
import Navbar from './Navbar';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }) => {
  const location = useLocation();
  const isServiceArea =
    location.pathname.startsWith("/development") ||
    location.pathname.startsWith("/services");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Global Lenis Smooth Scroll Initialization synced with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Global Scroll Trigger handler for all section header reveals
  useEffect(() => {
    const timer = setTimeout(() => {
      const headers = document.querySelectorAll(".section-header-reveal");
      if (headers.length === 0) return;

      const ctx = gsap.context(() => {
        headers.forEach((header) => {
          const badge = header.querySelector(".reveal-badge");
          const titleLines = header.querySelectorAll(".reveal-title-line > span");
          const descLines = header.querySelectorAll(".reveal-desc-line > span");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });

          if (badge) {
            tl.fromTo(badge, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
          }
          
          if (titleLines.length > 0) {
            tl.fromTo(titleLines, 
              { yPercent: 105, opacity: 0 }, 
              { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 
              badge ? "-=0.35" : 0
            );
          }

          if (descLines.length > 0) {
            tl.fromTo(descLines, 
              { yPercent: 105, opacity: 0 }, 
              { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" }, 
              titleLines.length > 0 ? "-=0.45" : 0
            );
          }
        });
      });

      return () => ctx.revert();
    }, 150); // Small delay to let page mount settle

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen min-h-[100svh] flex flex-col bg-background text-foreground">
      <Navbar />
      <main className={`flex-1 pt-[6rem] md:pt-[6.5rem] xl:pt-[7rem] ${isServiceArea ? "service-area-scroll" : ""}`}>
        {children}
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Layout;

import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Footer from '@/components/Footer';
import ScrollToTopButton from './ScrollToTopButton';
import Navbar from './Navbar';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Global in-memory scroll position map keyed by location key AND path
const scrollPositions = new Map();

// Helper to retrieve saved scroll position from Map or sessionStorage
const getSavedScroll = (loc) => {
  if (!loc) return 0;

  const keyPos = loc.key ? scrollPositions.get(loc.key) : null;
  if (keyPos !== null && keyPos !== undefined && keyPos > 0) return keyPos;

  const pathPos = scrollPositions.get(loc.pathname);
  if (pathPos !== null && pathPos !== undefined && pathPos > 0) return pathPos;

  try {
    const sessionKeyPos = loc.key ? sessionStorage.getItem("scroll_" + loc.key) : null;
    if (sessionKeyPos) return parseFloat(sessionKeyPos);

    const sessionPathPos = sessionStorage.getItem("scroll_" + loc.pathname);
    if (sessionPathPos) return parseFloat(sessionPathPos);
  } catch (e) {}

  return 0;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const navType = useNavigationType();
  const lenisRef = useRef(null);

  // Always hold latest location reference in a ref for accurate scroll recording
  const locationRef = useRef(location);
  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const isServiceArea =
    location.pathname.startsWith("/development") ||
    location.pathname.startsWith("/services");

  // Enable manual scroll restoration on browser history
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Helper to save current scroll position immediately
  const saveCurrentScroll = () => {
    const activeLoc = locationRef.current;
    if (!activeLoc) return;
    const currentPos = window.scrollY || (window.lenis ? window.lenis.scroll : 0);
    if (currentPos > 0) {
      if (activeLoc.key) scrollPositions.set(activeLoc.key, currentPos);
      scrollPositions.set(activeLoc.pathname, currentPos);
      try {
        if (activeLoc.key) sessionStorage.setItem("scroll_" + activeLoc.key, currentPos.toString());
        sessionStorage.setItem("scroll_" + activeLoc.pathname, currentPos.toString());
      } catch (e) {}
    }
  };

  // Capture scroll events & clicks on ANY link/button to save position before navigation
  useEffect(() => {
    const handleScrollSave = () => {
      saveCurrentScroll();
    };

    const handleClickSave = (e) => {
      const linkOrBtn = e.target.closest("a, button, [role='button']");
      if (linkOrBtn) {
        saveCurrentScroll();
      }
    };

    window.addEventListener("scroll", handleScrollSave, { passive: true });
    document.addEventListener("click", handleClickSave, true);
    window.addEventListener("beforeunload", handleScrollSave);

    return () => {
      window.removeEventListener("scroll", handleScrollSave);
      document.removeEventListener("click", handleClickSave, true);
      window.removeEventListener("beforeunload", handleScrollSave);
    };
  }, []);

  // Global Lenis Smooth Scroll Initialization synced with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      saveCurrentScroll();
    });

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

  // Synchronous scroll restoration before browser paint on POP navigation
  useLayoutEffect(() => {
    if (navType === "POP") {
      const savedScroll = getSavedScroll(location);
      if (savedScroll > 0) {
        window.scrollTo(0, savedScroll);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(savedScroll, { immediate: true });
        } else if (window.lenis) {
          window.lenis.scrollTo(savedScroll, { immediate: true });
        }
      }
    }
  }, [location.pathname, location.key, navType]);

  // Handle Scroll Restoration & ScrollTrigger layout refresh on Route / Location Changes
  useEffect(() => {
    const lenis = lenisRef.current || window.lenis;

    if (navType === "POP") {
      const savedScroll = getSavedScroll(location);

      const restoreTimer = setTimeout(() => {
        if (savedScroll > 0) {
          if (lenis) {
            lenis.scrollTo(savedScroll, { immediate: true });
          }
          window.scrollTo(0, savedScroll);
        }
        ScrollTrigger.refresh();
      }, 50);

      return () => clearTimeout(restoreTimer);
    } else {
      // New page navigation (PUSH/REPLACE) -> scroll to top
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);

      return () => clearTimeout(refreshTimer);
    }
  }, [location.pathname, location.key, navType]);

  // Global Scroll Trigger handler for section header reveals
  useEffect(() => {
    let ctx;
    const timer = setTimeout(() => {
      const headers = document.querySelectorAll(".section-header-reveal");
      if (headers.length === 0) return;

      ctx = gsap.context(() => {
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
    }, 150);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen min-h-[100svh] flex flex-col bg-background text-foreground">
      <Navbar />
      <main className={`flex-1 pt-[6rem] md:pt-[6.5rem] xl:pt-[7rem] ${isServiceArea ? "service-area-scroll" : ""}`}>
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;

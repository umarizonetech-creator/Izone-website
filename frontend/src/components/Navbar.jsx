import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Code,
  Share2,
  PenTool,
  Pen,
  Terminal,
  BrainCircuit,
  Smartphone,
  MessageSquare,
  Phone,
  MessageCircle,
  Megaphone,
  Vote,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const developmentServices = [
  { name: "Web Development", path: "/development/web-development", icon: Code },
  { name: "Software Development", path: "/development/software-development", icon: Terminal },
  { name: "App Development", path: "/development/app-development", icon: Smartphone },
  { name: "AI & ML", path: "/development/ai-ml", icon: BrainCircuit },
  {
    name: "Government Tenders",
    path: "/development/government-tenders",
    icon: Vote,
  },
  {
    name: "Social Media Marketing",
    path: "/development/social-media-marketing",
    icon: Share2,
  },
  {
    name: "Content Writing",
    path: "/development/content-writing",
    icon: PenTool,
  },
  { name: "Graphics Designer", path: "/development/graphics-designer", icon: Pen },
];

const servicesItems = [
  { name: "Bulk SMS", path: "/services/bulk-sms", icon: MessageSquare },
  { name: "Voice SMS", path: "/services/voice-sms", icon: Phone },
  {
    name: "WhatsApp Panel",
    path: "/services/whatsapp-panel",
    icon: MessageCircle,
  },
  {
    name: "WhatsApp Marketing",
    path: "/services/whatsapp-marketing",
    icon: Megaphone,
  },
  {
    name: "Digital Election Campaign",
    path: "/services/digital-election-campaign",
    icon: Vote,
  },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Development",
    path: "/development",
    hasDropdown: true,
    dropdownType: "development",
  },
  {
    name: "Services",
    path: "/services",
    hasDropdown: true,
    dropdownType: "services",
  },
  {name: "Portfolio", path:"/Portfolio"},
  { name: "Clients", path: "/clients" },
  { name: "Career", path: "/career" },
  { name: "Courses", path: "/courses" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        setScrolled((current) => {
          const next = window.scrollY > 50;
          return current === next ? current : next;
        });
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateMobileNav = () => setIsMobileNav(window.innerWidth < 1280);

    updateMobileNav();
    window.addEventListener("resize", updateMobileNav);
    return () => window.removeEventListener("resize", updateMobileNav);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname]);

  const getDropdownItems = (type) => {
    if (type === "development") return developmentServices;
    if (type === "services") return servicesItems;
    return [];
  };

  const isActiveDropdownPath = (type) => {
    if (type === "development")
      return location.pathname.startsWith("/development");
    if (type === "services") return location.pathname.startsWith("/services");
    return false;
  };

  const navSurface = scrolled
    ? "glass-card py-4 border-b border-border/60"
    : "py-4 bg-background/95 backdrop-blur-md border-b border-border/70";

  return (
    <nav
      className={`fixed top-0 left-0 z-[100] w-full overflow-visible transition-all duration-200 ${navSurface}`}
    >
      <div className="container-custom flex w-full max-w-full items-center justify-between gap-3 px-4 xl:max-w-none xl:px-10 2xl:px-14 overflow-visible">
        {/* Logo */}
        <Link to="/" className="flex min-w-0 items-center gap-3 group xl:mr-8">
          <img
            src="/izone-logo.png"
            alt="iZone"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            className="h-16 w-auto max-w-[195px] rounded-md object-contain transition-transform duration-200 group-hover:scale-[1.02] min-[380px]:max-w-[210px] min-[769px]:h-[4.5rem] min-[769px]:max-w-[250px] xl:h-20 xl:max-w-[280px]"
          />
        </Link>

        {/* Desktop Menu */}
        <div
          className="navbar-desktop-only hidden xl:flex xl:gap-8 items-center overflow-visible"
          style={isMobileNav ? { display: "none" } : undefined}
        >
          {navLinks.map((link) => (
            <div key={link.path} className="relative overflow-visible">
              {link.hasDropdown ? (
                <div
                  className="relative overflow-visible py-2"
                  onMouseEnter={() => setActiveDropdown(link.dropdownType)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 font-medium transition-colors ${
                      isActiveDropdownPath(link.dropdownType)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.dropdownType ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.dropdownType && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-0 pt-2 w-64 z-[150] overflow-visible"
                      >
                        <div className="rounded-xl border border-border/80 bg-background/95 backdrop-blur-xl p-2 shadow-2xl dark:bg-card/95 border-slate-200/80 dark:border-zinc-800">
                          <Link
                            to={`/${link.dropdownType}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors font-medium text-sm"
                          >
                            <span>All {link.name}</span>
                          </Link>
                          <div className="h-px bg-border/60 my-1" />
                          {getDropdownItems(link.dropdownType).map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                                location.pathname === item.path
                                  ? "bg-primary/10 text-primary font-semibold"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                              }`}
                            >
                              <item.icon size={18} className="text-primary flex-shrink-0" />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`relative font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Right Controls */}
        <div
          className="navbar-desktop-only hidden xl:flex items-center gap-4 min-w-[160px] justify-end"
          style={isMobileNav ? { display: "none" } : undefined}
        >
          <Link to="/get-started">
            <Button className="glow-border hover-glow">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="fixed left-[calc(100vw-3.5rem)] top-[22px] z-[101] flex flex-shrink-0 items-center gap-2 xl:hidden">
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-2 max-h-[calc(100svh-5rem)] max-w-[calc(100vw-2rem)] overflow-hidden overflow-y-auto rounded-xl border border-border bg-card shadow-lg xl:hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === link.dropdownType
                              ? null
                              : link.dropdownType
                          )
                        }
                        className={`w-full flex items-center justify-between py-2 px-4 rounded-lg transition-colors ${
                          isActiveDropdownPath(link.dropdownType)
                            ? "bg-primary/20 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          size={16}
                          className={`${
                            mobileDropdown === link.dropdownType
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileDropdown === link.dropdownType && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-1 overflow-hidden"
                          >
                            <Link
                              to={`/${link.dropdownType}`}
                              className="flex items-center gap-3 py-2 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                              <span className="text-sm">All {link.name}</span>
                            </Link>
                            {getDropdownItems(link.dropdownType).map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 py-2 px-4 rounded-lg transition-colors ${
                                  location.pathname === item.path
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                              >
                                <item.icon size={16} className="text-primary" />
                                <span className="text-sm">{item.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`py-2 px-4 rounded-lg transition-colors block ${
                        location.pathname === link.path
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link to="/get-started">
              <Button className="w-full glow-border hover-glow mt-2">
                Get Started
              </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

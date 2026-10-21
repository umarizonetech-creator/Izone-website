import { useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Search, Home, Briefcase, FolderGit2, PhoneCall, ArrowUpRight, Compass, HelpCircle, Code, Cpu, Smartphone, Video } from "lucide-react";

const SITE_PAGES = [
  { name: "Home Page", path: "/", category: "Main", icon: Home, desc: "Return to the main homepage" },
  { name: "Our Services", path: "/services", category: "Main", icon: Briefcase, desc: "Explore our full suite of IT & digital services" },
  { name: "Project Portfolio", path: "/portfolio", category: "Main", icon: FolderGit2, desc: "View our recent website & software projects" },
  { name: "Web Development", path: "/development/web-development", category: "Development", icon: Code, desc: "Custom websites, React/Next.js apps, e-commerce" },
  { name: "Software Development", path: "/development/software-development", category: "Development", icon: Cpu, desc: "Custom CRM, ERP, and enterprise software" },
  { name: "Mobile App Development", path: "/development/app-development", category: "Development", icon: Smartphone, desc: "iOS, Android, and Flutter mobile apps" },
  { name: "SEO Services", path: "/services/seo-services", category: "Services", icon: Search, desc: "Search engine optimization and local SEO" },
  { name: "Digital Marketing", path: "/services/digital-marketing", category: "Services", icon: Briefcase, desc: "Google Ads, Meta campaigns, and lead gen" },
  { name: "Content Creation", path: "/services/content-creation", category: "Services", icon: Video, desc: "Cinema-grade video production, viral social reels, and brand media" },
  { name: "About Us", path: "/about", category: "Company", icon: Compass, desc: "Learn about iZone Technologies team & story" },
  { name: "Contact Us", path: "/contact", category: "Company", icon: PhoneCall, desc: "Get in touch with our engineering team" },
];

const NotFound = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return SITE_PAGES.filter(
      (page) =>
        page.name.toLowerCase().includes(q) ||
        page.desc.toLowerCase().includes(q) ||
        page.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <Layout>
      <SEO title="Page Not Found | iZone Technologies" noIndex={true} />

      <section className="relative min-h-[calc(100vh-10rem)] w-full flex items-center justify-center py-16 px-4 md:px-8 bg-gradient-to-br from-[#f7faf8] via-[#ffffff] to-[#eff5f1] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden select-none">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#e3ebe6_1px,transparent_1px),linear-gradient(to_bottom,#e3ebe6_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Glow backdrop circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2f855a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2f855a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl w-full mx-auto text-center flex flex-col items-center">
          {/* Animated 404 Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eaf5ef] dark:bg-emerald-950/60 border border-[#bce4cf] dark:border-emerald-800/40 text-[#2f855a] dark:text-[#6ba67e] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
          >
            <HelpCircle size={14} className="text-[#2f855a] dark:text-[#6ba67e]" />
            Error 404 — Page Not Found
          </motion.div>

          {/* Large 404 Number */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-7xl sm:text-8xl md:text-9xl font-[950] tracking-tighter text-[#2f855a] dark:text-[#6ba67e] leading-none mb-4 drop-shadow-sm"
          >
            404
          </motion.h1>

          {/* Heading message */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3"
          >
            Looking for Something?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-8 font-medium leading-relaxed"
          >
            The page <code className="px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono">{location.pathname}</code> does not exist or may have been moved.
          </motion.p>

          {/* Optional Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-md mb-8 relative"
          >
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, portfolio, or topics..."
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#2f855a]/40 focus:border-[#2f855a] transition-all shadow-sm"
              />
            </div>

            {/* Instant Filter Results */}
            {searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 z-30 max-h-60 overflow-y-auto text-left">
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
                    >
                      <page.icon size={18} className="text-[#2f855a] dark:text-[#6ba67e] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{page.name}</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{page.desc}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    No matching pages found for "{searchQuery}". Try navigating below.
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Quick Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl mb-8"
          >
            <Link
              to="/"
              className="group p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#2f855a] dark:hover:border-[#6ba67e] hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#eaf5ef] dark:bg-emerald-950/60 flex items-center justify-center text-[#2f855a] dark:text-[#6ba67e] mb-2 group-hover:scale-110 transition-transform">
                <Home size={18} />
              </div>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Home</span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Return to main page</span>
            </Link>

            <Link
              to="/services"
              className="group p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#2f855a] dark:hover:border-[#6ba67e] hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#eaf5ef] dark:bg-emerald-950/60 flex items-center justify-center text-[#2f855a] dark:text-[#6ba67e] mb-2 group-hover:scale-110 transition-transform">
                <Briefcase size={18} />
              </div>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Services</span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Explore our solutions</span>
            </Link>

            <Link
              to="/portfolio"
              className="group p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#2f855a] dark:hover:border-[#6ba67e] hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#eaf5ef] dark:bg-emerald-950/60 flex items-center justify-center text-[#2f855a] dark:text-[#6ba67e] mb-2 group-hover:scale-110 transition-transform">
                <FolderGit2 size={18} />
              </div>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Portfolio</span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">View our work</span>
            </Link>
          </motion.div>

          {/* Contact CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#2f855a] hover:bg-[#276749] text-white px-6 py-3 rounded-full text-xs font-bold shadow-lg shadow-emerald-500/15 active:scale-95 transition-all duration-300"
            >
              Contact Us & Request Consultation
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#2f855a]">
                <ArrowUpRight size={11} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;

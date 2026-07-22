import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  X,
  ArrowUpRight,
  Sparkles
} from "lucide-react";

const PORTFOLIO_PROJECTS = [
  {
    id: "apex-commerce-card",
    title: "Apex Commerce Cloud",
    category: "Web Development",
    client: "Apex Luxury Group",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85",
    description: "High-speed global luxury e-commerce platform built with headless micro-frontends, real-time multi-currency inventory sync across 18 countries, and sub-second page loads.",
    link: "https://example.com",
    tagline: "Headless E-Commerce Ecosystem"
  },
  {
    id: "pulse-ai-card",
    title: "Pulse AI Analytics Engine",
    category: "AI & ML",
    client: "Pulse Technologies",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    description: "Enterprise predictive analytics engine processing over 50M daily events with live WebSockets, automated machine-learning anomaly detection, and custom LLM query assistant.",
    link: "https://example.com",
    tagline: "Enterprise Predictive Intelligence"
  },
  {
    id: "horizon-banking-card",
    title: "Horizon Banking Suite",
    category: "Software Development",
    client: "Horizon Financial",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=85",
    description: "End-to-end digital banking platform featuring zero-trust security architecture, instant micro-transfers, biometrics authentication, and automated audit logging.",
    link: "https://example.com",
    tagline: "Zero-Trust Banking Architecture"
  },
  {
    id: "nova-health-card",
    title: "Nova Telehealth Portal",
    category: "App Development",
    client: "Nova Care Systems",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
    description: "HIPAA-compliant telemedicine platform connecting 20,000+ medical professionals and patients via encrypted HD video consultations and AI pre-diagnosis questionnaires.",
    link: "https://example.com",
    tagline: "HIPAA Telemedicine Portal"
  }
];

export function ScrollWorksSection({
  works,
  title = "Our Portfolio",
  subtitle = "Featured Projects",
  className = ""
}) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredButtonId, setHoveredButtonId] = useState(null);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const displayProjects = Array.isArray(works) && works.length > 0
    ? works.map((w, idx) => ({
        ...w,
        id: w.id || `portfolio-${idx}`,
        category: w.category || PORTFOLIO_PROJECTS[idx % PORTFOLIO_PROJECTS.length].category,
        tagline: w.tagline || PORTFOLIO_PROJECTS[idx % PORTFOLIO_PROJECTS.length].tagline
      }))
    : PORTFOLIO_PROJECTS;

  // Track exact viewport cursor position
  const handleMouseMove = (e) => {
    const popoverWidth = 400;
    const popoverHeight = 250;
    const padding = 20;

    let x = e.clientX + 24;
    let y = e.clientY - 125;

    if (x + popoverWidth > window.innerWidth - padding) {
      x = e.clientX - popoverWidth - 24;
    }

    if (y < padding) {
      y = padding;
    } else if (y + popoverHeight > window.innerHeight - padding) {
      y = window.innerHeight - popoverHeight - padding;
    }

    setCursorPos({ x, y });
  };

  // Canvas Particle Backdrop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const dpr = window.devicePixelRatio || 1;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");
      const pColor = isDark ? "rgba(22, 163, 74, 0.2)" : "rgba(22, 163, 74, 0.1)";
      const lColor = isDark ? "rgba(22, 163, 74, 0.04)" : "rgba(22, 163, 74, 0.02)";

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full py-20 sm:py-28 overflow-hidden bg-slate-50/50 dark:bg-zinc-950/40 text-slate-900 dark:text-white font-sans select-none border-y border-slate-200/50 dark:border-zinc-900/60 ${className}`}
    >
      {/* Floating Image Preview Popover on Viewport Cursor Position */}
      <AnimatePresence>
        {hoveredProject && !hoveredButtonId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed pointer-events-none z-[130] hidden lg:block w-[400px] h-[250px] rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-2xl bg-zinc-950 flex flex-col justify-between p-2"
            style={{
              left: cursorPos.x,
              top: cursorPos.y
            }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center">
              <img
                src={hoveredProject.image}
                alt={hoveredProject.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10">
                <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full whitespace-nowrap border border-primary/20 backdrop-blur-md">
                  {hoveredProject.category}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />

      {/* Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" />

      <div className="container-custom relative z-10">

        {/* ── UNIFIED WEBSITE HEADER ── */}
        <div className="relative mb-12 md:mb-16 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="reveal-badge font-['Dancing_Script'] text-primary text-3xl md:text-4xl font-bold -rotate-2"
          >
            {title}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter text-zinc-900 dark:text-white mt-1"
          >
            {subtitle}
          </motion.h2>
        </div>

        {/* ── MOBILE VIEW CARDS (< md) ── */}
        <div className="md:hidden grid grid-cols-1 gap-6 w-full max-w-md mx-auto">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedModalProject(project)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 shadow-xl p-5 flex flex-col justify-between hover:border-primary/50 transition-colors"
            >
              {/* Full Image Banner */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-slate-200/60 dark:border-zinc-800 mb-4 bg-zinc-950 flex items-center justify-center p-1">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-medium text-primary bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary/30">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── DESKTOP VIEW CLEAN TYPOGRAPHY LIST (>= md) ── */}
        <div className="hidden md:flex flex-col max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-widest mb-3 border-b border-slate-200/60 dark:border-zinc-800/80 pb-3 flex justify-between px-2"
          >
            <span>PROJECT</span>
            <span>CATEGORY & CLIENT</span>
          </motion.div>

          <div className="flex flex-col">
            {displayProjects.map((proj, idx) => {
              const isButtonHovered = hoveredButtonId === proj.id;

              return (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onMouseEnter={() => {
                    if (!hoveredButtonId) setHoveredProject(proj);
                  }}
                  onMouseLeave={() => {
                    setHoveredProject(null);
                    setHoveredButtonId(null);
                  }}
                  onClick={() => setSelectedModalProject(proj)}
                  className="group border-b border-slate-200/60 dark:border-zinc-800/80 py-5 sm:py-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-col sm:items-end text-left sm:text-right">
                      <span className="text-xs font-semibold text-primary">
                        {proj.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {proj.client || "Enterprise Partner"}
                      </span>
                    </div>

                    {/* Interactive Action Link Button */}
                    <div
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setHoveredProject(null);
                        setHoveredButtonId(proj.id);
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        setHoveredButtonId(null);
                        setHoveredProject(proj);
                      }}
                      className="relative flex items-center"
                    >
                      <div className={`w-9 h-9 rounded-full transition-all shrink-0 flex items-center justify-center ${
                        isButtonHovered
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-110"
                          : "bg-slate-100 dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 text-muted-foreground group-hover:border-primary group-hover:text-primary"
                      }`}>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/portfolio">
            <button className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/95 transition-all hover:scale-[1.02]">
              <span>View Full Portfolio</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </motion.div>

      </div>

      {/* ── SINGLE-SCREEN ZERO-SCROLL MODAL DIALOG ── */}
      <AnimatePresence>
        {selectedModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="relative w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-zinc-800 bg-background p-5 sm:p-7 shadow-2xl text-foreground overflow-hidden flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Header Bar & Close Button */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                      {selectedModalProject.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {selectedModalProject.client || "Enterprise Partner"}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-foreground mt-1">
                    {selectedModalProject.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedModalProject(null)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-muted-foreground hover:bg-rose-500 hover:text-white transition-colors shrink-0"
                  aria-label="Close Modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Full Image Frame (Zero Scroll, Fits Screen Comfortably) */}
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-border bg-zinc-950 flex items-center justify-center p-1 my-2">
                <img
                  src={selectedModalProject.image}
                  alt={selectedModalProject.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Project Overview (Line Clamped, No Scroll) */}
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed my-2">
                {selectedModalProject.description}
              </p>

              {/* Action Footer */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <button
                  onClick={() => setSelectedModalProject(null)}
                  className="px-5 py-2 rounded-full border border-border text-xs font-semibold hover:bg-muted transition-colors"
                >
                  Close
                </button>
                <Link to="/portfolio">
                  <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 hover:bg-primary/95 transition-colors shadow-md">
                    <span>View Full Portfolio</span>
                    <ExternalLink size={14} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ScrollWorksSection;

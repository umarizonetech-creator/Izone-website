import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useTheme } from "@/hooks/useTheme";
import ClientMarquee from "@/components/ClientMarquee";
import {
  ArrowRight,
  Code,
  Layers,
  Zap,
  Shield,
  Users,
  Award,
  Star,
  Quote,
  X,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Brain,
  Cloud,
  Megaphone,
  Palette,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Monitor,
  Play,
  ArrowUpRight,
  LayoutGrid,
  MessageSquare,
  ChevronDown,
  Menu,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ScrollWorksSection from "@/components/ui/ScrollWorksSection";
import { useAdmin } from "@/context/AdminContext";
import { useIsMobile } from "@/hooks/use-mobile";
import CorePillarsSection from "@/components/CorePillarsSection";
const WebGLBackground = lazy(() => import("@/components/WebGLBackground"));
import SplitTextReveal from "@/components/SplitTextReveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

gsap.registerPlugin(ScrollTrigger);

// ── Reusable Advanced Animation Components ───────────────────────────

// Magnetic Button Wrapper
const Magnetic = ({ children, style }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(ref.current, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block w-auto"
      style={style}
    >
      {children}
    </div>
  );
};


// Scroll-Driven Parallax Image
const ParallaxImage = ({ src, alt, className = "", innerClassName = "" }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(img,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-[124%] object-cover ${innerClassName}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

// Scroll-Triggered Stagger Container
const ScrollStaggerContainer = ({ children, className = "", stagger = 0.1, start = "top 88%" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.children.length === 0) return;
    const items = Array.from(container.children);

    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: start,
            toggleActions: "play none none none"
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stagger, start]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Interactive 3D Mockup Container with Parallax badging
const Hero3DScene = () => {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 to 1
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2); // -1 to 1

      // 3D perspective tilts
      gsap.to(container, {
        rotateX: -y * 10,
        rotateY: x * 10,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out"
      });

      // Layered floating cards translation offsets (3D Parallax)
      gsap.to(card1Ref.current, { x: x * 32, y: y * 32, z: 45, duration: 0.4, ease: "power2.out" });
      gsap.to(card2Ref.current, { x: -x * 22, y: -y * 22, z: 65, duration: 0.4, ease: "power2.out" });
      gsap.to(card3Ref.current, { x: x * 18, y: -y * 18, z: 25, duration: 0.4, ease: "power2.out" });
      gsap.to(imgRef.current, { rotateY: x * 3, rotateX: -y * 3, duration: 0.4, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
      gsap.to([card1Ref.current, card2Ref.current, card3Ref.current], { x: 0, y: 0, z: 0, duration: 0.8, ease: "power3.out" });
      gsap.to(imgRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[500px] p-6 rounded-3xl border border-white/20 bg-white/5 dark:bg-black/15 backdrop-blur-lg shadow-[0_28px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_28px_80px_rgba(0,0,0,0.4)] transition-all duration-300 transform-gpu"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Floating 3D Card 1 */}
      <div
        ref={card1Ref}
        className="absolute -top-6 -left-8 pointer-events-none z-20 transform-gpu shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-bold tracking-wide uppercase text-foreground">AI Integration</span>
        </div>
      </div>

      {/* Floating 3D Card 2 */}
      <div
        ref={card2Ref}
        className="absolute -bottom-4 -right-6 pointer-events-none z-20 transform-gpu shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-bold tracking-wide uppercase text-foreground">Cloud SLA 99.9%</span>
        </div>
      </div>

      {/* Floating 3D Card 3 */}
      <div
        ref={card3Ref}
        className="absolute top-1/2 -right-8 pointer-events-none z-20 transform-gpu shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-bold tracking-wide uppercase text-foreground">Top Rated</span>
        </div>
      </div>

      {/* Inner Image Ring */}
      <div className="relative rounded-2xl overflow-hidden p-2 bg-gradient-to-br from-white/10 to-transparent z-10">
        <img
          ref={imgRef}
          src="/hero/hero.png"
          alt="iZone Technologies"
          width="1536"
          height="1024"
          loading="eager"
          decoding="sync"
          className="h-auto w-full object-contain rounded-xl drop-shadow-2xl transition-transform duration-500"
          style={{
            imageRendering: "auto",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
      {/* Orbit ring overlay outside the image container */}
      <div
        className="absolute inset-[-28px] pointer-events-none z-0"
        style={{
          animation: "orbit-cw 15s linear infinite",
          borderRadius: "50%",
        }}
      >
        {/* Glowing Balls */}
        <div className="absolute rounded-full w-[24px] h-[24px] top-[-12px] left-[calc(50%-12px)] bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_18px_6px_rgba(245,92,17,0.8)]" />
        <div className="absolute rounded-full w-[20px] h-[20px] top-[calc(50%-10px)] right-[-10px] bg-gradient-to-r from-lime-400 to-emerald-600 shadow-[0_0_16px_5px_rgba(157,217,31,0.8)]" />
        <div className="absolute rounded-full w-[22px] h-[22px] bottom-[-11px] left-[calc(50%-11px)] bg-gradient-to-r from-pink-400 to-pink-600 shadow-[0_0_17px_6px_rgba(194,19,111,0.8)]" />
        <div className="absolute rounded-full w-[18px] h-[18px] top-[calc(50%-9px)] left-[-9px] bg-gradient-to-r from-violet-400 to-indigo-600 shadow-[0_0_15px_5px_rgba(106,27,255,0.8)]" />
      </div>
    </div>
  );
};

// ── Mock & Core Data ──────────────────────────────────────────────────

const services = [
  {
    icon: Code,
    title: "Web & Software Development",
    description: "Custom web apps and enterprise software, built to scale.",
    details: "React, Next.js, Node, Python, .NET. Architected for performance, observability, and a clean handoff.",
    tags: ["React", "Next.js", "Node.js", "APIs", "SaaS"],
    path: "/development?service=web-development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform apps users keep coming back to.",
    details: "iOS, Android, Flutter, React Native. From MVPs to App Store launches and post-launch growth.",
    tags: ["iOS", "Android", "Flutter", "React Native"],
    path: "/development/app-development",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Practical AI that drives revenue, not just demos.",
    details: "Chatbots, computer vision, predictive analytics, GenAI integrations, and custom ML models trained on your data.",
    tags: ["LLMs", "Computer Vision", "Predictive ML", "RAG"],
    path: "/development/ai-ml",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Cloud-native infrastructure with CI/CD that just works.",
    details: "AWS, Azure, GCP. Containerization, IaC, monitoring, and 99.9% uptime SLAs for production workloads.",
    tags: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
    path: "/development/cloud-devops",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Growth across SMS, WhatsApp, social, and content.",
    details: "Bulk SMS, WhatsApp marketing, social media management, content writing, and election campaigns.",
    tags: ["SMS", "WhatsApp", "Social", "Content"],
    path: "/services",
  },
  {
    icon: Palette,
    title: "UI/UX & Branding",
    description: "Interfaces and identities that earn trust at first glance.",
    details: "Design systems, prototypes, polished UI, and full brand identities for digital and print.",
    tags: ["Design Systems", "Prototypes", "Identity"],
    path: "/development?service=ui-ux-design",
  },
];

const stats = [
  { value: 380, label: "Projects Delivered", suffix: "+" },
  { value: 140, label: "Happy Clients", suffix: "+" },
  { value: 15, label: "Years Experience", suffix: "+" },
  { value: "24/7", label: "Support", isStatic: true },
];

const testimonials = [
  {
    quote: "Working with IZONE Technologies was a seamless experience. They understood our vision and delivered a modern, user-friendly website that truly represents Kings Dental Academy.",
    author: "Kingz Dental Academy",
    role: "",
    company: "Academy for Dental Students",
    rating: 5,
    avatar: "/testimonials/kingz-logo.png",
  },
  {
    quote: "Our digital presence now reflects the quality of our craftsmanship. The professional website has improved customer trust and helped us showcase our products effectively",
    author: "Riits Metal Crafts",
    role: "",
    company: "Metal Industry",
    rating: 5,
    avatar: "/testimonials/riits-logo.png",
  },
  {
    quote: "The gaming platform delivers a smooth and engaging user experience. The creative design, optimized performance, and seamless gameplay exceeded our expectations.",
    author: "MANSA",
    role: "",
    company: "Memory Gaming",
    rating: 5,
    avatar: "testimonials/mansa-logo.jpg",
  },
  {
    quote: "Our website beautifully showcases our photography portfolio with a modern and elegant design. The experience has helped us attract more clients and strengthen our online presence.",
    author: "Zeropixel Photography",
    role: "",
    company: "Photograpy",
    rating: 5,
    avatar: "testimonials/zeropixel-logo.jpg",
  },
  {
    quote: "Our website beautifully showcases our photography portfolio with an elegant design. The experience has helped us attract more clients, strengthen our online presence, and build greater customer confidence.",
    author: "Zentonez Parlour",
    role: "",
    company: "Beauty Saloon",
    rating: 5,
    avatar: "testimonials/zentonez-logo.png",
  },
  {
    quote: "From registration to event updates, everything was handled professionally. The platform made it easy for participants and organizers to stay connected throughout the tournament",
    author: "BNI Cricket tournament",
    role: "",
    company: "Sports & Events",
    rating: 5,
    avatar: "testimonials/bni-logo.png",
  },
  {
    quote: "Working with IZONE Technologies was a great experience. They built a website and management system that made our sales and service follow-up much easier and more efficient",
    author: "Vel Bio Med",
    role: "",
    company: "Hospital Equipment Sales & Service",
    rating: 5,
    avatar: "testimonials/vel-logo.png",
  },
  {
    quote: "The entire process was smooth from start to finish. Our new website perfectly showcases our event lighting and audio services, and the team was responsive, professional, and easy to work with throughout the project.",
    author: "Margret Audio Visual",
    role: "",
    company: "Event Lighting & Audio Solutions",
    rating: 5,
    avatar: "testimonials/margret-logo.png",
  },
  {
    quote: "The website was designed exactly as we envisioned, with a clean layout and an easy-to-use interface. The entire process was smooth, and the final result has helped us provide a better experience for our customers.",
    author: "Sri Sai Groups",
    role: "",
    company: "Financial Services",
    rating: 5,
    avatar: "testimonials/ssg-logo.png",
  },
  {
    quote: "The website perfectly represents our computer sales and service business. It is modern, easy to navigate, and has made it simpler for customers to learn about our products and services.",
    author: "Win Way Computers",
    role: "",
    company: "Computer Sales & Service",
    rating: 5,
    avatar: "testimonials/winway-logo.png",
  }
];

const getAvatarFallback = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "Client"
  )}&background=16A34A&color=ffffff`;

const normalizeTestimonial = (testimonial) => {
  const author = testimonial?.author?.trim() || "Client";
  const quote = testimonial?.quote?.trim();
  const role = testimonial?.role?.trim() || testimonial?.position?.trim() || "";
  const avatar = testimonial?.avatar?.trim() || getAvatarFallback(author);

  return quote
    ? {
      ...testimonial,
      author,
      quote,
      role,
      position: testimonial?.position?.trim() || role,
      avatar,
    }
    : null;
};

const projects = [
  {
    title: "RIITS",
    category: "Web Development",
    description:
      "Modern shopping experience with real-time inventory and seamless checkout.",
    image: "/portfolio/dental-school.png",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    client: "ShopMax Inc.",
  },
  {
    title: "ZEN TONEZ Parlour",
    category: "WEB Application",
    description:
      "Comprehensive analytics dashboard for enterprise data management.",
    image: "/portfolio/zen-tonez-salon.png",
    tags: ["TypeScript", "GraphQL", "AWS", "D3.js"],
    client: "DataFlow Systems",
  },
  {
    title: "KINGS DENTAL ACADEMY",
    category: "Web Application",
    description:
      "Patient management system with appointment scheduling, telemedicine integration, and secure medical records.",
    image: "/portfolio/metal-fabricators.png",
    tags: ["vue.js", "python", "PostgreSql", "HIPAA"],
    client: "MediCare plus",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const AnimatedStat = ({ stat, variants }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || stat.isStatic) return;

    let startTime = null;
    const duration = 1800;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * stat.value));

      if (progress < 1) requestAnimationFrame(animateCount);
    };

    requestAnimationFrame(animateCount);
  }, [inView, stat.isStatic, stat.value]);

  return (
    <div ref={ref}>
      <TiltSpotlightCard className="relative p-6 rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/50 dark:bg-zinc-950/20 backdrop-blur-md shadow-sm flex flex-col items-center justify-center overflow-hidden group hover:border-primary/40 transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        <div className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight">
          {stat.isStatic ? stat.value : `${count}${stat.suffix || ""}`}
        </div>
        <div className="text-muted-foreground text-xs sm:text-sm font-semibold tracking-wide uppercase">{stat.label}</div>
      </TiltSpotlightCard>
    </div>
  );
};

const AdminPopup = () => {
  const { popups = [] } = useAdmin() || {};
  const [dismissedId, setDismissedId] = useState(null);

  const activePopup = [...popups]
    .reverse()
    .find((popup) => popup.status === "Active" && popup.title && popup.message);

  if (!activePopup || dismissedId === activePopup.id) {
    return null;
  }

  const isExternalLink = /^https?:\/\//i.test(activePopup.ctaLink || "");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden rounded-[1.25rem] border border-[#16a34a]/25 bg-[#f6f8f5] p-0 text-[#111827] shadow-[0_28px_80px_rgba(0,0,0,0.38)] dark:border-[#16a34a]/25 dark:bg-[#06110d] dark:text-[#f0fdf4]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-popup-title"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" />
        <div className="absolute right-[-56px] top-[-56px] h-32 w-32 rounded-full bg-[#16a34a]/20 blur-2xl" />
        <div className="absolute bottom-[-70px] left-[-70px] h-40 w-40 rounded-full bg-[#059669]/10 blur-3xl" />

        <button
          type="button"
          onClick={() => setDismissedId(activePopup.id)}
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#16a34a]/25 bg-white/75 text-[#064e3b] shadow-sm backdrop-blur transition hover:bg-[#dcfce7] hover:text-[#111827] dark:bg-[#082f24]/80 dark:text-[#bbf7d0] dark:hover:bg-[#064e3b]"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-6 pt-8 sm:p-7 sm:pt-9">
          {activePopup.image && (
            <img
              src={activePopup.image}
              alt={activePopup.title}
              className="mb-5 h-44 w-full rounded-2xl border border-[#16a34a]/20 object-cover shadow-sm"
            />
          )}
          <div className="pr-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#15803d]/25 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#14532d] shadow-sm dark:bg-[#082f24]/70 dark:text-[#bbf7d0]">
              <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
              iZone Update
            </div>
            <h2 id="admin-popup-title" className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              {activePopup.title}
            </h2>
          </div>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#064e3b] dark:text-[#dcfce7]/85">
            {activePopup.message}
          </p>

          {activePopup.ctaLabel && activePopup.ctaLink && (
            <div className="mt-7">
              {isExternalLink ? (
                <Button asChild className="w-full rounded-full bg-primary py-5 font-semibold text-white shadow-[0_12px_28px_rgba(5,150,105,0.24)] hover:opacity-95">
                  <a href={activePopup.ctaLink} target="_blank" rel="noreferrer">
                    {activePopup.ctaLabel}
                  </a>
                </Button>
              ) : (
                <Button asChild className="w-full rounded-full bg-primary py-5 font-semibold text-white shadow-[0_12px_28px_rgba(5,150,105,0.24)] hover:opacity-95">
                  <Link to={activePopup.ctaLink}>
                    {activePopup.ctaLabel}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { testimonials: adminTestimonials = [] } = useAdmin() || {};
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isTablet = !isMobile && typeof window !== "undefined" && window.innerWidth < 1280;

  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCtasRef = useRef(null);
  const heroRightRef = useRef(null);
  const marqueeRef = useRef(null);
  const servicesGridRef = useRef(null);
  const whyChooseGridRef = useRef(null);
  const testimonialsGridRef = useRef(null);
  const hasEnteredTestimonials = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(heroBadgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.25 })
        .fromTo(
          heroTitleRef.current.querySelectorAll(".hero-title-line > span"),
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          heroDescRef.current.querySelectorAll(".hero-desc-line > span"),
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          heroCtasRef.current.children,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" },
          "-=0.5"
        )
        .fromTo(heroRightRef.current, { opacity: 0, scale: 0.9, rotate: -2 }, { opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: "back.out(1.2)" }, "-=0.7")
        .fromTo(marqueeRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8");
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const headers = document.querySelectorAll(".section-header-reveal");

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
  }, []);

  useEffect(() => {
    const grid = servicesGridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.children);

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile view: Animate each card individually as they scroll into view one by one
        cards.forEach((card) => {
          const icon = card.querySelector(".services-icon-wrap");
          const title = card.querySelector(".services-card-title");
          const desc = card.querySelector(".services-card-desc");
          const footer = card.querySelector(".services-card-footer");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            }
          });

          tl.fromTo(card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" }
          )
            .fromTo(icon,
              { scale: 0, rotate: -35, opacity: 0 },
              { scale: 1, rotate: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
              "-=0.55"
            )
            .fromTo(title,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
              "-=0.45"
            )
            .fromTo(desc,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
              "-=0.35"
            )
            .fromTo(footer,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
              "-=0.35"
            );
        });
      } else {
        // Desktop view: Coordinated grid level stagger reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });

        cards.forEach((card, index) => {
          const icon = card.querySelector(".services-icon-wrap");
          const title = card.querySelector(".services-card-title");
          const desc = card.querySelector(".services-card-desc");
          const footer = card.querySelector(".services-card-footer");

          tl.fromTo(card,
            { opacity: 0, y: 60, rotationX: 18, rotationY: -10, transformPerspective: 1000 },
            { opacity: 1, y: 0, rotationX: 0, rotationY: 0, duration: 1.2, ease: "power4.out", clearProps: "transform" },
            index === 0 ? 0 : "-=0.8"
          )
            .fromTo(icon,
              { scale: 0, rotate: -35, opacity: 0 },
              { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
              "-=0.9"
            )
            .fromTo(title,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.7"
            )
            .fromTo(desc,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.55"
            )
            .fromTo(footer,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.55"
            );
        });
      }
    }, grid);

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    const grid = whyChooseGridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.children);

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const icon = card.querySelector(".checklist-icon");
        const titleSpan = card.querySelector(".checklist-title span > span");
        const descSpan = card.querySelector(".checklist-desc span > span");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 93%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(card,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
        )
          .fromTo(icon,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" },
            "-=0.35"
          )
          .fromTo(titleSpan,
            { yPercent: 105, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
            "-=0.25"
          )
          .fromTo(descSpan,
            { yPercent: 105, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
            "-=0.25"
          );
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = heroRightRef.current;
    if (!container || isMobile) return;

    // Cache quickTo operations
    const rotateXTo = gsap.quickTo(container, "rotationX", { duration: 0.4, ease: "power2.out" });
    const rotateYTo = gsap.quickTo(container, "rotationY", { duration: 0.4, ease: "power2.out" });
    gsap.set(container, { transformPerspective: 1000, force3D: true });

    const badges = container.querySelectorAll(".absolute");
    const badgeXTo = Array.from(badges).map(badge => gsap.quickTo(badge, "x", { duration: 0.4, ease: "power2.out" }));
    const badgeYTo = Array.from(badges).map(badge => gsap.quickTo(badge, "y", { duration: 0.4, ease: "power2.out" }));

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 to 1
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2); // -1 to 1

      rotateXTo(-y * 8);
      rotateYTo(x * 8);

      badges.forEach((_, index) => {
        const factor = (index + 1) * 8;
        if (badgeXTo[index] && badgeYTo[index]) {
          badgeXTo[index](x * factor);
          badgeYTo[index](y * factor);
        }
      });
    };

    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      badges.forEach((_, index) => {
        if (badgeXTo[index] && badgeYTo[index]) {
          badgeXTo[index](0);
          badgeYTo[index](0);
        }
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".drift-wave-1", {
        y: 110,
        x: 60,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
      gsap.to(".drift-wave-2", {
        y: -130,
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const testimonialSource = testimonials;
  const publicTestimonials = testimonialSource
    .map(normalizeTestimonial)
    .filter(Boolean);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const visibleTestimonials = Array.from(
    { length: Math.min(3, publicTestimonials.length) },
    (_, index) => {
      const testimonialPosition =
        (testimonialIndex + index) % publicTestimonials.length;
      return publicTestimonials[testimonialPosition];
    }
  );
  const displayedTestimonials = isMobile
    ? visibleTestimonials.slice(0, 1)
    : isTablet ? visibleTestimonials.slice(0, 2) : visibleTestimonials;

  useEffect(() => {
    if (testimonialIndex >= publicTestimonials.length) {
      setTestimonialIndex(0);
    }
  }, [testimonialIndex, publicTestimonials.length]);

  const getTestimonialRating = (rating) => {
    const value = Number(rating);
    return Number.isFinite(value) && value > 0 ? Math.min(5, Math.max(1, Math.round(value))) : 5;
  };

  const getTestimonialAvatar = (testimonial) => {
    return testimonial.avatar || getAvatarFallback(testimonial.author);
  };

  const getTestimonialRole = (testimonial) => {
    return testimonial.role || testimonial.position;
  };

  useEffect(() => {
    const grid = testimonialsGridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.children);

    const ctx = gsap.context(() => {
      if (!hasEnteredTestimonials.current) {
        // Initial viewport scroll reveal (coordinated stagger)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            toggleActions: "play none none reverse",
            onComplete: () => {
              hasEnteredTestimonials.current = true;
            }
          }
        });

        cards.forEach((card, index) => {
          const quoteIcon = card.querySelector(".testimonial-quote");
          const stars = card.querySelector(".testimonial-stars");
          const text = card.querySelector(".testimonial-text");
          const client = card.querySelector(".testimonial-client");

          tl.fromTo(card,
            { opacity: 0, y: 50, rotationX: 15, rotationY: -8, transformPerspective: 1000 },
            { opacity: 1, y: 0, rotationX: 0, rotationY: 0, duration: 1.1, ease: "power4.out" },
            index === 0 ? 0 : "-=0.75"
          );

          if (quoteIcon) {
            tl.fromTo(quoteIcon,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 0.1, duration: 0.6, ease: "back.out(1.5)" },
              "-=0.8"
            );
          }

          if (stars && stars.children.length > 0) {
            tl.fromTo(Array.from(stars.children),
              { scale: 0, rotate: -30, opacity: 0 },
              { scale: 1, rotate: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "back.out(1.7)" },
              "-=0.7"
            );
          }

          if (text) {
            tl.fromTo(text,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
              "-=0.5"
            );
          }

          if (client) {
            tl.fromTo(client,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
              "-=0.45"
            );
          }
        });
      } else {
        // Slide carousel paging: Trigger instant smooth transition
        gsap.fromTo(cards,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
        // Force reset internal elements to fully visible state
        cards.forEach((card) => {
          gsap.set(card.querySelectorAll(".testimonial-quote, .testimonial-stars, .testimonial-text, .testimonial-client, .testimonial-stars > *"), {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0
          });
        });
      }
    }, grid);

    return () => ctx.revert();
  }, [displayedTestimonials]);

  const showPreviousTestimonials = () => {
    if (publicTestimonials.length === 0) return;
    setTestimonialIndex((current) =>
      current === 0 ? publicTestimonials.length - 1 : current - 1
    );
  };

  const showNextTestimonials = () => {
    if (publicTestimonials.length === 0) return;
    setTestimonialIndex((current) => (current + 1) % publicTestimonials.length);
  };

  const handleTestimonialSwipe = (_, info) => {
    const swipeDistance = info.offset.x;
    const swipeVelocity = info.velocity.x;

    if (swipeDistance < -50 || swipeVelocity < -500) {
      showNextTestimonials();
    }

    if (swipeDistance > 50 || swipeVelocity > 500) {
      showPreviousTestimonials();
    }
  };

  return (
    <Layout>
      <AdminPopup />

      <style>{`
        @keyframes drift-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(12px, -12px) rotate(1deg); }
        }
        @keyframes drift-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 8px) rotate(-1deg); }
        }
        .drift-wave-1 {
          animation: drift-slow 18s ease-in-out infinite;
        }
        .drift-wave-2 {
          animation: drift-reverse 22s ease-in-out infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @media (max-width: 1023px) and (max-height: 850px) {
          .hero-left-col h1 {
            font-size: 2.2rem !important;
          }
          .hero-left-col p {
            font-size: 12.5px !important;
          }
          .hero-right-col > div {
            max-width: 270px !important;
          }
        }
        @media (max-width: 1023px) and (max-height: 750px) {
          .hero-left-col h1 {
            font-size: 1.95rem !important;
          }
          .hero-left-col p {
            font-size: 11.5px !important;
          }
          .hero-right-col > div {
            max-width: 220px !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-6rem)] h-[calc(100svh-6rem)] md:h-[calc(100vh-6.5rem)] md:h-[calc(100svh-6.5rem)] xl:h-[calc(100vh-7rem)] xl:h-[calc(100svh-7rem)] bg-gradient-to-br from-[#f7faf8] via-[#ffffff] to-[#eff5f1] dark:from-zinc-950 dark:to-zinc-900 overflow-hidden flex flex-col font-sans select-none justify-between border-b border-zinc-200/30 dark:border-zinc-800/20">

        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#e3ebe6_1px,transparent_1px),linear-gradient(to_bottom,#e3ebe6_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

        {/* Morphing decorative backdrop waves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="drift-wave-1 absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-[#eaf5ef]/40 dark:bg-emerald-950/5 blur-[120px] rounded-full" />
          <div className="drift-wave-2 absolute -bottom-[30%] -right-[10%] w-[55%] h-[65%] bg-emerald-100/20 dark:bg-emerald-900/5 blur-[130px] rounded-full" />
        </div>

        {/* 2. Main Content Area */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col lg:grid lg:grid-cols-12 items-center justify-around py-4 lg:py-0 min-h-0 overflow-hidden">

          {/* Left Column: Headline, CTAs */}
          <div className="hero-left-col lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left gap-4 lg:gap-6 pt-8 pb-4 lg:py-6 z-10 lg:pr-8 h-full justify-center">
            {/* IT Sector Badge */}
            <div ref={heroBadgeRef} style={{ opacity: 0 }} className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf5ef]/90 dark:bg-emerald-950/40 border border-[#bce4cf] dark:border-emerald-800/30 rounded-full text-[8.5px] lg:text-[9px] font-bold tracking-wider text-[#2f855a] dark:text-[#6ba67e] uppercase">
              <Sparkles size={10} className="fill-[#2f855a]" />
              An Information Technology Sector In Tamilnadu
            </div>

            {/* Title */}
            <h1 ref={heroTitleRef} className="text-5xl sm:text-6xl lg:text-[3.2vw] xl:text-[3.7vw] font-[900] leading-[1.05] tracking-tight text-[#1a202c] dark:text-white select-none">
              <span className="hero-title-line block overflow-hidden">
                <span className="inline-block" style={{ opacity: 0 }}>We Build</span>
              </span>
              <span className="hero-title-line block overflow-hidden">
                <span className="inline-block text-[#2f855a] dark:text-[#6ba67e] font-[950] tracking-tight" style={{ opacity: 0 }}>Digital Excellence</span>
              </span>
              <span className="hero-title-line block overflow-hidden">
                <span className="inline-block" style={{ opacity: 0 }}>That Drives</span>
              </span>
              <span className="hero-title-line block overflow-hidden">
                <span className="inline-block" style={{ opacity: 0 }}>
                  <span className="relative inline-block px-1">
                    <span className="font-['Dancing_Script'] font-semibold text-[1.15em] text-[#2f855a] dark:text-[#6ba67e] tracking-normal lowercase italic pl-1.5">
                      success
                    </span>
                    {/* Green curved underline SVG */}
                    <svg className="absolute left-0 -bottom-1.5 w-full h-2.5 text-[#2f855a] dark:text-[#6ba67e]" viewBox="0 0 100 8" fill="none" preserveAspectRatio="none">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
                        d="M2 6 Q 50 1, 98 6"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>

            <p ref={heroDescRef} className="text-sm sm:text-base lg:text-[1.05rem] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-sm sm:max-w-md lg:max-w-xl mx-auto lg:mx-0 flex flex-col gap-0.5">
              <span className="hero-desc-line block overflow-hidden">
                <span className="inline-block" style={{ opacity: 0 }}>From modern websites and digital campaigns</span>
              </span>
              <span className="hero-desc-line block overflow-hidden">
                <span className="inline-block" style={{ opacity: 0 }}>to SEO and growth, <span className="font-semibold text-[#2f855a] dark:text-[#6ba67e]">iZone</span> is your trusted partner.</span>
              </span>
              <span className="hero-desc-line block overflow-hidden">
                <span className="inline-block" style={{ opacity: 0 }}>9 years. 100+ launches. One expert team.</span>
              </span>
            </p>

            {/* CTA Buttons */}
            <div ref={heroCtasRef} className="flex flex-row justify-center lg:justify-start gap-2.5 w-full sm:w-auto mt-1 lg:mt-2">
              <Magnetic style={{ opacity: 0 }}>
                <Link to="/portfolio" className="w-auto">
                  <button className="w-auto flex items-center justify-center gap-2 bg-[#2f855a] hover:bg-[#276749] text-white px-4 py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg shadow-emerald-500/10 active:scale-95 transition-all duration-300">
                    Explore Our Work
                    <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center text-[#2f855a]">
                      <ArrowUpRight size={10} />
                    </div>
                  </button>
                </Link>
              </Magnetic>

              <Magnetic style={{ opacity: 0 }}>
                <Link to="/services" className="w-auto">
                  <button className="w-auto flex items-center justify-center gap-2 bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 px-4 py-2 rounded-full text-xs lg:text-sm font-bold shadow-sm hover:shadow-md hover:bg-zinc-50 transition-all duration-300">
                    Our Services
                    <LayoutGrid size={10} className="text-[#2f855a]" />
                  </button>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Ball Element Mockup with Floating Cards */}
          <div ref={heroRightRef} style={{ opacity: 0 }} className="hero-right-col lg:col-span-6 relative flex justify-center items-center h-full min-h-0 z-10 select-none py-2 lg:py-0 w-full">

            {/* The 3D Ball Element Graphic */}
            <div className="relative w-[90%] max-w-[390px] sm:max-w-[390px] md:max-w-[440px] lg:max-w-none max-h-[30vh] sm:max-h-[35vh] lg:max-h-none flex justify-center items-center">
              <img
                src="/ball-element.png"
                alt="iZone Core System"
                className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(47,133,90,0.1)]"
              />

              {/* Badge 1: AI Integration (Top Left) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[12%] left-[-2%] sm:left-[-5%] hidden sm:flex items-center gap-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-2 rounded-xl border border-zinc-100/50 shadow-md scale-90 sm:scale-100"
              >
                <div className="w-6.5 h-6.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-[#2f855a]">
                  <Cpu size={13} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-[#1a202c] dark:text-white">AI Integration</span>
                  <span className="text-[7.5px] text-zinc-500 font-semibold">Intelligent Solutions</span>
                </div>
              </motion.div>

              {/* Badge 2: Cloud SLA (Bottom Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute bottom-[22%] left-[2%] sm:left-[0%] hidden sm:flex items-center gap-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-2 rounded-xl border border-zinc-100/50 shadow-md scale-90 sm:scale-100"
              >
                <div className="w-6.5 h-6.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-[#2f855a]">
                  <Cloud size={13} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-[#1a202c] dark:text-white flex items-center gap-1">
                    Cloud SLA <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                  <span className="text-[7.5px] text-zinc-500 font-semibold">99.9% Uptime</span>
                </div>
              </motion.div>

              {/* Badge 3: Top Rated (Bottom Right) */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                className="absolute bottom-[25%] right-[0%] sm:right-[-2%] hidden sm:flex items-center gap-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-2 rounded-xl border border-zinc-100/50 shadow-md scale-90 sm:scale-100"
              >
                <div className="w-6.5 h-6.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-[#2f855a]">
                  <Users size={13} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-[#1a202c] dark:text-white flex items-center gap-1">
                    Top Rated <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                  <span className="text-[7.5px] text-zinc-500 font-semibold">By Our Clients</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* 3. Full-width Infinite Horizontal Scrolling Marquee */}
        <div ref={marqueeRef} style={{ opacity: 0 }} className="relative z-30 w-full border-t border-zinc-200/50 dark:border-zinc-800/30 bg-[#f7faf8]/80 dark:bg-zinc-950/40 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:py-5 overflow-hidden select-none backdrop-blur-sm">
          <div className="flex whitespace-nowrap overflow-hidden">
            {/* Track 1 */}
            <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee gap-8 md:gap-12">
              {["BUILD", "GROW", "AUTOMATE", "OPTIMIZE", "CONVERT", "SCALE", "RANK", "ENGAGE", "INNOVATE", "CREATE", "DESIGN", "DEVELOP", "LAUNCH", "ANALYZE", "IMPROVE"].map((word, idx) => (
                <span key={idx} className="text-[11px] md:text-xs lg:text-[13px] font-[900] tracking-[0.25em] text-[#2f855a] dark:text-[#6ba67e] uppercase flex items-center gap-8 md:gap-12">
                  {word} <span className="text-zinc-300 dark:text-zinc-700 font-medium select-none">•</span>
                </span>
              ))}
            </div>
            {/* Track 2 */}
            <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee gap-8 md:gap-12">
              {["BUILD", "GROW", "AUTOMATE", "OPTIMIZE", "CONVERT", "SCALE", "RANK", "ENGAGE", "INNOVATE", "CREATE", "DESIGN", "DEVELOP", "LAUNCH", "ANALYZE", "IMPROVE"].map((word, idx) => (
                <span key={`dup-${idx}`} className="text-[11px] md:text-xs lg:text-[13px] font-[900] tracking-[0.25em] text-[#2f855a] dark:text-[#6ba67e] uppercase flex items-center gap-8 md:gap-12">
                  {word} <span className="text-zinc-300 dark:text-zinc-700 font-medium select-none">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Core Pillars Section */}
      <CorePillarsSection />

      {/* Services Section */}
      <section className="section-padding bg-background text-zinc-900 dark:bg-[#030303] dark:text-white border-y border-slate-200/50 dark:border-zinc-900/60 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="container-custom relative z-10">

          <div className="section-header-reveal text-center mb-16 max-w-2xl mx-auto flex flex-col items-center gap-4">
            <span className="reveal-badge text-xs uppercase tracking-[0.25em] font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              Our Services
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase overflow-hidden">
              <span className="reveal-title-line block overflow-hidden">
                <span className="inline-block">What We Offer</span>
              </span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed flex flex-col gap-0.5 max-w-lg">
              <span className="reveal-desc-line block overflow-hidden">
                <span className="inline-block">We design and construct digital products</span>
              </span>
              <span className="reveal-desc-line block overflow-hidden">
                <span className="inline-block">engineered for efficiency, speed, and massive business growth.</span>
              </span>
            </p>
          </div>

          {/* Premium Bento Grid Services with 3D Tilt & cursor spotlights */}
          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="opacity-0">
                  <TiltSpotlightCard className="group relative flex flex-col justify-between p-8 rounded-3xl border border-slate-200/50 bg-white dark:border-slate-800/40 dark:bg-zinc-950 hover:border-primary/40 shadow-sm transition-all duration-500 overflow-hidden h-full">
                    {/* Corner Tech Border Accent */}
                    <div className="absolute top-0 right-0 w-24 h-[1px] bg-primary/30 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
                    <div className="absolute top-0 right-0 w-[1px] h-24 bg-primary/30 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

                    <div>
                      {/* Icon */}
                      <div className="services-icon-wrap w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-[1.08] group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Title */}
                      <h3 className="services-card-title font-display text-xl font-bold mt-6 mb-3 text-zinc-900 dark:text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Desc */}
                      <p className="services-card-desc text-muted-foreground text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                    </div>

                    {/* Tags */}
                    <div className="services-card-footer mt-8 flex flex-col gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {service.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-900 text-slate-500 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={service.path}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all mt-2"
                      >
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </TiltSpotlightCard>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-100/40 dark:bg-zinc-950/30 border-y border-slate-200/50 dark:border-zinc-900/60 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="container-custom">
          <ScrollStaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                stat={stat}
              />
            ))}
          </ScrollStaggerContainer>
        </div>
      </section>

      {/* Why Choose Us Section with Image Parallax */}
      <section className="section-padding relative overflow-hidden bg-background text-zinc-900 dark:bg-[#030303] dark:text-white">
        <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column Content */}
            <div className="lg:col-span-6">
              <div className="section-header-reveal flex flex-col items-start gap-4 mb-6">
                <span className="reveal-badge text-xs uppercase tracking-[0.25em] font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  Why Choose Us
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white uppercase overflow-hidden">
                  <span className="reveal-title-line block overflow-hidden">
                    <span className="inline-block">A technology partner you</span>
                  </span>
                  <span className="reveal-title-line block overflow-hidden">
                    <span className="inline-block">can build the next decade with.</span>
                  </span>
                </h2>
                <p className="reveal-desc text-muted-foreground text-sm leading-relaxed text-justify flex flex-col gap-0.5 max-w-xl">
                  <span className="reveal-desc-line block overflow-hidden">
                    <span className="inline-block">With over a decade of experience, we've mastered the art of</span>
                  </span>
                  <span className="reveal-desc-line block overflow-hidden">
                    <span className="inline-block">creating digital solutions that drive results. Our team of expert developers,</span>
                  </span>
                  <span className="reveal-desc-line block overflow-hidden">
                    <span className="inline-block">designers, and strategists work together to deliver excellence.</span>
                  </span>
                </p>
              </div>

              {/* Checklist list with GSAP stagger triggers */}
              <div ref={whyChooseGridRef} className="space-y-5 text-justify max-w-xl">
                {[
                  { icon: Users, title: "Discovery Before Code", desc: "Every project starts with a clear scope, a defined success metric, and a written plan." },
                  { icon: Award, title: "Engineering First Philosophy", desc: "We build for performance, security, and the day someone else maintains the codebase." },
                  { icon: Zap, title: "Built For Massive Scale", desc: "Architectural design choices capable of handling 10x user scaling, supported by SLAs." },
                ].map((item, index) => (
                  <div key={index} className="opacity-0 flex items-start gap-4 p-4 rounded-2xl border border-slate-100 dark:border-zinc-900 hover:border-primary/20 dark:hover:border-primary/20 transition-colors duration-300">
                    <div className="checklist-icon w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="checklist-title font-bold text-sm text-foreground mb-1 overflow-hidden">
                        <span className="block overflow-hidden">
                          <span className="inline-block">{item.title}</span>
                        </span>
                      </h4>
                      <p className="checklist-desc text-xs text-muted-foreground leading-relaxed overflow-hidden">
                        <span className="block overflow-hidden">
                          <span className="inline-block">{item.desc}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Magnetic>
                  <Link to="/about">
                    <Button className="rounded-full bg-primary hover:bg-primary/95 text-white px-8 py-6 text-sm font-bold shadow-[0_15px_30px_rgba(22,163,74,0.25)] hover:scale-[1.02] transition-transform duration-300">
                      Learn More About Us
                    </Button>
                  </Link>
                </Magnetic>
              </div>
            </div>

            {/* Right Column Layout Frame with Parallax Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative flex justify-center"
            >
              <div className="relative w-full max-w-[500px] p-4 rounded-3xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-zinc-950/20 backdrop-blur-md shadow-2xl overflow-hidden group">

                {/* Scroll Parallax Image Container */}
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop&auto=format&q=75"
                  alt="Team collaboration"
                  className="rounded-2xl w-full h-[320px] sm:h-[400px] overflow-hidden"
                  innerClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Shiny glass overlay overlay badge */}
                <div className="absolute -bottom-2 -left-2 sm:-left-4 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xl max-w-[210px] transform group-hover:-translate-y-1 transition-transform duration-500 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                      <Award className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-foreground tracking-tight">
                        Top Rated
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide mt-0.5">
                        Agency 2024
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-slate-100/40 dark:bg-zinc-950/20 border-y border-slate-200/50 dark:border-zinc-900/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="container-custom">

          <div className="relative mb-12 md:mb-16">
            <div className="section-header-reveal flex flex-col items-center text-center gap-2">
              <span className="reveal-badge font-['Dancing_Script'] text-primary text-3xl md:text-4xl font-bold -rotate-2">
                Client
              </span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter text-zinc-900 dark:text-white mt-1 overflow-hidden">
                <span className="reveal-title-line block overflow-hidden">
                  <span className="inline-block">Testimonials</span>
                </span>
              </h2>
            </div>

            {publicTestimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3 md:absolute md:right-0 md:top-[62%] md:mt-0 md:translate-y-[-50%]">
                <button
                  type="button"
                  onClick={showPreviousTestimonials}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-zinc-700 shadow-sm transition hover:bg-primary hover:text-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-white hover:scale-[1.05]"
                  aria-label="Show previous testimonials"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNextTestimonials}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-zinc-700 shadow-sm transition hover:bg-primary hover:text-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-white hover:scale-[1.05]"
                  aria-label="Show next testimonials"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <div ref={testimonialsGridRef} className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
            {displayedTestimonials.map((testimonial, index) => (
              <div
                key={`${isMobile ? "mobile" : isTablet ? "tablet" : "desktop"}-${testimonialIndex}-${index}`}
                className="w-full max-w-[370px] md:max-w-none xl:max-w-[370px] opacity-0"
              >
                {/* 3D Tilt test card */}
                <TiltSpotlightCard className="relative overflow-hidden min-h-[350px] p-8 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-zinc-900/60 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-primary/30 h-full">
                  <Quote className="testimonial-quote absolute top-6 left-6 w-12 h-12 text-primary/5 dark:text-primary/10 -scale-x-100 opacity-10" />

                  <div>
                    {/* Rating stars */}
                    <div className="testimonial-stars flex items-center gap-1 mb-6">
                      {[...Array(getTestimonialRating(testimonial.rating))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#16A34A] text-[#16A34A]" />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <p className="testimonial-text text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed italic mb-6">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="testimonial-client flex items-center gap-4 border-t border-slate-100 dark:border-zinc-800/80 pt-6 mt-auto">
                    <img
                      src={getTestimonialAvatar(testimonial)}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 shadow-md"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-foreground tracking-tight">{testimonial.author}</h4>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">
                        {getTestimonialRole(testimonial)} &bull; <span className="text-primary">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </TiltSpotlightCard>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Projects - Scroll Animated */}
      <ScrollWorksSection
        works={projects}
        title="Our Portfolio"
        subtitle="Featured Projects"
        className="home-portfolio-section"
      />

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden bg-background dark:bg-[#020202]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
        <div className="container-custom relative z-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-zinc-800/50 dark:bg-zinc-950/20 backdrop-blur-xl p-10 md:p-16 text-center shadow-2xl"
          >
            {/* Tech grid lines overlay inside CTA box */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:3rem_3rem]" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">

              <div className="section-header-reveal flex flex-col items-center text-center gap-4 mb-6">
                <span className="reveal-badge text-xs uppercase tracking-[0.25em] font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  Let's Collaborate
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white uppercase overflow-hidden">
                  <span className="reveal-title-line block overflow-hidden">
                    <span className="inline-block">Ready to Start Your Project?</span>
                  </span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed flex flex-col gap-0.5">
                  <span className="reveal-desc-line block overflow-hidden">
                    <span className="inline-block">Let's build something extraordinary together. Get in touch with our</span>
                  </span>
                  <span className="reveal-desc-line block overflow-hidden">
                    <span className="inline-block">team and let's discuss how we can bring your vision to life.</span>
                  </span>
                </p>
              </div>

              <ScrollStaggerContainer className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto" start="top 92%">
                <Magnetic>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-white px-8 py-6 text-sm font-bold shadow-[0_15px_30px_rgba(22,163,74,0.25)] hover:scale-[1.02] transition-transform duration-300">
                      Contact Us Today
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/development" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto rounded-full border-zinc-300 bg-white/40 dark:border-zinc-800 dark:bg-zinc-950/40 px-8 py-6 text-sm font-bold backdrop-blur-md hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:scale-[1.02] transition-transform duration-300"
                    >
                      Explore Services
                    </Button>
                  </Link>
                </Magnetic>
              </ScrollStaggerContainer>

            </div>
          </motion.div>

        </div>
      </section>
    </Layout>
  );
};

export default Index;

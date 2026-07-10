import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
const WorldMapBackground = lazy(() => import("@/components/WorldMapBackground"));
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ScrollWorksSection from "@/components/ui/ScrollWorksSection";
import { useAdmin } from "@/context/AdminContext";
import { useIsMobile } from "@/hooks/use-mobile";

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

const testimonials = [];

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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
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
    <motion.div ref={ref} variants={variants} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
        {stat.isStatic ? stat.value : `${count}${stat.suffix || ""}`}
      </div>
      <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
    </motion.div>
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
  const { testimonials: adminTestimonials = [] } = useAdmin() || {};
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isTablet = !isMobile && typeof window !== "undefined" && window.innerWidth < 1280;
  const testimonialSource =
    adminTestimonials.length > 0 ? [...adminTestimonials].reverse() : testimonials;
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
    return Number.isFinite(value) && value > 0 ? value : 5;
  };

  const getTestimonialAvatar = (testimonial) => {
    return testimonial.avatar || getAvatarFallback(testimonial.author);
  };

  const getTestimonialRole = (testimonial) => {
    return testimonial.role || testimonial.position;
  };

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
      <section className="relative overflow-hidden bg-[#e1e8e2] px-4 pt-4 dark:bg-background md:px-8 md:pt-8 xl:min-h-[calc(100vh-6rem)]">
        {/* Static world map image background */}
        <div className="absolute inset-0">
          <img
            src="/hero/world-map-bg.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center opacity-100 dark:opacity-30"
          />
        </div>
        {/* Animated dots overlay — deferred so it never blocks FCP */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <WorldMapBackground isDark={theme === "dark"} />
          </Suspense>
        </div>
        {/* Dark mode overlay */}
        <div className="absolute inset-0 dark:bg-background/85" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="container-custom relative z-10 flex min-h-[calc(100vh-9rem)] w-full max-w-full min-w-0 items-start pb-6 pt-2 md:min-h-[calc(100vh-10rem)] md:pb-12 md:pt-4 xl:min-h-[calc(100vh-6rem)] xl:items-center xl:py-20"
        >
          <div className="grid w-full max-w-full min-w-0 items-center justify-items-center gap-8 pt-0 md:pt-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 xl:pt-0">
            <div className="mx-auto w-full min-w-0 max-w-2xl overflow-visible text-center xl:mx-0 xl:text-left">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mt-5 flex justify-center md:mt-0 xl:justify-start"
              >
                <span className="inline-flex max-w-full justify-center rounded-full border border-[#15803d]/25 bg-[#ffffffb8] px-3 py-2 text-center text-[0.78rem] font-medium leading-snug text-[#14532d] backdrop-blur-sm dark:border-[#bbf7d0]/35 dark:bg-[#15803d]/12 dark:text-[#bbf7d0] sm:px-4 sm:text-sm">
                  An Information Technology Sector In Tamilnadu
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mt-4 text-[clamp(1.9rem,10vw,2.1rem)] font-semibold leading-[1.05] tracking-tight text-[#111827] sm:text-5xl md:text-[4.35rem] dark:text-[#f0fdf4]"
              >
                We Build
                <span className="block mt-2 overflow-visible">
                  <span className="inline-block leading-[1.25] pb-[0.15em] pr-1 gradient-text sm:whitespace-nowrap">
                    Digital Excellence
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-4 max-w-xl mx-auto xl:mx-0 text-sm leading-relaxed text-[#14532d] md:text-[1.02rem] dark:text-[#dcfce7] text-center xl:text-justify"
              >
                From custom software and AI integrations to mobile apps and growth marketing, Izone is your full-stack technology partner. Nine years. 100+ launches. One accountable team.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="mt-7 flex flex-wrap gap-3 justify-center xl:justify-start"
              >
                <Link to="/get-started">
                  <Button className="rounded-full border border-[#bbf7d0]/40 bg-primary px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(22,163,74,0.28)]">
                    Get Started
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button
                    variant="outline"
                    className="rounded-full border-[#15803d]/30 bg-[#f0fdf4]/90 px-6 py-4 text-sm font-semibold text-[#064e3b] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-sm hover:bg-[#dcfce7] hover:text-[#052e16] dark:border-[#bbf7d0]/40 dark:bg-[#06110d]/55 dark:text-[#dcfce7] dark:hover:bg-[#082f24] dark:hover:text-white"
                  >
                    View Portfolio
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 w-full min-w-0 overflow-hidden"
              >
                <ClientMarquee />
              </motion.div>
            </div>

            {/* Hero image with orbit */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full flex justify-center lg:justify-end"
            >
              {/* Padding creates space for balls to orbit outside the image */}
              <div className="relative p-10" style={{ maxWidth: 580 }}>
                <img
                  src="/hero/hero.png"
                  alt="iZone Technologies"
                  width="1536"
                  height="1024"
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                  className="block h-auto w-full object-contain drop-shadow-2xl"
                  style={{
                    imageRendering: "auto",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                />
                {/* Orbit ring — sized to the full padded container so balls go around the image */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    animation: "orbit-cw 9s linear infinite",
                    borderRadius: "50%",
                  }}
                >
                  {/* 🟠 Orange — top */}
                  <div className="absolute rounded-full" style={{
                    width: "26px", height: "26px",
                    top: "-13px", left: "calc(50% - 13px)",
                    background: "radial-gradient(circle at 35% 30%, #ffb347, #F55C11)",
                    boxShadow: "0 0 18px 7px rgba(245,92,17,0.9)",
                  }} />
                  {/* 🟢 Green — right */}
                  <div className="absolute rounded-full" style={{
                    width: "22px", height: "22px",
                    top: "calc(50% - 11px)", right: "-11px",
                    background: "radial-gradient(circle at 35% 30%, #c8f54a, #2C884B)",
                    boxShadow: "0 0 16px 6px rgba(157,217,31,0.9)",
                  }} />
                  {/* 🩷 Pink — bottom */}
                  <div className="absolute rounded-full" style={{
                    width: "24px", height: "24px",
                    bottom: "-12px", left: "calc(50% - 12px)",
                    background: "radial-gradient(circle at 35% 30%, #ff80c8, #C2136F)",
                    boxShadow: "0 0 17px 7px rgba(194,19,111,0.9)",
                  }} />
                  {/* 🟣 Violet — left */}
                  <div className="absolute rounded-full" style={{
                    width: "20px", height: "20px",
                    top: "calc(50% - 10px)", left: "-10px",
                    background: "radial-gradient(circle at 35% 30%, #c4b5fd, #6A1BFF)",
                    boxShadow: "0 0 15px 6px rgba(106,27,255,0.9)",
                  }} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-background text-zinc-900 dark:bg-[#050505] dark:text-white border-y border-zinc-200 dark:border-zinc-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium">Our Services</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-zinc-900 dark:text-white">
              What We Offer
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="service-pentagon-card group"
              >
                <div className="service-pentagon-stack">
                  <div className="service-pentagon-bg" />
                  <div className="service-pentagon-glow service-pentagon-glow-top" />
                  <div className="service-pentagon-glow service-pentagon-glow-bottom" />
                  <div className="service-pentagon-icon" aria-hidden="true">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="service-pentagon-title font-display font-semibold text-lg">
                    {service.title}
                  </h3>
                  <p className="service-pentagon-description text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 border-y border-border">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                stat={stat}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium">Why Choose Us</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                A technology partner you can build the next decade with.
              </h2>
              <p className="text-muted-foreground text-justify mb-8">
                With over a decade of experience, we've mastered the art of
                creating digital solutions that drive results. Our team of
                expert developers, designers, and strategists work together to
                deliver excellence.
              </p>

              <div className="space-y-4 text-justify">
                {[
                  { icon: Users, text: "Discovery before code — Every project starts with a clear scope, a defined success metric, and a written plan you can hold us to." },
                  { icon: Award, text: "Engineering, not just visuals — We build for performance, observability, and the day someone else has to maintain the code." },
                  { icon: Zap, text: "Built to grow with you — Architecture choices that handle 10x scale, plus the support contract that keeps it that way." },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

             <Link to="/about">
              <Button className="mt-8 glow-border hover-glow">
                Learn More About Us
              </Button>
             </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-8 glow-border">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg w-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card p-4 glow-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Top Rated
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Agency 2024
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-zinc-100/30 dark:bg-zinc-950/20">
        <div className="container-custom">
          <div className="relative mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className="font-['Dancing_Script'] text-[#16A34A] text-3xl md:text-4xl -rotate-2">
                Client
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tighter text-zinc-900 dark:text-white mt-1">
                Testimonial
              </h2>
            </motion.div>
            {publicTestimonials.length > 1 && (
              <div className="mt-6 hidden items-center justify-center gap-3 md:absolute md:right-0 md:top-[62%] md:mt-0 md:flex md:-translate-y-1/2">
              <button
                type="button"
                onClick={showPreviousTestimonials}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#16A34A]/40 bg-white text-[#33353D] shadow-sm transition hover:bg-[#16A34A] hover:text-white dark:bg-zinc-900 dark:text-white"
                aria-label="Show previous testimonials"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNextTestimonials}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#16A34A]/40 bg-white text-[#33353D] shadow-sm transition hover:bg-[#16A34A] hover:text-white dark:bg-zinc-900 dark:text-white"
                aria-label="Show next testimonials"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 justify-items-center gap-x-7 gap-y-14 md:grid-cols-2 xl:grid-cols-3 md:gap-x-6 xl:gap-x-10">
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${isMobile ? "mobile" : isTablet ? "tablet" : "desktop"}-${testimonialIndex}-${index}`}
                drag={isMobile && index === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                dragMomentum={false}
                onDragEnd={index === 0 ? handleTestimonialSwipe : undefined}
                className={`relative w-full max-w-[360px] md:max-w-none xl:max-w-[360px] group ${isMobile ? "touch-pan-y" : ""}`}
              >
                {/* Main Card */}
                <div className="relative overflow-hidden min-h-[330px] md:min-h-[360px] md:aspect-square flex flex-col shadow-2xl rounded-sm border border-black/5">
                  {/* Background Split */}
                  <div className="h-[40%] md:h-[44%] w-full bg-white transition-colors duration-500" />
                  <div className="flex-1 w-full bg-[#33353D] transition-colors duration-500" />

                  {/* Design Overlays */}
                  <div className="absolute inset-0 flex flex-col items-center p-6 md:p-8 pointer-events-none">
                    {/* Decorative Border Overlay */}
                    <div className="absolute inset-4 border border-[#33353D]/10 dark:border-white/5 rounded-lg z-0 transition-opacity group-hover:opacity-40" />

                    {/* Content */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center pointer-events-auto">
                      {/* Stylistic Quotation Marks */}
                      <div className="absolute top-0 left-0 text-[#33353D]/10">
                        <Quote className="w-14 h-14 -scale-x-100 opacity-20" strokeWidth={0.5} />
                      </div>

                      {/* Avatar */}
                      <div className="relative mt-2 mb-4 md:mb-6">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-[#16A34A] p-1 shadow-xl bg-white">
                          <img
                            src={getTestimonialAvatar(testimonial)}
                            alt={testimonial.author}
                            className="w-full h-full rounded-full object-cover shadow-inner"
                          />
                        </div>
                      </div>

                      {/* Info Text */}
                      <div className="text-center group-hover:translate-y-[-2px] transition-transform duration-300">
                        <h3 className="font-bold text-lg text-white leading-tight mb-1">
                          {testimonial.author}
                        </h3>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4">
                          {getTestimonialRole(testimonial)}
                        </p>

                        <div className="flex justify-center gap-0.5 mb-4 md:mb-6">
                          {[...Array(getTestimonialRating(testimonial.rating))].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#16A34A] text-[#16A34A]" />
                          ))}
                        </div>

                        <div className="relative px-2">
                          <p className="text-zinc-300 text-[13px] leading-relaxed italic md:line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                            "{testimonial.quote}"
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-4 right-0 text-white/5">
                        <Quote className="w-14 h-14 opacity-20" strokeWidth={0.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's build something extraordinary together. Get in touch with
                our team and let's discuss how we can bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="glow-border hover-glow">
                    Contact Us Today
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/development">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border hover:bg-muted hover:text-foreground"
                  >
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

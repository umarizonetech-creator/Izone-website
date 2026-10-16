import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Monitor,
  Award,
  Check,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  Palette,
  FolderGit2,
  Send,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { slugify } from "@/utils/courseSlug";
import { renderCourseHighlightIcon } from "@/utils/courseIcons";
import { toast } from "sonner";

export default function CourseDetails() {
  const { id } = useParams();
  const { courses = [], addCourseApplication, ensureLoaded } = useAdmin();

  useEffect(() => {
    if (ensureLoaded) {
      ensureLoaded("courses");
    }
  }, [ensureLoaded]);

  // Find course by slug, title slug, or fallback to id match
  const paramIdentifier = String(id || "").toLowerCase().trim();
  const course =
    courses.find((c) => {
      const courseSlug = (c.slug || "").toLowerCase().trim();
      const courseTitleSlug = slugify(c.title || "");
      const courseId = String(c.id);
      return (
        (courseSlug && courseSlug === paramIdentifier) ||
        (courseTitleSlug && courseTitleSlug === paramIdentifier) ||
        courseId === paramIdentifier
      );
    }) || courses[0];

  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOpenEnroll = (planName = "Basic") => {
    setSelectedPlan(planName);
    setIsSubmitted(false);
    setEmailError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addCourseApplication({
        name: form.name,
        email: form.email,
        phone: form.phone,
        courseTitle: `${course?.title || "Course"} (${selectedPlan} Plan)`,
        message: form.message
          ? `[Selected Plan: ${selectedPlan}] ${form.message}`
          : `Selected Plan: ${selectedPlan}`,
      });
      setIsSubmitted(true);
      toast.success("Enrollment application submitted successfully!");
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setForm({ name: "", email: "", phone: "", message: "" });
      }, 2500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit enrollment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!course && courses.length === 0) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm">Loading course details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Right-side dynamic contents loaded by admin
  const badgeText =
    course?.badge ||
    (course?.title ? `${course.title} Course`.toUpperCase() : "PROFESSIONAL TRAINING COURSE");

  const headline = course?.headline || "Turn Creativity into a Career.";

  // High-priority highlights
  const defaultHighlights = [
    { title: "Understand design principles and layouts", icon: "palette" },
    { title: "Create strong visual identities", icon: "sparkles" },
    {
      title:
        (course?.techStack && course.techStack.length > 0)
          ? course.techStack.slice(0, 3).join(", ") + " & more"
          : "Photoshop, Illustrator, InDesign & more",
      icon: "layers",
    },
    { title: "Work on real projects & build your portfolio", icon: "folder" },
  ];

  const highlights =
    course?.highlights && Array.isArray(course.highlights) && course.highlights.length > 0
      ? course.highlights.map((h, i) =>
          typeof h === "string"
            ? { title: h, icon: defaultHighlights[i % defaultHighlights.length].icon }
            : h
        )
      : defaultHighlights;

  // Basic Plan defaults
  const basicPlan = {
    name: course?.basicPlan?.name || "Standard",
    duration: course?.basicPlan?.duration || course?.duration || "3 Months",
    price: course?.basicPlan?.price || "₹30,000",
    features:
      course?.basicPlan?.features && course.basicPlan.features.length > 0
        ? course.basicPlan.features
        : [
            "Comprehensive curriculum & fundamentals",
            "Hands-on practical training",
            "Real-world capstone projects",
            "Industry certification & career guidance",
          ],
  };

  // Check if Advanced Plan exists and is active
  // If plansCount === 1 or advancedPlan is null/empty/hasNoPrice, treat as single-plan course
  const hasAdvancedPlan =
    course?.plansCount !== 1 &&
    course?.advancedPlan &&
    (Boolean(course.advancedPlan.name) || Boolean(course.advancedPlan.price) || Boolean(course.advancedPlan.duration)) &&
    Boolean(course.advancedPlan.price?.trim()) &&
    course.advancedPlan.price?.trim() !== "₹0" &&
    course.advancedPlan.price?.trim() !== "0";

  // Advanced Plan defaults (only populated if active)
  const advancedPlan = hasAdvancedPlan
    ? {
        name: course?.advancedPlan?.name || "Advanced",
        duration: course?.advancedPlan?.duration || "6 Months",
        price: course?.advancedPlan?.price || "₹60,000",
        features:
          course?.advancedPlan?.features && course.advancedPlan.features.length > 0
            ? course.advancedPlan.features
            : [
                "Advanced design & branding",
                "Social media & print design",
                "Real-world projects",
                "Portfolio development & career support",
              ],
      }
    : null;

  const courseImage = course?.imageUrl || "/images/course-students.png";
  const durationText = course?.duration || "3 & 6 Months";
  const modeText =
    course?.mode && !course.mode.toLowerCase().includes("online")
      ? course.mode
      : "Offline Classroom Training";
  const certificateText = course?.certificate || "Certificate Included";

  return (
    <Layout>
      <Helmet>
        <title>{course?.title ? `${course.title} | iZone Technologies` : "Course Details | iZone Technologies"}</title>
        <meta
          name="description"
          content={course?.description || "Explore professional training programs at iZone Technologies with real-world projects and placement support."}
        />
      </Helmet>

      {/* ── Subheader / Navigation breadcrumbs ── */}
      <div className="border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Courses</span>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{course?.title}</span>
          </div>
        </div>
      </div>

      {/* ── Main Hero Section (Full 100vw with Left Image starting from left 0) ── */}
      <section className="relative w-screen max-w-none left-1/2 -translate-x-1/2 overflow-hidden bg-background border-b border-border/40">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* ── Left Side: Full uncropped student graphic with transparent background (padding: 0) ── */}
          <div className="lg:col-span-5 relative w-full h-full self-stretch flex items-center justify-start overflow-visible p-0 m-0">
            <img
              src="/images/course-students.png"
              alt={course?.title || "iZone Technologies Students"}
              className="w-full max-w-[500px] lg:max-w-[560px] h-auto max-h-[540px] lg:max-h-[600px] object-contain object-left select-none drop-shadow-sm block m-0 p-0"
              onError={(e) => {
                if (!e.currentTarget.src.endsWith(".png")) {
                  e.currentTarget.src = "/images/course-students.png";
                }
              }}
            />
          </div>

          {/* ── Right Side: Course Content shifted slightly leftward ── */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-5 px-4 sm:px-6 lg:pl-0 lg:-ml-4 xl:-ml-8 lg:pr-8 xl:pr-14 py-6 lg:py-8">
            
            {/* 1. Category Tag / Badge */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#eaf8e2] text-[#2c7a26] dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/50 text-xs font-bold tracking-wider uppercase border border-[#c2e8b2] shadow-sm">
                {badgeText}
              </span>
            </div>

              {/* 2. Main Catchy Headline with Green Accent Underline */}
              <div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-[1.15] tracking-tight">
                  {headline.includes("into a Career") ? (
                    <>
                      Turn Creativity{" "}
                      <span className="text-[#207a2c] dark:text-emerald-400 relative inline-block">
                        into a Career.
                        <svg
                          className="absolute -bottom-2 left-0 w-full h-3 text-[#207a2c] dark:text-emerald-400"
                          viewBox="0 0 200 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 8C50 3 150 3 198 8"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <span className="text-foreground">
                      {headline}
                    </span>
                  )}
                </h1>
                {course?.description && (
                  <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
                    {course.description}
                  </p>
                )}
              </div>

              {/* 3. 4 Highlights Row (Icons + Description) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {highlights.slice(0, 4).map((h, idx) => (
                  <div
                    key={idx}
                    className="bg-card rounded-2xl p-3.5 border border-emerald-100 dark:border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-2.5 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#ecf9e5] dark:bg-emerald-950/60 border border-[#d2f0c2] dark:border-emerald-900/60 flex items-center justify-center text-[#2c7a26] dark:text-emerald-400 group-hover:scale-105 transition-transform">
                      {h.icon === "layers" && (!course?.highlights || course?.highlights?.length === 0) ? (
                        <div className="flex items-center gap-0.5 text-[10px] font-bold">
                          <span className="px-1 py-0.5 rounded bg-emerald-700 text-white">Ps</span>
                          <span className="px-1 py-0.5 rounded bg-emerald-600 text-white">Ai</span>
                        </div>
                      ) : (
                        renderCourseHighlightIcon(h.icon || "palette", "w-5 h-5")
                      )}
                    </div>
                    <p className="text-xs font-semibold text-foreground/90 leading-snug line-clamp-3">
                      {h.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* 4. Pricing / Plan Cards (1 Plan or 2 Plans) */}
              <div
                className={`grid gap-5 pt-1 ${
                  advancedPlan ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-xl"
                }`}
              >
                {/* Card 1: Basic / Standard Plan */}
                <div className="rounded-3xl border-2 border-[#b5e69e] dark:border-emerald-800/60 bg-[#f9fdf7] dark:bg-card/70 p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#8ad46b] transition-all relative overflow-hidden group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-2xl font-black text-foreground">
                          {basicPlan.name}
                        </h3>
                        {!advancedPlan && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                            Full Course
                          </span>
                        )}
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-[#207a2c] text-white text-xs font-bold tracking-wide shadow-sm">
                        {basicPlan.duration}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs md:text-sm text-foreground/80">
                      {basicPlan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-[#e3f6dc] dark:bg-emerald-950 text-[#207a2c] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#e2f3d8] dark:border-border/60 flex items-center justify-between">
                    <div>
                      <span className="font-display font-black text-2xl md:text-3xl text-foreground tracking-tight">
                        {basicPlan.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOpenEnroll(basicPlan.name)}
                      className="rounded-full bg-[#207a2c] hover:bg-[#186323] text-white text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 flex items-center gap-1.5 shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all"
                    >
                      <span>Enroll Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card 2: Advanced Plan (Rendered only if course has 2 plans) */}
                {advancedPlan && (
                  <div className="rounded-3xl border-2 border-[#b5e69e] dark:border-emerald-800/60 bg-[#f9fdf7] dark:bg-card/70 p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#8ad46b] transition-all relative overflow-hidden group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-2xl font-black text-foreground">
                          {advancedPlan.name}
                        </h3>
                        <span className="px-3.5 py-1 rounded-full bg-[#207a2c] text-white text-xs font-bold tracking-wide shadow-sm">
                          {advancedPlan.duration}
                        </span>
                      </div>

                      <ul className="space-y-2.5 text-xs md:text-sm text-foreground/80">
                        {advancedPlan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-[#e3f6dc] dark:bg-emerald-950 text-[#207a2c] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#e2f3d8] dark:border-border/60 flex items-center justify-between">
                      <div>
                        <span className="font-display font-black text-2xl md:text-3xl text-foreground tracking-tight">
                          {advancedPlan.price}
                        </span>
                      </div>
                      <button
                        onClick={() => handleOpenEnroll(advancedPlan.name)}
                        className="rounded-full bg-[#207a2c] hover:bg-[#186323] text-white text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 flex items-center gap-1.5 shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        {/* ── Bottom Feature Strip (Calendar, Online/Offline, Certificate) across full width ── */}
        <div className="w-full border-t border-[#d5f0c4] dark:border-emerald-900/60 bg-[#fbfdfa] dark:bg-card/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d5f0c4] dark:divide-emerald-900/60 text-center">
            <div className="py-2 px-4 flex items-center justify-center gap-3 text-foreground font-bold text-sm md:text-base">
              <div className="w-8 h-8 rounded-lg bg-[#eaf8e2] dark:bg-emerald-950 text-[#207a2c] dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <span>{durationText}</span>
            </div>

            <div className="py-2 px-4 flex items-center justify-center gap-3 text-foreground font-bold text-sm md:text-base">
              <div className="w-8 h-8 rounded-lg bg-[#eaf8e2] dark:bg-emerald-950 text-[#207a2c] dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Monitor className="w-4 h-4" />
              </div>
              <span>{modeText}</span>
            </div>

            <div className="py-2 px-4 flex items-center justify-center gap-3 text-foreground font-bold text-sm md:text-base">
              <div className="w-8 h-8 rounded-lg bg-[#eaf8e2] dark:bg-emerald-950 text-[#207a2c] dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <span>{certificateText}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Enrollment Application Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-card rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-border relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  Course Enrollment
                </span>
                <h2 className="font-display text-2xl font-black text-foreground mt-2">
                  Apply for {course?.title}
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                  Selected Plan: <strong className="text-primary">{selectedPlan}</strong> (
                  {advancedPlan && selectedPlan === advancedPlan.name
                    ? advancedPlan.duration
                    : basicPlan.duration}
                  )
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Application Submitted!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Thank you for applying. Our career counselor will contact you shortly with syllabus and schedule details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase mb-1">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rounded-xl border-border focus-visible:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase mb-1">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (emailError) setEmailError("");
                        }}
                        className={`rounded-xl border-border focus-visible:ring-primary ${
                          emailError ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                      />
                      {emailError && (
                        <p className="text-[11px] text-destructive mt-0.5">{emailError}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase mb-1">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value.replace(/[^\d+]/g, "").slice(0, 15),
                          })
                        }
                        className="rounded-xl border-border focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase mb-1">
                      {advancedPlan ? "Select Plan" : "Course Plan"}
                    </label>
                    <div className={`grid gap-3 ${advancedPlan ? "grid-cols-2" : "grid-cols-1"}`}>
                      <button
                        type="button"
                        onClick={() => setSelectedPlan(basicPlan.name)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedPlan === basicPlan.name || !advancedPlan
                            ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                            : "border-border hover:border-border/80"
                        }`}
                      >
                        <div className="font-bold text-sm text-foreground">{basicPlan.name}</div>
                        <div className="text-xs text-primary font-semibold">{basicPlan.price}</div>
                        <div className="text-[11px] text-muted-foreground">{basicPlan.duration}</div>
                      </button>

                      {advancedPlan && (
                        <button
                          type="button"
                          onClick={() => setSelectedPlan(advancedPlan.name)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedPlan === advancedPlan.name
                              ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                              : "border-border hover:border-border/80"
                          }`}
                        >
                          <div className="font-bold text-sm text-foreground">{advancedPlan.name}</div>
                          <div className="text-xs text-primary font-semibold">{advancedPlan.price}</div>
                          <div className="text-[11px] text-muted-foreground">{advancedPlan.duration}</div>
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase mb-1">
                      Questions or Notes (Optional)
                    </label>
                    <Textarea
                      placeholder="Any specific batch preference, timing, or queries..."
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="rounded-xl border-border focus-visible:ring-primary resize-none text-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full glow-border hover-glow text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Complete Enrollment Application</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

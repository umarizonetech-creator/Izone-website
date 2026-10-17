// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Clock, Code2, CheckCircle2, X, BookOpen, Filter, GraduationCap } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import Layout from '@/components/Layout';
// import PageHero from '@/components/PageHero';
// import { useAdmin } from '@/context/AdminContext';
// import { toast } from 'sonner';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
// };

// const onlyLetters = (e) => {
//   if (!/^[a-zA-Z\s]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key))
//     e.preventDefault();
// };

// const onlyDigits = (e) => {
//   if (!/^[0-9]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key))
//     e.preventDefault();
// };

// export default function Courses() {
//   const { courses = [], addCourseApplication, publicDataLoaded, ensureLoaded } = useAdmin();

//   useEffect(() => {
//     if (ensureLoaded) {
//       ensureLoaded("courses");
//     }
//   }, [ensureLoaded]);

//   const courseTitleFilters = ['All', ...Array.from(
//     new Set(courses.map((course) => course.title).filter(Boolean))
//   )];

//   const [activeFilter, setActiveFilter] = useState('All');
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [form, setForm] = useState({ fullName: '', email: '', mobile: '', message: '' });

//   const filtered = activeFilter === 'All'
//     ? courses
//     : courses.filter((course) => course.title === activeFilter);

//   const handleApply = (course) => {
//     setSelectedCourse(course);
//     setIsSubmitted(false);
//     setForm({ fullName: '', email: '', mobile: '', message: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await addCourseApplication({
//         name: form.fullName,
//         email: form.email,
//         phone: form.mobile,
//         message: form.message,
//         courseTitle: selectedCourse?.title || '',
//       });
//       setIsSubmitted(true);
//       toast.success('Application submitted successfully!');
//       setTimeout(() => {
//         setSelectedCourse(null);
//         setIsSubmitted(false);
//       }, 2200);
//     } catch {
//       toast.error('Submission failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Layout>
//       {/* Hero */}
//       <PageHero
//         badgeIcon={GraduationCap}
//         badgeText="Learn & Grow"
//         titleLine1="Our Training"
//         titleLine2="Courses"
//         description="Hands-on programs designed to build real-world skills. Pick a course and start your journey today."
//         floatingIcons={[GraduationCap, BookOpen, Code2, Clock]}
//       />

//       {/* Filter + Grid */}
//       <section className="section-padding !pt-4">
//         <div className="container-custom">

//           {/* Filter bar */}
//           {courseTitleFilters.length > 1 && (
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="mb-10 flex flex-wrap items-center justify-center gap-2"
//             >
//               <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
//               {courseTitleFilters.map((title) => (
//                 <button
//                   key={title}
//                   type="button"
//                   onClick={() => setActiveFilter(title)}
//                   className={`max-w-full rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
//                     activeFilter === title
//                       ? 'bg-primary text-white border-primary shadow-[0_4px_14px_rgba(22,163,74,0.3)]'
//                       : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
//                   }`}
//                 >
//                   {title}
//                 </button>
//               ))}
//             </motion.div>
//           )}

//           {/* Cards */}
//           {!publicDataLoaded ? (
//             <div className="text-center text-muted-foreground py-16">Loading courses...</div>
//           ) : filtered.length === 0 ? (
//             <div className="text-center text-muted-foreground py-16">
//               No courses available{activeFilter !== 'All' ? ` for "${activeFilter}"` : ''} at the moment.
//             </div>
//           ) : (
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             >
//               {filtered.map((course) => (
//                 <motion.div
//                   key={course.id}
//                   variants={itemVariants}
//                   className="glass-card hover-glow flex flex-col rounded-2xl overflow-hidden group"
//                 >
//                   {/* Card header accent */}
//                   <div className="h-1.5 bg-gradient-to-r from-primary to-emerald-400" />

//                   <div className="p-6 flex flex-col flex-1 gap-4">
//                     {/* Icon + title */}
//                     <div className="flex items-start gap-3">
//                       <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
//                         <BookOpen className="w-5 h-5 text-primary" />
//                       </div>
//                       <div className="min-w-0">
//                         <h3 className="font-display font-bold text-lg leading-tight">{course.title}</h3>
//                         {course.duration && (
//                           <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
//                             <Clock className="w-3 h-3" /> {course.duration}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Description */}
//                     {course.description && (
//                       <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
//                         {course.description}
//                       </p>
//                     )}

//                     {/* Tech stack */}
//                     {(course.techStack || []).length > 0 && (
//                       <div className="flex flex-wrap gap-1.5">
//                         {course.techStack.map((tech) => (
//                           <span
//                             key={tech}
//                             className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-medium"
//                           >
//                             <Code2 className="w-2.5 h-2.5" />
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {/* Apply button */}
//                     <div className="mt-auto pt-2">
//                       <Button
//                         className="w-full glow-border hover-glow rounded-xl"
//                         onClick={() => handleApply(course)}
//                       >
//                         Apply Now
//                       </Button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* Apply Modal */}
//       {selectedCourse && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
//           <div className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto hide-scrollbar rounded-3xl border border-primary/20 bg-background/95 p-6 shadow-2xl backdrop-blur-md">
//             <button
//               type="button"
//               aria-label="Close"
//               className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
//               onClick={() => setSelectedCourse(null)}
//             >
//               <X className="h-4 w-4" />
//             </button>

//             <div className="mb-6 pr-8">
//               <h2 className="text-2xl font-display font-bold">
//                 Apply for <span className="gradient-text">{selectedCourse.title}</span>
//               </h2>
//               {selectedCourse.duration && (
//                 <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
//                   <Clock className="w-3.5 h-3.5" /> {selectedCourse.duration}
//                 </p>
//               )}
//             </div>

//             {isSubmitted ? (
//               <div className="py-12 flex flex-col items-center text-center gap-4">
//                 <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
//                   <CheckCircle2 className="w-10 h-10 text-primary" />
//                 </div>
//                 <h3 className="text-2xl font-bold">Application Received!</h3>
//                 <p className="text-muted-foreground max-w-xs text-sm">
//                   Thank you! Our team will review your application and get back to you soon.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="space-y-1.5">
//                     <label className="text-sm font-medium">Full Name</label>
//                     <Input
//                       placeholder="Enter your name"
//                       required
//                       value={form.fullName}
//                       onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
//                       onKeyDown={onlyLetters}
//                       pattern="[A-Za-z\s]+"
//                       title="Name should contain only letters"
//                       className="bg-background/50 border-primary/10"
//                     />
//                   </div>
//                   <div className="space-y-1.5">
//                     <label className="text-sm font-medium">Email</label>
//                     <Input
//                       type="email"
//                       placeholder="Enter your email"
//                       required
//                       value={form.email}
//                       onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
//                       className="bg-background/50 border-primary/10"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1.5">
//                   <label className="text-sm font-medium">Mobile Number</label>
//                   <Input
//                     type="tel"
//                     placeholder="Enter 10-digit number"
//                     required
//                     pattern="[0-9]{10}"
//                     maxLength={10}
//                     title="Enter a valid 10-digit mobile number"
//                     value={form.mobile}
//                     onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
//                     onKeyDown={onlyDigits}
//                     className="bg-background/50 border-primary/10"
//                   />
//                 </div>

//                 <div className="space-y-1.5">
//                   <label className="text-sm font-medium">Message (optional)</label>
//                   <Textarea
//                     placeholder="Any questions or background info..."
//                     rows={3}
//                     value={form.message}
//                     onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
//                     className="bg-background/50 border-primary/10 resize-none"
//                   />
//                 </div>

//                 <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
//                   <Button type="button" variant="outline" onClick={() => setSelectedCourse(null)} disabled={isSubmitting} className="border-primary/20">
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={isSubmitting} className="glow-border hover-glow">
//                     {isSubmitting ? 'Submitting...' : 'Submit Application'}
//                   </Button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }



























import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  Code2,
  CheckCircle2,
  X,
  BookOpen,
  Filter,
  GraduationCap,
  ArrowRight,
  ArrowDown,
  Palette,
  Megaphone,
  Video,
  Layers,
  Terminal,
  Cpu,
  Globe,
  Binary,
  Atom,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getCourseSchema, getWebPageSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';
import { useAdmin } from '@/context/AdminContext';
import { getCourseUrl } from '@/utils/courseSlug';
import CourseOfferPriceDisplay, { isOfferValid, parseNumericPrice, formatRupees } from '@/components/CourseOfferPriceDisplay';
import { toast } from 'sonner';

const getCourseIcon = (course) => {
  const text = `${course?.title || ''} ${course?.slug || ''} ${course?.badge || ''}`.toLowerCase();
  
  if (text.includes('graphic') || text.includes('design') || text.includes('ui/ux')) {
    return Palette;
  }
  if (text.includes('marketing') || text.includes('digital') || text.includes('seo')) {
    return Megaphone;
  }
  if (text.includes('video') || text.includes('editing') || text.includes('premiere') || text.includes('animation')) {
    return Video;
  }
  if (text.includes('full stack') || text.includes('fullstack')) {
    return Layers;
  }
  if (text.includes('java') && !text.includes('script')) {
    return Terminal;
  }
  if (text.includes('python')) {
    return Terminal;
  }
  if (text.includes('dsa') || text.includes('algorithm') || text.includes('data structure')) {
    return Binary;
  }
  if (text.includes('react') || text.includes('frontend')) {
    return Atom;
  }
  return BookOpen;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const onlyLetters = (e) => {
  if (!/^[a-zA-Z\s]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key))
    e.preventDefault();
};

const onlyDigits = (e) => {
  if (!/^[0-9]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key))
    e.preventDefault();
};

// Allowed email domains — adjust this list if you want to allow any valid email instead
const ALLOWED_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

const isValidEmail = (email) => {
  const match = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})$/.exec((email || '').trim());
  if (!match) return false;
  return ALLOWED_EMAIL_DOMAINS.includes(match[1].toLowerCase());
};

export default function Courses() {
  const { courses = [], addCourseApplication, publicDataLoaded, ensureLoaded, universalOffer } = useAdmin();

  useEffect(() => {
    if (ensureLoaded) {
      ensureLoaded("courses");
    }
  }, [ensureLoaded]);

  const courseTitleFilters = ['All', ...Array.from(
    new Set(courses.map((course) => course.title).filter(Boolean))
  )];

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', message: '' });

  const filtered = activeFilter === 'All'
    ? courses
    : courses.filter((course) => course.title === activeFilter);

  const handleApply = (course) => {
    setSelectedCourse(course);
    setIsSubmitted(false);
    setEmailError('');
    setForm({ fullName: '', email: '', mobile: '', message: '' });
  };

  const handleEmailChange = (e) => {
    setForm((p) => ({ ...p, email: e.target.value }));
    if (emailError) setEmailError('');
  };

  const handleEmailBlur = () => {
    if (form.email && !isValidEmail(form.email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Explicit email validation — do not rely on the native pattern attribute alone
    if (!isValidEmail(form.email)) {
      setEmailError('Please enter a valid email address.');
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addCourseApplication({
        name: form.fullName,
        email: form.email,
        phone: form.mobile,
        message: form.message,
        courseTitle: selectedCourse?.title || '',
      });
      setIsSubmitted(true);
      toast.success('Application submitted successfully!');
      setEmailError('');
      setTimeout(() => {
        setSelectedCourse(null);
        setIsSubmitted(false);
      }, 2200);
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO
        path="/courses"
        title="IT Training & Certification Courses | iZone Technologies"
        description="iZone Technologies offers hands-on full-stack development, Python, mobile apps, UI/UX, and AI training courses in Trichy."
        keywords={["IT Training Institute in Trichy", "Software Training Trichy", "Full Stack Development Course Trichy", "Python Course Tiruchirappalli"]}
        schema={[
          getWebPageSchema({
            name: "IT Training & Certification Courses | iZone Technologies",
            description: "Hands-on IT training programs, software courses, and career certifications by iZone Technologies in Trichy.",
            url: "https://izonetech.in/courses"
          }),
          getCourseSchema(courses),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Courses", url: "/courses" }
          ])
        ]}
      />
      {/* Hero */}
      <PageHero
        badgeIcon={GraduationCap}
        badgeText="IT Training Institute in Trichy"
        titleLine1="IT Training Institute"
        titleLine2="in Trichy"
        description="Accelerate your tech career with practical, project-driven software development training and industry certifications."
        floatingIcons={[GraduationCap, BookOpen, Code2, Clock]}
      />

      {/* Filter + Grid */}
      <section className="section-padding !pt-4">
        <div className="container-custom">

          {/* Filter bar */}
          {courseTitleFilters.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10 flex flex-wrap items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {courseTitleFilters.map((title) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActiveFilter(title)}
                  className={`max-w-full rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                    activeFilter === title
                      ? 'bg-primary text-white border-primary shadow-[0_4px_14px_rgba(22,163,74,0.3)]'
                      : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {title}
                </button>
              ))}
            </motion.div>
          )}

          {/* Cards */}
          {!publicDataLoaded ? (
            <div className="text-center text-muted-foreground py-16">Loading courses...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              No courses available{activeFilter !== 'All' ? ` for "${activeFilter}"` : ''} at the moment.
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((course) => {
                const CourseIcon = getCourseIcon(course);
                const originalPrice = course.basicPlan?.price || course.basic_plan?.price || course.originalPrice;
                const offerActive = universalOffer && universalOffer.active !== undefined
                  ? universalOffer.active
                  : Boolean(course.offerActive ?? course.offer_active);
                const effectiveOffer = (universalOffer && universalOffer.active)
                  ? universalOffer
                  : {
                      active: offerActive,
                      discountPercent: course.discountPercent ?? course.discount_percent,
                      message: course.offerMessage ?? course.offer_message,
                      badge: course.offerBadge ?? course.offer_badge,
                      deadline: course.offerDeadline ?? course.offer_deadline,
                    };
                const hasValidOffer = isOfferValid(effectiveOffer);

                return (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    className="glass-card hover-glow flex flex-col rounded-2xl overflow-hidden group"
                  >
                    {/* Card header accent */}
                    <div className="h-1.5 bg-gradient-to-r from-primary to-emerald-400" />

                    <div className="p-6 flex flex-col flex-1 gap-4">
                      {/* Icon + title */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <CourseIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-lg leading-tight">{course.title}</h3>
                            {course.duration && (
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <Clock className="w-3 h-3" /> {course.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        {hasValidOffer && effectiveOffer.discountPercent > 0 && (
                          <span className="shrink-0 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                            {effectiveOffer.discountPercent}% OFF
                          </span>
                        )}
                      </div>

                    {/* Description */}
                    {course.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                    )}

                    {/* Tech stack */}
                    {(course.techStack || []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {course.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-medium"
                          >
                            <Code2 className="w-2.5 h-2.5" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price and Offer Section */}
                    {(hasValidOffer || originalPrice) && (
                      <div className="mt-auto pt-3 border-t border-border/40 flex flex-col gap-1">
                        {hasValidOffer ? (
                          <CourseOfferPriceDisplay
                            size="sm"
                            offerBadge={effectiveOffer.badge || "Special Offer"}
                            offerMessage={effectiveOffer.message || ""}
                            discountPercent={effectiveOffer.discountPercent}
                            originalPrice={originalPrice || "₹30,000"}
                            offerDeadline={effectiveOffer.deadline}
                            showDeadline={true}
                          />
                        ) : (
                          <div className="flex items-baseline gap-1.5 text-xs text-muted-foreground">
                            <span>Starting at</span>
                            <span className="text-sm font-bold text-foreground">{originalPrice}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-2 flex items-center gap-2">
                      <Link to={getCourseUrl(course)} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-primary/30 hover:border-primary hover:bg-primary/5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 h-10"
                        >
                          More Details <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        className="flex-1 glow-border hover-glow rounded-xl text-xs font-semibold h-10"
                        onClick={() => handleApply(course)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          )}
        </div>
      </section>

      {/* Apply Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto hide-scrollbar rounded-3xl border border-primary/20 bg-background/95 p-6 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
              onClick={() => setSelectedCourse(null)}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 pr-8">
              <h2 className="text-2xl font-display font-bold">
                Apply for <span className="gradient-text">{selectedCourse.title}</span>
              </h2>
              {selectedCourse.duration && (
                <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {selectedCourse.duration}
                </p>
              )}
            </div>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Application Received!</h3>
                <p className="text-muted-foreground max-w-xs text-sm">
                  Thank you! Our team will review your application and get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      placeholder="Enter your name"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                      onKeyDown={onlyLetters}
                      pattern="[A-Za-z\s]+"
                      title="Name should contain only letters"
                      className="bg-background/50 border-primary/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={form.email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                      pattern="^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$"
                      title="Enter a valid Gmail, Yahoo, Outlook, or Hotmail address"
                      className={`bg-background/50 border-primary/10 ${emailError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {emailError && (
                      <p className="text-xs text-destructive">{emailError}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    title="Enter a valid 10-digit mobile number"
                    value={form.mobile}
                    onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
                    onKeyDown={onlyDigits}
                    className="bg-background/50 border-primary/10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Message (optional)</label>
                  <Textarea
                    placeholder="Any questions or background info..."
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="bg-background/50 border-primary/10 resize-none"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={() => setSelectedCourse(null)} disabled={isSubmitting} className="border-primary/20">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="glow-border hover-glow">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Code2, CheckCircle2, X, BookOpen, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { useAdmin } from '@/context/AdminContext';
import { toast } from 'sonner';

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

export default function Courses() {
  const { courses = [], addCourseApplication, publicDataLoaded, ensureLoaded } = useAdmin();

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
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', message: '' });

  const filtered = activeFilter === 'All'
    ? courses
    : courses.filter((course) => course.title === activeFilter);

  const handleApply = (course) => {
    setSelectedCourse(course);
    setIsSubmitted(false);
    setForm({ fullName: '', email: '', mobile: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      {/* Hero */}
      <section className="portfolio-hero pt-8 sm:pt-12 md:pt-16 pb-0 md:pb-24 md:px-8 relative overflow-hidden md:min-h-screen lg:min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container-custom relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              Learn & Grow
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Training
              <span className="gradient-text block mt-1">Courses</span>
            </h1>
            <p className="text-lg text-muted-foreground px-3 md:px-0 text-center">
              Hands-on programs designed to build real-world skills. Pick a course and start your journey today.
            </p>
          </motion.div>
        </div>
      </section>

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
              {filtered.map((course) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  className="glass-card hover-glow flex flex-col rounded-2xl overflow-hidden group"
                >
                  {/* Card header accent */}
                  <div className="h-1.5 bg-gradient-to-r from-primary to-emerald-400" />

                  <div className="p-6 flex flex-col flex-1 gap-4">
                    {/* Icon + title */}
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-primary" />
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

                    {/* Apply button */}
                    <div className="mt-auto pt-2">
                      <Button
                        className="w-full glow-border hover-glow rounded-xl"
                        onClick={() => handleApply(course)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="bg-background/50 border-primary/10"
                    />
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

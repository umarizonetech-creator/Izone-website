import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Laptop, Globe, Users, Rocket, Clock, MapPin, Briefcase, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAdmin } from '@/context/AdminContext';

const benefits = [
  { icon: Heart, title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage for you and your family.' },
  { icon: Coffee, title: 'Free Snacks & Coffee', description: 'Fully stocked kitchen with premium coffee, snacks, and healthy options.' },
  { icon: Laptop, title: 'Latest Equipment', description: 'Top-of-the-line MacBooks, monitors, and any tools you need to succeed.' },
  { icon: Globe, title: 'Remote Flexibility', description: 'Work from anywhere with our hybrid remote-first culture.' },
  { icon: Users, title: 'Team Events', description: 'Regular team outings, hackathons, and company retreats.' },
  { icon: Rocket, title: 'Learning Budget', description: 'Annual budget for courses, conferences, and professional development.' },
];

const culture = [
  {
    title: 'Innovation First',
    description: 'We encourage experimentation and embrace new ideas. Every team member has the opportunity to contribute to our innovation pipeline.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
  },
  {
    title: 'Work-Life Balance',
    description: 'We believe in sustainable work practices. Flexible hours and unlimited PTO ensure you can recharge and bring your best self.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
  },
  {
    title: 'Growth Mindset',
    description: 'Continuous learning is in our DNA. We provide mentorship, training programs, and clear career progression paths.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
];

const normalizeJobOpening = (job) => ({
  ...job,
  title: job.roleName || job.title || 'Open Role',
  department: job.department || job.qualification || 'Technology',
  location: job.location || 'Location not specified',
  type: job.workTiming || job.type || 'Full-time',
  mode: job.workCulture || job.mode || '',
});

const JOBS_PER_PAGE = 10;

const getPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const filtered = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const output = [];
  let previous = 0;

  filtered.forEach((page) => {
    if (page - previous > 1) {
      output.push('...');
    }
    output.push(page);
    previous = page;
  });

  return output;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Career = () => {
  const { jobRoles = [], internRoles = [], addJobApplication, addInternApplication, publicDataLoaded, ensureLoaded } = useAdmin();

  useEffect(() => {
    if (ensureLoaded) {
      ensureLoaded("jobRoles");
      ensureLoaded("internRoles");
    }
  }, [ensureLoaded]);

  const visibleOpenings = jobRoles.map(normalizeJobOpening);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const internshipRoleOptions = internRoles
    .map((item) => item.roleName || item.title)
    .filter(Boolean);
  const durationOptions = ['3 Months', '6 Months', '9 Months', '12 Months'];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isInternOpen, setIsInternOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isInternSubmitting, setIsInternSubmitting] = useState(false);
  const [isInternSubmitted, setIsInternSubmitted] = useState(false);
  const [agreedToInternTerms, setAgreedToInternTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    qualification: '',
    experience: '',
    resume: null,
    resumeName: '',
  });
  const [internFormData, setInternFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    qualification: '',
    skills: '',
    role: '',
    duration: '',
    message: '',
    resume: null,
    resumeName: '',
  });

  const totalJobPages = Math.max(1, Math.ceil(visibleOpenings.length / JOBS_PER_PAGE));
  const safePage = Math.min(Math.max(1, currentJobPage), totalJobPages);
  const currentOpenings = visibleOpenings.slice((safePage - 1) * JOBS_PER_PAGE, safePage * JOBS_PER_PAGE);

  useEffect(() => {
    if (!publicDataLoaded) return;
    setCurrentJobPage((page) => Math.min(Math.max(1, page), totalJobPages));
  }, [publicDataLoaded, totalJobPages]);

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsSubmitted(false);
    setAgreedToTerms(false);
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInternApply = (internship) => {
    setSelectedInternship(internship);
    setInternFormData((prev) => ({
      ...prev,
      role: internship?.roleName || internship?.title || '',
      duration: durationOptions.includes(internship?.duration) ? internship.duration : '',
    }));
    setIsInternSubmitted(false);
    setAgreedToInternTerms(false);
    setIsInternOpen(true);
  };

  const handleInternInputChange = (e) => {
    const { id, value } = e.target;
    setInternFormData((prev) => ({ ...prev, [id]: value }));
  };

  const onlyLetters = (e) => {
    if (!/^[a-zA-Z\s]$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key))
      e.preventDefault();
  };

  const onlyDigits = (e) => {
    if (!/^[0-9]$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key))
      e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        resume: reader.result,
        resumeName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      address: '',
      qualification: '',
      experience: '',
      resume: null,
      resumeName: '',
    });
    setAgreedToTerms(false);
  };

  const resetInternForm = () => {
    setInternFormData({
      fullName: '',
      email: '',
      mobile: '',
      address: '',
      qualification: '',
      skills: '',
      role: '',
      duration: '',
      message: '',
      resume: null,
      resumeName: '',
    });
    setAgreedToInternTerms(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addJobApplication({
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        address: formData.address,
        location: formData.address,
        qualification: formData.qualification,
        experience: formData.experience,
        resume: formData.resume || '',
        resumeName: formData.resumeName,
        jobRole: selectedJob?.title || selectedJob?.roleName || 'General Application',
      });

      setIsSubmitted(true);
      toast.success('Application submitted successfully!');

      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        resetForm();
      }, 2000);
    } catch (error) {
      console.error('Job application submission failed', error);
      toast.error('Application not submitted. Please check the backend connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInternSubmit = async (e) => {
    e.preventDefault();
    setIsInternSubmitting(true);

    try {
      await addInternApplication({
        name: internFormData.fullName,
        email: internFormData.email,
        phone: internFormData.mobile,
        role: internFormData.role || 'Internship Application',
        address: internFormData.address,
        qualification: internFormData.qualification,
        skills: internFormData.skills,
        duration: internFormData.duration,
        message: internFormData.message,
        resume: internFormData.resume || '',
        resumeName: internFormData.resumeName,
      });

      setIsInternSubmitted(true);
      toast.success('Internship application submitted successfully!');

      setTimeout(() => {
        setIsInternOpen(false);
        setIsInternSubmitted(false);
        resetInternForm();
      }, 2000);
    } catch (error) {
      console.error('Internship application submission failed', error);
      toast.error('Internship application not submitted. Please check the backend connection and try again.');
    } finally {
      setIsInternSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        badgeIcon={Briefcase}
        badgeText="Join Our Team"
        titleLine1="Build Your Career"
        titleLine2="With Us"
        description="Join a team of passionate innovators shaping the future of web development. We're always looking for talented individuals to grow with us."
        floatingIcons={[Briefcase, Rocket, Users, Globe]}
        actions={[
          { label: 'View Openings', href: '#open-positions' },
          {
            label: 'Apply for Internship',
            variant: 'outline',
            onClick: () => {
              setSelectedInternship({ title: 'General Internship', duration: 'Flexible' });
              setIsInternSubmitted(false);
              setAgreedToInternTerms(false);
              setIsInternOpen(true);
            },
          },
        ]}
      />

      {/* Company Culture */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-medium">Our Culture</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">What Makes Us Different</h2>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {culture.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="glass-card overflow-hidden hover-glow group">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm text-justify">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-medium">Benefits & Perks</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">We Take Care of Our Team</h2>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants} className="glass-card p-6 hover-glow flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Open Positions */}
      <section id="open-positions" className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-medium">Open Positions</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Current Openings</h2>
          </motion.div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {!publicDataLoaded ? (
              <div className="text-center text-muted-foreground p-8">Loading openings...</div>
            ) : visibleOpenings.length === 0 ? (
              <div className="text-center text-muted-foreground p-8">No job openings available at the moment.</div>
            ) : (
              currentOpenings.map((job, index) => (
                <motion.div key={job.id || job.title || index} variants={itemVariants} className="glass-card p-6 hover-glow flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                      {job.mode && <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {job.mode}</span>}
                    </div>
                  </div>
                  <Button className="glow-border hover-glow shrink-0" onClick={() => handleApply(job)}>Apply Now</Button>
                </motion.div>
              ))
            )}
          </div>

          {publicDataLoaded && visibleOpenings.length > JOBS_PER_PAGE && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-border"
                  onClick={() => setCurrentJobPage((page) => Math.max(1, page - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers(safePage, totalJobPages).map((page, index) =>
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={page}
                      type="button"
                      variant={safePage === page ? "default" : "outline"}
                      className={`h-9 w-9 rounded-full p-0 ${
                        safePage === page ? 'shadow-md' : 'border-border'
                      }`}
                      onClick={() => setCurrentJobPage(page)}
                      aria-label={`Page ${page}`}
                      aria-current={safePage === page ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-border"
                  onClick={() => setCurrentJobPage((page) => Math.min(totalJobPages, page + 1))}
                  disabled={safePage === totalJobPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Showing {(safePage - 1) * JOBS_PER_PAGE + 1}–{Math.min(safePage * JOBS_PER_PAGE, visibleOpenings.length)} of {visibleOpenings.length}
              </p>
            </div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
            <div className="text-center max-w-4xl mx-auto glass-card p-12 md:p-16 border-primary/20 hover-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              <span className="text-primary font-medium mb-4 inline-block">Internship Program</span>
              <h3 className="font-display text-3xl md:text-5xl font-bold mb-6">Start Your Journey With Us</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                We offer internship opportunities for students and fresh graduates. Gain real-world experience
                working alongside our expert team.
              </p>
              <Button
                size="lg"
                className="rounded-full px-10 py-7 text-lg shadow-xl hover:scale-105 transition-all duration-300 glow-border hover-glow"
                onClick={() => {
                  setSelectedInternship({ title: 'General Internship', duration: 'Flexible' });
                  setIsInternSubmitted(false);
                  setAgreedToInternTerms(false);
                  setIsInternOpen(true);
                }}
              >
                Apply for Internship
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto hide-scrollbar rounded-3xl border border-primary/20 bg-background/95 p-6 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              aria-label="Close application form"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 pr-10">
              <h2 className="text-2xl font-display font-bold">
                Apply for <span className="gradient-text">{selectedJob?.title || selectedJob?.roleName}</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Please fill out the form below to submit your application.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Application Received!</h3>
                <p className="text-muted-foreground max-w-xs">
                  Thank you for your interest. Our team will review your application and get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 py-2">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                    <Input id="fullName" placeholder="Enter Your Name" required className="bg-background/50 border-primary/10" value={formData.fullName} onChange={handleInputChange} onKeyDown={onlyLetters} pattern="[A-Za-z\s]+" title="Name should contain only letters" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email ID</label>
                    <Input id="email" type="email" placeholder="Enter Your Email" required className="bg-background/50 border-primary/10" value={formData.email} onChange={handleInputChange} pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" title="Enter a valid email address" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="mobile" className="text-sm font-medium">Mobile Number</label>
                    <Input id="mobile" type="tel" placeholder="Enter 10-Digit number" required pattern="[0-9]{10}" maxLength={10} title="Enter a valid 10-digit mobile number" className="bg-background/50 border-primary/10" value={formData.mobile} onChange={handleInputChange} onKeyDown={onlyDigits} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">Role</label>
                    <Input id="role" value={selectedJob?.title || selectedJob?.roleName || ''} readOnly className="bg-muted/50 border-primary/10 cursor-not-allowed" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">Address</label>
                  <Textarea id="address" placeholder="Your residential address" className="bg-background/50 border-primary/10 min-h-[80px]" value={formData.address} onChange={handleInputChange} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="qualification" className="text-sm font-medium">Qualification</label>
                    <Input id="qualification" placeholder="e.g. B.Tech Computer Science" required className="bg-background/50 border-primary/10" value={formData.qualification} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">Experience</label>
                    <Input
                      id="experience"
                      list="career-experience-options"
                      placeholder="e.g. 2 Years, Fresher"
                      required
                      className="bg-background/50 border-primary/10"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                    <datalist id="career-experience-options">
                      <option value="Fresher" />
                      <option value="1 Year" />
                      <option value="2 Years" />
                      <option value="3 Years" />
                      <option value="4 Years" />
                      <option value="5 Years" />
                      <option value="More than 5 Years" />
                    </datalist>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="resume" className="text-sm font-medium">Upload Resume</label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className="bg-background/50 border-primary/10"
                  />
                  <p className="text-xs text-muted-foreground italic">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(event) => setAgreedToTerms(event.target.checked)}
                    required
                    className="h-4 w-4 rounded border-primary/30"
                  />
                  <label htmlFor="terms" className="text-sm font-normal leading-none">
                    I agree to the <span className="text-primary hover:underline cursor-pointer">Terms and Conditions</span> and privacy policy.
                  </label>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting} className="border-primary/20">
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

      {isInternOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto hide-scrollbar rounded-3xl border border-primary/20 bg-background/95 p-6 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              aria-label="Close internship application form"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
              onClick={() => setIsInternOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 pr-10">
              <h2 className="text-2xl font-display font-bold">
                Apply for <span className="gradient-text">{selectedInternship?.title}</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Share your details to apply for this internship program and our team will review your profile.
              </p>
            </div>

            {isInternSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Application Received!</h3>
                <p className="text-muted-foreground max-w-xs">
                  Thank you for applying. Our team will review your internship application and contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInternSubmit} className="space-y-6 py-2">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="internFullName" className="text-sm font-medium">Full Name</label>
                    <Input id="internFullName" placeholder="Enter Your Name" required className="bg-background/50 border-primary/10" value={internFormData.fullName} onChange={(e) => setInternFormData((prev) => ({ ...prev, fullName: e.target.value }))} onKeyDown={onlyLetters} pattern="[A-Za-z\s]+" title="Name should contain only letters" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="internEmail" className="text-sm font-medium">Email ID</label>
                    <Input id="internEmail" type="email" placeholder="Enter Your Email" required className="bg-background/50 border-primary/10" value={internFormData.email} onChange={(e) => setInternFormData((prev) => ({ ...prev, email: e.target.value }))} pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" title="Enter a valid email address" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="internMobile" className="text-sm font-medium">Mobile Number</label>
                    <Input id="internMobile" type="tel" placeholder="Enter 10-Digit number" required pattern="[0-9]{10}" maxLength={10} title="Enter a valid 10-digit mobile number" className="bg-background/50 border-primary/10" value={internFormData.mobile} onChange={(e) => setInternFormData((prev) => ({ ...prev, mobile: e.target.value }))} onKeyDown={onlyDigits} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="internRole" className="text-sm font-medium">Internship Role</label>
                    <select
                      id="internRole"
                      required
                      className="flex h-10 w-full rounded-md border border-primary/10 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={internFormData.role}
                      onChange={(e) => setInternFormData((prev) => ({ ...prev, role: e.target.value }))}
                    >
                      <option value="">Select internship role</option>
                      {internshipRoleOptions.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="qualification" className="text-sm font-medium">Qualification</label>
                    <Input id="qualification" placeholder="e.g. B.Tech / BCA" required className="bg-background/50 border-primary/10" value={internFormData.qualification} onChange={(e) => setInternFormData((prev) => ({ ...prev, qualification: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="internDuration" className="text-sm font-medium">Preferred Duration</label>
                    <select
                      id="internDuration"
                      required
                      className="flex h-10 w-full rounded-md border border-primary/10 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={internFormData.duration}
                      onChange={(e) => setInternFormData((prev) => ({ ...prev, duration: e.target.value }))}
                    >
                      <option value="">Select preferred duration</option>
                      {durationOptions.map((duration) => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="internAddress" className="text-sm font-medium">Address</label>
                  <Textarea id="internAddress" placeholder="Your residential address" className="bg-background/50 border-primary/10 min-h-[80px]" value={internFormData.address} onChange={(e) => setInternFormData((prev) => ({ ...prev, address: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="internSkills" className="text-sm font-medium">Skills</label>
                  <Input id="internSkills" placeholder="e.g. React, UI Design, etc." required className="bg-background/50 border-primary/10" value={internFormData.skills} onChange={(e) => setInternFormData((prev) => ({ ...prev, skills: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="internMessage" className="text-sm font-medium">Message</label>
                  <Textarea id="internMessage" placeholder="Tell us why you want to join" className="bg-background/50 border-primary/10 min-h-[100px]" value={internFormData.message} onChange={(e) => setInternFormData((prev) => ({ ...prev, message: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="internResume" className="text-sm font-medium">Upload Resume</label>
                  <Input
                    id="internResume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="bg-background/50 border-primary/10"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setInternFormData((prev) => ({
                            ...prev,
                            resume: reader.result,
                            resumeName: file.name,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground italic">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="internTerms"
                    type="checkbox"
                    checked={agreedToInternTerms}
                    onChange={(event) => setAgreedToInternTerms(event.target.checked)}
                    required
                    className="h-4 w-4 rounded border-primary/30"
                  />
                  <label htmlFor="internTerms" className="text-sm font-normal leading-none">
                    I agree to the <span className="text-primary hover:underline cursor-pointer">Terms and Conditions</span> and internship policy.
                  </label>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsInternOpen(false)} disabled={isInternSubmitting} className="border-primary/20">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isInternSubmitting} className="glow-border hover-glow">
                    {isInternSubmitting ? 'Submitting...' : 'Submit Internship Application'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Career;
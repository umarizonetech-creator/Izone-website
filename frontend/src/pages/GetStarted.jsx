import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Code,
  Palette,
  Smartphone,
  Globe,
  MessageSquare,
  Zap,
  BrainCircuit,
  PenTool,
  Building2,
  Cloud,
  MessageCircle,
  Vote,
  Search,
  Share2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import HeroParagraph from '@/components/ui/HeroParagraph';

import { useAdmin } from '@/context/AdminContext';

const services = [
  { id: 'web', icon: Globe, label: 'Web Development' },
  { id: 'app', icon: Smartphone, label: 'App Development' },
  { id: 'software', icon: Code, label: 'Software Development' },
  { id: 'design', icon: Palette, label: 'Graphics & UI/UX Design' },
  { id: 'marketing', icon: Share2, label: 'Digital Marketing & Social Media' },
  { id: 'content', icon: PenTool, label: 'Content Writing' },
  { id: 'govt', icon: Building2, label: 'Government Digital Solutions' },
  { id: 'aiml', icon: BrainCircuit, label: 'AI & ML Solutions' },
  { id: 'cloud', icon: Cloud, label: 'Cloud & DevOps' },
  { id: 'sms', icon: Zap, label: 'Bulk & Voice SMS' },
  { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp Panel & Marketing' },
  { id: 'campaign', icon: Vote, label: 'Digital Election Campaign' },
  { id: 'seo', icon: Search, label: 'SEO & SMO Optimization' },
];

const subServiceOptions = {
  web: [
    'Static Website',
    'E-commerce Store',
    'Custom Web Application',
    'Landing Page',
    'Blog / Portfolio',
  ],
  app: [
    'iOS Application',
    'Android Application',
    'Cross-Platform App (Flutter/React Native)',
    'Progressive Web App (PWA)',
  ],
  software: [
    'ERP / CRM Solutions',
    'Inventory Management',
    'Custom Billing Software',
    'Enterprise Software (.NET/Java/Python)',
  ],
  design: [
    'Logo & Branding',
    'UI/UX Design & Prototyping',
    'Graphic Design & Banners',
    'Social Media Assets',
  ],
  marketing: [
    'Social Media Marketing (SMM)',
    'Brand Strategy',
    'Pay-Per-Click (PPC) Ads',
    'Lead Generation',
  ],
  content: [
    'Website Content Writing',
    'Blog Posts & Articles',
    'Copywriting & Ad Copy',
    'Technical & Proposal Writing',
  ],
  govt: [
    'Government Tender Bidding',
    'Proposal Writing & Documentation',
    'Compliance Management',
    'Digital Portal Solutions',
  ],
  aiml: [
    'AI Chatbot Development',
    'Machine Learning Models',
    'Natural Language Processing',
    'Computer Vision Solutions',
    'Predictive Analytics',
    'AI Integration & Automation',
  ],
  cloud: [
    'AWS / Azure / GCP Migration',
    'CI/CD Pipeline Setup',
    'Docker & Kubernetes Containerization',
    'Cloud Security & Monitoring',
  ],
  sms: [
    'Bulk SMS (Promotional & Transactional)',
    'Voice SMS & Automated Calls',
    'SMS API Integration',
    'Sender ID Setup',
  ],
  whatsapp: [
    'WhatsApp Bulk Messaging Panel',
    'WhatsApp API & Marketing',
    'Interactive WhatsApp Chatbots',
    'Rich Media Campaign Management',
  ],
  campaign: [
    'Digital Election Strategy',
    'Targeted Voter Outreach',
    'Social Media Campaign Management',
    'Mass Broadcast & Audio Alerts',
  ],
  seo: [
    'On-Page & Off-Page SEO',
    'Technical SEO Audit',
    'Social Media Optimization (SMO)',
    'Keyword Ranking & Analytics',
  ],
};

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

const GetStarted = () => {
  const { toast } = useToast();
  const { addServiceRequest } = useAdmin();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedServices: [],
    subServices: [],
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDetails: '',
  });

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedServices[0] === serviceId;
      return {
        ...prev,
        selectedServices: isSelected ? [] : [serviceId],
        subServices: [],
      };
    });
  };

  const handleSubServiceToggle = (subService) => {
    setFormData((prev) => {
      const isSelected = prev.subServices[0] === subService;
      return {
        ...prev,
        subServices: isSelected ? [] : [subService],
      };
    });
  };

  const onlyLetters = (e) => {
    if (!/^[a-zA-Z\s]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key))
      e.preventDefault();
  };

  const onlyDigits = (e) => {
    if (!/^[0-9]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key))
      e.preventDefault();
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test((email || '').trim());
  };

  const isValidPhone = (phone) => {
    if (!phone) return true;
    return /^[0-9]{10}$/.test(phone.trim());
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formData.name || formData.name.trim().length < 2) {
      toast({
        title: 'Invalid Name',
        description: 'Please enter a valid full name (letters only).',
        variant: 'destructive',
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: 'Invalid Email Address',
        description: 'Please enter a valid email address (e.g. user@example.com).',
        variant: 'destructive',
      });
      return;
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit mobile number.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.projectDetails || !formData.projectDetails.trim()) {
      toast({
        title: 'Project Details Required',
        description: 'Please enter your project details before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addServiceRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectDetails: formData.projectDetails,
        services: formData.selectedServices.join(', '),
        subServices: formData.subServices.join(', '),
      });
      toast({
        title: 'Request Submitted!',
        description:
          'Our team will contact you within 24 hours to discuss your project.',
      });

      setStep(1);
      setFormData({
        selectedServices: [],
        subServices: [],
        name: '',
        email: '',
        phone: '',
        company: '',
        projectDetails: '',
      });
    } catch (error) {
      console.error('Service request submission failed', error);
      toast({
        title: 'Request not submitted',
        description: 'Please check the backend connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = formData.selectedServices.length > 0;
  const canProceedStep2 = formData.subServices.length > 0;
  const canSubmit =
    formData.name && formData.email && formData.projectDetails;

  return (
    <Layout>
      {/* Hero & Multi-step Section */}
      <section className="pt-20 sm:pt-24 pb-6 px-4 md:px-8 relative overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container-custom relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl mx-auto mb-3"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
              Start Your Journey
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Let's Build Something <span className="gradient-text">Extraordinary</span>
            </h1>
            <p className="text-muted-foreground text-xs mt-1 max-w-md mx-auto">
              Tell us about your project and we'll help you bring your vision to life.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-2 mb-4 w-full">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-10 sm:w-14 h-1 mx-1 rounded transition-all ${
                      step > s ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="w-full max-w-3xl mx-auto">
            {/* Step 1: Select Services */}
            {step === 1 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <motion.div variants={itemVariants} className="text-center mb-3">
                  <h2 className="font-display text-base sm:text-lg font-bold mb-0.5">
                    What services do you need?
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    Select the service that fits your project
                  </p>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5 mb-4"
                >
                  {services.map((service) => {
                    const isSelected = formData.selectedServices.includes(service.id);
                    return (
                      <motion.div
                        key={service.id}
                        variants={itemVariants}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`relative glass-card p-2.5 sm:p-3 cursor-pointer transition-all duration-200 hover:scale-[1.03] flex flex-col items-center justify-center text-center rounded-xl border min-h-[76px] select-none ${
                          isSelected
                            ? 'border-2 border-primary bg-primary/20 shadow-md ring-2 ring-primary/30 text-primary font-bold'
                            : 'border-border/60 hover:border-primary/50 text-foreground'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                        <service.icon
                          className={`w-5 h-5 mb-1 shrink-0 transition-transform duration-200 ${
                            isSelected
                              ? 'text-primary scale-110'
                              : 'text-muted-foreground'
                          }`}
                        />
                        <span className={`text-[11px] sm:text-xs leading-tight line-clamp-2 ${isSelected ? 'font-bold text-primary' : 'font-semibold text-foreground'}`}>{service.label}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end">
                  <Button
                    size="default"
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="glow-border hover-glow px-6 text-xs h-9 font-semibold"
                  >
                    Continue
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Specific Service Selection */}
            {step === 2 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <motion.div variants={itemVariants} className="text-center mb-3">
                  <h2 className="font-display text-lg sm:text-xl font-bold mb-0.5">
                    Service Details
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    Which specific solutions are you interested in?
                  </p>
                </motion.div>

                <div className="space-y-4 mb-4">
                  {formData.selectedServices.map((serviceId) => {
                    const parentService = services.find(s => s.id === serviceId);
                    const options = subServiceOptions[serviceId] || [];
                    
                    if (options.length === 0) return null;

                    return (
                      <motion.div key={serviceId} variants={itemVariants}>
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                             <parentService.icon className="w-3.5 h-3.5 text-primary" />
                           </div>
                           <h3 className="font-display font-semibold text-sm">{parentService.label}</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                          {options.map((option) => {
                            const description = {
                              'Static Website': 'Simple, fast loading informational website',
                              'E-commerce Store': 'Sell products online with secure payment integration',
                              'Custom Web Application': 'Fully dynamic and scalable web solution',
                              'Landing Page': 'High-converting page for marketing campaigns',
                              'Blog / Portfolio': 'Showcase your work or publish content',
                              'ERP / CRM Solutions': 'Manage resources and customer relationships effectively.',
                              'Inventory Management': 'Real-time tracking of stock and supply chain.',
                              'Custom Billing Software': 'Automate invoicing and financial monitoring.',
                              'Enterprise Software': 'Complex, scalable systems for large-scale operations.',
                              'iOS Application': 'Native performance for the Apple ecosystem.',
                              'Android Application': 'Native apps optimized for the Google Play Store.',
                              'Cross-Platform App': 'Unified codebase for both iOS and Android platforms.',
                              'Progressive Web App (PWA)': 'Web-based apps that work offline and feel native.',
                              'Logo & Branding': 'Create a unique identity and visual brand message.',
                              'UI/UX Design': 'User-centric interface and experience crafted for engagement.',
                              'Graphic Design': 'Creative visual communication for digital and print.',
                              'Social Media Assets': 'Dynamic content tailored for social platform success.',
                              'Social Media Marketing': 'Engage your target audience across social channels.',
                              'SEO Optimization': 'Enhance visibility and rank higher on search engines.',
                              'Pay-Per-Click (PPC)': 'Targeted advertising for rapid lead generation.',
                              'Content Strategy': 'Strategic planning and high-value content creation.',
                              'Bulk SMS (Promotional)': 'Reach thousands of users instantly via mobile.',
                              'Transactional SMS': 'Automated notifications and OTP services.',
                              'WhatsApp Marketing': 'Direct, effective engagement on top messaging platforms.',
                              'Digital Election Campaign': 'Voter outreach and strategic awareness programs.',
                              'AI Chatbot Development': 'Intelligent conversational bots powered by AI for 24/7 support.',
                              'Machine Learning Models': 'Custom ML models trained on your data for accurate predictions.',
                              'Natural Language Processing': 'Text analysis, sentiment detection, and language understanding.',
                              'Computer Vision Solutions': 'Image recognition, object detection, and visual AI systems.',
                              'Predictive Analytics': 'Data-driven forecasting to guide smarter business decisions.',
                              'AI Integration & Automation': 'Seamlessly embed AI into your existing workflows and systems.',
                            }[option] || 'Professional and scalable digital solutions tailored for your business.';

                            const isSelected = formData.subServices.includes(option);

                            return (
                              <motion.div
                              key={option}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleSubServiceToggle(option)}
                                className={`relative glass-card p-3 cursor-pointer flex flex-col transition-all duration-200 rounded-xl border w-full select-none ${
                                  isSelected
                                    ? 'border-2 border-primary bg-primary/15 shadow-md ring-2 ring-primary/30'
                                    : 'border-border/60 hover:border-primary/40'
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                )}
                                <div className="flex justify-between items-start mb-1 pr-5">
                                  <h4 className={`font-bold text-xs transition-colors ${
                                    isSelected ? 'text-primary' : ''
                                  }`}>
                                    {option}
                                  </h4>
                                </div>
                                <p className="text-muted-foreground text-[11px] leading-tight line-clamp-2">
                                  {description}
                                </p>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div variants={itemVariants} className="get-started-actions flex justify-between gap-3">
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="h-9 px-5 text-xs font-semibold"
                  >
                    Back
                  </Button>
                  <Button
                    size="default"
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2}
                    className="glow-border hover-glow px-6 text-xs h-9 font-semibold"
                  >
                    Continue
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <motion.div variants={itemVariants} className="text-center mb-3">
                  <h2 className="font-display text-lg sm:text-xl font-bold mb-0.5">
                    Tell us about yourself
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    We'll use this information to get in touch with you
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-card p-4 md:p-5 mb-4 rounded-xl border">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onKeyDown={onlyLetters}
                        pattern="[A-Za-z\s]+"
                        title="Name should contain only letters"
                        required
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                        title="Enter a valid email address"
                        required
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter Your Phone Number"
                        value={formData.phone}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        title="Enter a valid 10-digit phone number"
                        onKeyDown={onlyDigits}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company Name
                      </label>
                      <Input
                        placeholder="Enter Your Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      rows={5}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectDetails: e.target.value }))}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="get-started-actions flex justify-between gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="glow-border hover-glow"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Why Work With Us?
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Quick Response',
                description: 'We respond to all inquiries within 24 hours and provide detailed project proposals.',
              },
              {
                title: 'Transparent Pricing',
                description: 'No hidden costs. We provide detailed quotes with clear breakdown of all expenses.',
              },
              {
                title: 'Dedicated Support',
                description: 'Get a dedicated project manager and 24/7 support throughout your project journey.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default GetStarted;

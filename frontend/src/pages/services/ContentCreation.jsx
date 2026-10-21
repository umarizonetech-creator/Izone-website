import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Clapperboard,
  Sparkles,
  Camera,
  Film,
  Mic,
  Palette,
  Layers,
  ArrowRight,
  Check,
  Zap,
  Play,
  Share2,
  SlidersHorizontal,
  ChevronDown,
  Clock,
  TrendingUp,
  Target,
  Award,
  Radio,
  FileText,
  MonitorPlay,
  HeartHandshake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const coreServices = [
  {
    icon: Clapperboard,
    title: 'Commercial & Brand Video Production',
    description:
      'High-definition corporate films, founder origin stories, product launch videos, and brand commercials shot with cinema-grade cameras.',
    badge: 'Cinema 4K',
    features: [
      'Corporate & Brand Identity Films',
      'Product Demos & Unboxing Shoots',
      'Customer Testimonials & Case Stories',
      'Cinema 4K Multi-Camera Setups',
      'Professional Lighting & Sound Engineering',
    ],
  },
  {
    icon: Video,
    title: 'Viral Social Reels & Vertical Shorts',
    description:
      'Attention-grabbing 9:16 vertical videos crafted specifically for Instagram Reels, YouTube Shorts, and TikTok to drive explosive reach.',
    badge: 'Trending Formats',
    features: [
      'High-Retention 3-Second Hooks',
      'Dynamic Kinetic Subtitles & Captions',
      'Trending Audio & Sound Design',
      'Platform Algorithm Optimization',
      'Batch Content Shooting Days',
    ],
  },
  {
    icon: Layers,
    title: 'Motion Graphics & 2D/3D Animation',
    description:
      'Mesmerizing visual animations, kinetic typography, 3D product renders, and animated explainer videos that simplify complex concepts.',
    badge: 'Visual FX',
    features: [
      'Animated Explainer & SaaS Videos',
      'Custom 2D/3D Motion Graphics',
      'Logo Stings & Intro/Outro Ident',
      'Product 3D Renders & Visualizations',
      'Interactive UI Walkthrough Animations',
    ],
  },
  {
    icon: Mic,
    title: 'Studio Podcasting & Audio Production',
    description:
      'End-to-end podcast production from broadcast microphone recording and noise cancellation to video snippets and distribution.',
    badge: 'Audio & Video',
    features: [
      'Multi-Mic Studio Audio Capture',
      'Noise Filtering & Sound Mastering',
      'Video Podcast Multi-Angle Switching',
      'Viral Clip Extraction for Socials',
      'Intro/Outro Scoring & Jingle Design',
    ],
  },
  {
    icon: Palette,
    title: 'Graphic Design & Creative Ad Visuals',
    description:
      'Scroll-stopping visual assets for digital ad campaigns, social media carousels, infographics, and cohesive brand design kits.',
    badge: 'Brand Design',
    features: [
      'High-CTR Meta & Google Ad Banners',
      'Educational Instagram Carousel Sets',
      'Digital Infographics & Data Visuals',
      'Brand Style Guides & Visual Assets',
      'Custom Illustrations & Thumbnail Art',
    ],
  },
  {
    icon: FileText,
    title: 'Direct-Response Scriptwriting & Copy',
    description:
      'Persuasive storytelling that hooks attention and compels viewers to take immediate action, from short-form scripts to sales webinars.',
    badge: 'Storytelling',
    features: [
      'Video Ad Scriptwriting & Direct Response',
      'Engaging Storyboard Concept Creation',
      'High-Converting Social Media Captions',
      'Founder Thought-Leadership Content',
      'Call-To-Action (CTA) Frameworks',
    ],
  },
];

const productionWorkflow = [
  {
    step: '01',
    title: 'Creative Brief & Concepting',
    description:
      'We analyze your audience, clarify campaign goals, and brainstorm creative angles, viral hooks, and mood boards.',
  },
  {
    step: '02',
    title: 'Scripting & Storyboarding',
    description:
      'Our copywriters construct scene-by-scene scripts with precise visual cues, psychological triggers, and strong CTAs.',
  },
  {
    step: '03',
    title: 'Production & Filming',
    description:
      'Filming with 4K cinema gear, drone aerials, professional studio lighting, and crystal-clear directional audio.',
  },
  {
    step: '04',
    title: 'Post-Production & Editing',
    description:
      'Seamless cut assembly, color grading, sound design, sound effects (SFX), animated graphics, and pace tuning.',
  },
  {
    step: '05',
    title: 'Multi-Format Packaging',
    description:
      'Exporting optimized aspect ratios (9:16 vertical, 16:9 widescreen, 1:1 square) with burned-in subtitles for every platform.',
  },
  {
    step: '06',
    title: 'Review, Launch & Growth',
    description:
      'Final collaborative polish, performance tracking, and iterating new creative variations based on engagement metrics.',
  },
];

const capabilities = [
  {
    icon: MonitorPlay,
    title: 'Cross-Platform Mastery',
    description: 'Customized creative specs tailored for Instagram, YouTube, LinkedIn, Meta Ads, and TikTok.',
  },
  {
    icon: Camera,
    title: '4K Cinema Gear & Drones',
    description: 'High-end mirrorless and cinema systems with ultra-sharp prime lenses and aerial drone cinematography.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Studio Lighting & Acoustics',
    description: 'Broadcast-grade light panels, softboxes, lavalier mics, and treated audio environments.',
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Turnarounds',
    description: 'Rapid post-production workflows delivering social reels in 48 to 72 hours for high-pace brands.',
  },
];

const faqs = [
  {
    question: 'What types of content creation does iZone Technologies handle?',
    answer:
      'We provide end-to-end creative solutions including commercial brand films, social media reels/shorts, podcast audio and video production, motion graphics, 2D/3D animation, digital ad visuals, and high-converting scriptwriting.',
  },
  {
    question: 'Can you write the scripts and create ideas for our brand?',
    answer:
      'Yes, absolutely! Our creative team conducts deep audience research to brainstorm trending concepts, craft attention-grabbing hooks, and write complete scene-by-scene scripts tailored to your brand voice.',
  },
  {
    question: 'What video formats and resolutions do you deliver?',
    answer:
      'We deliver in cinema 4K and Ultra-HD across all standard aspect ratios: 9:16 for vertical reels/shorts/stories, 16:9 for YouTube and web hero displays, and 1:1 for social feeds and carousel ads. All videos include SRT subtitle files and burned-in captions.',
  },
  {
    question: 'How fast is the turnaround time for social media reels?',
    answer:
      'For ongoing social media and reels packages, edited drafts are typically delivered within 48 to 72 hours following the shoot. Full-scale commercial brand videos and 3D animations generally require 1 to 2 weeks depending on scope.',
  },
  {
    question: 'Do you offer monthly retainer packages for consistent content?',
    answer:
      'Yes! We offer monthly content retainer packages where our team handles regular shooting days, batch editing, reel production, and ongoing creative refreshes so your business maintains consistent daily/weekly visibility.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

const ContentCreation = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <Layout>
      <SEO
        path="/services/content-creation"
        title="Content Creation & Video Production Services | iZone Technologies"
        description="Elevate your brand with iZone Technologies: Commercial Video Production, Viral Social Media Reels, Motion Graphics, Studio Podcasts, and Brand Storytelling in Trichy."
        keywords={[
          'Content Creation Services Trichy',
          'Video Production Company Tiruchirappalli',
          'Social Media Reels Creation',
          'Commercial Video Agency Tamil Nadu',
          'Motion Graphics Studio',
          'Podcast Production Trichy',
          'Brand Storytelling Agency',
        ]}
        schema={[
          getServiceSchema({
            name: 'Content Creation Services',
            serviceType: 'Media & Content Production',
            description:
              'Comprehensive content creation services including commercial video production, social reels, motion graphics, podcast recording, and visual ad creatives by iZone Technologies.',
            url: 'https://izonetech.in/services/content-creation',
          }),
          getBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Content Creation', url: '/services/content-creation' },
          ]),
        ]}
      />

      {/* Hero Section */}
      <PageHero
        badgeIcon={Video}
        badgeText="Creative Media & Content Studio in Trichy"
        titleLine1="High-Impact"
        titleLine2="Content Creation"
        description="Captivate your audience, spark organic viral reach, and convert viewers into loyal customers with cinema-grade video production, viral social reels, motion graphics, and strategic brand storytelling."
        floatingIcons={[Video, Clapperboard, Sparkles, Camera]}
        actions={[
          { label: 'Start Your Creative Project', icon: ArrowRight, to: '/get-started' },
          { label: 'Explore Our Portfolio', icon: Sparkles, to: '/portfolio', variant: 'outline' },
        ]}
        stats={[
          { value: '10M+', label: 'Organic Views Delivered' },
          { value: '500+', label: 'Videos & Creatives Produced' },
          { value: '99.4%', label: 'Client Satisfaction Rate' },
          { value: '4K UHD', label: 'Cinema Production Quality' },
        ]}
      />

      {/* Core Services Grid */}
      <section id="services-grid" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
              Our Creative Capabilities
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Content Engineered to Stop the Scroll
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              From cinematic brand films to fast-paced viral reels, we blend artistic visual storytelling with
              direct-response conversion strategy to help your brand dominate its industry.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card p-8 hover-glow group relative flex flex-col justify-between border border-border/80 hover:border-primary/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="h-px bg-border/60 my-4" />

                    <ul className="space-y-2.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      to="/get-started"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Production Workflow Section */}
      <section className="section-padding bg-card/40 border-y border-border/60">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
              Our Proven Production Framework
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              From Initial Concept to Viral Release
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              A frictionless 6-step content pipeline designed to take the stress off your team while producing
              consistently exceptional creative results.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {productionWorkflow.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-7 hover-glow relative overflow-hidden group border border-border/70"
              >
                <div className="absolute top-3 right-4 text-6xl font-display font-extrabold text-primary/10 select-none group-hover:text-primary/20 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-2.5 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Equipment & Capabilities Showcase */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card glow-border p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
                  Why iZone Technologies
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Where Cinema Craft Meets Digital Growth
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  Most production houses make pretty videos that don't convert, while standard marketing agencies post
                  low-quality visuals that fail to build authority.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                  At iZone Technologies, we combine top-tier cinematography, advanced color science, dynamic motion
                  design, and battle-tested direct-response frameworks to ensure every piece of content generates real
                  business ROI.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/get-started">
                    <Button size="lg" className="glow-border hover-glow">
                      Book a Production Session
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="border-border">
                      Talk With Our Director
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {capabilities.map((cap, idx) => {
                  const CapIcon = cap.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-background/60 border border-border/80 backdrop-blur-md hover:border-primary/40 transition-colors"
                    >
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                        <CapIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-base mb-1.5 text-foreground">{cap.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{cap.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-3">
              Everything You Need to Know
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Common questions about our filming process, packages, turnaround times, and delivery formats.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card border border-border/80 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left text-foreground font-display font-semibold text-base sm:text-lg hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/40 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-10 sm:p-14 md:p-16 text-center relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                Let's Tell Your Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Create Content That Captivates?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
                Partner with our creative production team in Trichy to produce brand films, viral reels, and motion
                visuals that elevate your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/get-started" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto glow-border hover-glow px-8">
                    Get Free Creative Proposal
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-border">
                    Schedule a Discovery Call
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

export default ContentCreation;

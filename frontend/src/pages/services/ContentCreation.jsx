import { motion } from 'framer-motion';
import {
  Share2,
  Printer,
  Video,
  Bot,
  Film,
  PenTool,
  Clapperboard,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Phone,
  Layers,
  Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const creativeServices = [
  {
    number: '01',
    id: 'social-media',
    title: 'Social Media Creative Designs',
    icon: Share2,
    tag: 'Social & Digital',
    description:
      'High-impact, scroll-stopping social media visual assets tailored for brand awareness, audience engagement, and product launches.',
    items: [
      'Professional Social Media Posters',
      'Promotional & Offer Creatives',
      'Festival & Seasonal Designs',
      'Brand Awareness Campaign Creatives',
      'Product Launch Posters',
      'Carousel Posts & Infographics',
    ],
  },
  {
    number: '02',
    id: 'graphic-print',
    title: 'Graphic Design & Print Media',
    icon: Printer,
    tag: 'Print & Corporate',
    description:
      'High-resolution offline print marketing collateral and corporate publication designs crafted to make a lasting physical impression.',
    items: [
      'Flyers & Leaflets',
      'Corporate Brochures',
      'Company Profiles',
      'Product Catalogues',
      'Business Cards & Stationery',
      'Posters, Banners & Standee Designs',
      'Menu Cards & Promotional Materials',
    ],
  },
  {
    number: '03',
    id: 'reels-video',
    title: 'Reels Production & Video Editing',
    icon: Video,
    tag: 'Video & Short-Form',
    description:
      'Cinematic vertical videos, on-location brand footage, and viral-style editing optimized for maximum retention and organic reach.',
    items: [
      'Instagram Reels & YouTube Shorts',
      'On-Location Video Shoots',
      'Product & Brand Shoots',
      'Business Promotional Reels',
      'Cinematic Video Editing',
      'Interview & Testimonial Videos',
      'Trending & Viral-Style Reels',
    ],
  },
  {
    number: '04',
    id: 'ai-content',
    title: 'AI-Powered Content Creation',
    icon: Bot,
    tag: 'Next-Gen Media',
    description:
      'Cutting-edge generative AI workflows to create futuristic advertisements, synthetic avatar presenters, and rapid concept visualizations.',
    items: [
      'AI-Generated Reels',
      'AI Product Advertisement Videos',
      'AI Visuals & Creative Images',
      'AI Avatar & Presenter Videos',
      'AI Storytelling Videos',
      'AI-Assisted Product Visualizations',
    ],
  },
  {
    number: '05',
    id: 'motion-graphics',
    title: 'Motion Graphics & Animation',
    icon: Film,
    tag: 'Animation & VFX',
    description:
      'Mesmerizing 2D and 3D visual animations, kinetic typography, and animated explainer graphics that bring complex ideas vividly to life.',
    items: [
      '2D & 3D Motion Graphics',
      'Animated Logo Reveals',
      'Kinetic Typography Videos',
      'Explainer Animations',
      'Animated Social Media Ads',
      'Infographic Motion Videos',
      'Brand Intro & Outro Animations',
    ],
  },
  {
    number: '06',
    id: 'logo-branding',
    title: 'Logo Design & Brand Identity',
    icon: PenTool,
    tag: 'Identity & Guidelines',
    description:
      'Distinctive visual identities, typography guidelines, and brand design systems built to foster deep credibility and recognition.',
    items: [
      'Professional Logo Design',
      'Brand Identity Development',
      'Logo Redesign & Modernization',
      'Brand Colour & Typography Systems',
      'Business Stationery Design',
      'Brand Guidelines',
      'Visual Brand Consistency',
    ],
  },
  {
    number: '07',
    id: 'video-ads',
    title: 'Video Advertisement & Commercials',
    icon: Clapperboard,
    tag: 'Commercials & Ads',
    description:
      'Broadcast-quality television and digital video commercials that showcase your products, engage buyers, and drive conversions.',
    items: [
      'Product Advertisement Videos',
      'Corporate Promotional Videos',
      'Brand Commercials',
      'TV-Style Advertising Videos',
      'Real Estate Promotional Videos',
      'Customer Testimonial Ads',
      'Social Media Video Ads',
    ],
  },
  {
    number: '08',
    id: 'campaign-creatives',
    title: 'Digital Campaign Creatives',
    icon: Megaphone,
    tag: 'Campaign Strategy',
    description:
      'End-to-end creative campaign architectures, lead gen ad creatives, and structured content calendars that scale marketing ROI.',
    items: [
      'Ad Campaign Creatives',
      'Lead Generation Ad Designs',
      'Campaign-Specific Reels',
      'Content Calendar Planning',
      'Brand Storytelling',
      'Marketing Campaign Visuals',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const ContentCreation = () => {
  return (
    <Layout>
      <SEO
        path="/services/content-creation"
        title="Content Creation & Creative Services | iZone Technologies"
        description="Comprehensive Content Creation & Creative Services: Social Media Designs, Graphic & Print Media, Reels Production, AI-Powered Content, Motion Graphics, Brand Identity, Video Ads, and Campaign Creatives by iZone Technologies."
        keywords={[
          'Content Creation & Creative Services',
          'Social Media Creative Designs',
          'Graphic Design & Print Media',
          'Reels Production & Video Editing',
          'AI-Powered Content Creation',
          'Motion Graphics & Animation',
          'Logo Design & Brand Identity',
          'Video Advertisement & Commercials',
          'Digital Campaign Creatives',
          'Creative Agency Trichy',
        ]}
        schema={[
          getServiceSchema({
            name: 'Content Creation & Creative Services',
            serviceType: 'Creative Media & Content Production',
            description:
              'Full-suite creative agency services including social media creatives, print media, reels production, AI content creation, motion graphics, brand identity, video commercials, and digital campaign designs by iZone Technologies.',
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
        badgeIcon={Sparkles}
        badgeText="Content Creation & Creative Services"
        titleLine1="Content Creation &"
        titleLine2="Creative Services"
        description="Power your brand with our 8 specialized creative pillars — from viral reels and social media designs to print media, AI-powered visuals, motion animations, and cinematic advertising commercials."
        floatingIcons={[Share2, Video, Bot, Palette]}
        actions={[
          { label: 'Get Started with Your Project', icon: ArrowRight, to: '/get-started' },
          { label: 'Contact Our Creative Team', icon: Phone, to: '/contact', variant: 'outline' },
        ]}
        stats={[
          { value: '8', label: 'Specialized Creative Disciplines' },
          { value: '100%', label: 'Custom Brand Tailored' },
          { value: '4K/UHD', label: 'Cinema & Print Resolution' },
          { value: '24-48h', label: 'Fast Turnaround Delivery' },
        ]}
      />

      {/* Navigation Quick Jump Bar */}
      <section className="py-4 border-y border-border/60 bg-card/30 backdrop-blur-sm sticky top-[72px] z-40 hidden md:block">
        <div className="container-custom">
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-1 no-scrollbar">
            {creativeServices.map((service) => {
              const Icon = service.icon;
              return (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors whitespace-nowrap"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span>{service.title.split('&')[0].trim()}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section with All 8 Creative Pillars */}
      <section id="creative-services" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
              Our 8 Creative Pillars
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Comprehensive Creative Solutions
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Explore our full suite of content creation and creative services tailored to help your brand stand out,
              captivate audiences, and drive measurable business results.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-stretch"
          >
            {creativeServices.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.number}
                  id={service.id}
                  variants={itemVariants}
                  className="glass-card p-7 sm:p-8 hover-glow group relative flex flex-col justify-between border border-border/80 hover:border-primary/50 transition-all duration-300 rounded-2xl scroll-mt-28"
                >
                  <div>
                    {/* Header: Number Badge, Icon, Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                          <Icon className="w-7 h-7" />
                        </div>
                        <span className="font-display font-extrabold text-3xl sm:text-4xl text-primary/30 group-hover:text-primary/50 transition-colors">
                          {service.number}
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="h-px bg-border/60 my-5" />

                    {/* Exact Checklist Items */}
                    <ul className="space-y-3 mb-6">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="font-medium leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-4 border-t border-border/50 mt-6">
                    <Link
                      to="/get-started"
                      className="inline-flex items-center justify-between w-full text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/btn"
                    >
                      <span>Request {service.title}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-10 sm:p-14 md:p-16 text-center relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-primary/15 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                Start Your Creative Journey
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Elevate Your Brand's Creative Presence?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
                Whether you need viral reels, high-converting ad creatives, a corporate brand identity, or AI-powered
                video content — our creative specialists in Trichy are ready to build it.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/get-started" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto glow-border hover-glow px-8">
                    Get Started with Your Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-border">
                    Schedule a Consultation
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

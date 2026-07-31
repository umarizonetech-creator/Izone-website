import { motion } from 'framer-motion';
import { Code, Palette, Settings, Headphones, ArrowRight, Check, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const services = [
  {
    icon: Code,
    title: 'Custom Web Development',
    description: 'Tailored web applications built from the ground up using modern frameworks and best practices.',
    features: ['React & Next.js', 'TypeScript', 'Node.js Backend', 'REST & GraphQL APIs', 'Database Design'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed with your users in mind for maximum engagement.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Accessibility'],
  },
  {
    icon: Settings,
    title: 'Technical Consulting',
    description: 'Expert guidance on architecture, technology stack, and development strategy.',
    features: ['Architecture Review', 'Code Audits', 'Performance Optimization', 'Security Assessment', 'Scalability Planning'],
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'Continuous maintenance, updates, and support to keep your application running smoothly.',
    features: ['24/7 Monitoring', 'Bug Fixes', 'Feature Updates', 'Performance Tuning', 'Security Patches'],
  },
];

const process = [
  { step: '01', title: 'Discovery', description: 'We dive deep into understanding your business, goals, and requirements.' },
  { step: '02', title: 'Planning', description: 'Creating detailed roadmaps, wireframes, and technical specifications.' },
  { step: '03', title: 'Design', description: 'Crafting beautiful, user-centric interfaces that align with your brand.' },
  { step: '04', title: 'Development', description: 'Building robust, scalable applications using cutting-edge technologies.' },
  { step: '05', title: 'Testing', description: 'Rigorous quality assurance to ensure flawless functionality.' },
  { step: '06', title: 'Launch & Support', description: 'Seamless deployment and ongoing maintenance for lasting success.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const WebDevelopmentVisual = () => (
  <motion.div
    initial={{ opacity: 0, x: 34, scale: 0.96 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    className="relative mx-auto h-[340px] w-full max-w-[34rem] sm:h-[430px] lg:h-[520px] lg:max-w-[44rem]"
    aria-label="Responsive website portfolio mockups"
  >
    <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute right-4 top-0 h-64 w-64 rounded-full bg-primary/15 sm:h-80 sm:w-80 lg:h-[28rem] lg:w-[28rem]" />
    <div className="absolute left-2 top-4 h-4 w-4 rounded-full border-2 border-primary/60" />
    <div className="absolute -left-2 bottom-14 h-3 w-3 rounded-full bg-primary/70" />

    <motion.div
      animate={{ y: [0, -8, 0], rotate: [-11, -10, -11] }}
      transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[7%] top-[4%] z-10 h-[42%] w-[42%] overflow-hidden rounded-[1.15rem] border border-white/40 bg-[#0c1631] shadow-[0_22px_50px_rgba(15,23,42,0.28)]"
    >
      <img src="/hero/top-left-mockup.png" alt="Dark website mockup" className="h-full w-full object-cover" />
    </motion.div>

    <motion.div
      animate={{ y: [0, -7, 0], rotate: [10, 11, 10] }}
      transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      className="absolute right-[4%] top-[9%] z-10 h-[43%] w-[40%] overflow-hidden rounded-[1.15rem] border border-white/50 bg-white shadow-[0_22px_48px_rgba(15,23,42,0.2)]"
    >
      <img src="/hero/top-right-mockup.png" alt="Consulting website mockup" className="h-full w-full object-cover" />
    </motion.div>

    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut", delay: 0.05 }}
      className="absolute left-1/2 top-[14%] z-30 h-[62%] w-[39%] -translate-x-1/2 overflow-hidden rounded-[1.25rem] border border-white/60 bg-white shadow-[0_30px_70px_rgba(15,23,42,0.28)]"
    >
      <img src="/hero/center-card.png" alt="Loonira studio project card" className="h-full w-full object-cover" />
    </motion.div>

    <motion.div
      animate={{ y: [0, 7, 0], rotate: [10, 11, 10] }}
      transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
      className="absolute bottom-[5%] left-[2%] z-20 h-[39%] w-[42%] overflow-hidden rounded-[1.15rem] border border-white/50 bg-white shadow-[0_20px_44px_rgba(15,23,42,0.2)]"
    >
      <img src="/hero/bottom-left-mockup.png" alt="Creative digital solution mockup" className="h-full w-full object-cover" />
    </motion.div>

    <motion.div
      animate={{ y: [0, 6, 0], rotate: [-10, -11, -10] }}
      transition={{ duration: 8.9, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
      className="absolute bottom-[10%] right-[3%] z-20 h-[36%] w-[38%] overflow-hidden rounded-[1.15rem] border border-white/50 bg-white shadow-[0_20px_44px_rgba(15,23,42,0.2)]"
    >
      <img src="/hero/bottom-right-mockup.png" alt="Award designer website mockup" className="h-full w-full object-cover" />
    </motion.div>
  </motion.div>
);

const WebDevelopment = () => {
  return (
    <Layout>
      <SEO
        path="/development/web-development"
        title="Web Development Company in Trichy"
        description="Izone Technologies is a premier Web Development Company in Trichy, creating fast, responsive websites, e-commerce stores, and custom React/Next.js web applications."
        keywords={["Web Development Company in Trichy", "Web Design Trichy", "Website Development Tiruchirappalli", "React Developer Trichy"]}
        schema={[
          getServiceSchema({
            name: "Web Development Company in Trichy",
            serviceType: "Web Development",
            description: "Leading Web Development Company in Trichy delivering custom, high-performance websites and web applications.",
            url: "https://izonetech.in/development/web-development"
          }),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Development", url: "/development" },
            { name: "Web Development", url: "/development/web-development" }
          ])
        ]}
      />
      {/* Hero Section */}
      <PageHero
        badgeIcon={Globe2}
        badgeText="Web Development Company in Trichy"
        titleLine1="Web Development"
        titleLine2="Company in Trichy"
        description="As a top Web Development Company in Trichy, we build responsive, high-converting, and SEO-optimized websites engineered to grow your business."
        floatingIcons={[Code, Palette, Settings, Headphones]}
        actions={[{ label: 'Get Started', icon: ArrowRight, to: '/get-started' }]}
      />

      {/* Services Grid */}
      <section id="services" className="section-padding">
        <div className="container-custom">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants} className="glass-card p-8 hover-glow group">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-medium">Our Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">How We Work</h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="glass-card p-6 hover-glow relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-display font-bold text-primary/10">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card glow-border p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's discuss how we can bring your vision to life with our expert web development services.
              </p>
              <Link to="/get-started">
                <Button size="lg" className="glow-border hover-glow">
                  Get a Free Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WebDevelopment;

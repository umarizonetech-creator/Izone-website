import { motion } from 'framer-motion';
import { Settings, Shield, Cpu, Terminal, ArrowRight, Check, Database, Headphones, BarChart3, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const services = [
  {
    icon: Settings,
    title: 'Technology Architecture Consulting',
    description: 'Expert guidance on evaluating tech stacks, cloud migration roadmaps, microservices architecture, and legacy code modernization.',
    features: ['Tech Stack Evaluation', 'Cloud Migration Strategy', 'Microservices Architecture', 'Legacy Modernization'],
  },
  {
    icon: Shield,
    title: 'IT Infrastructure & Security Audits',
    description: 'Comprehensive vulnerability assessments, penetration testing, compliance verification, and server security hardening.',
    features: ['Cybersecurity Audits', 'Compliance & GDPR/ISO Verification', 'Server Hardening', 'Data Protection Strategy'],
  },
  {
    icon: Cpu,
    title: 'Digital Transformation Strategy',
    description: 'Helping enterprises and SMEs in Trichy digitize offline business operations, automate workflows, and boost productivity.',
    features: ['Workflow Automation', 'Enterprise System Integration', 'Cloud Strategy', 'Process Optimization'],
  },
  {
    icon: BarChart3,
    title: 'Performance & Scalability Tuning',
    description: 'Identifying system bottlenecks, optimizing database queries, tuning server loads, and ensuring high-availability uptime.',
    features: ['Database Query Optimization', 'Load Balancing Strategy', 'Core Web Vitals Tuning', 'High-Availability Design'],
  },
];

const process = [
  { step: '01', title: 'IT Assessment', description: 'Comprehensive audit of your current software architecture, infrastructure, and pain points.' },
  { step: '02', title: 'Gap Analysis', description: 'Identifying performance bottlenecks, security risks, and growth obstacles.' },
  { step: '03', title: 'Strategic Roadmap', description: 'Creating a step-by-step technology upgrade plan with timelines and ROI estimates.' },
  { step: '04', title: 'Architecture Guidance', description: 'Designing clean system blueprints, API schemas, and cloud deployment pipelines.' },
  { step: '05', title: 'Implementation Support', description: 'Hands-on engineering support and code reviews alongside your team.' },
  { step: '06', title: 'Review & Monitoring', description: 'Ongoing technical reviews, performance benchmarking, and continuous advisory.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const ITConsulting = () => {
  return (
    <Layout>
      <SEO
        path="/services/it-consulting"
        title="IT Consulting & Technology | iZone Technologies"
        description="iZone Technologies provides top IT Consulting Services in Trichy. Technology architecture, cloud strategy, digital transformation, and security audits."
        keywords={["IT Consulting Services in Trichy", "IT Consulting Trichy", "Technology Advisory Tiruchirappalli", "Digital Transformation Consulting Tamil Nadu"]}
        schema={[
          getServiceSchema({
            name: "IT Consulting Services",
            serviceType: "IT Consulting Services",
            description: "Technology architecture consulting, infrastructure security audits, and digital transformation by iZone Technologies.",
            url: "https://izonetech.in/services/it-consulting"
          }),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "IT Consulting", url: "/services/it-consulting" }
          ])
        ]}
      />
      <PageHero
        badgeIcon={Settings}
        badgeText="IT Consulting Services in Trichy"
        titleLine1="IT Consulting Services"
        titleLine2="in Trichy"
        description="Strategic IT consulting to modernize your technology infrastructure, secure digital assets, and scale software systems efficiently."
        floatingIcons={[Settings, Shield, Cpu, Terminal]}
        actions={[{ label: 'Book Advisory Session', icon: ArrowRight, to: '/contact' }]}
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
            <span className="text-primary font-medium">Advisory Methodology</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Our IT Consulting Framework</h2>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Transform Your Business Infrastructure</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Consult with Trichy's leading technology architects to build resilient, high-growth software systems.
              </p>
              <Link to="/contact">
                <Button size="lg" className="glow-border hover-glow">
                  Schedule IT Consultation
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

export default ITConsulting;

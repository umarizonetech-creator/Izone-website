import { motion } from 'framer-motion';
import { Code2, Layers, Cpu, Database, ArrowRight, Check, LayoutGrid, Terminal, Cloud, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const services = [
  {
    icon: Code2,
    title: 'Custom React & Next.js Apps',
    description: 'High-performance dynamic web applications built with modern frontend frameworks for seamless user experience.',
    features: ['React & Next.js SSR/SSG', 'TypeScript Architecture', 'State Management (Redux/Zustand)', 'Responsive UI Design'],
  },
  {
    icon: Layers,
    title: 'SaaS Platform Development',
    description: 'Scalable cloud software-as-a-service solutions with multi-tenancy, subscription billing, and user roles.',
    features: ['Multi-Tenant Architecture', 'Stripe/Razorpay Billing', 'User Management & Auth', 'Role-Based Access Control'],
  },
  {
    icon: Database,
    title: 'Enterprise Portals & Dashboards',
    description: 'Data-rich administrative dashboards, analytics portals, and internal business tools designed for efficiency.',
    features: ['Real-Time Analytics', 'Interactive Charts & Tables', 'Data Import/Export', 'Audit Logging & Security'],
  },
  {
    icon: Cpu,
    title: 'API & Microservices Architecture',
    description: 'Robust RESTful and GraphQL API backends that connect your web applications with cloud ecosystems.',
    features: ['RESTful & GraphQL APIs', 'Microservices Architecture', 'Third-Party Integrations', 'High Concurrency & Speed'],
  },
];

const process = [
  { step: '01', title: 'Discovery & Scope', description: 'We analyze your complex web application requirements and map user workflows.' },
  { step: '02', title: 'Architecture Design', description: 'Designing database schemas, API contracts, and scalable cloud infrastructure.' },
  { step: '03', title: 'UI/UX Prototyping', description: 'Building interactive wireframes and design systems optimized for productivity.' },
  { step: '04', title: 'Agile Development', description: 'Iterative sprint releases with clean code, testing, and continuous feedback.' },
  { step: '05', title: 'QA & Security Audit', description: 'Comprehensive load testing, vulnerability scans, and browser compatibility checks.' },
  { step: '06', title: 'Deployment & Scaling', description: 'CI/CD deployment to cloud servers with automated scaling and zero-downtime releases.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const WebApplicationDevelopment = () => {
  return (
    <Layout>
      <SEO
        path="/development/web-application-development"
        title="Web Application Development | iZone Technologies"
        description="iZone Technologies builds custom Web Applications, SaaS platforms, and enterprise portals in Trichy using React, Next.js, and Node.js."
        keywords={["Web Application Development Trichy", "SaaS Development Company Trichy", "React Developers Tiruchirappalli", "Custom Web App Tamil Nadu"]}
        schema={[
          getServiceSchema({
            name: "Web Application Development Services",
            serviceType: "Web Application Development",
            description: "Custom web app engineering, SaaS platforms, and enterprise dashboard development by iZone Technologies.",
            url: "https://izonetech.in/development/web-application-development"
          }),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Development", url: "/development" },
            { name: "Web Application Development", url: "/development/web-application-development" }
          ])
        ]}
      />
      <PageHero
        badgeIcon={Code2}
        badgeText="Web Application Development"
        titleLine1="Custom Web Application"
        titleLine2="Development in Trichy"
        description="Engineered for performance, security, and enterprise scalability. We turn complex business workflows into fast, modern web applications."
        floatingIcons={[Terminal, Layers, Cloud, Shield]}
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
            <span className="text-primary font-medium">Engineering Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">How We Build Web Apps</h2>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Build Your Next Web Application</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Ready to transform your vision into a high-performance web app? Let's discuss your application architecture.
              </p>
              <Link to="/get-started">
                <Button size="lg" className="glow-border hover-glow">
                  Get Started
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

export default WebApplicationDevelopment;

import { motion } from 'framer-motion';
import { Headphones, ShieldCheck, Clock, Server, ArrowRight, Check, RefreshCw, Zap, Lock, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const services = [
  {
    icon: Clock,
    title: '24/7 Uptime & Server Monitoring',
    description: 'Round-the-clock automated monitoring ensuring 99.9% website uptime, instant failure alerts, and server health tracking.',
    features: ['Continuous Uptime Tracking', 'Instant Failover & Alerts', 'SSL Certificate Renewal', 'Server Performance Metrics'],
  },
  {
    icon: ShieldCheck,
    title: 'Security Audits & Malware Removal',
    description: 'Proactive vulnerability patching, web application firewall (WAF) management, malware scanning, and emergency hack recovery.',
    features: ['Daily Malware Scans', 'WAF & Firewall Rules', 'WordPress/Framework Patching', 'Malware Cleanup & Recovery'],
  },
  {
    icon: HardDrive,
    title: 'Automated Cloud Backups',
    description: 'Scheduled daily and weekly offsite cloud backups to Amazon S3/Google Cloud with single-click disaster recovery.',
    features: ['Daily Automated Backups', 'Encrypted Offsite Storage', '1-Click Full System Restore', 'Database & Asset Backups'],
  },
  {
    icon: RefreshCw,
    title: 'Speed Tuning & Content Updates',
    description: 'Core Web Vitals optimization, database cleanup, regular software updates, and ongoing website content updates.',
    features: ['Core Web Vitals Tuning', 'Plugin & Dependency Updates', 'Content & Graphic Updates', 'Monthly Health Reports'],
  },
];

const process = [
  { step: '01', title: 'Website Onboarding', description: 'Auditing your existing website setup, hosting environment, plugins, and security status.' },
  { step: '02', title: 'Backup & Security Setup', description: 'Configuring daily offsite cloud backups, SSL certificates, and firewall security layers.' },
  { step: '03', title: 'Performance Optimization', description: 'Caching static assets, optimizing images, and cleaning database clutter.' },
  { step: '04', title: '24/7 Monitoring', description: 'Activating automated uptime checkers and instant notification webhooks.' },
  { step: '05', title: 'Regular Maintenance', description: 'Executing weekly plugin/framework updates and security patches off-peak.' },
  { step: '06', title: 'Dedicated Support', description: 'Direct access to developer support for emergency fixes and regular content updates.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const WebsiteMaintenanceSupport = () => {
  return (
    <Layout>
      <SEO
        path="/services/website-maintenance-support"
        title="Website Maintenance and Support Services in Trichy"
        description="Izone Technologies offers 24/7 Website Maintenance & Support in Trichy. Security audits, daily backups, speed tuning, and regular updates."
        keywords={["Website Maintenance Trichy", "Web Support Services Tiruchirappalli", "WordPress Maintenance Trichy", "Website Security Audits Tamil Nadu"]}
        schema={[
          getServiceSchema({
            name: "Website Maintenance and Support Services",
            serviceType: "Website Maintenance",
            description: "24/7 uptime monitoring, security audits, cloud backups, speed tuning, and content updates.",
            url: "https://izonetech.in/services/website-maintenance-support"
          }),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "Website Maintenance & Support", url: "/services/website-maintenance-support" }
          ])
        ]}
      />
      <PageHero
        badgeIcon={Headphones}
        badgeText="Website Maintenance & Support"
        titleLine1="Website Maintenance"
        titleLine2="& Support Services"
        description="Keep your website fast, secure, and always online. We provide 24/7 monitoring, security patches, automated backups, and developer support."
        floatingIcons={[Headphones, ShieldCheck, Clock, RefreshCw]}
        actions={[{ label: 'Get Maintenance Plan', icon: ArrowRight, to: '/get-started' }]}
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
            <span className="text-primary font-medium">Support Workflow</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">How We Protect & Maintain Your Site</h2>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Never Worry About Website Downtime</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Protect your digital asset with dedicated 24/7 web maintenance and developer support.
              </p>
              <Link to="/get-started">
                <Button size="lg" className="glow-border hover-glow">
                  Choose Maintenance Plan
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

export default WebsiteMaintenanceSupport;

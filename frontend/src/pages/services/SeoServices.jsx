import { motion } from 'framer-motion';
import { Search, TrendingUp, BarChart3, Globe, ArrowRight, Check, Target, FileText, Zap, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const services = [
  {
    icon: Search,
    title: 'On-Page SEO Optimization',
    description: 'Comprehensive title tag optimization, meta description refinement, heading hierarchy, keyword placement, and image alt text.',
    features: ['Keyword Optimization', 'Header Tags (H1-H6) Hierarchy', 'Meta Tags & Descriptions', 'Internal Linking Architecture'],
  },
  {
    icon: Globe,
    title: 'Local SEO for Trichy & Tamil Nadu',
    description: 'Dominating local search results, Google Business Profile optimization, local citations, and geo-targeted keywords.',
    features: ['Google Business Profile Setup', 'Local Citation Building', 'Geo-Targeted Content', 'Review Strategy'],
  },
  {
    icon: Zap,
    title: 'Technical SEO Audits',
    description: 'Core Web Vitals optimization, XML sitemap configuration, robots.txt management, canonicalization, and speed enhancements.',
    features: ['Core Web Vitals Tuning', 'XML Sitemap & Robots.txt', 'Canonical Tag Verification', 'Crawl Error Resolution'],
  },
  {
    icon: TrendingUp,
    title: 'Off-Page SEO & Authority Building',
    description: 'Ethical link building, domain authority growth, brand mention tracking, and outreach campaigns to boost organic ranking.',
    features: ['High-Authority Backlinks', 'Content Outreach', 'Brand Mention Tracking', 'Disavow Spam Links'],
  },
];

const process = [
  { step: '01', title: 'SEO Audit', description: 'Deep technical analysis of current website rankings, backlinks, speed, and indexing.' },
  { step: '02', title: 'Keyword Research', description: 'Identifying high-intent local and global search terms your potential customers use.' },
  { step: '03', title: 'On-Page Strategy', description: 'Optimizing titles, meta tags, heading hierarchy, internal links, and content quality.' },
  { step: '04', title: 'Technical Tuning', description: 'Fixing crawl errors, enabling schema markup, and boosting Core Web Vitals speed.' },
  { step: '05', title: 'Link Building', description: 'Securing quality backlinks and strengthening your domain authority organically.' },
  { step: '06', title: 'Monthly Reporting', description: 'Transparent rank tracking, traffic analytics, and continuous performance optimization.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const SeoServices = () => {
  return (
    <Layout>
      <SEO
        path="/services/seo-services"
        title="SEO Services & Digital Growth | iZone Technologies"
        description="iZone Technologies offers top SEO Services in Trichy, Tamil Nadu. Rank #1 on Google with our On-Page, Local SEO, and Technical SEO strategies."
        keywords={["SEO Services Trichy", "SEO Agency Tiruchirappalli", "Local SEO Company Tamil Nadu", "Search Engine Optimization Trichy"]}
        schema={[
          getServiceSchema({
            name: "SEO Services in Trichy",
            serviceType: "Search Engine Optimization",
            description: "On-Page SEO, Local SEO in Trichy, Technical Audits, and Off-Page link building by iZone Technologies.",
            url: "https://izonetech.in/services/seo-services"
          }),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "SEO Services", url: "/services/seo-services" }
          ])
        ]}
      />
      <PageHero
        badgeIcon={Search}
        badgeText="SEO Services in Trichy"
        titleLine1="Search Engine Optimization"
        titleLine2="Services in Trichy"
        description="Drive targeted organic traffic, dominate local search results in Trichy & Tamil Nadu, and rank #1 on Google with our data-driven SEO strategies."
        floatingIcons={[Search, TrendingUp, BarChart3, Target]}
        actions={[{ label: 'Get Free SEO Audit', icon: ArrowRight, to: '/get-started' }]}
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
            <span className="text-primary font-medium">SEO Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">How We Boost Your Search Rankings</h2>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Rank #1 on Google?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Claim your free website SEO audit and discover how we can double your organic search leads.
              </p>
              <Link to="/get-started">
                <Button size="lg" className="glow-border hover-glow">
                  Request Free SEO Audit
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

export default SeoServices;

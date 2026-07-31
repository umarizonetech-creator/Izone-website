import { motion } from 'framer-motion';
import { Megaphone, Target, BarChart3, TrendingUp, ArrowRight, Check, DollarSign, Users, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const services = [
  {
    icon: Megaphone,
    title: 'Google & Meta Paid Ad Campaigns',
    description: 'High-ROI pay-per-click (PPC) campaigns on Google Search, YouTube, Facebook, and Instagram to acquire qualified leads.',
    features: ['Google Search & Shopping Ads', 'Meta Facebook & Instagram Ads', 'Remarketing & Retargeting', 'Conversion Tracking Setup'],
  },
  {
    icon: Target,
    title: 'Lead Generation & Sales Funnels',
    description: 'Designing high-converting landing pages, lead magnets, and automated email nurturing funnels to maximize sales.',
    features: ['Landing Page Optimization', 'Lead Magnet Creation', 'Automated Email Nurturing', 'CRM Lead Routing'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Performance Marketing',
    description: 'Data-driven marketing audits, A/B testing, conversion rate optimization (CRO), and monthly performance reporting.',
    features: ['Google Analytics 4 (GA4)', 'Heatmap & Behavioral Tracking', 'Conversion Rate Optimization (CRO)', 'Transparent Monthly Reports'],
  },
  {
    icon: TrendingUp,
    title: 'Brand Growth & Digital Strategy',
    description: 'Omnichannel digital growth strategies tailored for local businesses, enterprises, and online brands across Tamil Nadu.',
    features: ['Competitor Benchmarking', 'Brand Positioning Strategy', 'Multi-Channel Campaign Architecture', 'ROI Optimization'],
  },
];

const process = [
  { step: '01', title: 'Market Analysis', description: 'Auditing your industry niche, target audience demographics, and competitor strategies.' },
  { step: '02', title: 'Funnel Architecture', description: 'Building landing pages, ad copy, and tracking pixels for maximum conversion rates.' },
  { step: '03', title: 'Campaign Setup', description: 'Configuring precise audience targeting, keyword bids, and ad creatives.' },
  { step: '04', title: 'A/B Testing', description: 'Testing ad copy variants, landing page layouts, and call-to-action buttons.' },
  { step: '05', title: 'Scaling & Optimization', description: 'Scaling high-performing ad sets while reducing customer acquisition costs (CAC).' },
  { step: '06', title: 'Reporting & Strategy', description: 'Delivering weekly dashboard reports and quarterly digital growth reviews.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const DigitalMarketing = () => {
  return (
    <Layout>
      <SEO
        path="/services/digital-marketing"
        title="Digital Marketing Agency in Trichy"
        description="Izone Technologies is a top Digital Marketing Agency in Trichy providing Google Ads, Meta Ads, Lead Generation, and Performance Marketing."
        keywords={["Digital Marketing Agency Trichy", "PPC Agency Tiruchirappalli", "Google Ads Trichy", "Lead Generation Company Tamil Nadu"]}
        schema={[
          getServiceSchema({
            name: "Digital Marketing Services",
            serviceType: "Digital Marketing",
            description: "Google Ads, Meta Paid Campaigns, Lead Generation Funnels, and Performance Marketing.",
            url: "https://izonetech.in/services/digital-marketing"
          }),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "Digital Marketing", url: "/services/digital-marketing" }
          ])
        ]}
      />
      <PageHero
        badgeIcon={Megaphone}
        badgeText="Digital Marketing Agency in Trichy"
        titleLine1="Digital Marketing"
        titleLine2="Agency in Trichy"
        description="Drive qualified leads, maximize return on ad spend (ROAS), and scale your revenues with our targeted PPC and performance marketing campaigns."
        floatingIcons={[Megaphone, Target, BarChart3, TrendingUp]}
        actions={[{ label: 'Scale Your Business', icon: ArrowRight, to: '/get-started' }]}
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
            <span className="text-primary font-medium">Marketing Strategy</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">How We Drive Digital Growth</h2>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Sales Online?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Partner with Trichy's top digital marketing team and launch profitable ad campaigns today.
              </p>
              <Link to="/get-started">
                <Button size="lg" className="glow-border hover-glow">
                  Get Free Marketing Proposal
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

export default DigitalMarketing;

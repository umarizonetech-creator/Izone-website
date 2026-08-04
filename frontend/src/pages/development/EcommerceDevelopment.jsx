import { motion } from 'framer-motion';
import { ShoppingCart, Store, CreditCard, ShieldCheck, ArrowRight, Check, Package, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '@/utils/seoSchemas';

const services = [
  {
    icon: Store,
    title: 'Custom E-commerce Storefronts',
    description: 'Bespoke online shopping websites engineered for speed, mobile responsiveness, and high conversion rates.',
    features: ['Custom Checkout Flow', 'Product Catalog & Filters', 'Wishlist & Cart Sync', 'SEO Optimized Pages'],
  },
  {
    icon: CreditCard,
    title: 'Payment Gateway Integration',
    description: 'Secure multi-currency payment gateway integrations including Razorpay, Stripe, UPI, Credit Cards, and Net Banking.',
    features: ['Razorpay, Stripe & UPI', 'Multi-Currency Support', 'Instant Refund Webhooks', 'PCI-DSS Compliant Security'],
  },
  {
    icon: Package,
    title: 'Inventory & ERP Integration',
    description: 'Automated inventory management, warehouse tracking, shipping API integrations, and order fulfillment systems.',
    features: ['Real-Time Stock Sync', 'Automated Invoicing', 'Shipping API Integration (Shiprocket)', 'Order Tracking Portal'],
  },
  {
    icon: RefreshCw,
    title: 'Shopify & WooCommerce Solutions',
    description: 'Custom theme design, plugin development, and platform migrations for Shopify and WooCommerce storefronts.',
    features: ['Shopify Liquid Themes', 'WooCommerce Custom Plugins', 'Platform Migration', 'Performance Optimization'],
  },
];

const process = [
  { step: '01', title: 'Product & Brand Setup', description: 'We map your product catalog, categories, pricing logic, and target buyer personas.' },
  { step: '02', title: 'UX & Cart Design', description: 'Designing frictionless shopping flows, cart overlays, and mobile-first checkout screens.' },
  { step: '03', title: 'Storefront Engineering', description: 'Building fast frontends with secure database schemas and instant search capabilities.' },
  { step: '04', title: 'Payment & Logistics Integration', description: 'Connecting payment gateways, SMS order alerts, and shipping calculator APIs.' },
  { step: '05', title: 'Security & QA Testing', description: 'Testing checkout security, SSL encryption, load handling, and mobile responsiveness.' },
  { step: '06', title: 'Store Launch & Training', description: 'Going live with complete client dashboard training for order and inventory management.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const EcommerceDevelopment = () => {
  return (
    <Layout>
      <SEO
        path="/development/ecommerce-development"
        title="E-commerce Development | iZone Technologies Trichy"
        description="iZone Technologies builds custom E-commerce websites, Shopify stores, WooCommerce platforms, and payment gateways in Trichy & Tamil Nadu."
        keywords={["Ecommerce Development Trichy", "Shopify Developers Trichy", "Online Store Development Tiruchirappalli", "Payment Gateway Integration Trichy"]}
        schema={[
          getServiceSchema({
            name: "E-commerce Development Services",
            serviceType: "E-commerce Development",
            description: "Custom online store development, shopping cart systems, and payment gateway integration by iZone Technologies.",
            url: "https://izonetech.in/development/ecommerce-development"
          }),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Development", url: "/development" },
            { name: "E-commerce Development", url: "/development/ecommerce-development" }
          ])
        ]}
      />
      <PageHero
        badgeIcon={ShoppingCart}
        badgeText="E-commerce Development"
        titleLine1="E-commerce Development"
        titleLine2="Company in Trichy"
        description="Launch high-converting online stores built for seamless shopping, secure payment gateways, and automated order fulfillment."
        floatingIcons={[Store, CreditCard, Package, ShieldCheck]}
        actions={[{ label: 'Launch Your Store', icon: ArrowRight, to: '/get-started' }]}
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
            <span className="text-primary font-medium">Store Building Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">How We Build E-commerce Stores</h2>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Start Selling Online Today</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Transform your retail business with a custom e-commerce store engineered for growth and customer loyalty.
              </p>
              <Link to="/get-started">
                <Button size="lg" className="glow-border hover-glow">
                  Get a Free Store Consultation
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

export default EcommerceDevelopment;

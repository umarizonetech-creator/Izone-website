import { motion } from "framer-motion";
import { Code, Smartphone, ArrowRight, BrainCircuit, Building2, Link2, PenLine, Pen, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { Button } from "../components/ui/button";
import FlipCard from "../components/ui/FlipCard";

const services = [
  {
    title: "Web Development",
    summary:
      "Bespoke web applications built from scratch using modern, scalable frameworks.",
    fullContent:
      "We create bespoke web applications that perfectly align with your business requirements. Our team uses cutting-edge technologies including React, Next.js, Vue.js, and Angular to deliver scalable, maintainable solutions.",
    icon: <Code className="w-7 h-7 text-primary" />,
    features: [
      "React & Next.js",
      "Vue.js & Nuxt",
      "TypeScript",
      "State Management",
      "API Integration",
      "QA & Launch",
    ],
    shape3D: "cube",
    accent: "blue",
    category: "Development",
  },
  {
    title: "Software Development",
    summary:
      "Custom software development that transforms your ideas into powerful, scalable applications.",
    fullContent:
      "Our software development services cover everything from desktop applications to complex enterprise solutions. We specialize in technologies like Electron, .NET, and Java to create robust, high-performance software tailored to your needs.",
    icon: <Terminal className="w-7 h-7 text-primary" />,

    features: [
     "Java & Spring Boot",
      "Electron & Desktop Apps",
      ".NET & C#",
      "python & Django",
    ],
    shape3D: "sphere",
    accent: "green",
    category: "Development",
  },
  {
    title: "App Development",
    summary:
      "Native and cross-platform mobile app development for iOS and Android using React Native and Flutter.",
    fullContent:
      "We build high-quality mobile applications that provide seamless user experiences across iOS and Android platforms. Our expertise in React Native and Flutter allows us to deliver performant, feature-rich apps that meet your business goals.",
    icon: <Smartphone className="w-7 h-7 text-primary" />,
    features: [
      "React Native",
      "Flutter",
      "UI Design & Prototyping",
      "Payment Integration",
      "Inventory System",
    ],
    shape3D: "torus",
    accent: "purple",
    category: "Development",
  },
  {
    title: "AI & ML",
    summary:
      "Leverage the power of artificial intelligence and machine learning to drive innovation and automation in your business.",
    fullContent:
      "Our AI and ML services help you harness the power of data to create intelligent applications. We specialize in natural language processing, computer vision, and predictive analytics using frameworks like TensorFlow and PyTorch.",
    icon: <BrainCircuit className="w-7 h-7 text-primary" />,
    features: [
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Analytics",
      "TensorFlow & PyTorch",
    ],
    shape3D: "octahedron",
    accent: "violet",
    category: "AI Solutions",
  },
  {
    title: "Government Tenders",
    summary:
      "We specialize in helping businesses navigate the government tender process and secure contracts.",
    fullContent:
    "We support businesses in navigating the complex government tender process, from identifying opportunities to crafting winning proposals. Our expertise in compliance, documentation, and strategic bidding helps you secure valuable government contracts.",
    icon: <Building2 className="w-7 h-7 text-primary" />,
    features: [
      "Tender Research",
      "Proposal Writing",
      "Compliance Management",
      "Strategic Bidding",
      "Submission Support",
    ],
    shape3D: "cube",
    accent: "orange",
    category: "Solutions",
  },
  {
    title: "Social Media Marketing",
    summary:
      "Boost your online presence and engage your audience with our expert social media marketing strategies.",
    fullContent:
      "Our social media marketing services help you build a strong online presence and connect with your audience. We create tailored strategies that include content creation, community management, and targeted advertising to drive engagement and growth.",
    icon: <Link2 className="w-7 h-7 text-primary" />,
    features: [
      "Content Creation",
      "Community Management",
      "Targeted Advertising",
      "Core Web Vitals",
      "SEO Best Practices",
    ],
    shape3D: "sphere",
    accent: "pink",
    category: "Marketing",
  },
  {
    title: "Content Writing",
    summary:
      "We create compelling and SEO-optimized content that resonates with your target audience.",
    fullContent:
      "Our content writing services help you communicate your message effectively across various channels. From blog posts and articles to social media content and email campaigns, we deliver high-quality, engaging content that drives results.",
    icon: <PenLine className="w-7 h-7 text-primary" />,
    features: [
      "Blog Posts",
      "Articles",
      "Social Media Content",
      "Email Campaigns",
    ],
    shape3D: "cube",
    accent: "cyan",
    category: "Content",
  },
  {
    title: "Graphics Designer",
    summary:
      "We create stunning visual designs that enhance your brand and engage your audience.",
    fullContent:
      "Our graphics design services help you establish a strong visual identity and create compelling marketing materials. From logos and branding to social media graphics and website assets, we deliver high-quality designs that align with your brand values.",
    icon: <Pen className="w-7 h-7 text-primary" />,
    features: [
      "Logo Design",
      "Branding",
      "Social Media Graphics",
      "Website Assets",
    ],
    shape3D: "cube",
    accent: "emerald",
    category: "Design",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const Development = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        badgeIcon={Code}
        badgeText="Development"
        titleLine1="Development"
        titleLine2="Services"
        description="Modern, scalable solutions built with the latest technologies to launch faster, support growth, and keep your product experience polished."
        floatingIcons={[Code, Terminal, Smartphone, BrainCircuit]}
      />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <FlipCard
                key={index}
                title={service.title}
                summary={service.summary}
                fullContent={service.fullContent}
                icon={service.icon}
                features={service.features}
                delay={index * 0.1}
                desktopComfort={true}
                serviceLayout={true}
                accent={service.accent}
                category={service.category}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your Website?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's discuss your project and create something extraordinary
                together.
              </p>
              <Link to="/contact">
                <Button size="lg" className="glow-border hover-glow">
                  Start Your Project
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

export default Development;
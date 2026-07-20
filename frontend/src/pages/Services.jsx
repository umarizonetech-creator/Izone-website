import { motion } from "framer-motion";
import {
  MessageSquare,
  Phone,
  MessageCircle,
  Megaphone,
  Vote,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { Button } from "../components/ui/button";
import FlipCard from "../components/ui/FlipCard";

const services = [
  {
    title: "Bulk SMS",
    summary:
      "High-delivery mass SMS campaigns for instant customer reach and engagement.",
    fullContent:
      "Reach thousands of customers instantly with our reliable Bulk SMS services. Perfect for promotional offers, alerts, and notifications. Enhance your campaign response rates with guaranteed high-speed delivery gateways.",
    icon: <MessageSquare className="w-7 h-7 text-primary" />,
    features: [
      "High Delivery Rate",
      "Instant Delivery",
      "Sender ID Support",
      "Detailed Analytics",
      "API Integration",
      "Contact Management",
    ],
    shape3D: "cube",
    accent: "blue",
    category: "Messaging",
  },
  {
    title: "Voice SMS",
    summary:
      "Automated pre-recorded voice calls to clearly broadcast your customized message.",
    fullContent:
      "Send pre-recorded voice messages to your target audience. Voice SMS is incredibly effective for regional campaigns, announcements, and reminders because it adds a personal, human touch that text simply cannot provide.",
    icon: <Phone className="w-7 h-7 text-primary" />,
    features: [
      "Custom Audio Upload",
      "Regional Language Support",
      "Automated Dialing",
      "Real-time Reports",
      "High Capacity Platform",
    ],
    shape3D: "sphere",
    accent: "orange",
    category: "Messaging",
  },
  {
    title: "WhatsApp Panel",
    summary:
      "A dedicated central panel to manage bulk WhatsApp messaging professionally.",
    fullContent:
      "Take full control over your WhatsApp broadcasting with our dedicated WhatsApp Panel. Schedule messages, manage large contact lists, and use robust multimedia support to make your mass messaging far more effective.",
    icon: <MessageCircle className="w-7 h-7 text-primary" />,
    features: [
      "Web-Based Panel",
      "Multimedia Support",
      "Campaign Scheduling",
      "Status Tracking",
      "Easy Contact Upload",
    ],
    shape3D: "torus",
    accent: "emerald",
    category: "Messaging",
  },
  {
    title: "WhatsApp Marketing",
    summary:
      "End-to-end WhatsApp engagement campaigns using interactive and rich media.",
    fullContent:
      "Leverage the world's most popular messaging app for deep interactive engagement. We help you design and execute comprehensive WhatsApp Marketing campaigns with interactive buttons, rich media, and personalized conversation flows.",
    icon: <Megaphone className="w-7 h-7 text-primary" />,
    features: [
      "Interactive Buttons",
      "Rich Media Ads",
      "Personalized Targeting",
      "2-Way Communication",
      "Automated Chatbots",
    ],
    shape3D: "octahedron",
    accent: "pink",
    category: "Marketing",
  },
  {
    title: "Digital Election Campaign",
    summary:
      "Strategic all-in-one digital promotion tailored specifically for modern political campaigns.",
    fullContent:
      "Maximize voter outreach with our holistic digital election campaigning tools. We combine social media management, targeted bulk messaging, voice broadcasting, and data analytics to significantly boost political visibility.",
    icon: <Vote className="w-7 h-7 text-primary" />,
    features: [
      "Voter Targeting",
      "Social Media Management",
      "Mass Broadcasting",
      "Sentiment Analysis",
      "End-to-End Strategy",
    ],
    shape3D: "cube",
    accent: "indigo",
    category: "Campaigns",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        badgeIcon={MessageSquare}
        badgeText="Services"
        titleLine1="Communication"
        titleLine2="Services"
        description="Powerful communication tools to connect with your audience, deliver messages clearly, and scale engagement without losing momentum."
        floatingIcons={[MessageSquare, Phone, MessageCircle, Megaphone]}
      />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 items-stretch"
          >
            {services.map((service, index) => (
              <FlipCard
                key={index}
                title={service.title}
                summary={service.summary}
                fullContent={service.fullContent}
                icon={service.icon}
                features={service.features}
                serviceLayout={true}
                delay={index * 0.1}
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
                Ready to Supercharge Your Outreach?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's discuss your marketing needs and create an extensive, powerful campaign
                together.
              </p>
              <Link to="/contact">
                <Button size="lg" className="glow-border hover-glow">
                  Start Your Campaign
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

export default Services;
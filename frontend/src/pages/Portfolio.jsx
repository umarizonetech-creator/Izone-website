import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAdmin } from '@/context/AdminContext';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Portfolio = () => {
  const { portfolios = [], publicDataLoaded } = useAdmin();
  const projects = portfolios.length > 0 ? portfolios : [];

  if (!publicDataLoaded) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="portfolio-hero pt-8 sm:pt-12 md:pt-16 pb-0 md:pb-24 md:px-8 relative overflow-hidden md:min-h-screen lg:min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-hm font-medium mb-6">
              Our Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Projects That
              <span className="gradient-text block mt-2">Define Excellence</span>
            </h1>
            <p className="portfolio-hero-copy text-lg text-muted-foreground text-justify md:text-center lg:text-center">
              Explore our collection of successful projects that showcase our expertise
              in creating innovative digital solutions for businesses across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid — 3 columns on lg+, 2 on md, 1 on mobile */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card overflow-hidden group hover-glow flex flex-col"
              >
                {/* Thumbnail — reduced height for compact 3-col look */}
                <div className="relative overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col flex-1 gap-2">

                  {/* Meta row */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      {project.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate">
                      {project.client || project.clientName}
                    </span>
                    {project.link && (
                      <a
                        href={project.id ? `${API_BASE_URL}/api/portfolios/${project.id}/visit` : project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto shrink-0 text-primary hover:text-primary/70 transition-colors"
                        title="Visit website"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
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
                Want to See Your Project Here?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Let's create something amazing together. Share your vision with us
                and join our growing list of successful projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-started">
                  <Button size="lg" className="glow-border hover-glow">
                    Start Your Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                    Contact Us
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

export default Portfolio;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Smartphone, Sparkles, GraduationCap, ArrowRight, Mail, Users, Smile, Award } from "lucide-react";

const AboutHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[86svh] overflow-hidden bg-white text-zinc-900">
      {/* Faint dot-grid pattern, bottom-left corner only */}
      <div className="absolute bottom-0 left-0 h-64 w-64 md:h-80 md:w-80 opacity-60 bg-[radial-gradient(circle,rgba(120,113,108,0.14)_1.5px,transparent_1.5px)] bg-[length:22px_22px] [mask-image:radial-gradient(circle_at_bottom_left,black,transparent_75%)]" />

      {/* Large soft blob bleeding off the right edge of the viewport */}
      <div className="hidden lg:block absolute top-1/2 right-[-14%] -translate-y-1/2 h-[130%] w-[62%] rounded-[46%_54%_58%_42%/48%_42%_58%_52%] bg-gradient-to-br from-primary/10 via-emerald-50 to-primary/5" />

      <div className="relative z-10 container-custom max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] px-4 md:px-8 xl:px-10 pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full items-start gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_1.05fr]"
        >
          <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2.5 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                <span className="h-[2px] w-6 bg-primary" />
                About Us
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-zinc-900"
            >
              <span className="block text-zinc-900">Innovating the</span>
              <span className="block mt-2 md:mt-0 lg:mt-0">
                <span className="text-primary">Digital</span>{" "}
                <span className="text-primary">Landscape</span>
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mt-4 flex items-center justify-center lg:justify-start gap-1.5"
            >
              <span className="h-[3px] w-10 rounded-full bg-primary" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/25" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-700 text-justify"
            >
              Izone Technologies was established in 2016 at Trichy with diverse
              knowledge. We deliver web designing and development, software and
              mobile app development, bulk messaging solutions, and career
              development programs with clarity, quality, and long-term growth.
            </motion.p>

            {/* Icon chip row */}
            <motion.div
              variants={itemVariants}
              className="mt-7 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center lg:justify-start"
            >
              {[
                { label: "Web", icon: Globe },
                { label: "Mobile", icon: Smartphone },
                { label: "AI Solutions", icon: Sparkles },
                { label: "Training", icon: GraduationCap },
              ].map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/10 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm whitespace-nowrap"
                >
                  <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            {/* <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3.5"
            >
              <Link
                to="/development"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Explore More
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/5"
              >
                Contact Us
                <Mail className="h-4 w-4" />
              </Link>
            </motion.div> */}

            {/* Inline stats row */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center lg:justify-start sm:gap-x-8 sm:gap-y-5"
            >
              {[
                { icon: Users, value: "25+", label: "Team Members" },
                { icon: Smile, value: "140+", label: "Happy Clients" },
                { icon: Award, value: "10+", label: "Years Experience" },
              ].map(({ icon: Icon, value, label }, idx) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 sm:flex-row sm:items-center sm:gap-3"
                >
                  <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div className="text-center sm:text-left">
                    <p className="text-lg sm:text-xl font-black leading-none text-zinc-900">{value}</p>
                    <p className="text-[10px] sm:text-xs font-medium text-zinc-500 mt-1 whitespace-nowrap">{label}</p>
                  </div>
                  {idx < 2 && (
                    <span className="hidden sm:block h-8 w-px bg-zinc-200 ml-5" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---------------- Hero Image ---------------- */}
          <motion.div
            variants={itemVariants}
            className="relative h-[320px] sm:h-[400px] lg:h-[480px] xl:h-[520px] mx-auto w-full max-w-[480px] lg:max-w-none lg:w-[115%] lg:-mr-[15%] xl:-mr-[18%] lg:mt-2"
          >
            <img
              src="/hero/about-hero0.png"
              alt="About Izone showcase"
              className="relative z-10 h-full w-full object-contain mix-blend-multiply"
            />
          </motion.div>
          {/* -------------- End Hero Image -------------- */}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
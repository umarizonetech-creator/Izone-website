import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import FacebookIcon from "@/components/icons/FacebookIcon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  company: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/about#team" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Our Clients", path: "/clients" },
    { name: "Careers", path: "/career" },
    { name: "Courses", path: "/courses" },
    { name: "Contact", path: "/contact" },
  ],
  development: [
    { name: "Website Development", path: "/development/web-development" },
    { name: "Web Application Dev", path: "/development/web-application-development" },
    { name: "Mobile App Development", path: "/development/app-development" },
    { name: "Custom Software Dev", path: "/development/software-development" },
    { name: "E-commerce Development", path: "/development/ecommerce-development" },
    { name: "Social Media Management", path: "/development/social-media-marketing" },
    { name: "Branding & Graphic Design", path: "/development/graphics-designer" },
  ],
  services: [
    { name: "SEO Services", path: "/services/seo-services" },
    { name: "Digital Marketing", path: "/services/digital-marketing" },
    { name: "IT Consulting Services", path: "/services/it-consulting" },
    { name: "Political Digital Campaigns", path: "/services/digital-election-campaign" },
    { name: "Website Maintenance & Support", path: "/services/website-maintenance-support" },
    { name: "Bulk SMS", path: "/services/bulk-sms" },
    { name: "Get Started", path: "/get-started" },
  ],
};

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/izonegroups/",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://x.com/izonegroups/",
    label: "Twitter",
  },
  {
    icon: FacebookIcon,
    href: "https://www.facebook.com/izonetechnology",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/izone_technologies",
    label: "Instagram",
  },
];

export function Footer() {
  const footerRef = useRef(null);

  const openDialer = (event) => {
    event.preventDefault();
    window.location.assign("tel:+919940048776");
  };

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const logo = footer.querySelector(".footer-logo");
    const desc = footer.querySelector(".footer-desc");
    const socials = footer.querySelector(".footer-socials");
    
    const companyTitle = footer.querySelector(".footer-company-title");
    const companyItems = footer.querySelectorAll(".footer-company-item");
    
    const servicesTitle = footer.querySelector(".footer-services-title");
    const servicesItems = footer.querySelectorAll(".footer-services-item");
    
    const contactTitle = footer.querySelector(".footer-contact-title");
    const contactItems = footer.querySelectorAll(".footer-contact-item");
    
    const bottomLinks = footer.querySelector(".footer-bottom-links");
    const bottomCopy = footer.querySelector(".footer-bottom-copy");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 92%",
          toggleActions: "play none none reverse"
        }
      });

      if (logo) tl.fromTo(logo, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      if (desc) tl.fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.35");
      if (socials) tl.fromTo(socials.children, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.3");

      if (companyTitle) tl.fromTo(companyTitle, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.35");
      if (companyItems.length > 0) tl.fromTo(companyItems, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" }, "-=0.3");

      if (servicesTitle) tl.fromTo(servicesTitle, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.35");
      if (servicesItems.length > 0) tl.fromTo(servicesItems, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" }, "-=0.3");

      if (contactTitle) tl.fromTo(contactTitle, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.35");
      if (contactItems.length > 0) tl.fromTo(contactItems, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.38, stagger: 0.1, ease: "power2.out" }, "-=0.3");

      if (bottomLinks) tl.fromTo(bottomLinks.children, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.25");
      if (bottomCopy) tl.fromTo(bottomCopy, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-card border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10 px-4 pb-4 pt-5 md:px-6 md:pb-5 md:pt-7">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 text-left sm:grid-cols-2 lg:grid-cols-[minmax(200px,1.2fr)_minmax(120px,0.65fr)_minmax(185px,0.95fr)_minmax(175px,0.9fr)_minmax(240px,1.1fr)] lg:items-start">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="footer-logo mb-2.5 flex items-center justify-start gap-2">
              <div className="flex h-12 w-48 items-center justify-start md:h-14 md:w-56 lg:h-16 lg:w-60">
                <img
                  src="/izone-logo.webp"
                  alt="Izone Technologies Logo"
                  className="h-full w-full object-contain object-left"
                />
              </div>
            </Link>
            <p className="footer-desc mb-3 max-w-xs text-xs leading-relaxed text-muted-foreground text-justify md:text-[0.8125rem]">
              Transforming ideas into exceptional digital experiences. We build
              modern, scalable web solutions that drive business growth.
            </p>
            <div className="footer-socials flex justify-start gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:h-9 md:w-9"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="text-left text-xs md:text-[0.8125rem]">
            <h4 className="footer-company-title mb-2.5 font-display text-sm font-semibold text-foreground">
              Company
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.company.map((link) => (
                <li className="footer-company-item" key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Development */}
          <div className="text-left text-xs md:text-[0.8125rem]">
            <h4 className="footer-dev-title mb-2.5 font-display text-sm font-semibold text-foreground">
              Development
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.development.map((link) => (
                <li className="footer-dev-item" key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-left text-xs md:text-[0.8125rem]">
            <h4 className="footer-services-title mb-2.5 font-display text-sm font-semibold text-foreground">
              Services
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.services.map((link) => (
                <li className="footer-services-item" key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-left text-xs md:text-[0.8125rem]">
            <h4 className="footer-contact-title mb-2.5 font-display text-sm font-semibold text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-2.5">
              <li className="footer-contact-item grid grid-cols-[16px_minmax(0,1fr)] items-start gap-2 text-left">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-xs text-justify leading-relaxed text-muted-foreground md:text-[0.8125rem]">
                  3rd Floor, Aruvi Arcade Complex, 5th Cross Thillainagar, North
                  Extension Road, Tiruchirapalli, Tamil Nadu-620018.
                </span>
              </li>
              <li className="footer-contact-item grid grid-cols-[16px_minmax(0,1fr)] items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-primary" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@izonetech.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-xs text-muted-foreground transition-colors hover:text-primary md:text-[0.8125rem]"
                >
                  info@izonetech.in
                </a>
              </li>
              <li className="footer-contact-item grid grid-cols-[16px_minmax(0,1fr)] items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-primary" />
                <a
                  href="tel:+919940048776"
                  onClick={openDialer}
                  className="text-xs text-muted-foreground transition-colors hover:text-primary md:text-[0.8125rem]"
                >
                  +91-9940048776
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border pt-4 text-center sm:flex-row sm:text-left">
          <div className="footer-bottom-links flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-muted-foreground">
            <Link to="/contact" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/contact" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
          <p className="footer-bottom-copy text-xs leading-4 text-muted-foreground">
            &copy; {new Date().getFullYear()} Izone Technologies. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

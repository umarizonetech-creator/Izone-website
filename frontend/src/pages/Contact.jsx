import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Linkedin,
  Twitter,
  Instagram,
  Building2Icon,
  GitBranchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useAdmin } from "@/context/AdminContext";
import FacebookIcon from "@/components/icons/FacebookIcon";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["5th Cross Thillainagar,", "Tiruchirappalli-620018."],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["innovativezone.tech@gmail.com", ""],
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=innovativezone.tech@gmail.com",
    external: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91-9943077284", ""],
    href: "tel:+919943077284",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Sat: 10:00 AM - 6:30 PM", "Sun: Closed"],
  },
  {
    icon: Building2Icon,
    title: "Head Office",
    details: ["No: 10/20, second Floor,", "Annai Residency,", "Amma Mandapam Road, Mambalasalai, Srirangam, Tiruchirappalli-620006."],
  },
  {
    icon: GitBranchIcon,
    title: "Branch Office",
    details: [ "Chennai","Coimbatore", "Nagarkovil", "Thiruvananthapuram","Salem"],
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/izonegroups/",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://x.com/izonegroups/", label: "Twitter" },
  { icon: FacebookIcon, href: "https://www.facebook.com/izonegroups/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/izonegroups/", label: "Instagram" },
];

const isOfficeInfo = (title) =>
  title === "Head Office" || title === "Branch Office";

const Contact = () => {
  const { toast } = useToast();
  const { addContact } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactCardClick = (event, item) => {
    if (!item.href) return;

    event.preventDefault();

    if (item.title === "Email Us") {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.assign(item.href);
  };

    const onlyLetters = (e) => {
    if (!/^[a-zA-Z\s]$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key))
      e.preventDefault();
  };

  const onlyDigits = (e) => {
    if (!/^[0-9]$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key))
      e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact submission failed", error);
      toast({
        title: "Message not sent",
        description: "Please check the backend connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 pb-5 md:pb-24 md:px-8 relative overflow-hidden md:min-h-screen lg:min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Start a
              <span className="gradient-text block">Conversation</span>
            </h1>
            <p className="text-lg text-muted-foreground  text-justify md:text-center lg:text-center p-3">
              Have a project in mind? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              id="send-us-message"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-32 w-full min-w-0"
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      required
                      className="bg-card border-border focus:border-primary"
                      onKeyDown={onlyLetters} 
                      pattern="[A-Za-z\s]+" 
                      title="Name should contain only letters"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      required
                      className="bg-card border-border focus:border-primary"
                      pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" 
                      title="Enter a valid email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit number"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="Enter a valid 10-digit phone number"
                      className="bg-card border-border focus:border-primary"
                      onKeyDown={onlyDigits}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      required
                      className="bg-card border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    required
                    className="bg-card border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full glow-border hover-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>

              <div className="mt-10 space-y-6">
                {contactInfo
                  .filter((item) => isOfficeInfo(item.title))
                  .map((item, index) => (
                    <div
                      key={item.title}
                      className="glass-card hover-glow flex items-start gap-6 rounded-[2rem] p-8 scroll-mt-32 transition-transform duration-300"
                    >
                      <div className="h-14 w-14 rounded-[1.5rem] bg-primary/10 flex shrink-0 items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h3 className="font-display font-semibold mb-5 text-2xl md:text-3xl">
                          {item.title}
                        </h3>
                        {item.title === "Branch Office" ? (
                          <ul className="list-disc space-y-3 pl-5 text-primary">
                            {item.details.map((detail, idx) => (
                              <li key={idx} className="text-lg font-medium leading-snug">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          item.details.map((detail, idx) => (
                            <p
                              key={idx}
                              className="mb-3 text-lg font-medium leading-relaxed text-primary last:mb-0"
                            >
                              {detail}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Contact Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {contactInfo
                  .filter((item) => !isOfficeInfo(item.title))
                  .map((item, index) => {
                    const cardContent = (
                      <>
                        <div className="bg-primary/10 flex shrink-0 items-center justify-center mb-4 h-12 w-12 rounded-xl">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold mb-2">
                            {item.title}
                          </h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </>
                    );

                    return item.href ? (
                      <a
                        key={index}
                        id={item.title === "Call Us" ? "call-us" : undefined}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        onClick={(event) => handleContactCardClick(event, item)}
                        className="glass-card hover-glow block cursor-pointer scroll-mt-32 p-6 transition-transform duration-300 target:-translate-y-1 target:scale-[1.03] target:border-primary/50 target:shadow-[0_18px_45px_rgba(22,163,74,0.22)]"
                        aria-label={`${item.title}: ${item.details[0]}`}
                      >
                        {cardContent}
                      </a>
                    ) : (
                      <div
                        key={index}
                        className="glass-card hover-glow scroll-mt-32 p-6 transition-transform duration-300"
                      >
                        {cardContent}
                      </div>
                    );
                })}
              </div>

              {/* Social Links */}
              <div className="mb-10">
                <h3 className="font-display font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass-card overflow-hidden glow-border relative">
                {/* Clickable overlay to open Google Maps */}
                <a
                  href="https://maps.app.goo.gl/7g1cZQPEXRnqZfCr5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20"
                ></a>

                <div className="aspect-video bg-muted relative flex items-center justify-center overflow-hidden">
                  {/* Embedded Map */}
                  <iframe
                    src="https://www.google.com/maps?q=iZone%20Technologies%2C%205th%20Cross%20Thillainagar%2C%20Tiruchirappalli%20620018&output=embed"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>

                  {/* Overlay info */}
                  <div className="absolute z-10 text-center w-full h-full flex flex-col items-center justify-center bg-black/20 pointer-events-none">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-white font-medium">Our Location</p>
                    <p className="text-sm text-white/80">
                      Click to open in Google Maps
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section id="faq" className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl font-bold mb-4">
              Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Check out our frequently asked questions or reach out to us
              directly. We're here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-primary/50 bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a href="#send-us-message">View FAQ</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary/50 bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a href="tel:+919943077284" onClick={(event) => handleContactCardClick(event, { href: "tel:+919943077284", title: "Call Us" })}>
                  Schedule a Call
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

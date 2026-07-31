import React, { useState, useRef, isValidElement, cloneElement } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Code2, Terminal, Smartphone, BrainCircuit, 
  Building2, Megaphone, ArrowRight, BookOpen,
  Vote, Sparkles, Monitor, BarChart3,
  Cloud, Shield, Rocket, Zap, Store, SearchCheck, 
  FileCheck2, Landmark, Users, Share2, PenLine, 
  Pen, Files, Layout, Printer, Image, Phone, 
  Mic, Volume2, Radio, MessageCircle, LayoutDashboard, MapPin,
  Palette, ShieldCheck, Newspaper,
  Settings, Headphones, Database, Bot, LineChart, Briefcase, TrendingUp, Search, Mail,
  Target, MessageSquare
} from 'lucide-react';
import {
  FaReact, FaJava, FaPaintBrush, FaRegEye, FaSearch, 
  FaFileAlt, FaShieldAlt, FaGlobe, FaShareAlt, FaBullseye, FaPenNib,
  FaRegCommentAlt, FaMobileAlt, FaPhone, FaWhatsapp, FaVoteYea
} from "react-icons/fa";
import {
  SiNextdotjs, SiVuedotjs, SiTypescript, SiFlutter, SiSpringboot, SiDotnet,
  SiTensorflow, SiPytorch, SiElectron
} from "react-icons/si";

// Helper function to convert Hex to RGBA for custom glows
const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Pointy-topped rounded hexagon SVG path for all three layers
const pathD = "M 45 7.8 Q 50 5 55 7.8 L 84.7 25 Q 89 27.5 89 32.5 L 89 67.5 Q 89 72.5 84.7 75 L 55 92.2 Q 50 95 45 92.2 L 15.3 75 Q 11 72.5 11 67.5 L 11 32.5 Q 11 27.5 15.3 25 Z";

const StackedHexagon = ({ icon: Icon, accentColor }) => {
  return (
    <div className="relative w-20 h-20 mb-5">
      {/* Background shape 1 (furthest shadow shifted up and to the right) */}
      <svg 
        className="absolute w-16 h-16 opacity-[0.20] translate-x-[14px] -translate-y-[10px] transition-transform duration-500 group-hover:translate-x-[16px] group-hover:-translate-y-[12px]" 
        viewBox="0 0 100 100" 
        fill={accentColor}
      >
        <path d={pathD} />
      </svg>
      
      {/* Background shape 2 (middle shadow shifted up and to the right) */}
      <svg 
        className="absolute w-16 h-16 opacity-[0.30] translate-x-[7px] -translate-y-[5px] transition-transform duration-500 group-hover:translate-x-[8px] group-hover:-translate-y-[6px]" 
        viewBox="0 0 100 100" 
        fill={accentColor}
      >
        <path d={pathD} />
      </svg>

      {/* Front main hexagon shape (white background with solid icon) */}
      <div 
        className="absolute w-16 h-16 flex items-center justify-center transition-transform duration-500 group-hover:-translate-x-[1px] group-hover:translate-y-[1px]"
      >
        <svg 
          className="absolute inset-0 w-full h-full drop-shadow-md" 
          viewBox="0 0 100 100" 
          fill="currentColor"
          style={{ color: 'white' }}
        >
          <path 
            d={pathD} 
            stroke={accentColor} 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
        
        {/* Icon Container */}
        <div className="relative z-10 flex items-center justify-center" style={{ color: accentColor }}>
          {isValidElement(Icon) ? (
            cloneElement(Icon, { className: "w-6 h-6" })
          ) : Icon ? (
            <Icon className="w-6 h-6" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </div>
      </div>
    </div>
  );
};

// Card-Specific Unique Background Illustrations (Scaled down by 15-20% for optimal layout fit)
const WebBrowserOutline = ({ color }) => (
  <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.15] pointer-events-none rotate-3" style={{ color }}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
      <rect x="15" y="25" width="75" height="55" rx="8" />
      <line x1="15" y1="42" x2="90" y2="42" strokeWidth="2" />
      <circle cx="25" cy="33" r="2.5" className="fill-current" />
      <circle cx="33" cy="33" r="2.5" className="fill-current" />
      <circle cx="41" cy="33" r="2.5" className="fill-current" />
      
      <path d="M 35 58 L 27 63 L 35 68" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 70 58 L 78 63 L 70 68" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="56" y1="52" x2="49" y2="74" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

const GlobeOutline = ({ color }) => (
  <div className="absolute -right-12 bottom-[-50px] w-40 h-40 rounded-full border-2 opacity-[0.28] pointer-events-none" style={{ borderColor: color }}>
    <div className="absolute inset-3 rounded-full border-2 opacity-80" style={{ borderColor: color }} />
    <div className="absolute inset-6 rounded-full border opacity-60" style={{ borderColor: color }} />
    <div className="absolute left-1/2 -translate-x-1/2 w-px h-full opacity-60" style={{ backgroundColor: color }} />
    <div className="absolute top-1/2 -translate-y-1/2 h-px w-full opacity-60" style={{ backgroundColor: color }} />
    <div className="absolute inset-0 rotate-45 border-t opacity-50" style={{ borderColor: color }} />
    <div className="absolute inset-0 -rotate-45 border-t opacity-50" style={{ borderColor: color }} />
  </div>
);

const GearOutline = ({ color }) => (
  <div className="absolute -right-8 bottom-[-40px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
      <circle cx="50" cy="50" r="18" />
      <circle cx="50" cy="50" r="30" strokeDasharray="6 3" />
      {[...Array(8)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 50 50)`}>
          <path d="M46 14 h8 v8 h-8 z" />
        </g>
      ))}
    </svg>
  </div>
);

const PhoneOutline = ({ color }) => (
  <div className="absolute -right-4 bottom-[-65px] w-28 h-44 opacity-[0.28] pointer-events-none rotate-12" style={{ color }}>
    <svg viewBox="0 0 100 200" className="w-full h-full stroke-current fill-none" strokeWidth="3">
      <rect x="10" y="10" width="80" height="180" rx="12" />
      <line x1="30" y1="175" x2="70" y2="175" strokeWidth="3" />
      <circle cx="50" cy="25" r="4.5" />
    </svg>
  </div>
);

const NetworkOutline = ({ color }) => (
  <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
      <circle cx="20" cy="30" r="4" className="fill-current" />
      <circle cx="50" cy="20" r="5" className="fill-current" />
      <circle cx="80" cy="40" r="4" className="fill-current" />
      <circle cx="40" cy="60" r="6" className="fill-current" />
      <circle cx="70" cy="70" r="5" className="fill-current" />
      <circle cx="30" cy="85" r="4" className="fill-current" />
      
      <line x1="20" y1="30" x2="50" y2="20" />
      <line x1="50" y1="20" x2="80" y2="40" />
      <line x1="50" y1="20" x2="40" y2="60" />
      <line x1="40" y1="60" x2="70" y2="70" />
      <line x1="80" y1="40" x2="70" y2="70" />
      <line x1="40" y1="60" x2="30" y2="85" />
      <line x1="70" y1="70" x2="30" y2="85" />
    </svg>
  </div>
);

const ShieldOutline = ({ color }) => (
  <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
      <path d="M20 20 C40 10 60 10 80 20 C80 50 70 80 50 95 C30 80 20 50 20 20 Z" />
      <path d="M30 28 C43 20 57 20 70 28 C70 52 62 76 50 87 C38 76 30 52 30 28 Z" strokeDasharray="4 2" />
    </svg>
  </div>
);

const TargetOutline = ({ color }) => (
  <div className="absolute -right-8 bottom-[-40px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
      <circle cx="50" cy="50" r="38" />
      <circle cx="50" cy="50" r="26" />
      <circle cx="50" cy="50" r="14" />
      <circle cx="50" cy="50" r="3.5" className="fill-current" />
      <line x1="82" y1="18" x2="56" y2="44" strokeWidth="3" />
      <path d="M76 18 L82 18 L82 24" strokeWidth="3" fill="none" />
    </svg>
  </div>
);

const DocumentOutline = ({ color }) => (
  <div className="absolute -right-6 bottom-[-30px] w-36 h-36 opacity-[0.28] pointer-events-none rotate-6" style={{ color }}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
      <path d="M25 15 L65 15 L75 25 L75 85 L25 85 Z" />
      <path d="M65 15 L65 25 L75 25" />
      <line x1="35" y1="35" x2="65" y2="35" strokeWidth="2.5" />
      <line x1="35" y1="48" x2="65" y2="48" strokeWidth="2.5" />
      <line x1="35" y1="61" x2="55" y2="61" strokeWidth="2.5" />
      <line x1="35" y1="74" x2="60" y2="74" strokeWidth="2.5" />
    </svg>
  </div>
);

const DesignOutline = ({ color }) => (
  <div className="absolute -right-8 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
      {/* Bezier curve path */}
      <path d="M 25 75 C 32 40, 38 27, 45 27 C 52 27, 75 35, 85 52" />
      
      {/* Handlebar line through anchor point */}
      <line x1="20" y1="37" x2="70" y2="17" strokeWidth="1.5" />
      <circle cx="20" cy="37" r="3" className="fill-current" />
      <circle cx="70" cy="17" r="3" className="fill-current" />
      
      {/* Square anchor points */}
      <rect x="22" y="72" width="6" height="6" className="fill-current" />
      <rect x="82" y="49" width="6" height="6" className="fill-current" />
      <rect x="42" y="24" width="6" height="6" className="fill-current" />

      {/* Pen Nib pointing at (45,27) */}
      <g transform="translate(45, 27) rotate(-25) translate(-50, -30)">
        <path 
          d="M 50 30 L 44 52 L 46 56 L 44 76 L 56 76 L 54 56 L 56 52 Z" 
          className="fill-white dark:fill-slate-900" 
          strokeWidth="2.5"
        />
        {/* central slit */}
        <line x1="50" y1="30" x2="50" y2="58" strokeWidth="2" />
        {/* breather hole */}
        <circle cx="50" cy="58" r="2.5" className="fill-current" />
        {/* base collar line */}
        <path d="M 45 72 L 55 72" strokeWidth="2" />
      </g>
    </svg>
  </div>
);

const renderBackgroundIllustration = (normTitle, color, propIllustration, themeColor) => {
  const select = (propIllustration || "").toLowerCase().trim();
  
  if (select === "browser" || select === "webbrowser") return <WebBrowserOutline color={color} />;
  if (select === "globe") return <GlobeOutline color={color} />;
  if (select === "gear" || select === "settings") return <GearOutline color={color} />;
  if (select === "phone" || select === "smartphone") return <PhoneOutline color={color} />;
  if (select === "network" || select === "brain") return <NetworkOutline color={color} />;
  if (select === "shield" || select === "security") return <ShieldOutline color={color} />;
  if (select === "target" || select === "marketing") return <TargetOutline color={color} />;
  if (select === "document" || select === "writing") return <DocumentOutline color={color} />;
  if (select === "design" || select === "pen") return <DesignOutline color={color} />;

  // Title-based detection
  if (normTitle.includes("web development") || normTitle.includes("browser")) return <WebBrowserOutline color={color} />;
  if (normTitle.includes("software development") || normTitle.includes("integration") || normTitle.includes("devops") || normTitle.includes("system")) return <GearOutline color={color} />;
  if (normTitle.includes("app development") || normTitle.includes("phone") || normTitle.includes("mobile") || normTitle.includes("whatsapp")) return <PhoneOutline color={color} />;
  if (normTitle.includes("ai & ml") || normTitle.includes("artificial intelligence") || normTitle.includes("analytics") || normTitle.includes("consulting") || normTitle.includes("cloud")) return <NetworkOutline color={color} />;
  if (normTitle.includes("tender") || normTitle.includes("government") || normTitle.includes("security") || normTitle.includes("compliance")) return <ShieldOutline color={color} />;
  if (normTitle.includes("marketing") || normTitle.includes("social media") || normTitle.includes("campaign") || normTitle.includes("ad")) return <TargetOutline color={color} />;
  if (normTitle.includes("writing") || normTitle.includes("content") || normTitle.includes("document") || normTitle.includes("sms") || normTitle.includes("deployment")) return <DocumentOutline color={color} />;
  if (normTitle.includes("design") || normTitle.includes("graphic")) return <DesignOutline color={color} />;
  if (normTitle.includes("support") || normTitle.includes("maintenance") || normTitle.includes("enterprise") || normTitle.includes("global")) return <GlobeOutline color={color} />;

  // Theme-based fallback
  if (themeColor === "blue") return <WebBrowserOutline color={color} />;
  if (themeColor === "green") return <GearOutline color={color} />;
  if (themeColor === "purple") return <PhoneOutline color={color} />;
  if (themeColor === "indigo") return <NetworkOutline color={color} />;
  if (themeColor === "orange") return <ShieldOutline color={color} />;
  if (themeColor === "pink") return <TargetOutline color={color} />;

  return <GlobeOutline color={color} />;
};

// Single IZONE brand-green theme, reused for every accent key so all cards
// render in the same brand color while the rest of the design/logic is untouched.
const brandGreen = {
  accentColor: "#248966",
  text: "text-primary",
  bg: "bg-primary/5 dark:bg-primary/10",
  border: "border-primary/15 dark:border-primary/25",
  iconBg: "bg-gradient-to-br from-primary/80 to-primary",
  shadow: "shadow-primary/20 dark:shadow-none",
  btn: "bg-primary",
};

const colorMap = {
  blue: brandGreen,
  green: brandGreen,
  purple: brandGreen,
  indigo: brandGreen,
  orange: brandGreen,
  pink: brandGreen,
};

// Map card details based on title
const getCardConfig = (title) => {
  const norm = title.toLowerCase().trim();

  // --- Strict Exact Matches first to distinguish main sections from sub-items ---
  if (norm === "bulk sms") {
    return { tag: "SMS SERVICES", themeColor: "green", icon: MessageSquare };
  }
  if (norm === "voice sms") {
    return { tag: "VOICE SERVICES", themeColor: "blue", icon: Phone };
  }
  if (norm === "whatsapp panel") {
    return { tag: "WHATSAPP PANEL", themeColor: "purple", icon: MessageCircle };
  }
  if (norm === "whatsapp marketing") {
    return { tag: "WHATSAPP MARKETING", themeColor: "pink", icon: Megaphone };
  }
  if (norm === "digital election campaign") {
    return { tag: "ELECTORAL SERVICES", themeColor: "orange", icon: Vote };
  }

  // --- Web Development Cards ---
  if (norm.includes("custom web development") || norm === "web development") {
    return { tag: "DEVELOPMENT", themeColor: "blue", icon: Code2 };
  }
  if (norm.includes("ui/ux design") && !norm.includes("app")) {
    return { tag: "DESIGN", themeColor: "purple", icon: Palette };
  }
  if (norm.includes("technical consulting")) {
    return { tag: "CONSULTING", themeColor: "green", icon: Settings };
  }
  if (norm.includes("ongoing support")) {
    return { tag: "SUPPORT", themeColor: "pink", icon: Headphones };
  }

  // --- Software Development Cards ---
  if (norm.includes("custom software solutions") || norm === "software development") {
    return { tag: "DEVELOPMENT", themeColor: "green", icon: Terminal };
  }
  if (norm.includes("enterprise applications")) {
    return { tag: "ENTERPRISE", themeColor: "indigo", icon: Database };
  }
  if (norm.includes("cloud solutions")) {
    return { tag: "CLOUD", themeColor: "blue", icon: Cloud };
  }
  if (norm === "api integration") { // Specific WhatsApp Panel sub-card
    return { tag: "INTEGRATION", themeColor: "blue", icon: Zap };
  }
  if (norm.includes("system integration")) {
    return { tag: "INTEGRATION", themeColor: "orange", icon: Settings };
  }
  if (norm.includes("security & compliance") || norm.includes("responsible ai")) {
    return { tag: "SECURITY", themeColor: "pink", icon: Shield };
  }
  if (norm.includes("devops & deployment") || norm.includes("mlops deployment")) {
    return { tag: "DEVOPS", themeColor: "purple", icon: Rocket };
  }

  // --- App Development Cards ---
  if (norm.includes("ios app development")) {
    return { tag: "MOBILE", themeColor: "blue", icon: Smartphone };
  }
  if (norm.includes("android app development")) {
    return { tag: "MOBILE", themeColor: "green", icon: Smartphone };
  }
  if (norm.includes("cross-platform") || norm === "app development") {
    return { tag: "MOBILE", themeColor: "indigo", icon: Smartphone };
  }
  if (norm.includes("app ui/ux design")) {
    return { tag: "DESIGN", themeColor: "purple", icon: Sparkles };
  }
  if (norm.includes("app performance")) {
    return { tag: "PERFORMANCE", themeColor: "orange", icon: Zap };
  }
  if (norm.includes("app store launch")) {
    return { tag: "LAUNCH", themeColor: "pink", icon: Store };
  }

  // --- AI & ML Cards ---
  if (norm.includes("ai strategy") || norm === "ai & ml") {
    return { tag: "AI SOLUTIONS", themeColor: "indigo", icon: BrainCircuit };
  }
  if (norm.includes("machine learning models")) {
    return { tag: "AI SOLUTIONS", themeColor: "blue", icon: Bot };
  }
  if (norm.includes("data engineering")) {
    return { tag: "DATA", themeColor: "green", icon: Database };
  }
  if (norm === "performance analytics") { // Specifically for WhatsApp Marketing page
    return { tag: "ANALYTICS", themeColor: "indigo", icon: LineChart };
  }
  if (norm.includes("analytics & insights") || norm.includes("analytics & reporting")) {
    return { tag: "ANALYTICS", themeColor: "orange", icon: LineChart };
  }

  // --- Government Digital Solutions Cards ---
  if (norm.includes("minnagam support")) {
    return { tag: "SUPPORT", themeColor: "green", icon: SearchCheck };
  }
  if (norm.includes("documentation support")) {
    return { tag: "DOCUMENTATION", themeColor: "blue", icon: FileCheck2 };
  }
  if (norm.includes("proposal preparation")) {
    return { tag: "PROPOSAL", themeColor: "purple", icon: Briefcase };
  }
  if (norm.includes("portal assistance") || norm === "Government Digital Solutions") {
    return { tag: "ASSISTANCE", themeColor: "indigo", icon: Landmark };
  }
  if (norm.includes("compliance & risk review")) {
    return { tag: "COMPLIANCE", themeColor: "orange", icon: Shield };
  }
  if (norm.includes("bid management")) {
    return { tag: "MANAGEMENT", themeColor: "pink", icon: Users };
  }

  // --- Social Media Marketing Cards ---
  if (norm.includes("social media strategy") || norm === "social media marketing") {
    return { tag: "MARKETING", themeColor: "pink", icon: Megaphone };
  }
  if (norm.includes("content creation") || norm.includes("creative content")) {
    return { tag: "CREATIVE", themeColor: "purple", icon: Share2 };
  }
  if (norm.includes("community management")) {
    return { tag: "ENGAGEMENT", themeColor: "green", icon: Users };
  }
  if (norm.includes("customer engagement")) { // WhatsApp Marketing sub-card
    return { tag: "ENGAGEMENT", themeColor: "purple", icon: Users };
  }
  if (norm.includes("paid advertising")) {
    return { tag: "CAMPAIGNS", themeColor: "orange", icon: TrendingUp };
  }
  if (norm.includes("marketing campaigns")) { // WhatsApp Marketing sub-card
    return { tag: "CAMPAIGNS", themeColor: "pink", icon: Megaphone };
  }
  if (norm.includes("influencer marketing")) {
    return { tag: "GROWTH", themeColor: "blue", icon: Users };
  }
  if (norm.includes("growth strategies")) { // WhatsApp Marketing sub-card
    return { tag: "GROWTH", themeColor: "green", icon: TrendingUp };
  }
  if (norm === "targeted messaging") { // WhatsApp Marketing sub-card
    return { tag: "TARGETED", themeColor: "blue", icon: Target };
  }

  // --- Content Writing Cards ---
  if (norm.includes("blog writing")) {
    return { tag: "CONTENT", themeColor: "blue", icon: BookOpen };
  }
  if (norm.includes("website copywriting") || norm === "content writing") {
    return { tag: "CONTENT", themeColor: "green", icon: PenLine };
  }
  if (norm.includes("seo content")) {
    return { tag: "SEO", themeColor: "indigo", icon: Search };
  }
  if (norm.includes("email marketing")) {
    return { tag: "MARKETING", themeColor: "pink", icon: Mail };
  }
  if (norm.includes("technical writing")) {
    return { tag: "TECHNICAL", themeColor: "purple", icon: BookOpen };
  }
  if (norm.includes("press releases")) {
    return { tag: "PRESS", themeColor: "orange", icon: Newspaper };
  }

  // --- Graphics Designer Cards ---
  if (norm.includes("logo & branding") || norm === "graphics designer") {
    return { tag: "DESIGN", themeColor: "purple", icon: Pen };
  }
  if (norm.includes("social media design")) {
    return { tag: "DESIGN", themeColor: "pink", icon: Share2 };
  }
  if (norm.includes("marketing collateral")) {
    return { tag: "DESIGN", themeColor: "blue", icon: Files };
  }
  if (norm.includes("ui/ux assets")) {
    return { tag: "DESIGN", themeColor: "indigo", icon: Layout };
  }
  if (norm.includes("print design")) {
    return { tag: "DESIGN", themeColor: "orange", icon: Printer };
  }
  if (norm.includes("illustrations")) {
    return { tag: "DESIGN", themeColor: "green", icon: Image };
  }

  // --- Bulk SMS Sub-Cards ---
  if (norm.includes("transactional sms")) {
    return { tag: "SMS", themeColor: "blue", icon: MessageSquare };
  }
  if (norm.includes("promotional sms")) {
    return { tag: "SMS", themeColor: "green", icon: Megaphone };
  }
  if (norm.includes("otp sms")) {
    return { tag: "SMS", themeColor: "indigo", icon: Shield };
  }
  if (norm.includes("sender id")) {
    return { tag: "SMS", themeColor: "pink", icon: Users };
  }
  if (norm.includes("delivery reports")) {
    return { tag: "SMS", themeColor: "purple", icon: LineChart };
  }

  // --- Voice SMS Sub-Cards ---
  if (norm.includes("automated voice calls")) {
    return { tag: "VOICE", themeColor: "blue", icon: Phone };
  }
  if (norm.includes("text-to-speech")) {
    return { tag: "VOICE", themeColor: "green", icon: Mic };
  }
  if (norm.includes("voice broadcasting")) {
    return { tag: "VOICE", themeColor: "purple", icon: Volume2 };
  }
  if (norm.includes("interactive voice response")) {
    return { tag: "VOICE", themeColor: "indigo", icon: Radio };
  }
  if (norm.includes("campaign management")) {
    return { tag: "VOICE", themeColor: "orange", icon: Settings };
  }

  // --- WhatsApp Panel Sub-Cards ---
  if (norm.includes("whatsapp business api")) {
    return { tag: "WHATSAPP", themeColor: "green", icon: MessageCircle };
  }
  if (norm.includes("multi-agent dashboard")) {
    return { tag: "WHATSAPP", themeColor: "purple", icon: Users };
  }
  if (norm.includes("chatbot integration")) {
    return { tag: "WHATSAPP", themeColor: "indigo", icon: Bot };
  }
  if (norm.includes("campaign manager")) {
    return { tag: "WHATSAPP", themeColor: "orange", icon: LayoutDashboard };
  }

  // --- Digital Election Campaign Sub-Cards ---
  if (norm.includes("voter outreach")) {
    return { tag: "ELECTORAL", themeColor: "orange", icon: Vote };
  }
  if (norm.includes("constituency mapping")) {
    return { tag: "ELECTORAL", themeColor: "indigo", icon: MapPin };
  }
  if (norm.includes("volunteer management")) {
    return { tag: "ELECTORAL", themeColor: "green", icon: Users };
  }

  // Fallback
  return {
    tag: "SERVICE",
    themeColor: "blue",
    icon: Sparkles
  };
};

// Map tech pills based on feature text, matching the user's requested icons & styling
const getTagData = (feature, accentColor) => {
  const norm = feature.toLowerCase().trim();

  if (norm.includes("react native")) {
    return {
      icon: <FaReact className="text-purple-500 animate-spin-slow" />,
      title: "React Native"
    };
  }
  if (norm.includes("react")) {
    return {
      icon: <FaReact className="text-sky-500 animate-spin-slow" />,
      title: "React"
    };
  }
  if (norm.includes("next.js")) {
    return {
      icon: <SiNextdotjs className="text-slate-800 dark:text-slate-200" />,
      title: "Next.js"
    };
  }
  if (norm.includes("vue.js") || norm === "vue") {
    return {
      icon: <SiVuedotjs className="text-[#42b883] flex-shrink-0" />,
      title: "Vue.js"
    };
  }
  if (norm.includes("nuxt")) {
    return {
      icon: <SiVuedotjs className="text-[#42b883]" />,
      title: "Nuxt"
    };
  }
  if (norm.includes("typescript") || norm === "ts") {
    return {
      icon: <SiTypescript className="text-blue-600" />,
      title: "TypeScript"
    };
  }
  if (norm.includes("spring boot")) {
    return {
      icon: <SiSpringboot className="text-[#6db33f]" />,
      title: "Spring Boot"
    };
  }
  if (norm.includes("java")) {
    return {
      icon: <FaJava className="text-amber-600" />,
      title: "Java"
    };
  }
  if (norm.includes("flutter")) {
    return {
      icon: <SiFlutter className="text-[#02569B]" />,
      title: "Flutter"
    };
  }
  if (norm === "electron") {
    return {
      icon: <SiElectron className="text-cyan-500" />,
      title: "Electron"
    };
  }
  if (norm.includes("desktop app")) {
    return {
      icon: <Monitor className="w-3.5 h-3.5" style={{ color: accentColor }} />,
      title: "Desktop Apps"
    };
  }
  if (norm === ".net" || norm === "c#") {
    return {
      icon: <SiDotnet className="text-[#512bd4]" />,
      title: ".NET"
    };
  }
  if (norm.includes("ui design") || norm.includes("ui/ux") || norm.includes("prototyping") || norm.includes("branding")) {
    return {
      icon: <FaPaintBrush className="text-violet-600" />,
      title: feature
    };
  }
  if (norm.includes("logo design")) {
    return {
      icon: <FaPenNib className="text-purple-600" />,
      title: "Logo Design"
    };
  }
  if (norm.includes("machine learning")) {
    return {
      icon: <SiTensorflow className="text-orange-500" />,
      title: "Machine Learning"
    };
  }
  if (norm.includes("deep learning")) {
    return {
      icon: <SiPytorch className="text-rose-600" />,
      title: "Deep Learning"
    };
  }
  if (norm.includes("nlp") || norm.includes("natural language")) {
    return {
      icon: <FaRegCommentAlt className="text-violet-500" />,
      title: "NLP"
    };
  }
  if (norm.includes("computer vision")) {
    return {
      icon: <FaRegEye className="text-blue-500" />,
      title: "Computer Vision"
    };
  }
  if (norm.includes("predictive analytics")) {
    return {
      icon: <BarChart3 className="w-3.5 h-3.5" style={{ color: accentColor }} />,
      title: "Predictive Analytics"
    };
  }
  if (norm.includes("tender")) {
    return {
      icon: <FaSearch className="text-amber-600" />,
      title: "Tender Search"
    };
  }
  if (norm.includes("proposal") || norm.includes("document")) {
    return {
      icon: <FaFileAlt className="text-amber-600" />,
      title: "Documentation"
    };
  }
  if (norm.includes("compliance") || norm.includes("bid")) {
    return {
      icon: <FaShieldAlt className="text-amber-600" />,
      title: "Bid Management"
    };
  }
  if (norm.includes("seo") || norm.includes("core web vitals")) {
    return {
      icon: <FaGlobe className="text-rose-500" />,
      title: feature
    };
  }
  if (norm.includes("social media") || norm.includes("community management")) {
    return {
      icon: <FaShareAlt className="text-rose-500" />,
      title: feature
    };
  }
  if (norm.includes("ppc") || norm.includes("ad") || norm.includes("advertising")) {
    return {
      icon: <FaBullseye className="text-rose-500" />,
      title: "PPC Ads"
    };
  }
  if (norm.includes("content")) {
    return {
      icon: <FaPenNib className="text-rose-500" />,
      title: "Content Marketing"
    };
  }
  if (norm.includes("blog")) {
    return {
      icon: <BookOpen className="w-3.5 h-3.5 text-blue-500" />,
      title: "Blog Posts"
    };
  }
  if (norm.includes("article")) {
    return {
      icon: <FaFileAlt className="text-emerald-500" />,
      title: "Articles"
    };
  }

  // fallback
  return {
    icon: <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />,
    title: feature
  };
};

export function FlipCard({
  title,
  summary,
  fullContent,
  icon: originalIcon,
  features = [],
  delay = 0,
  serviceLayout = false,
  desktopComfort = false,
  themeColor: propThemeColor,
  illustration: propIllustration,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const pointerStartRef = useRef(null);
  const didDragRef = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { tag, themeColor: configThemeColor, icon: ConfigIcon } = getCardConfig(title);
  const themeColor = propThemeColor || configThemeColor;
  const colors = colorMap[themeColor] || colorMap.blue;
  const Icon = originalIcon || ConfigIcon;

  const handlePointerDown = (event) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    didDragRef.current = false;
  };

  const handlePointerMove = (event) => {
    if (!pointerStartRef.current) return;

    const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
    const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

    if (deltaX > 10 || deltaY > 10) {
      didDragRef.current = true;
    }
  };

  const handlePointerCancel = () => {
    pointerStartRef.current = null;
    didDragRef.current = false;
  };

  const handleCardClick = () => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }

    setIsFlipped((current) => !current);
  };

  const normTitle = title.toLowerCase().trim();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay }}
      className="perspective-1000 w-full"
    >
      <motion.div
        className="group relative w-full cursor-pointer touch-pan-y min-h-[385px] xs:min-h-[395px] sm:min-h-[410px] md:min-h-[425px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 110, damping: 14 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerCancel={handlePointerCancel}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 ${colors.bg} border ${colors.border} rounded-[2rem] p-5 transition-all duration-300 backface-hidden flex flex-col justify-between overflow-hidden`}
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: isHovered 
              ? `0 20px 45px -10px ${hexToRgba(colors.accentColor, 0.16)}` 
              : `0 12px 35px -15px ${hexToRgba(colors.accentColor, 0.10)}`
          }}
        >
          {/* Ambient Glow (Increased opacity for higher vibrancy) */}
          <div 
            className="absolute bottom-[-30px] right-[-30px] w-52 h-52 rounded-full filter blur-3xl opacity-[0.20] pointer-events-none"
            style={{ 
              background: `radial-gradient(circle, ${colors.accentColor} 0%, transparent 70%)` 
            }}
          />

          {/* Dotted pattern - 42 dots matching the user uploaded layout */}
          <div className="absolute right-6 top-6 grid grid-cols-7 gap-1.5 opacity-[0.35] pointer-events-none">
            {[...Array(42)].map((_, i) => (
              <span
                key={i}
                className="w-[2.5px] h-[2.5px] rounded-full"
                style={{ backgroundColor: colors.accentColor }}
              />
            ))}
          </div>

          {/* Unique Background Illustration based on Card Category */}
          {renderBackgroundIllustration(normTitle, colors.accentColor, propIllustration, themeColor)}

          <div>
            {/* Hexagonal Stacked Icon Badge */}
            <StackedHexagon icon={Icon} accentColor={colors.accentColor} />

            {/* Header Segment */}
            <span className={`text-[10px] font-bold tracking-widest block mb-1 ${colors.text}`}>
              {tag}
            </span>
            
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
              {title}
            </h3>

            {/* Accent Underline */}
            <div className={`w-8 h-1 rounded-full mb-2 ${colors.btn}`} />

            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
              {summary}
            </p>

            {/* Pill Tags (Slices up to 3 tags with brand icons and original brand colors) */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {features.flatMap(f => f.split('&').map(sub => sub.trim())).slice(0, 3).map((featureTag, idx) => {
                  const tagInfo = getTagData(featureTag, colors.accentColor);
                  return (
                    <span 
                      key={idx} 
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5"
                    >
                      {tagInfo.icon}
                      {tagInfo.title}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="flex items-center gap-2">
            <span 
              className={`font-bold text-sm tracking-wide transition-colors duration-200 ${colors.text} hover:opacity-85`}
            >
              Learn More
            </span>
            <button className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1 ${colors.btn}`}>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 ${colors.bg} border ${colors.border} rounded-[2rem] p-5 backface-hidden flex flex-col justify-between overflow-hidden`}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: isHovered 
              ? `0 20px 45px -10px ${hexToRgba(colors.accentColor, 0.16)}` 
              : `0 12px 35px -15px ${hexToRgba(colors.accentColor, 0.10)}`
          }}
        >
          {/* Ambient Glow */}
          <div 
            className="absolute bottom-[-30px] right-[-30px] w-52 h-52 rounded-full filter blur-3xl opacity-[0.20] pointer-events-none"
            style={{ 
              background: `radial-gradient(circle, ${colors.accentColor} 0%, transparent 70%)` 
            }}
          />

          {/* Dotted pattern - 42 dots */}
          <div className="absolute right-6 top-6 grid grid-cols-7 gap-1.5 opacity-[0.35] pointer-events-none">
            {[...Array(42)].map((_, i) => (
              <span
                key={i}
                className="w-[2.5px] h-[2.5px] rounded-full"
                style={{ backgroundColor: colors.accentColor }}
              />
            ))}
          </div>

          {/* Unique Background Illustration based on Card Category */}
          {renderBackgroundIllustration(normTitle, colors.accentColor)}

          <div>
            {/* Header Segment */}
            <span className={`text-[10px] font-bold tracking-widest block mb-1 ${colors.text}`}>
              {tag}
            </span>
            
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
              {title}
            </h3>

            {/* Accent Underline */}
            <div className={`w-8 h-1 rounded-full mb-2 ${colors.btn}`} />

            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
              {fullContent}
            </p>

            {/* All Features list */}
            {features.length > 0 && (
              <div className="mb-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
                  Key Deliverables:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                    >
                      <span 
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.btn}`} 
                      />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="flex items-center gap-2">
            <span 
              className={`font-bold text-sm tracking-wide transition-colors duration-200 ${colors.text} hover:opacity-85`}
            >
              Go Back
            </span>
            <button className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:-translate-x-1 ${colors.btn}`}>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FlipCard;

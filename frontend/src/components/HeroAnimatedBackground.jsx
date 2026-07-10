import { motion } from "framer-motion";

const HeroAnimatedBackground = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-0 bg-no-repeat"
    style={{
      backgroundImage: "url(/hero/heroimg2.svg)",
      backgroundSize: "130%",
      backgroundPosition: "60% 15%",
      opacity: 0.85,
      translateX: 140,
      transformOrigin: "center",
    }}
    animate={{ y: [0, 7, -10, 0], rotate: [0, 2, 0, 0] }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default HeroAnimatedBackground;

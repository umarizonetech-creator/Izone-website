import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedText = ({
  text,
  as: Tag = "h1",
  className = "",
  stagger = 0.035,
  yPercent = 100,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const chars = text.split("");

  return (
    <Tag ref={ref} className={className} style={{ overflow: "hidden", display: "block" }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
          initial={{ opacity: 0, y: `${yPercent}%` }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
};

export default AnimatedText;

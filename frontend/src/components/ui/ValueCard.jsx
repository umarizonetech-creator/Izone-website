import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * ValueCard — wallet-style circle-overlay card for "Our Values" section.
 * The expanding-blob/icon animation triggers as the card scrolls into view
 * (and reverses as it scrolls out), instead of only on mouse hover.
 *
 * `index` staggers the reveal so cards in the same row animate one after
 * another (smooth left-to-right cascade) rather than all at once — the
 * delay is applied via the --value-delay CSS variable, consumed in
 * index.css only while the card is .is-active.
 */
const ValueCard = ({ icon: Icon, title, description, index = 0 }) => {
  const ref = useRef(null);
  // Re-triggers every time the card crosses into/out of view while scrolling.
  const isInView = useInView(ref, {
    amount: 0.5,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <div className="value-card-wrapper">
      <motion.div
        ref={ref}
        className={`value-card${isInView ? " is-active" : ""}`}
        style={{ "--value-delay": `${index * 220}ms` }}
      >
        {/* Expanding overlay blob */}
        <div className="value-card-overlay" />

        {/* Icon circle */}
        <div className="value-card-circle">
          <div className="value-card-circle-inner" />
          {Icon && <Icon className="value-card-icon" />}
        </div>

        {/* Title */}
        <p className="value-card-label">{title}</p>

        {/* Description — fades in on scroll-into-view (and on hover) */}
        <p className="value-card-desc">{description}</p>
      </motion.div>
    </div>
  );
};

export default ValueCard;
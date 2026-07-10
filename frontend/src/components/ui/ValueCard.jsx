// import React from "react";

// /**
//  * ValueCard — wallet-style circle-overlay hover card for "Our Values" section.
//  * Keeps the same layout/alignment as the original grid; only the card visuals change.
//  */
// const ValueCard = ({ icon: Icon, title, description }) => {
//   return (
//     <div className="value-card-wrapper">
//       <div className="value-card">
//         {/* Expanding overlay blob */}
//         <div className="value-card-overlay" />

//         {/* Icon circle */}
//         <div className="value-card-circle">
//           <div className="value-card-circle-inner" />
//           {Icon && <Icon className="value-card-icon" />}
//         </div>

//         {/* Title */}
//         <p className="value-card-label">{title}</p>

//         {/* Description — fades in on hover */}
//         <p className="value-card-desc">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default ValueCard;

































import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * ValueCard — wallet-style circle-overlay card for "Our Values" section.
 * The expanding-blob/icon animation now triggers as the card scrolls into
 * view (and reverses as it scrolls out), instead of only on mouse hover.
 * Hover still works too, as a bonus for desktop pointer users.
 */
const ValueCard = ({ icon: Icon, title, description }) => {
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
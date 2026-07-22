// import { useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ChevronDown } from 'lucide-react';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.12, delayChildren: 0.05 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 22 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// // Fixed decorative slots for floating icon chips — desktop/tablet only.
// const FLOAT_SLOTS = [
//   'top-[10%] left-[4%] lg:left-[8%]',
//   'top-[18%] right-[5%] lg:right-[10%]',
//   'bottom-[22%] left-[7%] lg:left-[12%]',
//   'bottom-[12%] right-[4%] lg:right-[9%]',
// ];

// /**
//  * Shared "modern" hero section used across Portfolio, Development, Services,
//  * Clients, Career, Courses and Contact. Sized to its own content (no forced
//  * viewport height) so it never overlaps the section that follows it.
//  */
// const PageHero = ({
//   badgeIcon: BadgeIcon,
//   badgeText,
//   titleLine1,
//   titleLine2,
//   description,
//   floatingIcons = [],
//   actions = [],
//   stats = [],
// }) => {
//   const sectionRef = useRef(null);

//   const scrollToNext = () => {
//     sectionRef.current?.nextElementSibling?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 md:pb-24 px-4 md:px-8"
//     >
//       {/* Animated gradient orbs */}
//       <motion.div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/20 blur-3xl"
//         animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
//         transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
//       />
//       <motion.div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-28 -right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
//         animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
//         transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
//       />

//       {/* Dot-grid texture, faded at the edges */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0"
//         style={{
//           backgroundImage:
//             'radial-gradient(circle, hsl(var(--primary) / 0.16) 1px, transparent 1px)',
//           backgroundSize: '26px 26px',
//           maskImage:
//             'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//           WebkitMaskImage:
//             'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//         }}
//       />

//       {/* Floating icon chips */}
//       {floatingIcons.slice(0, 4).map((Icon, index) => (
//         <motion.div
//           key={index}
//           aria-hidden="true"
//           className={`hidden md:flex absolute ${FLOAT_SLOTS[index]} items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-card`}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{
//             opacity: 1,
//             y: [0, -14, 0],
//           }}
//           transition={{
//             opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
//             y: {
//               duration: 4 + index * 0.6,
//               repeat: Infinity,
//               ease: 'easeInOut',
//               delay: index * 0.3,
//             },
//           }}
//         >
//           <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
//         </motion.div>
//       ))}

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="container-custom relative z-10 text-center max-w-3xl mx-auto"
//       >
//         {badgeText && (
//           <motion.div variants={itemVariants} className="inline-flex mb-6">
//             <span className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
//               <motion.span
//                 aria-hidden="true"
//                 className="absolute inset-0 rounded-full border border-primary/40"
//                 animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.18, 1] }}
//                 transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
//               />
//               {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
//               {badgeText}
//             </span>
//           </motion.div>
//         )}
// {/* className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4" */}
//         <motion.h1
//           variants={itemVariants}
//           className="font-display text-1xl sm:text-2xl md:text-2xl lg:text-3xl font-bold leading-[1.1] mb-4"
//         >
//           {titleLine1}
//           {titleLine2 && (
//             <span className="gradient-text block mt-1 sm:mt-2">{titleLine2}</span>
//           )}
//         </motion.h1>

//         {description && (
//           <motion.p
//             variants={itemVariants}
//             className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
//           >
//             {description}
//           </motion.p>
//         )}

//         {actions.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
//           >
//             {actions.map((action, index) => {
//               const ActionIcon = action.icon;
//               const classes =
//                 action.variant === 'outline'
//                   ? 'inline-flex items-center px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all text-sm'
//                   : 'inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 text-sm';

//               const content = (
//                 <>
//                   {action.label}
//                   {ActionIcon && <ActionIcon className="ml-2 w-4 h-4" />}
//                 </>
//               );

//               if (action.to) {
//                 return (
//                   <Link key={index} to={action.to} className={classes}>
//                     {content}
//                   </Link>
//                 );
//               }

//               if (action.onClick) {
//                 return (
//                   <button key={index} type="button" onClick={action.onClick} className={classes}>
//                     {content}
//                   </button>
//                 );
//               }

//               return (
//                 <a key={index} href={action.href} className={classes}>
//                   {content}
//                 </a>
//               );
//             })}
//           </motion.div>
//         )}

//         {stats.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 pt-6 border-t border-border/60"
//           >
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="font-display text-xl sm:text-2xl font-bold text-primary">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs text-muted-foreground">{stat.label}</div>
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </motion.div>

//       <button
//         type="button"
//         onClick={scrollToNext}
//         aria-label="Scroll to next section"
//         className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors"
//       >
//         {/* <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
//         <motion.span
//           animate={{ y: [0, 6, 0] }}
//           transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
//         >
//           <ChevronDown className="w-4 h-4" />
//         </motion.span> */}
//       </button>
//     </section>
//   );
// };

// export default PageHero;

































// import { useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ChevronDown } from 'lucide-react';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.12, delayChildren: 0.05 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 22 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// // Fixed decorative slots for floating icon chips — desktop/tablet only.
// const FLOAT_SLOTS = [
//   'top-[10%] left-[4%] lg:left-[8%]',
//   'top-[18%] right-[5%] lg:right-[10%]',
//   'bottom-[22%] left-[7%] lg:left-[12%]',
//   'bottom-[12%] right-[4%] lg:right-[9%]',
// ];

// /**
//  * Shared "modern" hero section used across Portfolio, Development, Services,
//  * Clients, Career, Courses and Contact. Sized to its own content (no forced
//  * viewport height) so it never overlaps the section that follows it.
//  */
// const PageHero = ({
//   badgeIcon: BadgeIcon,
//   badgeText,
//   titleLine1,
//   titleLine2,
//   description,
//   floatingIcons = [],
//   actions = [],
//   stats = [],
// }) => {
//   const sectionRef = useRef(null);

//   const scrollToNext = () => {
//     sectionRef.current?.nextElementSibling?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-14 px-4 md:px-8"
//     >
//       {/* Animated gradient orbs */}
//       <motion.div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/20 blur-3xl"
//         animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
//         transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
//       />
//       <motion.div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-28 -right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
//         animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
//         transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
//       />

//       {/* Dot-grid texture, faded at the edges */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0"
//         style={{
//           backgroundImage:
//             'radial-gradient(circle, hsl(var(--primary) / 0.16) 1px, transparent 1px)',
//           backgroundSize: '26px 26px',
//           maskImage:
//             'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//           WebkitMaskImage:
//             'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//         }}
//       />

//       {/* Floating icon chips */}
//       {floatingIcons.slice(0, 4).map((Icon, index) => (
//         <motion.div
//           key={index}
//           aria-hidden="true"
//           className={`hidden md:flex absolute ${FLOAT_SLOTS[index]} items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-card`}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{
//             opacity: 1,
//             y: [0, -14, 0],
//           }}
//           transition={{
//             opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
//             y: {
//               duration: 4 + index * 0.6,
//               repeat: Infinity,
//               ease: 'easeInOut',
//               delay: index * 0.3,
//             },
//           }}
//         >
//           <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
//         </motion.div>
//       ))}

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="container-custom relative z-10 text-center max-w-3xl mx-auto"
//       >
//         {badgeText && (
//           <motion.div variants={itemVariants} className="inline-flex mb-6">
//             <span className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
//               <motion.span
//                 aria-hidden="true"
//                 className="absolute inset-0 rounded-full border border-primary/40"
//                 animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.18, 1] }}
//                 transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
//               />
//               {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
//               {badgeText}
//             </span>
//           </motion.div>
//         )}

//         <motion.h1
//           variants={itemVariants}
//           className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1] mb-3"
//         >
//           {titleLine1}
//           {titleLine2 && (
//             <span
//               className="gradient-text block mt-1 sm:mt-2"
//               style={{ textShadow: '0 0 36px hsl(var(--primary) / 0.35)' }}
//             >
//               {titleLine2}
//             </span>
//           )}
//         </motion.h1>

//         <motion.div
//           variants={itemVariants}
//           className="mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 mb-5"
//         />

//         {description && (
//           <motion.p
//             variants={itemVariants}
//             className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
//           >
//             {description}
//           </motion.p>
//         )}

//         {actions.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
//           >
//             {actions.map((action, index) => {
//               const ActionIcon = action.icon;
//               const classes =
//                 action.variant === 'outline'
//                   ? 'inline-flex items-center px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all text-sm'
//                   : 'inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 text-sm';

//               const content = (
//                 <>
//                   {action.label}
//                   {ActionIcon && <ActionIcon className="ml-2 w-4 h-4" />}
//                 </>
//               );

//               if (action.to) {
//                 return (
//                   <Link key={index} to={action.to} className={classes}>
//                     {content}
//                   </Link>
//                 );
//               }

//               if (action.onClick) {
//                 return (
//                   <button key={index} type="button" onClick={action.onClick} className={classes}>
//                     {content}
//                   </button>
//                 );
//               }

//               return (
//                 <a key={index} href={action.href} className={classes}>
//                   {content}
//                 </a>
//               );
//             })}
//           </motion.div>
//         )}

//         {stats.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 pt-6 border-t border-border/60"
//           >
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="font-display text-xl sm:text-2xl font-bold text-primary">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs text-muted-foreground">{stat.label}</div>
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </motion.div>

//       {/* <button
//         type="button"
//         onClick={scrollToNext}
//         aria-label="Scroll to next section"
//         className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors"
//       >
//         <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
//         <motion.span
//           animate={{ y: [0, 6, 0] }}
//           transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
//         >
//           <ChevronDown className="w-4 h-4" />
//         </motion.span>
//       </button> */}
//     </section>
//   );
// };

// export default PageHero;








































// import { useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ChevronDown } from 'lucide-react';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.12, delayChildren: 0.05 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 22 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// // Fixed decorative slots for floating icon chips — desktop/tablet only.
// const FLOAT_SLOTS = [
//   'top-[10%] left-[4%] lg:left-[8%]',
//   'top-[18%] right-[5%] lg:right-[10%]',
//   'bottom-[22%] left-[7%] lg:left-[12%]',
//   'bottom-[12%] right-[4%] lg:right-[9%]',
// ];

// /**
//  * Shared "modern" hero section used across Portfolio, Development, Services,
//  * Clients, Career, Courses and Contact. Sized to its own content (no forced
//  * viewport height) so it never overlaps the section that follows it.
//  */
// const PageHero = ({
//   badgeIcon: BadgeIcon,
//   badgeText,
//   titleLine1,
//   titleLine2,
//   description,
//   floatingIcons = [],
//   actions = [],
//   stats = [],
// }) => {
//   const sectionRef = useRef(null);

//   const scrollToNext = () => {
//     sectionRef.current?.nextElementSibling?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-14 px-4 md:px-8"
//     >
//       {/* Animated gradient orbs */}
//       <motion.div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/20 blur-3xl"
//         animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
//         transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
//       />
//       <motion.div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-28 -right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
//         animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
//         transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
//       />

//       {/* Dot-grid texture, faded at the edges */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0"
//         style={{
//           backgroundImage:
//             'radial-gradient(circle, hsl(var(--primary) / 0.16) 1px, transparent 1px)',
//           backgroundSize: '26px 26px',
//           maskImage:
//             'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//           WebkitMaskImage:
//             'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//         }}
//       />

//       {/* Floating icon chips */}
//       {floatingIcons.slice(0, 4).map((Icon, index) => (
//         <motion.div
//           key={index}
//           aria-hidden="true"
//           className={`hidden md:flex absolute ${FLOAT_SLOTS[index]} items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-card`}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{
//             opacity: 1,
//             y: [0, -14, 0],
//           }}
//           transition={{
//             opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
//             y: {
//               duration: 4 + index * 0.6,
//               repeat: Infinity,
//               ease: 'easeInOut',
//               delay: index * 0.3,
//             },
//           }}
//         >
//           <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
//         </motion.div>
//       ))}

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="container-custom relative z-10 text-center max-w-3xl mx-auto"
//       >
//         {badgeText && (
//           <motion.div variants={itemVariants} className="inline-flex mb-6">
//             <span className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
//               <motion.span
//                 aria-hidden="true"
//                 className="absolute inset-0 rounded-full border border-primary/40"
//                 animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.18, 1] }}
//                 transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
//               />
//               {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
//               {badgeText}
//             </span>
//           </motion.div>
//         )}

//         <motion.h1
//           variants={itemVariants}
//           className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-3"
//         >
//           {titleLine1}
//           {titleLine2 && (
//             <span
//               className="gradient-text block mt-1 sm:mt-2"
//               style={{ textShadow: '0 0 36px hsl(var(--primary) / 0.35)' }}
//             >
//               {titleLine2}
//             </span>
//           )}
//         </motion.h1>

//         <motion.div
//           variants={itemVariants}
//           className="mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 mb-5"
//         />

//         {description && (
//           <motion.p
//             variants={itemVariants}
//             className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
//           >
//             {description}
//           </motion.p>
//         )}

//         {actions.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
//           >
//             {actions.map((action, index) => {
//               const ActionIcon = action.icon;
//               const classes =
//                 action.variant === 'outline'
//                   ? 'inline-flex items-center px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all text-sm'
//                   : 'inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 text-sm';

//               const content = (
//                 <>
//                   {action.label}
//                   {ActionIcon && <ActionIcon className="ml-2 w-4 h-4" />}
//                 </>
//               );

//               if (action.to) {
//                 return (
//                   <Link key={index} to={action.to} className={classes}>
//                     {content}
//                   </Link>
//                 );
//               }

//               if (action.onClick) {
//                 return (
//                   <button key={index} type="button" onClick={action.onClick} className={classes}>
//                     {content}
//                   </button>
//                 );
//               }

//               return (
//                 <a key={index} href={action.href} className={classes}>
//                   {content}
//                 </a>
//               );
//             })}
//           </motion.div>
//         )}

//         {stats.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 pt-6 border-t border-border/60"
//           >
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="font-display text-xl sm:text-2xl font-bold text-primary">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs text-muted-foreground">{stat.label}</div>
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </motion.div>

//       {/* <button
//         type="button"
//         onClick={scrollToNext}
//         aria-label="Scroll to next section"
//         className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors"
//       >
//         <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
//         <motion.span
//           animate={{ y: [0, 6, 0] }}
//           transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
//         >
//           <ChevronDown className="w-4 h-4" />
//         </motion.span>
//       </button> */}
//     </section>
//   );
// };

// export default PageHero;


























// import { useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ChevronDown } from 'lucide-react';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.12, delayChildren: 0.05 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 22 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// // Fixed decorative slots for floating icon chips — desktop/tablet only.
// const FLOAT_SLOTS = [
//   'top-[10%] left-[4%] lg:left-[8%]',
//   'top-[18%] right-[5%] lg:right-[10%]',
//   'bottom-[22%] left-[7%] lg:left-[12%]',
//   'bottom-[12%] right-[4%] lg:right-[9%]',
// ];

// /**
//  * Shared "modern" hero section used across Portfolio, Development, Services,
//  * Clients, Career, Courses and Contact. Sized to its own content (no forced
//  * viewport height) so it never overlaps the section that follows it.
//  */
// const PageHero = ({
//   badgeIcon: BadgeIcon,
//   badgeText,
//   titleLine1,
//   titleLine2,
//   description,
//   floatingIcons = [],
//   actions = [],
//   stats = [],
// }) => {
//   const sectionRef = useRef(null);

//   const scrollToNext = () => {
//     sectionRef.current?.nextElementSibling?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden flex items-center justify-center px-4 md:px-8 py-10 min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-6.5rem)] xl:min-h-[calc(100dvh-7rem)]"
//     >
//       {/* Animated gradient orbs */}
//       <motion.div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/20 blur-3xl"
//         animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
//         transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
//       />
//       <motion.div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-28 -right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
//         animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
//         transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
//       />

//       {/* Dot-grid texture, faded at the edges */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0"
//         style={{
//           backgroundImage:
//             'radial-gradient(circle, hsl(var(--primary) / 0.16) 1px, transparent 1px)',
//           backgroundSize: '26px 26px',
//           maskImage:
//             'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//           WebkitMaskImage:
//             'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//         }}
//       />

//       {/* Floating icon chips */}
//       {floatingIcons.slice(0, 4).map((Icon, index) => (
//         <motion.div
//           key={index}
//           aria-hidden="true"
//           className={`hidden md:flex absolute ${FLOAT_SLOTS[index]} items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-card`}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{
//             opacity: 1,
//             y: [0, -14, 0],
//           }}
//           transition={{
//             opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
//             y: {
//               duration: 4 + index * 0.6,
//               repeat: Infinity,
//               ease: 'easeInOut',
//               delay: index * 0.3,
//             },
//           }}
//         >
//           <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
//         </motion.div>
//       ))}

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="container-custom relative z-10 text-center max-w-3xl mx-auto"
//       >
//         {badgeText && (
//           <motion.div variants={itemVariants} className="inline-flex mb-6">
//             <span className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
//               <motion.span
//                 aria-hidden="true"
//                 className="absolute inset-0 rounded-full border border-primary/40"
//                 animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.18, 1] }}
//                 transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
//               />
//               {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
//               {badgeText}
//             </span>
//           </motion.div>
//         )}

//         <motion.h1
//           variants={itemVariants}
//           className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-3"
//         >
//           {titleLine1}
//           {titleLine2 && (
//             <span
//               className="gradient-text block mt-1 sm:mt-2"
//               style={{ textShadow: '0 0 36px hsl(var(--primary) / 0.35)' }}
//             >
//               {titleLine2}
//             </span>
//           )}
//         </motion.h1>

//         <motion.div
//           variants={itemVariants}
//           className="mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 mb-5"
//         />

//         {description && (
//           <motion.p
//             variants={itemVariants}
//             className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
//           >
//             {description}
//           </motion.p>
//         )}

//         {actions.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
//           >
//             {actions.map((action, index) => {
//               const ActionIcon = action.icon;
//               const classes =
//                 action.variant === 'outline'
//                   ? 'inline-flex items-center px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all text-sm'
//                   : 'inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 text-sm';

//               const content = (
//                 <>
//                   {action.label}
//                   {ActionIcon && <ActionIcon className="ml-2 w-4 h-4" />}
//                 </>
//               );

//               if (action.to) {
//                 return (
//                   <Link key={index} to={action.to} className={classes}>
//                     {content}
//                   </Link>
//                 );
//               }

//               if (action.onClick) {
//                 return (
//                   <button key={index} type="button" onClick={action.onClick} className={classes}>
//                     {content}
//                   </button>
//                 );
//               }

//               return (
//                 <a key={index} href={action.href} className={classes}>
//                   {content}
//                 </a>
//               );
//             })}
//           </motion.div>
//         )}

//         {stats.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 pt-6 border-t border-border/60"
//           >
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="font-display text-xl sm:text-2xl font-bold text-primary">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs text-muted-foreground">{stat.label}</div>
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </motion.div>

//       {/* <button
//         type="button"
//         onClick={scrollToNext}
//         aria-label="Scroll to next section"
//         className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors"
//       >
//         <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
//         <motion.span
//           animate={{ y: [0, 6, 0] }}
//           transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
//         >
//           <ChevronDown className="w-4 h-4" />
//         </motion.span>
//       </button> */}
//     </section>
//   );
// };

// export default PageHero;






















// import { useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ChevronDown } from 'lucide-react';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.12, delayChildren: 0.05 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 22 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// // Fixed decorative slots for floating icon chips — desktop/tablet only.
// const FLOAT_SLOTS = [
//   'top-[10%] left-[4%] lg:left-[8%]',
//   'top-[18%] right-[5%] lg:right-[10%]',
//   'bottom-[22%] left-[7%] lg:left-[12%]',
//   'bottom-[12%] right-[4%] lg:right-[9%]',
// ];

// /**
//  * Shared "modern" hero section used across Portfolio, Development, Services,
//  * Clients, Career, Courses and Contact. Sized to its own content (no forced
//  * viewport height) so it never overlaps the section that follows it.
//  */
// const PageHero = ({
//   badgeIcon: BadgeIcon,
//   badgeText,
//   titleLine1,
//   titleLine2,
//   description,
//   floatingIcons = [],
//   actions = [],
//   stats = [],
// }) => {
//   const sectionRef = useRef(null);

//   const scrollToNext = () => {
//     sectionRef.current?.nextElementSibling?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative flex items-center justify-center px-4 md:px-8 py-12 sm:py-14 md:py-16"
//     >
//       {/* Decorative-only layer: blur orbs + dot grid, clipped so they never
//           affect the section's own scrollable box or leak outside it. */}
//       <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Animated gradient orbs */}
//         <motion.div
//           className="absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/20 blur-3xl"
//           animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
//           transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
//         />
//         <motion.div
//           className="absolute -bottom-28 -right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
//           animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
//           transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
//         />

//         {/* Dot-grid texture, faded at the edges */}
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage:
//               'radial-gradient(circle, hsl(var(--primary) / 0.16) 1px, transparent 1px)',
//             backgroundSize: '26px 26px',
//             maskImage:
//               'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//             WebkitMaskImage:
//               'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
//           }}
//         />
//       </div>

//       {/* Floating icon chips */}
//       {floatingIcons.slice(0, 4).map((Icon, index) => (
//         <motion.div
//           key={index}
//           aria-hidden="true"
//           className={`hidden md:flex absolute ${FLOAT_SLOTS[index]} items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-card`}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{
//             opacity: 1,
//             y: [0, -14, 0],
//           }}
//           transition={{
//             opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
//             y: {
//               duration: 4 + index * 0.6,
//               repeat: Infinity,
//               ease: 'easeInOut',
//               delay: index * 0.3,
//             },
//           }}
//         >
//           <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
//         </motion.div>
//       ))}

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="container-custom relative z-10 text-center max-w-3xl mx-auto"
//       >
//         {badgeText && (
//           <motion.div variants={itemVariants} className="inline-flex mb-6">
//             <span className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
//               <motion.span
//                 aria-hidden="true"
//                 className="absolute inset-0 rounded-full border border-primary/40"
//                 animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.18, 1] }}
//                 transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
//               />
//               {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
//               {badgeText}
//             </span>
//           </motion.div>
//         )}

//         <motion.h1
//           variants={itemVariants}
//           className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-3"
//         >
//           {titleLine1}
//           {titleLine2 && (
//             <span
//               className="gradient-text block mt-1 sm:mt-2"
//               style={{ textShadow: '0 0 36px hsl(var(--primary) / 0.35)' }}
//             >
//               {titleLine2}
//             </span>
//           )}
//         </motion.h1>

//         <motion.div
//           variants={itemVariants}
//           className="mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 mb-5"
//         />

//         {description && (
//           <motion.p
//             variants={itemVariants}
//             className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
//           >
//             {description}
//           </motion.p>
//         )}

//         {actions.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
//           >
//             {actions.map((action, index) => {
//               const ActionIcon = action.icon;
//               const classes =
//                 action.variant === 'outline'
//                   ? 'inline-flex items-center px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all text-sm'
//                   : 'inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 text-sm';

//               const content = (
//                 <>
//                   {action.label}
//                   {ActionIcon && <ActionIcon className="ml-2 w-4 h-4" />}
//                 </>
//               );

//               if (action.to) {
//                 return (
//                   <Link key={index} to={action.to} className={classes}>
//                     {content}
//                   </Link>
//                 );
//               }

//               if (action.onClick) {
//                 return (
//                   <button key={index} type="button" onClick={action.onClick} className={classes}>
//                     {content}
//                   </button>
//                 );
//               }

//               return (
//                 <a key={index} href={action.href} className={classes}>
//                   {content}
//                 </a>
//               );
//             })}
//           </motion.div>
//         )}

//         {stats.length > 0 && (
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 pt-6 border-t border-border/60"
//           >
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="font-display text-xl sm:text-2xl font-bold text-primary">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs text-muted-foreground">{stat.label}</div>
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </motion.div>
//     </section>
//   );
// };

// export default PageHero;
































import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Fixed decorative slots for floating icon chips — desktop/tablet only.
const FLOAT_SLOTS = [
  'top-[10%] left-[4%] lg:left-[8%]',
  'top-[18%] right-[5%] lg:right-[10%]',
  'bottom-[22%] left-[7%] lg:left-[12%]',
  'bottom-[12%] right-[4%] lg:right-[9%]',
];

/**
 * Shared "modern" hero section used across Portfolio, Development, Services,
 * Clients, Career, Courses and Contact. Sized to its own content (no forced
 * viewport height) so it never overlaps the section that follows it.
 */
const PageHero = ({
  badgeIcon: BadgeIcon,
  badgeText,
  titleLine1,
  titleLine2,
  description,
  floatingIcons = [],
  actions = [],
  stats = [],
}) => {
  const sectionRef = useRef(null);

  const scrollToNext = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center px-4 md:px-8 py-8 min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-6.5rem)] xl:min-h-[calc(100dvh-7rem)]"
    >
      {/* Decorative-only layer: blur orbs + dot grid, clipped so they never
          affect the section's own scrollable box or leak outside it. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Dot-grid texture, faded at the edges */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, hsl(var(--primary) / 0.16) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage:
              'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 55% at 50% 35%, black 40%, transparent 85%)',
          }}
        />
      </div>

      {/* Floating icon chips */}
      {floatingIcons.slice(0, 4).map((Icon, index) => (
        <motion.div
          key={index}
          aria-hidden="true"
          className={`hidden md:flex absolute ${FLOAT_SLOTS[index]} items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-card`}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: [0, -14, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
            y: {
              duration: 4 + index * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            },
          }}
        >
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom relative z-10 text-center max-w-3xl mx-auto"
      >
        {badgeText && (
          <motion.div variants={itemVariants} className="inline-flex mb-6">
            <span className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-primary/40"
                animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.18, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
              {badgeText}
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-3"
        >
          {titleLine1}
          {titleLine2 && (
            <span
              className="gradient-text block mt-1 sm:mt-2"
              style={{ textShadow: '0 0 36px hsl(var(--primary) / 0.35)' }}
            >
              {titleLine2}
            </span>
          )}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 mb-5"
        />

        {description && (
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}

        {actions.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
          >
            {actions.map((action, index) => {
              const ActionIcon = action.icon;
              const classes =
                action.variant === 'outline'
                  ? 'inline-flex items-center px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all text-sm'
                  : 'inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 text-sm';

              const content = (
                <>
                  {action.label}
                  {ActionIcon && <ActionIcon className="ml-2 w-4 h-4" />}
                </>
              );

              if (action.to) {
                return (
                  <Link key={index} to={action.to} className={classes}>
                    {content}
                  </Link>
                );
              }

              if (action.onClick) {
                return (
                  <button key={index} type="button" onClick={action.onClick} className={classes}>
                    {content}
                  </button>
                );
              }

              return (
                <a key={index} href={action.href} className={classes}>
                  {content}
                </a>
              );
            })}
          </motion.div>
        )}

        {stats.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 pt-6 border-t border-border/60"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-xl sm:text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;

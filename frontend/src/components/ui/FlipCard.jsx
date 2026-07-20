// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { CheckCircle2, ChevronRight, ListChecks } from "lucide-react";

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className={`group relative w-full min-h-[330px] sm:min-h-[350px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[380px] lg:min-h-[400px]" : ""
//         } ${
//           serviceLayout ? "min-h-[400px] sm:h-[400px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         <div
//           className="absolute inset-0 rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-primary/[0.04] shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] backface-hidden flex flex-col overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_44px_-16px_hsl(var(--primary)/0.35)] group-hover:border-primary/30"
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Subtle dot-grid texture, faded toward the top-right corner */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 opacity-70"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle, hsl(var(--primary) / 0.14) 1px, transparent 1px)",
//               backgroundSize: "16px 16px",
//               maskImage:
//                 "radial-gradient(ellipse 65% 55% at 100% 0%, black 0%, transparent 70%)",
//               WebkitMaskImage:
//                 "radial-gradient(ellipse 65% 55% at 100% 0%, black 0%, transparent 70%)",
//             }}
//           />

//           {/* Decorative hover accents — reused light-green color from "Life at IZONE" */}
//           <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary/25 blur-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-0" />
//           <div className="pointer-events-none absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary/25 blur-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out delay-75 z-0" />

//           <div className="relative z-10 flex-1 flex flex-col p-5 sm:p-6 pb-2">
//             {icon && (
//               <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center flex-shrink-0 ring-1 ring-primary/10 mb-3 transition-all duration-500 group-hover:ring-primary/30 group-hover:from-primary/25 group-hover:to-primary/10">
//                 {icon}
//               </div>
//             )}

//             <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-foreground mb-2">
//               {title}
//             </h3>
//             <span className="block w-9 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-3" />

//             <p className={`text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed ${
//               serviceLayout
//                 ? "min-h-[60px] line-clamp-3"
//                 : desktopComfort
//                   ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
//                   : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
//             }`}>
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="mt-auto pt-2">
//                 <ul className="space-y-1.5 rounded-xl bg-primary/[0.06] border border-primary/10 p-3">
//                   {features.slice(0, 3).map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs sm:text-[0.83rem] text-foreground/80"
//                     >
//                       <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
//                       <span className="line-clamp-1">{f}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <div className="relative z-10 flex items-center justify-end gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-primary text-xs font-semibold">
//             Click to flip
//             <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
//               <ChevronRight className="w-3 h-3" />
//             </span>
//           </div>
//         </div>

//         {/* Back */}
//         <div
//           className="absolute inset-0 rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-primary/[0.05] shadow-[0_10px_34px_-12px_hsl(var(--primary)/0.3)] backface-hidden flex flex-col overflow-hidden"
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           <div
//             className="flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-5 sm:p-6 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
//               {title}
//             </h3>
//             <span className="block w-9 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-3" />
//             <p
//               className={`text-muted-foreground text-sm leading-relaxed ${
//                 serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
//               }`}
//             >
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div className={serviceLayout ? "mt-4" : ""}>
//                 <h4 className="flex items-center gap-1.5 font-semibold text-foreground text-xs uppercase tracking-wide mb-2">
//                   <ListChecks className="w-3.5 h-3.5 text-primary" />
//                   All Features
//                 </h4>
//                 <ul className="space-y-1.5 rounded-xl bg-primary/[0.06] border border-primary/10 p-3">
//                   {features.map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs text-foreground/80"
//                     >
//                       <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
//                       {f}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center justify-end gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-primary text-xs font-semibold">
//             Click to flip back
//             <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center rotate-180">
//               <ChevronRight className="w-3 h-3" />
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;




















































// import { useState, useRef, cloneElement, isValidElement } from "react";
// import { motion, useInView } from "framer-motion";
// import { CheckCircle2, ChevronRight, ListChecks } from "lucide-react";

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className={`group relative w-full min-h-[330px] sm:min-h-[350px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[380px] lg:min-h-[400px]" : ""
//         } ${
//           serviceLayout ? "min-h-[400px] sm:h-[400px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         <div
//           className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/10 bg-gradient-to-br from-card/75 via-card/65 to-primary/[0.08] backdrop-blur-xl shadow-[0_4px_20px_-6px_rgba(0,0,0,0.10),inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.06)] backface-hidden flex flex-col overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015] group-hover:shadow-[0_24px_48px_-16px_hsl(var(--primary)/0.4),inset_0_1px_0_0_rgba(255,255,255,0.5)] dark:group-hover:shadow-[0_24px_48px_-16px_hsl(var(--primary)/0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] group-hover:border-primary/30"
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Soft glass highlight sweep on hover */}
//           <div className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/25 dark:from-white/10 via-transparent to-transparent" />

//           {/* Subtle dot-grid texture, faded toward the top-right corner */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 opacity-70"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle, hsl(var(--primary) / 0.14) 1px, transparent 1px)",
//               backgroundSize: "16px 16px",
//               maskImage:
//                 "radial-gradient(ellipse 65% 55% at 100% 0%, black 0%, transparent 70%)",
//               WebkitMaskImage:
//                 "radial-gradient(ellipse 65% 55% at 100% 0%, black 0%, transparent 70%)",
//             }}
//           />

//           {/* Oversized decorative watermark icon, tucked behind all content */}
//           {icon && isValidElement(icon) && (
//             <div className="pointer-events-none select-none absolute -bottom-7 -right-7 sm:-bottom-9 sm:-right-9 z-0 opacity-[0.07] group-hover:opacity-[0.11] transition-opacity duration-500 rotate-[-6deg]">
//               {cloneElement(icon, {
//                 className: "w-32 h-32 sm:w-40 sm:h-40 text-primary",
//                 strokeWidth: 1.1,
//               })}
//             </div>
//           )}

//           {/* Decorative hover accents — reused light-green color from "Life at IZONE" */}
//           <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary/25 blur-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-0" />
//           <div className="pointer-events-none absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary/25 blur-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out delay-75 z-0" />

//           <div className="relative z-10 flex-1 flex flex-col p-5 sm:p-6 pb-2">
//             {icon && (
//               <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm flex items-center justify-center flex-shrink-0 ring-1 ring-white/40 dark:ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] mb-3 transition-all duration-500 group-hover:ring-primary/30 group-hover:from-primary/30 group-hover:to-primary/10">
//                 {icon}
//               </div>
//             )}

//             <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-foreground mb-2">
//               {title}
//             </h3>
//             <span className="block w-9 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-3" />

//             <p className={`text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed ${
//               serviceLayout
//                 ? "min-h-[60px] line-clamp-3"
//                 : desktopComfort
//                   ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
//                   : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
//             }`}>
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="mt-auto pt-2">
//                 <ul className="space-y-1.5 rounded-xl bg-white/40 dark:bg-white/[0.04] backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] p-3">
//                   {features.slice(0, 3).map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs sm:text-[0.83rem] text-foreground/80"
//                     >
//                       <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
//                       <span className="line-clamp-1">{f}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <div className="relative z-10 flex items-center justify-end gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-primary text-xs font-semibold">
//             Click to flip
//             <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
//               <ChevronRight className="w-3 h-3" />
//             </span>
//           </div>
//         </div>

//         {/* Back */}
//         <div
//           className="absolute inset-0 rounded-2xl border border-primary/20 bg-gradient-to-br from-card/80 via-card/70 to-primary/[0.08] backdrop-blur-xl shadow-[0_10px_34px_-12px_hsl(var(--primary)/0.3),inset_0_1px_0_0_rgba(255,255,255,0.3)] dark:shadow-[0_10px_34px_-12px_hsl(var(--primary)/0.4),inset_0_1px_0_0_rgba(255,255,255,0.06)] backface-hidden flex flex-col overflow-hidden"
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           {icon && isValidElement(icon) && (
//             <div className="pointer-events-none select-none absolute -bottom-7 -right-7 sm:-bottom-9 sm:-right-9 z-0 opacity-[0.05] rotate-[-6deg]">
//               {cloneElement(icon, {
//                 className: "w-32 h-32 sm:w-40 sm:h-40 text-primary",
//                 strokeWidth: 1.1,
//               })}
//             </div>
//           )}
//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-5 sm:p-6 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
//               {title}
//             </h3>
//             <span className="block w-9 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-3" />
//             <p
//               className={`text-muted-foreground text-sm leading-relaxed ${
//                 serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
//               }`}
//             >
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div className={serviceLayout ? "mt-4" : ""}>
//                 <h4 className="flex items-center gap-1.5 font-semibold text-foreground text-xs uppercase tracking-wide mb-2">
//                   <ListChecks className="w-3.5 h-3.5 text-primary" />
//                   All Features
//                 </h4>
//                 <ul className="space-y-1.5 rounded-xl bg-white/40 dark:bg-white/[0.04] backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] p-3">
//                   {features.map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs text-foreground/80"
//                     >
//                       <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
//                       {f}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center justify-end gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-primary text-xs font-semibold">
//             Click to flip back
//             <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center rotate-180">
//               <ChevronRight className="w-3 h-3" />
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;










































// import { useState, useRef, cloneElement, isValidElement } from "react";
// import { motion, useInView } from "framer-motion";
// import { CheckCircle2, ChevronRight, ListChecks } from "lucide-react";

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className={`group relative w-full min-h-[330px] sm:min-h-[350px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[380px] lg:min-h-[400px]" : ""
//         } ${
//           serviceLayout ? "min-h-[400px] sm:h-[400px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         <div
//           className="absolute inset-0 rounded-2xl border border-white/60 dark:border-white/[0.14] bg-gradient-to-br from-white/85 via-primary/[0.05] to-primary/[0.14] dark:from-white/[0.09] dark:via-white/[0.05] dark:to-primary/[0.16] backdrop-blur-xl shadow-[0_10px_30px_-8px_rgba(0,0,0,0.16),inset_0_1px_0_0_rgba(255,255,255,0.55),inset_0_-1px_0_0_hsl(var(--primary)/0.08)] dark:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.09)] backface-hidden flex flex-col overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015] group-hover:shadow-[0_28px_54px_-16px_hsl(var(--primary)/0.45),inset_0_1px_0_0_rgba(255,255,255,0.65)] dark:group-hover:shadow-[0_28px_54px_-16px_hsl(var(--primary)/0.55),inset_0_1px_0_0_rgba(255,255,255,0.14)] group-hover:border-primary/30"
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Soft glass highlight sweep on hover */}
//           <div className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/25 dark:from-white/10 via-transparent to-transparent" />

//           {/* Subtle dot-grid texture, faded toward the top-right corner */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 opacity-70"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle, hsl(var(--primary) / 0.14) 1px, transparent 1px)",
//               backgroundSize: "16px 16px",
//               maskImage:
//                 "radial-gradient(ellipse 65% 55% at 100% 0%, black 0%, transparent 70%)",
//               WebkitMaskImage:
//                 "radial-gradient(ellipse 65% 55% at 100% 0%, black 0%, transparent 70%)",
//             }}
//           />

//           {/* Oversized decorative watermark icon, tucked behind all content */}
//           {icon && isValidElement(icon) && (
//             <div className="pointer-events-none select-none absolute -bottom-7 -right-7 sm:-bottom-9 sm:-right-9 z-0 opacity-[0.07] group-hover:opacity-[0.11] transition-opacity duration-500 rotate-[-6deg]">
//               {cloneElement(icon, {
//                 className: "w-32 h-32 sm:w-40 sm:h-40 text-primary",
//                 strokeWidth: 1.1,
//               })}
//             </div>
//           )}

//           {/* Decorative hover accents — reused light-green color from "Life at IZONE" */}
//           <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary/25 blur-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-0" />
//           <div className="pointer-events-none absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary/25 blur-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out delay-75 z-0" />

//           <div className="relative z-10 flex-1 flex flex-col p-5 sm:p-6 pb-2">
//             {icon && (
//               <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm flex items-center justify-center flex-shrink-0 ring-1 ring-white/60 dark:ring-white/[0.14] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] mb-3 transition-all duration-500 group-hover:ring-primary/30 group-hover:from-primary/30 group-hover:to-primary/10">
//                 {icon}
//               </div>
//             )}

//             <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-foreground mb-2">
//               {title}
//             </h3>
//             <span className="block w-9 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-3" />

//             <p className={`text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed ${
//               serviceLayout
//                 ? "min-h-[60px] line-clamp-3"
//                 : desktopComfort
//                   ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
//                   : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
//             }`}>
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="mt-auto pt-2">
//                 <ul className="space-y-1.5 rounded-xl bg-white/55 dark:bg-white/[0.06] backdrop-blur-sm border border-white/55 dark:border-white/[0.14] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-3">
//                   {features.slice(0, 3).map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs sm:text-[0.83rem] text-foreground/80"
//                     >
//                       <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
//                       <span className="line-clamp-1">{f}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <div className="relative z-10 flex items-center justify-end gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-primary text-xs font-semibold">
//             Click to flip
//             <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
//               <ChevronRight className="w-3 h-3" />
//             </span>
//           </div>
//         </div>

//         {/* Back */}
//         <div
//           className="absolute inset-0 rounded-2xl border border-white/60 dark:border-white/[0.14] bg-gradient-to-br from-white/85 via-primary/[0.06] to-primary/[0.16] dark:from-white/[0.10] dark:via-white/[0.05] dark:to-primary/[0.18] backdrop-blur-xl shadow-[0_14px_40px_-12px_hsl(var(--primary)/0.35),inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_hsl(var(--primary)/0.08)] dark:shadow-[0_14px_40px_-12px_hsl(var(--primary)/0.45),inset_0_1px_0_0_rgba(255,255,255,0.1)] backface-hidden flex flex-col overflow-hidden"
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           {icon && isValidElement(icon) && (
//             <div className="pointer-events-none select-none absolute -bottom-7 -right-7 sm:-bottom-9 sm:-right-9 z-0 opacity-[0.05] rotate-[-6deg]">
//               {cloneElement(icon, {
//                 className: "w-32 h-32 sm:w-40 sm:h-40 text-primary",
//                 strokeWidth: 1.1,
//               })}
//             </div>
//           )}
//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-5 sm:p-6 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
//               {title}
//             </h3>
//             <span className="block w-9 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-3" />
//             <p
//               className={`text-muted-foreground text-sm leading-relaxed ${
//                 serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
//               }`}
//             >
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div className={serviceLayout ? "mt-4" : ""}>
//                 <h4 className="flex items-center gap-1.5 font-semibold text-foreground text-xs uppercase tracking-wide mb-2">
//                   <ListChecks className="w-3.5 h-3.5 text-primary" />
//                   All Features
//                 </h4>
//                 <ul className="space-y-1.5 rounded-xl bg-white/55 dark:bg-white/[0.06] backdrop-blur-sm border border-white/55 dark:border-white/[0.14] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-3">
//                   {features.map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs text-foreground/80"
//                     >
//                       <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
//                       {f}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center justify-end gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-primary text-xs font-semibold">
//             Click to flip back
//             <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center rotate-180">
//               <ChevronRight className="w-3 h-3" />
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;

























// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className={`group relative w-full min-h-[330px] sm:min-h-[350px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[380px] lg:min-h-[400px]" : ""
//         } ${
//           serviceLayout ? "min-h-[400px] sm:h-[400px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         {/* Front */}
//         <div
//           className="absolute inset-0 rounded-2xl border border-primary/[0.15] dark:border-white/[0.08] bg-gradient-to-br from-white to-[#f5fcf8] dark:from-[hsl(222,24%,12%)] dark:to-[hsl(222,26%,9%)] shadow-[0_2px_8px_-2px_rgba(16,24,20,0.06),0_20px_45px_-24px_rgba(16,24,20,0.22),inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_20px_45px_-24px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] backface-hidden flex flex-col overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-primary/30 group-hover:shadow-[0_2px_8px_-2px_rgba(16,24,20,0.08),0_32px_60px_-20px_rgba(16,24,20,0.28),0_0_0_1px_hsl(var(--primary)/0.06),0_0_40px_-8px_hsl(var(--primary)/0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:group-hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_32px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-10px_hsl(var(--primary)/0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Tiny dotted pattern, kept under 10% opacity */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 opacity-[0.09]"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle, hsl(var(--primary) / 0.6) 1px, transparent 1px)",
//               backgroundSize: "16px 16px",
//               maskImage:
//                 "radial-gradient(ellipse 55% 45% at 100% 0%, black 0%, transparent 75%)",
//               WebkitMaskImage:
//                 "radial-gradient(ellipse 55% 45% at 100% 0%, black 0%, transparent 75%)",
//             }}
//           />

//           {/* Small gradient orb, top-right — subtle, under 10% opacity */}
//           <div className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-2xl opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.14] z-0" />

//           <div className="relative z-10 flex-1 flex flex-col p-5 sm:p-6 pb-2">
//             {icon && (
//               <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 mb-4">
//                 {/* Soft glow behind the badge, blooms on hover */}
//                 <div className="absolute -inset-1.5 rounded-full bg-primary/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20 shadow-[0_6px_16px_-6px_hsl(var(--primary)/0.5),inset_0_1px_0_0_rgba(255,255,255,0.6)] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
//                   {icon}
//                 </div>
//               </div>
//             )}

//             <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2 tracking-tight">
//               {title}
//             </h3>
//             <span className="relative block h-1.5 w-9 group-hover:w-14 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)] mb-3 transition-all duration-500 ease-out" />

//             <p className={`text-muted-foreground/90 text-[0.92rem] sm:text-sm leading-relaxed ${
//               serviceLayout
//                 ? "min-h-[60px] line-clamp-3"
//                 : desktopComfort
//                   ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
//                   : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
//             }`}>
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <ul className="mt-auto pt-2 space-y-2">
//                 {features.slice(0, 3).map((f, i) => (
//                   <li
//                     key={i}
//                     className="flex items-center gap-2 text-xs sm:text-[0.83rem] font-medium text-foreground/80"
//                   >
//                     <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
//                     <span className="line-clamp-1">{f}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className="relative z-10 flex items-center justify-end gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-primary text-sm font-semibold">
//             Explore
//             <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </div>
//         </div>

//         {/* Back */}
//         <div
//           className="absolute inset-0 rounded-2xl border border-primary/[0.18] dark:border-white/[0.08] bg-gradient-to-br from-white to-[#f2fbf6] dark:from-[hsl(222,24%,12%)] dark:to-[hsl(222,26%,9%)] shadow-[0_2px_8px_-2px_rgba(16,24,20,0.06),0_20px_45px_-24px_rgba(16,24,20,0.22),inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_20px_45px_-24px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] backface-hidden flex flex-col overflow-hidden"
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           <div className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-2xl opacity-[0.08] z-0" />

//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-5 sm:p-6 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2 tracking-tight">
//               {title}
//             </h3>
//             <span className="block h-1.5 w-9 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)] mb-3" />
//             <p
//               className={`text-muted-foreground/90 text-sm leading-relaxed ${
//                 serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
//               }`}
//             >
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div className={serviceLayout ? "mt-4" : ""}>
//                 <h4 className="font-semibold text-foreground text-xs uppercase tracking-wide mb-2.5">
//                   All Features
//                 </h4>
//                 <ul className="space-y-2">
//                   {features.map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs sm:text-[0.83rem] font-medium text-foreground/80"
//                     >
//                       <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
//                       {f}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center justify-end gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-primary text-sm font-semibold">
//             <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
//             Overview
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;




































// import { useState, useRef, cloneElement, isValidElement } from "react";
// import { motion, useInView } from "framer-motion";
// import { ArrowRight, ArrowLeft } from "lucide-react";

// /**
//  * Per-category accent themes.
//  * Each card can opt into a category accent color via the `accent` prop
//  * (e.g. "blue", "emerald", "purple", "violet", "orange", "pink").
//  * Defaults to "primary" — the core IZONE brand green — so every existing
//  * usage of FlipCard keeps working unchanged unless an accent is supplied.
//  */
// const ACCENT_THEMES = {
//   primary: {
//     iconText: "text-primary",
//     badge: "from-primary/20 via-primary/10 to-primary/5 border-primary/20",
//     badgeGlow: "bg-primary/25",
//     badgeShadow: "shadow-[0_6px_18px_-6px_hsl(var(--primary)/0.55),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
//     line: "bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]",
//     chip: "bg-primary/[0.07] border-primary/[0.15] text-primary",
//     orb: "from-primary/40",
//     cta: "text-primary",
//     border: "border-primary/[0.15]",
//     hoverBorder: "group-hover:border-primary/30",
//     hoverShadow: "group-hover:shadow-[0_2px_8px_-2px_rgba(16,24,20,0.08),0_32px_60px_-20px_rgba(16,24,20,0.28),0_0_40px_-8px_hsl(var(--primary)/0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:group-hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_32px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-10px_hsl(var(--primary)/0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
//   },
//   blue: {
//     iconText: "text-blue-600",
//     badge: "from-blue-500/20 via-blue-500/10 to-blue-500/5 border-blue-500/20",
//     badgeGlow: "bg-blue-500/25",
//     badgeShadow: "shadow-[0_6px_18px_-6px_rgba(59,130,246,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
//     line: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]",
//     chip: "bg-blue-500/[0.07] border-blue-500/[0.15] text-blue-600",
//     orb: "from-blue-500/40",
//     cta: "text-blue-600",
//     border: "border-blue-500/[0.15]",
//     hoverBorder: "group-hover:border-blue-500/30",
//     hoverShadow: "group-hover:shadow-[0_2px_8px_-2px_rgba(16,24,20,0.08),0_32px_60px_-20px_rgba(16,24,20,0.28),0_0_40px_-8px_rgba(59,130,246,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:group-hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_32px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(59,130,246,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
//   },
//   emerald: {
//     iconText: "text-emerald-600",
//     badge: "from-emerald-500/20 via-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
//     badgeGlow: "bg-emerald-500/25",
//     badgeShadow: "shadow-[0_6px_18px_-6px_rgba(16,185,129,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
//     line: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]",
//     chip: "bg-emerald-500/[0.07] border-emerald-500/[0.15] text-emerald-600",
//     orb: "from-emerald-500/40",
//     cta: "text-emerald-600",
//     border: "border-emerald-500/[0.15]",
//     hoverBorder: "group-hover:border-emerald-500/30",
//     hoverShadow: "group-hover:shadow-[0_2px_8px_-2px_rgba(16,24,20,0.08),0_32px_60px_-20px_rgba(16,24,20,0.28),0_0_40px_-8px_rgba(16,185,129,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:group-hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_32px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(16,185,129,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
//   },
//   purple: {
//     iconText: "text-purple-600",
//     badge: "from-purple-500/20 via-purple-500/10 to-purple-500/5 border-purple-500/20",
//     badgeGlow: "bg-purple-500/25",
//     badgeShadow: "shadow-[0_6px_18px_-6px_rgba(168,85,247,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
//     line: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]",
//     chip: "bg-purple-500/[0.07] border-purple-500/[0.15] text-purple-600",
//     orb: "from-purple-500/40",
//     cta: "text-purple-600",
//     border: "border-purple-500/[0.15]",
//     hoverBorder: "group-hover:border-purple-500/30",
//     hoverShadow: "group-hover:shadow-[0_2px_8px_-2px_rgba(16,24,20,0.08),0_32px_60px_-20px_rgba(16,24,20,0.28),0_0_40px_-8px_rgba(168,85,247,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:group-hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_32px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(168,85,247,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
//   },
//   violet: {
//     iconText: "text-violet-600",
//     badge: "from-violet-500/20 via-violet-500/10 to-violet-500/5 border-violet-500/20",
//     badgeGlow: "bg-violet-500/25",
//     badgeShadow: "shadow-[0_6px_18px_-6px_rgba(139,92,246,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
//     line: "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]",
//     chip: "bg-violet-500/[0.07] border-violet-500/[0.15] text-violet-600",
//     orb: "from-violet-500/40",
//     cta: "text-violet-600",
//     border: "border-violet-500/[0.15]",
//     hoverBorder: "group-hover:border-violet-500/30",
//     hoverShadow: "group-hover:shadow-[0_2px_8px_-2px_rgba(16,24,20,0.08),0_32px_60px_-20px_rgba(16,24,20,0.28),0_0_40px_-8px_rgba(139,92,246,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:group-hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_32px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(139,92,246,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
//   },
//   orange: {
//     iconText: "text-orange-600",
//     badge: "from-orange-500/20 via-orange-500/10 to-orange-500/5 border-orange-500/20",
//     badgeGlow: "bg-orange-500/25",
//     badgeShadow: "shadow-[0_6px_18px_-6px_rgba(249,115,22,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
//     line: "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]",
//     chip: "bg-orange-500/[0.07] border-orange-500/[0.15] text-orange-600",
//     orb: "from-orange-500/40",
//     cta: "text-orange-600",
//     border: "border-orange-500/[0.15]",
//     hoverBorder: "group-hover:border-orange-500/30",
//     hoverShadow: "group-hover:shadow-[0_2px_8px_-2px_rgba(16,24,20,0.08),0_32px_60px_-20px_rgba(16,24,20,0.28),0_0_40px_-8px_rgba(249,115,22,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:group-hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_32px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(249,115,22,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
//   },
//   pink: {
//     iconText: "text-pink-600",
//     badge: "from-pink-500/20 via-pink-500/10 to-pink-500/5 border-pink-500/20",
//     badgeGlow: "bg-pink-500/25",
//     badgeShadow: "shadow-[0_6px_18px_-6px_rgba(236,72,153,0.55),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
//     line: "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)]",
//     chip: "bg-pink-500/[0.07] border-pink-500/[0.15] text-pink-600",
//     orb: "from-pink-500/40",
//     cta: "text-pink-600",
//     border: "border-pink-500/[0.15]",
//     hoverBorder: "group-hover:border-pink-500/30",
//     hoverShadow: "group-hover:shadow-[0_2px_8px_-2px_rgba(16,24,20,0.08),0_32px_60px_-20px_rgba(16,24,20,0.28),0_0_40px_-8px_rgba(236,72,153,0.35),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:group-hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_32px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-10px_rgba(236,72,153,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
//   },
// };

// export function FlipCard({
//   title,
//   category,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
//   accent = "primary",
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const theme = ACCENT_THEMES[accent] || ACCENT_THEMES.primary;

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   const themedIcon =
//     icon && isValidElement(icon)
//       ? cloneElement(icon, { className: `w-7 h-7 ${theme.iconText}` })
//       : icon;

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className={`group relative w-full min-h-[330px] sm:min-h-[350px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[380px] lg:min-h-[400px]" : ""
//         } ${
//           serviceLayout ? "min-h-[400px] sm:h-[400px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         {/* Front */}
//         <div
//           className={`absolute inset-0 rounded-2xl border ${theme.border} dark:border-white/[0.08] bg-gradient-to-br from-white via-white to-[#f5fcf8] dark:from-[hsl(222,24%,12%)] dark:to-[hsl(222,26%,9%)] shadow-[0_2px_8px_-2px_rgba(16,24,20,0.06),0_20px_45px_-24px_rgba(16,24,20,0.22),inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_20px_45px_-24px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] backface-hidden flex flex-col overflow-hidden transition-all duration-[350ms] ease-out group-hover:-translate-y-2 ${theme.hoverBorder} ${theme.hoverShadow}`}
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Tiny dotted pattern — kept under 8% opacity */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 opacity-[0.07]"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle, currentColor 1px, transparent 1px)",
//               backgroundSize: "16px 16px",
//               color: "hsl(var(--foreground))",
//               maskImage:
//                 "radial-gradient(ellipse 55% 45% at 100% 0%, black 0%, transparent 75%)",
//               WebkitMaskImage:
//                 "radial-gradient(ellipse 55% 45% at 100% 0%, black 0%, transparent 75%)",
//             }}
//           />

//           {/* Corner glow orb — subtle, under 8% opacity */}
//           <div className={`pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${theme.orb} to-transparent blur-2xl opacity-[0.07] transition-opacity duration-[350ms] group-hover:opacity-[0.13] z-0`} />

//           <div className="relative z-10 flex-1 flex flex-col p-5 sm:p-6 pb-2">
//             {icon && (
//               <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 mb-4">
//                 {/* Soft glow behind the badge, blooms on hover */}
//                 <div className={`absolute -inset-1.5 rounded-full ${theme.badgeGlow} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]`} />
//                 <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${theme.badge} border ${theme.badgeShadow} flex items-center justify-center transition-transform duration-[350ms] ease-out group-hover:scale-110`}>
//                   {themedIcon}
//                 </div>
//               </div>
//             )}

//             {category && (
//               <span className={`text-[11px] font-semibold uppercase tracking-wide ${theme.cta} mb-1.5`}>
//                 {category}
//               </span>
//             )}

//             <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-foreground mb-2 tracking-tight">
//               {title}
//             </h3>
//             <span className={`relative block h-1.5 w-9 group-hover:w-14 rounded-full ${theme.line} mb-3 transition-all duration-[350ms] ease-out`} />

//             <p className={`text-muted-foreground/90 text-[0.92rem] sm:text-sm leading-relaxed ${
//               serviceLayout
//                 ? "min-h-[60px] line-clamp-3"
//                 : desktopComfort
//                   ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
//                   : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
//             }`}>
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
//                 {features.slice(0, 4).map((f, i) => (
//                   <span
//                     key={i}
//                     className={`text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full border ${theme.chip} whitespace-nowrap`}
//                   >
//                     {f}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="relative z-10 px-5 sm:px-6 pb-5 sm:pb-6 pt-3">
//             <div className="h-px w-full bg-border/60 mb-3" />
//             <div className={`flex items-center gap-1.5 text-sm font-semibold ${theme.cta}`}>
//               Learn More
//               <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
//             </div>
//           </div>
//         </div>

//         {/* Back */}
//         <div
//           className={`absolute inset-0 rounded-2xl border ${theme.border} dark:border-white/[0.08] bg-gradient-to-br from-white via-white to-[#f2fbf6] dark:from-[hsl(222,24%,12%)] dark:to-[hsl(222,26%,9%)] shadow-[0_2px_8px_-2px_rgba(16,24,20,0.06),0_20px_45px_-24px_rgba(16,24,20,0.22),inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_20px_45px_-24px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           <div className={`pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${theme.orb} to-transparent blur-2xl opacity-[0.07] z-0`} />

//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-5 sm:p-6 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             {category && (
//               <span className={`text-[11px] font-semibold uppercase tracking-wide ${theme.cta} mb-1.5 block`}>
//                 {category}
//               </span>
//             )}
//             <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2 tracking-tight">
//               {title}
//             </h3>
//             <span className={`block h-1.5 w-9 rounded-full ${theme.line} mb-3`} />
//             <p
//               className={`text-muted-foreground/90 text-sm leading-relaxed ${
//                 serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
//               }`}
//             >
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div className={serviceLayout ? "mt-4" : ""}>
//                 <h4 className="font-semibold text-foreground text-xs uppercase tracking-wide mb-2.5">
//                   All Features
//                 </h4>
//                 <div className="flex flex-wrap gap-1.5">
//                   {features.map((f, i) => (
//                     <span
//                       key={i}
//                       className={`text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full border ${theme.chip} whitespace-nowrap`}
//                     >
//                       {f}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 px-5 sm:px-6 pb-5 sm:pb-6 pt-3">
//             <div className="h-px w-full bg-border/60 mb-3" />
//             <div className={`flex items-center gap-1.5 text-sm font-semibold ${theme.cta}`}>
//               <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
//               Back
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;









































// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { ArrowRight, RotateCcw } from "lucide-react";
// import { getAccent } from "../../lib/accentColors";

// // Subtle dotted-grid decoration used in the corner of every card face.
// function DotGrid({ className = "" }) {
//   return (
//     <svg
//       className={`pointer-events-none absolute w-24 h-24 opacity-[0.08] ${className}`}
//       viewBox="0 0 96 96"
//       fill="none"
//     >
//       {Array.from({ length: 6 }).map((_, row) =>
//         Array.from({ length: 6 }).map((_, col) => (
//           <circle
//             key={`${row}-${col}`}
//             cx={8 + col * 16}
//             cy={8 + row * 16}
//             r="1.6"
//             fill="currentColor"
//           />
//         ))
//       )}
//     </svg>
//   );
// }

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
//   accent = "green",
//   category,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const c = getAccent(accent);

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className={`group relative w-full min-h-[330px] sm:min-h-[350px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[380px] lg:min-h-[400px]" : ""
//         } ${
//           serviceLayout ? "min-h-[400px] sm:h-[400px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         {/* ---------- FRONT ---------- */}
//         <div
//           className={`absolute inset-0 rounded-[26px] border border-white/60 dark:border-zinc-800/60 bg-gradient-to-b from-white/90 to-slate-50/70 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] group-hover:shadow-[0_20px_45px_-15px_rgba(15,23,42,0.22)] group-hover:-translate-y-1.5 ${c.hoverBorder} transition-all duration-300 ease-out backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Decorative corner elements */}
//           <DotGrid className={`top-4 right-4 ${c.icon}`} />
//           <div
//             className={`pointer-events-none absolute -bottom-10 -left-10 w-36 h-36 rounded-full ${c.blob} blur-3xl opacity-0 group-hover:opacity-[0.12] scale-75 group-hover:scale-100 transition-all duration-500 ease-out`}
//           />

//           <div className="relative z-10 flex-1 p-5 sm:p-6 pb-2">
//             <div className="flex items-start justify-between gap-3 mb-4">
//               {icon && (
//                 <div
//                   className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.badge} ${c.badgeRing} ${c.badgeGlow} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 ease-out`}
//                 >
//                   <span className={c.icon}>{icon}</span>
//                 </div>
//               )}
//             </div>

//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}

//             <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-foreground mb-2">
//               {title}
//             </h3>
//             <span
//               className={`block h-[3px] w-8 rounded-full ${c.underline} mb-3 group-hover:w-14 transition-all duration-300 ease-out`}
//             />

//             <p
//               className={`text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed ${
//                 serviceLayout
//                   ? "min-h-[60px] line-clamp-3"
//                   : desktopComfort
//                     ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
//                     : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
//               }`}
//             >
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="flex flex-wrap gap-1.5 mt-4">
//                 {features.slice(0, 3).map((f, i) => (
//                   <span
//                     key={i}
//                     className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${c.tag}`}
//                   >
//                     {f}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="relative z-10 flex items-center justify-end gap-2 px-5 pb-5 sm:px-6 sm:pb-6">
//             <span className={`text-xs font-semibold ${c.link}`}>View Details</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-colors duration-300`}
//             >
//               <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
//             </span>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div
//           className={`absolute inset-0 rounded-[26px] border border-white/60 dark:border-zinc-800/60 bg-gradient-to-b from-white/90 to-slate-50/70 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           <DotGrid className={`top-4 right-4 ${c.icon}`} />

//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-6 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}
//             <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
//               {title}
//             </h3>
//             <span className={`block h-[3px] w-8 rounded-full ${c.underline} mb-3`} />
//             <p
//               className={`text-muted-foreground text-sm leading-relaxed ${
//                 serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
//               }`}
//             >
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div className={serviceLayout ? "mt-4" : ""}>
//                 <h4 className="font-semibold text-foreground text-sm mb-2.5">
//                   All Features
//                 </h4>
//                 <div className="flex flex-wrap gap-1.5">
//                   {features.map((f, i) => (
//                     <span
//                       key={i}
//                       className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${c.tag}`}
//                     >
//                       {f}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center justify-end gap-2 px-6 pb-6">
//             <span className={`text-xs font-semibold ${c.link}`}>Flip Back</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-colors duration-300`}
//             >
//               <RotateCcw className="w-3.5 h-3.5 text-white" />
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;







































// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { ArrowRight, RotateCcw } from "lucide-react";
// import { getAccent } from "../../lib/accentColors";
// import { HexBadge, DotGrid, AbstractCorner } from "./ServiceCardDecor";

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
//   accent = "green",
//   category,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const c = getAccent(accent);

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className={`group relative w-full min-h-[360px] sm:min-h-[380px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[400px] lg:min-h-[420px]" : ""
//         } ${
//           serviceLayout ? "min-h-[420px] sm:h-[420px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         {/* ---------- FRONT ---------- */}
//         <div
//           className={`absolute inset-0 rounded-[28px] border border-white/70 dark:border-zinc-800/60 bg-gradient-to-b from-white to-slate-50/60 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_10px_34px_-14px_rgba(15,23,42,0.16)] group-hover:shadow-[0_24px_50px_-16px_rgba(15,23,42,0.24)] group-hover:-translate-y-2 ${c.hoverBorder} transition-all duration-300 ease-out backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Decorative corner elements */}
//           <DotGrid className={`top-6 right-6 ${c.icon}`} />
//           <AbstractCorner className={`bottom-0 right-0 translate-x-8 translate-y-8 ${c.icon}`} />

//           <div className="relative z-10 flex-1 p-6 sm:p-7 pb-2">
//             {icon && <HexBadge icon={icon} accent={c} className="mb-5" />}

//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}

//             <h3 className="font-display text-xl sm:text-[1.35rem] font-bold leading-tight text-foreground mb-2.5">
//               {title}
//             </h3>
//             <span
//               className={`block h-[3px] w-9 rounded-full ${c.underline} mb-3.5 group-hover:w-16 transition-all duration-300 ease-out`}
//             />

//             <p
//               className={`text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed ${
//                 serviceLayout
//                   ? "min-h-[60px] line-clamp-3"
//                   : desktopComfort
//                     ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
//                     : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
//               }`}
//             >
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-5">
//                 {features.slice(0, 3).map((f, i) => (
//                   <span
//                     key={i}
//                     className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border ${c.tag}`}
//                   >
//                     {f}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="relative z-10 flex items-center gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
//             <span className={`text-sm font-bold ${c.link}`}>View Details</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5`}
//             >
//               <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
//             </span>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div
//           className={`absolute inset-0 rounded-[28px] border border-white/70 dark:border-zinc-800/60 bg-gradient-to-b from-white to-slate-50/60 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_10px_34px_-14px_rgba(15,23,42,0.16)] backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           <DotGrid className={`top-6 right-6 ${c.icon}`} />
//           <AbstractCorner className={`bottom-0 right-0 translate-x-8 translate-y-8 ${c.icon}`} />

//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-6 sm:p-7 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}
//             <h3 className="font-display text-xl sm:text-[1.35rem] font-bold text-foreground mb-2.5">
//               {title}
//             </h3>
//             <span className={`block h-[3px] w-9 rounded-full ${c.underline} mb-3.5`} />
//             <p
//               className={`text-muted-foreground text-sm leading-relaxed ${
//                 serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
//               }`}
//             >
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div className={serviceLayout ? "mt-4" : ""}>
//                 <h4 className="font-semibold text-foreground text-sm mb-2.5">
//                   All Features
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {features.map((f, i) => (
//                     <span
//                       key={i}
//                       className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border ${c.tag}`}
//                     >
//                       {f}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
//             <span className={`text-sm font-bold ${c.link}`}>Flip Back</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-colors duration-300`}
//             >
//               <RotateCcw className="w-3.5 h-3.5 text-white" />
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;





























// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { ArrowRight, RotateCcw } from "lucide-react";
// import { getAccent } from "../../lib/accentColors";
// import { HexBadge, DotGrid, AbstractCorner, TagPill } from "./ServiceCardDecor";

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
//   accent = "green",
//   category,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const c = getAccent(accent);

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className={`group relative w-full min-h-[360px] sm:min-h-[380px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[400px] lg:min-h-[420px]" : ""
//         } ${
//           serviceLayout ? "min-h-[420px] sm:h-[420px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         {/* ---------- FRONT ---------- */}
//         <div
//           className={`absolute inset-0 rounded-[28px] border border-white/70 dark:border-zinc-800/60 bg-gradient-to-b from-white to-slate-50/60 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_10px_34px_-14px_rgba(15,23,42,0.16)] group-hover:shadow-[0_24px_50px_-16px_rgba(15,23,42,0.24)] group-hover:-translate-y-2 ${c.hoverBorder} transition-all duration-300 ease-out backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Decorative corner elements */}
//           <DotGrid className={`top-6 right-6 ${c.icon}`} />
//           <AbstractCorner accentKey={accent} className={`bottom-0 right-0 translate-x-8 translate-y-8 ${c.icon}`} />

//           <div className="relative z-10 flex-1 p-6 sm:p-7 pb-2">
//             {icon && <HexBadge icon={icon} accent={c} className="mb-5" />}

//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}

//             <h3 className="font-display text-xl sm:text-[1.35rem] font-bold leading-tight text-foreground mb-2.5">
//               {title}
//             </h3>
//             <span
//               className={`block h-[3px] w-9 rounded-full ${c.underline} mb-3.5 group-hover:w-16 transition-all duration-300 ease-out`}
//             />

//             <p
//               className={`text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed ${
//                 serviceLayout
//                   ? "min-h-[60px] line-clamp-3"
//                   : desktopComfort
//                     ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
//                     : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
//               }`}
//             >
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-5">
//                 {features.slice(0, 3).map((f, i) => (
//                   <TagPill key={i} text={f} accent={c} />
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="relative z-10 flex items-center gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
//             <span className={`text-sm font-bold ${c.link}`}>View Details</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5`}
//             >
//               <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
//             </span>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div
//           className={`absolute inset-0 rounded-[28px] border border-white/70 dark:border-zinc-800/60 bg-gradient-to-b from-white to-slate-50/60 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_10px_34px_-14px_rgba(15,23,42,0.16)] backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           <DotGrid className={`top-6 right-6 ${c.icon}`} />
//           <AbstractCorner accentKey={accent} className={`bottom-0 right-0 translate-x-8 translate-y-8 ${c.icon}`} />

//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-6 sm:p-7 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}
//             <h3 className="font-display text-xl sm:text-[1.35rem] font-bold text-foreground mb-2.5">
//               {title}
//             </h3>
//             <span className={`block h-[3px] w-9 rounded-full ${c.underline} mb-3.5`} />
//             <p
//               className={`text-muted-foreground text-sm leading-relaxed ${
//                 serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
//               }`}
//             >
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div className={serviceLayout ? "mt-4" : ""}>
//                 <h4 className="font-semibold text-foreground text-sm mb-2.5">
//                   All Features
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {features.map((f, i) => (
//                     <TagPill key={i} text={f} accent={c} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
//             <span className={`text-sm font-bold ${c.link}`}>Flip Back</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-colors duration-300`}
//             >
//               <RotateCcw className="w-3.5 h-3.5 text-white" />
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;









































// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { ArrowRight, RotateCcw } from "lucide-react";
// import { getAccent } from "../../lib/accentColors";
// import { HexBadge, DotGrid, AbstractCorner, TagPill } from "./ServiceCardDecor";

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
//   accent = "green",
//   category,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const c = getAccent(accent);

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full h-full"
//     >
//       <motion.div
//         className={`group relative grid w-full h-full min-h-[360px] sm:min-h-[380px] cursor-pointer touch-pan-y ${
//           desktopComfort ? "md:min-h-[400px] lg:min-h-[420px]" : ""
//         } ${
//           serviceLayout ? "sm:min-h-[420px]" : ""
//         }`}
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         {/* ---------- FRONT ---------- */}
//         <div
//           className={`col-start-1 row-start-1 w-full h-full rounded-[28px] border border-white/70 dark:border-zinc-800/60 bg-gradient-to-b from-white to-slate-50/60 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_10px_34px_-14px_rgba(15,23,42,0.16)] group-hover:shadow-[0_24px_50px_-16px_rgba(15,23,42,0.24)] group-hover:-translate-y-2 ${c.hoverBorder} transition-all duration-300 ease-out backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Decorative corner elements */}
//           <DotGrid className={`top-6 right-6 ${c.icon}`} />
//           <AbstractCorner accentKey={accent} className={`bottom-0 right-0 translate-x-8 translate-y-8 ${c.icon}`} />

//           <div className="relative z-10 flex-1 p-6 sm:p-7 pb-2">
//             {icon && <HexBadge icon={icon} accent={c} className="mb-5" />}

//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}

//             <h3 className="font-display text-xl sm:text-[1.35rem] font-bold leading-tight text-foreground mb-2.5">
//               {title}
//             </h3>
//             <span
//               className={`block h-[3px] w-9 rounded-full ${c.underline} mb-3.5 group-hover:w-16 transition-all duration-300 ease-out`}
//             />

//             <p
//               className="text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed mb-4"
//             >
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-5">
//                 {features.slice(0, 3).map((f, i) => (
//                   <TagPill key={i} text={f} accent={c} />
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="relative z-10 flex items-center gap-2 px-6 pb-6 sm:px-7 sm:pb-7 mt-auto">
//             <span className={`text-sm font-bold ${c.link}`}>View Details</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5`}
//             >
//               <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
//             </span>
//           </div>
//         </div>

//         {/* ---------- BACK ---------- */}
//         <div
//           className={`col-start-1 row-start-1 w-full h-full rounded-[28px] border border-white/70 dark:border-zinc-800/60 bg-gradient-to-b from-white to-slate-50/60 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_10px_34px_-14px_rgba(15,23,42,0.16)] backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           <DotGrid className={`top-6 right-6 ${c.icon}`} />
//           <AbstractCorner accentKey={accent} className={`bottom-0 right-0 translate-x-8 translate-y-8 ${c.icon}`} />

//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-6 sm:p-7 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}
//             <h3 className="font-display text-xl sm:text-[1.35rem] font-bold text-foreground mb-2.5">
//               {title}
//             </h3>
//             <span className={`block h-[3px] w-9 rounded-full ${c.underline} mb-3.5`} />
//             <p className="text-muted-foreground text-sm leading-relaxed mb-4">
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div>
//                 <h4 className="font-semibold text-foreground text-sm mb-2.5">
//                   All Features
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {features.map((f, i) => (
//                     <TagPill key={i} text={f} accent={c} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center gap-2 px-6 pb-6 sm:px-7 sm:pb-7 mt-auto">
//             <span className={`text-sm font-bold ${c.link}`}>Flip Back</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-colors duration-300`}
//             >
//               <RotateCcw className="w-3.5 h-3.5 text-white" />
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;

































// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { ArrowRight, RotateCcw } from "lucide-react";
// import { getAccent } from "../../lib/accentColors";
// import { HexBadge, DotGrid, AbstractCorner, TagPill } from "./ServiceCardDecor";

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
//   accent = "green",
//   category,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const c = getAccent(accent);

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className="group relative w-full cursor-pointer touch-pan-y"
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//       >
//         {/* ---------- FRONT (normal flow — its content sets the card's height) ---------- */}
//         <div
//           className={`relative w-full min-h-[300px] rounded-[28px] border border-white/70 dark:border-zinc-800/60 bg-gradient-to-b from-white to-slate-50/60 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_10px_34px_-14px_rgba(15,23,42,0.16)] group-hover:shadow-[0_24px_50px_-16px_rgba(15,23,42,0.24)] group-hover:-translate-y-2 ${c.hoverBorder} transition-all duration-300 ease-out backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden" }}
//         >
//           {/* Decorative corner elements */}
//           <DotGrid className={`top-6 right-6 ${c.icon}`} />
//           <AbstractCorner accentKey={accent} title={title} className={`bottom-0 right-0 translate-x-8 translate-y-8 ${c.icon}`} />

//           <div className="relative z-10 p-6 sm:p-7">
//             {icon && <HexBadge icon={icon} accent={c} className="mb-5" />}

//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}

//             <h3 className="font-display text-xl sm:text-[1.35rem] font-bold leading-tight text-foreground mb-2.5">
//               {title}
//             </h3>
//             <span
//               className={`block h-[3px] w-9 rounded-full ${c.underline} mb-3.5 group-hover:w-16 transition-all duration-300 ease-out`}
//             />

//             <p className="text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed mb-4">
//               {summary}
//             </p>

//             {features.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {features.slice(0, 3).map((f, i) => (
//                   <TagPill key={i} text={f} accent={c} />
//                 ))}
//               </div>
//             )}

//             <div className="relative z-10 flex items-center gap-2">
//               <span className={`text-sm font-bold ${c.link}`}>View Details</span>
//               <span
//                 className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5`}
//               >
//                 <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ---------- BACK (overlays the front's box exactly; scrolls if content is longer) ---------- */}
//         <div
//           className={`absolute inset-0 w-full h-full rounded-[28px] border border-white/70 dark:border-zinc-800/60 bg-gradient-to-b from-white to-slate-50/60 dark:from-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-md shadow-[0_10px_34px_-14px_rgba(15,23,42,0.16)] backface-hidden flex flex-col overflow-hidden`}
//           style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
//         >
//           <DotGrid className={`top-6 right-6 ${c.icon}`} />
//           <AbstractCorner accentKey={accent} title={title} className={`bottom-0 right-0 translate-x-8 translate-y-8 ${c.icon}`} />

//           <div
//             className="relative z-10 flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-6 sm:p-7 pb-2"
//             style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
//           >
//             {category && (
//               <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.label} mb-1.5`}>
//                 {category}
//               </p>
//             )}
//             <h3 className="font-display text-xl sm:text-[1.35rem] font-bold text-foreground mb-2.5">
//               {title}
//             </h3>
//             <span className={`block h-[3px] w-9 rounded-full ${c.underline} mb-3.5`} />
//             <p className="text-muted-foreground text-sm leading-relaxed mb-4">
//               {fullContent}
//             </p>
//             {features.length > 0 && (
//               <div>
//                 <h4 className="font-semibold text-foreground text-sm mb-2.5">
//                   All Features
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {features.map((f, i) => (
//                     <TagPill key={i} text={f} accent={c} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="relative z-10 flex items-center gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
//             <span className={`text-sm font-bold ${c.link}`}>Flip Back</span>
//             <span
//               className={`w-7 h-7 rounded-full ${c.arrow} flex items-center justify-center transition-colors duration-300`}
//             >
//               <RotateCcw className="w-3.5 h-3.5 text-white" />
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;
























// import React, { useState, useRef, isValidElement, cloneElement } from "react";
// import { motion, useInView } from "framer-motion";
// import { 
//   Code2, Terminal, Smartphone, BrainCircuit, 
//   Building2, Megaphone, ArrowRight, BookOpen,
//   Vote, Sparkles, Monitor, BarChart3,
//   Cloud, Shield, Rocket, Zap, Store, SearchCheck, 
//   FileCheck2, Landmark, Users, Share2, PenLine, 
//   Pen, Files, Layout, Printer, Image, Phone, 
//   Mic, Volume2, Radio, MessageCircle, LayoutDashboard, MapPin,
//   Palette, ShieldCheck, Newspaper,
//   Settings, Headphones, Database, Bot, LineChart, Briefcase, TrendingUp, Search, Mail,
//   Target, MessageSquare
// } from 'lucide-react';
// import {
//   FaReact, FaJava, FaPaintBrush, FaRegEye, FaSearch, 
//   FaFileAlt, FaShieldAlt, FaGlobe, FaShareAlt, FaBullseye, FaPenNib,
//   FaRegCommentAlt, FaMobileAlt, FaPhone, FaWhatsapp, FaVoteYea
// } from "react-icons/fa";
// import {
//   SiNextdotjs, SiVuedotjs, SiTypescript, SiFlutter, SiSpringboot, SiDotnet,
//   SiTensorflow, SiPytorch, SiElectron
// } from "react-icons/si";

// // Helper function to convert Hex to RGBA for custom glows
// const hexToRgba = (hex, opacity) => {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };

// // Pointy-topped rounded hexagon SVG path for all three layers
// const pathD = "M 45 7.8 Q 50 5 55 7.8 L 84.7 25 Q 89 27.5 89 32.5 L 89 67.5 Q 89 72.5 84.7 75 L 55 92.2 Q 50 95 45 92.2 L 15.3 75 Q 11 72.5 11 67.5 L 11 32.5 Q 11 27.5 15.3 25 Z";

// const StackedHexagon = ({ icon: Icon, accentColor }) => {
//   return (
//     <div className="relative w-20 h-20 mb-5">
//       {/* Background shape 1 (furthest shadow shifted up and to the right) */}
//       <svg 
//         className="absolute w-16 h-16 opacity-[0.20] translate-x-[14px] -translate-y-[10px] transition-transform duration-500 group-hover:translate-x-[16px] group-hover:-translate-y-[12px]" 
//         viewBox="0 0 100 100" 
//         fill={accentColor}
//       >
//         <path d={pathD} />
//       </svg>
      
//       {/* Background shape 2 (middle shadow shifted up and to the right) */}
//       <svg 
//         className="absolute w-16 h-16 opacity-[0.30] translate-x-[7px] -translate-y-[5px] transition-transform duration-500 group-hover:translate-x-[8px] group-hover:-translate-y-[6px]" 
//         viewBox="0 0 100 100" 
//         fill={accentColor}
//       >
//         <path d={pathD} />
//       </svg>

//       {/* Front main hexagon shape (white background with solid icon) */}
//       <div 
//         className="absolute w-16 h-16 flex items-center justify-center transition-transform duration-500 group-hover:-translate-x-[1px] group-hover:translate-y-[1px]"
//       >
//         <svg 
//           className="absolute inset-0 w-full h-full drop-shadow-md" 
//           viewBox="0 0 100 100" 
//           fill="currentColor"
//           style={{ color: 'white' }}
//         >
//           <path 
//             d={pathD} 
//             stroke={accentColor} 
//             strokeWidth="3.5" 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//           />
//         </svg>
        
//         {/* Icon Container */}
//         <div className="relative z-10 flex items-center justify-center" style={{ color: accentColor }}>
//           {isValidElement(Icon) ? (
//             cloneElement(Icon, { className: "w-6 h-6" })
//           ) : Icon ? (
//             <Icon className="w-6 h-6" />
//           ) : (
//             <Sparkles className="w-6 h-6" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Card-Specific Unique Background Illustrations (Scaled down by 15-20% for optimal layout fit)
// const WebBrowserOutline = ({ color }) => (
//   <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.15] pointer-events-none rotate-3" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
//       <rect x="15" y="25" width="75" height="55" rx="8" />
//       <line x1="15" y1="42" x2="90" y2="42" strokeWidth="2" />
//       <circle cx="25" cy="33" r="2.5" className="fill-current" />
//       <circle cx="33" cy="33" r="2.5" className="fill-current" />
//       <circle cx="41" cy="33" r="2.5" className="fill-current" />
      
//       <path d="M 35 58 L 27 63 L 35 68" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M 70 58 L 78 63 L 70 68" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//       <line x1="56" y1="52" x2="49" y2="74" strokeWidth="3" strokeLinecap="round" />
//     </svg>
//   </div>
// );

// const GlobeOutline = ({ color }) => (
//   <div className="absolute -right-12 bottom-[-50px] w-40 h-40 rounded-full border-2 opacity-[0.28] pointer-events-none" style={{ borderColor: color }}>
//     <div className="absolute inset-3 rounded-full border-2 opacity-80" style={{ borderColor: color }} />
//     <div className="absolute inset-6 rounded-full border opacity-60" style={{ borderColor: color }} />
//     <div className="absolute left-1/2 -translate-x-1/2 w-px h-full opacity-60" style={{ backgroundColor: color }} />
//     <div className="absolute top-1/2 -translate-y-1/2 h-px w-full opacity-60" style={{ backgroundColor: color }} />
//     <div className="absolute inset-0 rotate-45 border-t opacity-50" style={{ borderColor: color }} />
//     <div className="absolute inset-0 -rotate-45 border-t opacity-50" style={{ borderColor: color }} />
//   </div>
// );

// const GearOutline = ({ color }) => (
//   <div className="absolute -right-8 bottom-[-40px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
//       <circle cx="50" cy="50" r="18" />
//       <circle cx="50" cy="50" r="30" strokeDasharray="6 3" />
//       {[...Array(8)].map((_, i) => (
//         <g key={i} transform={`rotate(${i * 45} 50 50)`}>
//           <path d="M46 14 h8 v8 h-8 z" />
//         </g>
//       ))}
//     </svg>
//   </div>
// );

// const PhoneOutline = ({ color }) => (
//   <div className="absolute -right-4 bottom-[-65px] w-28 h-44 opacity-[0.28] pointer-events-none rotate-12" style={{ color }}>
//     <svg viewBox="0 0 100 200" className="w-full h-full stroke-current fill-none" strokeWidth="3">
//       <rect x="10" y="10" width="80" height="180" rx="12" />
//       <line x1="30" y1="175" x2="70" y2="175" strokeWidth="3" />
//       <circle cx="50" cy="25" r="4.5" />
//     </svg>
//   </div>
// );

// const NetworkOutline = ({ color }) => (
//   <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
//       <circle cx="20" cy="30" r="4" className="fill-current" />
//       <circle cx="50" cy="20" r="5" className="fill-current" />
//       <circle cx="80" cy="40" r="4" className="fill-current" />
//       <circle cx="40" cy="60" r="6" className="fill-current" />
//       <circle cx="70" cy="70" r="5" className="fill-current" />
//       <circle cx="30" cy="85" r="4" className="fill-current" />
      
//       <line x1="20" y1="30" x2="50" y2="20" />
//       <line x1="50" y1="20" x2="80" y2="40" />
//       <line x1="50" y1="20" x2="40" y2="60" />
//       <line x1="40" y1="60" x2="70" y2="70" />
//       <line x1="80" y1="40" x2="70" y2="70" />
//       <line x1="40" y1="60" x2="30" y2="85" />
//       <line x1="70" y1="70" x2="30" y2="85" />
//     </svg>
//   </div>
// );

// const ShieldOutline = ({ color }) => (
//   <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
//       <path d="M20 20 C40 10 60 10 80 20 C80 50 70 80 50 95 C30 80 20 50 20 20 Z" />
//       <path d="M30 28 C43 20 57 20 70 28 C70 52 62 76 50 87 C38 76 30 52 30 28 Z" strokeDasharray="4 2" />
//     </svg>
//   </div>
// );

// const TargetOutline = ({ color }) => (
//   <div className="absolute -right-8 bottom-[-40px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
//       <circle cx="50" cy="50" r="38" />
//       <circle cx="50" cy="50" r="26" />
//       <circle cx="50" cy="50" r="14" />
//       <circle cx="50" cy="50" r="3.5" className="fill-current" />
//       <line x1="82" y1="18" x2="56" y2="44" strokeWidth="3" />
//       <path d="M76 18 L82 18 L82 24" strokeWidth="3" fill="none" />
//     </svg>
//   </div>
// );

// const DocumentOutline = ({ color }) => (
//   <div className="absolute -right-6 bottom-[-30px] w-36 h-36 opacity-[0.28] pointer-events-none rotate-6" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
//       <path d="M25 15 L65 15 L75 25 L75 85 L25 85 Z" />
//       <path d="M65 15 L65 25 L75 25" />
//       <line x1="35" y1="35" x2="65" y2="35" strokeWidth="2.5" />
//       <line x1="35" y1="48" x2="65" y2="48" strokeWidth="2.5" />
//       <line x1="35" y1="61" x2="55" y2="61" strokeWidth="2.5" />
//       <line x1="35" y1="74" x2="60" y2="74" strokeWidth="2.5" />
//     </svg>
//   </div>
// );

// const DesignOutline = ({ color }) => (
//   <div className="absolute -right-8 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
//       {/* Bezier curve path */}
//       <path d="M 25 75 C 32 40, 38 27, 45 27 C 52 27, 75 35, 85 52" />
      
//       {/* Handlebar line through anchor point */}
//       <line x1="20" y1="37" x2="70" y2="17" strokeWidth="1.5" />
//       <circle cx="20" cy="37" r="3" className="fill-current" />
//       <circle cx="70" cy="17" r="3" className="fill-current" />
      
//       {/* Square anchor points */}
//       <rect x="22" y="72" width="6" height="6" className="fill-current" />
//       <rect x="82" y="49" width="6" height="6" className="fill-current" />
//       <rect x="42" y="24" width="6" height="6" className="fill-current" />

//       {/* Pen Nib pointing at (45,27) */}
//       <g transform="translate(45, 27) rotate(-25) translate(-50, -30)">
//         <path 
//           d="M 50 30 L 44 52 L 46 56 L 44 76 L 56 76 L 54 56 L 56 52 Z" 
//           className="fill-white dark:fill-slate-900" 
//           strokeWidth="2.5"
//         />
//         {/* central slit */}
//         <line x1="50" y1="30" x2="50" y2="58" strokeWidth="2" />
//         {/* breather hole */}
//         <circle cx="50" cy="58" r="2.5" className="fill-current" />
//         {/* base collar line */}
//         <path d="M 45 72 L 55 72" strokeWidth="2" />
//       </g>
//     </svg>
//   </div>
// );

// const renderBackgroundIllustration = (normTitle, color, propIllustration, themeColor) => {
//   const select = (propIllustration || "").toLowerCase().trim();
  
//   if (select === "browser" || select === "webbrowser") return <WebBrowserOutline color={color} />;
//   if (select === "globe") return <GlobeOutline color={color} />;
//   if (select === "gear" || select === "settings") return <GearOutline color={color} />;
//   if (select === "phone" || select === "smartphone") return <PhoneOutline color={color} />;
//   if (select === "network" || select === "brain") return <NetworkOutline color={color} />;
//   if (select === "shield" || select === "security") return <ShieldOutline color={color} />;
//   if (select === "target" || select === "marketing") return <TargetOutline color={color} />;
//   if (select === "document" || select === "writing") return <DocumentOutline color={color} />;
//   if (select === "design" || select === "pen") return <DesignOutline color={color} />;

//   // Title-based detection
//   if (normTitle.includes("web development") || normTitle.includes("browser")) return <WebBrowserOutline color={color} />;
//   if (normTitle.includes("software development") || normTitle.includes("integration") || normTitle.includes("devops") || normTitle.includes("system")) return <GearOutline color={color} />;
//   if (normTitle.includes("app development") || normTitle.includes("phone") || normTitle.includes("mobile") || normTitle.includes("whatsapp")) return <PhoneOutline color={color} />;
//   if (normTitle.includes("ai & ml") || normTitle.includes("artificial intelligence") || normTitle.includes("analytics") || normTitle.includes("consulting") || normTitle.includes("cloud")) return <NetworkOutline color={color} />;
//   if (normTitle.includes("tender") || normTitle.includes("government") || normTitle.includes("security") || normTitle.includes("compliance")) return <ShieldOutline color={color} />;
//   if (normTitle.includes("marketing") || normTitle.includes("social media") || normTitle.includes("campaign") || normTitle.includes("ad")) return <TargetOutline color={color} />;
//   if (normTitle.includes("writing") || normTitle.includes("content") || normTitle.includes("document") || normTitle.includes("sms") || normTitle.includes("deployment")) return <DocumentOutline color={color} />;
//   if (normTitle.includes("design") || normTitle.includes("graphic")) return <DesignOutline color={color} />;
//   if (normTitle.includes("support") || normTitle.includes("maintenance") || normTitle.includes("enterprise") || normTitle.includes("global")) return <GlobeOutline color={color} />;

//   // Theme-based fallback
//   if (themeColor === "blue") return <WebBrowserOutline color={color} />;
//   if (themeColor === "green") return <GearOutline color={color} />;
//   if (themeColor === "purple") return <PhoneOutline color={color} />;
//   if (themeColor === "indigo") return <NetworkOutline color={color} />;
//   if (themeColor === "orange") return <ShieldOutline color={color} />;
//   if (themeColor === "pink") return <TargetOutline color={color} />;

//   return <GlobeOutline color={color} />;
// };

// const colorMap = {
//   blue: {
//     accentColor: "#2563eb",
//     text: "text-blue-600",
//     bg: "bg-blue-50/50 dark:bg-blue-950/20",
//     border: "border-blue-100 dark:border-blue-900/40",
//     iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
//     shadow: "shadow-blue-200/50 dark:shadow-none",
//     btn: "bg-blue-600",
//   },
//   green: {
//     accentColor: "#10b981",
//     text: "text-emerald-600",
//     bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
//     border: "border-emerald-100 dark:border-emerald-900/40",
//     iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
//     shadow: "shadow-emerald-200/50 dark:shadow-none",
//     btn: "bg-emerald-600",
//   },
//   purple: {
//     accentColor: "#7c3aed",
//     text: "text-purple-600",
//     bg: "bg-purple-50/50 dark:bg-purple-950/20",
//     border: "border-purple-100 dark:border-purple-900/40",
//     iconBg: "bg-gradient-to-br from-purple-400 to-purple-600",
//     shadow: "shadow-purple-200/50 dark:shadow-none",
//     btn: "bg-purple-600",
//   },
//   indigo: {
//     accentColor: "#6366f1",
//     text: "text-indigo-600",
//     bg: "bg-indigo-50/50 dark:bg-indigo-950/20",
//     border: "border-indigo-100 dark:border-indigo-900/40",
//     iconBg: "bg-gradient-to-br from-indigo-400 to-indigo-600",
//     shadow: "shadow-indigo-200/50 dark:shadow-none",
//     btn: "bg-indigo-600",
//   },
//   orange: {
//     accentColor: "#ea580c",
//     text: "text-orange-600",
//     bg: "bg-orange-50/50 dark:bg-orange-950/20",
//     border: "border-orange-100 dark:border-orange-900/40",
//     iconBg: "bg-gradient-to-br from-orange-400 to-orange-600",
//     shadow: "shadow-orange-200/50 dark:shadow-none",
//     btn: "bg-orange-600",
//   },
//   pink: {
//     accentColor: "#db2777",
//     text: "text-pink-600",
//     bg: "bg-pink-50/50 dark:bg-pink-950/20",
//     border: "border-pink-100 dark:border-pink-900/40",
//     iconBg: "bg-gradient-to-br from-pink-400 to-pink-600",
//     shadow: "shadow-pink-200/50 dark:shadow-none",
//     btn: "bg-pink-600",
//   },
// };

// // Map card details based on title
// const getCardConfig = (title) => {
//   const norm = title.toLowerCase().trim();

//   // --- Strict Exact Matches first to distinguish main sections from sub-items ---
//   if (norm === "bulk sms") {
//     return { tag: "SMS SERVICES", themeColor: "green", icon: MessageSquare };
//   }
//   if (norm === "voice sms") {
//     return { tag: "VOICE SERVICES", themeColor: "blue", icon: Phone };
//   }
//   if (norm === "whatsapp panel") {
//     return { tag: "WHATSAPP PANEL", themeColor: "purple", icon: MessageCircle };
//   }
//   if (norm === "whatsapp marketing") {
//     return { tag: "WHATSAPP MARKETING", themeColor: "pink", icon: Megaphone };
//   }
//   if (norm === "digital election campaign") {
//     return { tag: "ELECTORAL SERVICES", themeColor: "orange", icon: Vote };
//   }

//   // --- Web Development Cards ---
//   if (norm.includes("custom web development") || norm === "web development") {
//     return { tag: "DEVELOPMENT", themeColor: "blue", icon: Code2 };
//   }
//   if (norm.includes("ui/ux design") && !norm.includes("app")) {
//     return { tag: "DESIGN", themeColor: "purple", icon: Palette };
//   }
//   if (norm.includes("technical consulting")) {
//     return { tag: "CONSULTING", themeColor: "green", icon: Settings };
//   }
//   if (norm.includes("ongoing support")) {
//     return { tag: "SUPPORT", themeColor: "pink", icon: Headphones };
//   }

//   // --- Software Development Cards ---
//   if (norm.includes("custom software solutions") || norm === "software development") {
//     return { tag: "DEVELOPMENT", themeColor: "green", icon: Terminal };
//   }
//   if (norm.includes("enterprise applications")) {
//     return { tag: "ENTERPRISE", themeColor: "indigo", icon: Database };
//   }
//   if (norm.includes("cloud solutions")) {
//     return { tag: "CLOUD", themeColor: "blue", icon: Cloud };
//   }
//   if (norm === "api integration") { // Specific WhatsApp Panel sub-card
//     return { tag: "INTEGRATION", themeColor: "blue", icon: Zap };
//   }
//   if (norm.includes("system integration")) {
//     return { tag: "INTEGRATION", themeColor: "orange", icon: Settings };
//   }
//   if (norm.includes("security & compliance") || norm.includes("responsible ai")) {
//     return { tag: "SECURITY", themeColor: "pink", icon: Shield };
//   }
//   if (norm.includes("devops & deployment") || norm.includes("mlops deployment")) {
//     return { tag: "DEVOPS", themeColor: "purple", icon: Rocket };
//   }

//   // --- App Development Cards ---
//   if (norm.includes("ios app development")) {
//     return { tag: "MOBILE", themeColor: "blue", icon: Smartphone };
//   }
//   if (norm.includes("android app development")) {
//     return { tag: "MOBILE", themeColor: "green", icon: Smartphone };
//   }
//   if (norm.includes("cross-platform") || norm === "app development") {
//     return { tag: "MOBILE", themeColor: "indigo", icon: Smartphone };
//   }
//   if (norm.includes("app ui/ux design")) {
//     return { tag: "DESIGN", themeColor: "purple", icon: Sparkles };
//   }
//   if (norm.includes("app performance")) {
//     return { tag: "PERFORMANCE", themeColor: "orange", icon: Zap };
//   }
//   if (norm.includes("app store launch")) {
//     return { tag: "LAUNCH", themeColor: "pink", icon: Store };
//   }

//   // --- AI & ML Cards ---
//   if (norm.includes("ai strategy") || norm === "ai & ml") {
//     return { tag: "AI SOLUTIONS", themeColor: "indigo", icon: BrainCircuit };
//   }
//   if (norm.includes("machine learning models")) {
//     return { tag: "AI SOLUTIONS", themeColor: "blue", icon: Bot };
//   }
//   if (norm.includes("data engineering")) {
//     return { tag: "DATA", themeColor: "green", icon: Database };
//   }
//   if (norm === "performance analytics") { // Specifically for WhatsApp Marketing page
//     return { tag: "ANALYTICS", themeColor: "indigo", icon: LineChart };
//   }
//   if (norm.includes("analytics & insights") || norm.includes("analytics & reporting")) {
//     return { tag: "ANALYTICS", themeColor: "orange", icon: LineChart };
//   }

//   // --- Government Tenders Cards ---
//   if (norm.includes("minnagam support")) {
//     return { tag: "SUPPORT", themeColor: "green", icon: SearchCheck };
//   }
//   if (norm.includes("documentation support")) {
//     return { tag: "DOCUMENTATION", themeColor: "blue", icon: FileCheck2 };
//   }
//   if (norm.includes("proposal preparation")) {
//     return { tag: "PROPOSAL", themeColor: "purple", icon: Briefcase };
//   }
//   if (norm.includes("portal assistance") || norm === "government tenders") {
//     return { tag: "ASSISTANCE", themeColor: "indigo", icon: Landmark };
//   }
//   if (norm.includes("compliance & risk review")) {
//     return { tag: "COMPLIANCE", themeColor: "orange", icon: Shield };
//   }
//   if (norm.includes("bid management")) {
//     return { tag: "MANAGEMENT", themeColor: "pink", icon: Users };
//   }

//   // --- Social Media Marketing Cards ---
//   if (norm.includes("social media strategy") || norm === "social media marketing") {
//     return { tag: "MARKETING", themeColor: "pink", icon: Megaphone };
//   }
//   if (norm.includes("content creation") || norm.includes("creative content")) {
//     return { tag: "CREATIVE", themeColor: "purple", icon: Share2 };
//   }
//   if (norm.includes("community management")) {
//     return { tag: "ENGAGEMENT", themeColor: "green", icon: Users };
//   }
//   if (norm.includes("customer engagement")) { // WhatsApp Marketing sub-card
//     return { tag: "ENGAGEMENT", themeColor: "purple", icon: Users };
//   }
//   if (norm.includes("paid advertising")) {
//     return { tag: "CAMPAIGNS", themeColor: "orange", icon: TrendingUp };
//   }
//   if (norm.includes("marketing campaigns")) { // WhatsApp Marketing sub-card
//     return { tag: "CAMPAIGNS", themeColor: "pink", icon: Megaphone };
//   }
//   if (norm.includes("influencer marketing")) {
//     return { tag: "GROWTH", themeColor: "blue", icon: Users };
//   }
//   if (norm.includes("growth strategies")) { // WhatsApp Marketing sub-card
//     return { tag: "GROWTH", themeColor: "green", icon: TrendingUp };
//   }
//   if (norm === "targeted messaging") { // WhatsApp Marketing sub-card
//     return { tag: "TARGETED", themeColor: "blue", icon: Target };
//   }

//   // --- Content Writing Cards ---
//   if (norm.includes("blog writing")) {
//     return { tag: "CONTENT", themeColor: "blue", icon: BookOpen };
//   }
//   if (norm.includes("website copywriting") || norm === "content writing") {
//     return { tag: "CONTENT", themeColor: "green", icon: PenLine };
//   }
//   if (norm.includes("seo content")) {
//     return { tag: "SEO", themeColor: "indigo", icon: Search };
//   }
//   if (norm.includes("email marketing")) {
//     return { tag: "MARKETING", themeColor: "pink", icon: Mail };
//   }
//   if (norm.includes("technical writing")) {
//     return { tag: "TECHNICAL", themeColor: "purple", icon: BookOpen };
//   }
//   if (norm.includes("press releases")) {
//     return { tag: "PRESS", themeColor: "orange", icon: Newspaper };
//   }

//   // --- Graphics Designer Cards ---
//   if (norm.includes("logo & branding") || norm === "graphics designer") {
//     return { tag: "DESIGN", themeColor: "purple", icon: Pen };
//   }
//   if (norm.includes("social media design")) {
//     return { tag: "DESIGN", themeColor: "pink", icon: Share2 };
//   }
//   if (norm.includes("marketing collateral")) {
//     return { tag: "DESIGN", themeColor: "blue", icon: Files };
//   }
//   if (norm.includes("ui/ux assets")) {
//     return { tag: "DESIGN", themeColor: "indigo", icon: Layout };
//   }
//   if (norm.includes("print design")) {
//     return { tag: "DESIGN", themeColor: "orange", icon: Printer };
//   }
//   if (norm.includes("illustrations")) {
//     return { tag: "DESIGN", themeColor: "green", icon: Image };
//   }

//   // --- Bulk SMS Sub-Cards ---
//   if (norm.includes("transactional sms")) {
//     return { tag: "SMS", themeColor: "blue", icon: MessageSquare };
//   }
//   if (norm.includes("promotional sms")) {
//     return { tag: "SMS", themeColor: "green", icon: Megaphone };
//   }
//   if (norm.includes("otp sms")) {
//     return { tag: "SMS", themeColor: "indigo", icon: Shield };
//   }
//   if (norm.includes("sender id")) {
//     return { tag: "SMS", themeColor: "pink", icon: Users };
//   }
//   if (norm.includes("delivery reports")) {
//     return { tag: "SMS", themeColor: "purple", icon: LineChart };
//   }

//   // --- Voice SMS Sub-Cards ---
//   if (norm.includes("automated voice calls")) {
//     return { tag: "VOICE", themeColor: "blue", icon: Phone };
//   }
//   if (norm.includes("text-to-speech")) {
//     return { tag: "VOICE", themeColor: "green", icon: Mic };
//   }
//   if (norm.includes("voice broadcasting")) {
//     return { tag: "VOICE", themeColor: "purple", icon: Volume2 };
//   }
//   if (norm.includes("interactive voice response")) {
//     return { tag: "VOICE", themeColor: "indigo", icon: Radio };
//   }
//   if (norm.includes("campaign management")) {
//     return { tag: "VOICE", themeColor: "orange", icon: Settings };
//   }

//   // --- WhatsApp Panel Sub-Cards ---
//   if (norm.includes("whatsapp business api")) {
//     return { tag: "WHATSAPP", themeColor: "green", icon: MessageCircle };
//   }
//   if (norm.includes("multi-agent dashboard")) {
//     return { tag: "WHATSAPP", themeColor: "purple", icon: Users };
//   }
//   if (norm.includes("chatbot integration")) {
//     return { tag: "WHATSAPP", themeColor: "indigo", icon: Bot };
//   }
//   if (norm.includes("campaign manager")) {
//     return { tag: "WHATSAPP", themeColor: "orange", icon: LayoutDashboard };
//   }

//   // --- Digital Election Campaign Sub-Cards ---
//   if (norm.includes("voter outreach")) {
//     return { tag: "ELECTORAL", themeColor: "orange", icon: Vote };
//   }
//   if (norm.includes("constituency mapping")) {
//     return { tag: "ELECTORAL", themeColor: "indigo", icon: MapPin };
//   }
//   if (norm.includes("volunteer management")) {
//     return { tag: "ELECTORAL", themeColor: "green", icon: Users };
//   }

//   // Fallback
//   return {
//     tag: "SERVICE",
//     themeColor: "blue",
//     icon: Sparkles
//   };
// };

// // Map tech pills based on feature text, matching the user's requested icons & styling
// const getTagData = (feature, accentColor) => {
//   const norm = feature.toLowerCase().trim();

//   if (norm.includes("react native")) {
//     return {
//       icon: <FaReact className="text-purple-500 animate-spin-slow" />,
//       title: "React Native"
//     };
//   }
//   if (norm.includes("react")) {
//     return {
//       icon: <FaReact className="text-sky-500 animate-spin-slow" />,
//       title: "React"
//     };
//   }
//   if (norm.includes("next.js")) {
//     return {
//       icon: <SiNextdotjs className="text-slate-800 dark:text-slate-200" />,
//       title: "Next.js"
//     };
//   }
//   if (norm.includes("vue.js") || norm === "vue") {
//     return {
//       icon: <SiVuedotjs className="text-[#42b883] flex-shrink-0" />,
//       title: "Vue.js"
//     };
//   }
//   if (norm.includes("nuxt")) {
//     return {
//       icon: <SiVuedotjs className="text-[#42b883]" />,
//       title: "Nuxt"
//     };
//   }
//   if (norm.includes("typescript") || norm === "ts") {
//     return {
//       icon: <SiTypescript className="text-blue-600" />,
//       title: "TypeScript"
//     };
//   }
//   if (norm.includes("spring boot")) {
//     return {
//       icon: <SiSpringboot className="text-[#6db33f]" />,
//       title: "Spring Boot"
//     };
//   }
//   if (norm.includes("java")) {
//     return {
//       icon: <FaJava className="text-amber-600" />,
//       title: "Java"
//     };
//   }
//   if (norm.includes("flutter")) {
//     return {
//       icon: <SiFlutter className="text-[#02569B]" />,
//       title: "Flutter"
//     };
//   }
//   if (norm === "electron") {
//     return {
//       icon: <SiElectron className="text-cyan-500" />,
//       title: "Electron"
//     };
//   }
//   if (norm.includes("desktop app")) {
//     return {
//       icon: <Monitor className="w-3.5 h-3.5" style={{ color: accentColor }} />,
//       title: "Desktop Apps"
//     };
//   }
//   if (norm === ".net" || norm === "c#") {
//     return {
//       icon: <SiDotnet className="text-[#512bd4]" />,
//       title: ".NET"
//     };
//   }
//   if (norm.includes("ui design") || norm.includes("ui/ux") || norm.includes("prototyping") || norm.includes("branding")) {
//     return {
//       icon: <FaPaintBrush className="text-violet-600" />,
//       title: feature
//     };
//   }
//   if (norm.includes("logo design")) {
//     return {
//       icon: <FaPenNib className="text-purple-600" />,
//       title: "Logo Design"
//     };
//   }
//   if (norm.includes("machine learning")) {
//     return {
//       icon: <SiTensorflow className="text-orange-500" />,
//       title: "Machine Learning"
//     };
//   }
//   if (norm.includes("deep learning")) {
//     return {
//       icon: <SiPytorch className="text-rose-600" />,
//       title: "Deep Learning"
//     };
//   }
//   if (norm.includes("nlp") || norm.includes("natural language")) {
//     return {
//       icon: <FaRegCommentAlt className="text-violet-500" />,
//       title: "NLP"
//     };
//   }
//   if (norm.includes("computer vision")) {
//     return {
//       icon: <FaRegEye className="text-blue-500" />,
//       title: "Computer Vision"
//     };
//   }
//   if (norm.includes("predictive analytics")) {
//     return {
//       icon: <BarChart3 className="w-3.5 h-3.5" style={{ color: accentColor }} />,
//       title: "Predictive Analytics"
//     };
//   }
//   if (norm.includes("tender")) {
//     return {
//       icon: <FaSearch className="text-amber-600" />,
//       title: "Tender Search"
//     };
//   }
//   if (norm.includes("proposal") || norm.includes("document")) {
//     return {
//       icon: <FaFileAlt className="text-amber-600" />,
//       title: "Documentation"
//     };
//   }
//   if (norm.includes("compliance") || norm.includes("bid")) {
//     return {
//       icon: <FaShieldAlt className="text-amber-600" />,
//       title: "Bid Management"
//     };
//   }
//   if (norm.includes("seo") || norm.includes("core web vitals")) {
//     return {
//       icon: <FaGlobe className="text-rose-500" />,
//       title: feature
//     };
//   }
//   if (norm.includes("social media") || norm.includes("community management")) {
//     return {
//       icon: <FaShareAlt className="text-rose-500" />,
//       title: feature
//     };
//   }
//   if (norm.includes("ppc") || norm.includes("ad") || norm.includes("advertising")) {
//     return {
//       icon: <FaBullseye className="text-rose-500" />,
//       title: "PPC Ads"
//     };
//   }
//   if (norm.includes("content")) {
//     return {
//       icon: <FaPenNib className="text-rose-500" />,
//       title: "Content Marketing"
//     };
//   }
//   if (norm.includes("blog")) {
//     return {
//       icon: <BookOpen className="w-3.5 h-3.5 text-blue-500" />,
//       title: "Blog Posts"
//     };
//   }
//   if (norm.includes("article")) {
//     return {
//       icon: <FaFileAlt className="text-emerald-500" />,
//       title: "Articles"
//     };
//   }

//   // fallback
//   return {
//     icon: <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />,
//     title: feature
//   };
// };

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon: originalIcon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
//   themeColor: propThemeColor,
//   illustration: propIllustration,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const { tag, themeColor: configThemeColor, icon: ConfigIcon } = getCardConfig(title);
//   const themeColor = propThemeColor || configThemeColor;
//   const colors = colorMap[themeColor] || colorMap.blue;
//   const Icon = originalIcon || ConfigIcon;

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   const normTitle = title.toLowerCase().trim();

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
//       transition={{ duration: 0.5, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className="group relative w-full cursor-pointer touch-pan-y min-h-[385px] xs:min-h-[395px] sm:min-h-[410px] md:min-h-[425px]"
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.55, type: "spring", stiffness: 110, damping: 14 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Front Side */}
//         <div
//           className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800/80 rounded-[2rem] p-5 transition-all duration-300 backface-hidden flex flex-col justify-between overflow-hidden"
//           style={{ 
//             backfaceVisibility: "hidden",
//             boxShadow: isHovered 
//               ? `0 20px 45px -10px ${hexToRgba(colors.accentColor, 0.16)}` 
//               : `0 12px 35px -15px ${hexToRgba(colors.accentColor, 0.10)}`
//           }}
//         >
//           {/* Ambient Glow (Increased opacity for higher vibrancy) */}
//           <div 
//             className="absolute bottom-[-30px] right-[-30px] w-52 h-52 rounded-full filter blur-3xl opacity-[0.20] pointer-events-none"
//             style={{ 
//               background: `radial-gradient(circle, ${colors.accentColor} 0%, transparent 70%)` 
//             }}
//           />

//           {/* Dotted pattern - 42 dots matching the user uploaded layout */}
//           <div className="absolute right-6 top-6 grid grid-cols-7 gap-1.5 opacity-[0.35] pointer-events-none">
//             {[...Array(42)].map((_, i) => (
//               <span
//                 key={i}
//                 className="w-[2.5px] h-[2.5px] rounded-full"
//                 style={{ backgroundColor: colors.accentColor }}
//               />
//             ))}
//           </div>

//           {/* Unique Background Illustration based on Card Category */}
//           {renderBackgroundIllustration(normTitle, colors.accentColor, propIllustration, themeColor)}

//           <div>
//             {/* Hexagonal Stacked Icon Badge */}
//             <StackedHexagon icon={Icon} accentColor={colors.accentColor} />

//             {/* Header Segment */}
//             <span className={`text-[10px] font-bold tracking-widest block mb-1 ${colors.text}`}>
//               {tag}
//             </span>
            
//             <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
//               {title}
//             </h3>

//             {/* Accent Underline */}
//             <div className={`w-8 h-1 rounded-full mb-2 ${colors.btn}`} />

//             <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
//               {summary}
//             </p>

//             {/* Pill Tags (Slices up to 3 tags with brand icons and original brand colors) */}
//             {features.length > 0 && (
//               <div className="flex flex-wrap gap-1.5 mb-3">
//                 {features.flatMap(f => f.split('&').map(sub => sub.trim())).slice(0, 3).map((featureTag, idx) => {
//                   const tagInfo = getTagData(featureTag, colors.accentColor);
//                   return (
//                     <span 
//                       key={idx} 
//                       className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5"
//                     >
//                       {tagInfo.icon}
//                       {tagInfo.title}
//                     </span>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Footer Action */}
//           <div className="flex items-center gap-2">
//             <span 
//               className={`font-bold text-sm tracking-wide transition-colors duration-200 ${colors.text} hover:opacity-85`}
//             >
//               Learn More
//             </span>
//             <button className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1 ${colors.btn}`}>
//               <ArrowRight className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         </div>

//         {/* Back Side */}
//         <div
//           className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800/80 rounded-[2rem] p-5 backface-hidden flex flex-col justify-between overflow-hidden"
//           style={{ 
//             backfaceVisibility: "hidden",
//             transform: "rotateY(180deg)",
//             boxShadow: isHovered 
//               ? `0 20px 45px -10px ${hexToRgba(colors.accentColor, 0.16)}` 
//               : `0 12px 35px -15px ${hexToRgba(colors.accentColor, 0.10)}`
//           }}
//         >
//           {/* Ambient Glow */}
//           <div 
//             className="absolute bottom-[-30px] right-[-30px] w-52 h-52 rounded-full filter blur-3xl opacity-[0.20] pointer-events-none"
//             style={{ 
//               background: `radial-gradient(circle, ${colors.accentColor} 0%, transparent 70%)` 
//             }}
//           />

//           {/* Dotted pattern - 42 dots */}
//           <div className="absolute right-6 top-6 grid grid-cols-7 gap-1.5 opacity-[0.35] pointer-events-none">
//             {[...Array(42)].map((_, i) => (
//               <span
//                 key={i}
//                 className="w-[2.5px] h-[2.5px] rounded-full"
//                 style={{ backgroundColor: colors.accentColor }}
//               />
//             ))}
//           </div>

//           {/* Unique Background Illustration based on Card Category */}
//           {renderBackgroundIllustration(normTitle, colors.accentColor)}

//           <div>
//             {/* Header Segment */}
//             <span className={`text-[10px] font-bold tracking-widest block mb-1 ${colors.text}`}>
//               {tag}
//             </span>
            
//             <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
//               {title}
//             </h3>

//             {/* Accent Underline */}
//             <div className={`w-8 h-1 rounded-full mb-2 ${colors.btn}`} />

//             <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
//               {fullContent}
//             </p>

//             {/* All Features list */}
//             {features.length > 0 && (
//               <div className="mb-3">
//                 <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
//                   Key Deliverables:
//                 </h4>
//                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
//                   {features.map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
//                     >
//                       <span 
//                         className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.btn}`} 
//                       />
//                       <span className="truncate">{f}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Footer Action */}
//           <div className="flex items-center gap-2">
//             <span 
//               className={`font-bold text-sm tracking-wide transition-colors duration-200 ${colors.text} hover:opacity-85`}
//             >
//               Go Back
//             </span>
//             <button className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:-translate-x-1 ${colors.btn}`}>
//               <ArrowRight className="w-3.5 h-3.5 rotate-180" />
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;





































// import React, { useState, useRef, isValidElement, cloneElement } from "react";
// import { motion, useInView } from "framer-motion";
// import { 
//   Code2, Terminal, Smartphone, BrainCircuit, 
//   Building2, Megaphone, ArrowRight, BookOpen,
//   Vote, Sparkles, Monitor, BarChart3,
//   Cloud, Shield, Rocket, Zap, Store, SearchCheck, 
//   FileCheck2, Landmark, Users, Share2, PenLine, 
//   Pen, Files, Layout, Printer, Image, Phone, 
//   Mic, Volume2, Radio, MessageCircle, LayoutDashboard, MapPin,
//   Palette, ShieldCheck, Newspaper,
//   Settings, Headphones, Database, Bot, LineChart, Briefcase, TrendingUp, Search, Mail,
//   Target, MessageSquare
// } from 'lucide-react';
// import {
//   FaReact, FaJava, FaPaintBrush, FaRegEye, FaSearch, 
//   FaFileAlt, FaShieldAlt, FaGlobe, FaShareAlt, FaBullseye, FaPenNib,
//   FaRegCommentAlt, FaMobileAlt, FaPhone, FaWhatsapp, FaVoteYea
// } from "react-icons/fa";
// import {
//   SiNextdotjs, SiVuedotjs, SiTypescript, SiFlutter, SiSpringboot, SiDotnet,
//   SiTensorflow, SiPytorch, SiElectron
// } from "react-icons/si";

// // Helper function to convert Hex to RGBA for custom glows
// const hexToRgba = (hex, opacity) => {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };

// // Pointy-topped rounded hexagon SVG path for all three layers
// const pathD = "M 45 7.8 Q 50 5 55 7.8 L 84.7 25 Q 89 27.5 89 32.5 L 89 67.5 Q 89 72.5 84.7 75 L 55 92.2 Q 50 95 45 92.2 L 15.3 75 Q 11 72.5 11 67.5 L 11 32.5 Q 11 27.5 15.3 25 Z";

// const StackedHexagon = ({ icon: Icon, accentColor }) => {
//   return (
//     <div className="relative w-20 h-20 mb-5">
//       {/* Background shape 1 (furthest shadow shifted up and to the right) */}
//       <svg 
//         className="absolute w-16 h-16 opacity-[0.20] translate-x-[14px] -translate-y-[10px] transition-transform duration-500 group-hover:translate-x-[16px] group-hover:-translate-y-[12px]" 
//         viewBox="0 0 100 100" 
//         fill={accentColor}
//       >
//         <path d={pathD} />
//       </svg>
      
//       {/* Background shape 2 (middle shadow shifted up and to the right) */}
//       <svg 
//         className="absolute w-16 h-16 opacity-[0.30] translate-x-[7px] -translate-y-[5px] transition-transform duration-500 group-hover:translate-x-[8px] group-hover:-translate-y-[6px]" 
//         viewBox="0 0 100 100" 
//         fill={accentColor}
//       >
//         <path d={pathD} />
//       </svg>

//       {/* Front main hexagon shape (white background with solid icon) */}
//       <div 
//         className="absolute w-16 h-16 flex items-center justify-center transition-transform duration-500 group-hover:-translate-x-[1px] group-hover:translate-y-[1px]"
//       >
//         <svg 
//           className="absolute inset-0 w-full h-full drop-shadow-md" 
//           viewBox="0 0 100 100" 
//           fill="currentColor"
//           style={{ color: 'white' }}
//         >
//           <path 
//             d={pathD} 
//             stroke={accentColor} 
//             strokeWidth="3.5" 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//           />
//         </svg>
        
//         {/* Icon Container */}
//         <div className="relative z-10 flex items-center justify-center" style={{ color: accentColor }}>
//           {isValidElement(Icon) ? (
//             cloneElement(Icon, { className: "w-6 h-6" })
//           ) : Icon ? (
//             <Icon className="w-6 h-6" />
//           ) : (
//             <Sparkles className="w-6 h-6" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Card-Specific Unique Background Illustrations (Scaled down by 15-20% for optimal layout fit)
// const WebBrowserOutline = ({ color }) => (
//   <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.15] pointer-events-none rotate-3" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
//       <rect x="15" y="25" width="75" height="55" rx="8" />
//       <line x1="15" y1="42" x2="90" y2="42" strokeWidth="2" />
//       <circle cx="25" cy="33" r="2.5" className="fill-current" />
//       <circle cx="33" cy="33" r="2.5" className="fill-current" />
//       <circle cx="41" cy="33" r="2.5" className="fill-current" />
      
//       <path d="M 35 58 L 27 63 L 35 68" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M 70 58 L 78 63 L 70 68" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//       <line x1="56" y1="52" x2="49" y2="74" strokeWidth="3" strokeLinecap="round" />
//     </svg>
//   </div>
// );

// const GlobeOutline = ({ color }) => (
//   <div className="absolute -right-12 bottom-[-50px] w-40 h-40 rounded-full border-2 opacity-[0.28] pointer-events-none" style={{ borderColor: color }}>
//     <div className="absolute inset-3 rounded-full border-2 opacity-80" style={{ borderColor: color }} />
//     <div className="absolute inset-6 rounded-full border opacity-60" style={{ borderColor: color }} />
//     <div className="absolute left-1/2 -translate-x-1/2 w-px h-full opacity-60" style={{ backgroundColor: color }} />
//     <div className="absolute top-1/2 -translate-y-1/2 h-px w-full opacity-60" style={{ backgroundColor: color }} />
//     <div className="absolute inset-0 rotate-45 border-t opacity-50" style={{ borderColor: color }} />
//     <div className="absolute inset-0 -rotate-45 border-t opacity-50" style={{ borderColor: color }} />
//   </div>
// );

// const GearOutline = ({ color }) => (
//   <div className="absolute -right-8 bottom-[-40px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
//       <circle cx="50" cy="50" r="18" />
//       <circle cx="50" cy="50" r="30" strokeDasharray="6 3" />
//       {[...Array(8)].map((_, i) => (
//         <g key={i} transform={`rotate(${i * 45} 50 50)`}>
//           <path d="M46 14 h8 v8 h-8 z" />
//         </g>
//       ))}
//     </svg>
//   </div>
// );

// const PhoneOutline = ({ color }) => (
//   <div className="absolute -right-4 bottom-[-65px] w-28 h-44 opacity-[0.28] pointer-events-none rotate-12" style={{ color }}>
//     <svg viewBox="0 0 100 200" className="w-full h-full stroke-current fill-none" strokeWidth="3">
//       <rect x="10" y="10" width="80" height="180" rx="12" />
//       <line x1="30" y1="175" x2="70" y2="175" strokeWidth="3" />
//       <circle cx="50" cy="25" r="4.5" />
//     </svg>
//   </div>
// );

// const NetworkOutline = ({ color }) => (
//   <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
//       <circle cx="20" cy="30" r="4" className="fill-current" />
//       <circle cx="50" cy="20" r="5" className="fill-current" />
//       <circle cx="80" cy="40" r="4" className="fill-current" />
//       <circle cx="40" cy="60" r="6" className="fill-current" />
//       <circle cx="70" cy="70" r="5" className="fill-current" />
//       <circle cx="30" cy="85" r="4" className="fill-current" />
      
//       <line x1="20" y1="30" x2="50" y2="20" />
//       <line x1="50" y1="20" x2="80" y2="40" />
//       <line x1="50" y1="20" x2="40" y2="60" />
//       <line x1="40" y1="60" x2="70" y2="70" />
//       <line x1="80" y1="40" x2="70" y2="70" />
//       <line x1="40" y1="60" x2="30" y2="85" />
//       <line x1="70" y1="70" x2="30" y2="85" />
//     </svg>
//   </div>
// );

// const ShieldOutline = ({ color }) => (
//   <div className="absolute -right-6 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
//       <path d="M20 20 C40 10 60 10 80 20 C80 50 70 80 50 95 C30 80 20 50 20 20 Z" />
//       <path d="M30 28 C43 20 57 20 70 28 C70 52 62 76 50 87 C38 76 30 52 30 28 Z" strokeDasharray="4 2" />
//     </svg>
//   </div>
// );

// const TargetOutline = ({ color }) => (
//   <div className="absolute -right-8 bottom-[-40px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="3">
//       <circle cx="50" cy="50" r="38" />
//       <circle cx="50" cy="50" r="26" />
//       <circle cx="50" cy="50" r="14" />
//       <circle cx="50" cy="50" r="3.5" className="fill-current" />
//       <line x1="82" y1="18" x2="56" y2="44" strokeWidth="3" />
//       <path d="M76 18 L82 18 L82 24" strokeWidth="3" fill="none" />
//     </svg>
//   </div>
// );

// const DocumentOutline = ({ color }) => (
//   <div className="absolute -right-6 bottom-[-30px] w-36 h-36 opacity-[0.28] pointer-events-none rotate-6" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
//       <path d="M25 15 L65 15 L75 25 L75 85 L25 85 Z" />
//       <path d="M65 15 L65 25 L75 25" />
//       <line x1="35" y1="35" x2="65" y2="35" strokeWidth="2.5" />
//       <line x1="35" y1="48" x2="65" y2="48" strokeWidth="2.5" />
//       <line x1="35" y1="61" x2="55" y2="61" strokeWidth="2.5" />
//       <line x1="35" y1="74" x2="60" y2="74" strokeWidth="2.5" />
//     </svg>
//   </div>
// );

// const DesignOutline = ({ color }) => (
//   <div className="absolute -right-8 bottom-[-30px] w-40 h-40 opacity-[0.28] pointer-events-none" style={{ color }}>
//     <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2.5">
//       {/* Bezier curve path */}
//       <path d="M 25 75 C 32 40, 38 27, 45 27 C 52 27, 75 35, 85 52" />
      
//       {/* Handlebar line through anchor point */}
//       <line x1="20" y1="37" x2="70" y2="17" strokeWidth="1.5" />
//       <circle cx="20" cy="37" r="3" className="fill-current" />
//       <circle cx="70" cy="17" r="3" className="fill-current" />
      
//       {/* Square anchor points */}
//       <rect x="22" y="72" width="6" height="6" className="fill-current" />
//       <rect x="82" y="49" width="6" height="6" className="fill-current" />
//       <rect x="42" y="24" width="6" height="6" className="fill-current" />

//       {/* Pen Nib pointing at (45,27) */}
//       <g transform="translate(45, 27) rotate(-25) translate(-50, -30)">
//         <path 
//           d="M 50 30 L 44 52 L 46 56 L 44 76 L 56 76 L 54 56 L 56 52 Z" 
//           className="fill-white dark:fill-slate-900" 
//           strokeWidth="2.5"
//         />
//         {/* central slit */}
//         <line x1="50" y1="30" x2="50" y2="58" strokeWidth="2" />
//         {/* breather hole */}
//         <circle cx="50" cy="58" r="2.5" className="fill-current" />
//         {/* base collar line */}
//         <path d="M 45 72 L 55 72" strokeWidth="2" />
//       </g>
//     </svg>
//   </div>
// );

// const renderBackgroundIllustration = (normTitle, color, propIllustration, themeColor) => {
//   const select = (propIllustration || "").toLowerCase().trim();
  
//   if (select === "browser" || select === "webbrowser") return <WebBrowserOutline color={color} />;
//   if (select === "globe") return <GlobeOutline color={color} />;
//   if (select === "gear" || select === "settings") return <GearOutline color={color} />;
//   if (select === "phone" || select === "smartphone") return <PhoneOutline color={color} />;
//   if (select === "network" || select === "brain") return <NetworkOutline color={color} />;
//   if (select === "shield" || select === "security") return <ShieldOutline color={color} />;
//   if (select === "target" || select === "marketing") return <TargetOutline color={color} />;
//   if (select === "document" || select === "writing") return <DocumentOutline color={color} />;
//   if (select === "design" || select === "pen") return <DesignOutline color={color} />;

//   // Title-based detection
//   if (normTitle.includes("web development") || normTitle.includes("browser")) return <WebBrowserOutline color={color} />;
//   if (normTitle.includes("software development") || normTitle.includes("integration") || normTitle.includes("devops") || normTitle.includes("system")) return <GearOutline color={color} />;
//   if (normTitle.includes("app development") || normTitle.includes("phone") || normTitle.includes("mobile") || normTitle.includes("whatsapp")) return <PhoneOutline color={color} />;
//   if (normTitle.includes("ai & ml") || normTitle.includes("artificial intelligence") || normTitle.includes("analytics") || normTitle.includes("consulting") || normTitle.includes("cloud")) return <NetworkOutline color={color} />;
//   if (normTitle.includes("tender") || normTitle.includes("government") || normTitle.includes("security") || normTitle.includes("compliance")) return <ShieldOutline color={color} />;
//   if (normTitle.includes("marketing") || normTitle.includes("social media") || normTitle.includes("campaign") || normTitle.includes("ad")) return <TargetOutline color={color} />;
//   if (normTitle.includes("writing") || normTitle.includes("content") || normTitle.includes("document") || normTitle.includes("sms") || normTitle.includes("deployment")) return <DocumentOutline color={color} />;
//   if (normTitle.includes("design") || normTitle.includes("graphic")) return <DesignOutline color={color} />;
//   if (normTitle.includes("support") || normTitle.includes("maintenance") || normTitle.includes("enterprise") || normTitle.includes("global")) return <GlobeOutline color={color} />;

//   // Theme-based fallback
//   if (themeColor === "blue") return <WebBrowserOutline color={color} />;
//   if (themeColor === "green") return <GearOutline color={color} />;
//   if (themeColor === "purple") return <PhoneOutline color={color} />;
//   if (themeColor === "indigo") return <NetworkOutline color={color} />;
//   if (themeColor === "orange") return <ShieldOutline color={color} />;
//   if (themeColor === "pink") return <TargetOutline color={color} />;

//   return <GlobeOutline color={color} />;
// };

// const colorMap = {
//   blue: {
//     accentColor: "#2563eb",
//     text: "text-blue-600",
//     bg: "bg-blue-50/50 dark:bg-blue-950/20",
//     border: "border-blue-100 dark:border-blue-900/40",
//     iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
//     shadow: "shadow-blue-200/50 dark:shadow-none",
//     btn: "bg-blue-600",
//   },
//   green: {
//     accentColor: "#10b981",
//     text: "text-emerald-600",
//     bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
//     border: "border-emerald-100 dark:border-emerald-900/40",
//     iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
//     shadow: "shadow-emerald-200/50 dark:shadow-none",
//     btn: "bg-emerald-600",
//   },
//   purple: {
//     accentColor: "#7c3aed",
//     text: "text-purple-600",
//     bg: "bg-purple-50/50 dark:bg-purple-950/20",
//     border: "border-purple-100 dark:border-purple-900/40",
//     iconBg: "bg-gradient-to-br from-purple-400 to-purple-600",
//     shadow: "shadow-purple-200/50 dark:shadow-none",
//     btn: "bg-purple-600",
//   },
//   indigo: {
//     accentColor: "#6366f1",
//     text: "text-indigo-600",
//     bg: "bg-indigo-50/50 dark:bg-indigo-950/20",
//     border: "border-indigo-100 dark:border-indigo-900/40",
//     iconBg: "bg-gradient-to-br from-indigo-400 to-indigo-600",
//     shadow: "shadow-indigo-200/50 dark:shadow-none",
//     btn: "bg-indigo-600",
//   },
//   orange: {
//     accentColor: "#ea580c",
//     text: "text-orange-600",
//     bg: "bg-orange-50/50 dark:bg-orange-950/20",
//     border: "border-orange-100 dark:border-orange-900/40",
//     iconBg: "bg-gradient-to-br from-orange-400 to-orange-600",
//     shadow: "shadow-orange-200/50 dark:shadow-none",
//     btn: "bg-orange-600",
//   },
//   pink: {
//     accentColor: "#db2777",
//     text: "text-pink-600",
//     bg: "bg-pink-50/50 dark:bg-pink-950/20",
//     border: "border-pink-100 dark:border-pink-900/40",
//     iconBg: "bg-gradient-to-br from-pink-400 to-pink-600",
//     shadow: "shadow-pink-200/50 dark:shadow-none",
//     btn: "bg-pink-600",
//   },
// };

// // Map card details based on title
// const getCardConfig = (title) => {
//   const norm = title.toLowerCase().trim();

//   // --- Strict Exact Matches first to distinguish main sections from sub-items ---
//   if (norm === "bulk sms") {
//     return { tag: "SMS SERVICES", themeColor: "green", icon: MessageSquare };
//   }
//   if (norm === "voice sms") {
//     return { tag: "VOICE SERVICES", themeColor: "blue", icon: Phone };
//   }
//   if (norm === "whatsapp panel") {
//     return { tag: "WHATSAPP PANEL", themeColor: "purple", icon: MessageCircle };
//   }
//   if (norm === "whatsapp marketing") {
//     return { tag: "WHATSAPP MARKETING", themeColor: "pink", icon: Megaphone };
//   }
//   if (norm === "digital election campaign") {
//     return { tag: "ELECTORAL SERVICES", themeColor: "orange", icon: Vote };
//   }

//   // --- Web Development Cards ---
//   if (norm.includes("custom web development") || norm === "web development") {
//     return { tag: "DEVELOPMENT", themeColor: "blue", icon: Code2 };
//   }
//   if (norm.includes("ui/ux design") && !norm.includes("app")) {
//     return { tag: "DESIGN", themeColor: "purple", icon: Palette };
//   }
//   if (norm.includes("technical consulting")) {
//     return { tag: "CONSULTING", themeColor: "green", icon: Settings };
//   }
//   if (norm.includes("ongoing support")) {
//     return { tag: "SUPPORT", themeColor: "pink", icon: Headphones };
//   }

//   // --- Software Development Cards ---
//   if (norm.includes("custom software solutions") || norm === "software development") {
//     return { tag: "DEVELOPMENT", themeColor: "green", icon: Terminal };
//   }
//   if (norm.includes("enterprise applications")) {
//     return { tag: "ENTERPRISE", themeColor: "indigo", icon: Database };
//   }
//   if (norm.includes("cloud solutions")) {
//     return { tag: "CLOUD", themeColor: "blue", icon: Cloud };
//   }
//   if (norm === "api integration") { // Specific WhatsApp Panel sub-card
//     return { tag: "INTEGRATION", themeColor: "blue", icon: Zap };
//   }
//   if (norm.includes("system integration")) {
//     return { tag: "INTEGRATION", themeColor: "orange", icon: Settings };
//   }
//   if (norm.includes("security & compliance") || norm.includes("responsible ai")) {
//     return { tag: "SECURITY", themeColor: "pink", icon: Shield };
//   }
//   if (norm.includes("devops & deployment") || norm.includes("mlops deployment")) {
//     return { tag: "DEVOPS", themeColor: "purple", icon: Rocket };
//   }

//   // --- App Development Cards ---
//   if (norm.includes("ios app development")) {
//     return { tag: "MOBILE", themeColor: "blue", icon: Smartphone };
//   }
//   if (norm.includes("android app development")) {
//     return { tag: "MOBILE", themeColor: "green", icon: Smartphone };
//   }
//   if (norm.includes("cross-platform") || norm === "app development") {
//     return { tag: "MOBILE", themeColor: "indigo", icon: Smartphone };
//   }
//   if (norm.includes("app ui/ux design")) {
//     return { tag: "DESIGN", themeColor: "purple", icon: Sparkles };
//   }
//   if (norm.includes("app performance")) {
//     return { tag: "PERFORMANCE", themeColor: "orange", icon: Zap };
//   }
//   if (norm.includes("app store launch")) {
//     return { tag: "LAUNCH", themeColor: "pink", icon: Store };
//   }

//   // --- AI & ML Cards ---
//   if (norm.includes("ai strategy") || norm === "ai & ml") {
//     return { tag: "AI SOLUTIONS", themeColor: "indigo", icon: BrainCircuit };
//   }
//   if (norm.includes("machine learning models")) {
//     return { tag: "AI SOLUTIONS", themeColor: "blue", icon: Bot };
//   }
//   if (norm.includes("data engineering")) {
//     return { tag: "DATA", themeColor: "green", icon: Database };
//   }
//   if (norm === "performance analytics") { // Specifically for WhatsApp Marketing page
//     return { tag: "ANALYTICS", themeColor: "indigo", icon: LineChart };
//   }
//   if (norm.includes("analytics & insights") || norm.includes("analytics & reporting")) {
//     return { tag: "ANALYTICS", themeColor: "orange", icon: LineChart };
//   }

//   // --- Government Tenders Cards ---
//   if (norm.includes("minnagam support")) {
//     return { tag: "SUPPORT", themeColor: "green", icon: SearchCheck };
//   }
//   if (norm.includes("documentation support")) {
//     return { tag: "DOCUMENTATION", themeColor: "blue", icon: FileCheck2 };
//   }
//   if (norm.includes("proposal preparation")) {
//     return { tag: "PROPOSAL", themeColor: "purple", icon: Briefcase };
//   }
//   if (norm.includes("portal assistance") || norm === "government tenders") {
//     return { tag: "ASSISTANCE", themeColor: "indigo", icon: Landmark };
//   }
//   if (norm.includes("compliance & risk review")) {
//     return { tag: "COMPLIANCE", themeColor: "orange", icon: Shield };
//   }
//   if (norm.includes("bid management")) {
//     return { tag: "MANAGEMENT", themeColor: "pink", icon: Users };
//   }

//   // --- Social Media Marketing Cards ---
//   if (norm.includes("social media strategy") || norm === "social media marketing") {
//     return { tag: "MARKETING", themeColor: "pink", icon: Megaphone };
//   }
//   if (norm.includes("content creation") || norm.includes("creative content")) {
//     return { tag: "CREATIVE", themeColor: "purple", icon: Share2 };
//   }
//   if (norm.includes("community management")) {
//     return { tag: "ENGAGEMENT", themeColor: "green", icon: Users };
//   }
//   if (norm.includes("customer engagement")) { // WhatsApp Marketing sub-card
//     return { tag: "ENGAGEMENT", themeColor: "purple", icon: Users };
//   }
//   if (norm.includes("paid advertising")) {
//     return { tag: "CAMPAIGNS", themeColor: "orange", icon: TrendingUp };
//   }
//   if (norm.includes("marketing campaigns")) { // WhatsApp Marketing sub-card
//     return { tag: "CAMPAIGNS", themeColor: "pink", icon: Megaphone };
//   }
//   if (norm.includes("influencer marketing")) {
//     return { tag: "GROWTH", themeColor: "blue", icon: Users };
//   }
//   if (norm.includes("growth strategies")) { // WhatsApp Marketing sub-card
//     return { tag: "GROWTH", themeColor: "green", icon: TrendingUp };
//   }
//   if (norm === "targeted messaging") { // WhatsApp Marketing sub-card
//     return { tag: "TARGETED", themeColor: "blue", icon: Target };
//   }

//   // --- Content Writing Cards ---
//   if (norm.includes("blog writing")) {
//     return { tag: "CONTENT", themeColor: "blue", icon: BookOpen };
//   }
//   if (norm.includes("website copywriting") || norm === "content writing") {
//     return { tag: "CONTENT", themeColor: "green", icon: PenLine };
//   }
//   if (norm.includes("seo content")) {
//     return { tag: "SEO", themeColor: "indigo", icon: Search };
//   }
//   if (norm.includes("email marketing")) {
//     return { tag: "MARKETING", themeColor: "pink", icon: Mail };
//   }
//   if (norm.includes("technical writing")) {
//     return { tag: "TECHNICAL", themeColor: "purple", icon: BookOpen };
//   }
//   if (norm.includes("press releases")) {
//     return { tag: "PRESS", themeColor: "orange", icon: Newspaper };
//   }

//   // --- Graphics Designer Cards ---
//   if (norm.includes("logo & branding") || norm === "graphics designer") {
//     return { tag: "DESIGN", themeColor: "purple", icon: Pen };
//   }
//   if (norm.includes("social media design")) {
//     return { tag: "DESIGN", themeColor: "pink", icon: Share2 };
//   }
//   if (norm.includes("marketing collateral")) {
//     return { tag: "DESIGN", themeColor: "blue", icon: Files };
//   }
//   if (norm.includes("ui/ux assets")) {
//     return { tag: "DESIGN", themeColor: "indigo", icon: Layout };
//   }
//   if (norm.includes("print design")) {
//     return { tag: "DESIGN", themeColor: "orange", icon: Printer };
//   }
//   if (norm.includes("illustrations")) {
//     return { tag: "DESIGN", themeColor: "green", icon: Image };
//   }

//   // --- Bulk SMS Sub-Cards ---
//   if (norm.includes("transactional sms")) {
//     return { tag: "SMS", themeColor: "blue", icon: MessageSquare };
//   }
//   if (norm.includes("promotional sms")) {
//     return { tag: "SMS", themeColor: "green", icon: Megaphone };
//   }
//   if (norm.includes("otp sms")) {
//     return { tag: "SMS", themeColor: "indigo", icon: Shield };
//   }
//   if (norm.includes("sender id")) {
//     return { tag: "SMS", themeColor: "pink", icon: Users };
//   }
//   if (norm.includes("delivery reports")) {
//     return { tag: "SMS", themeColor: "purple", icon: LineChart };
//   }

//   // --- Voice SMS Sub-Cards ---
//   if (norm.includes("automated voice calls")) {
//     return { tag: "VOICE", themeColor: "blue", icon: Phone };
//   }
//   if (norm.includes("text-to-speech")) {
//     return { tag: "VOICE", themeColor: "green", icon: Mic };
//   }
//   if (norm.includes("voice broadcasting")) {
//     return { tag: "VOICE", themeColor: "purple", icon: Volume2 };
//   }
//   if (norm.includes("interactive voice response")) {
//     return { tag: "VOICE", themeColor: "indigo", icon: Radio };
//   }
//   if (norm.includes("campaign management")) {
//     return { tag: "VOICE", themeColor: "orange", icon: Settings };
//   }

//   // --- WhatsApp Panel Sub-Cards ---
//   if (norm.includes("whatsapp business api")) {
//     return { tag: "WHATSAPP", themeColor: "green", icon: MessageCircle };
//   }
//   if (norm.includes("multi-agent dashboard")) {
//     return { tag: "WHATSAPP", themeColor: "purple", icon: Users };
//   }
//   if (norm.includes("chatbot integration")) {
//     return { tag: "WHATSAPP", themeColor: "indigo", icon: Bot };
//   }
//   if (norm.includes("campaign manager")) {
//     return { tag: "WHATSAPP", themeColor: "orange", icon: LayoutDashboard };
//   }

//   // --- Digital Election Campaign Sub-Cards ---
//   if (norm.includes("voter outreach")) {
//     return { tag: "ELECTORAL", themeColor: "orange", icon: Vote };
//   }
//   if (norm.includes("constituency mapping")) {
//     return { tag: "ELECTORAL", themeColor: "indigo", icon: MapPin };
//   }
//   if (norm.includes("volunteer management")) {
//     return { tag: "ELECTORAL", themeColor: "green", icon: Users };
//   }

//   // Fallback
//   return {
//     tag: "SERVICE",
//     themeColor: "blue",
//     icon: Sparkles
//   };
// };

// // Map tech pills based on feature text, matching the user's requested icons & styling
// const getTagData = (feature, accentColor) => {
//   const norm = feature.toLowerCase().trim();

//   if (norm.includes("react native")) {
//     return {
//       icon: <FaReact className="text-purple-500 animate-spin-slow" />,
//       title: "React Native"
//     };
//   }
//   if (norm.includes("react")) {
//     return {
//       icon: <FaReact className="text-sky-500 animate-spin-slow" />,
//       title: "React"
//     };
//   }
//   if (norm.includes("next.js")) {
//     return {
//       icon: <SiNextdotjs className="text-slate-800 dark:text-slate-200" />,
//       title: "Next.js"
//     };
//   }
//   if (norm.includes("vue.js") || norm === "vue") {
//     return {
//       icon: <SiVuedotjs className="text-[#42b883] flex-shrink-0" />,
//       title: "Vue.js"
//     };
//   }
//   if (norm.includes("nuxt")) {
//     return {
//       icon: <SiVuedotjs className="text-[#42b883]" />,
//       title: "Nuxt"
//     };
//   }
//   if (norm.includes("typescript") || norm === "ts") {
//     return {
//       icon: <SiTypescript className="text-blue-600" />,
//       title: "TypeScript"
//     };
//   }
//   if (norm.includes("spring boot")) {
//     return {
//       icon: <SiSpringboot className="text-[#6db33f]" />,
//       title: "Spring Boot"
//     };
//   }
//   if (norm.includes("java")) {
//     return {
//       icon: <FaJava className="text-amber-600" />,
//       title: "Java"
//     };
//   }
//   if (norm.includes("flutter")) {
//     return {
//       icon: <SiFlutter className="text-[#02569B]" />,
//       title: "Flutter"
//     };
//   }
//   if (norm === "electron") {
//     return {
//       icon: <SiElectron className="text-cyan-500" />,
//       title: "Electron"
//     };
//   }
//   if (norm.includes("desktop app")) {
//     return {
//       icon: <Monitor className="w-3.5 h-3.5" style={{ color: accentColor }} />,
//       title: "Desktop Apps"
//     };
//   }
//   if (norm === ".net" || norm === "c#") {
//     return {
//       icon: <SiDotnet className="text-[#512bd4]" />,
//       title: ".NET"
//     };
//   }
//   if (norm.includes("ui design") || norm.includes("ui/ux") || norm.includes("prototyping") || norm.includes("branding")) {
//     return {
//       icon: <FaPaintBrush className="text-violet-600" />,
//       title: feature
//     };
//   }
//   if (norm.includes("logo design")) {
//     return {
//       icon: <FaPenNib className="text-purple-600" />,
//       title: "Logo Design"
//     };
//   }
//   if (norm.includes("machine learning")) {
//     return {
//       icon: <SiTensorflow className="text-orange-500" />,
//       title: "Machine Learning"
//     };
//   }
//   if (norm.includes("deep learning")) {
//     return {
//       icon: <SiPytorch className="text-rose-600" />,
//       title: "Deep Learning"
//     };
//   }
//   if (norm.includes("nlp") || norm.includes("natural language")) {
//     return {
//       icon: <FaRegCommentAlt className="text-violet-500" />,
//       title: "NLP"
//     };
//   }
//   if (norm.includes("computer vision")) {
//     return {
//       icon: <FaRegEye className="text-blue-500" />,
//       title: "Computer Vision"
//     };
//   }
//   if (norm.includes("predictive analytics")) {
//     return {
//       icon: <BarChart3 className="w-3.5 h-3.5" style={{ color: accentColor }} />,
//       title: "Predictive Analytics"
//     };
//   }
//   if (norm.includes("tender")) {
//     return {
//       icon: <FaSearch className="text-amber-600" />,
//       title: "Tender Search"
//     };
//   }
//   if (norm.includes("proposal") || norm.includes("document")) {
//     return {
//       icon: <FaFileAlt className="text-amber-600" />,
//       title: "Documentation"
//     };
//   }
//   if (norm.includes("compliance") || norm.includes("bid")) {
//     return {
//       icon: <FaShieldAlt className="text-amber-600" />,
//       title: "Bid Management"
//     };
//   }
//   if (norm.includes("seo") || norm.includes("core web vitals")) {
//     return {
//       icon: <FaGlobe className="text-rose-500" />,
//       title: feature
//     };
//   }
//   if (norm.includes("social media") || norm.includes("community management")) {
//     return {
//       icon: <FaShareAlt className="text-rose-500" />,
//       title: feature
//     };
//   }
//   if (norm.includes("ppc") || norm.includes("ad") || norm.includes("advertising")) {
//     return {
//       icon: <FaBullseye className="text-rose-500" />,
//       title: "PPC Ads"
//     };
//   }
//   if (norm.includes("content")) {
//     return {
//       icon: <FaPenNib className="text-rose-500" />,
//       title: "Content Marketing"
//     };
//   }
//   if (norm.includes("blog")) {
//     return {
//       icon: <BookOpen className="w-3.5 h-3.5 text-blue-500" />,
//       title: "Blog Posts"
//     };
//   }
//   if (norm.includes("article")) {
//     return {
//       icon: <FaFileAlt className="text-emerald-500" />,
//       title: "Articles"
//     };
//   }

//   // fallback
//   return {
//     icon: <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />,
//     title: feature
//   };
// };

// export function FlipCard({
//   title,
//   summary,
//   fullContent,
//   icon: originalIcon,
//   features = [],
//   delay = 0,
//   serviceLayout = false,
//   desktopComfort = false,
//   themeColor: propThemeColor,
//   illustration: propIllustration,
// }) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const ref = useRef(null);
//   const pointerStartRef = useRef(null);
//   const didDragRef = useRef(false);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const { tag, themeColor: configThemeColor, icon: ConfigIcon } = getCardConfig(title);
//   const themeColor = propThemeColor || configThemeColor;
//   const colors = colorMap[themeColor] || colorMap.blue;
//   const Icon = originalIcon || ConfigIcon;

//   const handlePointerDown = (event) => {
//     pointerStartRef.current = { x: event.clientX, y: event.clientY };
//     didDragRef.current = false;
//   };

//   const handlePointerMove = (event) => {
//     if (!pointerStartRef.current) return;

//     const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
//     const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

//     if (deltaX > 10 || deltaY > 10) {
//       didDragRef.current = true;
//     }
//   };

//   const handlePointerCancel = () => {
//     pointerStartRef.current = null;
//     didDragRef.current = false;
//   };

//   const handleCardClick = () => {
//     if (didDragRef.current) {
//       didDragRef.current = false;
//       return;
//     }

//     setIsFlipped((current) => !current);
//   };

//   const normTitle = title.toLowerCase().trim();

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
//       transition={{ duration: 0.5, delay }}
//       className="perspective-1000 w-full"
//     >
//       <motion.div
//         className="group relative w-full cursor-pointer touch-pan-y min-h-[385px] xs:min-h-[395px] sm:min-h-[410px] md:min-h-[425px]"
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//         transition={{ duration: 0.55, type: "spring", stiffness: 110, damping: 14 }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerCancel={handlePointerCancel}
//         onClick={handleCardClick}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Front Side */}
//         <div
//           className={`absolute inset-0 ${colors.bg} border ${colors.border} rounded-[2rem] p-5 transition-all duration-300 backface-hidden flex flex-col justify-between overflow-hidden`}
//           style={{ 
//             backfaceVisibility: "hidden",
//             boxShadow: isHovered 
//               ? `0 20px 45px -10px ${hexToRgba(colors.accentColor, 0.16)}` 
//               : `0 12px 35px -15px ${hexToRgba(colors.accentColor, 0.10)}`
//           }}
//         >
//           {/* Ambient Glow (Increased opacity for higher vibrancy) */}
//           <div 
//             className="absolute bottom-[-30px] right-[-30px] w-52 h-52 rounded-full filter blur-3xl opacity-[0.20] pointer-events-none"
//             style={{ 
//               background: `radial-gradient(circle, ${colors.accentColor} 0%, transparent 70%)` 
//             }}
//           />

//           {/* Dotted pattern - 42 dots matching the user uploaded layout */}
//           <div className="absolute right-6 top-6 grid grid-cols-7 gap-1.5 opacity-[0.35] pointer-events-none">
//             {[...Array(42)].map((_, i) => (
//               <span
//                 key={i}
//                 className="w-[2.5px] h-[2.5px] rounded-full"
//                 style={{ backgroundColor: colors.accentColor }}
//               />
//             ))}
//           </div>

//           {/* Unique Background Illustration based on Card Category */}
//           {renderBackgroundIllustration(normTitle, colors.accentColor, propIllustration, themeColor)}

//           <div>
//             {/* Hexagonal Stacked Icon Badge */}
//             <StackedHexagon icon={Icon} accentColor={colors.accentColor} />

//             {/* Header Segment */}
//             <span className={`text-[10px] font-bold tracking-widest block mb-1 ${colors.text}`}>
//               {tag}
//             </span>
            
//             <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
//               {title}
//             </h3>

//             {/* Accent Underline */}
//             <div className={`w-8 h-1 rounded-full mb-2 ${colors.btn}`} />

//             <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
//               {summary}
//             </p>

//             {/* Pill Tags (Slices up to 3 tags with brand icons and original brand colors) */}
//             {features.length > 0 && (
//               <div className="flex flex-wrap gap-1.5 mb-3">
//                 {features.flatMap(f => f.split('&').map(sub => sub.trim())).slice(0, 3).map((featureTag, idx) => {
//                   const tagInfo = getTagData(featureTag, colors.accentColor);
//                   return (
//                     <span 
//                       key={idx} 
//                       className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5"
//                     >
//                       {tagInfo.icon}
//                       {tagInfo.title}
//                     </span>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Footer Action */}
//           <div className="flex items-center gap-2">
//             <span 
//               className={`font-bold text-sm tracking-wide transition-colors duration-200 ${colors.text} hover:opacity-85`}
//             >
//               Learn More
//             </span>
//             <button className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1 ${colors.btn}`}>
//               <ArrowRight className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         </div>

//         {/* Back Side */}
//         <div
//           className={`absolute inset-0 ${colors.bg} border ${colors.border} rounded-[2rem] p-5 backface-hidden flex flex-col justify-between overflow-hidden`}
//           style={{ 
//             backfaceVisibility: "hidden",
//             transform: "rotateY(180deg)",
//             boxShadow: isHovered 
//               ? `0 20px 45px -10px ${hexToRgba(colors.accentColor, 0.16)}` 
//               : `0 12px 35px -15px ${hexToRgba(colors.accentColor, 0.10)}`
//           }}
//         >
//           {/* Ambient Glow */}
//           <div 
//             className="absolute bottom-[-30px] right-[-30px] w-52 h-52 rounded-full filter blur-3xl opacity-[0.20] pointer-events-none"
//             style={{ 
//               background: `radial-gradient(circle, ${colors.accentColor} 0%, transparent 70%)` 
//             }}
//           />

//           {/* Dotted pattern - 42 dots */}
//           <div className="absolute right-6 top-6 grid grid-cols-7 gap-1.5 opacity-[0.35] pointer-events-none">
//             {[...Array(42)].map((_, i) => (
//               <span
//                 key={i}
//                 className="w-[2.5px] h-[2.5px] rounded-full"
//                 style={{ backgroundColor: colors.accentColor }}
//               />
//             ))}
//           </div>

//           {/* Unique Background Illustration based on Card Category */}
//           {renderBackgroundIllustration(normTitle, colors.accentColor)}

//           <div>
//             {/* Header Segment */}
//             <span className={`text-[10px] font-bold tracking-widest block mb-1 ${colors.text}`}>
//               {tag}
//             </span>
            
//             <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
//               {title}
//             </h3>

//             {/* Accent Underline */}
//             <div className={`w-8 h-1 rounded-full mb-2 ${colors.btn}`} />

//             <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
//               {fullContent}
//             </p>

//             {/* All Features list */}
//             {features.length > 0 && (
//               <div className="mb-3">
//                 <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
//                   Key Deliverables:
//                 </h4>
//                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
//                   {features.map((f, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
//                     >
//                       <span 
//                         className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.btn}`} 
//                       />
//                       <span className="truncate">{f}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Footer Action */}
//           <div className="flex items-center gap-2">
//             <span 
//               className={`font-bold text-sm tracking-wide transition-colors duration-200 ${colors.text} hover:opacity-85`}
//             >
//               Go Back
//             </span>
//             <button className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:-translate-x-1 ${colors.btn}`}>
//               <ArrowRight className="w-3.5 h-3.5 rotate-180" />
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FlipCard;




































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

  // --- Government Tenders Cards ---
  if (norm.includes("minnagam support")) {
    return { tag: "SUPPORT", themeColor: "green", icon: SearchCheck };
  }
  if (norm.includes("documentation support")) {
    return { tag: "DOCUMENTATION", themeColor: "blue", icon: FileCheck2 };
  }
  if (norm.includes("proposal preparation")) {
    return { tag: "PROPOSAL", themeColor: "purple", icon: Briefcase };
  }
  if (norm.includes("portal assistance") || norm === "government tenders") {
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

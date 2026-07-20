// import { motion } from "framer-motion";

// const AboutHero = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.14,
//         delayChildren: 0.08,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
//     },
//   };

//   return (
//     <section className="relative min-h-[86svh] overflow-hidden bg-background text-zinc-900">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,163,74,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(22,163,74,0.08),transparent_18%),linear-gradient(180deg,rgba(232,235,235,0.95)_0%,rgba(232,235,235,1)_100%)]" />
//       <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,rgba(120,113,108,0.08)_1px,transparent_1px)] bg-[length:56px_56px]" />

//       <div className="relative z-10 container-custom px-4 md:px-8 pt-10 pb-24 md:pt-12 md:pb-20 min-h-[86svh] flex items-center">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid w-full items-center gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_1fr]"
//         >
//           <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
//             <motion.div variants={itemVariants} className="mb-6">
//               <span className="inline-flex items-center gap-2 rounded-full border border-[#16a34a]/25 bg-[#16a34a]/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#14532d] backdrop-blur-md shadow-[0_0_24px_rgba(22,163,74,0.12)]">
//                 About Us
//               </span>
//             </motion.div>

//             <motion.h1
//               variants={itemVariants}
//               className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-zinc-900"
//             >
//               <span className="block text-zinc-900">Innovating the</span>
//               <span className="block mt-2 md:mt-0 lg:mt-0">
//                 <span className="text-primary">
//                   Digital
//                 </span>{" "}
//                 <span className="text-primary">
//                   Landscape
//                 </span>
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-700 text-justify"
//             >
//               Izone Technology was established in 2016 at Trichy with diverse
//               knowledge. We deliver web designing and development, software and
//               mobile app development, bulk messaging solutions, and career
//               development programs with clarity, quality, and long-term growth.
//             </motion.p>

//           </div>

//           <motion.div
//             variants={itemVariants}
//             className="relative h-[320px] sm:h-[380px] lg:h-[460px] xl:h-[500px]"
//           >
//             <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-[#16a34a]/18 blur-3xl" />
//             <div className="absolute -right-4 top-0 h-28 w-28 rounded-full bg-[#8b5cf6]/12 blur-3xl" />

//             <motion.div
//               animate={{
//                 y: [0, -10, 0],
//                 rotate: [0, 1.2, 0],
//                 borderRadius: [
//                   "40% 60% 56% 44% / 36% 42% 58% 64%",
//                   "46% 54% 48% 52% / 44% 36% 64% 56%",
//                   "40% 60% 56% 44% / 36% 42% 58% 64%",
//                 ],
//               }}
//               transition={{
//                 duration: 9,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="relative h-full overflow-hidden border border-zinc-200 bg-white/88 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.10)] backdrop-blur-xl lg:p-3.5"
//               style={{
//                 clipPath: "polygon(5% 0%, 95% 0%, 100% 8%, 100% 92%, 95% 100%, 5% 100%, 0% 92%, 0% 8%)",
//               }}
//             >
//               <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(22,163,74,0.03)),radial-gradient(circle_at_25%_18%,rgba(22,163,74,0.14),transparent_26%),radial-gradient(circle_at_82%_76%,rgba(139,92,246,0.08),transparent_24%)]" />
//               <div className="absolute inset-[10px] border border-dashed border-zinc-200/70 pointer-events-none" />

//               <motion.div
//                 animate={{ scale: [1, 1.03, 1], x: [0, 4, 0] }}
//                 transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
//                 className="relative h-full overflow-hidden border border-zinc-200 bg-[#f6f8f5] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
//                 style={{
//                   borderRadius: "32% 68% 58% 42% / 30% 42% 58% 70%",
//                 }}
//               >
//                 <img
//                   src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop&auto=format&q=75"
//                   alt="About Izone showcase"
//                   className="h-full w-full object-cover object-center opacity-95"
//                 />
//                 <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,245,0.06),rgba(255,248,235,0.28))]" />
//                 <div className="absolute inset-x-0 top-0 h-12 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutHero;
































// import { motion } from "framer-motion";

// const AboutHero = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.14,
//         delayChildren: 0.08,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
//     },
//   };

//   return (
//     <section className="relative min-h-[86svh] overflow-hidden bg-background text-zinc-900">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,163,74,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(22,163,74,0.08),transparent_18%),linear-gradient(180deg,rgba(232,235,235,0.95)_0%,rgba(232,235,235,1)_100%)]" />
//       <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,rgba(120,113,108,0.08)_1px,transparent_1px)] bg-[length:56px_56px]" />

//       <div className="relative z-10 container-custom px-4 md:px-8 pt-10 pb-24 md:pt-12 md:pb-20 min-h-[86svh] flex items-center">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid w-full items-center gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_1fr]"
//         >
//           <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
//             <motion.div variants={itemVariants} className="mb-6">
//               <span className="inline-flex items-center gap-2 rounded-full border border-[#16a34a]/25 bg-[#16a34a]/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#14532d] backdrop-blur-md shadow-[0_0_24px_rgba(22,163,74,0.12)]">
//                 About Us
//               </span>
//             </motion.div>

//             <motion.h1
//               variants={itemVariants}
//               className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-zinc-900"
//             >
//               <span className="block text-zinc-900">Innovating the</span>
//               <span className="block mt-2 md:mt-0 lg:mt-0">
//                 <span className="text-primary">
//                   Digital
//                 </span>{" "}
//                 <span className="text-primary">
//                   Landscape
//                 </span>
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-700 text-justify"
//             >
//               Izone Technology was established in 2016 at Trichy with diverse
//               knowledge. We deliver web designing and development, software and
//               mobile app development, bulk messaging solutions, and career
//               development programs with clarity, quality, and long-term growth.
//             </motion.p>

//           </div>

//           <motion.div
//             variants={itemVariants}
//             className="relative h-[320px] sm:h-[380px] lg:h-[460px] xl:h-[500px]"
//           >
//             <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-[#16a34a]/18 blur-3xl" />
//             <div className="absolute -right-4 top-0 h-28 w-28 rounded-full bg-[#8b5cf6]/12 blur-3xl" />

//             {/* Soft halo behind the blob so the edge blends into the section
//                background instead of showing a hard white frame */}
//             <div className="absolute inset-4 rounded-[45%] bg-gradient-to-br from-[#16a34a]/10 via-transparent to-[#8b5cf6]/10 blur-2xl" />

//             <motion.div
//               animate={{
//                 y: [0, -10, 0],
//                 borderRadius: [
//                   "62% 38% 55% 45% / 48% 42% 58% 52%",
//                   "48% 52% 42% 58% / 58% 48% 52% 42%",
//                   "62% 38% 55% 45% / 48% 42% 58% 52%",
//                 ],
//               }}
//               transition={{
//                 duration: 9,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="relative h-full w-full overflow-hidden shadow-[0_28px_90px_rgba(0,0,0,0.14)] ring-1 ring-white/70"
//             >
//               <motion.img
//                 animate={{ scale: [1.04, 1.1, 1.04] }}
//                 transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//                 src="/hero/about-hero.png"
//                 alt="About Izone showcase"
//                 className="absolute inset-0 h-full w-full object-cover object-center"
//               />
//               {/* Colour wash tied to the same blob so the mask edge and the
//                  photo tone read as one continuous shape, not a picture
//                  dropped inside an unrelated frame */}
//               <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(22,163,74,0.16),transparent_45%,rgba(139,92,246,0.12))] mix-blend-overlay" />
//               <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]" />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutHero;





































// import { motion } from "framer-motion";

// const AboutHero = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.14,
//         delayChildren: 0.08,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
//     },
//   };

//   return (
//     <section className="relative min-h-[86svh] overflow-hidden bg-background text-zinc-900">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,163,74,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(22,163,74,0.08),transparent_18%),linear-gradient(180deg,rgba(232,235,235,0.95)_0%,rgba(232,235,235,1)_100%)]" />
//       <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,rgba(120,113,108,0.08)_1px,transparent_1px)] bg-[length:56px_56px]" />

//       <div className="relative z-10 container-custom px-4 md:px-8 pt-10 pb-24 md:pt-12 md:pb-20 min-h-[86svh] flex items-center">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid w-full items-center gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_1fr]"
//         >
//           <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
//             <motion.div variants={itemVariants} className="mb-6">
//               <span className="inline-flex items-center gap-2 rounded-full border border-[#16a34a]/25 bg-[#16a34a]/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#14532d] backdrop-blur-md shadow-[0_0_24px_rgba(22,163,74,0.12)]">
//                 About Us
//               </span>
//             </motion.div>

//             <motion.h1
//               variants={itemVariants}
//               className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-zinc-900"
//             >
//               <span className="block text-zinc-900">Innovating the</span>
//               <span className="block mt-2 md:mt-0 lg:mt-0">
//                 <span className="text-primary">Digital</span>{" "}
//                 <span className="text-primary">Landscape</span>
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-700 text-justify"
//             >
//               Izone Technology was established in 2016 at Trichy with diverse
//               knowledge. We deliver web designing and development, software and
//               mobile app development, bulk messaging solutions, and career
//               development programs with clarity, quality, and long-term growth.
//             </motion.p>
//           </div>

//           {/* ---------------- Hero Image ---------------- */}
//           <motion.div
//             variants={itemVariants}
//             className="relative h-[320px] sm:h-[380px] lg:h-[460px] xl:h-[500px]"
//           >
//             {/* Ambient background glows */}
//             <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-[#16a34a]/18 blur-3xl" />
//             <div className="absolute -right-4 top-0 h-28 w-28 rounded-full bg-[#8b5cf6]/12 blur-3xl" />

//             {/* Gentle float only — no scale/border-radius morphing */}
//             <motion.div
//               animate={{ y: [0, -12, 0] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//               className="relative h-full w-full"
//             >
//               {/* Gradient border frame */}
//               <div className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-br from-[#16a34a]/50 via-white/40 to-[#8b5cf6]/40 blur-[1px]" />

//               <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-[0_28px_90px_rgba(0,0,0,0.14)] ring-1 ring-white/70">
//                 <img
//                   src="/hero/about-hero.png"
//                   alt="About Izone showcase"
//                   className="absolute inset-0 h-full w-full object-cover object-center"
//                 />
//                 <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(22,163,74,0.16),transparent_45%,rgba(139,92,246,0.12))] mix-blend-overlay" />
//                 <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]" />
//               </div>

//               {/* Decorative corner accent */}
//               <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-2xl border-2 border-[#16a34a]/30 bg-white/60 backdrop-blur-md shadow-lg" />
//             </motion.div>

//             {/* Floating stat/badge card */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: [0, 8, 0] }}
//               transition={{
//                 opacity: { duration: 0.6, delay: 0.4 },
//                 y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
//               }}
//               className="absolute -top-4 -right-4 lg:-right-6 rounded-2xl bg-white/90 backdrop-blur-md px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
//             >
//               <p className="text-2xl font-black text-primary leading-none">2016</p>
//               <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mt-1">
//                 Since
//               </p>
//             </motion.div>
//           </motion.div>
//           {/* -------------- End Hero Image -------------- */}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutHero;






































// import { motion } from "framer-motion";

// const AboutHero = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.14,
//         delayChildren: 0.08,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
//     },
//   };

//   return (
//     <section className="relative min-h-[86svh] overflow-hidden bg-background text-zinc-900">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,163,74,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(22,163,74,0.08),transparent_18%),linear-gradient(180deg,rgba(232,235,235,0.95)_0%,rgba(232,235,235,1)_100%)]" />
//       <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,rgba(120,113,108,0.08)_1px,transparent_1px)] bg-[length:56px_56px]" />

//       <div className="relative z-10 container-custom px-4 md:px-8 pt-10 pb-24 md:pt-12 md:pb-20 min-h-[86svh] flex items-center">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid w-full items-center gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_1fr]"
//         >
//           <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
//             <motion.div variants={itemVariants} className="mb-6">
//               <span className="inline-flex items-center gap-2 rounded-full border border-[#16a34a]/25 bg-[#16a34a]/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#14532d] backdrop-blur-md shadow-[0_0_24px_rgba(22,163,74,0.12)]">
//                 About Us
//               </span>
//             </motion.div>

//             <motion.h1
//               variants={itemVariants}
//               className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-zinc-900"
//             >
//               <span className="block text-zinc-900">Innovating the</span>
//               <span className="block mt-2 md:mt-0 lg:mt-0">
//                 <span className="text-primary">Digital</span>{" "}
//                 <span className="text-primary">Landscape</span>
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-700 text-justify"
//             >
//               Izone Technology was established in 2016 at Trichy with diverse
//               knowledge. We deliver web designing and development, software and
//               mobile app development, bulk messaging solutions, and career
//               development programs with clarity, quality, and long-term growth.
//             </motion.p>
//           </div>

//           {/* ---------------- Hero Image: Stacked Card Design ---------------- */}
//           <motion.div
//             variants={itemVariants}
//             className="relative h-[320px] sm:h-[380px] lg:h-[460px] xl:h-[500px] mx-auto w-full max-w-[420px] lg:max-w-none"
//           >
//             {/* Ambient background glows */}
//             <div className="absolute -left-6 top-4 h-28 w-28 rounded-full bg-[#16a34a]/16 blur-3xl" />
//             <div className="absolute -right-6 bottom-4 h-28 w-28 rounded-full bg-[#8b5cf6]/14 blur-3xl" />

//             {/* Back accent card — solid color panel peeking from behind */}
//             <div className="absolute inset-0 translate-x-4 translate-y-5 rotate-[4deg] rounded-[2rem] bg-gradient-to-br from-[#16a34a] to-[#0f7a3a] shadow-[0_20px_60px_rgba(22,163,74,0.25)]" />

//             {/* Dotted accent panel peeking from the other side */}
//             <div className="absolute inset-0 -translate-x-3 -translate-y-4 -rotate-[3deg] rounded-[2rem] border-2 border-dashed border-[#8b5cf6]/40 bg-white/40" />

//             {/* Main photo card — front and centered, slight hover tilt */}
//             <motion.div
//               whileHover={{ rotate: 0, scale: 1.015 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-[0_28px_80px_rgba(0,0,0,0.18)] ring-1 ring-white/70"
//             >
//               <img
//                 src="/hero/about-hero.png"
//                 alt="About Izone showcase"
//                 className="absolute inset-0 h-full w-full object-cover object-center"
//               />
//               <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(22,163,74,0.14),transparent_45%,rgba(139,92,246,0.10))] mix-blend-overlay" />
//               <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),transparent)]" />

//               {/* Bottom caption strip on the photo itself */}
//               <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 via-black/20 to-transparent px-5 py-4">
//                 <div>
//                   <p className="text-white text-sm font-semibold tracking-wide">
//                     Izone Technologies
//                   </p>
//                   <p className="text-white/70 text-xs">Trichy, India</p>
//                 </div>
//                 <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30">
//                   <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
//                 </span>
//               </div>
//             </motion.div>

//             {/* Floating experience badge, overlapping top-right corner */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
//               className="absolute -top-5 -right-5 z-20 rounded-2xl bg-white px-5 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
//             >
//               <p className="text-2xl font-black text-primary leading-none">9+</p>
//               <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mt-1">
//                 Years
//               </p>
//             </motion.div>
//           </motion.div>
//           {/* -------------- End Hero Image -------------- */}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutHero;













































// import { motion } from "framer-motion";

// const AboutHero = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.14,
//         delayChildren: 0.08,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
//     },
//   };

//   const stats = [
//     { label: "Founded", value: "2016" },
//     { label: "Team", value: "25+" },
//     { label: "Clients", value: "80+" },
//   ];

//   return (
//     <section className="relative min-h-[86svh] overflow-hidden bg-background text-zinc-900">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,163,74,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(22,163,74,0.08),transparent_18%),linear-gradient(180deg,rgba(232,235,235,0.95)_0%,rgba(232,235,235,1)_100%)]" />
//       <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,rgba(120,113,108,0.08)_1px,transparent_1px)] bg-[length:56px_56px]" />

//       <div className="relative z-10 container-custom px-4 md:px-8 pt-10 pb-24 md:pt-12 md:pb-20 min-h-[86svh] flex items-center">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid w-full items-center gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_1fr]"
//         >
//           <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
//             <motion.div variants={itemVariants} className="mb-6">
//               <span className="inline-flex items-center gap-2 rounded-full border border-[#16a34a]/25 bg-[#16a34a]/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#14532d] backdrop-blur-md shadow-[0_0_24px_rgba(22,163,74,0.12)]">
//                 About Us
//               </span>
//             </motion.div>

//             <motion.h1
//               variants={itemVariants}
//               className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-zinc-900"
//             >
//               <span className="block text-zinc-900">Innovating the</span>
//               <span className="block mt-2 md:mt-0 lg:mt-0">
//                 <span className="text-primary">Digital</span>{" "}
//                 <span className="text-primary">Landscape</span>
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-700 text-justify"
//             >
//               Izone Technology was established in 2016 at Trichy with diverse
//               knowledge. We deliver web designing and development, software and
//               mobile app development, bulk messaging solutions, and career
//               development programs with clarity, quality, and long-term growth.
//             </motion.p>
//           </div>

//           {/* ---------------- Hero Image: Viewfinder Frame Design ---------------- */}
//           <motion.div
//             variants={itemVariants}
//             className="relative h-[320px] sm:h-[380px] lg:h-[460px] xl:h-[500px] mx-auto w-full max-w-[440px] lg:max-w-none"
//           >
//             {/* Ambient background glows */}
//             <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#16a34a]/16 blur-3xl" />
//             <div className="absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-[#8b5cf6]/14 blur-3xl" />

//             {/* Photo, inset slightly to leave room for corner brackets */}
//             <div className="absolute inset-6 overflow-hidden rounded-xl shadow-[0_24px_70px_rgba(0,0,0,0.16)]">
//               <img
//                 src="/hero/about-hero.png"
//                 alt="About Izone showcase"
//                 className="absolute inset-0 h-full w-full object-cover object-center"
//               />
//               <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(22,163,74,0.14),transparent_45%,rgba(139,92,246,0.10))] mix-blend-overlay" />
//               <div className="absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),transparent)]" />
//             </div>

//             {/* Viewfinder corner brackets */}
//             {[
//               "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
//               "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
//               "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
//               "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
//             ].map((pos, i) => (
//               <div
//                 key={i}
//                 className={`absolute h-10 w-10 border-[#16a34a] ${pos}`}
//               />
//             ))}

//             {/* Small pulsing "live" tag, top-left */}
//             <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5">
//               <motion.span
//                 animate={{ opacity: [1, 0.3, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                 className="h-1.5 w-1.5 rounded-full bg-[#4ade80]"
//               />
//               <span className="text-[10px] font-medium uppercase tracking-wider text-white/90">
//                 Trichy, India
//               </span>
//             </div>

//             {/* Stat strip along the bottom, half overlapping the photo */}
//             <motion.div
//               initial={{ opacity: 0, y: 14 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
//               className="absolute -bottom-2 left-1/2 z-20 flex -translate-x-1/2 divide-x divide-zinc-200 overflow-hidden rounded-2xl bg-white shadow-[0_16px_45px_rgba(0,0,0,0.14)] ring-1 ring-black/5"
//             >
//               {stats.map((stat) => (
//                 <div key={stat.label} className="px-4 py-3 text-center min-w-[86px]">
//                   <p className="text-lg font-black text-primary leading-none">
//                     {stat.value}
//                   </p>
//                   <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mt-1">
//                     {stat.label}
//                   </p>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>
//           {/* -------------- End Hero Image -------------- */}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutHero;





























// import { motion } from "framer-motion";

// const AboutHero = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.14,
//         delayChildren: 0.08,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
//     },
//   };

//   return (
//     <section className="relative min-h-[86svh] overflow-hidden bg-background text-zinc-900">
//       {/* Gradient mesh background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,163,74,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(22,163,74,0.08),transparent_18%),linear-gradient(180deg,rgba(232,235,235,0.95)_0%,rgba(232,235,235,1)_100%)]" />
//       <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,rgba(120,113,108,0.08)_1px,transparent_1px)] bg-[length:56px_56px]" />
//       {/* Subtle grain/noise texture for a premium feel */}
//       <div
//         className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
//         style={{
//           backgroundImage:
//             "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//         }}
//       />

//       {/* <div className="relative z-10 container-custom px-4 md:px-8 pt-10 pb-24 md:pt-12 md:pb-20 min-h-[86svh] flex items-center"> */}
//       <div className="relative z-10 container-custom max-w-[1400px] px-4 md:px-8 pt-10 pb-24 md:pt-12 md:pb-20 min-h-[86svh] flex items-center">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid w-full items-center gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_1.05fr]"
//         >
//           <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
//             <motion.div variants={itemVariants} className="mb-6">
//               <span className="inline-flex items-center gap-2 rounded-full border border-[#16a34a]/25 bg-[#16a34a]/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#14532d] backdrop-blur-md shadow-[0_0_24px_rgba(22,163,74,0.12)]">
//                 About Us
//               </span>
//             </motion.div>

//             <motion.h1
//               variants={itemVariants}
//               className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-zinc-900"
//             >
//               <span className="block text-zinc-900">Innovating the</span>
//               <span className="block mt-2 md:mt-0 lg:mt-0">
//                 <span className="text-primary">Digital</span>{" "}
//                 <span className="text-primary">Landscape</span>
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-700 text-justify"
//             >
//               Izone Technology was established in 2016 at Trichy with diverse
//               knowledge. We deliver web designing and development, software and
//               mobile app development, bulk messaging solutions, and career
//               development programs with clarity, quality, and long-term growth.
//             </motion.p>

//             {/* Trendy chip row */}
//             <motion.div
//               variants={itemVariants}
//               className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2.5"
//             >
//               {["Web", "Mobile", "AI Solutions", "Training"].map((chip) => (
//                 <span
//                   key={chip}
//                   className="rounded-full border border-zinc-900/10 bg-white/60 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm"
//                 >
//                   {chip}
//                 </span>
//               ))}
//             </motion.div>
//           </div>

//           {/* ---------------- Hero Image: Bento Grid + Glassmorphism ---------------- */}
//           <motion.div
//             variants={itemVariants}
//             className="relative h-[380px] sm:h-[440px] lg:h-[500px] xl:h-[520px] mx-auto w-full max-w-[480px] lg:max-w-none"
//           >
//             {/* Floating gradient blobs behind the grid */}
//             <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#16a34a]/20 blur-[70px]" />
//             <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-[#8b5cf6]/18 blur-[70px]" />

//             <div className="relative grid h-full w-full grid-cols-5 grid-rows-5 gap-3">
//               {/* Main large tile */}
//               <div className="col-span-5 row-span-4 relative overflow-hidden rounded-[1.75rem] shadow-[0_24px_70px_rgba(0,0,0,0.16)] ring-1 ring-white/60">
//                 <img
//                   src="/hero/about-hero.png"
//                   alt="About Izone showcase"
//                   className="absolute inset-0 h-full w-full object-cover object-center"
//                 />
//                 <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(22,163,74,0.18),transparent_40%,rgba(139,92,246,0.14))] mix-blend-overlay" />
//                 <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />

//                 {/* Glass badge, floating top-right on the image */}
//                 <div className="absolute top-4 right-4 flex items-center gap-2 rounded-2xl bg-white/25 backdrop-blur-xl border border-white/30 px-3.5 py-2 shadow-lg">
//                   <motion.span
//                     animate={{ opacity: [1, 0.35, 1] }}
//                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                     className="h-2 w-2 rounded-full bg-[#4ade80]"
//                   />
//                   <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
//                     Est. 2016
//                   </span>
//                 </div>

//                 {/* Bottom-left glass caption */}
//                 <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-black/25 backdrop-blur-xl border border-white/10 px-4 py-3">
//                   <div>
//                     <p className="text-white text-sm font-semibold leading-tight">
//                       Izone Technologies
//                     </p>
//                     <p className="text-white/70 text-xs">Trichy, India</p>
//                   </div>
//                   {/* <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#16a34a] to-[#8b5cf6]" /> */}
//                   <img
//                     src="/izone logo editing 1.png"
//                     alt="IZONE Technologies"
//                     className="h-10 w-10 rounded-full object-cover border border-white/20"
//                   />
//                 </div>
//               </div>

//               {/* Bottom-left small stat tile */}
//               <motion.div
//                 whileHover={{ y: -4 }}
//                 transition={{ duration: 0.3 }}
//                 className="col-span-2 row-span-1 flex flex-col justify-center rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 px-4 shadow-md"
//               >
//                 <p className="text-xl font-black text-primary leading-none">25+</p>
//                 <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mt-1">
//                   Team Members
//                 </p>
//               </motion.div>

//               {/* Bottom-right small gradient tile */}
//               <motion.div
//                 whileHover={{ y: -4 }}
//                 transition={{ duration: 0.3 }}
//                 className="col-span-3 row-span-1 flex items-center justify-between rounded-2xl bg-gradient-to-br from-[#16a34a] to-[#0f7a3a] px-4 shadow-md"
//               >
//                 <div>
//                   <p className="text-xl font-black text-white leading-none">80+</p>
//                   <p className="text-[10px] font-medium uppercase tracking-wider text-white/75 mt-1">
//                     Happy Clients
//                   </p>
//                 </div>
//                 <svg
//                   className="h-6 w-6 text-white/80"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </motion.div>
//             </div>
//           </motion.div>
//           {/* -------------- End Hero Image -------------- */}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutHero;




























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
              Izone Technology was established in 2016 at Trichy with diverse
              knowledge. We deliver web designing and development, software and
              mobile app development, bulk messaging solutions, and career
              development programs with clarity, quality, and long-term growth.
            </motion.p>

            {/* Icon chip row */}
            <motion.div
              variants={itemVariants}
              className="mt-7 flex flex-wrap justify-center lg:justify-start gap-2.5"
            >
              {[
                { label: "Web", icon: Globe },
                { label: "Mobile", icon: Smartphone },
                { label: "AI Solutions", icon: Sparkles },
                { label: "Training", icon: GraduationCap },
              ].map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
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
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-5"
            >
              {[
                { icon: Users, value: "25+", label: "Team Members" },
                { icon: Smile, value: "80+", label: "Happy Clients" },
                { icon: Award, value: "10+", label: "Years Experience" },
              ].map(({ icon: Icon, value, label }, idx) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="text-left">
                    <p className="text-xl font-black leading-none text-zinc-900">{value}</p>
                    <p className="text-xs font-medium text-zinc-500 mt-1">{label}</p>
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
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Sparkles, Activity } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function CorePillarsSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);

  // Element refs for Chapter 1
  const title1Ref = useRef(null);
  const desc1Ref = useRef(null);
  const portalRef = useRef(null);
  const portalImgRef = useRef(null);
  const ch1Float1 = useRef(null);
  const ch1Float2 = useRef(null);

  // Element refs for Chapter 2
  const chapter2Ref = useRef(null);
  const title2Ref = useRef(null);
  const desc2Ref = useRef(null);
  const floatLayer1 = useRef(null);
  const floatLayer2 = useRef(null);
  const floatLayer3 = useRef(null);

  // Element refs for Chapter 3
  const chapter3Ref = useRef(null);
  const title3Ref = useRef(null);
  const desc3Ref = useRef(null);
  const svgPathRef = useRef(null);
  const magneticButtonRef = useRef(null);
  const ch3Float1 = useRef(null);
  const ch3Float2 = useRef(null);

  // Live Canvas Particle Constellation System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = [];
    const maxParticles = 55;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 0.8
      });
    }

    let mouse = { x: null, y: null };
    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = stickyRef.current;
    if (parent) {
      parent.addEventListener("mousemove", handleMouse);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const pColor = isDark ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.2)";
      const lColor = isDark ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.05)";

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += dx * 0.005;
            p.y += dy * 0.005;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lColor;
            ctx.lineWidth = 0.55 * (1 - dist / 100);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouse);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;

    if (!container || !sticky || !title1Ref.current || !portalRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const title1Words = title1Ref.current ? title1Ref.current.querySelectorAll(".word-reveal") : [];
      const title2Words = title2Ref.current ? title2Ref.current.querySelectorAll(".word-reveal") : [];
      const title3Words = title3Ref.current ? title3Ref.current.querySelectorAll(".word-reveal") : [];
      const desc2Lines = desc2Ref.current ? desc2Ref.current.querySelectorAll(".desc-line-reveal") : [];
      const desc3Lines = desc3Ref.current ? desc3Ref.current.querySelectorAll(".desc-line-reveal") : [];

      // ─── Chapter 1: Visible immediately (no fade-in) ───
      if (title1Words.length) gsap.set(title1Words, { yPercent: 0, opacity: 1 });
      if (desc1Ref.current) gsap.set(desc1Ref.current, { opacity: 1, y: 0 });
      if (ch1Float1.current) gsap.set(ch1Float1.current, { y: -10, opacity: 0.95 });
      if (ch1Float2.current) gsap.set(ch1Float2.current, { y: 15, opacity: 0.95 });

      // ─── Chapter 2: Auto-playing text + float timelines ───
      const textTl2 = gsap.timeline({ paused: true });
      if (title2Words.length) {
        textTl2.fromTo(title2Words,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" }
        );
      }
      if (desc2Lines.length) {
        textTl2.fromTo(desc2Lines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
          "-=0.35"
        );
      }
      const floatTl2 = gsap.timeline({ paused: true });
      if (floatLayer1.current) floatTl2.fromTo(floatLayer1.current, { y: 60, opacity: 0 }, { y: -15, opacity: 0.95, duration: 0.7, ease: "power2.out" });
      if (floatLayer2.current) floatTl2.fromTo(floatLayer2.current, { y: 80, opacity: 0 }, { y: 20, opacity: 0.95, duration: 0.7, ease: "power2.out" }, "<0.1");
      if (floatLayer3.current) floatTl2.fromTo(floatLayer3.current, { y: 50, opacity: 0 }, { y: -10, opacity: 0.95, duration: 0.7, ease: "power2.out" }, "<0.1");

      // ─── Chapter 3: Auto-playing text + float + SVG + button timelines ───
      const textTl3 = gsap.timeline({ paused: true });
      if (title3Words.length) {
        textTl3.fromTo(title3Words,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" }
        );
      }
      if (desc3Lines.length) {
        textTl3.fromTo(desc3Lines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
          "-=0.35"
        );
      }
      const floatTl3 = gsap.timeline({ paused: true });
      if (ch3Float1.current) floatTl3.fromTo(ch3Float1.current, { y: 60, opacity: 0 }, { y: -10, opacity: 0.95, duration: 0.7, ease: "power2.out" });
      if (ch3Float2.current) floatTl3.fromTo(ch3Float2.current, { y: 80, opacity: 0 }, { y: 20, opacity: 0.95, duration: 0.7, ease: "power2.out" }, "<0.1");

      const svgBtnTl3 = gsap.timeline({ paused: true });
      if (svgPathRef.current) {
        const pathLength = svgPathRef.current.getTotalLength();
        gsap.set(svgPathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        svgBtnTl3.to(svgPathRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" });
      }
      if (magneticButtonRef.current) {
        svgBtnTl3.fromTo(magneticButtonRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4"
        );
      }

      // ─── Main scroll-scrubbed timeline: only chapter fades + portal ───
      const tl = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: sticky,
          invalidateOnRefresh: true,
        }
      });

      // Portal expand (keeps cinematic scroll-scrubbed feel)
      tl.fromTo(portalRef.current,
        { clipPath: "circle(12% at 50% 50%)" },
        { clipPath: "circle(75% at 50% 50%)", duration: 6, ease: "power2.inOut" }
      );
      if (portalImgRef.current) {
        tl.fromTo(portalImgRef.current, { scale: 1.4 }, { scale: 1, duration: 6, ease: "power2.inOut" }, "<");
      }
      tl.fromTo(".parallax-shape-1", { y: -80, rotate: 0 }, { y: 120, rotate: 180, ease: "none", duration: 6 }, "<");
      tl.fromTo(".parallax-shape-2", { y: 150, rotate: 0 }, { y: -180, rotate: -120, ease: "none", duration: 6 }, "<");
      tl.fromTo(".parallax-shape-3", { y: 50, scale: 0.8 }, { y: -100, scale: 1.2, ease: "none", duration: 6 }, "<");

      // Chapter 1 floats drift with scroll
      if (ch1Float1.current) tl.to(ch1Float1.current, { y: -30, duration: 4, ease: "none" }, "-=4.5");
      if (ch1Float2.current) tl.to(ch1Float2.current, { y: 0, duration: 4, ease: "none" }, "<");

      // Fade out Chapter 1
      const exitTargets = [title1Ref.current, desc1Ref.current, ch1Float1.current, ch1Float2.current].filter(Boolean);
      if (exitTargets.length) {
        tl.to(exitTargets, { opacity: 0, y: -50, duration: 2, ease: "power2.in" }, "-=2");
      }

      // Fade in Chapter 2 container → auto-triggers its text + float animations
      if (chapter2Ref.current) {
        tl.fromTo(chapter2Ref.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2,
            onStart: () => { textTl2.play(); floatTl2.play(); },
            onReverseComplete: () => { textTl2.reverse(); floatTl2.reverse(); }
          }
        );
      }

      // Hold Chapter 2 for a bit, then fade it out
      if (chapter2Ref.current) {
        tl.to(chapter2Ref.current, { opacity: 0, y: -80, duration: 2, ease: "power2.in" }, "+=1");
      }

      // Fade in Chapter 3 container → locks scroll, auto-plays animations, then unlocks
      if (chapter3Ref.current) {
        tl.fromTo(chapter3Ref.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2,
            onStart: () => {
              // Lock scroll so user can't skip past Chapter 3 before it finishes
              if (window.lenis) window.lenis.stop();
              textTl3.play();
              floatTl3.play();
              svgBtnTl3.play();
            },
            onReverseComplete: () => {
              // User scrolled back — ensure lenis is running
              if (window.lenis) window.lenis.start();
              textTl3.reverse();
              floatTl3.reverse();
              svgBtnTl3.reverse();
            }
          }
        );
      }

      // Unlock scroll only after the last Chapter 3 animation finishes
      svgBtnTl3.eventCallback("onComplete", () => {
        if (window.lenis) window.lenis.start();
      });

    }, container);

    // Magnetic Mouse Interaction for CTA button
    const handleMouseMove = (e) => {
      const btn = magneticButtonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Pull toward cursor slightly
      gsap.to(btn, {
        x: x * 0.45,
        y: y * 0.45,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      const btn = magneticButtonRef.current;
      if (!btn) return;
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const btnEl = magneticButtonRef.current;
    if (btnEl) {
      btnEl.addEventListener("mousemove", handleMouseMove);
      btnEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (btnEl) {
        btnEl.removeEventListener("mousemove", handleMouseMove);
        btnEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white overflow-visible font-sans select-none"
      style={{ height: "320vh" }}
    >
      {/* Top transition blend */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f7faf8] dark:from-zinc-950 to-transparent pointer-events-none z-20" />



      {/* Background spin & pulse style sheet */}
      <style>{`
        @keyframes bg-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bg-pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.45; }
        }
        @keyframes wave-flow-1 {
          0% { stroke-dashoffset: 0; transform: translateY(0px) scaleY(1); }
          50% { stroke-dashoffset: 150; transform: translateY(-15px) scaleY(1.15); }
          100% { stroke-dashoffset: 300; transform: translateY(0px) scaleY(1); }
        }
        @keyframes wave-flow-2 {
          0% { stroke-dashoffset: 0; transform: translateY(0px) scaleY(1.1); }
          50% { stroke-dashoffset: -180; transform: translateY(20px) scaleY(0.9); }
          100% { stroke-dashoffset: -360; transform: translateY(0px) scaleY(1.1); }
        }
        @keyframes node-blink {
          0%, 100% { opacity: 0.15; transform: scale(0.9) translate(0, 0); }
          50% { opacity: 0.55; transform: scale(1.15) translate(4px, -4px); }
        }
        .animate-bg-spin {
          transform-origin: center;
          animation: bg-spin-slow 60s linear infinite;
        }
        .animate-bg-pulse {
          animation: bg-pulse-slow 7s ease-in-out infinite;
        }
        .animate-wave-1 {
          stroke-dasharray: 30, 15;
          transform-origin: center;
          animation: wave-flow-1 14s ease-in-out infinite;
        }
        .animate-wave-2 {
          stroke-dasharray: 20, 20;
          transform-origin: center;
          animation: wave-flow-2 18s ease-in-out infinite;
        }
        .animate-node-drift {
          animation: node-blink 6s ease-in-out infinite;
        }
      `}</style>

      {/* Pinned Sticky Viewport */}
      <div
        ref={stickyRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-center items-center relative"
      >
        {/* Dynamic ambient grid background */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Live Interactive Canvas Particles Constellation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        />

        {/* Continuous Fluid Waveform Matrix Background */}
        <svg className="absolute inset-x-0 w-full h-[60vh] opacity-[0.07] dark:opacity-[0.04] pointer-events-none z-0" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path d="M 0 300 Q 360 100 720 300 T 1440 300" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500 animate-wave-1" />
          <path d="M 0 300 Q 360 500 720 300 T 1440 300" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-blue-500 animate-wave-2" />
        </svg>

        {/* Floating tech crosshairs matrix */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="animate-node-drift absolute top-[30%] left-[25%] text-[10px] font-mono text-emerald-500/20 font-bold">+ 10.79°</div>
          <div className="animate-node-drift absolute bottom-[35%] right-[22%] text-[10px] font-mono text-blue-500/20 font-bold">+ 78.70°</div>
          <div className="animate-node-drift absolute top-[40%] right-[30%] text-[8px] font-mono text-indigo-500/20 font-bold">[SYS_ACTIVE]</div>
        </div>

        {/* Extra Parallax Floating Decorative Shapes */}
        <div className="parallax-shape-1 absolute top-[15%] left-[10%] w-12 h-12 border-2 border-emerald-500/20 rounded-xl pointer-events-none z-0" />
        <div className="parallax-shape-2 absolute bottom-[25%] left-[20%] w-8 h-8 border border-blue-500/20 rounded-full pointer-events-none z-0" />
        <div className="parallax-shape-3 absolute top-[25%] right-[15%] w-16 h-16 opacity-30 pointer-events-none z-0">
          <svg className="w-full h-full text-indigo-500/20" viewBox="0 0 100 100" fill="none">
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
          </svg>
        </div>

        {/* Subtle moving particles / lights */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full" />

        {/* ── CHAPTER 1: The Vision & Portal Expand ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 sm:px-12 pointer-events-none">
          <div ref={title1Ref} className="max-w-4xl flex flex-col gap-1 items-center">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 dark:text-emerald-400 mb-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              WHO WE ARE
            </span>

            <h2 className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.08] uppercase font-display overflow-hidden flex flex-wrap justify-center gap-x-4 text-slate-900 dark:text-white">
              <span className="inline-block overflow-hidden h-[1.2em]">
                <span className="word-reveal inline-block">WE</span>
              </span>
              <span className="inline-block overflow-hidden h-[1.2em]">
                <span className="word-reveal inline-block text-emerald-600 dark:text-emerald-400">SHAPE</span>
              </span>
              <span className="inline-block overflow-hidden h-[1.2em]">
                <span className="word-reveal inline-block">THE</span>
              </span>
              <span className="inline-block overflow-hidden h-[1.2em]">
                <span className="word-reveal inline-block">FUTURE</span>
              </span>
            </h2>
          </div>

          <p ref={desc1Ref} className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 font-medium max-w-lg mt-6 leading-relaxed">
            iZone Technologies is an elite software powerhouse. We bridge the gap between abstract concept and technical mastery to engineer digital breakthroughs.
          </p>

          {/* Chapter 1 Floating Cards (Parallel up-sliding) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Float 1 */}
            <div
              ref={ch1Float1}
              className="absolute top-[18%] left-[2%] sm:top-[26%] sm:left-[10%] p-3 sm:p-5 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-[#091124]/75 backdrop-blur-md shadow-2xl flex flex-col gap-1 sm:gap-2 w-36 sm:w-48 scale-75 sm:scale-100 opacity-0"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 dark:text-emerald-400">
                <Sparkles size={12} className="fill-emerald-500/30" />
                <span className="text-[8px] sm:text-[10px] font-mono font-black tracking-wider uppercase">100+ LAUNCHES</span>
              </div>
              <span className="text-[9px] sm:text-[11px] text-slate-700 dark:text-zinc-300 font-bold leading-tight">Digital products built and optimized since inception.</span>
            </div>

            {/* Float 2 */}
            <div
              ref={ch1Float2}
              className="absolute bottom-[18%] right-[2%] sm:bottom-[28%] sm:right-[8%] p-3 sm:p-4 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-[#091124]/75 backdrop-blur-md shadow-2xl flex items-center gap-2 sm:gap-3 w-40 sm:w-56 scale-75 sm:scale-100 opacity-0"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                <Cpu size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-black text-slate-800 dark:text-white leading-none">Est. 2017</span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 dark:text-zinc-500 font-bold mt-0.5">ESTABLISHED TECH STACK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Masked Portal Graphic */}
        <div
          ref={portalRef}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden"
          style={{ clipPath: "circle(12% at 50% 50%)" }}
        >
          {/* Cybernetic Grid Image / Vector inside portal */}
          <div className="absolute inset-0 bg-slate-100 dark:bg-[#060c18] flex items-center justify-center">
            <div
              ref={portalImgRef}
              className="w-[120%] h-[120%] opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)] flex items-center justify-center"
            >
              {/* Complex Vector Grid Drawing */}
              <svg className="w-full h-full max-w-[800px] text-emerald-600/30 dark:text-emerald-500/30 animate-bg-spin" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.25" strokeDasharray="3 3" className="animate-bg-pulse" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.25" />
                <path d="M 10 50 L 90 50" stroke="currentColor" strokeWidth="0.1" />
                <path d="M 50 10 L 50 90" stroke="currentColor" strokeWidth="0.1" />
                <polygon points="50,15 85,50 50,85 15,50" stroke="currentColor" strokeWidth="0.2" strokeDasharray="5 5" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── CHAPTER 2: The Craft (3D Floating Layers) ── */}
        <div
          ref={chapter2Ref}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center z-10 px-6 sm:px-12 pointer-events-none opacity-0"
        >
          <div className="max-w-4xl text-center flex flex-col items-center gap-1">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 dark:text-emerald-400 mb-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              OUR CRAFT
            </span>
            <h2 ref={title2Ref} className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.08] uppercase font-display overflow-hidden flex flex-wrap justify-center gap-x-4 text-slate-900 dark:text-white">
              <span className="inline-block overflow-hidden h-[1.2em]">
                <span className="word-reveal inline-block">ENGINEERED</span>
              </span>
              <span className="inline-block overflow-hidden h-[1.2em]">
                <span className="word-reveal inline-block">WITH</span>
              </span>
              <span className="inline-block overflow-hidden h-[1.2em]">
                <span className="word-reveal inline-block text-emerald-600 dark:text-emerald-400">PRECISION</span>
              </span>
            </h2>

            <p ref={desc2Ref} className="text-center text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium max-w-lg mt-6 leading-relaxed flex flex-col gap-1 items-center">
              <span className="block overflow-hidden h-[1.3em]">
                <span className="desc-line-reveal inline-block">We combine robust architectures with modern tech</span>
              </span>
              <span className="block overflow-hidden h-[1.3em]">
                <span className="desc-line-reveal inline-block">stacks to deliver custom software solutions built</span>
              </span>
              <span className="block overflow-hidden h-[1.3em]">
                <span className="desc-line-reveal inline-block">for optimal speed, reliability, and security.</span>
              </span>
            </p>
          </div>

          {/* 3D Parallax floating widgets */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">

            {/* Widget 1 */}
            <div
              ref={floatLayer1}
              className="absolute top-[18%] left-[2%] sm:top-[25%] sm:left-[12%] p-3 sm:p-5 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-[#091124]/75 backdrop-blur-md shadow-2xl flex flex-col gap-1.5 sm:gap-2.5 w-36 sm:w-52 scale-75 sm:scale-100 opacity-0"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 dark:text-emerald-400">
                <Cpu size={14} />
                <span className="text-[8px] sm:text-[10px] font-mono font-black tracking-wider uppercase">ARCH_ENG: STATUS_OK</span>
              </div>
              <div className="h-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-emerald-500 rounded-full animate-pulse" />
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-zinc-500 font-mono font-bold">CORE VELOCITY: 98%</span>
            </div>

            {/* Widget 2 */}
            <div
              ref={floatLayer2}
              className="absolute bottom-[18%] right-[2%] sm:bottom-[25%] sm:right-[10%] p-4 sm:p-6 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-[#091124]/75 backdrop-blur-md shadow-2xl flex items-center gap-3 sm:gap-4 w-40 sm:w-60 scale-75 sm:scale-100 opacity-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                <Layers size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-black tracking-tight text-slate-800 dark:text-white">99.99%</span>
                <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-wider">CLOUD DEPLOYMENT SLA</span>
              </div>
            </div>

            {/* Widget 3 */}
            <div
              ref={floatLayer3}
              className="absolute top-[26%] right-[2%] sm:top-[34%] sm:right-[12%] p-3 rounded-xl border border-slate-200/30 dark:border-white/5 bg-white/60 dark:bg-[#091124]/40 backdrop-blur-sm flex items-center gap-1.5 scale-75 sm:scale-100 opacity-0"
            >
              <ShieldCheck size={12} className="text-emerald-600 dark:text-emerald-500" />
              <span className="text-[8px] sm:text-[9px] font-mono text-slate-500 dark:text-zinc-400 font-bold uppercase tracking-widest">ZERO TRUST NETWORK</span>
            </div>

          </div>
        </div>

        {/* ── CHAPTER 3: The Impact (SVG line drawing & magnetic CTA) ── */}
        <div
          ref={chapter3Ref}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center z-10 px-6 sm:px-12 pointer-events-none opacity-0"
        >
          <div className="max-w-4xl text-center flex flex-col items-center gap-5 relative">

            {/* Animated drawing SVG background line behind text */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-35 z-0">
              <svg className="w-64 h-64 sm:w-80 sm:h-80 text-emerald-600/25 dark:text-emerald-500/25" viewBox="0 0 100 100">
                <path
                  ref={svgPathRef}
                  d="M 10 50 Q 30 20, 50 50 T 90 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-600 dark:text-emerald-400 mb-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                OUR IMPACT
              </span>

              <h2 ref={title3Ref} className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.08] uppercase font-display overflow-hidden flex flex-wrap justify-center gap-x-4 text-slate-900 dark:text-white">
                <span className="inline-block overflow-hidden h-[1.2em]">
                  <span className="word-reveal inline-block text-emerald-600 dark:text-emerald-400">SCALE</span>
                </span>
                <span className="inline-block overflow-hidden h-[1.2em]">
                  <span className="word-reveal inline-block">YOUR</span>
                </span>
                <span className="inline-block overflow-hidden h-[1.2em]">
                  <span className="word-reveal inline-block">HORIZONS</span>
                </span>
              </h2>
            </div>

            <p ref={desc3Ref} className="relative z-10 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-semibold max-w-sm mt-2 leading-relaxed flex flex-col gap-1 items-center">
              <span className="block overflow-hidden h-[1.3em]">
                <span className="desc-line-reveal inline-block">We construct performance-driven frameworks</span>
              </span>
              <span className="block overflow-hidden h-[1.3em]">
                <span className="desc-line-reveal inline-block">engineered to support massive scale, high</span>
              </span>
              <span className="block overflow-hidden h-[1.3em]">
                <span className="desc-line-reveal inline-block">traffic, and continuous growth.</span>
              </span>
            </p>

            {/* Magnetic Hover CTA button */}
            <div className="mt-6 relative z-10 pointer-events-auto">
              <Link to="/contact">
                <button
                  ref={magneticButtonRef}
                  className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3.5 rounded-full text-xs font-bold shadow-lg shadow-black/5 active:scale-95 transition-all duration-300 hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-slate-950 group"
                >
                  Start Your Journey
                  <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center group-hover:bg-slate-50 dark:group-hover:bg-slate-950 transition-colors">
                    <ArrowUpRight size={12} />
                  </div>
                </button>
              </Link>
            </div>

          </div>

          {/* Chapter 3 Floating Cards (Parallel up-sliding) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Float 1 */}
            <div
              ref={ch3Float1}
              className="absolute top-[18%] left-[2%] sm:top-[28%] sm:left-[12%] p-3 sm:p-5 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-[#091124]/75 backdrop-blur-md shadow-2xl flex flex-col gap-1 sm:gap-2 w-36 sm:w-48 scale-75 sm:scale-100 opacity-0"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 dark:text-emerald-400">
                <Activity size={12} className="text-emerald-500 animate-pulse" />
                <span className="text-[8px] sm:text-[10px] font-mono font-black tracking-wider uppercase">ACTIVE SCALING</span>
              </div>
              <span className="text-[9px] sm:text-[11px] text-slate-700 dark:text-zinc-300 font-bold leading-tight">Optimized to sustain 10x spikes in concurrent web loads.</span>
            </div>

            {/* Float 2 */}
            <div
              ref={ch3Float2}
              className="absolute bottom-[20%] right-[2%] sm:bottom-[30%] sm:right-[8%] p-3 sm:p-4 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-[#091124]/75 backdrop-blur-md shadow-2xl flex items-center gap-2 sm:gap-3 w-40 sm:w-52 scale-75 sm:scale-100 opacity-0"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                <ShieldCheck size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-black text-slate-800 dark:text-white leading-none">Response</span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 dark:text-zinc-500 font-bold mt-0.5">&lt; 85ms TTFB GLOBAL</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

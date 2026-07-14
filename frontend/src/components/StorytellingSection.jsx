import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Cpu, Target, Zap, TrendingUp, Sliders } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTED_WORDS = [
  { text: "engineer", icon: Cpu, desc: "Architecting clean, maintainable systems" },
  { text: "software", icon: Sparkles, desc: "Crafting bespoke digital products" },
  { text: "scale", icon: Target, desc: "Designed for 10x user growth" },
  { text: "automate", icon: Sliders, desc: "Eliminating manual operational bottlenecks" },
  { text: "accelerate", icon: Zap, desc: "Speeding up time-to-market" },
  { text: "growth", icon: TrendingUp, desc: "Driving sustainable business revenue" }
];

const PARAGRAPH_WORDS = [
  { text: "We", isHighlighted: false },
  { text: "engineer", isHighlighted: true, id: 0 },
  { text: "custom", isHighlighted: false },
  { text: "software", isHighlighted: true, id: 1 },
  { text: "built", isHighlighted: false },
  { text: "to", isHighlighted: false },
  { text: "scale", isHighlighted: true, id: 2 },
  { text: "your", isHighlighted: false },
  { text: "business,", isHighlighted: false },
  { text: "automate", isHighlighted: true, id: 3 },
  { text: "complex", isHighlighted: false },
  { text: "processes,", isHighlighted: false },
  { text: "and", isHighlighted: false },
  { text: "accelerate", isHighlighted: true, id: 4 },
  { text: "your", isHighlighted: false },
  { text: "digital", isHighlighted: false },
  { text: "growth.", isHighlighted: true, id: 5 }
];

export default function StorytellingSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const paragraphRef = useRef(null);
  const targetsContainerRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    // We use a small timeout to let the page settle and layout render before measuring coordinates
    const timer = setTimeout(() => {
      setupGSAP();
    }, 100);

    const handleResize = () => {
      setupGSAP();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, []);

  const setupGSAP = () => {
    if (contextRef.current) {
      contextRef.current.revert();
    }

    const getPrimaryColor = () => {
      const temp = document.createElement("div");
      temp.style.color = "hsl(var(--primary))";
      document.body.appendChild(temp);
      const color = getComputedStyle(temp).color;
      document.body.removeChild(temp);
      return color || "#10b981";
    };

    const ctx = gsap.context(() => {
      const inlineElements = paragraphRef.current.querySelectorAll(".word-highlighted");
      const targetElements = targetsContainerRef.current.querySelectorAll(".target-item");

      if (inlineElements.length === 0 || targetElements.length === 0) return;

      // Calculate initial and target positions relative to the screen (viewport)
      const calculations = Array.from(inlineElements).map((el, index) => {
        const initRect = el.getBoundingClientRect();
        const targetWordSpan = targetElements[index].querySelector(".target-word-text");
        const targetRect = targetWordSpan.getBoundingClientRect();

        // Calculate center coordinates
        const initCenterX = initRect.left + initRect.width / 2;
        const initCenterY = initRect.top + initRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        // Calculate translation delta to align centers
        const deltaX = targetCenterX - initCenterX;
        const deltaY = targetCenterY - initCenterY;

        // Calculate scale ratio based on height to match target styling
        const scaleRatio = targetRect.height / initRect.height;

        return { el, deltaX, deltaY, scaleRatio, targetItem: targetElements[index] };
      });

      // Clear any pre-existing inline styles that might interfere with recalculations
      gsap.set(inlineElements, { clearProps: "all" });
      gsap.set(targetElements, { clearProps: "all" });

      // Timeline 1: Entry reveals (Heading and Paragraph) when section enters bottom 25% of viewport
      const tlEntry = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Triggers when top of section is 25% from the bottom of the viewport
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        }
      });

      const headingBadge = containerRef.current.querySelector(".section-heading-badge");
      const headingSubtext = containerRef.current.querySelector(".section-heading-subtext");
      
      if (headingBadge && headingSubtext) {
        tlEntry.fromTo(headingBadge, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
               .fromTo(headingSubtext, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.35")
               .fromTo(paragraphRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3");
      } else {
        tlEntry.fromTo(paragraphRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
      }

      // Timeline 2: Scrubbed timeline for pinned phases (highlights, gather, focus)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: stickyRef.current,
          invalidateOnRefresh: true,
        },
      });

      // Phase 0: Fade out scroll indicator immediately on scroll start
      const scrollIndicator = containerRef.current.querySelector("#scroll-indicator");
      if (scrollIndicator) {
        tl.to(scrollIndicator, { opacity: 0, y: 15, duration: 1, ease: "power2.out" }, 0);
      }

      // Phase 2: Highlight Important Words (Color & Font weight change)
      tl.to(
        inlineElements,
        {
          color: getPrimaryColor(),
          fontWeight: "700",
          textShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
          duration: 2,
          stagger: 0.3,
          ease: "power2.out",
        },
        "+=0.1"
      );

      // Phase 3: Fade Away Unimportant Words (Normal words go fully transparent)
      const normalElements = paragraphRef.current.querySelectorAll(".word-normal");
      tl.to(
        normalElements,
        {
          opacity: 0,
          duration: 1.5,
          stagger: 0.08,
          ease: "power2.inOut",
        },
        "+=0.3"
      );

      // Phase 4: Gather Highlighted Words sequentially WHILE SCROLLING (Move one by one - Slower speed)
      calculations.forEach((calc, index) => {
        tl.to(
          calc.el,
          {
            x: calc.deltaX,
            y: calc.deltaY,
            scale: calc.scaleRatio,
            fontWeight: "800",
            duration: 2.2,
            force3D: true,
            ease: "power2.inOut",
          },
          index === 0 ? "+=0.4" : "+=0.4" // Slower, more gradual scroll staggers
        );
      });

      // Phase 5: Focus Animation sequentially WHILE SCROLLING (Scale up gathered items one by one, keeping the scaled state)
      calculations.forEach((calc) => {
        tl.to(
          calc.el,
          {
            scale: calc.scaleRatio * 1.15,
            duration: 0.8,
            force3D: true,
            ease: "power2.inOut",
          },
          "+=0.1" // Sequenced highlights
        );
      });
    }, containerRef);

    contextRef.current = ctx;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-slate-50 dark:bg-[#030712] transition-colors duration-300"
      style={{ height: "280vh" }} // Provides snappier scroll distance
    >
      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10"
      >
        {/* Cinematic ambient background glow */}
        <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

        {/* Section Heading Tag */}
        <div className="absolute top-[7.5rem] sm:top-[8.5rem] lg:top-[9rem] z-20 flex flex-col items-center gap-2">
          <span className="section-heading-badge text-xs uppercase tracking-[0.25em] font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            Our Purpose
          </span>
          <p className="section-heading-subtext text-xs text-muted-foreground">Scroll to explore our engineering philosophy</p>
        </div>

        {/* Main Content Area */}
        <div className="container-custom relative w-full max-w-5xl h-full flex items-center justify-center px-6 sm:px-12">
          
          {/* Phase 1-3: Inline Paragraph */}
          <p
            ref={paragraphRef}
            className="w-full text-center text-xl sm:text-3xl md:text-4xl font-medium leading-[1.8] sm:leading-[2] tracking-tight text-slate-800 dark:text-slate-100 z-10 select-none max-w-4xl"
          >
            {PARAGRAPH_WORDS.map((word, idx) => {
              const space = idx < PARAGRAPH_WORDS.length - 1 ? " " : "";
              if (word.isHighlighted) {
                return (
                  <React.Fragment key={idx}>
                    <span
                      className="word-highlighted inline-block text-slate-400 dark:text-zinc-600 transition-shadow duration-300 transform-gpu will-change-transform"
                    >
                      {word.text}
                    </span>
                    {space}
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={idx}>
                  <span
                    className="word-normal inline-block text-slate-400 dark:text-zinc-600 transform-gpu will-change-[opacity]"
                  >
                    {word.text}
                  </span>
                  {space}
                </React.Fragment>
              );
            })}
          </p>

          {/* Phase 4-5: Target Vertical Column (Hidden initially) */}
          <div
            ref={targetsContainerRef}
            className="absolute left-0 right-0 bottom-8 top-[12.5rem] sm:top-[14.5rem] lg:top-[16rem] flex flex-col items-center justify-center gap-4 sm:gap-5 z-20"
            style={{ pointerEvents: "none" }}
          >
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-5">
              {HIGHLIGHTED_WORDS.map((item, index) => (
                <div
                  key={index}
                  className="target-item opacity-0 flex items-center justify-center transform-gpu"
                >
                  <span className="target-word-text text-3xl sm:text-5xl font-extrabold text-primary tracking-tight capitalize select-none">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div
            id="scroll-indicator"
            className="absolute bottom-8 z-25 flex flex-col items-center gap-1.5 opacity-80"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 font-bold">
              Scroll Down
            </span>
            <div className="w-5 h-8 border-2 border-slate-300 dark:border-zinc-700 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-primary rounded-full animate-scroll-mouse" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SplitTextReveal = ({ children, className = "", delay = 0, speed = 0.8, stagger = 0.03, triggerOnce = true }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rawText = el.textContent || "";
    const words = rawText.split(" ");
    
    el.innerHTML = words
      .map(word => {
        const chars = word.split("").map(
          char => `<span class="char inline-block translate-y-[100%] opacity-0 transform-gpu">${char}</span>`
        ).join("");

        return `<span class="word inline-block overflow-hidden whitespace-nowrap" style="margin-right: 0.28em;">${chars}</span>`;
      })
      .join(" ");

    const charsElements = el.querySelectorAll(".char");
    if (charsElements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.to(charsElements, {
        y: 0,
        opacity: 1,
        duration: speed,
        stagger: stagger,
        ease: "power4.out",
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: triggerOnce ? "play none none none" : "play none none reverse",
          invalidateOnRefresh: true,
        }
      });
    }, el);

    return () => ctx.revert();
  }, [children, delay, speed, stagger, triggerOnce]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </span>
  );
};

export default SplitTextReveal;

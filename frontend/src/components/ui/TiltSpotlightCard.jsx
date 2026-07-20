import { useEffect, useRef } from "react";
import { gsap } from "gsap";
 
// Spotlight Card with Cursor-tracking Glow (High Performance using quickTo, no blurry 3D tilts)
export const TiltSpotlightCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
 
  const xTo = useRef(null);
  const yTo = useRef(null);
  const opacityTo = useRef(null);
 
  useEffect(() => {
    if (glowRef.current) {
      xTo.current = gsap.quickTo(glowRef.current, "left", { duration: 0.2, ease: "power3.out" });
      yTo.current = gsap.quickTo(glowRef.current, "top", { duration: 0.2, ease: "power3.out" });
      opacityTo.current = gsap.quickTo(glowRef.current, "opacity", { duration: 0.2, ease: "power3.out" });
    }
  }, []);
 
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
 
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
 
    if (xTo.current && yTo.current && opacityTo.current) {
      xTo.current(x);
      yTo.current(y);
      opacityTo.current(0.12);
    }
  };
 
  const handleMouseLeave = () => {
    if (opacityTo.current) {
      opacityTo.current(0);
    }
  };
 
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px] transition-opacity duration-500 opacity-0"
        style={{
          width: "350px",
          height: "350px",
        }}
      />
      {children}
    </div>
  );
};
 
export default TiltSpotlightCard;

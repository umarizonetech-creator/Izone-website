import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// 3D Tilt Card with Cursor-tracking Spotlight Glow (High Performance using quickTo)
export const TiltSpotlightCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const xTo = useRef(null);
  const yTo = useRef(null);
  const opacityTo = useRef(null);
  const rotateXTo = useRef(null);
  const rotateYTo = useRef(null);

  useEffect(() => {
    if (glowRef.current) {
      xTo.current = gsap.quickTo(glowRef.current, "left", { duration: 0.2, ease: "power3.out" });
      yTo.current = gsap.quickTo(glowRef.current, "top", { duration: 0.2, ease: "power3.out" });
      opacityTo.current = gsap.quickTo(glowRef.current, "opacity", { duration: 0.2, ease: "power3.out" });
    }
    if (cardRef.current) {
      rotateXTo.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.3, ease: "power2.out" });
      rotateYTo.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.3, ease: "power2.out" });
      gsap.set(cardRef.current, { transformPerspective: 1000, force3D: true });
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

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((e.clientY - rect.top - centerY) / centerY) * 8; // Max 8 degrees tilt
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 8;

    if (rotateXTo.current && rotateYTo.current) {
      rotateXTo.current(rotateX);
      rotateYTo.current(rotateY);
    }
  };

  const handleMouseLeave = () => {
    if (opacityTo.current) {
      opacityTo.current(0);
    }

    if (rotateXTo.current && rotateYTo.current) {
      rotateXTo.current(0);
      rotateYTo.current(0);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: "preserve-3d" }}
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

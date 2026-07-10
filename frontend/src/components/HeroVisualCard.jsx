import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Trophy} from "lucide-react";

const G = "hsl(159, 58%, 34%)";

const SLIDES = [
  { url: "/hero/bottom-right-mockup.png", label: "Leadership"},
  { url: "/hero/bottom-left-mockup.png",  label: "Execution"},
  { url: "/hero/top-left-mockup.png",     label: "Innovation"},
];

const THUMBS = [
  { url: "/hero/bottom-right-mockup.png",  label: "Growth Strategy"  },
  { url: "/hero/bottom-left-mockup.png", label: "Digital Platform" },
  { url: "/hero/top-left-mockup.png",   label: "Brand Identity"   },
];

export default function HeroVisualCard() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative select-none"
      style={{ width: 420, height: 500 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Decorative background blob ── */}
      <div style={{
        position: "absolute", top: 40, right: -40,
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, hsla(159,58%,34%,0.12) 0%, transparent 70%)",
        filter: "blur(40px)", zIndex: 0, pointerEvents: "none",
      }} />

      {/* ── Back card (decorative) ── */}
      <motion.div
        animate={{ rotate: [-2, -3, -2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: 20, left: 20,
          width: 340, height: 420, borderRadius: 20,
          background: "linear-gradient(135deg, #e8f5ee 0%, #d4eedd 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          zIndex: 1,
        }}
      />

      {/* ── Middle card (decorative) ── */}
      <motion.div
        animate={{ rotate: [2, 3, 2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{
          position: "absolute", top: 10, left: 10,
          width: 340, height: 420, borderRadius: 20,
          background: "#f0faf4",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          zIndex: 2,
        }}
      />

      {/* ── Main image card ── */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 340, height: 420, borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)",
        zIndex: 10,
        background: "#0a1a10",
      }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={idx}
            src={SLIDES[idx].url}
            alt={SLIDES[idx].label}
            draggable={false}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "fit", objectPosition: "center center",
              display: "block",
            }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.65) 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* Bottom label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", bottom: 18, left: 18, right: 18, zIndex: 5,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}
          >
            <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
              {SLIDES[idx].label}
            </span>
            <div style={{ display: "flex", gap: 5 }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 18 : 5, height: 5, borderRadius: 99,
                    background: i === idx ? "#fff" : "rgba(255,255,255,0.45)",
                    border: "none", padding: 0, cursor: "pointer",
                    transition: "width 0.3s ease",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Thumbnail strip (right side) ── */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 68, height: "100%",
        display: "flex", flexDirection: "column", gap: 10,
        justifyContent: "center", zIndex: 20,
      }}>
        {THUMBS.map((thumb, i) => (
          <motion.button
            key={i}
            onClick={() => setIdx(i)}
            whileHover={{ scale: 1.06, x: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            style={{
              width: 60, height: 72, borderRadius: 12,
              overflow: "hidden", border: "none", padding: 0,
              cursor: "pointer", flexShrink: 0,
              background: "#0a1a10",
              boxShadow: i === idx
                ? `0 0 0 2.5px ${G}, 0 8px 20px rgba(0,0,0,0.18)`
                : "0 4px 14px rgba(0,0,0,0.13)",
              transition: "box-shadow 0.25s ease",
              position: "relative",
            }}
          >
            <img
              src={thumb.url}
              alt={thumb.label}
              draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center", display: "block" }}
            />
            {i === idx && (
              <div style={{
                position: "absolute", inset: 0,
                background: `hsla(159,58%,34%,0.18)`,
              }} />
            )}
          </motion.button>
        ))}
      </div>

      {/* ── Stats badge (bottom-right of main card) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          position: "absolute", bottom: -20, left: -20, zIndex: 30,
          background: "#fff",
          borderRadius: 16,
          padding: "12px 16px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.14), 0 3px 10px rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center", gap: 12,
          minWidth: 160,
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: "hsl(159,58%,34%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Trophy size={20} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#111", lineHeight: 1 }}>380+</div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 2, fontWeight: 500 }}>Projects Done</div>
        </div>
      </motion.div>

      {/* ── CTA badge (top-right float) ── */}
      <motion.button
        onClick={() => navigate("/contact")}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.6 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        style={{
          position: "absolute", top: -16, right: 56, zIndex: 30,
          background: G,
          color: "#fff",
          border: "none", borderRadius: 12, padding: "10px 14px",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          fontSize: 12, fontWeight: 700, letterSpacing: "0.04em",
          boxShadow: `0 8px 24px hsla(159,58%,34%,0.38)`,
        }}
      >
        Start a Project
        <ArrowUpRight size={13} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}

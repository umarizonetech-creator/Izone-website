import { useEffect, useRef } from "react";

function prng(seed) {
  let s = seed >>> 0;
  return () => { s ^= s << 13; s ^= s >> 17; s ^= s << 5; return (s >>> 0) / 0xffffffff; };
}

// Build stable set of particle configs (position, speed, size, phase)
const R = prng(42);
const PARTICLES = Array.from({ length: 72 }, (_, i) => ({
  x:     R(),          // 0–1 normalized x
  y:     R(),          // 0–1 normalized y
  size:  0.8 + R() * 1.6,
  speedX: (R() - 0.5) * 0.018,
  speedY: (R() - 0.5) * 0.012,
  phase:  R() * Math.PI * 2,
  pulseSpeed: 0.5 + R() * 1.0,
  baseAlpha:  0.18 + R() * 0.28,
}));

export default function WorldMapBackground({ isDark = false }) {
  const ref = useRef(null);
  const raf = useRef(null);
  // Mutable positions (avoid re-creating particles)
  const pos = useRef(PARTICLES.map(p => ({ x: p.x, y: p.y })));

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0;

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const col = isDark
      ? (a) => `rgba(134,239,172,${a.toFixed(3)})`
      : (a) => `rgba(56,161,105,${a.toFixed(3)})`;

    function draw(ts) {
      const t = ts * 0.001;
      ctx.clearRect(0, 0, W, H);

      PARTICLES.forEach((p, i) => {
        pos.current[i].x += p.speedX * 0.016;
        pos.current[i].y += p.speedY * 0.016;
        if (pos.current[i].x < -0.02) pos.current[i].x = 1.02;
        if (pos.current[i].x >  1.02) pos.current[i].x = -0.02;
        if (pos.current[i].y < -0.02) pos.current[i].y = 1.02;
        if (pos.current[i].y >  1.02) pos.current[i].y = -0.02;

        const px = pos.current[i].x * W;
        const py = pos.current[i].y * H;

        const pulse = 0.55 + 0.45 * Math.sin(t * p.pulseSpeed + p.phase);
        const alpha = p.baseAlpha * pulse;

        if (p.size > 1.8) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4);
          g.addColorStop(0, col(alpha * 0.5));
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = col(alpha);
        ctx.fill();
      });

      raf.current = requestAnimationFrame(draw);
    }

    // Defer animation start until after page load to avoid TBT
    const start = () => { raf.current = requestAnimationFrame(draw); };
    if (document.readyState === "complete") {
      const id = setTimeout(start, 200);
      return () => { clearTimeout(id); cancelAnimationFrame(raf.current); ro.disconnect(); };
    }
    window.addEventListener("load", start, { once: true });
    return () => { cancelAnimationFrame(raf.current); ro.disconnect(); };
  }, [isDark]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

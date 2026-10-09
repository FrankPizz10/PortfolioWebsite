import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  drift: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

/** Twinkling starfield with occasional shooting stars, on a fixed full-viewport canvas. */
const Starfield = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let nextMeteorAt = 1200;
    let raf = 0;
    let w = 0;
    let h = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(260, Math.floor((w * h) / 8500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.55 + 0.25,
        twinkleSpeed: Math.random() * 1.6 + 0.4,
        phase: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.12 + 0.02,
      }));
      meteors = [];
    };

    const spawnMeteor = () => {
      const fromLeft = Math.random() < 0.5;
      const speed = 7 + Math.random() * 5;
      const angle = ((26 + Math.random() * 16) * Math.PI) / 180;
      meteors.push({
        x: fromLeft ? -80 : w + 80,
        y: Math.random() * h * 0.45,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 80 + Math.random() * 40,
      });
    };

    const drawMeteors = (t: number) => {
      if (reduced) return;
      if (t > nextMeteorAt) {
        spawnMeteor();
        nextMeteorAt = t + 2800 + Math.random() * 5200;
      }
      meteors = meteors.filter(
        (m) => m.life < m.maxLife && m.x > -320 && m.x < w + 320 && m.y < h + 320
      );
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;
        const fadeIn = Math.min(1, m.life / 10);
        const fadeOut = Math.min(1, (m.maxLife - m.life) / 28);
        const a = Math.max(0, Math.min(fadeIn, fadeOut));
        if (a <= 0) continue;
        // faint warm trail behind the head
        const trail = 13;
        const tx = m.x - m.vx * trail;
        const ty = m.y - m.vy * trail;
        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, `rgba(255, 252, 246, ${(0.95 * a).toFixed(3)})`);
        grad.addColorStop(0.35, `rgba(255, 183, 120, ${(0.55 * a).toFixed(3)})`);
        grad.addColorStop(1, "rgba(255, 122, 89, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        // glowing head
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 220, ${(0.85 * a).toFixed(3)})`;
        ctx.fill();
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduced ? 1 : 0.65 + 0.35 * Math.sin(s.phase + t * 0.001 * s.twinkleSpeed);
        const alpha = s.baseAlpha * tw;
        if (!reduced) {
          s.y -= s.drift;
          if (s.y < -4) {
            s.y = h + 4;
            s.x = Math.random() * w;
          }
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 231, 255, ${alpha.toFixed(3)})`;
        ctx.fill();
        // occasional glow on bigger stars
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 200, 255, ${(alpha * 0.12).toFixed(3)})`;
          ctx.fill();
        }
      }
      drawMeteors(t);
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    seed();
    draw(0);
    const onResize = () => seed();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
};

export default Starfield;

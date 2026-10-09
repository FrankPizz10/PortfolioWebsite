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

type StreakKind = "star" | "comet" | "meteor";

interface Streak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  kind: StreakKind;
}

interface StreakStyle {
  width: number;
  trail: number;
  stops: ReadonlyArray<readonly [number, string, number]>;
  head: number;
  headColor: string;
  headAlpha: number;
  halo?: number;
}

const STREAK_STYLES: Record<StreakKind, StreakStyle> = {
  // classic shooting star: thin, quick, white-hot with a short pale trail
  star: {
    width: 1.6,
    trail: 9,
    stops: [
      [0, "255, 253, 248", 0.95],
      [0.4, "214, 231, 255", 0.5],
      [1, "150, 200, 255", 0],
    ],
    head: 1.8,
    headColor: "255, 255, 255",
    headAlpha: 0.9,
  },
  // comet: slow and graceful, glowing coma, long wide ice-blue tail
  comet: {
    width: 3.2,
    trail: 24,
    stops: [
      [0, "240, 250, 255", 0.9],
      [0.35, "158, 205, 255", 0.55],
      [1, "110, 168, 254", 0],
    ],
    head: 4.5,
    headColor: "190, 220, 255",
    headAlpha: 0.5,
    halo: 2.6,
  },
  // meteor: fast and fiery, flickering warm trail
  meteor: {
    width: 2.4,
    trail: 13,
    stops: [
      [0, "255, 252, 246", 0.95],
      [0.35, "255, 183, 120", 0.6],
      [1, "255, 122, 89", 0],
    ],
    head: 2.4,
    headColor: "255, 240, 220",
    headAlpha: 0.85,
  },
};

/** Twinkling starfield with shooting stars, comets and meteors on a fixed full-viewport canvas. */
const Starfield = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let streaks: Streak[] = [];
    let nextStreakAt = 1200;
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
      streaks = [];
    };

    const spawnStreak = () => {
      const roll = Math.random();
      const kind: StreakKind = roll < 0.4 ? "star" : roll < 0.7 ? "comet" : "meteor";
      const fromLeft = Math.random() < 0.5;
      const angle = ((26 + Math.random() * 16) * Math.PI) / 180;
      let speed: number;
      let maxLife: number;
      if (kind === "star") {
        speed = 8 + Math.random() * 4;
        maxLife = 55 + Math.random() * 20;
      } else if (kind === "comet") {
        speed = 3.5 + Math.random() * 2;
        maxLife = 110 + Math.random() * 50;
      } else {
        speed = 10 + Math.random() * 5;
        maxLife = 45 + Math.random() * 20;
      }
      streaks.push({
        x: fromLeft ? -80 : w + 80,
        y: Math.random() * h * 0.45,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife,
        kind,
      });
    };

    const drawStreaks = (t: number) => {
      if (reduced) return;
      if (t > nextStreakAt) {
        spawnStreak();
        nextStreakAt = t + 2200 + Math.random() * 3800;
      }
      streaks = streaks.filter(
        (s) => s.life < s.maxLife && s.x > -340 && s.x < w + 340 && s.y < h + 340
      );
      for (const s of streaks) {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        const fadeIn = Math.min(1, s.life / 10);
        const fadeOut = Math.min(1, (s.maxLife - s.life) / 30);
        let a = Math.max(0, Math.min(fadeIn, fadeOut));
        if (a <= 0) continue;
        if (s.kind === "meteor") a *= 0.72 + 0.28 * Math.sin(s.life * 1.7);
        const style = STREAK_STYLES[s.kind];
        const tx = s.x - s.vx * style.trail;
        const ty = s.y - s.vy * style.trail;
        const grad = ctx.createLinearGradient(s.x, s.y, tx, ty);
        for (const [offset, rgb, alpha] of style.stops) {
          grad.addColorStop(offset, `rgba(${rgb}, ${(alpha * a).toFixed(3)})`);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = style.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        // glowing head
        ctx.beginPath();
        ctx.arc(s.x, s.y, style.head, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${style.headColor}, ${(style.headAlpha * a).toFixed(3)})`;
        ctx.fill();
        // comet coma: soft halo around the head
        if (style.halo) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, style.head * style.halo, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140, 190, 255, ${(0.12 * a).toFixed(3)})`;
          ctx.fill();
        }
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
      drawStreaks(t);
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

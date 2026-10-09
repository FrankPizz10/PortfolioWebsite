
import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
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
  // Golden-white shooting star with a bright white-hot head
  star: {
    width: 2,
    trail: 15,
    stops: [
      [0, "255, 255, 250", 1],
      [0.2, "255, 250, 220", 0.9],
      [0.5, "255, 224, 150", 0.6],
      [0.8, "255, 195, 95", 0.25],
      [1, "255, 180, 75", 0],
    ],
    head: 2.3,
    headColor: "255, 255, 245",
    headAlpha: 1,
  },

  // Golden comet with a long luminous tail
  comet: {
    width: 3.5,
    trail: 34,
    stops: [
      [0, "255, 255, 240", 1],
      [0.25, "255, 239, 185", 0.85],
      [0.6, "255, 210, 120", 0.45],
      [1, "255, 175, 65", 0],
    ],
    head: 4.8,
    headColor: "255, 250, 220",
    headAlpha: 0.9,
    halo: 3,
  },

  // Fiery red-orange meteor
  meteor: {
    width: 4,
    trail: 23,
    stops: [
      [0, "255, 255, 220", 1],
      [0.12, "255, 220, 115", 0.98],
      [0.35, "255, 130, 35", 0.85],
      [0.65, "255, 65, 35", 0.55],
      [1, "190, 25, 35", 0],
    ],
    head: 4,
    headColor: "255, 145, 55",
    headAlpha: 1,
    halo: 2.8,
  },
};

const STAR_COLORS = [
  "255, 255, 255",
  "255, 250, 235",
  "255, 244, 220",
  "255, 235, 195",
  "255, 248, 225",
  "230, 237, 255",
];

/** Fixed twinkling starfield with golden-white shooting stars and fiery meteors. */
const Starfield = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let streaks: Streak[] = [];
    let nextStreakAt = 1200;
    let raf = 0;
    let w = 0;
    let h = 0;
    let desktop = false;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = window.innerWidth;
      h = window.innerHeight;
      desktop = w >= 1024;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(260, Math.floor((w * h) / 8500));

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[
          Math.floor(Math.random() * STAR_COLORS.length)
        ],
      }));

      streaks = [];
    };

    const spawnStreak = () => {
      const roll = Math.random();

      const kind: StreakKind =
        roll < 0.4 ? "star" : roll < 0.7 ? "comet" : "meteor";

      const fromLeft = Math.random() < 0.5;
      const angle = ((26 + Math.random() * 16) * Math.PI) / 180;

      let speed: number;
      let maxLife: number;

      if (kind === "star") {
        // Slow shooting stars with extra-long mobile lifetimes
        speed = desktop
          ? 5 + Math.random() * 2
          : 1.8 + Math.random() * 1.0;

        maxLife = desktop
          ? 180 + Math.random() * 80
          : 280 + Math.random() * 120;
      } else if (kind === "comet") {
        // Graceful comets with especially long mobile journeys
        speed = desktop
          ? 2.5 + Math.random() * 1.5
          : 1.0 + Math.random() * 0.7;

        maxLife = desktop
          ? 280 + Math.random() * 100
          : 380 + Math.random() * 140;
      } else {
        // Slow fiery meteors that linger longer on mobile
        speed = desktop
          ? 4.5 + Math.random() * 2
          : 1.6 + Math.random() * 1.0;

        maxLife = desktop
          ? 180 + Math.random() * 80
          : 280 + Math.random() * 120;
      }

      streaks.push({
        x: fromLeft ? -250 : w + 250,
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

      const margin = desktop ? 1600 : 1200;

      streaks = streaks.filter(
        (s) =>
          s.life < s.maxLife &&
          s.x > -margin &&
          s.x < w + margin &&
          s.y > -margin &&
          s.y < h + margin
      );

      for (const s of streaks) {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;

        // Smooth entrance and fade only near the end of the lifetime
        const fadeIn = Math.min(1, s.life / 12);
        const fadeOutStart = s.maxLife * 0.88;

        const fadeOut =
          s.life <= fadeOutStart
            ? 1
            : Math.max(
                0,
                (s.maxLife - s.life) /
                  (s.maxLife - fadeOutStart)
              );

        let a = Math.min(fadeIn, fadeOut);

        if (a <= 0) continue;

        if (s.kind === "meteor") {
          a *= 0.82 + 0.18 * Math.sin(s.life * 1.7);
        }

        const style = STREAK_STYLES[s.kind];
        const trailMultiplier = desktop ? 2.2 : 1.2;
        const trailLength = style.trail * trailMultiplier;

        const tx = s.x - s.vx * trailLength;
        const ty = s.y - s.vy * trailLength;

        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          tx,
          ty
        );

        for (const [offset, rgb, alpha] of style.stops) {
          grad.addColorStop(
            offset,
            `rgba(${rgb}, ${(alpha * a).toFixed(3)})`
          );
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth =
          style.width *
          (s.kind === "meteor" && desktop ? 1.1 : 1);
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // Bright glowing head
        ctx.beginPath();
        ctx.arc(s.x, s.y, style.head, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${style.headColor}, ${(style.headAlpha * a).toFixed(3)})`;
        ctx.fill();

        // Warm halos for comets and fiery meteors
        if (style.halo) {
          const haloColor =
            s.kind === "meteor"
              ? "255, 90, 35"
              : "255, 225, 155";

          const halo = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            style.head * style.halo
          );

          halo.addColorStop(
            0,
            `rgba(${haloColor}, ${(0.24 * a).toFixed(3)})`
          );
          halo.addColorStop(1, `rgba(${haloColor}, 0)`);

          ctx.beginPath();
          ctx.arc(
            s.x,
            s.y,
            style.head * style.halo,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = halo;
          ctx.fill();
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        // Background stars stay fixed and only change brightness
        const tw = reduced
          ? 1
          : 0.55 +
            0.45 *
              Math.sin(s.phase + t * 0.001 * s.twinkleSpeed);

        const alpha = s.baseAlpha * tw;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`;
        ctx.fill();

        // Subtle natural glow around larger stars
        if (s.r > 1.2) {
          const glow = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            s.r * 4
          );

          glow.addColorStop(
            0,
            `rgba(${s.color}, ${(alpha * 0.3).toFixed(3)})`
          );
          glow.addColorStop(1, `rgba(${s.color}, 0)`);

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      drawStreaks(t);

      if (!reduced) {
        raf = requestAnimationFrame(draw);
      }
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

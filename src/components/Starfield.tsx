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
  spikeLength: number;
  spikeWidth: number;
  spikeColor: string;
  diagonalSpikes: boolean;
}

const STREAK_STYLES: Record<StreakKind, StreakStyle> = {
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
    spikeLength: 8,
    spikeWidth: 1.3,
    spikeColor: "255, 255, 240",
    diagonalSpikes: true,
  },

  comet: {
    width: 3.5,
    trail: 34,
    stops: [
      [0, "225, 250, 255", 1],
      [0.2, "145, 220, 255", 0.9],
      [0.5, "75, 165, 245", 0.6],
      [0.8, "45, 105, 210", 0.25],
      [1, "35, 75, 165", 0],
    ],
    head: 4.8,
    headColor: "220, 250, 255",
    headAlpha: 0.95,
    halo: 3,
    spikeLength: 30,
    spikeWidth: 1.8,
    spikeColor: "180, 230, 255",
    diagonalSpikes: true,
  },

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
    spikeLength: 28,
    spikeWidth: 1.8,
    spikeColor: "255, 225, 165",
    diagonalSpikes: true,
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

/** Draw optical diffraction spikes for stars and shooting stars. */
function drawDiffractionSpikes(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  length: number,
  width: number,
  color: string,
  alpha: number,
  diagonalSpikes: boolean
) {
  if (alpha <= 0 || length <= 0) return;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";

  const glowRadius = length * 0.85;
  const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);

  glow.addColorStop(
    0,
    `rgba(${color}, ${(0.22 * alpha).toFixed(3)})`
  );
  glow.addColorStop(
    0.25,
    `rgba(${color}, ${(0.08 * alpha).toFixed(3)})`
  );
  glow.addColorStop(1, `rgba(${color}, 0)`);

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  const coreRadius = radius * 0.7;
  const innerLength = radius * 0.4;

  const primaryDirections = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];

  for (const { dx, dy } of primaryDirections) {
    const gradient = ctx.createLinearGradient(
      x - dx * innerLength,
      y - dy * innerLength,
      x + dx * length,
      y + dy * length
    );

    gradient.addColorStop(
      0,
      `rgba(${color}, ${(0.08 * alpha).toFixed(3)})`
    );
    gradient.addColorStop(
      0.15,
      `rgba(${color}, ${(0.85 * alpha).toFixed(3)})`
    );
    gradient.addColorStop(
      0.5,
      `rgba(${color}, ${(0.52 * alpha).toFixed(3)})`
    );
    gradient.addColorStop(
      0.8,
      `rgba(${color}, ${(0.16 * alpha).toFixed(3)})`
    );
    gradient.addColorStop(1, `rgba(${color}, 0)`);

    ctx.beginPath();
    ctx.moveTo(x - dx * innerLength, y - dy * innerLength);
    ctx.lineTo(x + dx * length, y + dy * length);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  if (diagonalSpikes) {
    const diagonalLength = length * 0.42;
    const diagonalWidth = width * 0.55;

    const diagonalDirections = [
      { dx: Math.SQRT1_2, dy: Math.SQRT1_2 },
      { dx: -Math.SQRT1_2, dy: Math.SQRT1_2 },
      { dx: Math.SQRT1_2, dy: -Math.SQRT1_2 },
      { dx: -Math.SQRT1_2, dy: -Math.SQRT1_2 },
    ];

    for (const { dx, dy } of diagonalDirections) {
      const gradient = ctx.createLinearGradient(
        x - dx * coreRadius,
        y - dy * coreRadius,
        x + dx * diagonalLength,
        y + dy * diagonalLength
      );

      gradient.addColorStop(
        0,
        `rgba(${color}, ${(0.3 * alpha).toFixed(3)})`
      );
      gradient.addColorStop(
        0.35,
        `rgba(${color}, ${(0.25 * alpha).toFixed(3)})`
      );
      gradient.addColorStop(1, `rgba(${color}, 0)`);

      ctx.beginPath();
      ctx.moveTo(x - dx * coreRadius, y - dy * coreRadius);
      ctx.lineTo(x + dx * diagonalLength, y + dy * diagonalLength);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = diagonalWidth;
      ctx.stroke();
    }
  }

  ctx.restore();
}

/** Draw a soft, elongated colored glow around a comet or meteor. */
function drawAtmosphericGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  vx: number,
  vy: number,
  headRadius: number,
  alpha: number,
  kind: "comet" | "meteor",
  desktop: boolean
) {
  if (alpha <= 0) return;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const speed = Math.hypot(vx, vy) || 1;

  const backX = -vx / speed;
  const backY = -vy / speed;

  const sideX = -backY;
  const sideY = backX;

  // Longer atmospheric tails on smaller screens.
  const length =
    (kind === "comet" ? 43 : 40) *
    (desktop ? 1.35 : 1.5);

  const width = kind === "comet" ? 15 : 13;

  const layers =
    kind === "comet"
      ? [
          {
            offset: 0,
            length: length * 0.7,
            radius: width * 1.15,
            color: "65, 155, 255",
            alpha: 0.09,
          },
          {
            offset: 0,
            length: length * 0.45,
            radius: width * 0.8,
            color: "105, 205, 255",
            alpha: 0.12,
          },
          {
            offset: 0,
            length: length * 0.2,
            radius: width * 0.48,
            color: "210, 245, 255",
            alpha: 0.17,
          },
        ]
      : [
          {
            offset: 0,
            length: length * 0.8,
            radius: width * 1.2,
            color: "235, 35, 20",
            alpha: 0.10,
          },
          {
            offset: 0,
            length: length * 0.55,
            radius: width * 0.85,
            color: "255, 75, 20",
            alpha: 0.15,
          },
          {
            offset: 0,
            length: length * 0.3,
            radius: width * 0.58,
            color: "255, 150, 40",
            alpha: 0.18,
          },
        ];

  for (const layer of layers) {
    const tailX = x + backX * layer.length;
    const tailY = y + backY * layer.length;

    const gradient = ctx.createLinearGradient(x, y, tailX, tailY);

    gradient.addColorStop(
      0,
      `rgba(${layer.color}, ${(layer.alpha * alpha).toFixed(3)})`
    );
    gradient.addColorStop(
      0.35,
      `rgba(${layer.color}, ${(layer.alpha * alpha * 0.8).toFixed(3)})`
    );
    gradient.addColorStop(
      0.72,
      `rgba(${layer.color}, ${(layer.alpha * alpha * 0.35).toFixed(3)})`
    );
    gradient.addColorStop(1, `rgba(${layer.color}, 0)`);

    const startWidth = layer.radius;
    const endWidth = layer.radius * 0.12;

    ctx.beginPath();
    ctx.moveTo(
      x + sideX * startWidth,
      y + sideY * startWidth
    );

    ctx.bezierCurveTo(
      x + backX * layer.length * 0.25 +
        sideX * startWidth * 0.9,
      y + backY * layer.length * 0.25 +
        sideY * startWidth * 0.9,
      tailX - backX * layer.length * 0.15 +
        sideX * endWidth,
      tailY - backY * layer.length * 0.15 +
        sideY * endWidth,
      tailX + sideX * endWidth,
      tailY + sideY * endWidth
    );

    ctx.lineTo(
      tailX - sideX * endWidth,
      tailY - sideY * endWidth
    );

    ctx.bezierCurveTo(
      tailX - backX * layer.length * 0.15 -
        sideX * endWidth,
      tailY - backY * layer.length * 0.15 -
        sideY * endWidth,
      x + backX * layer.length * 0.25 -
        sideX * startWidth * 0.9,
      y + backY * layer.length * 0.25 -
        sideY * startWidth * 0.9,
      x - sideX * startWidth,
      y - sideY * startWidth
    );

    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  const headGlowRadius =
    headRadius * (kind === "comet" ? 5.5 : 6);

  const headGlow = ctx.createRadialGradient(
    x,
    y,
    headRadius * 0.15,
    x,
    y,
    headGlowRadius
  );

  if (kind === "comet") {
    headGlow.addColorStop(
      0,
      `rgba(240, 255, 255, ${(0.65 * alpha).toFixed(3)})`
    );
    headGlow.addColorStop(
      0.18,
      `rgba(170, 230, 255, ${(0.36 * alpha).toFixed(3)})`
    );
    headGlow.addColorStop(
      0.48,
      `rgba(75, 165, 255, ${(0.14 * alpha).toFixed(3)})`
    );
    headGlow.addColorStop(1, "rgba(35, 100, 220, 0)");
  } else {
    headGlow.addColorStop(
      0,
      `rgba(255, 255, 220, ${(0.8 * alpha).toFixed(3)})`
    );
    headGlow.addColorStop(
      0.16,
      `rgba(255, 200, 75, ${(0.52 * alpha).toFixed(3)})`
    );
    headGlow.addColorStop(
      0.4,
      `rgba(255, 85, 25, ${(0.25 * alpha).toFixed(3)})`
    );
    headGlow.addColorStop(
      0.7,
      `rgba(210, 30, 20, ${(0.1 * alpha).toFixed(3)})`
    );
    headGlow.addColorStop(1, "rgba(150, 15, 20, 0)");
  }

  ctx.beginPath();
  ctx.arc(x, y, headGlowRadius, 0, Math.PI * 2);
  ctx.fillStyle = headGlow;
  ctx.fill();

  ctx.restore();
}

/** Fixed twinkling starfield with glowing comets and meteors. */
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
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        260,
        Math.floor((w * h) / 8500)
      );

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        color:
          STAR_COLORS[
            Math.floor(Math.random() * STAR_COLORS.length)
          ],
      }));

      streaks = [];
    };

    const spawnStreak = () => {
      const roll = Math.random();

      const kind: StreakKind =
        roll < 0.4
          ? "star"
          : roll < 0.7
            ? "comet"
            : "meteor";

      const fromLeft = Math.random() < 0.5;
      const angle =
        ((26 + Math.random() * 16) * Math.PI) / 180;

      let speed: number;
      let maxLife: number;

      if (kind === "star") {
        speed = desktop
          ? 5 + Math.random() * 2
          : 1.8 + Math.random() * 1.0;

        maxLife = desktop
          ? 180 + Math.random() * 80
          : 280 + Math.random() * 120;
      } else if (kind === "comet") {
        speed = desktop
          ? 2.5 + Math.random() * 1.5
          : 1.0 + Math.random() * 0.7;

        maxLife = desktop
          ? 280 + Math.random() * 100
          : 380 + Math.random() * 140;
      } else {
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

        // Longer trails on mobile while preserving desktop styling.
        const trailMultiplier = desktop ? 2.2 : 2.0;
        const trailLength = style.trail * trailMultiplier;

        const tx = s.x - s.vx * trailLength;
        const ty = s.y - s.vy * trailLength;

        if (s.kind === "comet" || s.kind === "meteor") {
          drawAtmosphericGlow(
            ctx,
            s.x,
            s.y,
            s.vx,
            s.vy,
            style.head,
            a,
            s.kind,
            desktop
          );
        }

        // Luminous tapered trail.
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

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = grad;
        ctx.lineWidth =
          style.width *
          (s.kind === "meteor" && desktop ? 1.1 : 1);
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.restore();

        // Only shooting stars retain sharp diffraction spikes.
        if (s.kind === "star") {
          const spikeScale = desktop ? 1.5 : 1.2;

          drawDiffractionSpikes(
            ctx,
            s.x,
            s.y,
            style.head,
            style.spikeLength * spikeScale,
            style.spikeWidth,
            style.spikeColor,
            a,
            style.diagonalSpikes
          );
        }

        // Bright central head.
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        ctx.beginPath();
        ctx.arc(s.x, s.y, style.head, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${style.headColor}, ${(
          style.headAlpha * a
        ).toFixed(3)})`;
        ctx.fill();

        ctx.restore();

        // Subtle additional halo.
        if (style.halo) {
          const haloColor =
            s.kind === "meteor"
              ? "255, 90, 35"
              : "100, 200, 255";

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

          ctx.save();
          ctx.globalCompositeOperation = "lighter";

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

          ctx.restore();
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        // Background stars remain stationary and only twinkle.
        const tw = reduced
          ? 1
          : 0.55 +
            0.45 *
              Math.sin(s.phase + t * 0.001 * s.twinkleSpeed);

        const alpha = s.baseAlpha * tw;

        // Background stars retain their diffraction spikes.
        if (s.r > 0.85) {
          const sizeFactor = Math.min(
            1,
            (s.r - 0.85) / (1.7 - 0.85)
          );

          drawDiffractionSpikes(
            ctx,
            s.x,
            s.y,
            s.r,
            3.5 + sizeFactor * 11,
            0.35 + sizeFactor * 1.2,
            s.color,
            alpha * 0.48,
            false
          );
        }

        // Crisp star core.
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`;
        ctx.fill();

        // Soft glow on larger background stars.
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
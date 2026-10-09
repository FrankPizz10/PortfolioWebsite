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
  approaching: boolean;
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

function drawAtmosphericGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  vx: number,
  vy: number,
  headRadius: number,
  alpha: number,
  kind: "comet" | "meteor",
  desktop: boolean,
  depthScale: number
) {
  if (alpha <= 0) return;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const speed = Math.hypot(vx, vy) || 1;
  const backX = -vx / speed;
  const backY = -vy / speed;
  const sideX = -backY;
  const sideY = backX;

  const length =
    (kind === "comet" ? 72 : 54) *
    (desktop ? 1.5 : 1.9) *
    depthScale;
  const width = (kind === "comet" ? 17 : 15) * depthScale;

  // Broad, low-opacity outer glow plus a softer inner glow. The blur makes
  // the layers merge together instead of showing separate opacity bands.
  const layers =
    kind === "comet"
      ? [
          { length: length, radius: width * 1.25, color: "65, 145, 255", alpha: 0.045, blur: 10 },
          { length: length * 0.76, radius: width * 0.9, color: "90, 190, 255", alpha: 0.065, blur: 7 },
          { length: length * 0.48, radius: width * 0.58, color: "175, 230, 255", alpha: 0.075, blur: 4 },
        ]
      : [
          { length: length, radius: width * 1.3, color: "220, 35, 25", alpha: 0.045, blur: 10 },
          { length: length * 0.78, radius: width * 0.92, color: "255, 75, 25", alpha: 0.065, blur: 7 },
          { length: length * 0.5, radius: width * 0.6, color: "255, 165, 55", alpha: 0.08, blur: 4 },
        ];

  for (const layer of layers) {
    const tailX = x + backX * layer.length;
    const tailY = y + backY * layer.length;
    const gradient = ctx.createLinearGradient(x, y, tailX, tailY);

    // More gradient stops produce a gradual fade along the whole tail.
    gradient.addColorStop(0, `rgba(${layer.color}, ${(layer.alpha * alpha).toFixed(3)})`);
    gradient.addColorStop(0.16, `rgba(${layer.color}, ${(layer.alpha * alpha * 0.92).toFixed(3)})`);
    gradient.addColorStop(0.38, `rgba(${layer.color}, ${(layer.alpha * alpha * 0.68).toFixed(3)})`);
    gradient.addColorStop(0.62, `rgba(${layer.color}, ${(layer.alpha * alpha * 0.38).toFixed(3)})`);
    gradient.addColorStop(0.82, `rgba(${layer.color}, ${(layer.alpha * alpha * 0.14).toFixed(3)})`);
    gradient.addColorStop(1, `rgba(${layer.color}, 0)`);

    const startWidth = layer.radius;
    const endWidth = layer.radius * 0.06;

    ctx.save();
    ctx.filter = `blur(${layer.blur * depthScale}px)`;
    ctx.beginPath();
    ctx.moveTo(x + sideX * startWidth, y + sideY * startWidth);
    ctx.bezierCurveTo(
      x + backX * layer.length * 0.28 + sideX * startWidth * 0.9,
      y + backY * layer.length * 0.28 + sideY * startWidth * 0.9,
      tailX - backX * layer.length * 0.12 + sideX * endWidth,
      tailY - backY * layer.length * 0.12 + sideY * endWidth,
      tailX + sideX * endWidth,
      tailY + sideY * endWidth
    );
    ctx.lineTo(tailX - sideX * endWidth, tailY - sideY * endWidth);
    ctx.bezierCurveTo(
      tailX - backX * layer.length * 0.12 - sideX * endWidth,
      tailY - backY * layer.length * 0.12 - sideY * endWidth,
      x + backX * layer.length * 0.28 - sideX * startWidth * 0.9,
      y + backY * layer.length * 0.28 - sideY * startWidth * 0.9,
      x - sideX * startWidth,
      y - sideY * startWidth
    );
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  }

  // A single, smoothly feathered head glow avoids a second visible halo ring.
  const headGlowRadius = headRadius * (kind === "comet" ? 7.2 : 7.5);
  const innerRadius = Math.max(0.1, headRadius * 0.12);
  const headGlow = ctx.createRadialGradient(
    x, y, innerRadius,
    x, y, headGlowRadius
  );

  if (kind === "comet") {
    headGlow.addColorStop(0, `rgba(240, 255, 255, ${(0.34 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.08, `rgba(205, 242, 255, ${(0.29 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.2, `rgba(145, 215, 255, ${(0.2 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.38, `rgba(90, 175, 255, ${(0.11 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.58, `rgba(65, 140, 245, ${(0.055 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.78, `rgba(45, 105, 220, ${(0.018 * alpha).toFixed(3)})`);
    headGlow.addColorStop(1, "rgba(35, 100, 220, 0)");
  } else {
    headGlow.addColorStop(0, `rgba(255, 255, 225, ${(0.4 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.08, `rgba(255, 220, 130, ${(0.32 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.2, `rgba(255, 155, 65, ${(0.22 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.38, `rgba(255, 90, 35, ${(0.12 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.58, `rgba(225, 45, 25, ${(0.055 * alpha).toFixed(3)})`);
    headGlow.addColorStop(0.8, `rgba(185, 25, 25, ${(0.018 * alpha).toFixed(3)})`);
    headGlow.addColorStop(1, "rgba(150, 15, 20, 0)");
  }

  ctx.save();
  ctx.filter = `blur(${3.5 * depthScale}px)`;
  ctx.beginPath();
  ctx.arc(x, y, headGlowRadius, 0, Math.PI * 2);
  ctx.fillStyle = headGlow;
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

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
    let lastFrameTime = 0;

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

      // Each object gets its own direction of depth travel.
      const approaching = Math.random() < 0.5;

      let speed: number;
      let maxLife: number;

      if (kind === "star") {
        speed = desktop
          ? 3.8 + Math.random() * 1.5
          : 1.2 + Math.random() * 0.6;

        maxLife = desktop
          ? 420 + Math.random() * 180
          : 480 + Math.random() * 220;
      } else if (kind === "comet") {
        speed = desktop
          ? 1.8 + Math.random() * 1.0
          : 0.65 + Math.random() * 0.4;

        maxLife = desktop
          ? 600 + Math.random() * 220
          : 680 + Math.random() * 260;
      } else {
        speed = desktop
          ? 3.2 + Math.random() * 1.4
          : 1.1 + Math.random() * 0.7;

        maxLife = desktop
          ? 420 + Math.random() * 180
          : 500 + Math.random() * 220;
      }

      streaks.push({
        x: fromLeft ? -300 : w + 300,
        y: Math.random() * h * 0.45,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife,
        kind,
        approaching,
      });
    };

    const drawStreaks = (t: number, delta: number) => {
      if (reduced) return;

      if (t > nextStreakAt) {
        spawnStreak();

        // Slightly more breathing room between objects.
        nextStreakAt = t + 2600 + Math.random() * 3600;
      }

      const margin = desktop ? 1800 : 1400;

      streaks = streaks.filter(
        (s) =>
          s.life < s.maxLife &&
          s.x > -margin &&
          s.x < w + margin &&
          s.y > -margin &&
          s.y < h + margin
      );

      for (const s of streaks) {
        s.x += s.vx * delta;
        s.y += s.vy * delta;
        s.life += delta;

        const progress = Math.min(1, s.life / s.maxLife);

        // Smooth entry and exit; no periodic brightness flicker.
        const fadeIn = Math.min(1, progress / 0.1);
        const fadeOut = Math.min(1, (1 - progress) / 0.12);
        const lifecycleAlpha = Math.min(fadeIn, fadeOut);

        if (lifecycleAlpha <= 0) continue;

        // Ease the depth transition to avoid sudden size changes.
        const eased = progress * progress * (3 - 2 * progress);

        const depthScale = s.approaching
          ? 0.48 + eased * 1.35
          : 1.65 - eased * 1.2;

        // Objects coming toward the viewer brighten; receding objects dim.
        const depthAlpha = s.approaching
          ? 0.42 + eased * 0.58
          : 1.0 - eased * 0.58;

        const alpha = lifecycleAlpha * depthAlpha;
        const style = STREAK_STYLES[s.kind];

        // Longer trails on both mobile and desktop.
        const trailMultiplier = desktop ? 3.0 : 3.2;
        const trailLength =
          style.trail * trailMultiplier * depthScale;

        const tx = s.x - s.vx * trailLength;
        const ty = s.y - s.vy * trailLength;

        if (s.kind === "comet" || s.kind === "meteor") {
          drawAtmosphericGlow(
            ctx,
            s.x,
            s.y,
            s.vx,
            s.vy,
            style.head * depthScale,
            alpha,
            s.kind,
            desktop,
            depthScale
          );
        }

        // Main trail, scaled smoothly with perceived depth.
        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          tx,
          ty
        );

        for (const [offset, rgb, stopAlpha] of style.stops) {
          grad.addColorStop(
            offset,
            `rgba(${rgb}, ${(stopAlpha * alpha).toFixed(3)})`
          );
        }

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = grad;
        ctx.lineWidth =
          style.width *
          depthScale *
          (s.kind === "meteor" && desktop ? 1.1 : 1);
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.restore();

        // Shooting-star diffraction spikes scale with depth, too.
        if (s.kind === "star") {
          const spikeScale = desktop ? 1.5 : 1.3;

          drawDiffractionSpikes(
            ctx,
            s.x,
            s.y,
            style.head * depthScale,
            style.spikeLength * spikeScale * depthScale,
            style.spikeWidth * depthScale,
            style.spikeColor,
            alpha,
            style.diagonalSpikes
          );
        }

        // Central head grows/shrinks continuously.
        const headRadius = style.head * depthScale;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        ctx.beginPath();
        ctx.arc(s.x, s.y, headRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${style.headColor}, ${(
          style.headAlpha * alpha
        ).toFixed(3)})`;
        ctx.fill();

        ctx.restore();


      }
    };

    const draw = (t: number) => {
      // Normalize animation updates for different refresh rates.
      const delta = lastFrameTime
        ? Math.min((t - lastFrameTime) / 16.667, 2)
        : 1;

      lastFrameTime = t;

      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        // Background stars stay fixed; only their twinkle changes.
        const tw = reduced
          ? 1
          : 0.55 +
            0.45 *
              Math.sin(s.phase + t * 0.001 * s.twinkleSpeed);

        const alpha = s.baseAlpha * tw;

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

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`;
        ctx.fill();

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

      drawStreaks(t, delta);

      if (!reduced) {
        raf = requestAnimationFrame(draw);
      }
    };

    seed();
    draw(0);

    const onResize = () => {
      seed();
      lastFrameTime = 0;
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
};

export default Starfield;
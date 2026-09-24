import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type GlowPosition = "top-right" | "top-center" | "center";

export type DotGridBackgroundProps = {
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  orbitSpeed?: number;
  impactRadius?: number;
  scaleOnHover?: number;
  enableRevolve?: boolean;
  glowPosition?: GlowPosition;
  glowColor?: string;
  glowOpacity?: number;
  children?: ReactNode;
  className?: string;
};

type Dot = {
  bx: number;
  by: number;
  inclination: number;
  ascension: number;
  phase: number;
  speedMultiplier: number;
};

type PointerPosition = {
  x: number;
  y: number;
};

const glowCoordinates: Record<GlowPosition, string> = {
  "top-right": "82% 8%",
  "top-center": "50% 8%",
  center: "50% 50%",
};

const smoothstep = (value: number) => {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
};

const parseColor = (color: string) => {
  const value = color.trim();

  if (value.startsWith("rgb")) {
    const channels = value.match(/[\d.]+/g) ?? [];
    return {
      r: Number(channels[0]) || 0,
      g: Number(channels[1]) || 0,
      b: Number(channels[2]) || 0,
    };
  }

  let hex = value.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((character) => character + character)
      .join("");
  }

  const parsed = Number.parseInt(hex.slice(0, 6), 16);
  if (Number.isNaN(parsed)) return { r: 255, g: 255, b: 255 };

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
};

export function DotGridBackground({
  dotColor = "#ffffff",
  dotSize = 3,
  dotSpacing = 30,
  orbitSpeed = 1.5,
  impactRadius = 100,
  scaleOnHover = 1.8,
  enableRevolve = true,
  glowPosition = "top-right",
  glowColor = "#FFFFFF",
  glowOpacity = 0.25,
  children,
  className = "",
}: DotGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const safeDotSize = Math.max(0, dotSize);
  const safeDotSpacing = Math.max(1, safeDotSize * 2, dotSpacing);
  const safeImpactRadius = Math.max(1, impactRadius);
  const safeGlowOpacity = Math.min(1, Math.max(0, glowOpacity));

  const glowStyle: CSSProperties = {
    backgroundImage: `radial-gradient(ellipse 75% 70% at ${glowCoordinates[glowPosition]}, ${glowColor} 0%, transparent 68%)`,
    mixBlendMode: "screen",
    opacity: safeGlowOpacity,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    const dots: Dot[] = [];
    const pointer: PointerPosition = { x: -9999, y: -9999 };
    const color = parseColor(dotColor);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let width = 0;
    let height = 0;
    let pointerInside = false;
    let pointerLeftAt = 0;
    let previousTime = 0;
    let animationTime = 0;
    let animationFrame = 0;

    const buildGrid = () => {
      dots.length = 0;
      const columns = Math.ceil(width / safeDotSpacing) + 2;
      const rows = Math.ceil(height / safeDotSpacing) + 2;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          dots.push({
            bx: column * safeDotSpacing,
            by: row * safeDotSpacing,
            inclination: Math.random() * Math.PI,
            ascension: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            speedMultiplier: 0.7 + Math.random() * 0.6,
          });
        }
      }
    };

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildGrid();
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };

    const handlePointerEnter = (event: PointerEvent) => {
      updatePointer(event);
      pointerInside = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      updatePointer(event);
      pointerInside = true;
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      pointerLeftAt = performance.now();
    };

    const draw = (now: number) => {
      animationFrame = requestAnimationFrame(draw);

      const delta = Math.min((now - (previousTime || now)) / 1000, 0.05);
      previousTime = now;
      animationTime += (reducedMotion.matches ? 0 : orbitSpeed) * delta;
      context.clearRect(0, 0, width, height);

      const elapsedSinceLeave = pointerInside
        ? 0
        : Math.max(0, now - pointerLeftAt) / 1000;
      const exitInfluence = pointerInside
        ? 1
        : smoothstep(Math.max(0, 1 - elapsedSinceLeave * 1.5));

      for (const dot of dots) {
        const deltaX = dot.bx - pointer.x;
        const deltaY = dot.by - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);
        const isImpacted = distance < safeImpactRadius && distance > 0;

        let x = dot.bx;
        let y = dot.by;
        let scale = 1;
        let opacity = 0.12;

        if (isImpacted) {
          const normalizedDistance = distance / safeImpactRadius;
          const influence = smoothstep(1 - normalizedDistance) * exitInfluence;

          if (enableRevolve && !reducedMotion.matches) {
            const radius =
              (1 - normalizedDistance) * safeDotSpacing * 0.7 * influence;
            const angle = animationTime * dot.speedMultiplier + dot.phase;
            const cosAscension = Math.cos(dot.ascension);
            const sinAscension = Math.sin(dot.ascension);
            const cosInclination = Math.cos(dot.inclination);
            const sinInclination = Math.sin(dot.inclination);
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle) * cosInclination;
            const depth = Math.sin(angle) * sinInclination;

            x =
              dot.bx +
              (cosAngle * cosAscension - sinAngle * sinAscension) * radius;
            y =
              dot.by +
              (cosAngle * sinAscension + sinAngle * cosAscension) * radius;

            const perspective = 0.75 + 0.25 * ((depth + 1) * 0.5);
            scale = (1 + (scaleOnHover - 1) * influence) * perspective;
            opacity = (0.12 + 0.7 * influence) * perspective;
          } else {
            scale = 1 + (scaleOnHover - 1) * influence;
            opacity = 0.12 + 0.7 * influence;
          }
        }

        context.beginPath();
        context.arc(x, y, (safeDotSize / 2) * scale, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        context.fill();
      }

      if (!pointerInside && exitInfluence === 0) {
        pointer.x = -9999;
        pointer.y = -9999;
      }
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    resizeCanvas();

    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("pointercancel", handlePointerLeave);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointercancel", handlePointerLeave);
    };
  }, [
    dotColor,
    enableRevolve,
    orbitSpeed,
    safeDotSize,
    safeDotSpacing,
    safeImpactRadius,
    scaleOnHover,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0A0A0A] ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={glowStyle}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

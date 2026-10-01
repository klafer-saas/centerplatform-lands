import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  phase: number;
  color: string;
};

const particleColors = ["#ff9d00", "#ffb000", "#ffc23d", "#ffe09c"];

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function InteractiveParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!container || !canvas || !context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let particles: Particle[] = [];
    let width = 1;
    let height = 1;
    let frame = 0;
    let active = false;
    let animationFrame: number | null = null;
    let lastTime = performance.now();

    const createParticles = () => {
      const area = width * height;
      const amount = Math.min(1450, Math.max(420, Math.round(area / 820)));
      const nextParticles: Particle[] = [];

      for (let index = 0; index < amount; index += 1) {
        const x = seededRandom(index + 3.1) * width;
        const y = seededRandom(index + 91.7) * height;
        const centerDistance = Math.hypot(x - width / 2, y - height / 2);
        const centerRadius = Math.min(width, height) * 0.24;

        if (
          centerDistance < centerRadius &&
          seededRandom(index + 207.4) < 0.34
        ) {
          continue;
        }

        nextParticles.push({
          x,
          y,
          size: 0.45 + seededRandom(index + 18.2) * 1.25,
          opacity: 0.08 + seededRandom(index + 41.8) * 0.34,
          phase: seededRandom(index + 76.3) * Math.PI * 2,
          color:
            particleColors[
              Math.floor(seededRandom(index + 130.5) * particleColors.length)
            ],
        });
      }

      particles = nextParticles;
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      pointer.x = pointer.targetX = width * 0.5;
      pointer.y = pointer.targetY = height * 0.48;
      createParticles();
    };

    const render = (timestamp: number) => {
      const delta = Math.min(32, timestamp - lastTime);
      lastTime = timestamp;
      frame += delta * 0.001;
      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;

      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        Math.max(width, height) * 0.42,
      );
      glow.addColorStop(0, "rgba(255, 176, 0, 0.055)");
      glow.addColorStop(0.5, "rgba(255, 176, 0, 0.018)");
      glow.addColorStop(1, "rgba(255, 176, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const ringRadius =
        Math.min(width, height) *
        (0.22 + Math.sin(frame * 0.72) * 0.022 + Math.cos(frame * 2.1) * 0.012);
      const ringWidth = Math.max(34, Math.min(width, height) * 0.09);

      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        const driftX =
          Math.sin(frame * 0.48 + particle.phase + particle.y * 0.008) * 4.5;
        const driftY =
          Math.cos(frame * 0.4 + particle.phase + particle.x * 0.006) * 3.5;
        const baseX = particle.x + driftX;
        const baseY = particle.y + driftY;
        const differenceX = baseX - pointer.x;
        const differenceY = baseY - pointer.y;
        const distance = Math.max(1, Math.hypot(differenceX, differenceY));
        const ringDistance = Math.abs(distance - ringRadius);
        const ringStrength = Math.exp(
          -(ringDistance * ringDistance) / (2 * ringWidth * ringWidth),
        );
        const directionX = differenceX / distance;
        const directionY = differenceY / distance;
        const wave = Math.sin(frame * 3.1 + particle.phase + distance * 0.032);
        const displacement = ringStrength * (17 + wave * 7);
        const tangent = ringStrength * wave * 5;
        const drawX =
          baseX + directionX * displacement - directionY * tangent;
        const drawY =
          baseY + directionY * displacement + directionX * tangent;
        const alpha = Math.min(
          0.9,
          particle.opacity + ringStrength * (0.3 + particle.opacity),
        );
        const streak = particle.size + ringStrength * (2.2 + particle.size);

        context.beginPath();
        context.moveTo(drawX - directionX * streak, drawY - directionY * streak);
        context.lineTo(drawX + directionX * streak, drawY + directionY * streak);
        context.strokeStyle = particle.color;
        context.globalAlpha = alpha;
        context.lineWidth = particle.size + ringStrength * 0.8;
        context.lineCap = "round";
        context.stroke();
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      if (active && !reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (inside) {
        pointer.targetX = event.clientX - bounds.left;
        pointer.targetY = event.clientY - bounds.top;
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;

        if (active && animationFrame === null) {
          lastTime = performance.now();
          animationFrame = window.requestAnimationFrame(render);
        } else if (!active && animationFrame !== null) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      },
      { threshold: 0.05 },
    );

    resize();
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    if (reducedMotion) render(performance.now());

    return () => {
      active = false;
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full opacity-75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,10,0.2)_58%,#0a0a0a_94%)]" />
    </div>
  );
}

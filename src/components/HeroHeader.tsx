import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { DotGridBackground } from "./DotGridBackground";
import { MockupShowcase } from "./MockupShowcase";
import { PlatformNavigation } from "./PlatformNavigation";

export type HeroStat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  featured?: boolean;
};

export type HeroHeaderProps = {
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  stats?: HeroStat[];
};

const defaultStats: HeroStat[] = [
  { value: 100, suffix: "+", label: "Franqueados\nativos" },
  { value: 82, suffix: "%", label: "Redução de\ncusto com suporte" },
  { value: 4.8, decimals: 1, label: "Avaliação\nmédia", featured: true },
];

const titleSegments = [
  { text: "Todos os" },
  { text: "Agentes", className: "text-brand" },
  { text: "para sua rede de" },
  { text: "Franquia", className: "text-brand", breakBefore: true },
  { text: "numa" },
  { text: "Plataforma", className: "text-brand" },
  { text: "só" },
];

function useCountUp(target: number, duration = 1800, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(target);
          return;
        }

        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Number((target * eased).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [decimals, duration, hasAnimated, target]);

  return { ref, value: value.toFixed(decimals) };
}

function StatItem({ stat }: { stat: HeroStat }) {
  const { ref, value } = useCountUp(stat.value, 1800, stat.decimals ?? 0);

  return (
    <div className="relative flex min-w-0 flex-1 flex-col items-center sm:px-8">
      <div className="flex items-center justify-center gap-1.5">
        <p className="text-[30px] font-bold leading-none tracking-tight text-white sm:text-[50px]">
          <span ref={ref}>{value}</span>
          {stat.suffix && <span className="text-brand">{stat.suffix}</span>}
        </p>
        {stat.featured && (
          <span
            aria-hidden="true"
            className="h-7 w-7 shrink-0 bg-brand sm:h-11 sm:w-11"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 100% 38%, 69% 59%, 79% 100%, 50% 75%, 21% 100%, 31% 59%, 0% 38%, 39% 35%)",
            }}
          />
        )}
      </div>
      <p className="mt-2 w-[112px] whitespace-pre-line text-center text-[0.5rem] font-medium uppercase leading-tight tracking-[0.08em] text-zinc-500 sm:w-auto sm:whitespace-nowrap sm:text-[0.64rem] sm:tracking-[0.14em]">
        {stat.label}
      </p>
    </div>
  );
}

export function HeroHeader({
  subtitle = "Centralize a gestão comercial, financeira, operacional e o suporte da sua rede, reduzindo custos e automatizando processos em toda a operação.",
  ctaLabel = "Começar agora",
  ctaHref = "#contato",
  stats = defaultStats,
}: HeroHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const headerPortalRoot = document.getElementById("header-root");

  return (
    <DotGridBackground
      dotColor="#ffffff"
      dotSize={3}
      dotSpacing={30}
      enableRevolve
      orbitSpeed={5}
      impactRadius={100}
      scaleOnHover={1.8}
      glowPosition="top-right"
      glowOpacity={0.25}
      className="min-h-[100svh] text-white sm:min-h-screen"
    >
      <div id="inicio" className="flex min-h-[100svh] flex-col scroll-mt-24 sm:min-h-screen">
        {headerPortalRoot &&
          createPortal(<PlatformNavigation />, headerPortalRoot)}

        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-14 pt-[clamp(7rem,20vh,12rem)] text-center sm:px-8 sm:pb-20 md:pt-[clamp(7.5rem,21vh,13rem)]">
        <AnimatedTitle
          as="h1"
          segments={titleSegments}
          staggerDelay={0.06}
          once
          className="w-full max-w-6xl text-balance text-[26px] font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-[50px]"
        />

        <AnimatedTitle
          as="p"
          text={subtitle}
          staggerDelay={0.025}
          delayChildren={0.72}
          once
          className="mt-6 max-w-2xl text-pretty text-[16px] leading-7 text-[#CCCCCC] sm:text-[18px] sm:leading-8"
        />

        <motion.a
          id="comecar"
          href={ctaHref}
          aria-label={`${ctaLabel} com a CenterPlatform.ai`}
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 20, filter: "blur(4px)" }
          }
          whileInView={
            prefersReducedMotion
              ? undefined
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.55,
            delay: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
          className="mt-8 inline-flex h-[40px] w-[149px] items-center justify-center rounded-full bg-brand px-4 text-[14px] font-semibold text-black shadow-brand-glow transition-colors duration-200 hover:bg-[#FEB000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-ink sm:w-auto sm:min-w-44 sm:px-10 sm:text-[16px]"
        >
          {ctaLabel}
        </motion.a>

        <div
          aria-label="Resultados da plataforma"
          className="mt-14 grid w-full max-w-4xl grid-cols-3 items-start gap-x-4 sm:mt-20 sm:gap-x-10 lg:gap-x-16"
        >
          {stats.map((stat) => (
            <StatItem
              key={`${stat.label}-${stat.value}`}
              stat={stat}
            />
          ))}
        </div>

        </section>
        <MockupShowcase />
        <div aria-hidden="true" className="w-full flex-1 bg-ink" />
      </div>
    </DotGridBackground>
  );
}

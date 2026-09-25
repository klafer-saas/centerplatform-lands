import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { FadeInText } from "./FadeInText";

export type IntelligenceStep = {
  number?: string;
  title: string;
  description: string;
};

export type IntelligenceStepsSectionProps = {
  badge?: string;
  title?: string;
  subtitle?: string;
  steps?: IntelligenceStep[];
};

const defaultSteps: IntelligenceStep[] = [
  {
    title: "Centralize sua operação",
    description:
      "Reúna indicadores comerciais, financeiros e operacionais em um único ambiente.",
  },
  {
    title: "Automatize processos",
    description:
      "Use agentes de IA para eliminar tarefas repetitivas e acelerar o suporte à rede.",
  },
  {
    title: "Escale com inteligência",
    description:
      "Transforme dados em decisões e cresça com mais eficiência, padrão e controle.",
  },
];

export function IntelligenceStepsSection({
  badge = "Como funciona",
  title = "Inteligência Artificial para Redes de Franquia",
  subtitle = "Conecte dados, pessoas e operações com agentes de IA treinados para apoiar cada etapa da sua rede.",
  steps = defaultSteps,
}: IntelligenceStepsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const safeSteps = steps.length ? steps : defaultSteps;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextStep = Math.min(
      safeSteps.length - 1,
      Math.floor(latest * safeSteps.length),
    );
    setActiveStep(Math.max(0, nextStep));
  });
  const titleBreakPhrase = "de Franquia";
  const breakIndex = title
    .toLocaleLowerCase("pt-BR")
    .lastIndexOf(titleBreakPhrase.toLocaleLowerCase("pt-BR"));
  const titleSegments =
    breakIndex > 0
      ? [
          { text: title.slice(0, breakIndex).trim() },
          { text: title.slice(breakIndex).trim(), breakBefore: true },
        ]
      : [{ text: title }];

  const scrollToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollableDistance = Math.max(
      0,
      section.offsetHeight - window.innerHeight,
    );
    const stepProgress =
      safeSteps.length > 1 ? index / (safeSteps.length - 1) : 0;

    window.scrollTo({
      top: section.offsetTop + scrollableDistance * stepProgress,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="intelligence-steps-title"
      className="relative bg-ink text-white xl:h-[220vh] xl:min-h-[1100px]"
    >
      <div className="flex items-center px-5 pb-16 pt-12 sm:px-8 sm:py-[60px] lg:px-12 xl:sticky xl:top-0 xl:min-h-screen xl:overflow-hidden xl:py-16">
      <div className="mx-auto w-full max-w-[1320px] xl:-translate-y-8">
        <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
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
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.55,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex h-[40px] w-[150px] items-center justify-center rounded-full"
          >
            <AnimatedTitle
              as="div"
              text={badge}
              staggerDelay={0.06}
              once
              className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.2em] text-brand"
            />
          </motion.div>

          <AnimatedTitle
            id="intelligence-steps-title"
            as="h2"
            segments={titleSegments}
            staggerDelay={0.055}
            delayChildren={0.1}
            once
            className="mt-3 text-balance text-[20px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[28px] lg:text-[35px]"
          />

          <FadeInText
            text={subtitle}
            className="mt-5 max-w-3xl text-[16px] leading-6 text-[#CCCCCC] lg:text-[20px] lg:leading-8"
          />
        </header>

        <div className="relative mt-16 sm:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-[calc(100%/6)] right-[calc(100%/6)] top-10 hidden h-[3px] bg-zinc-800 sm:block"
          >
            <motion.span
              className="block h-full bg-[#eee]"
              style={{ width: progressWidth }}
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
            {safeSteps.map((step, index) => {
              const isActive = index === activeStep;
              const isComplete = index < activeStep;

              return (
                <button
                  key={`${step.title}-${index}`}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => scrollToStep(index)}
                  className="group relative flex flex-col items-center rounded-xl text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
                >
                  <span
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-center text-[28px] font-semibold leading-none tracking-normal tabular-nums transition-[background-color,color,transform] duration-300 group-hover:scale-105 sm:h-20 sm:w-20 sm:text-[35px] ${
                      isActive || isComplete
                        ? "bg-brand text-black"
                        : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white"
                    }`}
                  >
                    {step.number ?? String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`mt-6 text-[18px] font-semibold transition-colors duration-300 ${
                      isActive || isComplete
                        ? "text-brand"
                        : "text-zinc-500 sm:text-zinc-700"
                    }`}
                  >
                    {step.title}
                  </span>

                  <span className="mt-4 max-w-sm text-[16px] leading-7 text-[#CCCCCC] transition-colors duration-300 sm:px-4">
                    {step.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

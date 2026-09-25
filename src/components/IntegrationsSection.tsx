import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Building2,
  FileUp,
  Play,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";
import centerplatformLogo from "../assets/centerplatform-logo.svg";
import { AnimatedTitle } from "./AnimatedTitle";
import { FadeInText } from "./FadeInText";

type IntegrationNode = {
  label: string;
  icon: LucideIcon;
  position: string;
};

export type IntegrationsSectionProps = {
  signupHref?: string;
};

const connectorPaths = [
  "M105 62H270Q292 62 292 84V166Q292 184 312 184H405",
  "M145 220H405",
  "M105 378H270Q292 378 292 356V274Q292 256 312 256H405",
  "M795 62H630Q608 62 608 84V166Q608 184 588 184H495",
  "M755 220H495",
  "M795 378H630Q608 378 608 356V274Q608 256 588 256H495",
];

const integrationNodes: IntegrationNode[] = [
  {
    label: "Inteligência artificial",
    icon: Sparkles,
    position: "left-[4%] top-[8%] sm:left-[8%]",
  },
  {
    label: "Conteúdos",
    icon: Play,
    position: "left-[11%] top-1/2 -translate-y-1/2 sm:left-[14%]",
  },
  {
    label: "Documentos",
    icon: FileUp,
    position: "bottom-[8%] left-[4%] sm:left-[8%]",
  },
  {
    label: "Operações",
    icon: Briefcase,
    position: "right-[4%] top-[8%] sm:right-[8%]",
  },
  {
    label: "Vídeos",
    icon: Video,
    position: "right-[11%] top-1/2 -translate-y-1/2 sm:right-[14%]",
  },
  {
    label: "Unidades",
    icon: Building2,
    position: "bottom-[8%] right-[4%] sm:right-[8%]",
  },
];

export function IntegrationsSection({
  signupHref = "https://system.centerplatform.ai/register",
}: IntegrationsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramInView = useInView(diagramRef, { amount: 0.25 });

  return (
    <section
      id="integracoes"
      aria-labelledby="integrations-title"
      className="overflow-hidden bg-ink px-5 py-20 text-white sm:px-8 sm:py-[60px] lg:px-12 xl:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="mx-auto flex max-w-4xl flex-col items-center text-center">
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
            className="flex h-10 w-[150px] items-center justify-center rounded-full"
          >
            <AnimatedTitle
              as="div"
              text="Integrações"
              staggerDelay={0.05}
              once
              className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.2em] text-brand"
            />
          </motion.div>

          <AnimatedTitle
            id="integrations-title"
            as="h2"
            text="Integrações sem complicação"
            staggerDelay={0.055}
            delayChildren={0.1}
            once
            className="mt-3 text-balance font-sans text-[20px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[28px] lg:text-[35px]"
          />

          <FadeInText
            text="Conecte as ferramentas que sua rede já utiliza e automatize processos com integrações inteligentes de ponta a ponta."
            className="mt-5 max-w-3xl text-[16px] leading-6 text-[#CCCCCC] sm:text-[20px] sm:leading-8"
          />
        </header>

        <div
          ref={diagramRef}
          className="relative mx-auto mt-12 h-[340px] w-full max-w-5xl sm:mt-16 sm:h-[440px]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] blur-3xl sm:h-96 sm:w-96"
          />

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 900 440"
            preserveAspectRatio="none"
          >
            <defs>
              <filter
                id="integration-pulse-glow"
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g fill="none" stroke="#242424" strokeWidth="2">
              {connectorPaths.map((path) => (
                <path key={`base-${path}`} d={path} />
              ))}
            </g>

            {!prefersReducedMotion && (
              <g
                fill="none"
                stroke="#FEB000"
                strokeWidth="2.4"
                strokeLinecap="round"
                filter="url(#integration-pulse-glow)"
              >
                {connectorPaths.map((path) => (
                  <motion.path
                    key={`pulse-${path}`}
                    d={path}
                    pathLength={1}
                    strokeDasharray="0.12 0.88"
                    initial={{ strokeDashoffset: 1, opacity: 0 }}
                    animate={
                      diagramInView
                        ? {
                            strokeDashoffset: [1, 0],
                            opacity: [0, 1, 1, 0],
                          }
                        : { strokeDashoffset: 1, opacity: 0 }
                    }
                    transition={
                      diagramInView
                        ? {
                            duration: 3.6,
                            delay: 0.25,
                            repeat: Infinity,
                            ease: "linear",
                          }
                        : { duration: 0 }
                    }
                  />
                ))}
              </g>
            )}
          </svg>

          {integrationNodes.map((node, index) => {
            const Icon = node.icon;

            return (
              <div
                key={node.label}
                className={`absolute z-10 ${node.position}`}
              >
                <motion.div
                  role="img"
                  aria-label={node.label}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 0.72, filter: "blur(5px)" }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 1, scale: 1, filter: "blur(0px)" }
                  }
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15 + index * 0.09,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="grid h-14 w-14 place-items-center rounded-full border-2 border-[#242424] bg-[#1A1A1A] shadow-[0_18px_55px_rgba(0,0,0,0.38)] sm:h-20 sm:w-20"
                >
                  <motion.span
                    className="grid h-full w-full place-items-center leading-none text-brand"
                  >
                    <Icon
                      aria-hidden="true"
                      className="block h-6 w-6 shrink-0 text-current sm:h-8 sm:w-8"
                      strokeWidth={1.5}
                    />
                  </motion.span>
                </motion.div>
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <motion.a
              href={signupHref}
              aria-label="Criar uma conta na CenterPlatform.ai"
              title="Criar conta"
              whileHover={
                prefersReducedMotion
                  ? { borderColor: "#FEB000" }
                  : {
                      y: -2,
                      scale: 1.04,
                      borderColor: "#FEB000",
                      backgroundColor: "#211B10",
                      boxShadow:
                        "0 0 0 4px rgba(254,176,0,0.08), 0 16px 38px rgba(254,176,0,0.16)",
                    }
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 28 }
              }
              className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-[#242424] bg-[#1A1A1A] shadow-[0_14px_38px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-ink sm:h-28 sm:w-28"
            >
              <span
                aria-hidden="true"
                className="relative z-10 block h-7 w-[60px] overflow-hidden sm:h-8 sm:w-[69px]"
              >
                <img
                  src={centerplatformLogo}
                  alt=""
                  className="h-full w-auto max-w-none"
                />
              </span>
            </motion.a>
          </div>
        </div>

        <motion.a
          href="#comecar"
          aria-label="Explorar integrações da CenterPlatform.ai"
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
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.55,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mx-auto mt-3 flex h-10 w-fit items-center justify-center rounded-full bg-brand px-5 text-[14px] font-semibold text-black shadow-brand-glow transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-ink sm:mt-5"
        >
          Explorar integrações
        </motion.a>
      </div>
    </section>
  );
}

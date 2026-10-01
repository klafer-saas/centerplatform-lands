import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  RefreshCw,
  Target,
  type LucideIcon,
} from "lucide-react";
import { AnimatedTitle } from "./AnimatedTitle";
import { FadeInText } from "./FadeInText";

export type SolutionItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type SolutionsSectionProps = {
  badge?: string;
  title?: string;
  description?: string;
  solutions?: SolutionItem[];
};

const defaultSolutions: SolutionItem[] = [
  {
    title: "Redução de até 70% nos Chamados de Suporte",
    description:
      "Automatize respostas recorrentes e libere sua equipe para demandas estratégicas.",
    icon: Headphones,
  },
  {
    title: "Geomarketing Inteligente",
    description:
      "Identifique regiões com maior potencial usando dados territoriais e inteligência artificial.",
    icon: Target,
  },
  {
    title: "Trilhas de Treinamento e Masterclasses",
    description:
      "Capacite toda a rede com conteúdos estruturados, especialistas e acompanhamento contínuo.",
    icon: GraduationCap,
  },
  {
    title: "Atualização Automática de Manuais",
    description:
      "Mantenha processos e procedimentos sempre atualizados e acessíveis aos franqueados.",
    icon: RefreshCw,
  },
  {
    title: "Dashboards Financeiros e DRE Customizada",
    description:
      "Acompanhe indicadores financeiros em tempo real com visões adaptadas à sua operação.",
    icon: LayoutDashboard,
  },
  {
    title: "Gestão de Contratos e Smart Docs",
    description:
      "Centralize documentos, prazos e contratos com organização e automações inteligentes.",
    icon: FileText,
  },
];

export function SolutionsSection({
  badge = "Soluções",
  title = "Escale a sua rede com Inteligência Artificial",
  description = "Centralize a gestão, reduza custos operacionais e escale o seu negócio com automação de ponta a ponta.",
  solutions = defaultSolutions,
}: SolutionsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const safeSolutions = solutions.length ? solutions : defaultSolutions;
  const titleBreakPhrase = "Redes de Franquia";
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

  return (
    <section
      id="solucoes"
      aria-labelledby="solutions-title"
      className="bg-ink px-5 pb-20 pt-12 text-white sm:px-8 sm:py-[60px] lg:px-12 xl:pb-32 xl:pt-24"
    >
      <div className="mx-auto w-full max-w-[1320px]">
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
            className="flex h-[40px] w-[148px] items-center justify-center rounded-full"
          >
            <AnimatedTitle
              as="div"
              text={badge}
              staggerDelay={0.06}
              once
              className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand"
            />
          </motion.div>

          <AnimatedTitle
            id="solutions-title"
            as="h2"
            segments={titleSegments}
            staggerDelay={0.055}
            delayChildren={0.1}
            once
            className="mt-3 text-balance font-sans text-[20px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[30px]"
          />

          <FadeInText
            text={description}
            className="mt-5 max-w-3xl text-[16px] leading-6 text-[#CCCCCC] sm:text-[18px] sm:leading-8"
          />
        </header>

        <div className="mx-auto mt-12 grid max-w-[1085px] gap-3 sm:mt-20 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {safeSolutions.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <motion.article
                key={solution.title}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 24 }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                        transition: {
                          duration: 0.25,
                          delay: 0,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group flex min-h-[200px] w-full max-w-[335px] flex-col items-center justify-center justify-self-center rounded-2xl border border-white/[0.04] bg-[linear-gradient(145deg,#1d1d1d,#161616)] px-5 py-5 text-center shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition-[background,box-shadow] duration-500 ease-out hover:bg-[linear-gradient(145deg,#252525,#181818)] hover:shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-h-[230px] sm:max-w-[370px] sm:px-7 sm:py-8 lg:max-w-[350px]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-black shadow-[0_10px_30px_rgba(254,176,0,0.18)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 motion-reduce:transform-none sm:h-12 sm:w-12">
                  <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                </span>

                <h3 className="mt-4 max-w-sm text-[16px] font-semibold leading-[1.2] text-white">
                  {solution.title}
                </h3>

                <p className="mt-3 max-w-sm text-[14px] leading-5 text-[#CCCCCC] sm:mt-4 sm:leading-6">
                  {solution.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

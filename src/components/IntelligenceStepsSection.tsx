import { motion, useReducedMotion } from "framer-motion";

export type IntelligenceStep = {
  number?: string;
  title: string;
  description: string;
};

export type IntelligenceStepsSectionProps = {
  steps?: IntelligenceStep[];
};

const defaultSteps: IntelligenceStep[] = [
  {
    number: "01",
    title: "Configure sua rede",
    description: "Adicione franquias, usuários e informações da operação.",
  },
  {
    number: "02",
    title: "Cadastre sua empresa",
    description: "Crie sua conta e informe os dados da sua franqueadora.",
  },
  {
    number: "03",
    title: "Comece a usar",
    description: "Acesse os agentes e centralize a gestão da sua rede.",
  },
];

export function IntelligenceStepsSection({
  steps = defaultSteps,
}: IntelligenceStepsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const safeSteps = steps.length ? steps : defaultSteps;

  return (
    <section
      aria-labelledby="intelligence-steps-title"
      className="overflow-hidden bg-ink px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.header
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
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
            Como funciona
          </p>
          <h2
            id="intelligence-steps-title"
            className="mt-5 text-[26px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[30px]"
          >
            Configuração Inicial
          </h2>
          <p className="mt-6 max-w-3xl text-[16px] leading-7 text-[#BDBDBD] sm:text-[18px] sm:leading-8">
            Cadastre sua empresa em poucos cliques para começarmos a estruturar sua rede.
          </p>
        </motion.header>

        <div className="relative mt-16 sm:mt-20 lg:mt-24">
          <div
            aria-hidden="true"
            className="absolute left-[calc(100%/6)] right-[calc(100%/6)] top-6 hidden h-px bg-white/20 sm:block"
          />
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-6">
            {safeSteps.map((step, index) => (
              <motion.article
                key={`${step.title}-${index}`}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 28, filter: "blur(4px)" }
                }
                whileInView={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <span className="bg-ink px-5 text-[34px] font-semibold leading-[48px] tracking-[-0.04em] text-brand sm:text-[38px] lg:text-[42px]">
                  {step.number ?? String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[18px] font-semibold leading-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-[16px] leading-6 text-[#BDBDBD] sm:px-3">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

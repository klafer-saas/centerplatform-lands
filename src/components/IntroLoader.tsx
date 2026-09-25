import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import whiteYellowLogo from "../assets/logo-branco-amarelo.png";

const BRAND_NAME = "CenterPlatform.ai";

export type IntroLoaderProps = {
  onReveal: () => void;
};

export function IntroLoader({ onReveal }: IntroLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const revealDelay = prefersReducedMotion ? 450 : 2800;
    const revealTimer = window.setTimeout(() => {
      onReveal();
      setVisible(false);
    }, revealDelay);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(revealTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onReveal, prefersReducedMotion]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Carregando CenterPlatform.ai"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.035, filter: "blur(14px)" }
          }
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#080808] px-6 text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage:
                "radial-gradient(ellipse at center, black 0%, transparent 68%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 0%, transparent 68%)",
            }}
          />

          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.82, 1.08, 0.82] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute h-[22rem] w-[22rem] rounded-full bg-white blur-[120px] sm:h-[30rem] sm:w-[30rem]"
          />

          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 28, scale: 0.92, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.75,
              delay: prefersReducedMotion ? 0 : 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex w-full max-w-lg flex-col items-center"
          >
            <div
              aria-hidden="true"
              className="flex w-full flex-col items-center justify-center gap-1 sm:w-auto sm:flex-row sm:gap-4"
            >
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.72 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative h-20 w-20 shrink-0 overflow-visible sm:h-20 sm:w-32"
              >
                <img
                  src={whiteYellowLogo}
                  alt=""
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[150px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[235px] sm:w-[235px]"
                />
              </motion.div>

              <span className="min-w-0 whitespace-nowrap text-center font-source-code-pro text-[24px] font-semibold tracking-[-0.04em] text-white sm:min-w-[385px] sm:text-left sm:text-[42px]">
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          backgroundPosition: ["180% 50%", "-80% 50%"],
                        }
                  }
                  transition={{
                    duration: 6,
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 2.2,
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                  style={{
                    backgroundImage:
                      "linear-gradient(105deg, #d8d8d8 0%, #ffffff 42%, #ffb000 50%, #ffffff 58%, #d8d8d8 100%)",
                    backgroundSize: "250% 100%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {BRAND_NAME}
                </motion.span>
                <motion.span
                  animate={prefersReducedMotion ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                  className="ml-1 inline-block h-[1.05em] w-[2px] translate-y-[0.14em] bg-brand"
                />
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

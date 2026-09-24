import { motion, useReducedMotion } from "framer-motion";
import assistantMockups from "../assets/group-28-1-mockup.svg";

export function MockupShowcase() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Prévia responsiva do assistente CenterPlatform.ai"
      className="relative w-full overflow-hidden bg-ink sm:bg-transparent"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[80%] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,138,0,0.07),transparent_68%)] blur-3xl"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1466px] px-3 sm:px-5 lg:px-6"
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 55, scale: 0.82, rotateX: 20 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        viewport={{ once: false, amount: 0.22 }}
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformPerspective: 1200,
          transformOrigin: "center top",
          willChange: shouldReduceMotion ? "auto" : "transform, opacity",
        }}
      >
        <div
          id="mockup-preview"
          className="relative mx-auto w-full max-w-[1360px] overflow-hidden"
        >
          <img
            src={assistantMockups}
            alt="Assistente CenterPlatform.ai exibido em notebook, tablet e celular"
            width={1440}
            height={829}
            className="h-auto w-full object-contain drop-shadow-[0_34px_80px_rgba(0,0,0,0.58)]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-20"
        style={{
          top: "50%",
          right: 0,
          bottom: 0,
          left: 0,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0.5) 42%, var(--page-bg, #0A0A0A) 90%)",
        }}
      />
    </section>
  );
}

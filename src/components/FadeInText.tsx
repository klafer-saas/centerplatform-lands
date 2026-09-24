import { motion, useReducedMotion } from "framer-motion";

type FadeInTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function FadeInText({
  text,
  className = "",
  delay = 0.28,
}: FadeInTextProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.p
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.55,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {text}
    </motion.p>
  );
}

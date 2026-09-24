import { motion, useReducedMotion, type Variants } from "framer-motion";

export type AnimatedTitleSegment = {
  text: string;
  className?: string;
  breakBefore?: boolean;
};

export type AnimatedTitleTag = "h1" | "h2" | "h3" | "p" | "div";

export type AnimatedTitleProps = {
  id?: string;
  text?: string;
  segments?: AnimatedTitleSegment[];
  as?: AnimatedTitleTag;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  className?: string;
};

type AnimatedWord = {
  text: string;
  className?: string;
  breakBefore?: boolean;
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
};

export function AnimatedTitle({
  id,
  text,
  segments,
  as = "h1",
  staggerDelay = 0.06,
  delayChildren = 0.08,
  once = true,
  className = "",
}: AnimatedTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const sourceSegments = segments?.length ? segments : [{ text: text ?? "" }];

  const words: AnimatedWord[] = sourceSegments.flatMap((segment) =>
    segment.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word, index) => ({
        text: word,
        className: segment.className,
        breakBefore: segment.breakBefore && index === 0,
      })),
  );

  const fullText = words.map((word) => word.text).join(" ");
  const MotionTag = motionTags[as];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren: staggerDelay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <MotionTag
      id={id}
      aria-label={fullText}
      className={className}
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once, amount: 0.35 }}
    >
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word.text}-${index}`}>
            {word.breakBefore && <br />}
            <motion.span
              className={`inline-block ${word.className ?? ""}`}
              variants={prefersReducedMotion ? undefined : wordVariants}
            >
              {word.text}
            </motion.span>
            {index < words.length - 1 && !words[index + 1].breakBefore
              ? " "
              : null}
          </span>
        ))}
      </span>
    </MotionTag>
  );
}

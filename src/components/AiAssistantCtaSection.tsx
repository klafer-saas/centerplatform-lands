import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AudioLines } from "lucide-react";
import centerPlatformLogo from "../assets/centerplatform-logo.svg";
import { InteractiveParticleBackground } from "./InteractiveParticleBackground";

const suggestions = [
  "Quero abrir uma franquia da XT Ótica",
  "Requisitos para ser um franqueado",
];

export function AiAssistantCtaSection() {
  const [question, setQuestion] = useState("");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="ai-assistant-title"
      className="relative isolate overflow-hidden bg-ink px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <InteractiveParticleBackground />
      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, y: 30, filter: "blur(5px)" }
        }
        whileInView={
          prefersReducedMotion
            ? undefined
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
      >
        <span
          aria-hidden="true"
          className="block h-[54px] w-[116px] overflow-hidden sm:h-[66px] sm:w-[142px]"
        >
          <img
            src={centerPlatformLogo}
            alt=""
            className="h-full w-auto max-w-none"
          />
        </span>

        <h2
          id="ai-assistant-title"
          className="mt-8 max-w-3xl text-[28px] font-normal leading-[1.15] tracking-[-0.03em] sm:text-[36px] lg:text-[40px]"
        >
          A Plataforma de IA para você{" "}
          <span className="text-brand">ser seu próprio chef.</span>
        </h2>

        <form
          className="mt-9 w-full max-w-4xl"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="ai-question" className="sr-only">
            Faça uma pergunta para a plataforma de IA
          </label>
          <div className="flex min-h-[86px] items-center gap-4 rounded-[24px] bg-[#242424] px-5 py-4 sm:min-h-[102px] sm:px-8">
            <input
              id="ai-question"
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Quero investir em uma franquia. Por onde começo?"
              className="min-w-0 flex-1 bg-transparent font-mono text-[12px] tracking-[0.03em] text-white outline-none placeholder:text-[#777777] sm:text-[14px]"
            />
            <button
              type="submit"
              aria-label="Enviar pergunta por voz"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-black transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <AudioLines aria-hidden="true" size={21} strokeWidth={2.2} />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuestion(suggestion)}
                className="rounded-full bg-brand px-5 py-3 text-[13px] font-medium leading-none text-black transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-6 sm:text-[15px]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </motion.div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import capterraLogo from "../assets/capterra-logo.png";
import { AnimatedTitle } from "./AnimatedTitle";
import { FadeInText } from "./FadeInText";

export type Testimonial = {
  title: string;
  quote: string;
  author: string;
  rating?: number;
  source?: string;
};

export type TestimonialsSectionProps = {
  badge?: string;
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
};

const defaultTestimonials: Testimonial[] = [
  {
    title: "Mudou nosso fluxo de trabalho",
    quote:
      "Excelente ferramenta! Conseguimos centralizar vários processos que antes ficavam espalhados em planilhas diferentes. O ganho de tempo para a equipe foi nítido logo na primeira semana.",
    author: "Amanda",
    rating: 4.5,
    source: "Capterra",
  },
  {
    title: "Excelente para escalar a rede",
    quote:
      "Padronizou a operação de todas as nossas unidades em tempo real. Essencial para ter controle da rede sem burocracia.",
    author: "Francisco",
    rating: 4.5,
    source: "Capterra",
  },
  {
    title: "Fim do ruído com os franqueados",
    quote:
      "Organizou toda a comunicação entre a franqueadora e a rede em um só lugar. Ganho gigante de produtividade.",
    author: "José",
    rating: 4.5,
    source: "Capterra",
  },
  {
    title: "Acelerou nossas aberturas",
    quote:
      "A trilha de conhecimento integrada facilitou o treinamento de novos franqueados. Reduzimos o tempo de implantação pela metade.",
    author: "Marina",
    rating: 4.5,
    source: "Capterra",
  },
  {
    title: "Comunicação mais organizada",
    quote:
      "Hoje cada solicitação chega à pessoa certa e conseguimos acompanhar tudo sem perder informações importantes pelo caminho.",
    author: "João",
    rating: 4.5,
    source: "Capterra",
  },
  {
    title: "Muito prático no dia a dia",
    quote:
      "Centralizou tudo o que precisamos e as automatizações economizam horas de trabalho da equipe todas as semanas.",
    author: "Andressa",
    rating: 4.5,
    source: "Capterra",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      tabIndex={0}
      className="flex min-h-[210px] w-[350px] shrink-0 flex-col rounded-2xl border border-white/[0.05] bg-[linear-gradient(145deg,#202020,#191919)] px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:min-h-56 sm:w-[430px] sm:px-7 sm:py-6"
    >
      <h3 className="text-[16px] font-semibold leading-5 text-white sm:text-[18px] sm:leading-6">
        {testimonial.title}
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-[22px] text-zinc-400 sm:mt-3 sm:text-[16px] sm:leading-7">
        “{testimonial.quote}”
      </p>

      <div className="mt-3 flex items-center justify-between gap-4 text-sm sm:mt-5">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="text-[14px] font-medium sm:text-[16px]">{testimonial.author}</span>
          <span>{testimonial.rating?.toFixed(1) ?? "4.5"}</span>
          <Star
            aria-hidden="true"
            className="h-3 w-3 fill-brand text-brand"
          />
        </div>

        {testimonial.source && (
          testimonial.source.toLocaleLowerCase() === "capterra" ? (
            <img
              src={capterraLogo}
              alt="Capterra"
              className="h-5 w-auto object-contain sm:h-6"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="font-semibold text-zinc-300">
              {testimonial.source}
            </span>
          )
        )}
      </div>
    </article>
  );
}

function MarqueeRow({
  testimonials,
  direction,
}: {
  testimonials: Testimonial[];
  direction: "left" | "right";
}) {
  const group = (
    <div className="flex shrink-0 gap-3 pr-3">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={`${testimonial.author}-${testimonial.title}-${index}`}
          testimonial={testimonial}
        />
      ))}
    </div>
  );

  return (
    <div
      className="testimonial-marquee overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 14%, black 25%, black 75%, rgba(0,0,0,0.18) 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 14%, black 25%, black 75%, rgba(0,0,0,0.18) 86%, transparent 100%)",
      }}
    >
      <div
        className={`flex w-max ${
          direction === "right"
            ? "animate-marquee-right"
            : "animate-marquee-left"
        }`}
      >
        {group}
        <div aria-hidden="true" className="flex shrink-0 gap-3 pr-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`duplicate-${testimonial.author}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({
  badge = "Depoimentos independentes",
  title = "O que os usuários dizem sobre nós",
  subtitle = "Avaliado com 4.5/5 pelos nossos usuários",
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const marqueesRef = useRef<HTMLDivElement>(null);

  const setMarqueePlaybackRate = (rate: number) => {
    const tracks = marqueesRef.current?.querySelectorAll<HTMLElement>(
      ".animate-marquee-left, .animate-marquee-right",
    );

    tracks?.forEach((track) => {
      track.getAnimations().forEach((animation) => {
        animation.updatePlaybackRate(rate);
      });
    });
  };
  const safeTestimonials = testimonials.length
    ? testimonials
    : defaultTestimonials;
  const midpoint = Math.ceil(safeTestimonials.length / 2);
  const rotatedTestimonials = [
    ...safeTestimonials.slice(midpoint),
    ...safeTestimonials.slice(0, midpoint),
  ];
  const fillMarqueeRow = (items: Testimonial[]) =>
    Array.from(
      { length: Math.max(12, items.length) },
      (_, index) => items[index % items.length],
    );
  const firstRow = fillMarqueeRow(safeTestimonials);
  const secondRow = fillMarqueeRow(rotatedTestimonials);

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="scroll-mt-24 overflow-hidden bg-ink pb-20 pt-12 text-white sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24"
    >
      <header className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
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
          className="flex h-[40px] w-full max-w-[350px] items-center justify-center rounded-full"
        >
          <AnimatedTitle
            as="div"
            text={badge}
            staggerDelay={0.04}
            once
            className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand"
          />
        </motion.div>

        <AnimatedTitle
          id="testimonials-title"
          as="h2"
          text={title}
          staggerDelay={0.055}
          delayChildren={0.1}
          once
          className="mt-3 text-balance font-sans text-[20px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[28px] lg:text-[35px]"
        />

        <FadeInText
          text={subtitle}
          className="mt-5 text-[16px] leading-6 text-[#DDD] sm:text-[20px] sm:leading-8"
        />
      </header>

      <div
        ref={marqueesRef}
        className="testimonial-marquees mt-16 space-y-3 sm:mt-20"
        onPointerEnter={() => setMarqueePlaybackRate(0.3)}
        onPointerLeave={() => setMarqueePlaybackRate(1)}
      >
        <MarqueeRow testimonials={firstRow} direction="right" />
        <MarqueeRow testimonials={secondRow} direction="left" />
      </div>
    </section>
  );
}

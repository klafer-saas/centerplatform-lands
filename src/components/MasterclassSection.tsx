import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedTitle } from "./AnimatedTitle";

export type MasterclassPhoto = {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  instructorName?: string;
  formerRole?: string;
  roleBreakAfter?: string;
  description?: string;
};

export type MasterclassSectionProps = {
  badge?: string;
  heading?: string;
  instructorName?: string;
  formerRole?: string;
  description?: string;
  photos?: MasterclassPhoto[];
  className?: string;
};

const defaultDescription =
  "Aulas exclusivas sobre liderança, gestão, expansão, cultura organizacional e as estratégias utilizadas em grandes operações para acelerar resultados e desenvolver negócios de alta performance.";

const stackedCardPositions = [
  { x: "-50%", y: 28, scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 30 },
  { x: "-10%", y: 28, scale: 0.9, opacity: 0.58, filter: "blur(3px)", zIndex: 10 },
  { x: "-90%", y: 28, scale: 0.9, opacity: 0.58, filter: "blur(3px)", zIndex: 10 },
];

export function MasterclassSection({
  badge = "Masterclass",
  heading = "Masterclasses exclusivas com grandes nomes do mercado",
  instructorName = "Paulo Camargo",
  formerRole = "ex CEO do Méqui",
  description = defaultDescription,
  photos = [],
  className = "",
}: MasterclassSectionProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const hasPhotos = photos.length > 0;
  const displayPhotos = hasPhotos
    ? Array.from(
        { length: Math.max(3, photos.length) },
        (_, index) => photos[index % photos.length],
      )
    : [];
  const slideCount = Math.max(displayPhotos.length, 1);

  useEffect(() => {
    if (activePhoto >= slideCount) setActivePhoto(0);
  }, [activePhoto, slideCount]);

  useEffect(() => {
    if (carouselPaused || prefersReducedMotion || displayPhotos.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % displayPhotos.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [carouselPaused, displayPhotos.length, prefersReducedMotion]);

  const showPreviousPhoto = () => {
    setActivePhoto((current) => (current - 1 + slideCount) % slideCount);
  };

  const showNextPhoto = () => {
    setActivePhoto((current) => (current + 1) % slideCount);
  };

  const currentSlide = displayPhotos[activePhoto];
  const activeInstructorName = currentSlide?.instructorName ?? instructorName;
  const activeFormerRole = currentSlide?.formerRole ?? formerRole;
  const activeDescription = currentSlide?.description ?? description;
  const explicitRoleBreak = currentSlide?.roleBreakAfter;
  const explicitRoleBreakIndex = explicitRoleBreak
    ? activeFormerRole.indexOf(explicitRoleBreak) + explicitRoleBreak.length
    : -1;
  const roleLineBreak =
    explicitRoleBreakIndex > 0
      ? explicitRoleBreakIndex
      : activeFormerRole.lastIndexOf(" do ");
  const roleFirstLine =
    roleLineBreak > 0
      ? activeFormerRole.slice(0, roleLineBreak).trim()
      : activeFormerRole;
  const roleSecondLine =
    roleLineBreak > 0
      ? activeFormerRole
          .slice(roleLineBreak + (explicitRoleBreakIndex > 0 ? 0 : 1))
          .trim()
      : "";
  const instructorTitleSegments = [
    { text: "Aprenda com" },
    {
      text: `${activeInstructorName},`,
      className: "font-sans text-brand",
    },
    { text: roleFirstLine },
    ...(roleSecondLine
      ? [{ text: roleSecondLine, breakBefore: true }]
      : []),
  ];
  const initials = activeInstructorName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const headingSegments = [{ text: heading }];

  return (
    <section
      id="masterclass"
      aria-labelledby="masterclass-heading"
      className={`relative isolate overflow-hidden bg-ink px-5 pb-10 pt-12 text-white sm:px-8 sm:py-12 lg:px-12 xl:py-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="mx-auto flex max-w-6xl flex-col items-center text-center">
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
              className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.24em] text-brand"
            />
          </motion.div>

          <AnimatedTitle
            as="h2"
            id="masterclass-heading"
            segments={headingSegments}
            staggerDelay={0.06}
            delayChildren={0.14}
            once
            className="mt-3 whitespace-nowrap text-[clamp(10px,3.15vw,30px)] font-semibold leading-tight tracking-[-0.035em]"
          />

          <AnimatedTitle
            as="p"
            text="Aprenda diretamente com os maiores especialistas do setor e descubra as estratégias reais que impulsionam o sucesso dos líderes de mercado."
            staggerDelay={0.025}
            delayChildren={0.2}
            once
            className="mt-5 max-w-3xl text-[18px] font-light leading-6 text-[#CCCCCC]"
          />
        </header>

        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 48, filter: "blur(6px)" }
          }
          whileInView={
            prefersReducedMotion
              ? undefined
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.18 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 grid items-center gap-10 sm:mt-14 sm:gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20"
        >
          <div
            className="relative mx-auto h-[300px] w-full max-w-[490px] sm:h-[340px] xl:h-[410px]"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocus={() => setCarouselPaused(true)}
            onBlur={() => setCarouselPaused(false)}
          >
            <div className="absolute inset-x-0 top-0 h-[260px] sm:h-[300px] xl:h-[360px]">
              {displayPhotos.map((photo, index) => {
                const relativePosition =
                  (index - activePhoto + displayPhotos.length) %
                  displayPhotos.length;
                const position =
                  relativePosition === 0
                    ? stackedCardPositions[0]
                    : relativePosition === 1
                      ? stackedCardPositions[1]
                      : relativePosition === displayPhotos.length - 1
                        ? stackedCardPositions[2]
                        : {
                            x: "-50%",
                            y: 40,
                            scale: 0.82,
                            opacity: 0,
                            filter: "blur(5px)",
                            zIndex: 0,
                          };
                const isActive = index === activePhoto;

                return (
                  <motion.button
                    key={`${photo.src}-${index}`}
                    type="button"
                    aria-label={`Exibir ${photo.alt}`}
                    aria-hidden={!isActive}
                    tabIndex={isActive ? 0 : -1}
                    className="absolute left-1/2 top-0 h-[230px] w-[54vw] max-w-[200px] cursor-pointer appearance-none overflow-hidden rounded-[23px] border-0 bg-transparent p-0 shadow-none outline-none sm:h-[275px] sm:w-[55vw] sm:max-w-[215px] sm:rounded-[24px] xl:h-[330px] xl:w-[68vw] xl:max-w-[255px] xl:rounded-[26px]"
                    animate={position}
                    initial={false}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.75,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setActivePhoto(index)}
                  >
                    <img
                      src={photo.src}
                      alt={isActive ? photo.alt : ""}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      style={{
                        objectFit: photo.objectFit ?? "cover",
                        objectPosition: photo.objectPosition ?? "center",
                      }}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </motion.button>
                );
              })}

              {!hasPhotos && (
                <div className="absolute left-1/2 top-0 flex h-[230px] w-[54vw] max-w-[200px] -translate-x-1/2 flex-col items-center justify-center rounded-[23px] bg-[#151515] px-5 text-center sm:h-[275px] sm:w-[55vw] sm:max-w-[215px] sm:rounded-[24px] sm:px-8 xl:h-[330px] xl:w-[68vw] xl:max-w-[255px] xl:rounded-[26px]">
                  <span className="flex h-24 w-24 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-3xl font-semibold text-brand">
                    {initials}
                  </span>
                  <p className="mt-6 text-sm text-zinc-400">
                    Adicione as fotos do instrutor pela propriedade photos.
                  </p>
                </div>
              )}
            </div>

            <div
              className="absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3"
              aria-label="Navegar pelas fotos da masterclass"
            >
              <button
                type="button"
                aria-label="Exibir apresentador anterior"
                onClick={showPreviousPhoto}
                disabled={slideCount < 2}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#2A2A2A] text-white/80 transition-colors hover:bg-[#383838] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
              </button>
              <button
                type="button"
                aria-label="Exibir próximo apresentador"
                onClick={showNextPhoto}
                disabled={slideCount < 2}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#2A2A2A] text-white/80 transition-colors hover:bg-[#383838] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
              </button>
            </div>
          </div>

          <div
            className="mx-auto min-h-52 max-w-2xl text-center lg:mx-0 lg:text-left"
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={hasPhotos ? activePhoto : "masterclass-default"}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AnimatedTitle
                  as="h3"
                  segments={instructorTitleSegments}
                  staggerDelay={0.05}
                  delayChildren={0.08}
                  once
                  className="text-balance text-[18px] font-semibold leading-tight tracking-[-0.035em] sm:text-[25px]"
                />
                <p className="mt-4 text-[16px] leading-7 text-[#CCCCCC] sm:mt-6 sm:leading-8">
                  {activeDescription}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

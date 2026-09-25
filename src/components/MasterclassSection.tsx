import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
      className: "font-source-code-pro text-brand",
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

  const headingBreakPhrase = "nomes do mercado";
  const headingBreakIndex = heading
    .toLocaleLowerCase("pt-BR")
    .lastIndexOf(headingBreakPhrase);
  const headingSegments =
    headingBreakIndex > 0
      ? [
          { text: heading.slice(0, headingBreakIndex).trim() },
          {
            text: heading.slice(headingBreakIndex).trim(),
            breakBefore: true,
          },
        ]
      : [{ text: heading }];

  return (
    <section
      id="masterclass"
      aria-labelledby="masterclass-heading"
      className={`relative isolate overflow-hidden bg-ink px-5 pb-12 pt-16 text-white sm:px-8 sm:py-[60px] lg:px-12 xl:pb-32 xl:pt-28 ${className}`}
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
            className="mt-3 text-balance text-[20px] font-semibold leading-tight tracking-[-0.035em] sm:text-[28px] lg:text-[35px]"
          />

          <AnimatedTitle
            as="p"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            staggerDelay={0.025}
            delayChildren={0.2}
            once
            className="mt-5 max-w-3xl text-[16px] leading-6 text-[#CCCCCC] sm:text-[20px] sm:leading-8"
          />
        </header>

        <div className="mt-14 grid items-center gap-10 sm:mt-20 sm:gap-16 lg:mt-28 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-24">
          <div
            className="relative mx-auto h-[320px] w-full max-w-[490px] sm:h-[360px] xl:h-[445px]"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocus={() => setCarouselPaused(true)}
            onBlur={() => setCarouselPaused(false)}
          >
            <div className="absolute inset-x-0 top-0 h-[270px] sm:h-[310px] xl:h-[395px]">
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
                    className="absolute left-1/2 top-0 h-[240px] w-[54vw] max-w-[205px] cursor-pointer appearance-none overflow-hidden rounded-[23px] border-0 bg-transparent p-0 shadow-none outline-none sm:h-[290px] sm:w-[55vw] sm:max-w-[220px] sm:rounded-[24px] xl:h-[365px] xl:w-[68vw] xl:max-w-[280px] xl:rounded-[26px]"
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
                <div className="absolute left-1/2 top-0 flex h-[240px] w-[54vw] max-w-[205px] -translate-x-1/2 flex-col items-center justify-center rounded-[23px] bg-[#151515] px-5 text-center sm:h-[290px] sm:w-[55vw] sm:max-w-[220px] sm:rounded-[24px] sm:px-8 xl:h-[365px] xl:w-[68vw] xl:max-w-[280px] xl:rounded-[26px]">
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
              aria-label="Selecionar foto da masterclass"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: slideCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Exibir foto ${index + 1} de ${slideCount}`}
                    aria-current={index === activePhoto ? "true" : undefined}
                    onClick={() => setActivePhoto(index)}
                    className="group grid h-6 w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        index === activePhoto
                          ? "w-5 bg-brand"
                          : "w-2 bg-white/20 group-hover:bg-white/35"
                      }`}
                    />
                  </button>
                ))}
              </div>
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
                  className="text-balance text-[18px] font-semibold leading-tight tracking-[-0.035em] sm:text-[24px] lg:text-[30px]"
                />
                <p className="mt-4 text-[16px] leading-7 text-[#CCCCCC] sm:mt-6 sm:text-[20px] sm:leading-8">
                  {activeDescription}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import centerPlatformLogo from "../assets/centerplatform-logo.svg";
import { AnimatedTitle } from "./AnimatedTitle";
import { DotGridBackground } from "./DotGridBackground";
import { MockupShowcase } from "./MockupShowcase";

export type HeroStat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  featured?: boolean;
};

export type HeroHeaderProps = {
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  stats?: HeroStat[];
};

const defaultStats: HeroStat[] = [
  { value: 100, suffix: "+", label: "Franqueados ativos" },
  { value: 80, suffix: "%", label: "Redução de suporte" },
  { value: 4.5, decimals: 1, label: "Avaliação da rede", featured: true },
];

const titleSegments = [
  { text: "Todos os" },
  { text: "Agentes", className: "text-brand" },
  { text: "para sua rede de" },
  { text: "Franquia", className: "text-brand" },
  { text: "numa" },
  { text: "Plataforma", className: "text-brand" },
  { text: "só" },
];

const navigationLinks = [
  { href: "#inicio", label: "Início", id: "inicio" },
  { href: "#masterclass", label: "Masterclass", id: "masterclass" },
  { href: "#solucoes", label: "Soluções", id: "solucoes" },
  { href: "#depoimentos", label: "Depoimentos", id: "depoimentos" },
];

function useCountUp(target: number, duration = 1800, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(target);
          return;
        }

        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Number((target * eased).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [decimals, duration, hasAnimated, target]);

  return { ref, value: value.toFixed(decimals) };
}

function StatItem({ stat }: { stat: HeroStat }) {
  const { ref, value } = useCountUp(stat.value, 1800, stat.decimals ?? 0);

  return (
    <div className="relative flex min-w-0 flex-1 flex-col items-center px-2 sm:px-8">
      <div className="flex items-center justify-center gap-1.5">
        {stat.featured && (
          <span
            aria-hidden="true"
            className="h-9 w-9 shrink-0 bg-brand sm:h-11 sm:w-11"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 100% 38%, 69% 59%, 79% 100%, 50% 75%, 21% 100%, 31% 59%, 0% 38%, 39% 35%)",
            }}
          />
        )}
        <p className="text-[32px] font-bold leading-none tracking-tight text-white sm:text-[50px]">
          <span ref={ref}>{value}</span>
          {stat.suffix && <span className="text-brand">{stat.suffix}</span>}
        </p>
      </div>
      <p className="mt-2 text-center text-[0.55rem] font-medium uppercase leading-tight tracking-[0.14em] text-zinc-500 sm:text-[0.64rem]">
        {stat.label}
      </p>
    </div>
  );
}

export function HeroHeader({
  subtitle = "Centralize a gestão comercial, financeira, operacional e o suporte da sua rede, reduzindo custos e automatizando processos em toda a operação.",
  ctaLabel = "Começar",
  ctaHref = "#contato",
  stats = defaultStats,
}: HeroHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingMobileHrefRef = useRef<string | null>(null);
  const headerPortalRoot = document.getElementById("header-root");

  useEffect(() => {
    const updateNavigation = () => {
      setHasScrolled(window.scrollY > 16);

      let currentSection = "inicio";
      navigationLinks.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 150) {
          currentSection = id;
        }
      });
      setActiveSection(currentSection);
    };

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => window.removeEventListener("scroll", updateNavigation);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  const handleMobileNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    pendingMobileHrefRef.current = href;
    setMobileMenuOpen(false);
  };

  const completeMobileNavigation = () => {
    const href = pendingMobileHrefRef.current;
    if (!href) return;

    pendingMobileHrefRef.current = null;
    document.querySelector(href)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", href);
  };

  return (
    <DotGridBackground
      dotColor="#ffffff"
      dotSize={3}
      dotSpacing={30}
      enableRevolve
      orbitSpeed={5}
      impactRadius={100}
      scaleOnHover={1.8}
      glowPosition="top-right"
      glowOpacity={0.25}
      className="min-h-[100svh] text-white sm:min-h-screen"
    >
      <div id="inicio" className="flex min-h-[100svh] flex-col scroll-mt-24 sm:min-h-screen">
        {headerPortalRoot && createPortal(
          <header
          className={`fixed inset-x-0 top-0 z-50 font-sans font-normal transition-[background-color,box-shadow] duration-300 ${
            hasScrolled || mobileMenuOpen
              ? "bg-[#0A0A0A]/80 shadow-[0_12px_40px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
              : "bg-[#0A0A0A]/20 backdrop-blur-2xl"
          }`}
        >
          <nav
            aria-label="Navegação principal"
            className="relative mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 md:justify-start lg:px-12"
          >
            <a
              href="#inicio"
              aria-label="CenterPlatform.ai — página inicial"
              className="inline-flex shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              <img
                src={centerPlatformLogo}
                alt="CenterPlatform.ai"
                className="h-[21px] w-auto sm:h-6"
              />
            </a>

            <div className="hidden items-center gap-7 text-sm md:ml-auto md:flex">
              {navigationLinks.map(({ href, label, id }) => (
                <a
                  key={id}
                  href={href}
                  aria-current={activeSection === id ? "page" : undefined}
                  className="text-white transition-colors hover:text-brand"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                ref={mobileMenuButtonRef}
                type="button"
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
              >
                {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </div>
          </nav>

          <AnimatePresence
            initial={false}
            onExitComplete={completeMobileNavigation}
          >
            {mobileMenuOpen && (
              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.24 }}
                className="overflow-hidden bg-[#0A0A0A] md:hidden"
              >
                <div className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
                  {navigationLinks.map(({ href, label, id }) => (
                    <a
                      key={id}
                      href={href}
                      aria-current={activeSection === id ? "page" : undefined}
                      onClick={(event) => handleMobileNavigation(event, href)}
                      className="border-b border-white/10 px-4 py-3 text-sm text-white transition-colors last:border-b-0 hover:bg-white/[0.04] hover:text-brand"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </header>,
          headerPortalRoot,
        )}

        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-14 pt-[clamp(7rem,20vh,12rem)] text-center sm:px-8 sm:pb-20 md:pt-[clamp(7.5rem,21vh,13rem)]">
        <AnimatedTitle
          as="h1"
          segments={titleSegments}
          staggerDelay={0.06}
          once
          className="w-full max-w-6xl text-balance text-[22px] font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-[32px] md:text-5xl lg:text-6xl"
        />

        <AnimatedTitle
          as="p"
          text={subtitle}
          staggerDelay={0.025}
          delayChildren={0.72}
          once
          className="mt-6 max-w-2xl text-pretty text-sm leading-6 text-[#CCCCCC] sm:text-base sm:leading-7"
        />

        <motion.a
          id="comecar"
          href={ctaHref}
          aria-label={`${ctaLabel} com a CenterPlatform.ai`}
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
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.55,
            delay: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
          className="mt-8 inline-flex h-9 w-[149px] items-center justify-center rounded-full bg-brand px-4 text-[14px] font-semibold text-black shadow-brand-glow transition-colors duration-200 hover:bg-[#FEB000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-ink sm:h-auto sm:w-auto sm:min-w-44 sm:px-10 sm:py-3.5 sm:text-[16px]"
        >
          {ctaLabel}
        </motion.a>

        <div
          aria-label="Resultados da plataforma"
          className="mt-14 grid w-full max-w-3xl grid-cols-3 items-start gap-x-2 sm:mt-20 sm:gap-x-0"
        >
          {stats.map((stat) => (
            <StatItem
              key={`${stat.label}-${stat.value}`}
              stat={stat}
            />
          ))}
        </div>

        </section>
        <MockupShowcase />
        <div aria-hidden="true" className="w-full flex-1 bg-ink" />
      </div>
    </DotGridBackground>
  );
}

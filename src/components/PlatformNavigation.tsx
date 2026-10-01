import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import centerPlatformLogo from "../assets/centerplatform-logo.svg";

const navigationLinks = [
  { href: "#inicio", label: "Início", id: "inicio" },
  { href: "#masterclass", label: "Masterclass", id: "masterclass" },
  { href: "#solucoes", label: "Soluções", id: "solucoes" },
  { href: "#depoimentos", label: "Depoimentos", id: "depoimentos" },
];

export function PlatformNavigation() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingMobileHrefRef = useRef<string | null>(null);

  useEffect(() => {
    const updateNavigation = () => {
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

  const navigateOnMobile = (
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
    <header className="fixed inset-x-0 top-0 z-50 bg-[#111111]/15 font-sans font-normal backdrop-blur-[25px]">
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

        <div className="hidden items-center gap-7 text-[14px] md:ml-auto md:flex">
          {navigationLinks.map(({ href, label, id }) => (
            <a
              key={id}
              href={href}
              aria-current={activeSection === id ? "page" : undefined}
              className="text-white transition-colors hover:text-brand focus-visible:outline-none focus-visible:text-brand"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
        >
          {mobileMenuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>
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
            className="overflow-hidden bg-[#111111]/80 backdrop-blur-[25px] md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
              {navigationLinks.map(({ href, label, id }) => (
                <a
                  key={id}
                  href={href}
                  aria-current={activeSection === id ? "page" : undefined}
                  onClick={(event) => navigateOnMobile(event, href)}
                  className="border-b border-white/10 px-4 py-3 text-sm text-white transition-colors last:border-b-0 hover:bg-white/[0.04] hover:text-brand"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import type { SVGProps } from "react";
import centerPlatformLogo from "../assets/centerplatform-logo.svg";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" strokeWidth="2" />
      <circle cx="17.5" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M21 8.25a3 3 0 0 0-2.1-2.12C17.05 5.62 12 5.62 12 5.62s-5.05 0-6.9.5A3 3 0 0 0 3 8.26 31 31 0 0 0 2.5 12 31 31 0 0 0 3 15.75a3 3 0 0 0 2.1 2.12c1.85.5 6.9.5 6.9.5s5.05 0 6.9-.5a3 3 0 0 0 2.1-2.12A31 31 0 0 0 21.5 12a31 31 0 0 0-.5-3.75Z"
        fill="currentColor"
      />
      <path d="m10 15 5-3-5-3v6Z" fill="#111" />
    </svg>
  );
}

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Masterclass", href: "#masterclass" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const socialLinks = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "YouTube", icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer id="contato" className="bg-[#111] px-5 text-[#CCCCCC] sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl pb-7 pt-14 sm:pt-[60px] xl:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.45fr_0.6fr_0.65fr_1fr] lg:gap-16">
          <div>
            <a
              href="#inicio"
              aria-label="CenterPlatform.ai — página inicial"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <img
                src={centerPlatformLogo}
                alt="CenterPlatform.ai"
                className="h-7 w-auto"
              />
            </a>

            <p className="mt-5 max-w-md text-sm leading-6">
              Centralize a gestão da sua rede de franquias com agentes de
              inteligência artificial para operações, suporte, finanças e
              expansão.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Redes Sociais</h2>
            <div className="mt-5 flex items-center gap-4">
              {socialLinks.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  aria-label={`${label} — em breve`}
                  title={`${label} — em breve`}
                  className="cursor-default transition-colors duration-200 hover:text-brand"
                >
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="Links do rodapé">
            <h2 className="text-sm font-semibold text-white">Links Rápidos</h2>
            <ul className="mt-5 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Endereço e Contato
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-6">
              <a
                href="tel:+5511941593347"
                className="block transition-colors hover:text-white focus-visible:outline-none focus-visible:text-brand"
              >
                +55 (11) 94159-3347
              </a>
              <address className="not-italic">
                Av. José Caballero, 245 — Centro, Santo André — SP, 09040-903
              </address>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.08] pt-6 sm:mt-14">
          <p className="text-xs">
            © CenterPlatform.ai. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

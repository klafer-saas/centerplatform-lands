import { lazy, Suspense, useCallback, useState } from "react";
import { HeroHeader } from "./components/HeroHeader";
import type { MasterclassPhoto } from "./components/MasterclassSection";
import { Footer } from "./components/Footer";
import { IntroLoader } from "./components/IntroLoader";
import pauloCamargoPhoto from "./assets/paulo-camargo-group24.png";
import samyDanaPhoto from "./assets/samy-dana.png";
import caioVieiraPhoto from "./assets/caio-vieira.png";

const MasterclassSection = lazy(() =>
  import("./components/MasterclassSection").then((module) => ({
    default: module.MasterclassSection,
  })),
);
const IntelligenceStepsSection = lazy(() =>
  import("./components/IntelligenceStepsSection").then((module) => ({
    default: module.IntelligenceStepsSection,
  })),
);
const AiAssistantCtaSection = lazy(() =>
  import("./components/AiAssistantCtaSection").then((module) => ({
    default: module.AiAssistantCtaSection,
  })),
);
const SolutionsSection = lazy(() =>
  import("./components/SolutionsSection").then((module) => ({
    default: module.SolutionsSection,
  })),
);
const TestimonialsSection = lazy(() =>
  import("./components/TestimonialsSection").then((module) => ({
    default: module.TestimonialsSection,
  })),
);
function SectionFallback({ minHeight = "60vh" }: { minHeight?: string }) {
  return <div aria-hidden="true" className="bg-ink" style={{ minHeight }} />;
}

const masterclassPhotos: MasterclassPhoto[] = [
  {
    src: pauloCamargoPhoto,
    alt: "Paulo Camargo",
    objectFit: "cover",
    objectPosition: "center 75%",
    instructorName: "Paulo Camargo",
    formerRole: "ex CEO do Méqui",
  },
  {
    src: samyDanaPhoto,
    alt: "Samy Dana",
    objectFit: "cover",
    objectPosition: "center",
    instructorName: "Samy Dana",
    formerRole: "economista e professor",
    roleBreakAfter: "economista",
    description:
      "Samy Dana — economista, professor da FGV e comentarista do Grupo Jovem Pan — trazendo sua visão estratégica e experiência de mercado para enriquecer o conteúdo da plataforma.",
  },
  {
    src: caioVieiraPhoto,
    alt: "Caio Vieira",
    objectFit: "cover",
    objectPosition: "center",
    instructorName: "Caio Vieira",
    formerRole: "especialista em neurovendas",
    roleBreakAfter: "especialista",
    description:
      "Caio Vieira apresenta Neurovendas — A Ciência da Decisão, explorando como comportamento, emoções e gatilhos cognitivos influenciam escolhas para tornar estratégias comerciais mais assertivas e eficazes.",
  },
];

export default function App() {
  const [siteReady, setSiteReady] = useState(false);
  const revealSite = useCallback(() => setSiteReady(true), []);

  return (
    <>
      <IntroLoader onReveal={revealSite} />
      {siteReady && <main>
      <HeroHeader />
      {/* Cada item de photos pode receber sua própria foto, nome, cargo e descrição. */}
      <Suspense fallback={<SectionFallback minHeight="850px" />}>
        <MasterclassSection photos={masterclassPhotos} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="800px" />}>
        <SolutionsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="100vh" />}>
        <IntelligenceStepsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="620px" />}>
        <AiAssistantCtaSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="780px" />}>
        <TestimonialsSection />
      </Suspense>
      <Footer />
      </main>}
    </>
  );
}

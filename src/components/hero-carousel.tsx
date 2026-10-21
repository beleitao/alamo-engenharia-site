import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";
import predial from "@/assets/predial.jpg";
import hvac from "@/assets/hvac.jpg";
import eletrica from "@/assets/eletrica.jpg";
import aniversario from "@/assets/aniversario-alamo-arquitetura.webp";

const SLIDES = [
  {
    eyebrow: "Aniversário Álamo · Uma nova etapa",
    title: "Álamo Engenharia — 56 anos",
    text: "Há 56 anos, cuidamos do que não pode parar. Agora, compartilhamos essa experiência em nosso novo blog de engenharia: conhecimento técnico sobre manutenção, segurança e conformidade para apoiar as decisões da sua empresa.",
    cta: "Conheça nosso novo blog de engenharia",
    to: "/blog",
    slug: "aniversario-56-anos",
    img: aniversario,
    alt: "Arte comemorativa: prédio inspirado no símbolo da Álamo, com fachada triangular de nervuras laranja e prata",
    wa: "Olá! Conheci o novo site da Álamo Engenharia e gostaria de falar com um especialista.",
  },
  {
    eyebrow: "Manutenção predial preventiva",
    title: "Planos preventivos que evitam a parada antes dela acontecer",
    text: "Inventário de ativos, criticidade, checklists normatizados e relatórios mensais de disponibilidade para edifícios corporativos, indústrias e operações multi-site.",
    cta: "Ver manutenção predial",
    to: "/servicos/$slug",
    slug: "manutencao-predial",
    img: predial,
    alt: "Equipe técnica executando manutenção preventiva predial",
    wa: "Olá! Gostaria de falar com um especialista sobre manutenção predial preventiva da Álamo Engenharia.",
  },
  {
    eyebrow: "Manutenção HVAC",
    title: "Climatização crítica operando no ponto ótimo o ano inteiro",
    text: "Chillers, VRF, self contained e exaustão com PMOC, comissionamento contínuo e eficiência energética comprovada em consumo.",
    cta: "Ver soluções HVAC",
    to: "/servicos/$slug",
    slug: "hvac-ar-condicionado",
    img: hvac,
    alt: "Técnico realizando manutenção em central de ar condicionado",
    wa: "Olá! Gostaria de falar com um especialista sobre manutenção de HVAC e ar condicionado (PMOC).",
  },
  {
    eyebrow: "Manutenção elétrica",
    title: "Infraestrutura elétrica sob controle, com laudo e conformidade",
    text: "Subestações, QGBTs, termografia e adequação à NR-10 e NBR 5410, com prontuário e ART assinados por responsável técnico.",
    cta: "Ver infraestrutura elétrica",
    to: "/servicos/$slug",
    slug: "infraestrutura-eletrica",
    img: eletrica,
    alt: "Inspeção termográfica em quadro elétrico industrial",
    wa: "Olá! Gostaria de falar com um especialista sobre manutenção elétrica e conformidade NR-10.",
  },
] as const;

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => setI((v) => (v + d + SLIDES.length) % SLIDES.length);

  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, active: true };
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.active = false;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      className="surface-deep relative grid touch-pan-y select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing"
      aria-roledescription="carrossel"
      aria-label="Destaques da Álamo Engenharia"
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={() => (drag.current.active = false)}
    >
      {SLIDES.map((active, idx) => {
        const anniversary = active.to === "/blog";
        return (
        <div
          key={active.slug}
          className={`hero-panel relative min-w-0 ${idx === i ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
          aria-hidden={idx !== i}
          inert={idx !== i}
        >
        <img
          src={active.img}
          alt={active.alt}
          draggable={false}
          fetchPriority={idx === 0 ? "high" : "auto"}
          className={`absolute inset-0 h-full w-full object-cover ${anniversary ? "hero-anniversary-image" : "opacity-35"}`}
        />
      <div className={`hero-shade absolute inset-0 ${anniversary ? "hero-shade-anniversary" : ""}`} />
      {!anniversary && <div className="grid-tech absolute inset-0" />}

      <div className="relative mx-auto min-h-[620px] max-w-7xl px-4 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow text-accent">{active.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
          {anniversary ? <>Álamo Engenharia<span className="mt-3 block text-accent">56 anos</span></> : active.title}
        </h1>
        <p className="mt-6 max-w-xl text-base text-deep-foreground/85 sm:text-lg">
          {active.text}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg">
            {anniversary ? <Link to="/blog" className="h-auto min-h-11 whitespace-normal text-left">{active.cta}<ArrowRight className="ml-2 h-4 w-4 shrink-0" /></Link> : <Link to="/servicos/$slug" params={{ slug: active.slug }}>{active.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>}
          </Button>
          {!anniversary && <Button
            asChild
            size="lg"
            className="border-transparent bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
          >
            <a href={waUrl(active.wa)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-2 h-4 w-4" /> Falar com um especialista
            </a>
          </Button>}
        </div>

        <p className="mt-10 border-l-4 border-accent pl-4 font-display text-xl font-bold uppercase tracking-wide text-deep-foreground sm:text-3xl">
          Engenharia <span className="text-gradient-accent">além da execução.</span>
        </p>

        <div className="mt-8 flex items-center gap-3">
          <Button variant="ghost" size="icon"
            type="button"
            aria-label="Banner anterior"
            onClick={() => go(-1)}
            className="grid h-9 w-9 place-items-center rounded-sm border border-deep-foreground/25 text-deep-foreground/80 transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon"
            type="button"
            aria-label="Próximo banner"
            onClick={() => go(1)}
            className="grid h-9 w-9 place-items-center rounded-sm border border-deep-foreground/25 text-deep-foreground/80 transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {SLIDES.map((s, idx) => (
              <Button variant="ghost"
                key={s.slug}
                type="button"
                aria-label={`Ir para ${s.eyebrow}`}
                aria-pressed={idx === i}
                onClick={() => setI(idx)}
                className={`h-6 w-6 p-0 transition-all ${
                  idx === i ? "text-accent" : "text-deep-foreground/30"
                }`}
              ><span className={`block h-1.5 rounded-full ${idx === i ? "w-6 bg-accent" : "w-3 bg-deep-foreground/30"}`} /></Button>
            ))}
          </div>
        </div>
      </div>
        </div>
        );
      })}
    </section>
  );
}

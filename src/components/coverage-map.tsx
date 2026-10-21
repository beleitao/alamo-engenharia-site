import coverageMapAsset from "@/assets/cobertura-contratos-original.png";

const OFFICES_MAP = [
  { tag: "Matriz", city: "Rio de Janeiro — RJ" },
  { tag: "Filial", city: "São Paulo — SP" },
  { tag: "Filial", city: "Espírito Santo — ES" },
  { tag: "Filial", city: "Belo Horizonte — MG" },
];

export function CoverageMap() {


  return (
    <div className="relative overflow-hidden rounded-sm border border-deep-foreground/10 bg-deep">
      <div className="grid-tech pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/60" />
      <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-2 lg:items-center">
        {/* Coluna esquerda */}
        <div className="relative lg:border-r lg:border-dashed lg:border-deep-foreground/15 lg:pr-10">
          <p className="eyebrow text-accent">Presença nacional</p>
          <h3 className="mt-4 font-display text-3xl font-light uppercase tracking-tight text-deep-foreground md:text-4xl">
            Presença
            <span className="block font-bold text-accent">Nacional</span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-deep-foreground/70">
            Mais de 400 contratos ativos em todas as regiões brasileiras, com equipe
            própria, bases operacionais e parceiros locais.
          </p>

          <ul className="mt-8 space-y-3">
            {OFFICES_MAP.map((o) => (
              <li key={o.city} className="flex items-center gap-4">
                <span className="w-20 bg-accent px-2 py-1 text-center text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-foreground">
                  {o.tag}
                </span>
                <span className="text-sm text-deep-foreground/85">{o.city}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-deep-foreground/45">
            Mapa ilustrativo de distribuição dos contratos.
          </p>
        </div>

        {/* Mapa */}
        <div className="relative flex flex-col items-center">
          <img
            src={coverageMapAsset}
            alt="Mapa ilustrativo dos contratos da Álamo Engenharia no Brasil, com silhueta pontilhada e pontos concentrados no Sudeste"
            width={677}
            height={551}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full max-w-xl object-contain"
          />

          <p className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-accent">+400</span>
            <span className="text-sm leading-tight text-deep-foreground/70">
              contratos ativos
              <br />
              em todo o Brasil
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

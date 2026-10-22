import { Flag } from "lucide-react";

export type Milestone = { year: string; items: string[] };

export const HISTORY: Milestone[] = [
  { year: "1973", items: ["Fundação"] },
  { year: "1989", items: ["Expansão SP"] },
  { year: "2009", items: ["Expansão ES"] },
  { year: "2017", items: ["Receita R$ 125 mi"] },
  { year: "2022", items: ["ESG + Instituto Ethos", "Receita R$ 155 mi"] },
  { year: "2023", items: ["Receita R$ 182 mi", "Filial MG"] },
  { year: "2024", items: ["Receita R$ 196,7 mi", "PL R$ 9,1 mi"] },
  {
    year: "2025",
    items: [
      "Receita R$ 196,5 mi",
      "EBITDA R$ 3,2 mi",
      "Capital R$ 8,675 mi",
      "PL R$ 10,8 mi",
      "388 contratos",
    ],
  },
  {
    year: "2026",
    items: ["Nova Governança", "Receita projetada R$ 216,9 mi", "Operação Nacional"],
  },
];

export function Timeline() {
  return (
    <section className="bg-secondary/50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="eyebrow text-primary">Nossa história</p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
          56 anos mantendo operações no ar
        </h2>

        {/* Desktop: linha horizontal */}
        <div className="mt-12 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-border" />
            <ol className="relative grid grid-cols-9 gap-3">
              {HISTORY.map((m) => (
                <li key={m.year} className="flex flex-col items-center text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-primary bg-background text-primary">
                    <Flag className="h-5 w-5" />
                  </span>
                  <span className="mt-3 font-display text-lg font-extrabold text-primary">
                    {m.year}
                  </span>
                  <ul className="mt-2 space-y-1">
                    {m.items.map((i) => (
                      <li key={i} className="text-xs leading-snug text-muted-foreground">
                        {i}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Mobile: linha vertical */}
        <ol className="mt-10 space-y-6 border-l border-border pl-6 lg:hidden">
          {HISTORY.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[31px] grid h-5 w-5 place-items-center rounded-full border-2 border-primary bg-background" />
              <p className="font-display text-base font-extrabold text-primary">{m.year}</p>
              <ul className="mt-1 space-y-0.5">
                {m.items.map((i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

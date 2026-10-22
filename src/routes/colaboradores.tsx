import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays,
  Camera,
  FileText,
  Heart,
  Lock,
  LogOut,
  Receipt,
  Clock3,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/colaboradores")({
  beforeLoad: () => { throw notFound(); },
  head: () => ({
    meta: [
      { title: "Área de Colaboradores | Álamo Engenharia" },
      { name: "description", content: "Acesso restrito aos sistemas internos da Álamo Engenharia: espelho de ponto, contracheque, Álamo Encanta, eventos, vagas internas e procedimentos." },
      { property: "og:title", content: "Área de Colaboradores | Álamo Engenharia" },
      { property: "og:description", content: "Portal interno da Álamo Engenharia para colaboradores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CollaboratorsPage,
});

const PONTO = [
  { dia: "01/06 seg", entrada: "07:58", saida: "17:04", saldo: "+06 min" },
  { dia: "02/06 ter", entrada: "08:02", saida: "17:00", saldo: "-02 min" },
  { dia: "03/06 qua", entrada: "07:55", saida: "18:10", saldo: "+1h 15" },
  { dia: "04/06 qui", entrada: "08:00", saida: "17:02", saldo: "+02 min" },
  { dia: "05/06 sex", entrada: "07:59", saida: "16:58", saldo: "-01 min" },
];

const CONTRACHEQUE = [
  { desc: "Salário base", valor: "R$ 4.850,00" },
  { desc: "Adicional de periculosidade (30%)", valor: "R$ 1.455,00" },
  { desc: "Horas extras 50%", valor: "R$ 312,40" },
  { desc: "INSS", valor: "- R$ 693,05" },
  { desc: "IRRF", valor: "- R$ 289,12" },
  { desc: "Vale transporte", valor: "- R$ 291,00" },
];

const ENCANTA = [
  { nome: "Rafael Souza — Técnico HVAC/RJ", texto: "Reestabeleceu o chiller do hospital em 3h durante a madrugada." },
  { nome: "Equipe Elétrica/SP", texto: "Zero acidentes em 720 dias na operação do galpão logístico." },
  { nome: "Aline Ferreira — Supervisão/MG", texto: "Melhor índice de aderência a SLA do trimestre: 97,4%." },
];

const EVENTOS = [
  { data: "12/07", titulo: "Palestra NR-10 — reciclagem obrigatória", local: "Matriz RJ + online" },
  { data: "19/07", titulo: "Reunião mensal de resultados", local: "Online" },
  { data: "02/08", titulo: "Workshop de eficiência energética em HVAC", local: "Filial SP" },
  { data: "15/08", titulo: "SIPAT 2026", local: "Todas as unidades" },
];

const VAGAS = [
  "Técnico em Refrigeração Pleno — Rio de Janeiro/RJ",
  "Eletricista Industrial — Betim/MG",
  "Supervisor de Manutenção — São Paulo/SP",
  "Analista de Suprimentos Jr — Matriz RJ",
];

const PROCEDIMENTOS = [
  "POP-001 — Como solicitar um veículo da frota",
  "POP-004 — Como enviar um orçamento ao cliente",
  "POP-007 — Como fazer pedido de compras",
  "POP-012 — Abertura de chamado no Service Desk",
  "POP-018 — Registro de ponto e justificativas (MTE)",
  "POP-023 — Reembolso de despesas em campo",
];

function CollaboratorsPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  if (user) return <RestrictedArea user={user} onLogout={() => setUser(null)} />;

  return (
    <article>
      <PageHero
        eyebrow="Acesso restrito"
        title="Área de Colaboradores"
        sub="Portal interno da equipe Álamo. Informe suas credenciais corporativas para acessar."
      />

      <section className="mx-auto max-w-md px-4 py-20 lg:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const u = String(fd.get("usuario") ?? "").trim();
            const p = String(fd.get("senha") ?? "");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              if (u === "admin" && p === "admin") setUser(u);
              else toast.error("Usuário ou senha inválidos.");
            }, 500);
          }}
          className="rounded-lg border border-border bg-card p-6 shadow-card"
        >
          <p className="flex items-center gap-2 font-display text-lg font-semibold">
            <Lock className="h-4 w-4 text-primary" /> Entrar
          </p>
          <div className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="usuario">Usuário corporativo</Label>
              <Input id="usuario" name="usuario" autoComplete="username" placeholder="admin" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" name="senha" type="password" autoComplete="current-password" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verificando..." : "Acessar"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Ambiente de demonstração: use <strong>admin</strong> / <strong>admin</strong>. Problemas
              de acesso? Abra um chamado no Service Desk.
            </p>
          </div>
        </form>
      </section>
    </article>
  );
}

function Card({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-lg border border-border bg-card p-6 shadow-card ${className}`}>
      <h2 className="flex items-center gap-2 font-display text-base font-bold">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function RestrictedArea({ user, onLogout }: { user: string; onLogout: () => void }) {
  return (
    <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="eyebrow text-primary">Área restrita</p>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Bem-vindo, {user}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Conteúdo confidencial — não compartilhe fora da Álamo Engenharia.
          </p>
        </div>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card icon={<Clock3 className="h-4 w-4" />} title="Espelho de ponto — junho/2026">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-2">Dia</th>
                <th className="pb-2">Entrada</th>
                <th className="pb-2">Saída</th>
                <th className="pb-2">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {PONTO.map((d) => (
                <tr key={d.dia} className="border-t border-border/60">
                  <td className="py-2">{d.dia}</td>
                  <td className="py-2">{d.entrada}</td>
                  <td className="py-2">{d.saida}</td>
                  <td className="py-2 text-muted-foreground">{d.saldo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card icon={<Receipt className="h-4 w-4" />} title="Contracheque — junho/2026">
          <ul className="text-sm">
            {CONTRACHEQUE.map((l) => (
              <li key={l.desc} className="flex justify-between border-t border-border/60 py-2 first:border-0">
                <span>{l.desc}</span>
                <span className="font-medium">{l.valor}</span>
              </li>
            ))}
            <li className="flex justify-between border-t-2 border-primary/40 py-2 font-display font-bold">
              <span>Líquido</span>
              <span className="text-primary">R$ 5.344,23</span>
            </li>
          </ul>
        </Card>

        <Card icon={<Heart className="h-4 w-4" />} title="Álamo Encanta — homenagens do mês">
          <ul className="space-y-3 text-sm">
            {ENCANTA.map((e) => (
              <li key={e.nome} className="rounded-sm bg-secondary/60 p-3">
                <p className="font-display font-semibold">{e.nome}</p>
                <p className="mt-1 text-muted-foreground">{e.texto}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon={<CalendarDays className="h-4 w-4" />} title="Calendário de eventos internos">
          <ul className="space-y-3 text-sm">
            {EVENTOS.map((e) => (
              <li key={e.titulo} className="flex gap-3">
                <span className="w-14 shrink-0 bg-accent px-2 py-1 text-center text-xs font-semibold text-accent-foreground">
                  {e.data}
                </span>
                <span>
                  <span className="block font-medium">{e.titulo}</span>
                  <span className="block text-xs text-muted-foreground">{e.local}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon={<Camera className="h-4 w-4" />} title="Fotos de eventos corporativos">
          <div className="grid grid-cols-3 gap-2">
            {["SIPAT 2025", "Confraternização", "Treinamento NR-35", "Dia da Família", "Ação ambiental", "Premiação SLA"].map(
              (f) => (
                <div
                  key={f}
                  className="grid aspect-square place-items-center rounded-sm bg-secondary p-2 text-center text-[0.65rem] text-muted-foreground"
                >
                  {f}
                </div>
              ),
            )}
          </div>
        </Card>

        <Card icon={<Briefcase className="h-4 w-4" />} title="Vagas divulgadas internamente">
          <ul className="space-y-2 text-sm">
            {VAGAS.map((v) => (
              <li key={v} className="border-t border-border/60 py-2 first:border-0">
                {v}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Indicações e candidaturas internas pelo RH: rh@alamoengenharia.com.br
          </p>
        </Card>

        <Card
          icon={<FileText className="h-4 w-4" />}
          title="Índice de procedimentos internos"
          className="lg:col-span-2"
        >
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {PROCEDIMENTOS.map((p) => (
              <li key={p} className="rounded-sm border border-border/60 px-3 py-2">
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Sistemas internos: MTE · Service Desk · Álamo Informa · Álamo Encanta · Webmail
          </p>
        </Card>
      </div>
    </article>
  );
}

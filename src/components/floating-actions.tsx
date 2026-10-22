import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WHATSAPP_URL } from "@/lib/site-data";

type Msg = { role: "bot" | "user"; text: string; cta?: boolean; careers?: boolean };

const OPENING: Msg = {
  role: "bot",
  text: "Olá! Sou o assistente da Álamo Engenharia. Posso responder dúvidas rápidas sobre nossos serviços, prazos e contratos. Escolha um assunto abaixo ou escreva sua pergunta.",
};

/** Roteiro de FAQ automático: palavras-chave → resposta pertinente. */
const SCRIPT: { key: string; words: string[]; answer: string }[] = [
  {
    key: "Serviços que vocês fazem",
    words: ["servi", "fazem", "atende", "expertise", "manuten"],
    answer:
      "Atuamos com manutenção predial preventiva, preditiva e corretiva, HVAC e ar condicionado, infraestrutura elétrica, hidráulica, telecom, automação eletrônica e obras civis — tudo sob um único contrato, com engenheiro responsável.",
  },
  {
    key: "Onde vocês atendem",
    words: ["onde", "regi", "cidade", "estado", "cobertura", "nacional", "filial"],
    answer:
      "Temos matriz no Rio de Janeiro e filiais em São Paulo, Belo Horizonte e Espírito Santo, com mais de 400 contratos ativos em mais de 20 estados e 100 cidades. Operações multi-site têm coordenação central.",
  },
  {
    key: "Como funciona o contrato",
    words: ["contrato", "sla", "mensal", "escopo", "equipe residente", "como funciona"],
    answer:
      "O contrato começa por inventário e criticidade de ativos, define plano preventivo por equipamento, SLA por tipo de chamado e forma de atendimento (equipe residente ou atendimento programado). Você recebe relatório mensal com disponibilidade, aderência ao SLA e custo por m².",
  },
  {
    key: "Atendimento de emergência",
    words: ["emerg", "urgen", "24", "plant", "parou", "quebrou"],
    answer:
      "Sim: contratos com sistemas críticos contam com plantão 24x7. Para uma emergência agora, chame no WhatsApp ou ligue (21) 3235-9900 — o acionamento é imediato.",
  },
  {
    key: "PMOC e normas técnicas",
    words: ["pmoc", "norma", "nr-10", "nr10", "nbr", "laudo", "art", "spda", "termografia"],
    answer:
      "Trabalhamos com PMOC para climatização, NBR 5674 (manutenção predial), NBR 5410 e NR-10 (elétrica), NR-35, NBR 5419 (SPDA) e laudos de termografia — com ART e documentação rastreável para auditoria.",
  },
  {
    key: "Prazo e preço do orçamento",
    words: ["preço", "preco", "valor", "custo", "orçamento", "orcamento", "quanto", "prazo"],
    answer:
      "O preço depende do inventário de ativos, do regime de atendimento e da localização. Um engenheiro analisa sua demanda e retorna com a proposta em até 1 dia útil — sem custo.",
  },
  {
    key: "Trabalhar na Álamo",
    words: ["vaga", "curr", "emprego", "trabalhe", "rh"],
    answer:
      "Consulte as vagas da Álamo Engenharia e cadastre seu currículo no nosso portal de carreiras no Pandapé.",
  },
];

function answerFor(text: string): Msg {
  const q = text.toLowerCase();
  const hit = SCRIPT.find((s) => s.words.some((w) => q.includes(w)));
  if (hit) return { role: "bot", text: hit.answer, careers: hit.key === "Trabalhar na Álamo" };
  return {
    role: "bot",
    text: "Essa pergunta é mais específica e merece a análise de um engenheiro. Faça sua solicitação de orçamento — respondemos em até 1 dia útil — ou fale agora pelo WhatsApp.",
    cta: true,
  };
}

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([OPENING]);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  function ask(text: string) {
    setMessages((m) => [...m, { role: "user", text }, answerFor(text)]);
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    ask(text);
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-40 right-4 z-50 flex h-[30rem] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lift lg:bottom-24">
          <div className="surface-deep flex items-center justify-between px-4 py-3">
            <span className="flex items-center gap-2 font-display text-sm font-semibold">
              <Bot className="h-4 w-4 text-accent" /> Atendimento Álamo
            </span>
            <button type="button" aria-label="Fechar chat" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i}>
                <p
                  className={
                    m.role === "bot"
                      ? "max-w-[88%] rounded-sm bg-secondary px-3 py-2 text-sm leading-relaxed"
                      : "ml-auto max-w-[88%] rounded-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                  }
                >
                  {m.text}
                </p>
                {m.careers && <Button asChild size="sm" className="mt-2"><a href="https://alamoengenharia.pandape.infojobs.com.br/" target="_blank" rel="noopener noreferrer">Ver vagas e cadastrar currículo</a></Button>}
                {m.cta && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <Link to="/orcamento" onClick={() => setOpen(false)}>
                        Faça seu orçamento
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                    >
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SCRIPT.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => ask(s.key)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {s.key}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Digite sua pergunta..."
            />
            <Button type="submit" size="icon" aria-label="Enviar">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3 lg:bottom-6">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir atendimento"
          className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105"
        >
          <Bot className="h-5 w-5" />
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <Button asChild className="flex-1">
          <Link to="/orcamento">Solicitar orçamento</Link>
        </Button>
        <Button
          asChild
          className="flex-1 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </Button>
      </div>
    </>
  );
}

import { ExternalLink } from "lucide-react";
import { referenceUrl } from "@/lib/references";

type Props = {
  items: readonly string[];
  title?: string;
  note?: string;
  className?: string;
};

export function ReferenceList({
  items,
  title = "Normas e referências consultadas",
  note = "Todo o conteúdo desta página é ancorado em normas vigentes. Clique para conferir a fonte oficial.",
  className,
}: Props) {
  if (!items.length) return null;

  return (
    <aside
      className={`rounded-lg border border-border bg-secondary/50 p-6 ${className ?? ""}`}
      aria-labelledby="referencias-tecnicas"
    >
      <h2 id="referencias-tecnicas" className="font-display text-base font-bold">
        {title}
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      <ul className="mt-4 space-y-2">
        {items.map((r) => (
          <li key={r}>
            <a
              href={referenceUrl(r)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group inline-flex items-start gap-2 text-sm leading-relaxed text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ExternalLink
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent opacity-70 group-hover:opacity-100"
              />
              <span>
                {r}
                <span className="sr-only"> (abre em nova aba)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

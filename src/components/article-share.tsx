import { useState } from "react";
import { Copy, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function ArticleShare({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const canonical = `https://alamoengenharia.com.br/blog/${slug}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title} — ${canonical}`)}`;
  const copyForInstagram = async () => {
    await navigator.clipboard.writeText(`${title}\n${canonical}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3_000);
  };
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Compartilhar artigo">
      <span className="mr-1 text-xs font-semibold text-muted-foreground">Compartilhar</span>
      <Button asChild variant="outline" size="sm">
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no LinkedIn">
          <Linkedin aria-hidden="true" /> LinkedIn
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no WhatsApp">
          <WhatsAppIcon /> WhatsApp
        </a>
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => void copyForInstagram()} aria-live="polite">
        {copied ? <Copy aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        {copied ? "Link copiado" : "Instagram"}
      </Button>
    </div>
  );
}

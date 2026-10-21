import { useId, useRef } from "react";
import { z } from "zod";

/**
 * Camada anti-spam compartilhada por todos os formulários.
 * - honeypot: campo invisível que só robôs preenchem
 * - startedAt: envios em menos de 3s são descartados
 * - validação/limite de taxa acontece no servidor (form-security.server.ts)
 */
export const securitySchema = z.object({
  hp: z.string().max(200).optional(),
  startedAt: z.number().int().nonnegative().optional(),
});

export type SecurityPayload = z.infer<typeof securitySchema>;

export function useFormGuard() {
  const startedAt = useRef(Date.now());
  const hp = useRef<HTMLInputElement | null>(null);
  const hpId = useId();

  return {
    /** valores a enviar junto com o formulário */
    values: (): SecurityPayload => ({
      hp: hp.current?.value ?? "",
      startedAt: startedAt.current,
    }),
    /** campo escondido a renderizar dentro do <form> */
    field: (
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={hpId}>Não preencha este campo</label>
        <input
          id={hpId}
          name="website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          ref={hp}
        />
      </div>
    ),
  };
}

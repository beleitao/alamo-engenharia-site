import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <section className="surface-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base text-deep-foreground/75">{sub}</p>
      </div>
    </section>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl space-y-5 px-4 py-16 text-sm leading-relaxed text-muted-foreground lg:px-8">
      {children}
    </section>
  );
}

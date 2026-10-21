import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Handshake, MessageCircle } from "lucide-react";
import { pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { PageHero, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/a-propos")({
  head: () => pageHead("about"),
  component: About,
});

function About() {
  const { t } = useLang();
  usePageMeta("about");
  const founder = t.about.founder;

  return (
    <>
      <PageHero title={t.about.title} intro={t.about.p1} />
      <section className="container-site pb-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-2 shadow-glow">
              <img
                src="/nazir-sall.webp"
                alt={founder.imageAlt}
                loading="lazy"
                width={400}
                height={400}
                className="block aspect-square w-full rounded-[1.5rem] object-contain"
              />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-slate-950/85 p-4 shadow-xl backdrop-blur">
              <p className="font-display font-semibold text-white">{founder.name}</p>
              <p className="mt-1 text-sm text-slate-300">{founder.role}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cyan-200">Sénégal · Maroc · Europe</p>
            </div>
          </Reveal>

          <Reveal className="space-y-5">
            <p className="eyebrow">{founder.eyebrow}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{founder.name}</h2>
            <p className="font-medium text-primary">{founder.role}</p>
            <p className="text-lg leading-relaxed text-muted-foreground">{founder.intro}</p>
            <p className="leading-relaxed text-muted-foreground">{founder.p1}</p>
            <p className="leading-relaxed text-muted-foreground">{founder.p2}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/contact" className="btn-primary">{founder.contactCta}</Link>
              <Link to="/realisations" className="btn-outline inline-flex items-center gap-2">
                {founder.portfolioCta}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="cta-panel mt-16 grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
              <Handshake className="size-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">{founder.trustTitle}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{founder.trustText}</p>
              <div className="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{t.about.p2}</span>
              </div>
              <Link to="/contact" className="btn-primary mt-7 inline-flex items-center gap-2">
                <MessageCircle className="size-4" />
                {founder.contactCta}
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal><h2 className="section-title mt-16">{t.about.valuesTitle}</h2></Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.about.values.map((v) => (
            <Reveal key={v.t}>
              <div className="card-lift h-full">
                <h3 className="font-display text-lg font-semibold text-primary">{v.t}</h3>
                <p className="mt-2 text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

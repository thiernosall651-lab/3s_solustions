import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Bot, ArrowRight, CheckCircle2 } from "lucide-react";
import { CONTACTS, pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { LogoImage, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => pageHead("home"),
  component: Index,
});

const serviceIcons = [Globe, LayoutDashboard, Bot] as const;

function Index() {
  const { t } = useLang();
  usePageMeta("home");
  const wa = \`${CONTACTS.ma1.url}?text=\${encodeURIComponent(t.waDefault)}\`;

  return (
    <>
      <section className="hero-glow relative overflow-hidden">
        <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">{t.home.location}</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl xl:text-6xl">
              {t.home.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.home.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">{t.home.ctaContact}</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline">{t.home.ctaWa}</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" />{t.home.businessTitle}</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" />{t.home.personalTitle}</span>
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-glow">
              <LogoImage variant="hero" alt="3S Solutions — Agence digitale" loading="eager" className="aspect-[3/2] w-full rounded-2xl object-cover" />
              <div className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-4">
                {t.services.items.map((service, i) => {
                  const Icon = serviceIcons[i] ?? Globe;
                  return (
                    <div key={service.t} className="min-w-0 rounded-xl border border-border bg-background/70 p-3">
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                      <p className="mt-2 text-xs font-semibold leading-snug sm:text-sm">{service.t}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">{t.home.location}</p>
            <h2 className="section-title mt-3">{t.home.servicesTitle}</h2>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i] ?? Globe;
            return (
              <Reveal key={service.t}>
                <Link to="/services" className="card-lift group block h-full">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <Icon className="size-6 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{service.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{service.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {t.services.quote}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="section-title">{t.home.projectsTitle}</h2>
              <p className="mt-4 text-muted-foreground">{t.home.projectsDesc}</p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.portfolio.items.map((project, i) => (
              <Reveal key={project.url}>
                <article className="card-lift h-full overflow-hidden p-0">
                  <div className={\`relative flex min-h-44 items-end overflow-hidden p-6 sm:min-h-52 \${i === 0 ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" : "bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950"}\`}>
                    <div className="absolute -right-8 -top-12 size-48 rounded-full border border-white/10" aria-hidden="true" />
                    <div className="absolute -right-2 -top-6 size-32 rounded-full border border-white/10" aria-hidden="true" />
                    <div className="relative">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{project.loc}</p>
                      <p className="mt-3 font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">{project.brand}</p>
                      <p className="mt-1 text-sm text-slate-300">{project.previewSubtitle}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold">{project.t}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{project.d}</p>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
                      {t.portfolio.viewSite}
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-7">
            <Link to="/realisations" className="btn-outline inline-flex items-center gap-2">
              {t.home.projectsCta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="section-title">{t.home.audienceTitle}</h2>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-6 md:p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><LayoutDashboard className="size-5" /></span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{t.home.businessTitle}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t.home.businessDesc}</p>
              <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {t.home.servicesTitle}<ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="h-full rounded-2xl border border-primary/25 bg-primary/5 p-6 md:p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Globe className="size-5" /></span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{t.home.personalTitle}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t.home.personalDesc}</p>
              <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {t.services.personal.title}<ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-10 md:py-14">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-border bg-card p-7 md:grid-cols-[0.8fr_1.2fr] md:items-center md:p-10">
            <div>
              <p className="eyebrow">{t.home.location}</p>
              <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">{t.home.trustTitle}</h2>
            </div>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">{t.home.trustDesc}</p>
          </div>
        </Reveal>
      </section>

      <section className="container-site py-14 md:py-20">
        <Reveal>
          <div className="cta-panel">
            <h2 className="font-display text-2xl font-bold md:text-4xl">{t.home.finalTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.finalDesc}</p>
            <Link to="/contact" className="btn-primary mt-8">{t.home.finalCta}</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

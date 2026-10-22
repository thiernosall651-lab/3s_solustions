import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Bot, ArrowRight, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { CONTACTS, pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { LogoImage, Reveal } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => pageHead("home"),
  component: Index,
});

const serviceIcons = [Globe, LayoutDashboard, Bot] as const;
const team = [
  { name: "Thierno", initials: "T" },
  { name: "Nazir Sall", initials: "NS" },
  { name: "Abdourahamane", initials: "A" },
] as const;
const supportedProjects = [
  { name: "K2B Booking", url: "https://k2bbooking.com/", domain: "k2bbooking.com" },
  { name: "Teranga Beauty", url: "https://terangabeauty.net/", domain: "terangabeauty.net" },
  { name: "Les Nouveaux Jardins d’Amizmiz", url: "https://lesnouveauxjardinsdamizmiz.com/", domain: "lesnouveauxjardinsdamizmiz.com" },
  { name: "Sen Drapeaux", url: "https://sen-drapeau.3ssolutions.workers.dev/", domain: "sen-drapeau.3ssolutions.workers.dev" },
] as const;

function Index() {
  const { t } = useLang();
  usePageMeta("home");
  const wa = `${CONTACTS.ma1.url}?text=${encodeURIComponent(t.waDefault)}`;

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

      <section className="border-t border-border" aria-labelledby="team-heading">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <h2 id="team-heading" className="font-display text-3xl font-bold md:text-4xl">{t.home.teamTitle}</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <Reveal key={member.name}>
                <article className="h-full overflow-hidden rounded-lg border border-border bg-card">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-secondary/50">
                    <div className="absolute inset-5 border border-border" aria-hidden="true" />
                    <span className="absolute left-5 top-5 h-6 w-6 border-l border-t border-accent/70" aria-hidden="true" />
                    <span className="absolute bottom-5 right-5 h-6 w-6 border-b border-r border-primary" aria-hidden="true" />
                    <span className="font-display text-7xl font-semibold text-accent/80" aria-hidden="true">{member.initials}</span>
                    <p className="absolute bottom-8 inset-x-6 text-center text-xs text-muted-foreground">{t.home.teamPhotoPlaceholder}</p>
                  </div>
                  <div className="border-t border-border p-6">
                    <h3 className="break-words font-display text-xl font-semibold">{member.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t.home.teamCaption}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40" aria-labelledby="supported-heading">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 id="supported-heading" className="font-display text-3xl font-bold md:text-4xl">{t.home.supportedTitle}</h2>
              <p className="mt-4 text-muted-foreground">{t.home.supportedCaption}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportedProjects.map((project) => (
              <Reveal key={project.url}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <div className="flex min-h-36 items-center justify-center py-5 text-center">
                    <h3 className="font-display text-xl font-semibold leading-relaxed text-foreground">{project.name}</h3>
                  </div>
                  <div className="mt-auto border-t border-border pt-4">
                    <p className="break-all text-xs leading-relaxed text-muted-foreground">{project.domain}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm font-semibold text-accent">
                      <span>{t.portfolio.viewSite}</span>
                      <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-7">
            <Button asChild variant="link" className="h-auto px-0 text-accent">
              <Link to="/realisations">{t.home.projectsCta}<ArrowRight aria-hidden="true" /></Link>
            </Button>
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

      <section className="border-y border-primary/25 bg-primary/5" aria-labelledby="trust-cta-heading">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-accent">{t.home.trustTitle}</p>
                <h2 id="trust-cta-heading" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">{t.home.trustCtaTitle}</h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{t.home.trustCtaDesc}</p>
              </div>
              <div className="flex flex-col items-start gap-3 lg:items-stretch">
                <Button asChild size="lg" className="h-auto max-w-full whitespace-normal py-3 text-center">
                  <Link to="/contact">{t.home.ctaContact}<ArrowRight aria-hidden="true" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-auto max-w-full whitespace-normal border-accent/40 py-3 text-center">
                  <a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{t.home.ctaWa}</a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
